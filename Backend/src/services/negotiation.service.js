// 🧠 Analyze user intent

export const analyzeUserMessage = (msg) => {
  msg = msg.toLowerCase();

  // ❌ irrelevant / random messages
  const irrelevantKeywords = ["hello", "hi", "ok", "hmm", "test", "random"];
  if (irrelevantKeywords.some((word) => msg.includes(word))) {
    return "irrelevant";
  }
  
  if (/\d+/.test(msg)) return "offer";
  if (
    msg.includes("student") ||
    msg.includes("budget") ||
    msg.includes("afford")
  )
    return "emotional";

  if (
    msg.includes("cheaper") ||
    msg.includes("other") ||
    msg.includes("elsewhere")
  )
    return "competitive";

  if (
    msg.includes("final") ||
    msg.includes("last") ||
    msg.includes("best price")
  )
    return "pressure";
  // ✅ detect numeric offer
  return "neutral";
};

// 💰 Update price based on strategy + intent
export const updatePrice = (game, intent) => {
  if (intent === "irrelevant" || intent === "neutral") {
    return game.currentPrice; // ❌ no price change
  }
  let reduction = 0;

  // 🧠 BASED ON AGENT PERSONALITY
  switch (game.strategy) {
    case "friendly":
      reduction = Math.floor(game.currentPrice * 0.03); // 3%
      break;

    case "balanced":
      reduction = Math.floor(game.currentPrice * 0.02); // 2%
      break;

    case "greedy":
      reduction = Math.floor(game.currentPrice * 0.01); // 1  %
      break;

    default:
      reduction = 800;
  }

  // 🧠 USER INTENT EFFECT
  if (intent === "emotional") {
    reduction += game.strategy === "friendly" ? 1000 : 200;
  }

  if (intent === "pressure") {
    reduction += game.strategy === "greedy" ? 100 : 500;
  }

  if (intent === "competitive") {
    reduction += game.strategy === "balanced" ? 700 : 300;
  }

  // 🧠 RANDOMNESS (makes it feel real)
  const randomFactor = Math.floor(Math.random() * 300);
  reduction += randomFactor;

  // 🧠 FINAL PRICE
  let newPrice = game.currentPrice - reduction;

  return Math.max(newPrice, game.minPrice);
};

export const extractUserOffer = (msg) => {
  const match = msg.match(/\d+/);
  return match ? parseInt(match[0]) : null;
};

// 🤖 Generate controlled seller prompt
export const generateSellerPrompt = (game, userMessage, intent) => {
  const personalityText =
    game.strategy === "friendly"
      ? "You are friendly, warm, and willing to give good discounts."
      : game.strategy === "greedy"
        ? "You are stubborn, profit-driven, and resist lowering prices."
        : "You are professional, logical, and fair in negotiation.";  

  return `
You are a seller negotiating a product.

Product: ${game.product}
Current price: ₹${game.currentPrice}

Personality:
${personalityText}

Rules:
- Never end the conversation early
- Always continue negotiating until the final round
- You have a hidden minimum price but NEVER reveal it
- You must ALWAYS use the updated current price ₹${game.currentPrice}
- Do not invent random prices, only use the provided current price
- Always include ₹${game.currentPrice} exactly
- Keep response short (1-2 lines)
- Do not say 'no negotiation' unless it is the final round
- Each round, slightly adjust your tone based on negotiation progress
- Do not end the conversation or say goodbye unless the game is over
- Avoid repeating the same phrases every round  
- If user gives a price close to your current price, you may accept the deal.

${
  game.round === game.maxRounds - 1
    ? "This is your final offer. Clearly state that you cannot reduce further and this is the last price."
    : ""
}

${
  intent === "emotional"
    ? "Show slight empathy and consider small discount."
    : intent === "pressure"
    ? "Be firm but slightly flexible."
    : intent === "competitive"
    ? "Defend your price but consider negotiation."
    : ""
}

User said: "${userMessage}"

Respond naturally like a real human seller and include the current offer ₹${game.currentPrice}.
`;
};
