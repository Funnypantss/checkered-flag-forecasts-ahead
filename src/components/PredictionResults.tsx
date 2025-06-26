
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

interface PredictionResultsProps {
  predictions: {
    podium: Array<{
      driver: string;
      team: string;
      predictedTime: number;
      position: number;
    }>;
    allResults: Array<{
      driver: string;
      team: string;
      predictedTime: number;
      position: number;
    }>;
    mae: number;
  };
  type: "podium" | "full";
}

export const PredictionResults = ({ predictions, type }: PredictionResultsProps) => {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <div className="h-6 w-6 flex items-center justify-center bg-gray-200 rounded-full text-xs font-bold">{position}</div>;
    }
  };

  const getTeamColor = (team: string) => {
    const teamColors = {
      "Red Bull": "bg-blue-600",
      "McLaren": "bg-orange-500",
      "Ferrari": "bg-red-600",
      "Mercedes": "bg-teal-500",
      "Aston Martin": "bg-green-600",
      "Alpine": "bg-pink-500",
      "Racing Bulls": "bg-blue-400",
      "Haas": "bg-gray-600",
      "Williams": "bg-blue-800",
      "Kick Sauber": "bg-green-800"
    };
    return teamColors[team as keyof typeof teamColors] || "bg-gray-500";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);
    return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
  };

  const results = type === "podium" ? predictions.podium : predictions.allResults;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {type === "podium" ? (
            <>
              <Trophy className="h-5 w-5 text-yellow-500" />
              Podium Predictions
            </>
          ) : (
            <>
              <Award className="h-5 w-5" />
              Full Race Results
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.map((result, index) => (
            <div 
              key={result.driver}
              className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                result.position <= 3 ? 'bg-yellow-50 border-yellow-400' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {getPositionIcon(result.position)}
                <div>
                  <div className="font-bold text-lg">{result.driver}</div>
                  <div className={`text-sm text-white px-2 py-1 rounded ${getTeamColor(result.team)}`}>
                    {result.team}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-mono text-lg font-bold">
                  {formatTime(result.predictedTime)}
                </div>
                <div className="text-sm text-gray-500">
                  Predicted Time
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {type === "podium" && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
            <h3 className="font-bold text-lg mb-2">🏆 Predicted Podium</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl">🥇</div>
                <div className="font-bold">{predictions.podium[0]?.driver}</div>
              </div>
              <div>
                <div className="text-2xl">🥈</div>
                <div className="font-bold">{predictions.podium[1]?.driver}</div>
              </div>
              <div>
                <div className="text-2xl">🥉</div>
                <div className="font-bold">{predictions.podium[2]?.driver}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
