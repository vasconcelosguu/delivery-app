const md5 = require('md5');
const verifyTokenAdmin = require('../middlewares/verifyTokenAdmin');
const { 
    usersGetService, userGetService, userGetById, registerAdminService, allUsersService,
 } = require('../services/UsersService');

const NOT_FOUND = 'User or Password not found';

const usersController = async (_req, res) => {
        const user = await usersGetService();
        if (!user) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(user);
    };

    const userGet = async (req, res) => {
        const { email } = req.body;
        console.log(req);
        const user = await userGetService(email);
        if (!user) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(user);
    };

    const userGetId = async (req, res) => {
      const { id } = req.body;
        console.log(req);
        const user = await userGetById(id);
        if (!user) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(user);
    };

    const registerAdminController = async (req, res) => {
        const token = req.headers.authorization;
      
        const verifyAdmin = await verifyTokenAdmin(token);
        if (verifyAdmin === false) { return res.status(401).json({ message: 'Unauthorized' }); }
        const encryptedPassword = md5(req.body.newUser.password);
        const user = {
          name: req.body.newUser.name,
          email: req.body.newUser.email,
          password: encryptedPassword,
          role: req.body.newUser.role,
        };
        console.log(user);
        const result = await registerAdminService(user);
        if (result === false) { return res.status(409).json({ message: 'User already exists' }); }
        return res.status(201).json(result);
      };

      const allUsersController = async (_req, res) => {
        const users = await allUsersService();
        if (!users) return res.status(404).json({ message: NOT_FOUND });
        return res.status(200).json(users);
      };

module.exports = { 
    usersController, userGet, userGetId, registerAdminController, allUsersController,
 };
