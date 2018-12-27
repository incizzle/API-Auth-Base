const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var compression = require('compression')
const config = require('./config.json')

const userRoutes = require('./api/routes/user');
const adminRouter = require('./api/routes/admin')

mongoose.connect(config.mongodb, { useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/user', userRoutes);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        code: error.status,
        message: error.message
      }
    });
  });


module.exports = app;