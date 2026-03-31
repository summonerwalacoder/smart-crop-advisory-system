import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { 
  Home, 
  Sprout, 
  Droplets, 
  Bug, 
  CloudRain, 
  TrendingUp, 
  Waves,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/crop-recommendation', label: 'Crop Advice', icon: Sprout },
    { path: '/fertilizer', label: 'Fertilizer', icon: Droplets },
    { path: '/disease-detection', label: 'Disease Check', icon: Bug },
    { path: '/weather', label: 'Weather', icon: CloudRain },
    { path: '/market-prices', label: 'Market', icon: TrendingUp },
    { path: '/irrigation', label: 'Irrigation', icon: Waves },
    { path: '/schemes', label: 'Schemes', icon: FileText },
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-700">SmartCrop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user.role === 'admin' && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Admin
                </Button>
              </Link>
            )}
            <span className="text-sm text-gray-600">
              {user.name || 'Farmer'}
            </span>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start">
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
            {user.role === 'admin' && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button 
              variant="destructive" 
              className="w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
