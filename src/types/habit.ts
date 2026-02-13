export interface Habit {
    id: string;
    name: string;
    category: string;
    completedDates: string[]; // ISO Strings (YYYY-MM-DD)
    currentStreak: number;
    longestStreak: number;
    lastCompletedDate: string | null; // ISO String (YYYY-MM-DD)
}

export type Category = "Health" | "Productivity" | "Finance" | "Leisure" | "Social" | "Other";

export const CATEGORIES: Category[] = ["Health", "Productivity", "Finance", "Leisure", "Social", "Other"];
