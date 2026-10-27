import React from 'react';
import { Calendar, CheckCircle, Info, ChevronRight, Sprout, AlertCircle } from 'lucide-react';

const MyCrop = () => {
  const lifecycleStages = [
    { id: 1, title: 'Variety Selection', status: 'completed' },
    { id: 2, title: 'Land Preparation', status: 'completed' },
    { id: 3, title: 'Sowing', status: 'completed' },
    { id: 4, title: 'Growth Monitoring', status: 'active' },
    { id: 5, title: 'Disease & Pest Prevention', status: 'upcoming' },
    { id: 6, title: 'Fertilizer / Bio-Khaat', status: 'upcoming' },
    { id: 7, title: 'Harvesting', status: 'upcoming' },
    { id: 8, title: 'Storage', status: 'upcoming' },
    { id: 9, title: 'Market Selling', status: 'upcoming' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-krishi-green-light text-krishi-green-dark p-2 rounded-xl">
          <Sprout size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Crop Lifecycle</h1>
          <p className="text-gray-500 font-medium">Track your crop from seed to market</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Crop Details Card */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="bg-krishi-green-light/50 p-4 rounded-2xl mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-krishi-green-dark mb-1">Tomato</h2>
            <span className="bg-white text-krishi-green-dark px-3 py-1 rounded-full text-xs font-bold shadow-sm inline-block">Arka Rakshak</span>
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 text-sm">Sowing Date</span>
              <span className="font-semibold text-gray-800 text-sm">15 July 2026</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 text-sm">Crop Age</span>
              <span className="font-bold text-krishi-green text-sm bg-krishi-green-light px-2 py-0.5 rounded">38 Days</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 text-sm">Expected Harvest</span>
              <span className="font-semibold text-gray-800 text-sm">October 2026</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span className="text-gray-500 text-sm">Crop Health</span>
              <span className="font-semibold text-gray-800 text-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-krishi-green"></span> 86%
              </span>
            </div>
          </div>

          {/* Action Card inside Details */}
          <div className="mt-6 bg-orange-50 border border-orange-100 p-4 rounded-2xl">
            <h4 className="text-sm font-bold text-orange-800 flex items-center gap-2 mb-2">
              <AlertCircle size={16} /> Next Recommended Action
            </h4>
            <p className="text-xs text-orange-700 font-medium">Apply micronutrient spray within the next 2 days to boost vegetative growth.</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-8">Progress Timeline</h3>
          
          <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
            {lifecycleStages.map((stage) => (
              <div key={stage.id} className="relative pl-8">
                
                {/* Indicator Node */}
                <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${
                  stage.status === 'completed' ? 'bg-krishi-green' : 
                  stage.status === 'active' ? 'bg-orange-500 animate-pulse' : 'bg-gray-200'
                }`}>
                  {stage.status === 'completed' && <CheckCircle size={12} className="text-white" />}
                </div>

                {/* Content */}
                <div>
                  <h4 className={`text-base font-bold ${
                    stage.status === 'active' ? 'text-orange-600' :
                    stage.status === 'completed' ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {stage.id}. {stage.title}
                  </h4>
                  
                  {stage.status === 'active' && (
                    <div className="mt-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-600 font-medium mb-3">Currently monitoring daily growth. Ensure optimal soil moisture and watch for early pest signs.</p>
                      <button className="text-xs font-bold text-white bg-krishi-green px-4 py-2 rounded-lg hover:bg-krishi-green-dark transition-colors">
                        Log Daily Observation
                      </button>
                    </div>
                  )}
                  
                  {stage.status === 'completed' && (
                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1 mt-1">
                      <CheckCircle size={12} /> Completed successfully
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCrop;
