/* eslint-disable no-unused-vars */
"use client";

import React from "react";

const GameHeader = ({ stage, onBack, onHome }) => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-[#060707] border-b border-[#02C173]/20 text-white">

      {/* Back Button */}
      {stage !== "home" && (
  <button
    onClick={onBack}
    className="px-4 py-2 bg-white/5 rounded-lg border border-[#02C173]/20 hover:bg-[#02C173]/10 transition"
  >
    ← Back
  </button>
)}

      {/* Title */}
      <h1 className="text-lg font-semibold">
        Negotiation Game
      </h1>

      {/* Home Button */}
      <button
        onClick={onHome}
        className="px-4 py-2 bg-white/5 rounded-lg border border-[#02C173]/20 hover:bg-[#02C173]/10 transition"
      >
        🏠 Home
      </button>

    </div>
  );
};

export default GameHeader;