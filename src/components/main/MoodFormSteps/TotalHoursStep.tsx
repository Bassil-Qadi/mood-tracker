const sleepHoursOptions = [
    { value: "+9", label: '+9 hours' },
    { value: "7 - 8", label: '7 - 8 hours' },
    { value: "5 - 6", label: '5 - 6 hours' },
    { value: "3 - 4", label: '3 - 4 hours' },
    { value: "0-2", label: '0 - 2 hours' },
]

const TotalHoursStep = ({ sleepHours, handleSleepHoursChange } : { sleepHours: string, handleSleepHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className='w-full'>
            <h2 className='text-2xl font-bold mb-4'>How many hours did you sleep?</h2>
            <div className='w-full'>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-6 w-full">
                    {sleepHoursOptions.map((option) => (
                        <label key={option.value} className={`flex items-center justify-between gap-2 w-full bg-white rounded-lg border border-indigo-100 border-2 p-4 ${sleepHours === option.value ? '!border-indigo-500 border-2' : ''}`}>
                            <div className='flex items-center gap-2'>
                                <input type="radio" name="sleepHours" value={option.value} checked={sleepHours === option.value} onChange={handleSleepHoursChange} className='w-4 h-4' />
                                <span className='text-lg font-semibold'>{option.label}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default TotalHoursStep