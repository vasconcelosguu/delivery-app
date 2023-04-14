const { loginService } = require('../services/LoginService');

 const loginController = async (req, res) => {
    console.log(req.body);
        const user = await loginService(req, res);
        if (!user) return res.status(404).json({ message: 'User or Password not found' });
        return res.status(200).json(user);
    };

module.exports = { loginController };