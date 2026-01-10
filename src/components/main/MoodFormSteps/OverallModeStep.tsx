import iconHappyColor from '../../../assets/images/icon-happy-color.svg';
import iconVeryHappyColor from '../../../assets/images/icon-very-happy-color.svg';
import iconSadColor from '../../../assets/images/icon-sad-color.svg';
import iconVerySadColor from '../../../assets/images/icon-very-sad-color.svg';
import iconNeutralColor from '../../../assets/images/icon-neutral-color.svg';

const overallMoodOptions = [
    { value: 5, label: 'Very Happy', icon: iconVeryHappyColor.toString() },
    { value: 4, label: 'Happy', icon: iconHappyColor.toString() },
    { value: 3, label: 'Neutral', icon: iconNeutralColor.toString() },
    { value: 2, label: 'Sad', icon: iconSadColor.toString() },
    { value: 1, label: 'Very Sad', icon: iconVerySadColor.toString() },
]

const OverallModeStep = ({ overallMood, handleOverallMoodChange }: { overallMood: number, handleOverallMoodChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className='w-full'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6'>How was your mood today?</h2>
            <div className='w-full'>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-6 w-full">
                    {overallMoodOptions.map((option) => (
                        <label key={option.value} className={`flex items-center justify-between gap-2 w-full bg-white rounded-lg border border-indigo-100 border-2 p-4 ${overallMood === option.value ? '!border-indigo-500 border-2' : ''}`}>
                            <div className='flex items-center gap-2'>
                            <input type="radio" name="overallMood" value={option.value} checked={overallMood === option.value} onChange={handleOverallMoodChange} className='w-4 h-4' />
                            <span className='text-sm sm:text-base md:text-lg font-semibold'>{option.label}</span>
                            </div>
                            <img src={option.icon as string} alt={option.label} className='w-8 h-8' />
                        </label>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default OverallModeStep;