import React from 'react';
import { Droplets, CheckCircle, Info } from 'lucide-react';

const BioKhaat = () => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Bio-Khaat Advisor</h1>
        <p className="text-gray-500 font-medium">Sustainable & organic fertilizer recommendations</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-krishi-green">
              <option>Tomato</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Stage</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-krishi-green">
              <option>Vegetative Growth</option>
              <option>Flowering</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-krishi-green">
              <option>Black Soil</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Problem</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-krishi-green">
              <option>Slow Growth</option>
              <option>Yellow Leaves</option>
            </select>
          </div>
        </div>
        <button className="w-full md:w-auto bg-krishi-green text-white font-bold py-2.5 px-8 rounded-xl hover:bg-krishi-green-dark transition-colors">
          Get Recommendations
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-krishi-green-light/30 border border-krishi-green text-left p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-krishi-green text-white text-xs font-bold px-3 py-1 rounded-bl-xl">Top Match</div>
          <h3 className="text-2xl font-bold text-krishi-green-dark mb-1">Vermicompost</h3>
          <p className="text-sm font-medium text-gray-600 mb-4">Best for Vegetative Growth</p>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-krishi-green-light pb-2">
              <span className="text-gray-600 text-sm">Application</span>
              <span className="font-bold text-gray-900 text-sm">500 kg / acre</span>
            </div>
            <div>
              <span className="text-gray-600 text-sm block mb-2">Benefits:</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-800 font-medium">
                  <CheckCircle size={16} className="text-krishi-green mt-0.5" /> Improves soil health and structure
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-800 font-medium">
                  <CheckCircle size={16} className="text-krishi-green mt-0.5" /> Provides slow, steady nutrient release
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-800 font-medium">
                  <CheckCircle size={16} className="text-krishi-green mt-0.5" /> Increases beneficial microbial activity
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 text-left p-6 rounded-3xl hover:border-krishi-green transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Jeevamrut</h3>
          <p className="text-sm font-medium text-gray-500 mb-4">Liquid Bio-Fertilizer</p>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Application</span>
              <span className="font-bold text-gray-800 text-sm">200 Litres / acre</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-2">Benefits:</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-krishi-green mt-0.5" /> Instant nutrient availability
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-krishi-green mt-0.5" /> Prevents fungal diseases in soil
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioKhaat;
