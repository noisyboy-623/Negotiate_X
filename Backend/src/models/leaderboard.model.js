import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    username: String,

    product: String,

    finalPrice: Number,

    score: Number, // lower price = higher score

  },
  { timestamps: true }
);

export const leaderboardModel = mongoose.model(
  "leaderboard",
  leaderboardSchema
);