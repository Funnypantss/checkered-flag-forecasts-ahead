
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PredictionResults } from "@/components/PredictionResults";
import { FeatureImportance } from "@/components/FeatureImportance";
import { AppHeader } from "@/components/AppHeader";
import { PredictionPanel } from "@/components/PredictionPanel";
import { usePredictions } from "@/hooks/usePredictions";
import RealF1Data from "@/components/RealF1Data";

const Index = () => {
  const [selectedCircuit, setSelectedCircuit] = useState("monaco");
  const { predictions, loading, handlePredict } = usePredictions();

  const onPredict = () => {
    handlePredict(selectedCircuit);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Racing background with checkered pattern */}
      <div className="absolute inset-0 checkered-pattern opacity-5" />
      
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 racing-gradient opacity-10" />
      
      {/* Content */}
      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          <AppHeader />

          {/* Main Content */}
          <Tabs defaultValue="real-data" className="w-full">
            <TabsList className="grid w-full grid-cols-4 f1-card p-1">
              <TabsTrigger 
                value="real-data" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                🏁 Real F1 Data
              </TabsTrigger>
              <TabsTrigger 
                value="predictions"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                🏎️ Predictions
              </TabsTrigger>
              <TabsTrigger 
                value="full-results"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                🏆 Full Results
              </TabsTrigger>
              <TabsTrigger 
                value="analysis"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white transition-all duration-300"
              >
                📊 Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="real-data" className="animate-race-enter">
              <RealF1Data />
            </TabsContent>
            
            <TabsContent value="predictions" className="animate-race-enter">
              <PredictionPanel
                selectedCircuit={selectedCircuit}
                onCircuitChange={setSelectedCircuit}
                onPredict={onPredict}
                loading={loading}
                predictions={predictions}
              />

              {predictions && (
                <div className="animate-podium-rise">
                  <PredictionResults 
                    predictions={predictions}
                    type="podium"
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="full-results" className="animate-race-enter">
              {predictions ? (
                <div className="animate-podium-rise">
                  <PredictionResults 
                    predictions={predictions}
                    type="full"
                  />
                </div>
              ) : (
                <Card className="f1-card">
                  <CardContent className="text-center py-12">
                    <div className="text-6xl mb-4">🏁</div>
                    <p className="text-gray-400 text-lg">Run a prediction first to see full results</p>
                    <p className="text-gray-500 text-sm mt-2">The race hasn't started yet!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="analysis" className="animate-race-enter">
              <FeatureImportance circuit={selectedCircuit} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
