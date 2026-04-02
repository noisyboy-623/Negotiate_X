import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getMe } from "../service/game.api";

import SwipeDeck from "../components/SwipeDeck";
import ProductInfo from "../components/ProductInfo";
import ChatUI from "../components/ChatUI";
import Leaderboard from "../components/Leaderboard";
import MidnightSky from "../components/MidNightSky";
import spiderman from "../images/spiderman.jpg";
import valhalla from "../images/valhalla.png";
import ghost from "../images/ghost.png";

import { Navbar, Sidebar } from "../components/index";

const socket = io("https://negotiate-x-backend.onrender.com");
// const socket = io("http://localhost:3000");

const products = [
  {
    id: "ps5-spiderman",
    name: "PS5 Spider-Man Limited Edition",
    price: 75000,
    image: spiderman, // replace with your import
    description:
      "Limited edition PS5 featuring Spider-Man design, highly sought after by collectors",
    difficulty: "easy",
    negotiationType: "scarcity",
  },
  {
    id: "ps5-valhalla",
    name: "PS5 Assassin’s Creed Valhalla Edition",
    price: 78000,
    image: valhalla,
    description:
      "Viking-themed PS5 console with intricate Norse design, limited availability",
    difficulty: "medium",
    negotiationType: "branding",
  },
  {
    id: "ps5-ghost",
    name: "PS5 Ghost of Tsushima Custom Edition",
    price: 82000,
    image: ghost,
    description:
      "Premium custom PS5 inspired by Ghost of Tsushima with artistic engraved finish",
    difficulty: "hard",
    negotiationType: "emotional",
  },
];

const agents = [
  {
    id: "friendly",
    name: "The Companion",
    personality: "friendly",
    description: "Warm & approachable, enjoys building trust and rapport",
  },
  {
    id: "greedy",
    name: "The Opportunist",
    personality: "greedy",
    description: "Relentless & profit-focused, prioritizes gains over fairness",
  },
  {
    id: "balanced",
    name: "The Mediator",
    personality: "balanced",
    description:
      "Rational & steady, seeks win-win outcomes through fair negotiation",
  },
];

const GamePage = () => {
  const [user, setUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stage, setStage] = useState("home");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setStage("agent"); // 👈 move to agent selection
  };

  const showSidebar = ["home", "leaderboard"].includes(stage);

  // const handleBack = () => {
  //   if (stage === "negotiation") {
  //     const confirmLeave = confirm("Leave current game?");
  //     if (!confirmLeave) return;
  //   }

  //   if (stage === "negotiation" || stage === "leaderboard") {
  //     setStage("selection");
  //   }
  // };

  // const handleHome = () => {
  //   if (stage === "negotiation") {
  //     const confirmLeave = confirm("Leave current game?");
  //     if (!confirmLeave) return;
  //   }

  //   setStage("home");
  // };

useEffect(() => {
  getMe()
    .then((data) => {
      if (data.success) {
        setUser(data.user);
      }
    })
    .catch((err) => console.error(err));
}, []);
  if (!user) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full bg-[#0B0F0E] text-white flex flex-col">
      {/* NAVBAR */}
      <Navbar stage={stage} setStage={setStage} />

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        {showSidebar && <Sidebar stage={stage} setStage={setStage} />}

        <main className="flex-1 overflow-hidden px-0 py-0">
          {stage === "home" && (
            <div className="relative h-full w-full overflow-hidden">

  {/* 🌌 BACKGROUND */}
  <MidnightSky />

  {/* 🌟 CONTENT */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
              <h1 className="text-5xl font-bold text-white">
                Welcome, <span className="text-[#02C173]">{user.username}</span>
              </h1>

              <p className="mt-4 text-gray-400 text-lg">
                Negotiate smart. Get the best deal.
              </p>

              <div className="mt-10 flex justify-center gap-4">
                <button
                  onClick={() => setStage("selection")}
                  className="bg-[#02C173] px-8 py-3 rounded-xl text-black font-semibold hover:scale-105 transition"
                >
                  Start Game
                </button>

                <button
                  onClick={() => setStage("leaderboard")}
                  className="border border-gray-700 px-8 py-3 rounded-xl hover:bg-[#111] transition"
                >
                  Leaderboard
                </button>
              </div>

              {/* <button
                onClick={() => setStage("selection")}
                className="bg-[#02C173] text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-[0_10px_30px_rgba(2,193,115,0.5)]"
              >
                Start Game
              </button>

              <button
                onClick={() => setStage("leaderboard")}
                className="mt-4 border border-[#02C173]/30 px-8 py-3 rounded-xl hover:bg-[#02C173]/10 transition"
              >
                View Leaderboard
              </button> */}
              </div>
            </div>
          )}
          {/* 🟢 PRODUCT SELECTION */}
          {stage === "selection" && (
            <div className="max-w-6xl mx-auto h-full items-center flex flex-col justify-start">
              {/* TITLE */}
              <h1 className="text-4xl font-semibold text-center text-[#02C173] mb-6 mt-6 ">
                Select Product
              </h1>

              {/* CAROUSEL */}
              <div className="flex justify-center mr-6 mb-2">
                <SwipeDeck products={products} onChange={setActiveIndex} />
              </div>

              {/* PRODUCT INFO */}
              <ProductInfo
                product={products[activeIndex]}
                onSelect={handleSelect}
              />
            </div>
          )}

          {/* 🔵 NEGOTIATION */}
          {stage === "negotiation" && (
            <div className="w-full h-full flex justify-center">
              <ChatUI
                socket={socket}
                product={selectedProduct}
                agent={selectedAgent}
                onGameOver={() => setStage("leaderboard")}
                onRestart={() => setStage("selection")}
                onBack={() => setStage("selection")}
              />
            </div>
          )}

          {stage === "agent" && (
            <div className="flex flex-col items-center justify-center h-full bg-[#060707] text-white px-6">
              <h1 className="text-3xl font-bold mb-6 text-[#02C173]">
                Select Merchant
              </h1>

              <div className="grid gap-6 w-full max-w-xl">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-6 rounded-xl border cursor-pointer transition
          ${
            selectedAgent?.id === agent.id
              ? "border-[#02C173] bg-[#02C173]/10"
              : "border-gray-700 hover:border-[#02C173]/40 hover:bg-[#111]"
          }`}
                  >
                    <h2 className="font-semibold text-lg">{agent.name}</h2>

                    <p className="text-sm text-gray-400 mt-2">
                      {agent.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* START BUTTON */}
              <div className="mt-10 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setStage("selection");
                    }}
                    className="border border-gray-700 mt-8 px-8 py-3 text-[#02C173]  rounded-xl font-semibold hover:scale-105 transition "
                  >
                    Select Product
                  </button>
                <button
                  disabled={!selectedAgent}
                  onClick={() => {
                    socket.emit("start_game", {
                      productId: selectedProduct.id,
                      agent: selectedAgent, // ✅ full object
                      username: user.username,
                    });

                    setStage("negotiation");
                  }}
                  className="mt-8 px-8 py-3 bg-[#02C173] text-black rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50"
                >
                  Start Negotiation
                </button>
              </div>
            </div>
          )}

          {/* 🏆 LEADERBOARD */}
          {stage === "leaderboard" && (
            <Leaderboard user={user} onHome={() => setStage("home")} />
          )}
        </main>
      </div>
    </div>
  );
};

export default GamePage;
