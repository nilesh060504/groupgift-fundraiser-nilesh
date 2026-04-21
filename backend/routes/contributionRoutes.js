const express = require("express");
const {
  createContribution,
  verifyContribution
} = require("../controllers/contributionController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { contributionValidator } = require("../utils/validators");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("screenshot"),
  contributionValidator,
  validationMiddleware,
  createContribution
);
router.patch("/:id/verify", authMiddleware, adminMiddleware, verifyContribution);

module.exports = router;
