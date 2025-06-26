
import { Cloud, Sun, CloudRain, Thermometer } from "lucide-react";

interface WeatherConditionsProps {
  circuit: string;
}

export const WeatherConditions = ({ circuit }: WeatherConditionsProps) => {
  // Mock weather data based on circuit
  const getWeatherData = (circuit: string) => {
    const weatherMap = {
      monaco: { temp: 24, rainProbability: 0.2, condition: "sunny" },
      silverstone: { temp: 18, rainProbability: 0.6, condition: "cloudy" },
      spa: { temp: 16, rainProbability: 0.8, condition: "rainy" },
      monza: { temp: 26, rainProbability: 0.1, condition: "sunny" },
      suzuka: { temp: 22, rainProbability: 0.4, condition: "cloudy" },
      interlagos: { temp: 28, rainProbability: 0.3, condition: "sunny" },
      barcelona: { temp: 25, rainProbability: 0.15, condition: "sunny" },
      "redbull-ring": { temp: 20, rainProbability: 0.35, condition: "cloudy" },
      hungaroring: { temp: 27, rainProbability: 0.25, condition: "sunny" },
      zandvoort: { temp: 19, rainProbability: 0.5, condition: "cloudy" },
      singapore: { temp: 31, rainProbability: 0.7, condition: "rainy" },
      austin: { temp: 23, rainProbability: 0.3, condition: "sunny" }
    };
    
    return weatherMap[circuit as keyof typeof weatherMap] || weatherMap.monaco;
  };

  const weather = getWeatherData(circuit);
  
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy": return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy": return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {getWeatherIcon(weather.condition)}
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Thermometer className="h-4 w-4" />
            <span className="text-2xl font-bold">{weather.temp}°C</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Rain Probability</span>
          <span className="font-medium">{(weather.rainProbability * 100).toFixed(0)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${weather.rainProbability * 100}%` }}
          />
        </div>
        
        <div className="text-xs text-gray-500 capitalize">
          Condition: {weather.condition}
        </div>
      </div>
    </div>
  );
};
