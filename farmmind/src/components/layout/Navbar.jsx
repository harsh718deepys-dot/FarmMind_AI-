import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LayoutDashboard, Stethoscope, CloudRain, Users, Droplets, List, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide navbar on landing page and onboarding
  if (location.pathname === '/' || location.pathname === '/onboarding') {
    return null;
  }

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Crop', path: '/my-crop', icon: <Sprout size={20} /> },
    { name: 'Disease Detection', path: '/disease-detection', icon: <Stethoscope size={20} /> },
    { name: 'Weather', path: '/weather', icon: <CloudRain size={20} /> },
    { name: 'Experts', path: '/experts', icon: <Users size={20} /> },
    { name: 'Bio-Khaat', path: '/bio-khaat', icon: <Droplets size={20} /> },
    { name: 'Varieties', path: '/varieties', icon: <List size={20} /> },
    { name: 'Market', path: '/market', icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <nav className="hidden md:flex bg-white shadow-sm border-b border-krishi-green-light sticky top-0 z-40 h-16 w-full items-center justify-between px-6">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="bg-krishi-green text-white p-2 rounded-lg">
          <Sprout size={24} />
        </div>
        <span className="text-xl font-bold text-krishi-green-dark">FarmMind AI</span>
      </div>
      
      <div className="flex items-center space-x-1 lg:space-x-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-krishi-green-light text-krishi-green-dark'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-krishi-green'
              }`
            }
          >
            {link.icon}
            <span className="hidden lg:inline">{link.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <select className="bg-krishi-cream border border-krishi-green-light text-sm rounded-md px-2 py-1 outline-none focus:border-krishi-green">
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
        <button 
          onClick={() => navigate('/profile')}
          className="p-2 bg-krishi-green-light text-krishi-green-dark rounded-full hover:bg-krishi-green hover:text-white transition-colors"
        >
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
