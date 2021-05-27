const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cfg = require('./services/config');
const PORT = cfg.getValue('PORT', 5000);

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://vdzeer:88283920@cluster0.4gsvm.mongodb.net/cleaners',
    );
    app.listen(PORT, () => console.log(`Listening on ${PORT}!`));
  } catch (e) {
    console.log(e);
  }
};

start();
