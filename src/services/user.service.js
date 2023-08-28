const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => jwt.sign(
    {
      sub: user.id,
      name: user.displayName,
      email: user.email,
      role: 'user',
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    },
  );

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  return user && user.password === password ? user : null;
};

const login = async (email, password) => {
  const user = await authenticateUser(email, password);

  if (!user) {
    return { status: 'UNAUTHENTICATED', data: { message: 'Invalid fields' } };
  }

  const token = generateToken(user);

  return {
    status: 'SUCCESS',
    data: { token },
  };
};

module.exports = {
  login,
};