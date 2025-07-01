
import { useState } from "react";

export const usePredictions = () => {
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

  const handlePredict = async (selectedCircuit: string) => {
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

  return {
    predictions,
    loading,
    handlePredict
  };
};
