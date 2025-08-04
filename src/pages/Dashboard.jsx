import { useState } from "react"
import Link from "next/link"
import { Brain, ArrowRight, AlertTriangle, Clock, MapPin, Thermometer } from "lucide-react"

export default function SymptomChecker() {
  const [step, setStep] = useState(1)
  const [symptoms, setSymptoms] = useState("")
  const [duration, setDuration] = useState("")
  const [severity, setSeverity] = useState("")
  const [location, setLocation] = useState("")
  const [additionalSymptoms, setAdditionalSymptoms] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const commonSymptoms = [
    "Fever",
    "Headache",
    "Fatigue",
    "Nausea",
    "Dizziness",
    "Cough",
    "Sore throat",
    "Muscle aches",
    "Shortness of breath",
    "Chest pain",
  ]

  const handleSymptomToggle = (symptom) => {
    setAdditionalSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    )
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResults({
        possibleConditions: [
          { name: "Common Cold", probability: 75, severity: "Mild" },
          { name: "Seasonal Allergies", probability: 60, severity: "Mild" },
          { name: "Viral Upper Respiratory Infection", probability: 45, severity: "Mild to Moderate" },
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Consider over-the-counter pain relievers",
          "Monitor symptoms for 24-48 hours",
          "Consult a healthcare provider if symptoms worsen",
        ],
        urgency: "Low",
        nextSteps: "Self-care at home with monitoring",
      })
      setIsAnalyzing(false)
      setStep(4)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SymptoTrack</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="px-4 py-2 text-sm border rounded hover:bg-gray-100">Dashboard</Link>
            <Link href="/history" className="px-4 py-2 text-sm border rounded hover:bg-gray-100">History</Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
            <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-500 rounded"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-2">Describe Your Primary Symptom</h2>
            <p className="text-center text-gray-600 mb-6">
              Tell us about your main concern in your own words. Be as specific as possible.
            </p>
            <div className="mb-4">
              <label htmlFor="symptoms" className="block font-medium mb-1">What are you experiencing?</label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., I have a persistent headache..."
                className="w-full border p-3 rounded min-h-[120px]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-medium mb-1">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select duration</option>
                  <option value="less-than-hour">Less than 1 hour</option>
                  <option value="few-hours">A few hours</option>
                  <option value="today">Since today</option>
                  <option value="yesterday">Since yesterday</option>
                  <option value="few-days">A few days</option>
                  <option value="week">About a week</option>
                  <option value="weeks">Several weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Rate severity</option>
                  <option value="mild">Mild (1-3/10)</option>
                  <option value="moderate">Moderate (4-6/10)</option>
                  <option value="severe">Severe (7-8/10)</option>
                  <option value="extreme">Extreme (9-10/10)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!symptoms || !duration || !severity}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              Continue <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        )}

        {/* Step 2, Step 3, Step 4 continue in the same way */}
      </div>
    </div>
  )
}
