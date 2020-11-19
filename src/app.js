require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const emailRouter = require('./email/emailRouter');
const mealRouter = require('./meal/mealRouter');
const {
  NODE_ENV,
  CLIENT_ORIGIN,
} = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'dev';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors({
  // origin: CLIENT_ORIGIN || 'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/register', emailRouter);
app.use('/api/meal', mealRouter);
// DELETE BOILERPLATE RESPONSE BELOW
app.get('/', (req, res) => {
  res.send('Hello, boilerplate!');
});

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
