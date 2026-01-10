const feelingOptions = [
    { value: 'joyful', label: 'Joyful' },
    { value: 'down', label: 'Down' },
    { value: 'anxious', label: 'Anxious' },
    { value: 'calm', label: 'Calm' },
    { value: 'excited', label: 'Excited' },
    { value: 'frustrated', label: 'Frustrated' },
    { value: 'lonely', label: 'Lonely' },
    { value: 'stressed', label: 'Stressed' },
    { value: 'overwhelmed', label: 'Overwhelmed' },
    { value: 'grateful', label: 'Grateful' },
    { value: 'motivated', label: 'Motivated' },
    { value: 'hopeful', label: 'Hopeful' },
    { value: 'peaceful', label: 'Peaceful' },
    { value: 'content', label: 'Content' },
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'exhausted', label: 'Exhausted' },
    { value: 'disappointed', label: 'Disappointed' },
    { value: 'optimistic', label: 'Optimistic' },
]

const FeelingStep = ({ feelings, handleFeelingsChange }: { feelings: string[], handleFeelingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className='w-full'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>How did you feel?</h2>
            <span className='text-xs sm:text-sm md:text-base text-gray-500'>Select up to three tags:</span>
            <div className='w-full mt-6'>
            <div className="flex flex-wrap gap-4">
                {feelingOptions.map((option) => (
                    <label key={option.value} className={`flex items-center justify-between gap-2 rounded-lg bg-white border border-slate-200 border-2 p-2 px-4 accent-indigo-500 ${feelings.includes(option.value) ? '!border-indigo-500 border-2' : ''}`}>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" value={option.value} checked={feelings.includes(option.value)} onChange={handleFeelingsChange} className='w-4 h-4' />
                            <span className='text-sm sm:text-base md:text-lg'>{option.label}</span>
                        </div>
                    </label>
                ))}
                </div>
            </div>
        </div>
    )
}

export default FeelingStep;