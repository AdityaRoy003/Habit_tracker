"use client";

import { Habit } from "@/types/habit";
import { Check, Flame, Trophy, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface HabitCardProps {
    habit: Habit;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
    const today = format(new Date(), "yyyy-MM-dd");
    const isDoneToday = habit.completedDates.includes(today);

    return (
        <div className="glass-card p-5 flex items-center justify-between group transition-all hover:translate-y-[-2px]">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggle(habit.id)}
                    className={cn(
                        "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        isDoneToday
                            ? "bg-success border-success text-white"
                            : "border-slate-200 dark:border-slate-700 hover:border-primary text-transparent hover:text-primary/30"
                    )}
                >
                    <Check className={cn("w-6 h-6 transform transition-transform", isDoneToday ? "scale-100" : "scale-0")} />
                </button>

                <div>
                    <h3 className={cn(
                        "font-semibold text-lg transition-all",
                        isDoneToday && "text-slate-400 line-through"
                    )}>
                        {habit.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium lowercase">
                            {habit.category}
                        </span>
                        <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                            <Flame className="w-4 h-4 fill-orange-500" />
                            <span>{habit.currentStreak}</span>
                        </div>
                        {habit.longestStreak > 0 && (
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                <Trophy className="w-4 h-4" />
                                <span>{habit.longestStreak}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(habit.id)}
                className="p-2 text-slate-300 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete habit"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
