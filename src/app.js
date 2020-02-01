/**
 * third party libraries
 */
import '@babel/polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

/**
 * server configuration
 */
import config from './config';
import routes from './routes';
import * as error from './config/error';

/**
 * express application
 */
const app = express();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());

// parsing the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable detailed API logging in dev env
if (config.env === 'development') {
  app.use(logger('dev'));
}

// mount all routes on root /api/v1 path
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
