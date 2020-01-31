import jwt from 'jsonwebtoken';
import config from '../config';

const secret = config.env === 'production' ? config.jwtSecret : 'secret';

export const issue = payload => jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = (token, cb) => jwt.verify(token, secret, cb);