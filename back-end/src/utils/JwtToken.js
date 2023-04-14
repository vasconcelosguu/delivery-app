const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('./jwt.evaluation.key');

const createToken = (user) => {
  const { email, role, name } = user;
  const token = jwt.sign(
    {
      name,
      email,
      role,
    },
    SECRET,
    {
      expiresIn: '12h',
    },
  );

  return token;
};

const addToken = (req, res, next) => {
  const token = createToken(req.body);
  req.headers.authorization = token;
  next();
};

module.exports = { createToken, addToken };