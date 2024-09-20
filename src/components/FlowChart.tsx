import { flowchartData } from '../flowChartData';
import { useState } from 'react';

const FlowChart = () => {
  const [currentStep, setCurrentStep] = useState<number>(1); // Start at step 1

  const handleChoice = (choice: string) => {
    const stepData = flowchartData[currentStep]; // Get current step's data
    if (stepData.choices) {
      const nextStep = stepData.choices[choice];
      if (nextStep !== undefined) {
        setCurrentStep(nextStep); // Move to the next question/result if valid
      } else {
        console.error('Invalid choice. No next step defined.');
      }
    }
  };

  const renderFlowchart = () => {
    const stepData = flowchartData[currentStep];

    if (!stepData) {
      return <p>Error: Invalid step</p>;
    }

    if (stepData.result) {
      return <p>{stepData.result}</p>; // Display the result if present
    }

    if (stepData.question && stepData.choices) {
      return (
        <div>
          <p>{stepData.question}</p>
          {Object.keys(stepData.choices).map((choice) => (
            <button key={choice} onClick={() => handleChoice(choice)}>
              {choice}
            </button>
          ))}
        </div>
      );
    }

    return <p>Error: Invalid step data</p>; // Fallback error message
  };

  return <div>{renderFlowchart()}</div>;
};

export default FlowChart;
