import React from 'react';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import ChatbotFAB from './ChatbotFAB';
import SOSButton from './SOSButton';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isPublicPage = location.pathname === '/' || location.pathname === '/onboarding';

  return (
    <div className="min-h-screen bg-krishi-cream flex flex-col font-sans text-gray-800">
      <Navbar />
      
      <main className={`flex-1 flex flex-col ${isPublicPage ? '' : 'md:pb-0 pb-20'}`}>
        <Outlet />
      </main>

      <BottomNav />
      
      {!isPublicPage && (
        <>
          <ChatbotFAB />
          <SOSButton />
        </>
      )}
    </div>
  );
};

export default Layout;
