
import { cn } from "@/lib/utils";

interface RacingSpeedometerProps {
  value: number; // 0-100
  label: string;
  className?: string;
  color?: 'red' | 'gold' | 'silver';
  animated?: boolean;
}

export const RacingSpeedometer = ({ 
  value, 
  label, 
  className, 
  color = 'red',
  animated = true 
}: RacingSpeedometerProps) => {
  const colorMap = {
    red: 'stroke-red-600',
    gold: 'stroke-yellow-500',
    silver: 'stroke-gray-400'
  };

  const needleRotation = (value / 100) * 180 - 90;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative", className)}>
      <div className="relative w-24 h-24 mx-auto">
        {/* Speedometer background */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="4"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={circumference * 0.125}
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={strokeDashoffset * 0.75 + circumference * 0.125}
            className={cn(
              colorMap[color],
              animated && "transition-all duration-1000 ease-out"
            )}
          />
        </svg>
        
        {/* Needle */}
        <div 
          className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-white origin-bottom transform -translate-x-1/2 -translate-y-full"
          style={{
            transform: `translate(-50%, -100%) rotate(${needleRotation}deg)`,
            transition: animated ? 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Value display */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 text-xs font-bold text-white">
          {Math.round(value)}%
        </div>
      </div>
      
      {/* Label */}
      <div className="text-center text-xs text-gray-400 mt-2 font-medium">
        {label}
      </div>
    </div>
  );
};
