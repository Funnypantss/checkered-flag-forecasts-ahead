
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Car, MapPin } from "lucide-react";
import { PredictionResults } from "@/components/PredictionResults";
import { FeatureImportance } from "@/components/FeatureImportance";
import { CircuitSelector } from "@/components/CircuitSelector";
import { WeatherConditions } from "@/components/WeatherConditions";
import { PodiumSelector } from "@/components/PodiumSelector";

const Index = () => {
  const [selectedCircuit, setSelectedCircuit] = useState("monaco");
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customPodium, setCustomPodium] = useState({
    first: "",
    second: "",
    third: ""
  });

  const handlePredict = async () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockPredictions = {
        podium: [
          { driver: "VER", team: "Red Bull", predictedTime: 93.191, position: 1 },
          { driver: "NOR", team: "McLaren", predictedTime: 93.429, position: 2 },
          { driver: "LEC", team: "Ferrari", predictedTime: 93.519, position: 3 }
        ],
        allResults: [
          { driver: "VER", team: "Red Bull", predictedTime: 93.191, position: 1 },
          { driver: "NOR", team: "McLaren", predictedTime: 93.429, position: 2 },
          { driver: "LEC", team: "Ferrari", predictedTime: 93.519, position: 3 },
          { driver: "PIA", team: "McLaren", predictedTime: 93.623, position: 4 },
          { driver: "RUS", team: "Mercedes", predictedTime: 93.833, position: 5 },
          { driver: "HAM", team: "Mercedes", predictedTime: 94.021, position: 6 },
          { driver: "SAI", team: "Ferrari", predictedTime: 94.497, position: 7 },
          { driver: "ALO", team: "Aston Martin", predictedTime: 94.784, position: 8 }
        ],
        mae: 0.85
      };
      setPredictions(mockPredictions);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with F1 Car Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Car className="h-12 w-12 text-red-600 transform rotate-90" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">1</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">F1 Race Winner Predictor</h1>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600">
            Advanced machine learning model to predict Formula 1 race outcomes
          </p>
        </div>

        {/* Main Content */}
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
                onCircuitChange={setSelectedCircuit}
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
                onClick={handlePredict} 
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

        {/* Podium Selector */}
        <div className="mb-8">
          <PodiumSelector 
            customPodium={customPodium}
            onPodiumChange={setCustomPodium}
          />
        </div>

        {/* Results */}
        {predictions && (
          <Tabs defaultValue="podium" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="podium">Podium Predictions</TabsTrigger>
              <TabsTrigger value="full-results">Full Results</TabsTrigger>
              <TabsTrigger value="analysis">Feature Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="podium">
              <PredictionResults 
                predictions={predictions}
                type="podium"
              />
            </TabsContent>
            
            <TabsContent value="full-results">
              <PredictionResults 
                predictions={predictions}
                type="full"
              />
            </TabsContent>
            
            <TabsContent value="analysis">
              <FeatureImportance circuit={selectedCircuit} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Index;
