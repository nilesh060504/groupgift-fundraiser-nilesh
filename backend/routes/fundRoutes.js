const express = require("express");
const {
  createFund,
  getFunds,
  getFundById,
  deleteFund,
  getFundContributions,
  getFundActivities,
  sendPaymentLinkEmail,
  sendGroupPaymentInvites
} = require("../controllers/fundController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { createFundValidator } = require("../utils/validators");

const router = express.Router();

router.get("/", getFunds);
router.post("/", authMiddleware, createFundValidator, validationMiddleware, createFund);
router.get("/:id", getFundById);
router.delete("/:id", authMiddleware, deleteFund);
router.get("/:id/contributions", getFundContributions);
router.get("/:id/activities", getFundActivities);
router.post("/:id/send-payment-email", authMiddleware, sendPaymentLinkEmail);
router.post("/:id/send-group-invites", authMiddleware, sendGroupPaymentInvites);

module.exports = router;
