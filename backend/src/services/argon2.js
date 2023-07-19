const argon2 = require("@node-rs/argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hash = async (password) => {
  const hashed = await argon2.hash(password, hashingOptions);
  return hashed;
};

const verify = async (hashPwd, password) => {
  const verifyPwd = await argon2.verify(hashPwd, password);
  return verifyPwd;
};

module.exports = {
  hash,
  verify,
};
