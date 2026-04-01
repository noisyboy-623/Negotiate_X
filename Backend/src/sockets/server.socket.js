import { Server, Socket } from "socket.io";
import { PRODUCTS } from "../config/product.js";
import {
  analyzeUserMessage,
  updatePrice,
  generateSellerPrompt,
} from "../services/negotiation.service.js";

import { v4 as uuidv4 } from "uuid";
import { generateResponse, generateIntro } from "../services/ai.service.js";
import { leaderboardModel } from "../models/leaderboard.model.js";

const gameSessions = {};
let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5500","https://negotiate-x-frontend.onrender.com"],
      credentials: true,
    },
  });

  console.log("Socket.io server is running!");

  io.on("connection", (socket) => {
    console.log("A user connected : " + socket.id);

    // ✅ start_game
    socket.on("start_game", (data) => {
      const { productId, agent, username } = data;

      const product = PRODUCTS.find((p) => p.id === productId);

      if (!product) return;

      gameSessions[socket.id] = {
        gameId: uuidv4(),
        // ✅ store it here
        product: product.name,
        username,
        currentPrice: product.basePrice,
        initialPrice: product.basePrice,
        hasStarted: false,
        minPrice: Math.floor(
          Math.random() * (product.minRange[1] - product.minRange[0]) +
            product.minRange[0],
        ),
        agent,
strategy: product.strategy,
        round: 1,
        maxRounds: 5,
      };

      

      socket.emit("game_started", gameSessions[socket.id]);
      setTimeout(() => {
  
        socket.emit("ai_intro", {
          message: generateIntro(product, agent),
          price: product.basePrice,
          product: product.name,
          agentType: agent.personality,
        });
}, 500);
      gameSessions[socket.id].hasStarted = true;
    });

    // ✅ negotiate
    socket.on("negotiate", async (userMessage) => {
      const game = gameSessions[socket.id];

      if (!game) {
        socket.emit("error", { message: "Game not started" });
        return;
      }

      if (!game.hasStarted) {
        socket.emit("error", {
          message: "Wait for AI to introduce the product",
        });
        return;
      }
      const intent = analyzeUserMessage(userMessage);

      // ❌ HANDLE IRRELEVANT INPUT FIRST
      if (intent === "irrelevant") {
        const responses = [
          "Please tell me your offer or budget so we can negotiate.",
          "Could you share your budget?",
          "Let’s talk numbers 😊",
          "What price are you expecting?",
        ];

        const aiResponse =
          responses[Math.floor(Math.random() * responses.length)];

        socket.emit("negotiation_update", {
          message: aiResponse,
          price: game.currentPrice,
          round: game.round,
        });

        return; // 🚨 VERY IMPORTANT
      }

      // ✅ NORMAL FLOW
      const newPrice = updatePrice(game, intent);
      game.currentPrice = newPrice;

      const prompt = generateSellerPrompt(game, userMessage, intent);
      
      let aiResponse = await generateResponse([
        
        {
          role: "user",
          content: prompt,
        },
      ]);
      game.round += 1;
      if (typeof aiResponse !== "string") {
  aiResponse = JSON.stringify(aiResponse);
}

      // Remove extra quotes
      aiResponse = aiResponse.replace(/^"+|"+$/g, "");

      // Replace any wrong price safely
      aiResponse = aiResponse.replace(/₹\s?\d[\d,]*/g, `₹${game.currentPrice}`);
      aiResponse = aiResponse.trim();
      setTimeout(async() => {
        socket.emit("negotiation_update", {
          message: aiResponse,
          price: newPrice,
          round: game.round,
        });
      }, 800);

      if (game.round >= game.maxRounds) {
        const score = game.initialPrice - game.currentPrice;

        await leaderboardModel.create({
          user: null,
          username: game.username,
          product: game.product,
          finalPrice: game.currentPrice,
          score,
        });

        socket.emit("game_over", {
          finalPrice: game.currentPrice,
          accepted: false,
        },400 );

        delete gameSessions[socket.id];
      }
    },800);

    socket.on("accept_deal", async () => {
      const game = gameSessions[socket.id];
      if (!game) return;

      // 🧠 calculate score
      const score = game.initialPrice - game.currentPrice;

      await leaderboardModel.create({
        user: null, // later add auth user
        username: game.username,
        product: game.product,
        finalPrice: game.currentPrice,
        score,
      });

      socket.emit("game_over", {
        finalPrice: game.currentPrice,
        accepted: true,
      });

      delete gameSessions[socket.id];
    });

    // ✅ cleanup (IMPORTANT)
    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
      delete gameSessions[socket.id];
    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}
