/* eslint-disable no-unused-vars */

"use client";

import React, { useEffect, useState, useRef } from "react";
import { RiArrowLeftLine } from "@remixicon/react";

const ChatUI = ({ socket, product, agent, onGameOver, onRestart, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [price, setPrice] = useState(null);
  const [round, setRound] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [dealAccepted, setDealAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalPrice, setFinalPrice] = useState(null);

  const messagesEndRef = useRef(null);
  const difficultyMap = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  const difficulty = difficultyMap[product?.difficulty?.toLowerCase()] || "Medium";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("ai_intro", (data) => {
      setMessages((prev) => [...prev, { role: "ai", content: data.message }]);
      setPrice(data.price);
    });

    socket.on("negotiation_update", (data) => {
      setMessages((prev) => [...prev, { role: "ai", content: data.message }]);
      setPrice(data.price);
      setRound(data.round);
    });

    socket.on("game_over", (data) => {
  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: data.accepted
          ? `🎉 Deal closed at ₹${data.finalPrice}!`
          : `Negotiation ended. Final price was ₹${data.finalPrice}`,
      },
    ]);

    setGameOver(true);
    setFinalPrice(data.finalPrice);

    setTimeout(() => {
      scrollToBottom();
      setShowModal(true);
    }, 500);

  }, 900); // 🔥 MUST be > backend delay (800ms)
});

    return () => {
      socket.off("ai_intro");
      socket.off("negotiation_update");
      socket.off("game_over");
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    socket.emit("negotiate", input);
    setInput("");
  };

  return (
    <div className="flex h-full w-full bg-[#0B0F0E] text-white">
      {/* BACKGROUND GLOW */}

      {/* LEFT PANEL */}
      <div className="w-[400px] h-full border-r border-gray-800 p-6 flex flex-col gap-4">
        {/* PRODUCT CARD */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-5 flex flex-col flex-shrink-0">
          <img
            src={product?.image}
            className="rounded-lg mb-4 w-full h-64 object-cover"
          />

          <h2 className="text-lg font-semibold">{product?.name}</h2>
          <p className="text-xs text-gray-400 mt-1">{difficulty} </p>

          <div className="flex justify-between mt-3 text-sm">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-semibold">₹{product?.price}</span>
          </div>

          <p className="text-xs text-gray-500 mt-3 line-clamp-2">{product?.description}</p>
        </div>

        {/* DEALER */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-5 flex-shrink-0">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Your Dealer</p>
          <p className="font-semibold mt-2">{agent?.name}</p>
        </div>

        {/* ACTION */}
        {!gameOver && (
          <button
            onClick={() => {
              socket.emit("accept_deal");
              setDealAccepted(true);
            }}
            className="mt-auto bg-[#02C173] text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Accept Deal
          </button>
        )}
      </div>

      {/* CHAT AREA */}
      <div className=" flex-1 flex flex-col bg-[#060707]">
        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Waiting for negotiation to start...
            </div>
          )}

         
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-xl ${
                    msg.role === "user"
                      ? "bg-[#02C173] text-black"
                      : "bg-[#111] border border-gray-800 text-white"
                  }`}
                >
                  {String(msg.content)}
                </div>
              </div>
            ))}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-gray-800 p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#111] border border-gray-800 rounded-lg px-4 py-3 text-white"
            placeholder="Type your offer..."
          />

          <button
            onClick={sendMessage}
            className="bg-[#02C173] text-black px-5 rounded-lg"
          >
            ➤
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#060707] border border-[#02C173]/30 backdrop-blur-xl rounded-2xl p-8 w-[350px] text-center text-white shadow-[0_0_40px_rgba(2,193,115,0.2)]">
            <h2 className="text-2xl font-bold mb-4">
              {dealAccepted ? "🎉 Deal Closed!" : "Negotiation Ended"}
            </h2>

            <p className="text-lg mb-6">
              Final Price:{" "}
              <span className="text-[#02C173] font-semibold">
                ₹{finalPrice}
              </span>
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onGameOver}
                className="bg-[#02C173] text-black py-2 rounded-xl font-semibold"
              >
                View Leaderboard
              </button>

              <button
                onClick={onRestart}
                className="border border-[#02C173]/30 py-2 rounded-xl hover:bg-[#02C173]/10"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatUI;
