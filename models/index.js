const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Mengimpor sequelize dari database.js

const models = {
  Laundry: require('./laundries')(sequelize, DataTypes),
  Migration: require('./migrations')(sequelize, DataTypes),
  Order: require('./orders')(sequelize, DataTypes),
  Service: require('./services')(sequelize, DataTypes),
  User: require('./users')(sequelize, DataTypes)
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
