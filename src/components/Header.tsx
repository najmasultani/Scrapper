
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full py-6 px-4 md:px-8 border-b bg-background relative z-20">
      <div className="flex items-center gap-3">
        {/* Three lines (menu) icon at far left */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="rounded-lg p-1 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600" // Removed md:hidden
          aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7 text-green-800" />
          ) : (
            <Menu className="w-7 h-7 text-green-800" />
          )}
        </button>
        <span className="inline-block rounded-full bg-green-500/10 p-2">
          {/* Simple Scrapple logo: leave icon */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <ellipse cx="18" cy="18" rx="16" ry="16" fill="#CAFFDB" />
            <path d="M18 9C19 15 26 14.5 27 21.5C27.5 25.5 23.5 27 20.5 26C18.2 25.2 17.5 23 17.2 20.5C13.5 21 11 17.3 11 14.5C11 11 14.5 8.5 18 9Z" fill="#34A853"/>
            <path d="M18 12.5V27" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="font-bold text-2xl text-green-900 tracking-tight select-none">Scrapple</span>
      </div>
      <nav className="flex items-center gap-3">
        <Button variant="outline" className="hidden md:inline-block" asChild>
          <a href="/auth">Login</a>
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 shadow-green-300/20 shadow-md animate-fade-in" asChild>
          <a href="#signup">Sign Up Free</a>
        </Button>
        <Button variant="secondary" className="hidden md:inline-block" asChild>
          <a href="/listings">Browse Compost</a>
        </Button>
      </nav>
      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          role="menu"
          aria-label="Main menu"
          className="md:hidden absolute left-0 top-full w-full bg-white border-b border-t shadow-lg mt-2 animate-fade-in z-10"
        >
          <nav className="flex flex-col items-stretch px-4 py-2 gap-1">
            <Link
              to="/register/restaurant"
              className="w-full"
              tabIndex={0}
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start py-3 text-green-900 font-semibold">
                Register your Restaurant
              </Button>
            </Link>
            <Link
              to="/register/gardener"
              className="w-full"
              tabIndex={0}
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start py-3 text-green-900 font-semibold">
                Register your Garden or Farm
              </Button>
            </Link>
            <Link
              to="/auth"
              className="w-full"
              tabIndex={0}
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start py-3">
                Login
              </Button>
            </Link>
            <Link
              to="/listings"
              className="w-full"
              tabIndex={0}
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start py-3">
                Browse Compost
              </Button>
            </Link>
            <a
              href="#signup"
              aria-label="Sign Up Free"
              className="w-full"
              tabIndex={0}
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full justify-start bg-green-600 text-white hover:bg-green-700 py-3 font-semibold">
                Sign Up Free
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
