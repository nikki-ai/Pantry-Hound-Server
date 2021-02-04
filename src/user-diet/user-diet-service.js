'use strict';

const UserDietsService = {
  getCalLimit(knex) {
    return knex.select('*').from('diets');
  },
  // addCalLimit(knex, newDiet) {
  //   return knex('diets')
  //     .insert (newDiet)
  //     .returning('*')
  //     .then((rows) => {
  //       return rows[0];
  //     });
  // },

  updateDiet(knex, diets_id, newDietInfo) {
    return knex('diets').where({id: diets_id}).update(newDietInfo);
  },

  // calEaten() {
  //   // cal eaten + pantry.cal
  // },
  // remainingCalLimit(cal_eaten, cal_limit) {
  //   //get cal_eaten and cal limit
    
  //   return knex('pantry')cal_limit - cal_eaten;
  // }
};

module.exports = UserDietsService;
