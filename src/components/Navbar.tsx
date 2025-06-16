import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { User, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              {/* Simple Ladder Symbol - Refined */}
              <div className="w-3 h-6 relative transform rotate-12">
                <div className="absolute left-0 top-0 w-0.5 h-full bg-brand-primary rounded-full"></div>
                <div className="absolute right-0 top-0 w-0.5 h-full bg-brand-primary rounded-full"></div>
                <div className="absolute left-0 right-0 top-1 h-0.5 bg-brand-primary rounded-full"></div>
                <div className="absolute left-0 right-0 top-2 h-0.5 bg-brand-primary rounded-full"></div>
                <div className="absolute left-0 right-0 top-3 h-0.5 bg-brand-primary rounded-full"></div>
                <div className="absolute left-0 right-0 top-4 h-0.5 bg-brand-primary rounded-full"></div>
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-brand-primary rounded-full"></div>
              </div>
              <span className="font-serif font-semibold text-2xl text-brand-primary">LADR</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/mentors" className="text-foreground/80 hover:text-brand-primary px-3 py-2 text-sm font-medium transition-colors">
              Find Mentors
            </Link>
            <Link to="/how-it-works" className="text-foreground/80 hover:text-brand-primary px-3 py-2 text-sm font-medium transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-brand-primary px-3 py-2 text-sm font-medium transition-colors">
              About Us
            </Link>
            <div className="ml-4 flex items-center space-x-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User size={16} />
                      <span className="hidden md:inline-block">
                        {user.user_metadata.full_name || user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem className="text-sm">
                      <span className="font-medium">
                        {user.user_metadata.full_name || user.email}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                        <UserRound size={16} />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer flex items-center gap-2">
                      <LogOut size={16} />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" asChild className="btn-secondary">
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button asChild className="btn-primary">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/60 hover:text-brand-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/mentors"
              className="text-gray-600 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Mentors
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col px-3 space-y-3">
                  <div className="flex items-center px-3 py-2">
                    <div className="flex-shrink-0">
                      <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium">{user.user_metadata.full_name || user.email}</div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-brand-primary flex items-center"
                  >
                    <UserRound size={16} className="mr-2" />
                    My Profile
                  </Link>
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center px-3 space-x-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Log In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
