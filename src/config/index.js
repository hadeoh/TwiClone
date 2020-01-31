import dotenv from 'dotenv';
import { Joi } from 'celebrate';

dotenv.config();

// define validation for all env variables
const envVarsSchema = Joi.object({
  HOST: Joi.string().default("localhost"),
  PORT: Joi.string().default("5000"),
  NODE_ENV: Joi.string()
    .valid("development", "production", "testing")
    .default("development"),
  MONGO_HOST: Joi.string()
    .required()
    .default("mongodb://localhost")
    .description("Database host name"),
  BCRYPT_ROUND: Joi.number()
    .required()
    .description("bcrypt password hash"),
  JWT_SECRET: Joi.string()
    .required()
    .description("JWT required to sign token"),
  MONGO_HOST_TEST: Joi.string()
    .required()
    .description("Test database host name"),
  MAIL_TRAP_HOST: Joi.string()
    .required()
    .description("Mail trap host name"),
  MAIL_TRAP_PORT: Joi.string()
    .required()
    .description("Mail trap port number"),
  MAIL_TRAP_USERNAME: Joi.string()
    .required()
    .description("Mail trap username"),
  MAIL_TRAP_PASSWORD: Joi.string()
    .required()
    .description("Mail trap password"),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  host: envVars.HOST,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: process.env.NODE_ENV === 'test' ? envVars.MONGO_HOST_TEST : envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
};

module.exports = config;