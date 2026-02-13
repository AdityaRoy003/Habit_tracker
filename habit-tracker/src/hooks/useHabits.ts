"use client";

import { useCallback, useMemo, useEffect } from "react";
import { Habit, Category } from "@/types/habit";
import { useLocalStorage } from "./useLocalStorage";
import { format, subDays, isSameDay, parseISO } from "date-fns";
import { fetchRandomQuote } from "@/services/quoteService";
import toast from "react-hot-toast";

export function useHabits() {
    const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

    // Midnight Reset & Streak Maintenance
    useEffect(() => {
        const checkAndReset = () => {
            const today = format(new Date(), "yyyy-MM-dd");
            const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

            setHabits((prev) =>
                prev.map((habit) => {
                    // If the last completion was before yesterday, reset current streak
                    if (habit.lastCompletedDate && habit.lastCompletedDate !== today && habit.lastCompletedDate !== yesterday) {
                        return { ...habit, currentStreak: 0 };
                    }
                    return habit;
                })
            );
        };

        checkAndReset();
        const interval = setInterval(checkAndReset, 1000 * 60 * 60); // Every hour
        return () => clearInterval(interval);
    }, [setHabits]);

    const addHabit = useCallback((name: string, category: Category) => {
        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name,
            category,
            completedDates: [],
            currentStreak: 0,
            longestStreak: 0,
            lastCompletedDate: null,
        };
        setHabits((prev) => [...prev, newHabit]);
    }, [setHabits]);

    const toggleHabit = useCallback(async (id: string) => {
        const today = format(new Date(), "yyyy-MM-dd");
        let isNowCompleted = false;

        setHabits((prev) =>
            prev.map((habit) => {
                if (habit.id !== id) return habit;

                const alreadyCompletedToday = habit.completedDates.includes(today);
                let newCompletedDates = [...habit.completedDates];
                let newCurrentStreak = habit.currentStreak;
                let newLongestStreak = habit.longestStreak;
                let newLastCompletedDate = habit.lastCompletedDate;

                if (alreadyCompletedToday) {
                    newCompletedDates = newCompletedDates.filter(d => d !== today);
                    isNowCompleted = false;
                    // Note: Streak recalculation on undo is omitted for simplicity in MVP
                } else {
                    newCompletedDates.push(today);
                    isNowCompleted = true;

                    const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
                    if (habit.lastCompletedDate === yesterday) {
                        newCurrentStreak += 1;
                    } else if (habit.lastCompletedDate === null || habit.lastCompletedDate !== today) {
                        newCurrentStreak = 1;
                    }

                    if (newCurrentStreak > newLongestStreak) {
                        newLongestStreak = newCurrentStreak;
                    }
                    newLastCompletedDate = today;
                }

                return {
                    ...habit,
                    completedDates: newCompletedDates,
                    currentStreak: newCurrentStreak,
                    longestStreak: newLongestStreak,
                    lastCompletedDate: newLastCompletedDate,
                };
            })
        );

        if (isNowCompleted) {
            const quote = await fetchRandomQuote();
            if (quote) {
                toast(`${quote.q}\n— ${quote.a}`, {
                    icon: "✨",
                    duration: 6000,
                });
            } else {
                toast.success("Habit logged! Great job!");
            }
        }
    }, [setHabits]);

    const deleteHabit = useCallback((id: string) => {
        setHabits((prev) => prev.filter(h => h.id !== id));
    }, [setHabits]);

    const exportData = useCallback(() => {
        const dataStr = JSON.stringify(habits, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `habits-export-${format(new Date(), 'yyyy-MM-dd')}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        toast.success("Data exported successfully!");
    }, [habits]);

    const importData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const importedHabits = JSON.parse(content);
                if (Array.isArray(importedHabits)) {
                    setHabits(importedHabits);
                    toast.success("Data imported successfully!");
                } else {
                    throw new Error("Invalid format");
                }
            } catch (error) {
                toast.error("Failed to import data. Please check the file format.");
            }
        };
        reader.readAsText(file);
    }, [setHabits]);

    const stats = useMemo(() => {
        const today = format(new Date(), "yyyy-MM-dd");
        const totalHabits = habits.length;
        const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
        const completionPercentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

        // Weekly chart data
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i);
            const dayStr = format(date, "yyyy-MM-dd");
            const shortDay = format(date, "EEE");
            const count = habits.filter(h => h.completedDates.includes(dayStr)).length;
            return { name: shortDay, completed: count };
        });

        // Longest streak across all habits
        const globalLongestStreak = Math.max(...habits.map(h => h.longestStreak), 0);

        return {
            totalHabits,
            completedToday,
            completionPercentage,
            weeklyData: last7Days,
            globalLongestStreak,
        };
    }, [habits]);

    return {
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
        exportData,
        importData,
        stats,
    };
}
