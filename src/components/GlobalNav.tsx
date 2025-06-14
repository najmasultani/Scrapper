import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LayoutDashboard, List, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", to: "/", icon: Home },
  { name: "Dashboard", to: "/dashboard/restaurant", icon: LayoutDashboard },
  { name: "Browse Compost Listings", to: "/listings", icon: List },
  { name: "Register Your Restaurant", to: "/register/restaurant", icon: Leaf },
  { name: "Register Your Garden", to: "/register/gardener", icon: Leaf },
];

export default function GlobalNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full bg-green-500/10 p-2">
            {/* Logo */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <ellipse cx="18" cy="18" rx="16" ry="16" fill="#CAFFDB" />
              <path d="M18 9C19 15 26 14.5 27 21.5C27.5 25.5 23.5 27 20.5 26C18.2 25.2 17.5 23 17.2 20.5C13.5 21 11 17.3 11 14.5C11 11 14.5 8.5 18 9Z" fill="#34A853"/>
              <path d="M18 12.5V27" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-bold text-2xl text-green-900 tracking-tight select-none">
            Scrapple
          </span>
        </div>
        <div className="hidden md:flex gap-2 items-center">
          {navigation.map((item, i) => (
            <Link to={item.to} key={item.name}>
              <Button
                variant={location.pathname === item.to ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                {/* Only show icons for Home/Dashboard/List */}
                {item.icon ? (
                  React.createElement(item.icon, { className: "w-4 h-4 mr-1" })
                ) : null}
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <button
          className="md:hidden rounded-lg p-1 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-7 h-7 text-green-800" /> : <Menu className="w-7 h-7 text-green-800" />}
        </button>
      </div>
      {/* Mobile */}
      {mobileOpen && (
        <div
          className="md:hidden bg-white border-b shadow animate-fade-in px-4 pb-3"
          role="menu"
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link to={item.to} key={item.name} role="menuitem">
                <Button
                  variant={location.pathname === item.to ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.icon ? (
                    React.createElement(item.icon, { className: "w-4 h-4 mr-1" })
                  ) : null}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
