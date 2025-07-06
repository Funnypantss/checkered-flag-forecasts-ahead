
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CircuitSelectorProps {
  selectedCircuit: string;
  onCircuitChange: (circuit: string) => void;
}

const circuits = [
  { value: "monaco", name: "Monaco Grand Prix", country: "Monaco" },
  { value: "silverstone", name: "British Grand Prix", country: "United Kingdom" },
  { value: "spa", name: "Belgian Grand Prix", country: "Belgium" },
  { value: "monza", name: "Italian Grand Prix", country: "Italy" },
  { value: "suzuka", name: "Japanese Grand Prix", country: "Japan" },
  { value: "interlagos", name: "Brazilian Grand Prix", country: "Brazil" },
  { value: "barcelona", name: "Spanish Grand Prix", country: "Spain" },
  { value: "redbull-ring", name: "Austrian Grand Prix", country: "Austria" },
  { value: "hungaroring", name: "Hungarian Grand Prix", country: "Hungary" },
  { value: "zandvoort", name: "Dutch Grand Prix", country: "Netherlands" },
  { value: "singapore", name: "Singapore Grand Prix", country: "Singapore" },
  { value: "austin", name: "United States Grand Prix", country: "USA" }
];

export const CircuitSelector = ({ selectedCircuit, onCircuitChange }: CircuitSelectorProps) => {
  const selectedCircuitData = circuits.find(c => c.value === selectedCircuit) || circuits[0];

  return (
    <div className="space-y-4">
      <Select value={selectedCircuit} onValueChange={onCircuitChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a circuit" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700">
          {circuits.map((circuit) => (
            <SelectItem 
              key={circuit.value} 
              value={circuit.value}
              className="text-white hover:bg-gray-800 focus:bg-gray-800"
            >
              <div className="flex flex-col">
                <span className="font-medium">{circuit.name}</span>
                <span className="text-sm text-gray-400">{circuit.country}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="p-4 glass-card rounded-lg border border-gray-700">
        <h4 className="font-medium text-sm mb-3 racing-red">🏁 Selected Circuit</h4>
        <div className="space-y-2">
          <div className="text-white font-semibold">
            {selectedCircuitData.name}
          </div>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <span>📍</span>
            {selectedCircuitData.country}
          </div>
        </div>
      </div>
    </div>
  );
};
