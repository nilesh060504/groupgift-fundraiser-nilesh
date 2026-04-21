const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    fundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fund",
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

activitySchema.index({ fundId: 1, createdAt: -1 });

module.exports = mongoose.model("Activity", activitySchema);
