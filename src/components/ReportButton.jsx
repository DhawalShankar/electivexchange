// src/components/ReportButton.jsx
import React from 'react';

const ReportButton = () => {
  const handleReport = () => {
    window.open(
      'mailto:dhawalworksgreat@gmail.com?subject=ElectiveXChange%20Issue&body=Hi%20Dhawal,%0A%0AI%20want%20to%20report%20a%20problem%20with...',
      '_blank'
    );
  };

  return (
    <button
      onClick={handleReport}
      className="fixed right-[-85px] top-1/2 -translate-y-1/2 -rotate-90 px-8 py-3 text-lg font-semibold tracking-wide bg-white/20 backdrop-blur-lg text-gray-100 border border-white/30 shadow-xl rounded-t-xl hover:bg-white/30 hover:text-white transition-all"
    >
      Report a Problem
    </button>
  );
};

export default ReportButton;