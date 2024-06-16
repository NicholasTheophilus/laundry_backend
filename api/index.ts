// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const models = require('../models');
const laundriesRoutes = require('../routes/laundries');
const migrationsRoutes = require('../routes/migrations');
const ordersRoutes = require('../routes/orders');
const servicesRoutes = require('../routes/services');
const usersRoutes = require('../routes/users');

app.get("/", (_req: any, res: { send: (arg0: string) => any; }) => res.send("Express on Vercel"));

app.listen(process.env.PORT, () => console.log("Server ready on port 3000."));



app.use(express.json());

app.use('/api/laundries', laundriesRoutes);
app.use('/api/migrations', migrationsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/users', usersRoutes);

models.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
  });
}).catch((error) => {
  console.error('Unable to sync the database:', error);
});

module.exports = app;