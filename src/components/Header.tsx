
import { Button } from "@/components/ui/button";

const Header = () => (
  <header className="flex items-center justify-between w-full py-6 px-4 md:px-8 border-b bg-background">
    <div className="flex items-center gap-3">
      <span className="inline-block rounded-full bg-green-500/10 p-2">
        {/* Simple CompostMatch logo: leave icon */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <ellipse cx="18" cy="18" rx="16" ry="16" fill="#CAFFDB" />
          <path d="M18 9C19 15 26 14.5 27 21.5C27.5 25.5 23.5 27 20.5 26C18.2 25.2 17.5 23 17.2 20.5C13.5 21 11 17.3 11 14.5C11 11 14.5 8.5 18 9Z" fill="#34A853"/>
          <path d="M18 12.5V27" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="font-bold text-2xl text-green-900 tracking-tight select-none">CompostMatch</span>
    </div>
    <nav className="flex items-center gap-3">
      <Button variant="outline" className="hidden md:inline-block" asChild>
        <a href="#login">Login</a>
      </Button>
      <Button className="bg-green-600 hover:bg-green-700 shadow-green-300/20 shadow-md animate-fade-in" asChild>
        <a href="#signup">Sign Up Free</a>
      </Button>
    </nav>
  </header>
);

export default Header;
