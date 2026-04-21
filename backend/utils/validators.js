const { body } = require("express-validator");
const { validateUpiId } = require("./upi");

const registerValidator = [
  body("name").trim().isLength({ min: 2, max: 80 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6, max: 64 })
];

const loginValidator = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6, max: 64 })
];

const createFundValidator = [
  body("title").trim().isLength({ min: 3, max: 140 }).withMessage("Title must be 3-140 characters"),
  body("description").trim().isLength({ min: 10, max: 1200 }).withMessage("Description must be 10-1200 characters"),
  body("targetAmount").isFloat({ gt: 0 }).withMessage("Target amount must be greater than 0"),
  body("expectedMembers").optional().isInt({ gt: 0 }).withMessage("Expected members must be a positive number"),
  body("groupName").optional().trim().isLength({ max: 140 }).withMessage("Group name is too long"),
  body("members").optional().isArray().withMessage("Members must be an array"),
  body("members.*.email").optional().isEmail().withMessage("Each member email must be valid"),
  body("members.*.name").optional().trim().isLength({ max: 80 }).withMessage("Member name is too long"),
  body("selectedContributorEmails").optional().isArray().withMessage("Selected contributors must be an array"),
  body("selectedContributorEmails.*").optional().isEmail().withMessage("Selected contributor email must be valid"),
  body("deadline").isISO8601().toDate().withMessage("Deadline must be a valid date"),
  body("upiId")
    .optional()
    .custom((value) => !value || validateUpiId(value))
    .withMessage("Invalid UPI ID format")
];

const contributionValidator = [
  body("fundId").isMongoId(),
  body("amount").isFloat({ gt: 0 }),
  body("transactionId").trim().isLength({ min: 6, max: 80 }),
  body("contributorName").optional().trim().isLength({ min: 2, max: 80 })
];

module.exports = {
  registerValidator,
  loginValidator,
  createFundValidator,
  contributionValidator
};
