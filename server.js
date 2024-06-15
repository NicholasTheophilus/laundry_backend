const express = require('express');
const app = express();
const models = require('./models');
const laundriesRoutes = require('./routes/laundries');
const migrationsRoutes = require('./routes/migrations');
const ordersRoutes = require('./routes/orders');
const servicesRoutes = require('./routes/services');
const usersRoutes = require('./routes/users');

app.use(express.json());

app.use('/laundries', laundriesRoutes);
app.use('/migrations', migrationsRoutes);
app.use('/orders', ordersRoutes);
app.use('/services', servicesRoutes);
app.use('/users', usersRoutes);

models.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Unable to sync the database:', error);
});
