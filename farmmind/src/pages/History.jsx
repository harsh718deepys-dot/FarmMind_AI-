import React from 'react';
import { Activity, Calendar as CalendarIcon, ShieldCheck, Pill } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const History = () => {
  const dummyChartData = [
    { date: '15 Aug', health: 95 },
    { date: '20 Aug', health: 88 },
    { date: '22 Aug', health: 65 }, // Disease detected
    { date: '25 Aug', health: 70 }, // Treatment
    { date: '30 Aug', health: 85 }, // Recovery
    { date: '04 Sep', health: 92 },
  ];

  const timeline = [
    { date: '30 Aug 2026', title: 'Follow-up Scan', desc: 'Severity reduced. New leaves appear healthy.', icon: <Activity className="text-blue-500" size={20}/>, bg: 'bg-blue-100' },
    { date: '25 Aug 2026', title: 'Treatment Applied', desc: 'Chlorothalonil 75% WP applied as prescribed.', icon: <Pill className="text-krishi-green" size={20}/>, bg: 'bg-krishi-green-light' },
    { date: '22 Aug 2026', title: 'Disease Scan Performed', desc: 'Tomato Early Blight detected. Severity: Moderate.', icon: <ShieldCheck className="text-red-500" size={20}/>, bg: 'bg-red-100' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Farm Health History</h1>
        <p className="text-gray-500 font-medium">Past scans, treatments, and recovery progress</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Crop Recovery Progress</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyChartData}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} />
              <YAxis hide={true} domain={[0, 100]} />
              <Tooltip cursor={{stroke: '#e5e7eb', strokeWidth: 2}} />
              <Line type="monotone" dataKey="health" stroke="#4CAF50" strokeWidth={4} dot={{r: 4, fill: '#4CAF50', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Recent History Timeline</h2>
        
        <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8">
              <div className={`absolute -left-[18px] top-0 w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${item.bg}`}>
                {item.icon}
              </div>
              
              <div>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md mb-2 inline-block">{item.date}</span>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
