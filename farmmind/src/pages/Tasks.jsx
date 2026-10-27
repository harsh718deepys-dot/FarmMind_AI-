import React from 'react';
import { CheckCircle, Clock, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

const Tasks = () => {
  const sections = [
    {
      title: 'Today',
      tasks: [
        { time: 'Morning', desc: 'Inspect tomato crop leaves for early blight spots', done: false },
        { time: 'Afternoon', desc: 'Check soil moisture levels in Farm 1', done: true },
        { time: 'Evening', desc: 'Avoid irrigation due to predicted rain tomorrow', done: false },
      ]
    },
    {
      title: 'Tomorrow',
      tasks: [
        { time: 'Morning', desc: 'Apply recommended Bio-Khaat (Vermicompost)', done: false },
        { time: 'Afternoon', desc: 'Clean the main irrigation filter', done: false },
      ]
    },
    {
      title: 'This Week',
      tasks: [
        { time: 'Wed', desc: 'Purchase recommended fungicide for stock', done: false },
        { time: 'Fri', desc: 'Upload weekly crop health photos to AI', done: false },
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Farmer Daily To-Do</h1>
        <p className="text-gray-500 font-medium">Your personalized agricultural task list</p>
      </div>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CalendarIcon size={20} className="text-krishi-green" /> {section.title}
            </h2>
            
            <div className="space-y-3">
              {section.tasks.map((task, i) => (
                <div key={i} className={`flex items-start md:items-center justify-between p-4 rounded-2xl border transition-colors cursor-pointer ${task.done ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-krishi-green shadow-sm'}`}>
                  <div className="flex items-start gap-4">
                    <button className={`mt-0.5 md:mt-0 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.done ? 'bg-krishi-green border-krishi-green text-white' : 'border-gray-300 text-transparent hover:border-krishi-green'}`}>
                      <CheckCircle size={14} />
                    </button>
                    <div>
                      <p className={`font-semibold ${task.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{task.desc}</p>
                      <p className="text-xs font-bold text-krishi-green-dark mt-1 flex items-center gap-1">
                        <Clock size={12} /> {task.time}
                      </p>
                    </div>
                  </div>
                  
                  <button className="hidden md:flex text-gray-400 hover:text-krishi-green p-2">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
