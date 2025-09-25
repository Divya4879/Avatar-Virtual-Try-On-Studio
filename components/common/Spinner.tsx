
import React from 'react';

interface SpinnerProps {
    message: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 bg-opacity-50 rounded-lg">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-blue"></div>
      <p className="mt-4 text-lg text-white">{message}</p>
    </div>
  );
};

export default Spinner;
