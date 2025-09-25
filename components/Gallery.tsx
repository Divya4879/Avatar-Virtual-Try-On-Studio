import React from 'react';
import type { TryOnResult } from '../types';
import Button from './common/Button';

interface GalleryProps {
  results: TryOnResult[];
  onBack: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ results, onBack }) => {
  if (results.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-900 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Your Gallery is Empty</h2>
        <p className="text-gray-400 mb-6">You haven't saved any looks yet. Go to the Try-On Studio to create and save your first outfit!</p>
        <Button onClick={onBack}>Go to Studio</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div key={result.id} className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden group flex flex-col">
            <img src={result.finalImage} alt="Try-on result" className="w-full h-auto object-cover aspect-square" />
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="font-bold text-white leading-tight">{result.clothingDetails.itemType || 'Clothing Item'}</h4>
              <p className="text-sm text-gray-400">
                  {result.clothingDetails.fit} Fit · {result.clothingDetails.material}
              </p>

              {result.clothingDetails.description && (
                  <p className="mt-2 text-xs text-gray-400 italic bg-gray-800 p-2 rounded-md">
                      "{result.clothingDetails.description}"
                  </p>
              )}

              {result.clothingImages.length > 0 && (
                 <div className="mt-4">
                    <h5 className="text-xs font-semibold text-gray-300 mb-2">Clothing Images:</h5>
                    <div className="grid grid-cols-4 gap-2">
                        {result.clothingImages.map((imgSrc, index) => (
                            <img key={index} src={imgSrc} alt={`Clothing ${index + 1}`} className="w-full aspect-square object-cover rounded-md border border-gray-700" />
                        ))}
                    </div>
                </div>
              )}
              
              <details className="mt-auto pt-4 text-sm">
                <summary className="cursor-pointer text-gray-400 hover:text-white">View Details</summary>
                <div className="mt-2 space-y-1 text-gray-500 border-t border-gray-700 pt-2">
                    <p className="text-xs text-gray-400">Saved on: {result.timestamp}</p>
                    <h5 className="font-semibold text-gray-300 pt-1">Measurements Used:</h5>
                    <ul>
                        <li>Height: {result.measurements.height || 'N/A'} cm</li>
                        <li>Weight: {result.measurements.weight || 'N/A'} kg</li>
                        <li>Chest: {result.measurements.chest || 'N/A'} cm</li>
                        <li>Waist: {result.measurements.waist || 'N/A'} cm</li>
                        <li>Hips: {result.measurements.hips || 'N/A'} cm</li>
                    </ul>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;