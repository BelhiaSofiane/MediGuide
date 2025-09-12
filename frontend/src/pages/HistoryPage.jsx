export default function HistoryPage({ user, checkupHistory, onBack }) {
    return (
        <div className="min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            onClick={onBack}
                            className="mr-4 text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-stethoscope text-white"></i>
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">Checkup History</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">Hello, {user.name}</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Symptom Check History</h2>
                    {checkupHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-history text-gray-400 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-600 mb-2">No checkup history yet</h3>
                            <p className="text-gray-500">Your symptom analyses will appear here after you complete your first check.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {checkupHistory.map((checkup) => (
                                <div key={checkup.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-200">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-medium text-gray-800">Checkup on {checkup.date}</h3>
                                        <span className="text-sm text-gray-500">#{checkup.id}</span>
                                    </div>
                                    <div className="mb-3">
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Symptoms reported:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {checkup.symptoms.map((symptom, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-primary px-2 py-1 rounded-full text-xs"
                                                >
                                                    {symptom}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700 mb-1">Possible conditions:</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                                            {checkup.possibleConditions.map((condition, index) => (
                                                <li key={index}>{condition}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
