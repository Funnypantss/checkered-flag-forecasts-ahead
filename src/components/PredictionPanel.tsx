
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Gauge, Zap } from "lucide-react";
import { CircuitSelector } from "@/components/CircuitSelector";
import { WeatherConditions } from "@/components/WeatherConditions";
import { RacingLoader } from "@/components/RacingLoader";
import { RacingSpeedometer } from "@/components/RacingSpeedometer";
import { F1Car } from "@/components/F1Car";

interface PredictionPanelProps {
  selectedCircuit: string;
  onCircuitChange: (circuit: string) => void;
  onPredict: () => void;
  loading: boolean;
  predictions: any;
}

export const PredictionPanel = ({ 
  selectedCircuit, 
  onCircuitChange, 
  onPredict, 
  loading, 
  predictions 
}: PredictionPanelProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      {/* Circuit Selection */}
      <Card className="f1-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 racing-red">
            <MapPin className="h-5 w-5" />
            Circuit Selection
          </CardTitle>
          <CardDescription className="text-gray-400">
            Choose your racing circuit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CircuitSelector 
            selectedCircuit={selectedCircuit}
            onCircuitChange={onCircuitChange}
          />
          <div className="mt-4 flex justify-center">
            <F1Car team="mclaren" size="md" animated={false} />
          </div>
        </CardContent>
      </Card>

      {/* Weather Conditions */}
      <Card className="f1-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Gauge className="h-5 w-5" />
            Race Conditions
          </CardTitle>
          <CardDescription className="text-gray-400">
            Track & weather analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherConditions circuit={selectedCircuit} />
          
          {/* Performance metrics */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <RacingSpeedometer 
              value={85} 
              label="Track Grip" 
              color="silver"
              className="text-xs"
            />
            <RacingSpeedometer 
              value={72} 
              label="Weather" 
              color="gold"
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Prediction Controls */}
      <Card className="f1-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 championship-gold">
            <Zap className="h-5 w-5" />
            Race Prediction
          </CardTitle>
          <CardDescription className="text-gray-400">
            AI-powered race analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <RacingLoader text="Analyzing Race Data" />
          ) : (
            <>
              <Button 
                onClick={onPredict} 
                disabled={loading}
                className="racing-button w-full"
                size="lg"
              >
                <F1Car team="ferrari" size="sm" animated={false} className="mr-2" />
                {loading ? "Racing..." : "🏁 START PREDICTION"}
              </Button>
              
              {predictions && (
                <div className="mt-6 p-4 glass-card rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Model Performance</div>
                    <RacingSpeedometer 
                      value={Math.max(0, 100 - (predictions.mae * 10))} 
                      label="Accuracy" 
                      color="red"
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      MAE: {predictions.mae.toFixed(2)}s
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
