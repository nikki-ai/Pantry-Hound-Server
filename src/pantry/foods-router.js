'use strict';

const path = require('path');
const express = require('express');
const xss = require('xss');
const FoodsService = require('./foods-service');

const fRouter = express.Router();
const jsonParser = express.json();

const foodFormat = (food) => ({
  id: food.id,
  title: xss(food.title),
  cal: xss(food.cal),
});

fRouter
  .route('/')
  .get((req, res, next) => {
    FoodsService.getAllFood(req.app.get('db'))
      .then((food) => {
        res.json(food.map(foodFormat));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, cal } = req.body;
    const newFood = { title, cal };

    for (const [key, value] of Object.entries(newFood)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `New entry must contain '${key}'.` },
        });
      }
    }
    FoodsService.addFood(req.app.get('db'), newFood)
      .then((food) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${food.id}`))
          .json(foodFormat(food));
      })
      .catch(next);
  });
fRouter.route('/:foodId').all((req, res, next) => {
  FoodsService.getFoodById(req.app.get('db'), req.params.foodId)
    .then((food) => {
      if (!food) {
        return res.status(404).json({
          error: { message: `Food doesn't exist` },
        });
      }
      res.food = food;
      next();
    })
    .catch(next);
})
  .get((req, res, next) => {
    res.json(foodFormat(res.food));
  })
  .delete((req, res, next) => {
    FoodsService.deleteFood(req.app.get('db'), req.params.foodId)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });
// fRouter.route('/fetchMyFood').all((req, res, next) => {
//   FoodsService.getByCal(req.app.get('db'), req.params.fetchMyFood);
// });

module.exports = fRouter;
