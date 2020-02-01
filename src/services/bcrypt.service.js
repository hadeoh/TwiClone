import bcrypt from "bcryptjs";
import config from "../config";

export const hashPassword = user => {
  const hash = bcrypt.genSaltSync(config.bcryptSalt);
  return bcrypt.hash(user.password, hash);
};

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);