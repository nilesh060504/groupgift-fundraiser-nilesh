const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    fundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fund",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    contributorName: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "Anonymous"
    },
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending"
    },
    screenshotUrl: {
      type: String,
      default: null
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

contributionSchema.index({ fundId: 1, createdAt: -1 });
contributionSchema.index({ transactionId: 1 }, { unique: true });

module.exports = mongoose.model("Contribution", contributionSchema);
