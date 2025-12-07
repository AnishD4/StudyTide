import "./globals.css";
import "./ocean-theme.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "StudyTide 🌊 - Ride the Wave of Success",
  description: "Dive into organized learning! Track classes, manage assignments, and get AI-powered study recommendations with StudyTide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-900 min-h-screen">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
