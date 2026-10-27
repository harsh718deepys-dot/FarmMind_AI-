import React from 'react';
import { Search, Info, CheckCircle2, ChevronRight, Scale } from 'lucide-react';

const Varieties = () => {
  const varieties = [
    {
      name: 'Basmati 1121',
      region: 'Punjab, Haryana, Western UP',
      duration: '140–145 Days',
      water: 'High',
      yield: '18-20 q/acre',
      resistance: 'Medium',
      demand: 'Very High',
      match: '98%'
    },
    {
      name: 'Pusa Basmati 1509',
      region: 'North-Western Plains',
      duration: '115-120 Days',
      water: 'Medium',
      yield: '20-22 q/acre',
      resistance: 'High',
      demand: 'High',
      match: '92%'
    },
    {
      name: 'Indrayani',
      region: 'Maharashtra (Western Ghats)',
      duration: '135-140 Days',
      water: 'High',
      yield: '15-17 q/acre',
      resistance: 'Medium',
      demand: 'High (Local)',
      match: '85%'
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Choose the Best Crop Variety</h1>
        <p className="text-gray-500 font-medium">AI-assisted selection based on your location, soil, and climate.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end mb-8">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Crop</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-krishi-green outline-none bg-gray-50 font-medium">
            <option>Rice</option>
            <option>Tomato</option>
            <option>Onion</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">State</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-krishi-green outline-none bg-gray-50 font-medium">
            <option>Maharashtra</option>
            <option>Punjab</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Water Avail.</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:border-krishi-green outline-none bg-gray-50 font-medium">
            <option>High (Irrigation)</option>
            <option>Medium</option>
            <option>Low (Rainfed)</option>
          </select>
        </div>
        <button className="bg-krishi-green text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-krishi-green-dark">
          <Search size={18} /> Find Varieties
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Top Recommendations for Rice</h2>
        <button className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-100">
          <Scale size={16} /> Compare Selected (0/3)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {varieties.map((v, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 relative flex flex-col h-full hover:shadow-lg hover:border-krishi-green transition-all">
            {i === 0 && (
              <div className="absolute top-0 right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-b-lg">Best Match: {v.match}</div>
            )}
            
            <div className="flex justify-between items-start mb-4 mt-2">
              <h3 className="text-2xl font-bold text-gray-900">{v.name}</h3>
              <input type="checkbox" className="w-5 h-5 rounded text-krishi-green focus:ring-krishi-green mt-1" />
            </div>

            <div className="space-y-3 flex-1 mb-6">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm">Duration</span>
                <span className="font-semibold text-gray-800 text-sm">{v.duration}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm">Water Req.</span>
                <span className="font-semibold text-gray-800 text-sm">{v.water}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm">Expected Yield</span>
                <span className="font-semibold text-gray-800 text-sm">{v.yield}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm">Disease Resist.</span>
                <span className={`font-semibold text-sm ${v.resistance === 'High' ? 'text-green-600' : 'text-orange-500'}`}>{v.resistance}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 text-sm">Market Demand</span>
                <span className="font-semibold text-krishi-green text-sm">{v.demand}</span>
              </div>
            </div>

            <button className="w-full bg-gray-50 text-krishi-green-dark border border-gray-200 font-bold py-3 rounded-xl hover:bg-krishi-green-light hover:border-krishi-green transition-colors">
              Select Variety
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Varieties;
