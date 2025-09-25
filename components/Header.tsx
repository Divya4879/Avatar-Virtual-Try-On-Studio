
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Avatar Virtual Try-On Studio
          </span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
