import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ScanLine, CloudSun, Users, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: 'AI Disease Detection', desc: 'Scan and diagnose crop diseases instantly with our AI.', icon: <ScanLine size={32} className="text-green-600" /> },
    { title: 'Weather Intelligence', desc: '7-day micro-climate forecasts and risk alerts.', icon: <CloudSun size={32} className="text-blue-500" /> },
    { title: 'Expert Connect', desc: 'Consult top regional agricultural specialists.', icon: <Users size={32} className="text-purple-500" /> },
    { title: 'Market Intelligence', desc: 'Get live mandi prices and optimal selling locations.', icon: <TrendingUp size={32} className="text-orange-500" /> }
  ];

  const workflow = [
    "Select Crop", "Monitor Crop", "Detect Disease", "Get AI Guidance", "Connect Expert", "Recover Crop", "Harvest", "Sell at Better Price"
  ];

  return (
    <div className="bg-krishi-cream min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-krishi-green p-2 rounded-lg text-white"><Leaf size={24} /></div>
          <span className="text-2xl font-bold text-krishi-green-dark tracking-tight">FarmMind AI</span>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-transparent border-none text-sm font-medium outline-none">
            <option>English</option>
            <option>हिंदी</option>
            <option>मराठी</option>
          </select>
          <button 
            onClick={() => navigate('/onboarding')}
            className="bg-krishi-green-dark text-white px-5 py-2 rounded-full font-medium hover:bg-krishi-green transition-all"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            From Seed Selection to Selling — <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-krishi-green to-krishi-green-dark">Smarter Farming at Every Step.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI-powered crop disease detection, weather intelligence, expert guidance, and complete crop lifecycle support in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => navigate('/onboarding')}
              className="w-full sm:w-auto bg-krishi-green text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-krishi-green/30 hover:scale-105 transition-transform flex justify-center items-center gap-2"
            >
              Start Farming Smarter <ChevronRight size={20} />
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-bold border border-gray-200 hover:bg-gray-50 transition-colors">
              Explore Features
            </button>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-krishi-green-light rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      </div>

      {/* Workflow */}
      <div className="bg-krishi-green-dark text-white py-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="flex items-center gap-4 px-6 mx-auto w-max">
          {workflow.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2 text-lg font-medium opacity-90">
                <CheckCircle size={20} className="text-krishi-green-light" />
                {step}
              </div>
              {idx !== workflow.length - 1 && <div className="text-krishi-green-light/50 font-bold mx-2">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Farmer Decision-Support</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to maximize yield, prevent diseases, and sell at the best price.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-krishi-cream p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-krishi-green/5 transition-all group">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
