import React from "react";
import { Brain, Plus, Calendar, TrendingUp, Heart, Thermometer, Clock, AlertCircle, } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/Chart";

// Example data for the chart
const healthData = [
  { date: "Mar", symptoms: 4, severity: 2 },
  { date: "Apr", symptoms: 3, severity: 1 },
  { date: "May", symptoms: 6, severity: 3 },
  { date: "Jun", symptoms: 2, severity: 1 },
  { date: "Jul", symptoms: 5, severity: 2 },
  { date: "Aug", symptoms: 4, severity: 2 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SymptoTrack</span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/symptom-checker"
              className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700"
            >
              Symptom Checker
            </a>
            <a
              href="/history"
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              History
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Health Dashboard
          </h1>
          <p className="text-gray-600">
            Track your health journey and get personalized insights.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl cursor-pointer">
            <a href="/symptom-checker" className="block p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">New Symptom Check</h3>
                <Plus className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">
                Analyze new symptoms with AI
              </p>
            </a>
          </div>

          <div className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl cursor-pointer">
            <a href="/history" className="block p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">View History</h3>
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Review past analyses</p>
            </a>
          </div>

          <div className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow rounded-xl cursor-pointer">
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">Health Trends</h3>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600">Analyze patterns over time</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Analysis */}
            <div className="bg-white shadow-lg rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">Recent Analysis</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Your latest symptom check from today
              </p>

              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Headache and Fatigue</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                    Mild
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Persistent headache on right side with general fatigue
                </p>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Common Cold</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <a
                href="/history"
                className="inline-block px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
              >
                View Full Analysis
              </a>
            </div>

            {/* Health Trends Chart */}
            <div className="bg-white shadow-lg rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h2 className="font-semibold">Health Trends</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Symptom frequency and severity over the last 6 months
              </p>
              <ChartContainer
                config={{
                  symptoms: {
                    label: "Symptoms",
                    color: "hsl(var(--chart-1))",
                  },
                  severity: {
                    label: "Severity",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="symptoms"
                      stroke="var(--color-symptoms)"
                      strokeWidth={2}
                      name="Symptom Count"
                    />
                    <Line
                      type="monotone"
                      dataKey="severity"
                      stroke="var(--color-severity)"
                      strokeWidth={2}
                      name="Average Severity"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Score */}
            <div className="bg-white shadow-lg rounded-xl p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold">Health Score</h3>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">85</div>
              <p className="text-sm text-gray-600 mb-4">Good health status</p>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-green-600 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white shadow-lg rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Analyses this month</span>
                </div>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Avg. severity</span>
                </div>
                <span className="font-semibold">Mild</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Last check</span>
                </div>
                <span className="font-semibold">Today</span>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-white shadow-lg rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold">Health Tips</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    Stay Hydrated
                  </p>
                  <p className="text-xs text-yellow-700">
                    Drink at least 8 glasses of water daily
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    Regular Exercise
                  </p>
                  <p className="text-xs text-green-700">
                    30 minutes of activity can boost your health
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
