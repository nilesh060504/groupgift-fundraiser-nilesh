const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1200
    },
    groupName: {
      type: String,
      trim: true,
      maxlength: 140,
      default: ""
    },
    members: {
      type: [
        {
          name: { type: String, trim: true, maxlength: 80, default: "" },
          email: { type: String, trim: true, lowercase: true, required: true }
        }
      ],
      default: []
    },
    selectedContributorEmails: {
      type: [String],
      default: []
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1
    },
    expectedMembers: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    deadline: {
      type: Date,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    upiId: {
      type: String,
      required: true,
      trim: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

fundSchema.index({ title: "text", description: "text" });
fundSchema.index({ createdBy: 1, createdAt: -1 });

module.exports = mongoose.model("Fund", fundSchema);
