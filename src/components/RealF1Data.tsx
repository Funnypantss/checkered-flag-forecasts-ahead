
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Trophy, RefreshCw } from "lucide-react";

interface RaceResult {
  position: number;
  driver_id: string;
  constructor_id: string;
  points: number;
  time_text?: string;
  fastest_lap_time?: string;
  status: string;
  driver?: {
    given_name: string;
    family_name: string;
    code: string;
  };
  constructor?: {
    name: string;
  };
}

const RealF1Data = () => {
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchF1Data = async () => {
    setFetching(true);
    setError(null);
    try {
      console.log('Calling F1 data fetch function...');
      const { data, error } = await supabase.functions.invoke('fetch-f1-data', {
        body: { season: '2024', round: 'last' }
      });

      if (error) {
        console.error('Error calling function:', error);
        setError('Failed to fetch F1 data. Please try again.');
        return;
      }

      console.log('F1 data fetch response:', data);
      setLastUpdated(new Date().toLocaleString());
      // Automatically load race results after fetching new data
      await loadRaceResults();
    } catch (error) {
      console.error('Error fetching F1 data:', error);
      setError('Failed to fetch F1 data. Please try again.');
    } finally {
      setFetching(false);
    }
  };

  const loadRaceResults = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading race results...');
      
      // Get the latest race results with driver and constructor info
      const { data: results, error } = await supabase
        .from('race_results')
        .select(`
          position,
          driver_id,
          constructor_id,
          points,
          time_text,
          fastest_lap_time,
          status,
          drivers(given_name, family_name, code),
          constructors(name)
        `)
        .order('position', { ascending: true })
        .limit(20);

      if (error) {
        console.error('Error loading race results:', error);
        setError('Failed to load race results. Please try fetching data first.');
        return;
      }

      console.log('Raw race results data:', results);

      if (!results || results.length === 0) {
        console.log('No race results found');
        setRaceResults([]);
        setError('No race results found. Please fetch F1 data first.');
        return;
      }

      // Transform the data to match our interface
      const formattedResults = results.map(result => ({
        position: result.position,
        driver_id: result.driver_id,
        constructor_id: result.constructor_id,
        points: result.points,
        time_text: result.time_text,
        fastest_lap_time: result.fastest_lap_time,
        status: result.status,
        driver: result.drivers,
        constructor: result.constructors
      }));

      console.log('Formatted race results:', formattedResults);
      setRaceResults(formattedResults);
      setError(null);
    } catch (error) {
      console.error('Error loading race results:', error);
      setError('Failed to load race results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRaceResults();
  }, []);

  const getPositionBadge = (position: number) => {
    if (position <= 3) {
      const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600'];
      return <Badge className={`${colors[position - 1]} text-white`}>{position}</Badge>;
    }
    return <Badge variant="outline">{position}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            Real F1 Race Results
          </CardTitle>
          <CardDescription>
            Latest Formula 1 race results from Ergast API
            {lastUpdated && (
              <span className="block text-sm text-gray-500 mt-1">
                Last updated: {lastUpdated}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button 
              onClick={fetchF1Data}
              disabled={fetching}
              className="bg-red-600 hover:bg-red-700"
            >
              {fetching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Fetching Latest Data...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Fetch Latest F1 Data
                </>
              )}
            </Button>
            <Button 
              onClick={loadRaceResults}
              disabled={loading}
              variant="outline"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Refresh Results'
              )}
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {raceResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {raceResults.map((result, index) => (
                  <TableRow key={`${result.driver_id}-${result.position}-${index}`}>
                    <TableCell>
                      {getPositionBadge(result.position)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {result.driver?.code || result.driver_id}
                      <span className="block text-sm text-gray-500">
                        {result.driver?.given_name} {result.driver?.family_name}
                      </span>
                    </TableCell>
                    <TableCell>{result.constructor?.name || result.constructor_id}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {result.time_text || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={result.points > 0 ? "default" : "secondary"}>
                        {result.points} pts
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={result.status === 'Finished' ? 'outline' : 'destructive'}>
                        {result.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading race results...
                </div>
              ) : (
                <div>
                  <p>No race results available yet.</p>
                  <p className="text-sm">Click "Fetch Latest F1 Data" to load sample race data.</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealF1Data;
