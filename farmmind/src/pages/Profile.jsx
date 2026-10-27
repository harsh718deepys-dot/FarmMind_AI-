import React from 'react';
import { User, MapPin, Grid, Languages, Edit3, PlusCircle } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
        <button className="absolute top-8 right-8 text-krishi-green font-bold flex items-center gap-2 hover:underline">
          <Edit3 size={18} /> Edit
        </button>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-krishi-green-light rounded-full flex items-center justify-center text-krishi-green-dark border-4 border-white shadow-md">
            <User size={48} />
          </div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">Ramesh Patil</h1>
            <p className="text-gray-500 font-medium flex items-center justify-center sm:justify-start gap-1 mt-1">
              <MapPin size={16} /> Shirur, Pune, Maharashtra
            </p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"><Languages size={14}/> Marathi, Hindi</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"><Grid size={14}/> 6 Acres Total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">My Farms</h2>
        <button className="text-sm font-bold text-krishi-green flex items-center gap-1 hover:underline">
          <PlusCircle size={18} /> Add Farm
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-48 hover:border-krishi-green transition-colors cursor-pointer">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">Farm 1 (Main)</h3>
              <span className="bg-krishi-green text-white px-2 py-1 rounded text-xs font-bold">Tomato</span>
            </div>
            <p className="text-gray-500 text-sm">4 Acres • Black Soil</p>
          </div>
          <div className="bg-gray-50 px-4 py-3 rounded-xl flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Health Score</span>
            <span className="font-bold text-krishi-green">82%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-48 hover:border-krishi-green transition-colors cursor-pointer">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900 text-lg">Farm 2 (East)</h3>
              <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">Onion</span>
            </div>
            <p className="text-gray-500 text-sm">2 Acres • Red Soil</p>
          </div>
          <div className="bg-gray-50 px-4 py-3 rounded-xl flex justify-between items-center text-sm">
            <span className="font-medium text-gray-600">Health Score</span>
            <span className="font-bold text-krishi-green">95%</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
