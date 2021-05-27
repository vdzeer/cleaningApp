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
    try {
      const { email } = req.body;
      const code = Math.round(Math.random() * 99999);

      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .send(`Account with email ${email} is not registered!`);
      }

      const message = {
        to: email,
        subject: `Reset password`,
        html: `
          <h2>Your code: ${code}</h2>
        `,
      };
      mailer(message);

      res.json(code);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(req, res) {
    const { email, password } = req.body;

    const hashPswd = bcrypt.hashSync(password, 5);

    await User.updateOne(
      { email: email },
      {
        $set: {
          password: hashPswd,
        },
      },
    );

    res.json('Ok');
  }
}

module.exports = new AuthController();
