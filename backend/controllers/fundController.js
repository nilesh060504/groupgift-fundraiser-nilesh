const Fund = require("../models/Fund");
const Contribution = require("../models/Contribution");
const Activity = require("../models/Activity");
const asyncHandler = require("../middleware/asyncHandler");
const { validateUpiId, generateUpiLink } = require("../utils/upi");
const { generateQrCodeDataUrl } = require("../services/qrService");
const { sendPaymentEmail } = require("../services/mailService");

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const getShareAmount = (fund) => {
  const members = Math.max(Number(fund.expectedMembers || 1), 1);
  return Number((Number(fund.targetAmount) / members).toFixed(2));
};

const createFund = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    targetAmount,
    expectedMembers,
    deadline,
    upiId,
    groupName = "",
    members = [],
    selectedContributorEmails = []
  } = req.body;
  const chosenUpiId = upiId || process.env.DEFAULT_UPI_ID;

  if (!validateUpiId(chosenUpiId)) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Invalid UPI ID format"
    });
  }

  const normalizedMembers = Array.isArray(members)
    ? members
      .map((member) => ({
        name: (member?.name || "").trim(),
        email: normalizeEmail(member?.email || "")
      }))
      .filter((member) => member.email)
    : [];
  const dedupedMembers = Array.from(
    new Map(normalizedMembers.map((member) => [member.email, member])).values()
  );
  const memberEmailsSet = new Set(dedupedMembers.map((member) => member.email));
  const normalizedSelected = Array.isArray(selectedContributorEmails)
    ? selectedContributorEmails.map(normalizeEmail).filter((email) => email && memberEmailsSet.has(email))
    : [];
  const selectedUnique = Array.from(new Set(normalizedSelected));
  const fallbackMemberCount = dedupedMembers.length || 1;
  const resolvedMembers = Number(expectedMembers) > 0 ? Number(expectedMembers) : fallbackMemberCount;

  const fund = await Fund.create({
    title,
    description,
    groupName,
    members: dedupedMembers,
    selectedContributorEmails: selectedUnique,
    targetAmount,
    expectedMembers: resolvedMembers,
    deadline,
    createdBy: req.user._id,
    upiId: chosenUpiId
  });

  await Activity.create({
    fundId: fund._id,
    message: `${req.user.name} created the fund`
  });

  return res.status(201).json({
    success: true,
    data: fund,
    message: "Fund created successfully"
  });
});

const getFunds = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 10), 1), 50);
  const search = (req.query.search || "").trim();

  const query = search
    ? { $text: { $search: search } }
    : {};

  const [items, total] = await Promise.all([
    Fund.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Fund.countDocuments(query)
  ]);

  const fundIds = items.map((item) => item._id);
  const contributionStats = await Contribution.aggregate([
    { $match: { fundId: { $in: fundIds }, paymentStatus: "verified" } },
    { $group: { _id: "$fundId", count: { $sum: 1 } } }
  ]);
  const contributorsByFundId = new Map(
    contributionStats.map((entry) => [entry._id.toString(), entry.count])
  );

  const data = items.map((fund) => {
    const progress = Math.min(Math.round((fund.currentAmount / fund.targetAmount) * 100), 100);
    const shareAmount = getShareAmount(fund);
    return {
      ...fund.toObject(),
      progress,
      shareAmount,
      invitedMembers: fund.members || [],
      selectedContributorEmails: fund.selectedContributorEmails || [],
      contributors: contributorsByFundId.get(fund._id.toString()) || 0
    };
  });

  return res.status(200).json({
    success: true,
    data: {
      items: data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    },
    message: "Funds fetched successfully"
  });
});

const getFundById = asyncHandler(async (req, res) => {
  const fund = await Fund.findById(req.params.id).populate("createdBy", "name email");
  if (!fund) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Fund not found"
    });
  }

  const progress = Math.min(Math.round((fund.currentAmount / fund.targetAmount) * 100), 100);
  const contributors = await Contribution.countDocuments({
    fundId: fund._id,
    paymentStatus: "verified"
  });
  const upiLink = generateUpiLink(fund.upiId, fund.targetAmount - fund.currentAmount, fund.title);
  const shareAmount = getShareAmount(fund);
  const shareUpiLink = generateUpiLink(fund.upiId, shareAmount, `${fund.title} - member share`);
  const phonePeLink = shareUpiLink.replace(/^upi:\/\//, "phonepe://");
  const qrCode = await generateQrCodeDataUrl(upiLink);

  return res.status(200).json({
    success: true,
    data: {
      ...fund.toObject(),
      progress,
      contributors,
      shareAmount,
      invitedMembers: fund.members || [],
      selectedContributorEmails: fund.selectedContributorEmails || [],
      phonePeLink,
      shareUpiLink,
      upiLink,
      qrCode
    },
    message: "Fund details fetched successfully"
  });
});

const deleteFund = asyncHandler(async (req, res) => {
  const fund = await Fund.findById(req.params.id);
  if (!fund) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Fund not found"
    });
  }

  if (fund.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      data: {},
      message: "Only the fund creator can delete this fund"
    });
  }

  await Promise.all([
    fund.deleteOne(),
    Contribution.deleteMany({ fundId: fund._id }),
    Activity.deleteMany({ fundId: fund._id })
  ]);

  return res.status(200).json({
    success: true,
    data: {},
    message: "Fund deleted successfully"
  });
});

const getFundContributions = asyncHandler(async (req, res) => {
  const contributions = await Contribution.find({ fundId: req.params.id })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: contributions,
    message: "Fund contributions fetched successfully"
  });
});

const getFundActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ fundId: req.params.id }).sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    data: activities,
    message: "Fund activities fetched successfully"
  });
});

const sendPaymentLinkEmail = asyncHandler(async (req, res) => {
  const fund = await Fund.findById(req.params.id);
  if (!fund) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Fund not found"
    });
  }

  const shareAmount = getShareAmount(fund);
  const upiLink = generateUpiLink(fund.upiId, shareAmount, `${fund.title} - member share`);
  const phonePeLink = upiLink.replace(/^upi:\/\//, "phonepe://");

  await sendPaymentEmail({
    to: req.user.email,
    fundTitle: fund.title,
    amount: shareAmount.toFixed(2),
    phonePeLink,
    upiLink
  });

  await Activity.create({
    fundId: fund._id,
    message: `${req.user.name} requested payment link email for INR ${shareAmount.toFixed(2)}`
  });

  return res.status(200).json({
    success: true,
    data: {
      email: req.user.email,
      shareAmount,
      phonePeLink,
      upiLink
    },
    message: "Payment link emailed successfully"
  });
});

const sendGroupPaymentInvites = asyncHandler(async (req, res) => {
  const fund = await Fund.findById(req.params.id);
  if (!fund) {
    return res.status(404).json({
      success: false,
      data: {},
      message: "Fund not found"
    });
  }

  if (fund.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      data: {},
      message: "Only fund creator can send member payment links"
    });
  }

  const shareAmount = getShareAmount(fund);
  const selected = (fund.selectedContributorEmails || []).map(normalizeEmail).filter(Boolean);
  const members = (fund.members || []).filter((m) => selected.includes(normalizeEmail(m.email)));

  if (!members.length) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "No selected members found for this fund"
    });
  }

  const sentTo = [];
  for (const member of members) {
    const upiLink = generateUpiLink(fund.upiId, shareAmount, `${fund.title} - member share`);
    const phonePeLink = upiLink.replace(/^upi:\/\//, "phonepe://");
    await sendPaymentEmail({
      to: member.email,
      fundTitle: fund.title,
      amount: shareAmount.toFixed(2),
      phonePeLink,
      upiLink
    });
    sentTo.push(member.email);
  }

  await Activity.create({
    fundId: fund._id,
    message: `${req.user.name} sent payment links to ${sentTo.length} selected member(s)`
  });

  return res.status(200).json({
    success: true,
    data: { sentTo, shareAmount },
    message: "Payment links sent to selected members"
  });
});

module.exports = {
  createFund,
  getFunds,
  getFundById,
  deleteFund,
  getFundContributions,
  getFundActivities,
  sendPaymentLinkEmail,
  sendGroupPaymentInvites
};
