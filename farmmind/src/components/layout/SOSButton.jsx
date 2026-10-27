import React, { useState } from 'react';
import { AlertTriangle, X, PhoneCall, HeartPulse } from 'lucide-react';

const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyOptions = [
    "Disease spreading rapidly",
    "Severe pest attack",
    "Weather damage",
    "Crop suddenly drying",
    "Need expert urgently"
  ];

  return (
    <div className="fixed bottom-40 right-4 md:bottom-28 md:right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-72 flex flex-col overflow-hidden border-2 border-red-500 animate-in fade-in zoom-in duration-200">
          <div className="bg-red-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={24} />
              <h3 className="font-bold">Crop Emergency</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-red-600 p-1 rounded-full">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 bg-red-50 flex flex-col gap-2">
            <p className="text-sm font-medium text-red-800 mb-2">What is the emergency?</p>
            {emergencyOptions.map((opt, idx) => (
              <button key={idx} className="text-left text-sm bg-white border border-red-200 text-red-700 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors">
                {opt}
              </button>
            ))}
            
            <button className="mt-4 w-full bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700">
              <PhoneCall size={18} />
              Connect to Available Expert
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center hover:bg-red-600"
          title="SOS Crop Help"
        >
          <HeartPulse size={24} />
        </button>
      )}
    </div>
  );
};

export default SOSButton;
