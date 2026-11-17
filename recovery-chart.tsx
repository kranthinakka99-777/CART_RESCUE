"use client";

import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend, CartesianGrid
} from "recharts";

interface RecoveryChartProps {
  trendData: Array<{ day: string; abandoned: number; recovered: number; margin_saved: number }>;
  actionDistribution: Record<string, number>;
  intentBreakdown: Record<string, number>;
}

const LIGHT_COLORS = ["#0F766E", "#2563EB", "#D97706", "#7C3AED", "#059669", "#DC2626"];

export function RecoveryTrendChart({ trendData }: { trendData: Array<{ day: string; abandoned: number; recovered: number; margin_saved: number }> }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMarginLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0F766E" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorRecoveredLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: "12px", color: "#0F172A", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          />
          <Area type="monotone" dataKey="margin_saved" name="Margin Saved ($)" stroke="#0F766E" strokeWidth={2} fillOpacity={1} fill="url(#colorMarginLight)" />
          <Area type="monotone" dataKey="recovered" name="Carts Rescued" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRecoveredLight)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActionDistributionChart({ actionDistribution }: { actionDistribution: Record<string, number> }) {
  const data = Object.entries(actionDistribution).map(([key, val]) => ({
    name: key.replace(/_/g, " "),
    count: val,
  }));

  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
          <XAxis type="number" stroke="#64748B" fontSize={11} hide />
          <YAxis dataKey="name" type="category" stroke="#334155" fontSize={11} tickLine={false} width={110} />
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: "12px", color: "#0F172A", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          />
          <Bar dataKey="count" fill="#0F766E" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={LIGHT_COLORS[index % LIGHT_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function IntentBreakdownChart({ intentBreakdown }: { intentBreakdown: Record<string, number> }) {
  const data = Object.entries(intentBreakdown).map(([key, val]) => ({
    name: key,
    value: val,
  }));

  return (
    <div className="h-64 w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={LIGHT_COLORS[index % LIGHT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: "12px", color: "#0F172A", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-[11px] text-slate-600 font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
