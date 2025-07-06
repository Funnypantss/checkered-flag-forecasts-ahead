
import { F1Car } from "./F1Car";
import { cn } from "@/lib/utils";

interface RacingLoaderProps {
  className?: string;
  text?: string;
}

export const RacingLoader = ({ className, text = "Loading..." }: RacingLoaderProps) => {
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Racing track */}
      <div className="relative w-32 h-16 border-2 border-dashed border-gray-600 rounded-full overflow-hidden">
        {/* Animated car */}
        <div className="absolute top-1/2 transform -translate-y-1/2 animate-spin">
          <F1Car team="ferrari" size="sm" animated={false} />
        </div>
        
        {/* Speed lines around track */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full opacity-60"
              style={{
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%) 
                  rotate(${i * 45}deg) 
                  translateY(-24px)
                `,
                animation: `ping 1s ease-in-out infinite`,
                animationDelay: `${i * 0.125}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Loading text */}
      <div className="text-center">
        <div className="text-white font-bold text-lg racing-red">
          {text}
        </div>
        <div className="text-gray-400 text-sm mt-1">
          Preparing race data...
        </div>
      </div>
    </div>
  );
};
