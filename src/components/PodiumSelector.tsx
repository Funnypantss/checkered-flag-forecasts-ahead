
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Medal, Award } from "lucide-react";

interface PodiumSelectorProps {
  customPodium: {
    first: string;
    second: string;
    third: string;
  };
  onPodiumChange: (podium: { first: string; second: string; third: string }) => void;
}

const drivers = [
  { code: "VER", name: "Max Verstappen", team: "Red Bull" },
  { code: "NOR", name: "Lando Norris", team: "McLaren" },
  { code: "LEC", name: "Charles Leclerc", team: "Ferrari" },
  { code: "PIA", name: "Oscar Piastri", team: "McLaren" },
  { code: "RUS", name: "George Russell", team: "Mercedes" },
  { code: "HAM", name: "Lewis Hamilton", team: "Mercedes" },
  { code: "SAI", name: "Carlos Sainz", team: "Ferrari" },
  { code: "ALO", name: "Fernando Alonso", team: "Aston Martin" },
  { code: "STR", name: "Lance Stroll", team: "Aston Martin" },
  { code: "HUL", name: "Nico Hulkenberg", team: "Haas" },
  { code: "OCO", name: "Esteban Ocon", team: "Alpine" },
  { code: "GAS", name: "Pierre Gasly", team: "Alpine" },
  { code: "TSU", name: "Yuki Tsunoda", team: "Racing Bulls" },
  { code: "RIC", name: "Daniel Ricciardo", team: "Racing Bulls" },
  { code: "ALB", name: "Alexander Albon", team: "Williams" },
  { code: "SAR", name: "Logan Sargeant", team: "Williams" },
  { code: "BOT", name: "Valtteri Bottas", team: "Kick Sauber" },
  { code: "ZHO", name: "Zhou Guanyu", team: "Kick Sauber" },
  { code: "MAG", name: "Kevin Magnussen", team: "Haas" },
  { code: "BEA", name: "Oliver Bearman", team: "Haas" }
];

const getTeamColor = (team: string) => {
  const teamColors = {
    "Red Bull": "bg-blue-600",
    "McLaren": "bg-orange-500",
    "Ferrari": "bg-red-600",
    "Mercedes": "bg-teal-500",
    "Aston Martin": "bg-green-600",
    "Alpine": "bg-pink-500",
    "Racing Bulls": "bg-blue-400",
    "Haas": "bg-gray-600",
    "Williams": "bg-blue-800",
    "Kick Sauber": "bg-green-800"
  };
  return teamColors[team as keyof typeof teamColors] || "bg-gray-500";
};

export const PodiumSelector = ({ customPodium, onPodiumChange }: PodiumSelectorProps) => {
  const handlePositionChange = (position: "first" | "second" | "third", driverCode: string) => {
    onPodiumChange({
      ...customPodium,
      [position]: driverCode
    });
  };

  const getAvailableDrivers = (currentPosition: "first" | "second" | "third") => {
    const selectedDrivers = Object.values(customPodium).filter(Boolean);
    return drivers.filter(driver => 
      driver.code === customPodium[currentPosition] || !selectedDrivers.includes(driver.code)
    );
  };

  const getSelectedDriver = (driverCode: string) => {
    return drivers.find(driver => driver.code === driverCode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Custom Podium Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {/* First Place */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold">🥇</span>
            </div>
            <h3 className="font-bold text-lg mb-3">1st Place</h3>
            <Select 
              value={customPodium.first} 
              onValueChange={(value) => handlePositionChange("first", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select P1 driver" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableDrivers("first").map((driver) => (
                  <SelectItem key={driver.code} value={driver.code}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTeamColor(driver.team)}`}></div>
                      <span className="font-medium">{driver.code}</span>
                      <span className="text-sm text-gray-500">- {driver.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {customPodium.first && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <div className="font-bold">{getSelectedDriver(customPodium.first)?.name}</div>
                <div className={`text-sm text-white px-2 py-1 rounded mt-1 ${getTeamColor(getSelectedDriver(customPodium.first)?.team || "")}`}>
                  {getSelectedDriver(customPodium.first)?.team}
                </div>
              </div>
            )}
          </div>

          {/* Second Place */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Medal className="h-8 w-8 text-gray-400" />
              <span className="text-2xl font-bold">🥈</span>
            </div>
            <h3 className="font-bold text-lg mb-3">2nd Place</h3>
            <Select 
              value={customPodium.second} 
              onValueChange={(value) => handlePositionChange("second", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select P2 driver" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableDrivers("second").map((driver) => (
                  <SelectItem key={driver.code} value={driver.code}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTeamColor(driver.team)}`}></div>
                      <span className="font-medium">{driver.code}</span>
                      <span className="text-sm text-gray-500">- {driver.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {customPodium.second && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                <div className="font-bold">{getSelectedDriver(customPodium.second)?.name}</div>
                <div className={`text-sm text-white px-2 py-1 rounded mt-1 ${getTeamColor(getSelectedDriver(customPodium.second)?.team || "")}`}>
                  {getSelectedDriver(customPodium.second)?.team}
                </div>
              </div>
            )}
          </div>

          {/* Third Place */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold">🥉</span>
            </div>
            <h3 className="font-bold text-lg mb-3">3rd Place</h3>
            <Select 
              value={customPodium.third} 
              onValueChange={(value) => handlePositionChange("third", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select P3 driver" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableDrivers("third").map((driver) => (
                  <SelectItem key={driver.code} value={driver.code}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTeamColor(driver.team)}`}></div>
                      <span className="font-medium">{driver.code}</span>
                      <span className="text-sm text-gray-500">- {driver.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {customPodium.third && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-600">
                <div className="font-bold">{getSelectedDriver(customPodium.third)?.name}</div>
                <div className={`text-sm text-white px-2 py-1 rounded mt-1 ${getTeamColor(getSelectedDriver(customPodium.third)?.team || "")}`}>
                  {getSelectedDriver(customPodium.third)?.team}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {(customPodium.first || customPodium.second || customPodium.third) && (
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
            <h4 className="font-bold text-lg mb-3">Your Custom Podium Prediction</h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl mb-1">🥇</div>
                <div className="font-bold">
                  {customPodium.first ? getSelectedDriver(customPodium.first)?.code : "---"}
                </div>
              </div>
              <div>
                <div className="text-2xl mb-1">🥈</div>
                <div className="font-bold">
                  {customPodium.second ? getSelectedDriver(customPodium.second)?.code : "---"}  
                </div>
              </div>
              <div>
                <div className="text-2xl mb-1">🥉</div>
                <div className="font-bold">
                  {customPodium.third ? getSelectedDriver(customPodium.third)?.code : "---"}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
