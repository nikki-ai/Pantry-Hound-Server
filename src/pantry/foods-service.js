'use strict';

const FoodsService = {
  getAllFood(knex) {
    return knex.select('*').from('foods');
  },
  addFood(knex, newFood) {
    return knex('foods')
      .insert(newFood)
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  getFoodById(knex, id) {
    return knex.from('foods').select('*').where('id', id).first();
  },
  deleteFood(knex, id) {
    return knex('foods').where({ id }).delete();
  },
  updateFood(knex, id, newFoodInfo) {
    return knex('foods').where({ id }).update(newFoodInfo);
  },
};

module.exports = FoodsService;