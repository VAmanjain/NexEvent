import { useState, useEffect } from 'react';
import { CalendarIcon, CompassIcon, PlusIcon, Settings, LogOut, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { logout } from '../services/api/auth/AuthService';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigator = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const signOut = () => {
    logout();
    navigator("/", { replace: true });
  };

  return (
    <nav className="flex items-center justify-between p-4  text-white">
      <div className="flex items-center space-x-2 text-white">
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
        <span className="text-2xl font-bold text-white">NexEvent</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <CalendarIcon className="mr-2 h-4 w-4" /> Events
          </Button>
        </Link>
        {/* <Link to="/calendars">
          <Button variant="ghost" className="text-white">
            <CalendarIcon className="mr-2 h-4 w-4" /> Calendars
          </Button>
        </Link> */}
        <Link to="/discover">
        <Button variant="ghost" className="text-white">
          <CompassIcon className="mr-2 h-4 w-4" /> Discover
        </Button>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm hidden sm:inline">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        
        {/* Create Event Button */}
        <Link to="/create-event">
          <Button variant="ghost" className="text-white hidden sm:flex">
            <PlusIcon className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </Link>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link to="/home">
                <Button variant="ghost">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Events
                </Button>
              </Link>
              {/* Uncomment if you want Calendars in mobile menu */}
              {/* <Link to="/calendars">
                <Button variant="ghost">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Calendars
                </Button>
              </Link> */}
              <Link to="/discover">
                <Button variant="ghost">
                  <CompassIcon className="mr-2 h-4 w-4" /> Discover
                </Button>
              </Link>
              <Link to="/create-event">
                <Button variant="ghost">
                  <PlusIcon className="mr-2 h-4 w-4" /> Create Event
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span><Link to="/profile/1">View Profile</Link></span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span><Link to="/setting/1">Settings</Link></span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};