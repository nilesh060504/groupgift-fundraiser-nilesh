const apiResponse = ({ success = true, data = {}, message = "" }) => ({
  success,
  data,
  message
});

module.exports = apiResponse;
