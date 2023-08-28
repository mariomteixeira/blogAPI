const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { status, data } = await userService.login(email, password);

  if (status === 'UNAUTHENTICATED') {
    return res.status(400).json(data);
  }

  res.status(200).json(data);
};

const create = async (req, res) => {
  const { status, data } = await userService.create(req.body);
  if (status === 'CONFLICT') res.status(409).json(data);
  if (status === 'SUCCESS') res.status(201).json(data);
};

module.exports = {
  login,
  create,
};
