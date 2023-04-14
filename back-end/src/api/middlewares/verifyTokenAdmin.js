const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('./jwt.evaluation.key');

const verifyTokenAdmin = (token) => {
    const decoded = jwt.verify(token, SECRET);
    return decoded.role === 'administrator';
};

module.exports = verifyTokenAdmin;