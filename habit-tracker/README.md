# HabitFlow 🚀

HabitFlow is a minimalist, responsive habit tracking web application built with Next.js and TailwindCSS. It helps users build consistency through streak tracking, motivational insights, and a clean user experience.

![HabitFlow Dashboard Mockup](![alt text](image.png))

## ✨ Features

- **Habit Management**: Add, track, and manage your daily habits with ease.
- **Streak Tracking**: Stay motivated with 🔥 streaks and track your all-time longest streak.
- **Weekly Progress Chart**: Visualize your consistency over the last 7 days with interactive bar charts.
- **Motivational Quotes**: Receive daily doses of inspiration from the ZenQuotes API upon habit completion.
- **Quote Caching**: Offline-ready motivational quotes (caches the last 3 quotes).
- **Data Portability**: Export your progress to JSON and import it back anytime. No database required!
- **Privacy First**: All data is stored locally in your browser using `localStorage`.
- **Responsive Design**: fully optimized for both mobile and desktop views.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **State Management**: Custom React Hooks & LocalStorage

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AdityaRoy003/Habit_tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to start tracking!

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router (Pages & API)
├── components/       # Reusable UI components
├── hooks/            # Custom hooks (useHabits, useLocalStorage)
├── services/         # External API integrations (quoteService)
└── types/            # TypeScript interfaces
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
Built with ❤️ to help you achieve your goals.
