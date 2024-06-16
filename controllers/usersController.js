const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  getAllUsers: async () => {
    try {
      const users = await User.findAll();
      return { statusCode: 200, body: JSON.stringify(users) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  },

  getUserById: async (req) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        return { statusCode: 200, body: JSON.stringify(user) };
      } else {
        return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
      }
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  },

  createUser: async (req) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      return { statusCode: 201, body: JSON.stringify(user) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  },

  updateUser: async (req) => {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedUser = await User.findByPk(req.params.id);
        return { statusCode: 200, body: JSON.stringify(updatedUser) };
      } else {
        return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
      }
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  },

  deleteUser: async (req) => {
    try {
      const deleted = await User.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        return { statusCode: 204 };
      } else {
        return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
      }
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  },

  loginUser: async (req) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { statusCode: 401, body: JSON.stringify({ error: 'Invalid password' }) };
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

      return { statusCode: 200, body: JSON.stringify({ token }) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }
};
