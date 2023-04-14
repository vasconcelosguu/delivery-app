const md5 = require('md5');
const { User } = require('../../database/models');
const { createToken } = require('../../utils/JwtToken');

 const loginService = async (req, _res) => {
    const { email, password } = req.body;
    const encryptedPassword = md5(password);
        const user = await User.findOne({ where: { email, password: encryptedPassword } });
        if (!user) return null;
        console.log('tokenBefore');
        const token = createToken(user);
        const { name, role, id } = user;
        return { id, name, email, role, token };
    };
module.exports = { loginService };
