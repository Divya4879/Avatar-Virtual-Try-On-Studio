
import React, { useState, useCallback } from 'react';
import { generateAvatar } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { AVATAR_STYLES } from '../types';
import type { AvatarStyle } from '../types';

interface AvatarGeneratorProps {
  onAvatarGenerated: (base64Avatar: string, base64Original: string) => void;
}

const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ onAvatarGenerated }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [style, setStyle] = useState<AvatarStyle>(AVATAR_STYLES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!imageBase64) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const avatarResult = await generateAvatar(imageBase64, style);
      onAvatarGenerated(avatarResult, imageBase64);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [imageBase64, style, onAvatarGenerated]);

  if (isLoading) {
    return (
        <div className="flex justify-center">
            <Spinner message="Generating your unique avatar... This may take a moment." />
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-2">Create Your Avatar</h2>
      <p className="text-center text-gray-400 mb-6">Step 1: Upload a clear, front-facing photo of yourself.</p>

      <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30 mb-6 text-sm">
          <h4 className="font-bold text-white mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Tips for the Best Avatar
          </h4>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>Use a clear, well-lit, front-facing photo.</li>
              <li>A full-body or upper-body shot works best.</li>
              <li>Avoid sunglasses, hats, or anything covering your face.</li>
              <li>A simple, neutral background is ideal.</li>
          </ul>
      </div>

      {error && <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">{error}</div>}

      <div className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-400 mb-1">
            Your Photo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                {imageBase64 ? (
                    <img src={imageBase64} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-full"/>
                ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
              <div className="flex text-sm text-gray-500 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-brand-blue hover:text-brand-orange focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-brand-blue px-1">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        <div>
            <label htmlFor="avatar-style" className="block text-sm font-medium text-gray-400 mb-2">
                Choose an Avatar Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AVATAR_STYLES.map((s) => (
                    <button 
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`p-3 rounded-lg text-center font-semibold border-2 transition-all duration-200 ${style === s ? 'bg-brand-blue border-brand-blue text-white' : 'bg-gray-800 border-gray-700 hover:border-brand-blue'}`}
                        aria-pressed={style === s}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>

        <div className="pt-4">
            <Button onClick={handleSubmit} disabled={!imageFile} className="w-full text-lg">
                Generate My Avatar
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
