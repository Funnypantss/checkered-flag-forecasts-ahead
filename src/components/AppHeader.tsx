
import { Car, Trophy, Zap } from "lucide-react";
import { F1Car } from "./F1Car";

export const AppHeader = () => {
  return (
    <div className="text-center mb-12 relative">
      {/* Racing cars animation */}
      <div className="absolute -top-8 left-0 animate-race-enter opacity-60">
        <F1Car team="ferrari" size="sm" />
      </div>
      <div className="absolute -top-8 right-0 animate-race-enter opacity-60" style={{ animationDelay: '0.3s' }}>
        <F1Car team="red-bull" size="sm" />
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
          <Car className="h-10 w-10 racing-red animate-racing-pulse" />
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent animate-race-enter">
            F1 RACE PREDICTOR
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-1 w-12 bg-red-600 animate-pulse" />
            <div className="h-1 w-8 bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="h-1 w-12 bg-red-600 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Trophy className="h-10 w-10 championship-gold animate-racing-pulse" />
          <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
        </div>
      </div>
      
      <div className="relative">
        <p className="text-xl metallic-silver font-medium">
          🏁 Premium Formula 1 Analytics & Machine Learning Predictions 🏁
        </p>
        <p className="text-gray-400 mt-2">
          Real telemetry data • Advanced AI models • Championship insights
        </p>
        
        {/* Decorative racing elements */}
        <div className="flex justify-center items-center gap-4 mt-4 text-2xl opacity-60">
          <span>🏎️</span>
          <span>⚡</span>
          <span>🏆</span>
          <span>🥇</span>
          <span>🏁</span>
        </div>
      </div>
    </div>
  );
};
