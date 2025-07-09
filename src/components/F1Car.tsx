
import { cn } from "@/lib/utils";

interface F1CarProps {
  className?: string;
  animated?: boolean;
  team?: 'red-bull' | 'ferrari' | 'mercedes' | 'mclaren';
  size?: 'sm' | 'md' | 'lg';
}

export const F1Car = ({ className, animated = true, team = 'ferrari', size = 'md' }: F1CarProps) => {
  const teamColors = {
    'red-bull': '#1e3a8a', // blue-800
    'ferrari': '#dc2626', // red-600
    'mercedes': '#0d9488', // teal-600
    'mclaren': '#ea580c'   // orange-600
  };

  const sizes = {
    'sm': { width: 24, height: 16 },
    'md': { width: 32, height: 20 },
    'lg': { width: 48, height: 30 }
  };

  const currentSize = sizes[size];
  const color = teamColors[team];

  const sizeClasses = {
    'sm': 'w-6 h-4',
    'md': 'w-8 h-5', 
    'lg': 'w-12 h-8'
  };

  const teamFilters = {
    'red-bull': 'brightness-0 saturate-100 invert-[0.15] sepia-[1] saturate-[5] hue-rotate-[220deg]',
    'ferrari': 'brightness-0 saturate-100 invert-[0.15] sepia-[1] saturate-[5] hue-rotate-[360deg]',
    'mercedes': 'brightness-0 saturate-100 invert-[0.4] sepia-[1] saturate-[3] hue-rotate-[160deg]',
    'mclaren': 'brightness-0 saturate-100 invert-[0.4] sepia-[1] saturate-[5] hue-rotate-[25deg]'
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <img 
        src="/lovable-uploads/2eacf5ec-6c23-4330-a5a3-6f8035bb6e87.png"
        alt="F1 Car"
        className={cn(
          sizeClasses[size],
          teamFilters[team],
          animated && "animate-race-enter",
          "drop-shadow-lg object-contain"
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
