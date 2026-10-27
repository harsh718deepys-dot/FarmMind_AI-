import React from 'react';
import { CloudRain, Wind, Thermometer, Droplets, Sun, AlertTriangle, CloudLightning, ShieldAlert } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Weather = () => {
  const dummyChartData = [
    { time: '6 AM', temp: 24, rain: 0 },
    { time: '9 AM', temp: 26, rain: 10 },
    { time: '12 PM', temp: 29, rain: 30 },
    { time: '3 PM', temp: 31, rain: 60 },
    { time: '6 PM', temp: 28, rain: 40 },
    { time: '9 PM', temp: 25, rain: 10 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Weather & Climate Intelligence</h1>
        <p className="text-gray-500 font-medium">Pune, Maharashtra</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Weather (Main) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <CloudLightning size={160} />
          </div>
          
          <div className="relative z-10 flex justify-between items-start mb-12">
            <div>
              <h2 className="text-5xl font-extrabold mb-2">28°C</h2>
              <p className="text-blue-100 text-lg font-medium">High chance of rain afternoon</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
              <CloudRain size={24} />
              <span className="font-bold">Heavy Rain</span>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex flex-col items-center">
              <Thermometer size={20} className="text-blue-200 mb-1" />
              <span className="font-bold">65%</span>
              <span className="text-xs text-blue-200">Humidity</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10">
              <Droplets size={20} className="text-blue-200 mb-1" />
              <span className="font-bold">80%</span>
              <span className="text-xs text-blue-200">Rain Prob</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10">
              <Wind size={20} className="text-blue-200 mb-1" />
              <span className="font-bold">12km/h</span>
              <span className="text-xs text-blue-200">Wind</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/10">
              <SproutIcon size={20} className="text-blue-200 mb-1" />
              <span className="font-bold">Moderate</span>
              <span className="text-xs text-blue-200">Soil Moisture</span>
            </div>
          </div>
        </div>

        {/* Crop Risk Prediction */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Crop Risk Prediction</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-500" size={20} />
                <span className="font-semibold text-gray-800 text-sm">Fungal Disease</span>
              </div>
              <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">HIGH</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-orange-500" size={20} />
                <span className="font-semibold text-gray-800 text-sm">Pest Outbreak</span>
              </div>
              <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">MEDIUM</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-green-500" size={20} />
                <span className="font-semibold text-gray-800 text-sm">Heat Stress</span>
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">LOW</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-orange-500" size={20} />
                <span className="font-semibold text-gray-800 text-sm">Rain Damage</span>
              </div>
              <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">MEDIUM</span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Early Warning */}
        <div className="bg-red-50 p-6 md:p-8 rounded-3xl border border-red-200">
          <div className="flex items-center gap-3 mb-4 text-red-600">
            <AlertTriangle size={24} />
            <h3 className="font-bold text-lg">Early Warning</h3>
          </div>
          <p className="text-red-800 font-medium mb-6">"High humidity and rainfall are expected over the next 48 hours. Conditions highly favour fungal disease development (Early Blight in Tomatoes)."</p>
          
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Recommended Actions:</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-red-200 text-red-600 flex items-center justify-center font-bold text-[10px]">1</div>
              Avoid excessive irrigation; rely on rainfall.
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-red-200 text-red-600 flex items-center justify-center font-bold text-[10px]">2</div>
              Inspect lower crop leaves for brown spots.
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-red-200 text-red-600 flex items-center justify-center font-bold text-[10px]">3</div>
              Prepare preventive Bio-Khaat (Trichoderma) application after rain stops.
            </li>
          </ul>
        </div>

        {/* Temperature Trend Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Today's Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyChartData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                <YAxis hide={true} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip />
                <Area type="monotone" dataKey="temp" stroke="#4CAF50" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 7 Day Forecast */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
        <h3 className="font-bold text-gray-900 mb-6 min-w-max">7-Day Forecast</h3>
        <div className="flex gap-4 min-w-max">
          {[
            { day: 'Mon', icon: <CloudRain size={28} className="text-blue-500"/>, high: 28, low: 22 },
            { day: 'Tue', icon: <CloudRain size={28} className="text-blue-500"/>, high: 27, low: 22 },
            { day: 'Wed', icon: <CloudLightning size={28} className="text-blue-600"/>, high: 26, low: 21 },
            { day: 'Thu', icon: <CloudSun size={28} className="text-yellow-500"/>, high: 29, low: 23 },
            { day: 'Fri', icon: <Sun size={28} className="text-orange-500"/>, high: 31, low: 24 },
            { day: 'Sat', icon: <Sun size={28} className="text-orange-500"/>, high: 32, low: 25 },
            { day: 'Sun', icon: <CloudSun size={28} className="text-yellow-500"/>, high: 30, low: 24 },
          ].map((forecast, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl w-24">
              <span className="font-semibold text-gray-600 mb-2">{forecast.day}</span>
              {forecast.icon}
              <div className="mt-3 flex gap-2 text-sm font-bold">
                <span className="text-gray-900">{forecast.high}°</span>
                <span className="text-gray-400">{forecast.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple icon for Soil Moisture
const SproutIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
  </svg>
);

const CloudSun = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M2 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="M12 20v2"/><path d="m19.07 19.07-1.41-1.41"/><path d="M22 12h-2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
  </svg>
)

export default Weather;
