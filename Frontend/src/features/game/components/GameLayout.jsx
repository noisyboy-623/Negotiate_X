import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const GameLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#060707]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT WITH SIDEBAR */}
      <div className="flex pt-16">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT AREA */}
        <main className="flex-1 ml-64 p-8 bg-gradient-to-br from-gray-900 via-[#060707] to-black text-white min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default GameLayout;
