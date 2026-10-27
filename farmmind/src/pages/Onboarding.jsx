import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, MapPin, Ruler, Droplets } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-krishi-cream flex flex-col md:flex-row font-sans">
      {/* Illustration Side */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-krishi-green-light p-12 relative overflow-hidden">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="bg-krishi-green p-2 rounded-lg text-white"><Leaf size={24} /></div>
          <span className="text-2xl font-bold text-krishi-green-dark">FarmMind AI</span>
        </div>
        
        <div className="relative z-10 max-w-md text-center mt-20">
          {/* Conceptual SVG Illustration */}
          <svg className="w-full h-64 mb-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="200" width="300" height="80" rx="10" fill="#E8F5E9" />
            <path d="M100 200C100 150 140 120 200 120C260 120 300 150 300 200" fill="#4CAF50" fillOpacity="0.2" />
            <circle cx="200" cy="140" r="40" fill="#4CAF50" />
            <rect x="190" y="180" width="20" height="20" fill="#2E7D32" />
            <path d="M200 100L220 120L180 120L200 100Z" fill="#FFF" />
          </svg>
          <h2 className="text-4xl font-bold text-krishi-green-dark mb-4">Farm Smarter with AI</h2>
          <p className="text-gray-700 text-lg">Join thousands of farmers tracking crop health, predicting weather, and maximizing yields.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white relative">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FarmMind AI</h1>
            <p className="text-gray-500">Let's set up your profile to give you personalized recommendations.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Name</label>
                <input type="text" defaultValue="Ramesh Patil" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-krishi-green focus:ring-1 focus:ring-krishi-green transition-all" placeholder="Enter your full name" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" defaultValue="9876543210" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-krishi-green focus:ring-1 focus:ring-krishi-green transition-all" placeholder="10-digit number" required />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-krishi-green">
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                  <option>Gujarat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-krishi-green">
                  <option>Pune</option>
                  <option>Nashik</option>
                  <option>Satara</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Village (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input type="text" defaultValue="Shirur" className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-krishi-green" placeholder="Enter your village" />
              </div>
            </div>

            {/* Farm Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Area (Acres)</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input type="number" defaultValue="4" className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-krishi-green" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <select className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 bg-white focus:outline-none focus:border-krishi-green appearance-none">
                    <option>Black Soil</option>
                    <option>Red Soil</option>
                    <option>Alluvial</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-krishi-green">
                <option>English</option>
                <option>हिंदी</option>
                <option>मराठी</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-krishi-green text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-krishi-green/30 hover:bg-krishi-green-dark transition-colors mt-8">
              Start Farming Smarter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
