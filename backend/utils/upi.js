const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

const validateUpiId = (upiId) => UPI_REGEX.test(upiId);

const generateUpiLink = (upiId, amount, note) => {
  const encodedNote = encodeURIComponent(note || "Group contribution");
  return `upi://pay?pa=${upiId}&pn=GroupGift&am=${amount}&cu=INR&tn=${encodedNote}`;
};

module.exports = {
  validateUpiId,
  generateUpiLink
};
