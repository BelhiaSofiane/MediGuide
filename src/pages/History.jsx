"use client"

import React from "react"
import { Brain, Calendar, Search, Filter, Clock, TrendingUp, Download, Share } from "lucide-react"
import { Link } from "react-router-dom" // if you're using React Router (swap if using Next.js)

const historyData = [
  {
    id: 1,
    date: "2024-01-15",
    time: "10:30 AM",
    primarySymptom: "Headache and Fatigue",
    severity: "Mild",
    topCondition: "Common Cold",
    probability: 75,
    status: "Resolved",
  },
  {
    id: 2,
    date: "2024-01-10",
    time: "2:15 PM",
    primarySymptom: "Sore Throat",
    severity: "Moderate",
    topCondition: "Viral Pharyngitis",
    probability: 82,
    status: "Resolved",
  },
  {
    id: 3,
    date: "2024-01-05",
    time: "9:45 AM",
    primarySymptom: "Stomach Pain",
    severity: "Moderate",
    topCondition: "Gastritis",
    probability: 68,
    status: "Monitoring",
  },
  {
    id: 4,
    date: "2023-12-28",
    time: "4:20 PM",
    primarySymptom: "Cough and Congestion",
    severity: "Mild",
    topCondition: "Upper Respiratory Infection",
    probability: 79,
    status: "Resolved",
  },
  {
    id: 5,
    date: "2023-12-20",
    time: "11:00 AM",
    primarySymptom: "Back Pain",
    severity: "Severe",
    topCondition: "Muscle Strain",
    probability: 85,
    status: "Resolved",
  },
]

export default function History() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SymptoTrack</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/symptom-checker"
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Symptom Checker
            </Link>
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical History</h1>
            <p className="text-gray-600">Review your past symptom analyses and health insights.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="px-3 py-2 border rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-100">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="px-3 py-2 border rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-100">
              <Share className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Filter className="w-5 h-5" /> Filter & Search
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search symptoms..."
                className="pl-10 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="border rounded-lg px-3 py-2">
              <option>All Severities</option>
              <option>Mild</option>
              <option>Moderate</option>
              <option>Severe</option>
            </select>
            <select className="border rounded-lg px-3 py-2">
              <option>All Status</option>
              <option>Resolved</option>
              <option>Monitoring</option>
              <option>Ongoing</option>
            </select>
            <select className="border rounded-lg px-3 py-2">
              <option>All Time</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Analyses</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Brain className="w-8 h-8 text-blue-600" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Severity</p>
              <p className="text-2xl font-bold text-gray-900">2.4</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">80%</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-green-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {historyData.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{entry.primarySymptom}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${entry.severity === "Mild"
                          ? "bg-gray-200 text-gray-800"
                          : entry.severity === "Moderate"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {entry.severity}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${entry.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {entry.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {entry.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {entry.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Top match:</span>
                    <span className="font-medium">{entry.topCondition}</span>
                    <span className="text-gray-500">({entry.probability}% match)</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                  <button className="px-3 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 text-sm">
                    View Details
                  </button>
                  <button className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
            Load More Entries
          </button>
        </div>
      </div>
    </div>
  )
}
