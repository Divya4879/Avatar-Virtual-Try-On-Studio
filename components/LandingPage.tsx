import React from 'react';
import Button from './common/Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="space-y-24 my-12">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              The Future of Fitting Rooms
            </span>
            <span className="block text-gray-300 mt-2">Is Right Here.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-lg mx-auto lg:mx-0">
            Create a personalized avatar from a single photo, then instantly try on clothes from any online store. Discover your perfect fit and style without ever leaving home.
          </p>
          <div className="mt-10 flex justify-center">
            <Button onClick={onStart} className="text-xl px-10 py-4">
              Create Your Avatar
            </Button>
          </div>
        </div>
        <div className="relative h-96 flex items-center justify-center">
            {/* Visual showcase */}
            <div className="absolute w-48 h-64 bg-gray-800 rounded-xl shadow-2xl transform -rotate-12 border-2 border-gray-700 flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                <span className="text-5xl">👤</span>
                <p className="mt-4 text-center font-semibold text-gray-300">Your Photo</p>
            </div>
            <div className="absolute text-5xl text-brand-orange animate-pulse z-10">→</div>
            <div className="absolute w-48 h-64 bg-gray-900 rounded-xl shadow-2xl transform rotate-12 border-2 border-brand-blue flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                <span className="text-5xl">🤖</span>
                 <p className="mt-4 text-center font-semibold text-white">Your Avatar</p>
                 <p className="text-xs text-center text-gray-400">Styled in 'Sci-Fi'</p>
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">How It Works</h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          In three simple steps, you can build a virtual wardrobe and visualize your style like never before.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-700">
              {/* Icon for Upload/Avatar */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">1. Generate Your Avatar</h4>
            <p className="text-gray-400">
              Upload a single photo and choose a style. Our AI will generate a unique, full-body avatar that's ready for its fitting.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-700">
              {/* Icon for Clothing/URL */}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">2. Try On Any Style</h4>
            <p className="text-gray-400">
              Paste a link from any online clothing store. We'll fetch the item and realistically fit it onto your avatar based on your measurements.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-700">
               {/* Icon for Gallery/Save */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-2">3. Build Your Wardrobe</h4>
            <p className="text-gray-400">
              Love the look? Save your favorite outfits to your personal gallery. Build and browse your virtual wardrobe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;