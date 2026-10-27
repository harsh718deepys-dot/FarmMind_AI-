import React, { useState } from 'react';
import { UploadCloud, Camera, CheckCircle2, AlertTriangle, Shield, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('treatment');

  const handleUpload = () => {
    setScanning(true);
    // Simulate AI scanning delay
    setTimeout(() => {
      setScanning(false);
      setResult({
        crop: 'Tomato',
        disease: 'Early Blight',
        confidence: '94%',
        severity: 'Moderate',
        affected: '18%',
        cause: 'Fungal infection caused by Alternaria solani.',
      });
    }, 2500);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Detect Crop Disease</h1>
        <p className="text-gray-500 font-medium">Upload a crop image and get early disease or pest identification.</p>
      </div>

      {!result ? (
        /* Upload Section */
        <div className="bg-white border-2 border-dashed border-krishi-green-light rounded-3xl p-8 md:p-16 text-center max-w-3xl mx-auto shadow-sm relative overflow-hidden">
          
          {scanning ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-krishi-green-light rounded-full"></div>
                <div className="absolute inset-0 border-4 border-krishi-green rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="text-krishi-green animate-pulse" size={32} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">AI is analyzing...</h3>
                <p className="text-sm text-gray-500">Scanning for over 500+ diseases and pests.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-krishi-green-light w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadCloud className="text-krishi-green-dark" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Drag & Drop Image Here</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">Upload a clear picture of the affected leaf, stem, or fruit.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-4">
                <button onClick={handleUpload} className="bg-krishi-green text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-krishi-green-dark transition-colors shadow-lg shadow-krishi-green/20">
                  <UploadCloud size={20} /> Upload from Gallery
                </button>
                <button onClick={handleUpload} className="bg-white border border-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Camera size={20} /> Take Photo
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Result Section */
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-500">
          
          <div className="flex items-center justify-center gap-2 text-krishi-green font-bold bg-krishi-green-light/50 w-fit mx-auto px-4 py-2 rounded-full mb-4">
            <CheckCircle2 size={18} /> AI Analysis Complete
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden relative mb-4">
                {/* Simulated uploaded image */}
                <img src="https://images.unsplash.com/photo-1592843997232-26ebf8b6dc67?q=80&w=600&auto=format&fit=crop" alt="Affected crop" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-4 border-orange-500/50 rounded-2xl pointer-events-none"></div>
              </div>
              
              <div className="space-y-3 bg-gray-50 p-4 rounded-2xl">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Crop</span>
                  <span className="font-bold text-gray-800 text-sm">{result.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Confidence</span>
                  <span className="font-bold text-krishi-green text-sm">{result.confidence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Affected Area</span>
                  <span className="font-bold text-gray-800 text-sm">{result.affected}</span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="mb-6">
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Severity: {result.severity}</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{result.disease}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{result.cause}</p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-100 overflow-x-auto no-scrollbar">
                {['treatment', 'recovery', 'prevention'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-2 text-sm font-bold capitalize whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-krishi-green text-krishi-green' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab === 'treatment' ? 'Immediate Treatment' : tab === 'recovery' ? 'Recovery Plan' : 'Prevention'}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px] mb-8">
                {activeTab === 'treatment' && (
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="mt-0.5 bg-red-100 text-red-600 p-1 rounded"><AlertTriangle size={14} /></div>
                      Remove and destroy heavily infected lower leaves immediately.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="mt-0.5 bg-krishi-green-light text-krishi-green p-1 rounded"><CheckCircle2 size={14} /></div>
                      Apply recommended broad-spectrum fungicide spray.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="mt-0.5 bg-orange-100 text-orange-600 p-1 rounded"><AlertTriangle size={14} /></div>
                      Avoid overhead irrigation to keep foliage dry.
                    </li>
                  </ul>
                )}
                {activeTab === 'recovery' && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-krishi-green bg-krishi-green-light px-2 py-1 rounded text-xs">Day 1</span>
                      <p className="text-sm text-gray-700">Remove affected leaves and apply first spray.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-krishi-green bg-krishi-green-light px-2 py-1 rounded text-xs">Day 3</span>
                      <p className="text-sm text-gray-700">Apply Trichoderma-based Bio-Khaat to boost immunity.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-krishi-green bg-krishi-green-light px-2 py-1 rounded text-xs">Day 7</span>
                      <p className="text-sm text-gray-700">Upload another crop image for AI re-checking.</p>
                    </div>
                  </div>
                )}
                {activeTab === 'prevention' && (
                  <ul className="space-y-3 list-disc pl-5 text-sm text-gray-700">
                    <li>Maintain proper plant spacing for air circulation.</li>
                    <li>Avoid prolonged leaf moisture, especially overnight.</li>
                    <li>Monitor humidity levels using the Weather dashboard.</li>
                    <li>Practice crop rotation in the next season.</li>
                  </ul>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => navigate('/prescription')}
                  className="flex-1 bg-krishi-green text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-krishi-green-dark shadow-md"
                >
                  <FileText size={18} /> Generate AI Prescription
                </button>
                <button 
                  onClick={() => navigate('/experts')}
                  className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  Consult Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
