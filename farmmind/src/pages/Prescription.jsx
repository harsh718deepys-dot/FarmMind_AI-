import React from 'react';
import { Download, Bookmark, AlertCircle, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';

const Prescription = () => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-24">
      
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">AI Crop Prescription</h1>
          <p className="text-gray-500 font-medium">Generated based on your recent scan</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Bookmark size={20} />
          </button>
          <button className="flex items-center gap-2 bg-krishi-green-light text-krishi-green-dark px-4 py-2 rounded-lg font-bold hover:bg-krishi-green hover:text-white transition-colors">
            <Download size={20} /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Prescription Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-krishi-green text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl"><ShieldCheck size={28} /></div>
            <div>
              <h2 className="text-xl font-bold">Tomato • Early Blight</h2>
              <span className="text-krishi-green-light text-sm font-medium">Severity: Moderate</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/80">Prescription Date</div>
            <div className="font-bold">04 Sept 2026</div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Recommendation */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Primary Chemical Treatment</h3>
            <div className="bg-gray-50 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended Fungicide</p>
                <p className="font-bold text-gray-800 text-lg">Chlorothalonil 75% WP</p>
                <p className="text-xs text-gray-400 mt-1">(Common brands: Kavach, Bravo)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Dosage</p>
                  <p className="font-bold text-gray-800">2 gm / Litre</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Frequency</p>
                  <p className="font-bold text-gray-800">Every 7 Days</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Application Time</p>
                  <p className="font-bold text-gray-800">Early Morning or Late Evening</p>
                </div>
              </div>
            </div>
          </div>

          {/* Biological Alternative */}
          <div>
            <h3 className="text-lg font-bold text-krishi-green-dark mb-4 border-b border-krishi-green-light pb-2 flex items-center gap-2">
              <Leaf size={20} /> Biological Alternative (Bio-Control)
            </h3>
            <div className="bg-krishi-green-light/30 border border-krishi-green-light p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-krishi-green-dark mb-1">Suggested Bio-Control</p>
                <p className="font-bold text-gray-800 text-lg">Trichoderma viride 1.5% WP</p>
              </div>
              <div>
                <p className="text-sm text-krishi-green-dark mb-1">Application</p>
                <p className="font-bold text-gray-800">Foliar spray @ 5 gm / Litre water.</p>
                <p className="text-xs text-gray-600 mt-1">Excellent for organic farming. Do not mix with chemical fungicides.</p>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Safety Instructions</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <AlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-sm text-gray-700 leading-relaxed">Wear protective gear (mask, gloves) while preparing and spraying the solution.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-krishi-green mt-0.5 flex-shrink-0" size={18} />
                <span className="text-sm text-gray-700 leading-relaxed">Observe a pre-harvest interval (PHI) of at least 7 days before plucking tomatoes.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Warning */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-xs text-gray-500">
          <span className="font-bold text-gray-700">Disclaimer:</span> This is an AI-generated advisory based on visual symptoms. Expert verification is recommended for severe infections.
        </div>
      </div>
      
      {/* Mobile action buttons */}
      <div className="sm:hidden flex gap-3 mt-4">
        <button className="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          <Bookmark size={18} /> Save
        </button>
        <button className="flex-1 bg-krishi-green text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          <Download size={18} /> Download
        </button>
      </div>

    </div>
  );
};

export default Prescription;
