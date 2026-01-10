import { useState } from "react";
import StepProgress from "../UI/StepProgress";
import OverallModeStep from "./MoodFormSteps/OverallModeStep";
import FeelingStep from "./MoodFormSteps/FeelingStep";
import JournalEntry from "./MoodFormSteps/journalEntry";
import TotalHoursStep from "./MoodFormSteps/TotalHoursStep";

export default function LogMoodForm({
  onSubmit,
}: {
  onSubmit: (moodData: any) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [overallMood, setOverallMood] = useState(0);
  const [feelings, setFeelings] = useState<string[]>([]);
  const [journalEntry, setJournalEntry] = useState("");
  const [sleepHours, setSleepHours] = useState("");

  const handleOverallMoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOverallMood(parseInt(e.target.value));
  };
  const handleFeelingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFeelings((prevFeelings) => {
      if (checked) {
        if (prevFeelings.includes(value)) return prevFeelings;
        // if (prevFeelings.length >= 3) return prevFeelings;
        return [...prevFeelings, value];
      } else {
        return prevFeelings.filter((feeling) => feeling !== value);
      }
    });
  };
  const handleJournalEntryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJournalEntry(e.target.value);
  };
  const handleSleepHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSleepHours(e.target.value);
  };
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);

    if (currentStep === 4) console.log(feelings);
  };

  return (
    <div className="p-8 pt-2">
      <div className="flex justify-between items-start flex-col gap-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Log your mood
        </h2>
        <div className="w-full">
          <StepProgress currentStep={currentStep} />
        </div>
        {currentStep === 1 && (
          <OverallModeStep
            overallMood={overallMood}
            handleOverallMoodChange={handleOverallMoodChange}
          />
        )}
        {currentStep === 2 && (
          <FeelingStep
            feelings={feelings}
            handleFeelingsChange={handleFeelingsChange}
          />
        )}
        {currentStep === 3 && (
          <JournalEntry
            journalEntry={journalEntry}
            handleJournalEntryChange={handleJournalEntryChange}
          />
        )}
        {currentStep === 4 && (
          <TotalHoursStep
            sleepHours={sleepHours}
            handleSleepHoursChange={handleSleepHoursChange}
          />
        )}
        <div className="w-full flex justify-between items-center gap-4">
          {currentStep <= 3 && (
            <button
              onClick={handleNextStep}
              className="bg-indigo-500 text-white px-4 py-4 rounded-md w-full text-sm sm:text-base md:text-lg font-semibold"
            >
              Continue
            </button>
          )}
          {currentStep > 3 && (
            <button
              onClick={() =>
                onSubmit({ overallMood, feelings, journalEntry, sleepHours })
              }
              className="bg-indigo-500 text-white px-4 py-4 rounded-md w-full text-sm sm:text-base md:text-lg font-semibold"
            >
              Submit
            </button>
          )}
          {/* <button onClick={handleNextStep} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Next</button> */}
        </div>
      </div>
    </div>
  );
}
