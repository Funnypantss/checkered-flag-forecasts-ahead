
import { cn } from "@/lib/utils";
import f1CarLogo from "@/assets/f1-car-logo.png";

interface F1CarProps {
  className?: string;
  animated?: boolean;
  team?: 'red-bull' | 'ferrari' | 'mercedes' | 'mclaren';
  size?: 'sm' | 'md' | 'lg';
}

export const F1Car = ({ className, animated = true, team = 'ferrari', size = 'md' }: F1CarProps) => {
  const sizeClasses = {
    'sm': 'w-6 h-4',
    'md': 'w-8 h-5', 
    'lg': 'w-12 h-8'
  };

  const teamFilters = {
    'red-bull': 'hue-rotate-[220deg] saturate-150 brightness-90',
    'ferrari': 'hue-rotate-[360deg] saturate-150 brightness-90',
    'mercedes': 'hue-rotate-[160deg] saturate-150 brightness-90',
    'mclaren': 'hue-rotate-[25deg] saturate-150 brightness-90'
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <img 
        src={f1CarLogo}
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
