// Chart.jsx
import React from "react";
import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

// Wrapper to apply consistent styling (padding, aspect ratio, etc.)
export function ChartContainer({ children, className = "" }) {
  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

// Tooltip wrapper (connects to Recharts Tooltip)
export function ChartTooltip({ content }) {
  return <RechartsTooltip content={content} />;
}

// Default tooltip content renderer
export function ChartTooltipContent({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border shadow-md rounded-lg p-2 text-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-gray-700">
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}
