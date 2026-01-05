import React from "react";

interface StepProgressProps {
  currentStep: number; 
  totalSteps?: number; 
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps = 4 }) => {
  return (
    <div className="flex gap-5 w-full">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
            i < currentStep ? "bg-indigo-500" : "bg-indigo-200"
          }`}
        />
      ))}
    </div>
  );
};

export default StepProgress;
