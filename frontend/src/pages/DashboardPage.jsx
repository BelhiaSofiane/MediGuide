import React, { useState } from 'react';

export default function DashboardPage({ user, historyStatus, onLogout, onAddCheckup, onViewHistory }) {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const userLabel = user.user_metadata?.full_name || user.email || 'User';

  const symptomSuggestions = [
    'Headache', 'Fever', 'Cough', 'Sore Throat', 'Runny Nose',
    'Nausea', 'Dizziness', 'Fatigue', 'Chest Pain', 'Shortness of Breath'
  ];

  const addSymptom = () => {
    if (symptoms.trim() && symptoms.trim().length <= 100 && selectedSymptoms.length < 10 && !selectedSymptoms.includes(symptoms.trim())) {
      setSelectedSymptoms([...selectedSymptoms, symptoms.trim()]);
      setSymptoms('');
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const saveDemoCheckup = async () => {
    if (selectedSymptoms.length === 0 || isSaving || historyStatus === 'loading') return;
    setAnalysisError('');
    setIsSaving(true);
    try {
      await onAddCheckup([...selectedSymptoms]);
      setHasSaved(true);
    } catch (error) {
      setAnalysisError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedSymptoms([]);
    setHasSaved(false);
    setAnalysisError('');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-stethoscope text-white"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-800">MediGuide Demo</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {userLabel}</span>
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Symptom Log Demo</h2>
              <p className="text-sm text-gray-600 mb-6">This demonstration saves symptoms you enter. It does not assess, diagnose, or recommend treatment.</p>

              {!hasSaved ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter your symptoms
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        maxLength={100}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., Headache, Fever"
                        list="symptomSuggestions"
                      />
                      <datalist id="symptomSuggestions">
                        {symptomSuggestions.map((symptom, index) => (
                          <option key={index} value={symptom} />
                        ))}
                      </datalist>
                      <button
                        onClick={addSymptom}
                        disabled={selectedSymptoms.length >= 10 || isSaving}
                        className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-200"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {selectedSymptoms.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {symptom}
                            <button
                              onClick={() => removeSymptom(symptom)}
                              className="ml-2 text-primary hover:text-blue-800"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={saveDemoCheckup}
                    disabled={selectedSymptoms.length === 0 || isSaving || historyStatus === 'loading'}
                    className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                      selectedSymptoms.length === 0 || isSaving || historyStatus === 'loading'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSaving ? (
                      <span>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Saving demo checkup...
                      </span>
                    ) : (
                      'Save Demo Checkup'
                    )}
                  </button>
                  {analysisError && <p role="alert" className="text-sm text-red-600 mt-3">{analysisError}</p>}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Demo Checkup Saved</h3>
                  <p className="text-gray-600 mb-6">Your symptoms were saved as a simulated record. No medical assessment was performed.</p>
                  <button
                    onClick={resetAnalysis}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 mb-6"
                  >
                    Start New Demo Check
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {hasSaved ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Demo Record</h3>
                <p className="text-gray-600">View History to see the symptoms you saved. This demo does not provide diagnoses or treatment advice.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">How the Demo Works</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <p className="text-gray-600">Enter your symptoms one by one</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <p className="text-gray-600">Save a simulated checkup in your private history</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <p className="text-gray-600">Review the symptoms you recorded</p>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-yellow-500"></i>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">Important Notice</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        This is a demo symptom log. It does not provide medical advice. For health concerns, contact a qualified professional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Navigation</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-200">
                  <span className="text-primary font-medium">Check Symptoms</span>
                  <i className="fas fa-arrow-right text-primary"></i>
                </button>
                <button
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                  onClick={onViewHistory}
                >
                  <span className="text-gray-700">View History</span>
                  <i className="fas fa-history text-gray-500"></i>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                  <span className="text-gray-700">Medical Resources</span>
                  <i className="fas fa-book-medical text-gray-500"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
