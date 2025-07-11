
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const SUPABASE_URL = "https://hlqfroimdnzjexkiwvpc.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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
    console.log(`Inserting sample F1 data for season ${season}, round ${round}`);

    // Clear existing data for this race to avoid duplicates
    const raceId = '2024_24';
    const { error: deleteError } = await supabase.from('race_results').delete().eq('race_id', raceId);
    if (deleteError) {
      console.error('Error deleting existing race results:', deleteError);
    }

    // Sample data to insert
    const sampleDrivers = [
      { driver_id: 'verstappen', given_name: 'Max', family_name: 'Verstappen', code: 'VER' },
      { driver_id: 'leclerc', given_name: 'Charles', family_name: 'Leclerc', code: 'LEC' },
      { driver_id: 'norris', given_name: 'Lando', family_name: 'Norris', code: 'NOR' },
      { driver_id: 'piastri', given_name: 'Oscar', family_name: 'Piastri', code: 'PIA' },
      { driver_id: 'sainz', given_name: 'Carlos', family_name: 'Sainz', code: 'SAI' },
      { driver_id: 'russell', given_name: 'George', family_name: 'Russell', code: 'RUS' },
      { driver_id: 'hamilton', given_name: 'Lewis', family_name: 'Hamilton', code: 'HAM' }
    ];

    const sampleConstructors = [
      { constructor_id: 'red_bull', name: 'Red Bull Racing' },
      { constructor_id: 'ferrari', name: 'Ferrari' },
      { constructor_id: 'mclaren', name: 'McLaren' },
      { constructor_id: 'mercedes', name: 'Mercedes' }
    ];

    // Add circuit data
    const sampleCircuits = [
      { 
        circuit_id: 'yas_marina', 
        name: 'Yas Marina Circuit', 
        location: 'Abu Dhabi', 
        country: 'UAE',
        lat: 24.4672,
        lng: 54.6031,
        alt: 3
      }
    ];

    // Insert sample circuits first (required for races foreign key)
    for (const circuit of sampleCircuits) {
      const { error } = await supabase.from('circuits').upsert(circuit, { onConflict: 'circuit_id' });
      if (error) {
        console.error('Error inserting circuit:', error);
      } else {
        console.log('Circuit inserted successfully:', circuit.circuit_id);
      }
    }

    // Insert sample drivers
    for (const driver of sampleDrivers) {
      const { error } = await supabase.from('drivers').upsert(driver, { onConflict: 'driver_id' });
      if (error) {
        console.error('Error inserting driver:', error);
      } else {
        console.log('Driver inserted successfully:', driver.driver_id);
      }
    }

    // Insert sample constructors
    for (const constructor of sampleConstructors) {
      const { error } = await supabase.from('constructors').upsert(constructor, { onConflict: 'constructor_id' });
      if (error) {
        console.error('Error inserting constructor:', error);
      } else {
        console.log('Constructor inserted successfully:', constructor.constructor_id);
      }
    }

    // Insert sample season
    const { error: seasonError } = await supabase.from('seasons').upsert({ year: 2024 }, { onConflict: 'year' });
    if (seasonError) {
      console.error('Error inserting season:', seasonError);
    } else {
      console.log('Season inserted successfully: 2024');
    }
    
    // Insert sample race
    const { error: raceError } = await supabase.from('races').upsert({
      race_id: raceId,
      season: 2024,
      round: 24,
      race_name: 'Abu Dhabi Grand Prix',
      circuit_id: 'yas_marina',
      date: '2024-12-08'
    }, { onConflict: 'race_id' });
    
    if (raceError) {
      console.error('Error inserting race:', raceError);
    } else {
      console.log('Race inserted successfully:', raceId);
    }

    // Insert sample race results with more realistic data
    const sampleResults = [
      { race_id: raceId, driver_id: 'norris', constructor_id: 'mclaren', position: 1, points: 25, time_text: '1:26:33.291', status: 'Finished' },
      { race_id: raceId, driver_id: 'sainz', constructor_id: 'ferrari', position: 2, points: 18, time_text: '+5.306', status: 'Finished' },
      { race_id: raceId, driver_id: 'leclerc', constructor_id: 'ferrari', position: 3, points: 15, time_text: '+31.928', status: 'Finished' },
      { race_id: raceId, driver_id: 'piastri', constructor_id: 'mclaren', position: 4, points: 12, time_text: '+49.289', status: 'Finished' },
      { race_id: raceId, driver_id: 'russell', constructor_id: 'mercedes', position: 5, points: 10, time_text: '+1:05.123', status: 'Finished' },
      { race_id: raceId, driver_id: 'verstappen', constructor_id: 'red_bull', position: 6, points: 8, time_text: '+1:09.451', status: 'Finished' },
      { race_id: raceId, driver_id: 'hamilton', constructor_id: 'mercedes', position: 7, points: 6, time_text: '+1:15.678', status: 'Finished' }
    ];

    // Insert race results
    for (const result of sampleResults) {
      const { error } = await supabase.from('race_results').insert({
        ...result,
        position_text: result.position.toString(),
        position_order: result.position,
        laps: 58,
        fastest_lap_time: '1:26.103'
      });
      
      if (error) {
        console.error('Error inserting race result:', error);
      } else {
        console.log('Race result inserted successfully for driver:', result.driver_id);
      }
    }

    console.log('Sample F1 data inserted successfully');

    return new Response(JSON.stringify({
      success: true,
      message: 'Sample F1 data inserted successfully',
      data: {
        circuits: sampleCircuits.length,
        races: 1,
        results: sampleResults.length,
        drivers: sampleDrivers.length,
        constructors: sampleConstructors.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in F1 data function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process F1 data',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
