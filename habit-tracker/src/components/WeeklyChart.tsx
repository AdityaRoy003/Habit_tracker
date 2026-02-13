"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface WeeklyChartProps {
    data: { name: string; completed: number }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
    return (
        <div className="glass-card p-6 mb-8 mt-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">Weekly Progress</h3>
            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "var(--background)",
                                color: "var(--foreground)"
                            }}
                        />
                        <Bar
                            dataKey="completed"
                            radius={[6, 6, 0, 0]}
                            animationDuration={1500}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.completed > 0 ? "#6366f1" : "#e2e8f0"}
                                    className="dark:fill-slate-800"
                                    fillOpacity={entry.completed > 0 ? 1 : 0.3}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
