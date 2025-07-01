
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { CircuitSelector } from "@/components/CircuitSelector";
import { WeatherConditions } from "@/components/WeatherConditions";

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Circuit Selection
          </CardTitle>
          <CardDescription>Choose the circuit for prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <CircuitSelector 
            selectedCircuit={selectedCircuit}
            onCircuitChange={onCircuitChange}
          />
        </CardContent>
      </Card>

      {/* Weather Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Weather Conditions</CardTitle>
          <CardDescription>Current forecast for race day</CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherConditions circuit={selectedCircuit} />
        </CardContent>
      </Card>

      {/* Prediction Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Run Prediction</CardTitle>
          <CardDescription>Generate race outcome predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onPredict} 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700"
            size="lg"
          >
            {loading ? "Predicting..." : "Predict Race Winner"}
          </Button>
          {predictions && (
            <div className="mt-4 text-sm text-gray-600">
              Model Accuracy: {predictions.mae.toFixed(2)}s MAE
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
