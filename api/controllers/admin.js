const jwt = require('jsonwebtoken');
const config = require('../services/config');

const User = require('../models/User');
const DryCleaning = require('../models/DryCleaning');
const Order = require('../models/Order');

class AdminController {
  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async updateOrder(req, res) {
    try {
      const { id, username, date, status, comment } = req.body;
      await Order.updateOne(
        { _id: id },
        {
          $set: {
            username: username,
            date: date,
            status: status,
            comment: comment,
          },
        },
      );
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async addCleaner(req, res) {
    try {
      const { name, description, services, photo } = req.body;
      await new DryCleaning({ name, description, services, photo }).save();
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async updateCleaner(req, res) {
    try {
      const { name, description, services, photo, id } = req.body;
      await DryCleaning.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            description: description,
            services: services,
            photo: photo,
          },
        },
      );
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async deleteCleaner(req, res) {
    try {
      const { id } = req.body;
      await DryCleaning.deleteOne({ _id: id });
      res.json('Ok');
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }

  async havePermission(req, res) {
    try {
      const { token } = req.body;
      const id = jwt.verify(token, config.getValue('secret'));
      const user = await User.findOne({ _id: id['0'] });

      user.roles.includes('ADMIN') ? res.json(true) : res.json(false);
    } catch (e) {
      res.status(400).json(`Error: ${e}`);
    }
  }
}

module.exports = new AdminController();
