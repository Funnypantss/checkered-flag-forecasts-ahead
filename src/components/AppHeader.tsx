
import { Car, Trophy } from "lucide-react";

export const AppHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Car className="h-8 w-8 text-red-600" />
        <h1 className="text-4xl font-bold text-gray-900">F1 Race Winner Predictor</h1>
        <Trophy className="h-8 w-8 text-yellow-500" />
      </div>
      <p className="text-lg text-gray-600">
        Real Formula 1 data and advanced machine learning predictions
      </p>
    </div>
  );
};
