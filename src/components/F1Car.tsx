
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface F1CarProps {
  className?: string;
  animated?: boolean;
  team?: 'red-bull' | 'ferrari' | 'mercedes' | 'mclaren';
  size?: 'sm' | 'md' | 'lg';
}

export const F1Car = ({ className, animated = true, team = 'ferrari', size = 'md' }: F1CarProps) => {
  const teamColors = {
    'red-bull': 'text-blue-600',
    'ferrari': 'text-red-600',
    'mercedes': 'text-teal-400',
    'mclaren': 'text-orange-500'
  };

  const sizes = {
    'sm': 'w-6 h-6',
    'md': 'w-8 h-8',
    'lg': 'w-12 h-12'
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <Car 
        className={cn(
          sizes[size],
          teamColors[team],
          animated && "animate-race-enter",
          "drop-shadow-lg"
        )}
      />
      
      {/* Speed lines */}
      {animated && (
        <>
          <div className="speed-lines opacity-60" />
          <div className="speed-lines opacity-40" style={{ animationDelay: '0.2s' }} />
          <div className="speed-lines opacity-20" style={{ animationDelay: '0.4s' }} />
        </>
      )}
      
      {/* Tire smoke effects */}
      {animated && (
        <>
          <div className="tire-smoke" />
          <div className="tire-smoke" />
          <div className="tire-smoke" />
        </>
      )}
    </div>
  );
};
