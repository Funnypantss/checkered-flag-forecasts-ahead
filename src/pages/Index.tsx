
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <AppHeader />

        {/* Main Content */}
        <Tabs defaultValue="real-data" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="real-data">Real F1 Data</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="full-results">Full Results</TabsTrigger>
            <TabsTrigger value="analysis">Feature Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="real-data">
            <RealF1Data />
          </TabsContent>
          
          <TabsContent value="predictions">
            <PredictionPanel
              selectedCircuit={selectedCircuit}
              onCircuitChange={setSelectedCircuit}
              onPredict={onPredict}
              loading={loading}
              predictions={predictions}
            />

            {predictions && (
              <PredictionResults 
                predictions={predictions}
                type="podium"
              />
            )}
          </TabsContent>
          
          <TabsContent value="full-results">
            {predictions ? (
              <PredictionResults 
                predictions={predictions}
                type="full"
              />
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">Run a prediction first to see full results</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="analysis">
            <FeatureImportance circuit={selectedCircuit} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
