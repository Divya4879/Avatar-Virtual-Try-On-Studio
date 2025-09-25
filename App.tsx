
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AvatarGenerator from './components/AvatarGenerator';
import TryOnStudio from './components/TryOnStudio';
import Gallery from './components/Gallery';
import type { AppStep, TryOnResult } from './types';
// FIX: Import Button component to resolve reference errors.
import Button from './components/common/Button';

type StudioTab = 'try-on' | 'gallery';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [studioTab, setStudioTab] = useState<StudioTab>('try-on');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  
  const [gallery, setGallery] = useState<TryOnResult[]>(() => {
    try {
      const savedGallery = localStorage.getItem('virtualTryOnGallery');
      return savedGallery ? JSON.parse(savedGallery) : [];
    } catch (error) {
      console.error('Could not load gallery from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('virtualTryOnGallery', JSON.stringify(gallery));
    } catch (error) {
      console.error('Could not save gallery to localStorage', error);
    }
  }, [gallery]);


  const handleAvatarGenerated = (base64Avatar: string, base64Original: string) => {
    setAvatarImage(base64Avatar);
    setUserImage(base64Original);
    setStep('studio');
    setStudioTab('try-on');
  };

  const handleStart = () => {
    setStep('avatar-generator');
  };

  const handleStartOver = () => {
    setUserImage(null);
    setAvatarImage(null);
    // Do not clear the gallery, it should persist
    setStep('landing');
  }
  
  const handleSaveToGallery = (result: TryOnResult) => {
    setGallery(prev => [result, ...prev]);
    alert("Saved to gallery!");
    // No longer switch tabs, to preserve form state
  }
  
  const renderStudio = () => {
    if (!avatarImage || !userImage) {
      handleStartOver();
      return null;
    }

    const tabButtonClasses = (tabName: StudioTab) => 
        `px-6 py-2 rounded-t-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-brand-blue ${
            studioTab === tabName 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
        }`;

    return (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
                <div className="sticky top-8 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Your Avatar</h3>
                        <div className="aspect-square bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                             <img src={avatarImage} alt="Your Generated Avatar" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <Button onClick={() => setStep('avatar-generator')} variant="secondary" className="w-full">
                        Create a New Avatar
                    </Button>
                </div>
            </div>
            <div className="lg:col-span-8">
                <div className="flex border-b border-gray-700 mb-6">
                    <button className={tabButtonClasses('try-on')} onClick={() => setStudioTab('try-on')}>
                        Try-On Studio
                    </button>
                    <button className={tabButtonClasses('gallery')} onClick={() => setStudioTab('gallery')}>
                        Gallery ({gallery.length})
                    </button>
                </div>
                <div>
                    {studioTab === 'try-on' && (
                        <TryOnStudio 
                            avatarImage={avatarImage}
                            onSaveToGallery={handleSaveToGallery}
                        />
                    )}
                    {studioTab === 'gallery' && (
                        <Gallery results={gallery} onBack={() => setStudioTab('try-on')} />
                    )}
                </div>
            </div>
        </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <LandingPage onStart={handleStart} />;
      case 'avatar-generator':
        return <AvatarGenerator onAvatarGenerated={handleAvatarGenerated} />;
      case 'studio':
        return renderStudio();
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderStep()}
      </main>
      <footer className="text-center text-gray-500 text-sm border-t border-gray-800 h-24 flex flex-col items-center justify-center">
         <p>
            <button onClick={handleStartOver} className="text-gray-400 hover:text-white transition-colors duration-300">Start Over</button>
         </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Avatar Virtual Try-On Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;