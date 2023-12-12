const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const helmet = require("helmet");

dotenv.config();

mongoose.connect('mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tizegt4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority',
{useNewUrlParser : true,
useUnifiedTopology: true})
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=> console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use(helmet({crossOriginResourcePolicy: false}));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;