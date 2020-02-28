const express = require('express');
const initialMealQuery = require('./initialMealQuery');

const mealRouter = express.Router();

mealRouter.get('/', (req, res) => {
  res.send(initialMealQuery);
});

module.exports = mealRouter;
