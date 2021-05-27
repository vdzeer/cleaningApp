const jwt = require('jsonwebtoken');
const config = require('../services/config');

const DryCleaning = require('../models/DryCleaning');
const Order = require('../models/Order');
const User = require('../models/User');

class UserController {
  async getCleaners(req, res) {
    try {
      const cleaners = await DryCleaning.find();
      res.json(cleaners);
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async getOneCleaner(req, res) {
    try {
      const { id } = req.body;
      const cleaner = await DryCleaning.findOne({ _id: id });
      res.json(cleaner);
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async getOrders(req, res) {
    try {
      const { token } = req.body;
      const id = jwt.verify(token, config.getValue('secret'));
      const user = await User.findOne({ _id: id['0'] });
      const myOrders = await Order.find({ username: user.username }, {});

      res.json(myOrders);
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }
  async addOrder(req, res) {
    try {
      const { token, order } = req.body;
      const date = new Date();
      const id = jwt.verify(token, config.getValue('secret'));
      const user = await User.findOne({ _id: id['0'] });

      await new Order({
        username: user.username,
        date: date,
        services: order,
      }).save();
      res.json('Ok');
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }
  async deleteOrder(req, res) {
    try {
      const { id } = req.body;
      await Order.deleteOne({ _id: id });
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }
}

module.exports = new UserController();
