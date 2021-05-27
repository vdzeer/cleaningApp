const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../services/config');
const mailer = require('../services/nodemailer');

const User = require('../models/User');

const createToken = (...data) => {
  const payload = { ...data };
  return jwt.sign(payload, config.getValue('secret'), { expiresIn: '24h' });
};

class AuthController {
  async register(req, res) {
    const { email, username, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).send('Account with this email is registered!');
    }

    const hashPswd = bcrypt.hashSync(password, 5);
    await new User({
      email: email,
      username: username,
      password: hashPswd,
      roles: 'USER',
    }).save();

    const registeredUser = await User.findOne({ email: email });
    const token = createToken(registeredUser._id);
    res.json(token);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send(`Account with email ${email} is not registered!`);
    }

    const validPswd = bcrypt.compareSync(password, user.password);

    if (!validPswd) {
      return res.status(400).send('Incorrect password!');
    }

    const token = createToken(user._id);
    res.json(token);
  }

  async reset(req, res) {
    const { email } = req.body;

    // допил

    const user = await User.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .send(`Account with email ${email} is not registered!`);
    }
  }
}

module.exports = new AuthController();
