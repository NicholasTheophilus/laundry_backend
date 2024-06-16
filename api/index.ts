require('dotenv').config();
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const models = require('../models');
const laundriesRoutes = require('../routes/laundries');
const migrationsRoutes = require('../routes/migrations');
const ordersRoutes = require('../routes/orders');
const servicesRoutes = require('../routes/services');
const usersRoutes = require('../routes/users');

// Middleware untuk mengurai body JSON dari permintaan
app.use(express.json());

app.get("/", (_req: any, res: { send: (arg0: string) => any; }) => res.send("Express on Vercel"));

// Gunakan rute yang telah ditentukan
app.use('/api/laundries', laundriesRoutes);
app.use('/api/migrations', migrationsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/users', usersRoutes);

// Sinkronisasi model Sequelize
models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server berjalan di port 3000.');
  });
}).catch((error) => {
  console.error('Tidak dapat menyinkronkan basis data:', error);
});

module.exports = app;
