
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface FeatureImportanceProps {
  circuit: string;
}

export const FeatureImportance = ({ circuit }: FeatureImportanceProps) => {
  // Mock feature importance data based on circuit characteristics
  const getFeatureImportance = (circuit: string) => {
    const baseFeatures = [
      { name: "Qualifying Time", importance: 0.35, description: "Grid position impact" },
      { name: "Clean Air Race Pace", importance: 0.28, description: "Pure speed in clean air" },
      { name: "Team Performance", importance: 0.15, description: "Constructor championship standing" },
      { name: "Rain Probability", importance: 0.12, description: "Weather conditions effect" },
      { name: "Average Position Change", importance: 0.08, description: "Historical track performance" },
      { name: "Temperature", importance: 0.02, description: "Ambient temperature impact" }
    ];

    // Adjust importance based on circuit characteristics
    if (circuit === "monaco") {
      baseFeatures[0].importance = 0.45; // Qualifying more important at Monaco
      baseFeatures[4].importance = 0.03; // Less overtaking
    } else if (circuit === "spa" || circuit === "silverstone") {
      baseFeatures[3].importance = 0.20; // Rain more likely
      baseFeatures[1].importance = 0.30; // Pace more important
    } else if (circuit === "monza") {
      baseFeatures[1].importance = 0.35; // Pure speed crucial
      baseFeatures[0].importance = 0.25; // More overtaking possible
    }

    return baseFeatures.sort((a, b) => b.importance - a.importance);
  };

  const features = getFeatureImportance(circuit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Feature Importance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={feature.name} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-sm text-gray-500">{feature.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{(feature.importance * 100).toFixed(1)}%</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 delay-${index * 100} ${
                    index === 0 ? 'bg-red-500' : 
                    index === 1 ? 'bg-orange-500' : 
                    index === 2 ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${feature.importance * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">Model Performance</h4>
          <div className="text-sm text-gray-600">
            The gradient boosting model analyzes these features to predict lap times with high accuracy.
            Feature importance varies by circuit characteristics and racing conditions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
