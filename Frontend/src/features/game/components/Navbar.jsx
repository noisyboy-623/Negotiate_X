/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RiUser3Line, RiLogoutBoxLine, RiCloseLine, RiMailLine, RiCalendarLine } from "@remixicon/react";
import { useAuth } from "../../auth/hook/useAuth";

const Navbar = ({ stage, setStage }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-[#0B0F0E] border-b border-gray-800 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between border-b border-gray-200">
        {/* LOGO AND BRAND */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <h1 className="text-xl font-bold text-[#02C173] tracking-tight">
            NEGOTIATE_
            <span className="text-white">X</span>
          </h1>
        </button>

        {/* CENTER NAVIGATION */}
        <div className="flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          <button
  onClick={() => {
  if (stage === "negotiation") {
    setShowConfirm(true);
  } else {
    setStage("selection");
  }
}}
  className={`text-sm font-semibold transition-colors duration-300 ${
    stage === "negotiation"
      ? "text-white hover:text-[#02C173]"
      : ["selection", "agent", "negotiation"].includes(stage)
      ? "text-[#02C173]"
      : "text-white hover:text-[#02C173]"
  }`}
>
  {stage === "negotiation" ? "HOME" : "PLAY GAME"}
</button>

          {/* LEADERBOARD */}
          <button
            onClick={() => setStage("leaderboard")}
            className={`text-sm font-semibold transition-colors duration-300
      ${stage === "leaderboard" ? "text-[#02C173]" : "text-white hover:text-[#02C173]"}`}
          >
            LEADERBOARD
          </button>
        </div>

        {/* RIGHT SIDE - USER & LOGOUT */}
        <div className="flex items-center gap-4 relative">
          {/* USER PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-white bg-transparent border-2 border-white hover:bg-white hover:text-black transition-all duration-500"
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <span className="text-lg">
                  <RiUser3Line />
                </span>
                {user?.username || "User"}
              </span>
            </button>

            {/* DROPDOWN MENU */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0B0F0E] border border-gray-700 rounded-lg shadow-lg z-50">
                {/* Profile Item */}
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#02C173] hover:bg-[#02C173]/10 transition-all duration-300 border-b border-gray-700"
                >
                  <RiUser3Line />
                  <span className="text-sm font-medium">View Profile</span>
                </button>

                {/* Logout Item */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                >
                  <RiLogoutBoxLine />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}

            {showConfirm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    
    <div className="bg-[#0B0F0E] border border-gray-700 rounded-2xl p-6 w-[350px] text-center shadow-xl">
      
      <h2 className="text-lg font-semibold text-white">
        Leave Game?
      </h2>

      <p className="text-gray-400 mt-2 text-sm">
        Your current negotiation will be lost.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        
        {/* CANCEL */}
        <button
          onClick={() => setShowConfirm(false)}
          className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
        >
          Cancel
        </button>

        {/* CONFIRM */}
        <button
          onClick={() => {
            setShowConfirm(false);
            setStage("home");
          }}
          className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Leave
        </button>

      </div>
    </div>
  </div>
)}

      {/* PROFILE MODAL */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#0B0F0E] to-[#060707] border border-[#02C173]/30 rounded-3xl p-8 w-[420px] shadow-[0_0_50px_rgba(2,193,115,0.2)]">
            
            {/* CLOSE BUTTON */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white">Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-400 hover:text-[#02C173] transition-colors"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* PROFILE CONTENT */}
            <div className="space-y-5">
              
              {/* AVATAR SECTION */}
              <div className="flex flex-col items-center pb-5 border-b border-[#02C173]/20">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#02C173] to-[#00a366] flex items-center justify-center mb-4 text-3xl font-black text-black shadow-lg">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <h3 className="text-xl font-black text-white">{user?.username || "User"}</h3>
              </div>

              {/* EMAIL */}
              {user?.email && (
                <div className="flex items-center gap-3 p-4 bg-[#02C173]/5 rounded-xl border border-[#02C173]/20">
                  <RiMailLine className="text-[#02C173] flex-shrink-0" size={20} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                    <p className="text-white font-medium text-sm">{user.email}</p>
                  </div>
                </div>
              )}

              {/* JOIN DATE */}
              <div className="flex items-center gap-3 p-4 bg-[#02C173]/5 rounded-xl border border-[#02C173]/20">
                <RiCalendarLine className="text-[#02C173] flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Member Since</p>
                  <p className="text-white font-medium text-sm">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently Joined"}
                  </p>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-6 pt-5 border-t border-[#02C173]/20">
              <button
                onClick={() => setShowProfile(false)}
                className="flex-1 px-4 py-3 bg-[#02C173] text-black font-bold rounded-xl hover:bg-[#02C173]/90 transition-all duration-300"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
