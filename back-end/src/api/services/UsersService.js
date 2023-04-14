const { User } = require('../../database/models');

const usersGetService = async () => {
    const allProducts = await User.findAll({ where: { role: 'seller' } });
    console.log(allProducts);
    return allProducts;
};

const userGetService = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

const userGetById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const allUsersService = async () => {
  const allUsers = await User.findAll();
  return allUsers;
};

const registerAdminService = async (user) => {
  const { name, email, password, role } = user;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return false;
  const result = await User.create({ name, email, password, role });
  return result;
};
module.exports = { 
  usersGetService, userGetService, userGetById, allUsersService, registerAdminService,
 };
