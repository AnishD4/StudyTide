import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "StudyTide - AI-Powered Student Organizer",
  description: "Organize your classes, track assignments, and get AI-powered study recommendations with StudyTide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
