"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navigation.css";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/calendar", label: "Calendar", icon: "📅" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

const authItems = [
  { href: "/login", label: "Login", icon: "🔑" },
  { href: "/signup", label: "Sign Up", icon: "✨" },
];

export default function Navigation() {
  const pathname = usePathname();

  // Don't show nav on auth pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <span className="logo-icon">🌊</span>
          <span className="logo-text">StudyTide</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-auth">
          {isAuthPage ? null : (
            <>
              {authItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link auth-link ${pathname === item.href ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

