
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

  return (
    <div className={cn("relative inline-block", className)}>
      <svg 
        width={currentSize.width} 
        height={currentSize.height} 
        viewBox="0 0 48 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          animated && "animate-race-enter",
          "drop-shadow-lg"
        )}
      >
        {/* Main body */}
        <path 
          d="M8 12h32c2 0 4 1 4 3v4c0 2-2 3-4 3H8c-2 0-4-1-4-3v-4c0-2 2-3 4-3z" 
          fill={color}
          stroke="currentColor"
          strokeWidth="0.5"
        />
        
        {/* Front nose */}
        <path 
          d="M40 15h6c1 0 2 1 2 2v1c0 1-1 2-2 2h-6z" 
          fill={color}
          stroke="currentColor"
          strokeWidth="0.5"
        />
        
        {/* Rear wing */}
        <path 
          d="M2 14h6v2H2z" 
          fill={color}
          stroke="currentColor"
          strokeWidth="0.5"
        />
        
        {/* Front wheels */}
        <circle cx="38" cy="12" r="3" fill="#1f2937" stroke="#374151" strokeWidth="0.5"/>
        <circle cx="38" cy="18" r="3" fill="#1f2937" stroke="#374151" strokeWidth="0.5"/>
        
        {/* Rear wheels */}
        <circle cx="10" cy="12" r="3" fill="#1f2937" stroke="#374151" strokeWidth="0.5"/>
        <circle cx="10" cy="18" r="3" fill="#1f2937" stroke="#374151" strokeWidth="0.5"/>
        
        {/* Cockpit */}
        <path 
          d="M16 13h16c1 0 2 0.5 2 1.5v1c0 1-1 1.5-2 1.5H16c-1 0-2-0.5-2-1.5v-1c0-1 1-1.5 2-1.5z" 
          fill="#374151"
          stroke="#4b5563"
          strokeWidth="0.5"
        />
        
        {/* Side details */}
        <rect x="20" y="14" width="8" height="2" fill="#6b7280" rx="0.5"/>
        
        {/* Front wing elements */}
        <rect x="42" y="13" width="4" height="1" fill={color} opacity="0.8"/>
        <rect x="42" y="16" width="4" height="1" fill={color} opacity="0.8"/>
      </svg>
      
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
