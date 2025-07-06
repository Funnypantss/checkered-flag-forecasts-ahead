
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, Zap } from "lucide-react";
import { F1Car } from "@/components/F1Car";
import { cn } from "@/lib/utils";

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
      case 1: return <Trophy className="h-8 w-8 championship-gold animate-pulse" />;
      case 2: return <Medal className="h-8 w-8 metallic-silver" />;
      case 3: return <Award className="h-8 w-8 text-amber-600" />;
      default: return (
        <div className="h-8 w-8 flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 rounded-full text-sm font-bold text-white border-2 border-gray-500">
          {position}
        </div>
      );
    }
  };

  const getTeamColor = (team: string) => {
    const teamColors = {
      "Red Bull": "from-blue-600 to-blue-800",
      "McLaren": "from-orange-500 to-orange-700",
      "Ferrari": "from-red-600 to-red-800",
      "Mercedes": "from-teal-400 to-teal-600",
      "Aston Martin": "from-green-600 to-green-800",
      "Alpine": "from-pink-500 to-pink-700",
      "Racing Bulls": "from-blue-400 to-blue-600",
      "Haas": "from-gray-600 to-gray-800",
      "Williams": "from-blue-800 to-blue-900",
      "Kick Sauber": "from-green-800 to-green-900"
    };
    return teamColors[team as keyof typeof teamColors] || "from-gray-500 to-gray-700";
  };

  const getTeamCar = (team: string) => {
    const teamCarMap = {
      "Red Bull": "red-bull",
      "McLaren": "mclaren", 
      "Ferrari": "ferrari",
      "Mercedes": "mercedes"
    };
    return teamCarMap[team as keyof typeof teamCarMap] || "ferrari";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);
    return `${minutes}:${remainingSeconds.padStart(6, '0')}`;
  };

  const results = type === "podium" ? predictions.podium : predictions.allResults;

  return (
    <Card className="f1-card">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl">
          {type === "podium" ? (
            <>
              <Trophy className="h-8 w-8 championship-gold animate-pulse" />
              <span className="racing-gradient bg-clip-text text-transparent">
                🏆 PODIUM PREDICTIONS 🏆
              </span>
              <Trophy className="h-8 w-8 championship-gold animate-pulse" />
            </>
          ) : (
            <>
              <Zap className="h-8 w-8 racing-red" />
              <span className="racing-gradient bg-clip-text text-transparent">
                FULL RACE RESULTS
              </span>
              <Zap className="h-8 w-8 racing-red" />
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div 
              key={result.driver}
              className={cn(
                "relative p-4 rounded-xl border-l-4 transition-all duration-300 hover:scale-[1.02] group",
                result.position <= 3 
                  ? "f1-card border-l-yellow-400 shadow-lg shadow-yellow-500/20" 
                  : "f1-card border-l-gray-600",
                type === "podium" && "podium-card"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Position indicator */}
                  <div className="relative">
                    {getPositionIcon(result.position)}
                    {result.position <= 3 && (
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-red-600/20 animate-ping" />
                    )}
                  </div>
                  
                  {/* Driver info */}
                  <div className="flex items-center gap-3">
                    <F1Car 
                      team={getTeamCar(result.team) as any} 
                      size="md" 
                      animated={result.position <= 3}
                    />
                    <div>
                      <div className="font-bold text-xl text-white group-hover:racing-red transition-colors">
                        {result.driver}
                      </div>
                      <div className={cn(
                        "text-sm text-white px-3 py-1 rounded-full font-medium bg-gradient-to-r",
                        getTeamColor(result.team)
                      )}>
                        {result.team}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Time display */}
                <div className="text-right">
                  <div className="font-mono text-2xl font-bold text-white group-hover:championship-gold transition-colors">
                    {formatTime(result.predictedTime)}
                  </div>
                  <div className="text-sm text-gray-400">
                    Predicted Time
                  </div>
                </div>
              </div>
              
              {/* Speed lines effect on hover */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="speed-lines" />
                <div className="speed-lines" style={{ animationDelay: '0.1s' }} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Championship podium display */}
        {type === "podium" && (
          <div className="mt-8 p-6 glass-card rounded-xl">
            <h3 className="font-bold text-2xl mb-6 text-center championship-gold">
              🏆 CHAMPIONSHIP PODIUM 🏆
            </h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              {/* 2nd Place */}
              <div className="order-1 lg:order-1">
                <div className="relative h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg mb-3 flex items-end justify-center pb-2">
                  <span className="text-2xl">🥈</span>
                  <div className="absolute -top-2 text-4xl">
                    <F1Car team={getTeamCar(predictions.podium[1]?.team) as any} size="md" />
                  </div>
                </div>
                <div className="font-bold text-white">{predictions.podium[1]?.driver}</div>
                <div className="text-sm text-gray-400">{predictions.podium[1]?.team}</div>
              </div>
              
              {/* 1st Place */}
              <div className="order-2 lg:order-2">
                <div className="relative h-28 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mb-3 flex items-end justify-center pb-2 animate-racing-pulse">
                  <span className="text-3xl">🥇</span>
                  <div className="absolute -top-4 text-5xl">
                    <F1Car team={getTeamCar(predictions.podium[0]?.team) as any} size="lg" />
                  </div>
                </div>
                <div className="font-bold text-xl championship-gold">{predictions.podium[0]?.driver}</div>
                <div className="text-sm text-gray-400">{predictions.podium[0]?.team}</div>
              </div>
              
              {/* 3rd Place */}
              <div className="order-3 lg:order-3">
                <div className="relative h-16 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg mb-3 flex items-end justify-center pb-2">
                  <span className="text-xl">🥉</span>
                  <div className="absolute -top-2 text-3xl">
                    <F1Car team={getTeamCar(predictions.podium[2]?.team) as any} size="sm" />
                  </div>
                </div>
                <div className="font-bold text-white">{predictions.podium[2]?.driver}</div>
                <div className="text-sm text-gray-400">{predictions.podium[2]?.team}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
