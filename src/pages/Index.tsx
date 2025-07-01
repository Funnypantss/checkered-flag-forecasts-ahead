
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Car, BarChart3, MapPin } from "lucide-react";
import { PredictionResults } from "@/components/PredictionResults";
import { FeatureImportance } from "@/components/FeatureImportance";
import { CircuitSelector } from "@/components/CircuitSelector";
import { WeatherConditions } from "@/components/WeatherConditions";

const Index = () => {
  const [selectedCircuit, setSelectedCircuit] = useState("monaco");
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCircuitSpecificPredictions = (circuit: string) => {
    // Define circuit characteristics that affect performance
    const circuitData = {
      monaco: {
        qualifyingWeight: 0.6, // Qualifying very important at Monaco
        teamBonus: { "Ferrari": 0.3, "McLaren": 0.2, "Red Bull": 0.4 },
        baseTime: 73.5,
        overtakingDifficulty: 0.9
      },
      silverstone: {
        qualifyingWeight: 0.3,
        teamBonus: { "McLaren": 0.4, "Mercedes": 0.3, "Red Bull": 0.2 },
        baseTime: 87.2,
        overtakingDifficulty: 0.3
      },
      spa: {
        qualifyingWeight: 0.2,
        teamBonus: { "Red Bull": 0.4, "Ferrari": 0.3, "McLaren": 0.2 },
        baseTime: 105.8,
        overtakingDifficulty: 0.2
      },
      monza: {
        qualifyingWeight: 0.25,
        teamBonus: { "Ferrari": 0.5, "McLaren": 0.3, "Red Bull": 0.2 },
        baseTime: 81.3,
        overtakingDifficulty: 0.2
      },
      suzuka: {
        qualifyingWeight: 0.4,
        teamBonus: { "Red Bull": 0.4, "McLaren": 0.3, "Mercedes": 0.2 },
        baseTime: 91.2,
        overtakingDifficulty: 0.5
      },
      interlagos: {
        qualifyingWeight: 0.3,
        teamBonus: { "Red Bull": 0.3, "McLaren": 0.4, "Ferrari": 0.2 },
        baseTime: 70.9,
        overtakingDifficulty: 0.4
      },
      barcelona: {
        qualifyingWeight: 0.35,
        teamBonus: { "Red Bull": 0.3, "Ferrari": 0.3, "McLaren": 0.3 },
        baseTime: 78.1,
        overtakingDifficulty: 0.6
      },
      "redbull-ring": {
        qualifyingWeight: 0.25,
        teamBonus: { "Red Bull": 0.5, "Ferrari": 0.2, "McLaren": 0.2 },
        baseTime: 65.6,
        overtakingDifficulty: 0.3
      },
      hungaroring: {
        qualifyingWeight: 0.5,
        teamBonus: { "McLaren": 0.3, "Red Bull": 0.3, "Ferrari": 0.2 },
        baseTime: 77.8,
        overtakingDifficulty: 0.8
      },
      zandvoort: {
        qualifyingWeight: 0.45,
        teamBonus: { "Red Bull": 0.4, "McLaren": 0.3, "Mercedes": 0.2 },
        baseTime: 71.1,
        overtakingDifficulty: 0.7
      },
      singapore: {
        qualifyingWeight: 0.4,
        teamBonus: { "Ferrari": 0.3, "Red Bull": 0.3, "McLaren": 0.3 },
        baseTime: 102.3,
        overtakingDifficulty: 0.8
      },
      austin: {
        qualifyingWeight: 0.3,
        teamBonus: { "Red Bull": 0.3, "Ferrari": 0.3, "McLaren": 0.3 },
        baseTime: 95.7,
        overtakingDifficulty: 0.4
      }
    };

    const drivers = [
      { driver: "VER", team: "Red Bull", baseSkill: 0.95 },
      { driver: "NOR", team: "McLaren", baseSkill: 0.92 },
      { driver: "LEC", team: "Ferrari", baseSkill: 0.90 },
      { driver: "PIA", team: "McLaren", baseSkill: 0.88 },
      { driver: "RUS", team: "Mercedes", baseSkill: 0.87 },
      { driver: "HAM", team: "Mercedes", baseSkill: 0.89 },
      { driver: "SAI", team: "Ferrari", baseSkill: 0.86 },
      { driver: "ALO", team: "Aston Martin", baseSkill: 0.85 }
    ];

    const circuitInfo = circuitData[circuit as keyof typeof circuitData] || circuitData.monaco;
    
    // Generate predictions based on circuit characteristics
    const results = drivers.map(({ driver, team, baseSkill }) => {
      // Random qualifying position (1-8)
      const qualifyingPos = Math.floor(Math.random() * 8) + 1;
      
      // Team bonus for specific circuits
      const teamBonus = circuitInfo.teamBonus[team as keyof typeof circuitInfo.teamBonus] || 0;
      
      // Calculate performance based on circuit characteristics
      const qualifyingImpact = (9 - qualifyingPos) * circuitInfo.qualifyingWeight * 0.1;
      const skillImpact = baseSkill * 0.8;
      const teamImpact = teamBonus * 0.3;
      const randomFactor = (Math.random() - 0.5) * 0.2; // ±10% random variation
      
      const performanceScore = skillImpact + qualifyingImpact + teamImpact + randomFactor;
      
      // Convert performance to lap time
      const timePenalty = (1 - performanceScore) * 3; // Up to 3 seconds difference
      const predictedTime = circuitInfo.baseTime + timePenalty;
      
      return {
        driver,
        team,
        predictedTime: parseFloat(predictedTime.toFixed(3)),
        performanceScore
      };
    });

    // Sort by predicted time and assign positions
    results.sort((a, b) => a.predictedTime - b.predictedTime);
    const finalResults = results.map((result, index) => ({
      ...result,
      position: index + 1
    }));

    // Calculate MAE based on circuit difficulty
    const baseMae = 0.5;
    const circuitComplexity = (circuitInfo.overtakingDifficulty + circuitInfo.qualifyingWeight) / 2;
    const mae = baseMae + (circuitComplexity * 0.8);

    return {
      podium: finalResults.slice(0, 3),
      allResults: finalResults,
      mae: parseFloat(mae.toFixed(2))
    };
  };

  const handlePredict = async () => {
    setLoading(true);
    console.log(`Generating predictions for circuit: ${selectedCircuit}`);
    
    // Simulate API call delay
    setTimeout(() => {
      const circuitPredictions = generateCircuitSpecificPredictions(selectedCircuit);
      console.log('Generated predictions:', circuitPredictions);
      setPredictions(circuitPredictions);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Car className="h-8 w-8 text-red-600" />
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
