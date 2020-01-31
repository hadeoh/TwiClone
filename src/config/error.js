import httpStatus from 'http-status';
import { isCelebrate } from 'celebrate';
import config from './index';

import APIError from '../helpers/APIError';

import JoiErrorFormatter from '../helpers/JoiErrorFormatter';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (err, _req, res, _next) => {
  const response = {
    statusCode: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    payload: null,
    stack: err.stack
  };
  if (config.env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (err, req, res, _next) => {
  let convertedError = err;
  if (isCelebrate(err)) {
    convertedError = new APIError({
      message: 'Invalid fields',
      status: httpStatus.BAD_REQUEST, //unprocessible entity
      errors: JoiErrorFormatter(err.joi.details) || {},
      payload: {}
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }

  return handler(convertedError, req, res);
};

/**
 *
 * @param {Error} err
 * @param {} req
 * @param {*} res
 */
export const errorHandler = (err, req, res, next) => {
  if (err) {
    const tokenError = new APIError('Unauthorized', err.status, true);
    next(tokenError);
  }
  next();
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req, res) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res);
};
