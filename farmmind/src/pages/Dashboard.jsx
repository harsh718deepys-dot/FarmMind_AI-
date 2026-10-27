import React from 'react';
import { CloudRain, Wind, Thermometer, Droplets, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Video, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Good Morning, Ramesh 👋</h1>
          <p className="text-orange-600 font-medium flex items-center gap-2 mt-1 bg-orange-50 w-fit px-3 py-1 rounded-full text-sm">
            <AlertTriangle size={16} /> Your farm needs attention in 2 areas today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Weather Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-700">Weather (Pune)</h3>
              <CloudRain className="text-blue-500" size={28} />
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-extrabold text-gray-900">28°C</span>
              <span className="text-gray-500 mb-1">Partly Cloudy</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-6">
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                <Thermometer size={16} className="mb-1 text-gray-400" />
                <span className="font-semibold">65%</span>
                <span className="text-[10px]">Humidity</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                <Droplets size={16} className="mb-1 text-blue-400" />
                <span className="font-semibold">40%</span>
                <span className="text-[10px]">Rain Prob</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl">
                <Wind size={16} className="mb-1 text-gray-400" />
                <span className="font-semibold">12km/h</span>
                <span className="text-[10px]">Wind</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/weather')} className="w-full text-blue-600 text-sm font-semibold bg-blue-50 py-3 rounded-xl hover:bg-blue-100 transition-colors">
            View Detailed Forecast
          </button>
        </div>

        {/* Crop Health Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-700">Crop Health</h3>
              <span className="bg-krishi-green-light text-krishi-green-dark px-2 py-1 rounded-md text-xs font-bold">Tomato</span>
            </div>
            
            <div className="flex justify-center items-center py-4">
              {/* Simple Circular Progress Simulation */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#4CAF50" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.82)} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-gray-900">82%</span>
                  <span className="text-xs text-gray-500 font-medium">Score</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 text-orange-700 p-3 rounded-xl text-sm font-medium flex items-center gap-2">
            <AlertTriangle size={18} />
            Status: Moderate Risk
          </div>
        </div>

        {/* Disease Risk Alert */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-3xl shadow-sm border border-red-100 flex flex-col justify-between">
          <div>
            <div className="bg-red-100 text-red-700 w-fit p-2 rounded-xl mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-red-900 text-lg mb-2">High Humidity Detected</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Possible fungal disease risk (Early Blight) in the next 3 days due to current weather conditions.
            </p>
          </div>
          <button onClick={() => navigate('/disease-detection')} className="w-full mt-6 bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-700 transition-colors">
            Check Preventive Actions
          </button>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">Today's Tasks</h3>
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">4 Left</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar">
            {[
              "Check leaves for brown spots",
              "Avoid irrigation after 6 PM",
              "Apply recommended Bio-Khaat",
              "Inspect pest traps"
            ].map((task, idx) => (
              <label key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-colors">
                <input type="checkbox" className="mt-1 rounded text-krishi-green focus:ring-krishi-green w-4 h-4" />
                <span className="text-sm text-gray-700 font-medium">{task}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Market Snapshot */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-700 text-lg">Market Snapshot (Pune APMC)</h3>
            <button onClick={() => navigate('/market')} className="text-sm text-krishi-green font-semibold flex items-center hover:underline">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Tomato', price: '₹28/kg', trend: 'up', val: '4.5%', icon: '🍅' },
              { name: 'Onion', price: '₹24/kg', trend: 'down', val: '1.2%', icon: '🧅' },
              { name: 'Rice (Basmati)', price: '₹42/kg', trend: 'up', val: '2.1%', icon: '🌾' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <span className="text-gray-500 text-sm font-medium">{item.price}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {item.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Consultation */}
        <div className="bg-gradient-to-br from-krishi-green-dark to-krishi-green p-6 rounded-3xl shadow-sm text-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white/90 mb-4 flex items-center gap-2">
              <Video size={20} /> Upcoming Consultation
            </h3>
            
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/50">
                  <img src="https://ui-avatars.com/api/?name=Anil+Patil&background=random" alt="Doctor" />
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight">Dr. Anil Patil</h4>
                  <p className="text-white/70 text-sm">Crop Disease Specialist</p>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-xl p-3 text-sm flex justify-between items-center font-medium">
                <span>Tomorrow</span>
                <span>11:30 AM</span>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-white text-krishi-green-dark font-bold py-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            Join Meeting
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
