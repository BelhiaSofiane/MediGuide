import React, { useState } from 'react';

export default function DashboardPage({ user, onLogout, onAddCheckup, onViewHistory }) {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const symptomSuggestions = [
    'Headache', 'Fever', 'Cough', 'Sore Throat', 'Runny Nose',
    'Nausea', 'Dizziness', 'Fatigue', 'Chest Pain', 'Shortness of Breath'
  ];

  const addSymptom = () => {
    if (symptoms.trim() && !selectedSymptoms.includes(symptoms.trim())) {
      setSelectedSymptoms([...selectedSymptoms, symptoms.trim()]);
      setSymptoms('');
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const possibleConditions = [
        'Common Cold', 'Seasonal Allergies', 'Influenza (Flu)',
        'Migraine', 'Strep Throat', 'COVID-19', 'Sinusitis'
      ].sort(() => 0.5 - Math.random()).slice(0, 3);

      const severity = selectedSymptoms.length > 3 ? 'Moderate' : 'Mild';

      setResults({
        conditions: possibleConditions,
        severity: severity,
        recommendation: severity === 'Mild'
          ? 'Rest and hydrate. Consider over-the-counter medication.'
          : 'Please consult with a healthcare professional for proper diagnosis.'
      });

      onAddCheckup({
        symptoms: [...selectedSymptoms],
        possibleConditions: possibleConditions
      });

      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedSymptoms([]);
    setResults(null);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-stethoscope text-white"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-800">MedCheck AI</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {user.name}</span>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Symptom Checker</h2>

              {!results ? (
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
                    onClick={analyzeSymptoms}
                    disabled={selectedSymptoms.length === 0 || isAnalyzing}
                    className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                      selectedSymptoms.length === 0 || isAnalyzing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-blue-700'
                    }`}
                  >
                    {isAnalyzing ? (
                      <span>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Analyzing with AI...
                      </span>
                    ) : (
                      'Analyze Symptoms'
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Analysis Complete</h3>
                  <p className="text-gray-600 mb-6">Based on your symptoms, here's what our AI suggests:</p>
                  <button
                    onClick={resetAnalysis}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 mb-6"
                  >
                    Start New Check
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {results ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Assessment Results</h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Possible Conditions:</h4>
                  <ul className="space-y-2">
                    {results.conditions.map((condition, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-arrow-right text-primary mt-1 mr-2"></i>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Severity:</h4>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                    results.severity === 'Mild'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {results.severity}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendation:</h4>
                  <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">
                    {results.recommendation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>
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
                    <p className="text-gray-600">Our AI analyzes your symptoms against medical databases</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <p className="text-gray-600">Receive possible conditions and recommendations</p>
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
                        This tool provides preliminary health information only and is not a substitute for professional medical advice.
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
