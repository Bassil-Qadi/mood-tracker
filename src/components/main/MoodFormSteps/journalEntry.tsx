const JournalEntry = ({ journalEntry, handleJournalEntryChange } : { journalEntry: string, handleJournalEntryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {
    return (
        <div className='w-full'>
            <h2 className='text-2xl font-bold mb-4'>Write about your day...</h2>
            <textarea value={journalEntry} placeholder="Today, I felt..." onChange={handleJournalEntryChange} className='w-full h-40 p-4 rounded-lg border border-slate-200 border-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500' />
        </div>
    );
}

export default JournalEntry