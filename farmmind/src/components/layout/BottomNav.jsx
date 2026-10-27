import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Sprout, Stethoscope, CloudRain, MoreHorizontal } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  // Hide bottom nav on landing page and onboarding
  if (location.pathname === '/' || location.pathname === '/onboarding') {
    return null;
  }

  const mobileNavLinks = [
    { name: 'Home', path: '/dashboard', icon: <LayoutDashboard size={24} /> },
    { name: 'My Crop', path: '/my-crop', icon: <Sprout size={24} /> },
    { name: 'Scan', path: '/disease-detection', icon: <Stethoscope size={24} />, special: true },
    { name: 'Weather', path: '/weather', icon: <CloudRain size={24} /> },
    { name: 'Menu', path: '/profile', icon: <MoreHorizontal size={24} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {mobileNavLinks.map((link) => {
        if (link.special) {
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className="flex flex-col items-center justify-center w-16 -mt-6"
            >
              <div className="bg-krishi-green text-white p-3 rounded-full shadow-lg shadow-krishi-green/40 border-4 border-white flex items-center justify-center">
                {link.icon}
              </div>
              <span className="text-[10px] font-medium text-krishi-green-dark mt-1">{link.name}</span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive ? 'text-krishi-green font-semibold' : 'text-gray-500'
              }`
            }
          >
            {link.icon}
            <span className="text-[10px] mt-1">{link.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
