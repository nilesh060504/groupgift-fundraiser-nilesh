const Contribution = require("../models/Contribution");
const Fund = require("../models/Fund");
const Activity = require("../models/Activity");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const { sendPaymentReceiptEmail } = require("../services/mailService");

const createContribution = asyncHandler(async (req, res) => {
  const { fundId, amount, transactionId, contributorName } = req.body;
  const screenshotUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const fund = await Fund.findById(fundId);
  if (!fund) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Fund not found"
    });
  }

  const duplicate = await Contribution.findOne({ transactionId });
  if (duplicate) {
    return res.status(409).json({
      success: false,
      data: {},
      message: "Duplicate transaction ID"
    });
  }

  const contribution = await Contribution.create({
    fundId,
    userId: req.user._id,
    contributorName: contributorName || req.user.name || "Anonymous",
    amount,
    transactionId,
    paymentStatus: "verified",
    screenshotUrl
  });

  fund.currentAmount += Number(amount);
  if (fund.currentAmount >= fund.targetAmount) {
    fund.isCompleted = true;
  }
  await fund.save();

  await Activity.create({
    fundId,
    message: `${contribution.contributorName} completed payment of INR ${Number(amount).toFixed(2)}`
  });

  if (req.user?.email) {
    await sendPaymentReceiptEmail({
      to: req.user.email,
      fundTitle: fund.title,
      amount: Number(amount).toFixed(2),
      transactionId
    });
  }

  return res.status(201).json({
    success: true,
    data: contribution,
    message: "Contribution submitted and receipt emailed"
  });
});

const verifyContribution = asyncHandler(async (req, res) => {
  const contribution = await Contribution.findById(req.params.id);
  if (!contribution) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Contribution not found"
    });
  }

  if (contribution.paymentStatus === "verified") {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Contribution already verified"
    });
  }

  contribution.paymentStatus = "verified";
  await contribution.save();

  const fund = await Fund.findById(contribution.fundId);
  fund.currentAmount += contribution.amount;
  if (fund.currentAmount >= fund.targetAmount) {
    fund.isCompleted = true;
  }
  await fund.save();

  await Activity.create({
    fundId: fund._id,
    message: `Payment verified for INR ${contribution.amount.toFixed(2)}`
  });

  const payer = await User.findById(contribution.userId).select("email name");
  if (payer?.email) {
    await sendPaymentReceiptEmail({
      to: payer.email,
      fundTitle: fund.title,
      amount: contribution.amount.toFixed(2),
      transactionId: contribution.transactionId
    });
  }

  return res.status(200).json({
    success: true,
    data: { contribution, fund },
    message: "Contribution verified successfully"
  });
});

module.exports = {
  createContribution,
  verifyContribution
};
