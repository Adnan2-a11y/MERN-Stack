import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
      <h1 className="text-2xl font-bold text-blue-600">GradX</h1>
      <div className="flex gap-6 text-gray-700 font-medium">
        <a href="#home" className="hover:text-blue-600">Home</a>
        <a href="#about" className="hover:text-blue-600">About</a>
        <a href="#events" className="hover:text-blue-600">Events</a>
        <a href="#contact" className="hover:text-blue-600">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
