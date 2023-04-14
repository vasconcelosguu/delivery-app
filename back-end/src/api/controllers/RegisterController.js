const { registerService } = require('../services/RegisterService');
const validateInputRegister = require('../middlewares/validateInputRegister');

 const registerController = async (req, res) => {
        const isValid = await validateInputRegister(req.body);
        if (!isValid) return res.status(409).json({ message: 'User or email alredy registered' });
        const user = await registerService(req, res);
        console.log(user);
        return res.status(201).json({ message: 'User has been created' });
    };

module.exports = { registerController };