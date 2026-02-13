"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
    percentage: number;
    completed: number;
    total: number;
}

export function ProgressBar({ percentage, completed, total }: ProgressBarProps) {
    return (
        <div className="glass-card p-6 mb-8">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Today's Progress</h2>
                    <p className="text-3xl font-bold">{Math.round(percentage)}%</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-white">{completed}</span> of {total} habits
                    </p>
                </div>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}
