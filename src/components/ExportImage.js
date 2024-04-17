"use client"

import { useState } from 'react';
import { htmlToImage } from 'react-html-to-image';

const ExportImage = ({ componentToExport, fileName = 'my-component.png' }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const domElement = document.getElementById('component-to-export');
      if (domElement) {
        const dataUrl = await htmlToImage.toPng(domElement);

        // Create a link element and simulate a click to download the image
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error exporting component as image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          isExporting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleExport}
        disabled={isExporting}
      >
        Export as Image
      </button>
      <div id="component-to-export" className="hidden">
        {componentToExport}
      </div>
    </div>
  );
};

export default ExportImage;