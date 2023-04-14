const md5 = require('md5');
const { User } = require('../../database/models');

 const registerService = async (req, _res) => {
    const { email, password, name } = req.body;
    const encryptedPassword = md5(password);
    const user = {
        email,
        password: encryptedPassword,
        name,
        role: 'customer',
    };
    const newUser = await User.create({ ...user });
    
    await newUser.save();
    return newUser;
};
module.exports = { registerService };
