// routes/leaderboard.routes.js
import { Router } from "express";
import { leaderboardModel } from "../models/leaderboard.model.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", async (req, res) => {
  const data = await leaderboardModel.find().sort({ finalPrice: 1 }); // lowest price first
  res.json(data);
});

export default leaderboardRouter;
