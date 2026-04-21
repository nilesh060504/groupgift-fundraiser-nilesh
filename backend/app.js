const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/authRoutes");
const fundRoutes = require("./routes/fundRoutes");
const contributionRoutes = require("./routes/contributionRoutes");
const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(rateLimiter);

app.use("/uploads", express.static(uploadsDir));
app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/contributions", contributionRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend connected successfully"
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: { status: "ok" },
    message: "Backend is healthy"
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    data: {},
    message: "Route not found"
  });
});

app.use(errorHandler);

module.exports = app;
