import React, { useState } from 'react';
import { Search, MapPin, Star, Video, PhoneCall, Calendar, X } from 'lucide-react';

const Experts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const experts = [
    {
      id: 1,
      name: 'Dr. Anil Patil',
      role: 'Crop Disease Specialist',
      location: 'Pune, Maharashtra',
      experience: '12 Years',
      languages: 'Marathi, Hindi, English',
      rating: 4.8,
      status: 'Available Today',
      image: 'https://ui-avatars.com/api/?name=Anil+Patil&background=random'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Organic Farming Expert',
      location: 'Nashik, Maharashtra',
      experience: '8 Years',
      languages: 'Hindi, English',
      rating: 4.9,
      status: 'Busy',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random'
    },
    {
      id: 3,
      name: 'Ramesh Kadam',
      role: 'Horticulture Expert',
      location: 'Satara, Maharashtra',
      experience: '15 Years',
      languages: 'Marathi, Hindi',
      rating: 4.7,
      status: 'Available Tomorrow',
      image: 'https://ui-avatars.com/api/?name=Ramesh+Kadam&background=random'
    },
    {
      id: 4,
      name: 'Dr. Vikram Desai',
      role: 'Soil & Fertilizer Specialist',
      location: 'Kolhapur, Maharashtra',
      experience: '10 Years',
      languages: 'Marathi, Hindi, English',
      rating: 4.6,
      status: 'Available Today',
      image: 'https://ui-avatars.com/api/?name=Vikram+Desai&background=random'
    }
  ];

  const handleBook = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24 relative">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Expert Connect</h1>
          <p className="text-gray-500 font-medium">Consult top agricultural specialists in your region.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Search by crop, disease, or name..." className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-krishi-green shadow-sm" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {['All Experts', 'Crop Disease', 'Pest Management', 'Soil Health', 'Organic Farming', 'Horticulture'].map(filter => (
          <button key={filter} className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-krishi-green hover:text-white hover:border-krishi-green transition-colors">
            {filter}
          </button>
        ))}
      </div>

      {/* Expert Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {experts.map(expert => (
          <div key={expert.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
            
            <div className="flex flex-col items-center sm:items-start w-full sm:w-1/3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-krishi-green-light mb-3">
                <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1 text-sm font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded w-fit">
                <Star size={14} className="fill-yellow-500" /> {expert.rating}
              </div>
              <p className={`mt-2 text-xs font-bold ${expert.status.includes('Today') ? 'text-green-600' : expert.status === 'Busy' ? 'text-red-500' : 'text-orange-500'}`}>
                • {expert.status}
              </p>
            </div>

            <div className="flex-1 w-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                <p className="text-krishi-green-dark font-semibold text-sm mb-3">{expert.role}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> {expert.location}</div>
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-gray-400"/> {expert.experience} Experience</div>
                  <div className="flex items-center gap-2"><span className="text-gray-400 font-bold text-xs ml-0.5 mr-0.5">A</span> {expert.languages}</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={() => handleBook(expert)}
                  className="flex-1 bg-krishi-green text-white font-bold py-2.5 rounded-xl hover:bg-krishi-green-dark transition-colors"
                >
                  Book
                </button>
                <button className="bg-blue-50 text-blue-600 p-2.5 rounded-xl hover:bg-blue-100 transition-colors">
                  <Video size={20} />
                </button>
                <button className="bg-gray-50 text-gray-600 p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  <PhoneCall size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-krishi-green text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Book Consultation</h3>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <img src={selectedExpert?.image} alt="" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold text-gray-900">{selectedExpert?.name}</h4>
                  <p className="text-sm text-gray-500">{selectedExpert?.role}</p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Crop</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-krishi-green">
                    <option>Tomato</option>
                    <option>Onion</option>
                    <option>Rice</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Describe Problem</label>
                  <textarea rows="3" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-krishi-green" placeholder="E.g., Leaves turning yellow with brown spots..."></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-krishi-green" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:outline-none focus:border-krishi-green" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-krishi-green text-white font-bold py-3.5 rounded-xl hover:bg-krishi-green-dark transition-colors mt-4">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Experts;
