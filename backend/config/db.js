const mongoose = require("mongoose");

/**
 * Connects to MongoDB (local or Atlas).
 * Atlas: use mongodb+srv://... in MONGO_URI; enable Network Access (0.0.0.0/0 for dev, or your host IPs).
 */
const connectDB = async () => {
  const uri = (process.env.MONGO_URI || "").trim();
  if (!uri) {
    console.error("MONGO_URI is empty.");
    process.exit(1);
  }
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.error("MONGO_URI must start with mongodb:// or mongodb+srv://");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: false,
      serverSelectionTimeoutMS: 15_000,
      connectTimeoutMS: 15_000
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (uri.includes("mongodb.net")) {
      console.error(
        "Atlas checklist: correct password (URL-encode special chars), database user exists, Network Access allows your server IP (or 0.0.0.0/0 for testing)."
      );
    }
    process.exit(1);
  }

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB runtime error:", error.message);
  });
};

module.exports = connectDB;
