const { User } = require('../../database/models');

const validateInputRegister = async (req) => {
    const { email, name } = req;

    const emailUsed = await User.findOne({ where: { email } });
    const nameUsed = await User.findOne({ where: { name } });
    const result = (emailUsed === null && nameUsed === null);
    return result;
};

module.exports = validateInputRegister;