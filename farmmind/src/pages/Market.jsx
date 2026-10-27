import React from 'react';
import { TrendingUp, TrendingDown, MapPin, Truck, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Market = () => {
  const dummyChartData = [
    { name: '1 Sep', price: 22 },
    { name: '2 Sep', price: 24 },
    { name: '3 Sep', price: 23 },
    { name: '4 Sep', price: 26 },
    { name: 'Today', price: 28 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Market Intelligence</h1>
        <p className="text-gray-500 font-medium">Track mandi rates and find the best place to sell.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Market Prices */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Nearby Market Prices (Pune Region)</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'Tomato', price: '₹28/kg', trend: 'up', val: '4.5%', icon: '🍅' },
              { name: 'Onion', price: '₹24/kg', trend: 'down', val: '1.2%', icon: '🧅' },
              { name: 'Rice', price: '₹42/kg', trend: 'up', val: '2.1%', icon: '🌾' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-2xl bg-gray-50 relative">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-gray-600 text-sm">{item.name}</h4>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-extrabold text-gray-900">{item.price}</span>
                  <div className={`flex items-center gap-1 text-xs font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {item.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {item.val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-gray-700 mb-4">Tomato Price Trend (7 Days)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyChartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
                <YAxis hide={true} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip cursor={{stroke: '#e5e7eb', strokeWidth: 2}} />
                <Line type="monotone" dataKey="price" stroke="#4CAF50" strokeWidth={4} dot={{r: 4, fill: '#4CAF50', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sell Recommendations */}
        <div className="space-y-6">
          <div className="bg-krishi-green text-white p-6 rounded-3xl shadow-md">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin size={20}/> Best Market to Sell</h2>
            
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 mb-4">
              <h3 className="font-bold text-xl mb-1">Pune APMC (Gultekdi)</h3>
              <p className="text-white/80 text-sm mb-3">Distance: 32 km</p>
              
              <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl">
                <span className="text-sm">Current Tomato Rate</span>
                <span className="font-bold text-lg">₹30/kg</span>
              </div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
              <h3 className="font-bold mb-1">Shirur Mandi</h3>
              <p className="text-white/80 text-sm mb-3">Distance: 12 km</p>
              
              <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl">
                <span className="text-sm">Current Tomato Rate</span>
                <span className="font-bold text-lg">₹25/kg</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
            <h3 className="font-bold text-orange-900 mb-4">Harvest Selling Checklist</h3>
            <ul className="space-y-3">
              {[
                "Check current mandi rates",
                "Complete grading & sorting (A, B, C grade)",
                "Compare nearby markets vs transport cost",
                "Arrange logistics vehicle",
                "Verify payment terms at destination"
              ].map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-800">
                  <input type="checkbox" className="mt-1 rounded text-orange-600 focus:ring-orange-500 w-4 h-4" />
                  <span className="font-medium">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Market;
