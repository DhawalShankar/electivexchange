// src/components/ReportButton.jsx - MOBILE RESPONSIVE
import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

const ReportButton = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleReport = () => {
    window.open(
      'mailto:dhawalworksgreat@gmail.com?subject=ElectiveXChange%20Issue&body=Hi%20Dhawal,%0A%0AI%20want%20to%20report%20a%20problem%20with...',
      '_blank'
    );
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Desktop - Sideways button on right edge */}
      <button
        onClick={handleReport}
        className="hidden sm:block fixed right-[-85px] top-1/2 -translate-y-1/2 -rotate-90 px-8 py-3 text-lg font-semibold tracking-wide bg-white/20 backdrop-blur-lg text-gray-100 border border-white/30 shadow-xl rounded-t-xl hover:bg-white/30 hover:text-white transition-all z-40"
      >
        Report a Problem
      </button>

      {/* Mobile - Floating action button */}
      <div className="sm:hidden">
        {!showMobileMenu ? (
          <button
            onClick={() => setShowMobileMenu(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40"
            aria-label="Report a problem"
          >
            <AlertCircle className="w-6 h-6 text-white" />
          </button>
        ) : (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Report a Problem</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm">
                  Found a bug or have feedback? Let Dhawal know!
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleReport}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    Send Email
                  </button>
                  
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ReportButton;