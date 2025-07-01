
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const SUPABASE_URL = "https://hlqfroimdnzjexkiwvpc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscWZyb2ltZG56amV4a2l3dnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjI4MjcsImV4cCI6MjA2NjQzODgyN30.ozlnk2SV8JvfOr4zWehhb3rzM5QKZICOAXtwSmN3YSY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { season = '2024', round = 'last' } = await req.json();
    console.log(`Fetching F1 data for season ${season}, round ${round}`);

    // Fetch current season race calendar
    const calendarResponse = await fetch(`https://ergast.com/api/f1/${season}.json`);
    const calendarData = await calendarResponse.json();
    
    // Fetch latest race results
    const resultsResponse = await fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`);
    const resultsData = await resultsResponse.json();
    
    // Fetch driver standings
    const standingsResponse = await fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`);
    const standingsData = await standingsResponse.json();
    
    // Fetch constructor standings
    const constructorStandingsResponse = await fetch(`https://ergast.com/api/f1/${season}/constructorStandings.json`);
    const constructorStandingsData = await constructorStandingsResponse.json();

    // Process and store data in Supabase
    const races = calendarData.MRData?.RaceTable?.Races || [];
    const raceResults = resultsData.MRData?.RaceTable?.Races?.[0]?.Results || [];
    const driverStandings = standingsData.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
    const constructorStandings = constructorStandingsData.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];

    // Insert circuits if they don't exist
    for (const race of races) {
      const circuit = race.Circuit;
      await supabase.from('circuits').upsert({
        circuit_id: circuit.circuitId,
        name: circuit.circuitName,
        location: circuit.Location?.locality,
        country: circuit.Location?.country,
        lat: parseFloat(circuit.Location?.lat || '0'),
        lng: parseFloat(circuit.Location?.long || '0'),
        alt: parseInt(circuit.Location?.alt || '0'),
        url: circuit.url
      }, { onConflict: 'circuit_id' });
    }

    // Insert constructors
    const constructors = new Set();
    [...raceResults, ...constructorStandings].forEach(item => {
      const constructor = item.Constructor || item.Constructors?.[0];
      if (constructor && !constructors.has(constructor.constructorId)) {
        constructors.add(constructor.constructorId);
        supabase.from('constructors').upsert({
          constructor_id: constructor.constructorId,
          name: constructor.name,
          nationality: constructor.nationality,
          url: constructor.url
        }, { onConflict: 'constructor_id' });
      }
    });

    // Insert drivers
    const drivers = new Set();
    [...raceResults, ...driverStandings].forEach(item => {
      const driver = item.Driver;
      if (driver && !drivers.has(driver.driverId)) {
        drivers.add(driver.driverId);
        supabase.from('drivers').upsert({
          driver_id: driver.driverId,
          driver_number: parseInt(driver.permanentNumber || '0'),
          code: driver.code,
          given_name: driver.givenName,
          family_name: driver.familyName,
          date_of_birth: driver.dateOfBirth,
          nationality: driver.nationality,
          url: driver.url
        }, { onConflict: 'driver_id' });
      }
    });

    // Insert season
    await supabase.from('seasons').upsert({
      year: parseInt(season)
    }, { onConflict: 'year' });

    // Insert races
    for (const race of races) {
      await supabase.from('races').upsert({
        season: parseInt(season),
        round: parseInt(race.round),
        race_id: `${season}_${race.round}`,
        race_name: race.raceName,
        circuit_id: race.Circuit.circuitId,
        date: race.date,
        time: race.time,
        url: race.url
      }, { onConflict: 'race_id' });
    }

    // Insert race results if available
    if (raceResults.length > 0) {
      const raceId = `${season}_${resultsData.MRData.RaceTable.Races[0].round}`;
      
      for (const result of raceResults) {
        await supabase.from('race_results').upsert({
          race_id: raceId,
          driver_id: result.Driver.driverId,
          constructor_id: result.Constructor.constructorId,
          position: parseInt(result.position),
          position_text: result.positionText,
          position_order: parseInt(result.position),
          points: parseFloat(result.points),
          laps: parseInt(result.laps || '0'),
          time_text: result.Time?.time,
          milliseconds: result.Time?.millis ? parseInt(result.Time.millis) : null,
          fastest_lap: result.FastestLap ? parseInt(result.FastestLap.lap) : null,
          fastest_lap_rank: result.FastestLap ? parseInt(result.FastestLap.rank) : null,
          fastest_lap_time: result.FastestLap?.Time?.time,
          fastest_lap_speed: result.FastestLap?.AverageSpeed ? parseFloat(result.FastestLap.AverageSpeed.speed) : null,
          status: result.status
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'F1 data fetched and stored successfully',
      data: {
        races: races.length,
        results: raceResults.length,
        drivers: drivers.size,
        constructors: constructors.size
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching F1 data:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch F1 data',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
