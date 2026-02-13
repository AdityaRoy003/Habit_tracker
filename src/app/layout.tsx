import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HabitFlow | Track Your Progress",
  description: "A minimalist habit tracker to help you reach your goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-indigo-100 selection:text-indigo-900`}>
        <main className="min-h-screen px-4 py-8 md:px-8 max-w-5xl mx-auto">
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            className: "glass-card dark:text-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
          }}
        />
      </body>
    </html>
  );
}
