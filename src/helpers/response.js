/**
 * @param {Number} statusCode - status code of the response
 * @param {string} message - message identify the code
 * @param {{}} payload - response object
 * @param {Error} error - error message
 * @param {Token} token - jwt token
 * @returns {{}}
 */

const APIresponse = (statusCode, message, payload, errors) => {
  return {
    statusCode,
    message,
    payload,
    errors
  };
};

export default APIresponse;