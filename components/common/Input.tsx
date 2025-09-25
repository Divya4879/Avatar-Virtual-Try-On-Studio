
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="flex items-center">
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <input
          id={id}
          className={`w-full bg-gray-900 border-2 border-gray-700 rounded-md py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition duration-200 ${icon ? 'pl-10' : 'px-4'}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
