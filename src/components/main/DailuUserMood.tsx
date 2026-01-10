import iconVerySadColor from '../../assets/images/icon-very-sad-color.svg';
import iconSadColor from '../../assets/images/icon-sad-color.svg';
import iconNeutralColor from '../../assets/images/icon-neutral-color.svg';
import iconHappyColor from '../../assets/images/icon-happy-color.svg';
import iconVeryHappyColor from '../../assets/images/icon-very-happy-color.svg';
import iconSleep from '../../assets/images/icon-sleep.svg';
import iconReflection from '../../assets/images/icon-reflection.svg';

const moodIconMap = {
  "1": iconVerySadColor,
  "2": iconSadColor,
  "3": iconNeutralColor,
  "4": iconHappyColor,
  "5": iconVeryHappyColor,
};

const moodMap = {
  "1": "Very Sad",
  "2": "Sad",
  "3": "Neutral",
  "4": "Happy",
  "5": "Very Happy",
};


const DailyUserMood = ({userModeData}: {userModeData: any}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 flex flex-col gap-10 relative overflow-hidden">
        <img 
          src={moodIconMap[userModeData?.overallMood as keyof typeof moodIconMap]} 
          alt={moodMap[userModeData?.overallMood as keyof typeof moodMap]} 
          className="absolute right-5 top-1/2 -translate-y-1/2 sm:w-64 sm:h-64 pointer-events-none"
        />
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-500 mb-1">I'm feeling</h3>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{moodMap[userModeData?.overallMood as keyof typeof moodMap]}</h1>
        </div>
        <div className="z-10 absolute bottom-6 left-6 hidden md:block">
          <i className="text-sm sm:text-base md:text-lg font-semibold">"When your heart is full, share your light with the world."</i>
        </div>
      </div>
      <div className="md:col-span-1 flex flex-col gap-4">
        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm p-6">
          <h5 className="text-sm sm:text-base md:text-lg text-gray-500 font-semibold flex items-center gap-2"><img src={iconSleep} alt="Sleep" className="w-6 h-6" /> Sleep</h5>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{userModeData?.sleepHours} hours</h1>
        </div>
        <div className="flex flex-col gap-2 bg-white rounded-lg shadow-sm p-6">
          <h5 className="text-sm sm:text-base md:text-lg text-gray-500 font-semibold flex items-center gap-2"><img src={iconReflection} alt="Reflection" className="w-6 h-6" /> Reflection of the day</h5>
          <div className="flex flex-col gap-12">
            <p className="text-sm sm:text-base md:text-lg first-letter:capitalize font-semibold">{userModeData?.journalEntry}</p>
            <i className="text-xs sm:text-sm md:text-base text-gray-500 font-semibold">{userModeData?.feelings.map((feeling: string) => `#${feeling.charAt(0).toUpperCase() + feeling.slice(1)}`).join(' ')}</i>
          </div>
          
      </div>
      </div>
    </div>
  );
};

export default DailyUserMood;
