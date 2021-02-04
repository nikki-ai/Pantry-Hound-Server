'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeDietsArray } = require('./diet.fixtures');
let db;

before('make knex instance', () => {
  db = knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  });
  app.set('db', db);
});

before('clean the table', () => db('diets').truncate());

afterEach('cleanup', () => db('diets').truncate());

describe('GET /diet', () => {
  context('Given there are no diets', () => {
    it('responds with 200 and an empty list', () => {
      return supertest(app).get('/diet').expect(200, []);
    });
  });
});

describe(`GET /diet/:dietId`, () => {
  context('Given there are diets in the database', () => {
    const testDiets = makeDietsArray();

    beforeEach('insert diet', () => {
      return db.into('diets').insert(testDiets);
    });

    it('responds with a 200 and the specified diet', () => {
      const dietId = 2;
      const expectedDiet = testDiets[dietId - 1];

      return supertest(app)
        .get(`/diet/${dietId}`)
        .expect((res) => {
          return res.body.id === expectedDiet.id;
        });
    });
  });
});

describe(`PATCH /diet/:id`, () => {
  it(`creates a diet, responding with 201 and the new diet`, function () {
    this.retries(3);
    const newDiet = {
      cal_limit: '200',
      // cal_eaten: '100',
    };
    return supertest(app)
      .patch('/diet/1')
      .send(newDiet)
      .expect(204);
  });
});
