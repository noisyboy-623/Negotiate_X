/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { RiTrophyLine, RiFireLine } from "@remixicon/react";

const Leaderboard = ({ user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://negotiate-x-backend.onrender.com/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const top3 = data.slice(0, 3);
  
  if (loading) {
    return (
      <div className="h-full w-full bg-[#060707] text-white p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <RiTrophyLine size={40} className="text-[#02C173]" />
          </div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-full w-full bg-[#060707] text-white p-10 flex items-center justify-center">
        <div className="text-center">
          <RiTrophyLine size={40} className="text-[#02C173] mx-auto mb-4" />
          <p className="text-gray-400">No leaderboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#060707] via-[#0a1a15] to-[#060707] text-white p-10 overflow-y-auto">
      {/* HEADER */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
         
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#02C173] to-[#00d685]">
            🏆 Leaderboard
          </h1>
        </div>
        <p className="text-gray-400 text-sm ml-12">Top negotiators by final price</p>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="space-y-4 max-w-5xl mx-auto mb-12">
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-12 perspective">
          {/* 🥈 SECOND PLACE */}
          {top3[1] && (
            <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-105 hover:translate-y-[-8px]" style={{ animation: 'slideInLeft 0.8s ease-out' }}>
              <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.2s' }}>🥈</div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-[#02C173]/30 rounded-2xl p-6 w-40 text-center shadow-lg hover:shadow-[0_0_40px_rgba(2,193,115,0.3)] transition-all duration-300">
                <p className="text-lg font-bold text-white mb-1">{top3[1].username}</p>
                <p className="text-xs text-gray-400 mb-3">₹</p>
                <p className="text-2xl font-bold text-[#02C173]">{top3[1].finalPrice}</p>
                <div className="mt-3 pt-3 border-t border-[#02C173]/20">
                  <p className="text-xs text-[#02C173]/80">{top3[1].product}</p>
                </div>
              </div>
            </div>
          )}

          {/* 🥇 FIRST PLACE (CENTER - LARGEST) */}
          {top3[0] && (
            <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-110 hover:translate-y-[-12px]" style={{ animation: 'slideInDown 0.8s ease-out' }}>
              <div className="text-5xl mb-4" style={{ animation: 'pulse 2s infinite' }}>🥇</div>
              <div className="bg-gradient-to-br from-[#02C173]/20 via-[#02C173]/10 to-transparent border-2 border-[#02C173] rounded-3xl p-10 w-56 text-center shadow-[0_0_50px_rgba(2,193,115,0.5)] scale-105">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RiFireLine size={24} className="text-[#02C173]" />
                  <span className="text-sm font-bold text-[#02C173] uppercase">Winner</span>
                </div>
                <p className="font-bold text-2xl text-white mb-4">{top3[0].username}</p>
                <div className="bg-[#02C173]/20 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-1">Final Price</p>
                  <p className="text-3xl font-bold text-[#02C173]">₹{top3[0].finalPrice}</p>
                </div>
                <div className="pt-4 border-t border-[#02C173]/30">
                  <p className="text-sm text-[#02C173]/90 font-semibold">{top3[0].product}</p>
                </div>
              </div>
            </div>
          )}

          {/* 🥉 THIRD PLACE */}
          {top3[2] && (
            <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-105 hover:translate-y-[-8px]" style={{ animation: 'slideInRight 0.8s ease-out' }}>
              <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: '0.4s' }}>🥉</div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-[#02C173]/30 rounded-2xl p-6 w-40 text-center shadow-lg hover:shadow-[0_0_40px_rgba(2,193,115,0.3)] transition-all duration-300">
                <p className="text-lg font-bold text-white mb-1">{top3[2].username}</p>
                <p className="text-xs text-gray-400 mb-3">₹</p>
                <p className="text-2xl font-bold text-[#02C173]">{top3[2].finalPrice}</p>
                <div className="mt-3 pt-3 border-t border-[#02C173]/20">
                  <p className="text-xs text-[#02C173]/80">{top3[2].product}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FULL LEADERBOARD LIST */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-[#02C173] mb-3 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#02C173] rounded-full"></span>
            Full Rankings
          </h2>
          
          {/* TABLE CONTAINER */}
          <div className="overflow-x-auto rounded-xl border border-[#02C173]/30 bg-[#0a1a15]">
            {/* TABLE HEADER */}
            <div className="grid gap-0 bg-[#02C173]/5 text-[#02C173] border-b border-[#02C173]/30 px-6 py-4" style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr' }}>
              <div className="font-bold text-sm uppercase tracking-wider">Rank</div>
              <div className="font-bold text-sm uppercase tracking-wider">Negotiator</div>
              <div className="font-bold text-sm uppercase tracking-wider text-center">Product</div>
              <div className="font-bold text-sm uppercase tracking-wider text-right">Price</div>
            </div>

            {/* TABLE ROWS */}
            {data.map((item, index) => {
              const isWinner = index < 3;

              return (
                <div
                  key={item._id}
                  className={`grid gap-0 px-6 py-5 border-b border-[#02C173]/10 hover:bg-[#02C173]/5 text-white transition-all ${index % 2 === 0 ? 'bg-[#060707]' : ''}`}
                  style={{ gridTemplateColumns: '1fr 1.5fr 1fr 1fr' }}
                >
                  {/* RANK */}
                  <div className="flex items-center font-bold text-lg">
                    <span className={isWinner ? 'text-2xl' : 'text-[#02C173]'}>
                      {isWinner ? (index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉') : `${String(index + 1).padStart(2, '0')}`}
                    </span>
                  </div>

                  {/* NEGOTIATOR NAME */}
                  <div className="flex items-center min-w-0">
                    <span className="uppercase tracking-wide font-semibold truncate">{item.username || 'Unknown'}</span>
                  </div>

                  {/* PRODUCT BADGE */}
                  <div className="flex items-center justify-center">
                    <span className="bg-[#02C173]/15 text-[#02C173] px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0">
                      {item.product || 'N/A'}
                    </span>
                  </div>

                  {/* PRICE ACHIEVED */}
                  <div className="flex items-center justify-end font-bold text-lg text-[#02C173]">
                    ₹{item.finalPrice || '—'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(2, 193, 115, 0.3);
          border-radius: 3px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(2, 193, 115, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
