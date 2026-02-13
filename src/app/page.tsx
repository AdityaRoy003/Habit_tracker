"use client";

import { useState, useRef } from "react";
import { useHabits } from "@/hooks/useHabits";
import { ProgressBar } from "@/components/ProgressBar";
import { HabitCard } from "@/components/HabitCard";
import { AddHabitModal } from "@/components/AddHabitModal";
import { WeeklyChart } from "@/components/WeeklyChart";
import { Plus, Layout, Download, Upload, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { habits, addHabit, toggleHabit, deleteHabit, exportData, importData, stats } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pb-20">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">HabitFlow</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">New Habit</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressBar
            percentage={stats.completionPercentage}
            completed={stats.completedToday}
            total={stats.totalHabits}
          />

          <div className="space-y-4">
            {habits.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 glass-card p-10"
              >
                <p className="text-slate-500 mb-6 font-medium">No habits tracked yet. Start your journey today!</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-primary font-bold hover:underline"
                >
                  Add your first habit
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {habits.map((habit) => (
                  <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HabitCard
                      habit={habit}
                      onToggle={toggleHabit}
                      onDelete={deleteHabit}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-amber-200/50 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h3 className="font-bold text-amber-900 dark:text-amber-100">Achievements</h3>
            </div>
            <p className="text-sm text-amber-800/80 dark:text-amber-200/80">
              Your longest streak across all habits is <span className="font-black text-amber-600 dark:text-amber-400">{stats.globalLongestStreak} days</span>. Keep pushing!
            </p>
          </div>

          <WeeklyChart data={stats.weeklyData} />

          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Data Management</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={exportData}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-semibold"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={importData}
              className="hidden"
              accept=".json"
            />
          </div>
        </div>
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
}
