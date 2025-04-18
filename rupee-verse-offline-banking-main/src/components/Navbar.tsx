
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Book, BarChart, MessageSquare, Menu, X, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const NavItem = ({ 
  icon: Icon, 
  text, 
  active, 
  to 
}: { 
  icon: React.ElementType, 
  text: string, 
  active: boolean, 
  to: string 
}) => {
  return (
    <Link to={to} className={cn("nav-link", active && "active")}>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span>{text}</span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // Set active page based on current location
  const activePage = location.pathname === '/' ? 'home' : 
                    location.pathname === '/transactions' ? 'transactions' :
                    location.pathname === '/finlearn' ? 'finlearn' :
                    location.pathname === '/rupee-ai' ? 'ai' : '';
  
  const navItems = [
    { icon: Home, text: "Home", id: "home", to: "/" },
    { icon: BarChart, text: "Transactions", id: "transactions", to: "/transactions" },
    { icon: Book, text: "FinLearn", id: "finlearn", to: "/finlearn" },
    { icon: MessageSquare, text: "Rupee AI", id: "ai", to: "/rupee-ai" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    getUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAuthClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-primary font-poppins font-bold text-xl">RupeeVerse</div>
        </div>
        
        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            {isOpen && (
              <div className="fixed inset-0 top-[72px] bg-background z-40">
                <nav className="flex flex-col p-6 space-y-6">
                  {navItems.map((item) => (
                    <NavItem 
                      key={item.id}
                      icon={item.icon} 
                      text={item.text} 
                      active={activePage === item.id}
                      to={item.to}
                    />
                  ))}
                  <Button className="purple-gradient w-full" onClick={handleAuthClick}>
                    {user ? <><User className="mr-2 h-4 w-4" />Profile</> : 'Login'}
                  </Button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <NavItem 
                  key={item.id}
                  icon={item.icon} 
                  text={item.text} 
                  active={activePage === item.id}
                  to={item.to}
                />
              ))}
            </nav>
            <Button className="purple-gradient hover:animate-gradient-shift" onClick={handleAuthClick}>
              {user ? <><User className="mr-2 h-4 w-4" />Profile</> : 'Login'}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
