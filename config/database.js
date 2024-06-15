const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wazhwiz', 'root', '', { // Kosongkan string password
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false, // Nonaktifkan logging jika tidak diperlukan
  define: {
    timestamps: false, // Nonaktifkan otomatis timestamps jika tidak diperlukan
  },
});

module.exports = sequelize;
