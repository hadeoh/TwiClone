/**
 * Returns a custom error object with descriptive messages.
 * @property {Array} arr - Array of Joi validation errors.
 * @returns {Object}
 */
const customErrorMessage = errors => {
  return errors.reduce((errMessage, { path, message }) => {
    let [key] = path;
    if (!errMessage[key]) {
      errMessage[key] = message.replace(/["']/g, "");
    }
    return errMessage;
  }, {});
};

export default customErrorMessage;