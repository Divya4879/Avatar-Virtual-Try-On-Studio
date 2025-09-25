
import React, { useState, useCallback, useEffect } from 'react';
import { performTryOn } from '../services/geminiService';
import Button from './common/Button';
import Input from './common/Input';
import Select from './common/Select';
import Spinner from './common/Spinner';
import type { Measurements, TryOnResult, ClothingDetails } from '../types';

interface TryOnStudioProps {
  avatarImage: string;
  onSaveToGallery: (result: TryOnResult) => void;
}

const CLOTHING_TYPES = ['T-Shirt', 'Shirt', 'Jeans', 'Trousers', 'Dress', 'Skirt', 'Jacket', 'Sweater', 'Hoodie'];
const CLOTHING_FITS = ['Slim', 'Regular', 'Loose', 'Oversized', 'Skinny'];

const TryOnStudio: React.FC<TryOnStudioProps> = ({ avatarImage, onSaveToGallery }) => {
  const [clothingImages, setClothingImages] = useState<string[]>([]);
  const [clothingDetails, setClothingDetails] = useState<ClothingDetails>({
    itemType: '', material: '', fit: '', description: '',
  });
  
  const [measurements, setMeasurements] = useState<Measurements>(() => {
    try {
      const saved = localStorage.getItem('userMeasurements');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null && 'height' in parsed) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to read measurements from localStorage", e);
    }
    return { height: '', weight: '', chest: '', waist: '', hips: '' };
  });

  useEffect(() => {
    try {
      localStorage.setItem('userMeasurements', JSON.stringify(measurements));
    } catch (e) {
      console.error("Failed to save measurements to localStorage", e);
    }
  }, [measurements]);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setClothingDetails(prev => ({...prev, [name]: value}));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const newFiles = Array.from(files);
        const availableSlots = 4 - clothingImages.length;

        if (availableSlots <= 0) {
            setError('You have already uploaded the maximum of 4 images.');
            event.target.value = '';
            return;
        }

        const filesToAdd = newFiles.slice(0, availableSlots);
        if (newFiles.length > filesToAdd.length) {
            setError(`You can only add ${availableSlots} more image(s). ${filesToAdd.length} were added.`);
        } else {
            setError(null);
        }

        const filePromises = filesToAdd.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                // FIX: Explicitly wrap reject in an arrow function to avoid potential type inference issues.
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filePromises).then(newBase64Images => {
            setClothingImages(prevImages => [...prevImages, ...newBase64Images]);
        }).catch(err => {
            console.error("Error converting files to base64", err);
            setError("Could not read image files. Please try again.");
        });

        event.target.value = '';
    }
  };
  
  const removeClothingImage = (indexToRemove: number) => {
    setClothingImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleTryOn = useCallback(async () => {
    if (clothingImages.length === 0 || !measurements.height || !measurements.weight || !clothingDetails.itemType || !clothingDetails.fit || !clothingDetails.material) {
      setError('Please upload clothing images and fill in all required clothing and measurement fields.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFinalImage(null);
    try {
      const resultImage = await performTryOn(avatarImage, clothingImages, clothingDetails, measurements);
      setFinalImage(resultImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [avatarImage, clothingImages, clothingDetails, measurements]);

  const handleSave = () => {
    if (finalImage) {
        const result: TryOnResult = {
            id: new Date().toISOString(),
            finalImage,
            avatarImage,
            clothingImages,
            clothingDetails,
            measurements,
            timestamp: new Date().toLocaleString(),
        };
        onSaveToGallery(result);
    }
  };

  const handleClear = () => {
      setClothingImages([]);
      setClothingDetails({ itemType: '', material: '', fit: '', description: '' });
      setFinalImage(null);
      setError(null);
  };

  const downloadImage = () => {
    if (!finalImage) return;
    const a = document.createElement('a');
    a.href = finalImage;
    a.download = `try-on-result-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* LEFT COLUMN: INPUTS */}
      <div className="p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 space-y-6">
        {error && <div className="bg-red-500 text-white p-3 rounded-md text-center text-sm">{error}</div>}

        <div>
            <h3 className="text-lg font-bold mb-3 text-white">1. Add Clothing Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="clothing-files" className="block text-sm font-medium text-gray-400 mb-1">
                  {`Add Clothing Images (${clothingImages.length}/4)`}
                </label>
                <input 
                  id="clothing-files" 
                  name="clothing-files" 
                  type="file" 
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-orange disabled:opacity-50 disabled:hover:file:bg-brand-blue" 
                  accept="image/png, image/jpeg" 
                  multiple 
                  onChange={handleFileChange} 
                  disabled={clothingImages.length >= 4}
                />
                 <p className="text-xs text-gray-500 mt-1">You can add images one by one or select multiple.</p>
              </div>

               {clothingImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                    {clothingImages.map((imgSrc, index) => (
                      <div key={index} className="relative group">
                        <img src={imgSrc} alt={`Clothing preview ${index + 1}`} className="w-full h-auto object-cover aspect-square rounded-md border-2 border-gray-700" />
                        <button
                            onClick={() => removeClothingImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                            aria-label={`Remove image ${index + 1}`}
                        >
                            &#x2715;
                        </button>
                      </div>
                    ))}
                </div>
              )}
                
              <div className="bg-gray-800 p-3 rounded-lg border border-blue-500/30 text-xs">
                  <h4 className="font-bold text-white mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-brand-blue" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                      Tips for Clothing Images
                  </h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                      <li>Use clear, "flat lay" images or product shots on a plain background.</li>
                      <li>Provide front and back views for the best 3D understanding.</li>
                  </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Item Type*" id="itemType" name="itemType" value={clothingDetails.itemType} onChange={handleDetailsChange} options={CLOTHING_TYPES} required />
                <Select label="Fit*" id="fit" name="fit" value={clothingDetails.fit} onChange={handleDetailsChange} options={CLOTHING_FITS} required />
              </div>
              <Input label="Material*" id="material" name="material" placeholder="e.g., Cotton, Denim, Silk" value={clothingDetails.material} onChange={handleDetailsChange} required />
              <textarea
                  id="description"
                  name="description"
                  rows={2}
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition duration-200"
                  placeholder="Optional: Add any other details (e.g., 'v-neck', 'distressed')"
                  value={clothingDetails.description}
                  onChange={handleDetailsChange}
              />
            </div>
        </div>
        
        <hr className="border-gray-700"/>

        <div>
            <h3 className="text-lg font-bold mb-3 text-white">2. Add Your Measurements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Height (cm)*" id="height" name="height" type="number" placeholder="175" value={measurements.height} onChange={handleInputChange} required/>
              <Input label="Weight (kg)*" id="weight" name="weight" type="number" placeholder="70" value={measurements.weight} onChange={handleInputChange} required/>
              <Input label="Chest (cm)" id="chest" name="chest" type="number" placeholder="98" value={measurements.chest} onChange={handleInputChange} />
              <Input label="Waist (cm)" id="waist" name="waist" type="number" placeholder="80" value={measurements.waist} onChange={handleInputChange} />
              <Input label="Hips (cm)" id="hips" name="hips" type="number" placeholder="100" value={measurements.hips} onChange={handleInputChange} />
            </div>
        </div>

        <hr className="border-gray-700"/>

        <div className="flex flex-col sm:flex-row gap-4">
             <Button onClick={handleClear} variant="secondary" className="w-full">
                Start New
            </Button>
             <Button onClick={handleTryOn} isLoading={isLoading} className="w-full text-lg">
                See The Look
            </Button>
        </div>
      </div>
      
      {/* RIGHT COLUMN: RESULT */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center text-white">Your Virtual Fitting Room</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div>
            <h4 className="text-lg font-semibold text-center text-gray-300 mb-2">Before</h4>
            <div className="aspect-square bg-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
              <img src={avatarImage} alt="Original Avatar" className="w-full h-full object-contain" />
            </div>
          </div>
          {/* After */}
          <div>
            <h4 className="text-lg font-semibold text-center text-gray-300 mb-2">After</h4>
            <div className="relative w-full aspect-square bg-gray-900 rounded-xl shadow-2xl border border-gray-700 flex items-center justify-center overflow-hidden">
              {isLoading && <Spinner message="Styling your avatar..." />}
              {!isLoading && !finalImage && <div className="text-gray-500 px-4 text-center">Your new look will appear here.</div>}
              {!isLoading && finalImage && <img src={finalImage} alt="Final Try-On Result" className="w-full h-full object-contain" />}
            </div>
          </div>
        </div>
        {finalImage && !isLoading && (
          <div className="flex justify-center space-x-4">
              <Button onClick={downloadImage} variant="secondary">Download</Button>
              <Button onClick={handleSave}>Save to Gallery</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOnStudio;
