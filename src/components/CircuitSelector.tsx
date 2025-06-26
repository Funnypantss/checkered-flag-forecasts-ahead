
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
  return (
    <div className="space-y-4">
      <Select value={selectedCircuit} onValueChange={onCircuitChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a circuit" />
        </SelectTrigger>
        <SelectContent>
          {circuits.map((circuit) => (
            <SelectItem key={circuit.value} value={circuit.value}>
              <div className="flex flex-col">
                <span className="font-medium">{circuit.name}</span>
                <span className="text-sm text-gray-500">{circuit.country}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="p-3 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Circuit Info</h4>
        <div className="text-sm text-gray-600">
          {circuits.find(c => c.value === selectedCircuit)?.name || "Monaco Grand Prix"}
        </div>
      </div>
    </div>
  );
};
