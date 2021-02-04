'use strict';

const path = require('path');
const express = require('express');
const xss = require('xss');
const DietsService = require('./user-diet-service');

const dRouter = express.Router();
const jsonParser = express.json();

const dietFormat = (diet) => ({
  id: diet.id,
  cal_limit: xss(diet.cal_limit),
  cal_eaten: diet.cal_eaten,
});

dRouter
  .route('/')
  .get((req, res, next) => {
    DietsService.getCalLimit(req.app.get('db'))
      .then((diet) => {
        res.json(diet.map(dietFormat));
      })
      .catch(next);
  }); 
dRouter
  .route('/:id')
  .patch(jsonParser, (req, res, next) => {
    const { cal_limit, cal_eaten } = req.body;
    const newDiet = { cal_limit, cal_eaten };

    for (const [key, value] of Object.entries(newDiet)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `New entry must contain '${key}'.` },
        });
      }
    }
    DietsService.updateDiet(req.app.get('db'), req.params.id, newDiet)
      .then((numRowsAffected) => {
        res
          .status(204)
          .end();
      })
      .catch(next);
  });
module.exports = dRouter;

// fetchMyFood(knex, cal) {
//   //should return a list of foods the user can eat that have
//   //a cal count that is < remainingCalLimit calculated above
//   return knex.from('pantry').select('*').where('cal' < remainingCal);
// },
