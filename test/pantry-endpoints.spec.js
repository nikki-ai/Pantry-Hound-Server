'use strict';

const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeFoodsArray } = require('./pantry.fixtures');
let db;

before('make knex instance', () => {
  db = knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  });
  app.set('db', db);
});

before('clean the table', () => db('foods').truncate());

afterEach('cleanup', () => db('foods').truncate());

describe('GET /pantry', () => {
  context('Given there are no foods', () => {
    it('responds with 200 and an empty list', () => {
      return supertest(app).get('/pantry').expect(200, []);
    });
  });

  context('Given there are foods in the database', () => {
    const testFoods = makeFoodsArray();

    beforeEach('insert foods', () => {
      return db.into('foods').insert(testFoods);
    });

    it('responds with 200 and all of the foods', () => {
      return supertest(app).get('/pantry').expect(200, testFoods);
    });
  });

  //   context('Given an XSS attack food', () => {
  //     const maliciousFood = {
  //       id: 911,
  //       title: 'Naughty <script>alert("xss");</script>',
  //       cal: '1',
  //     };
  //     beforeEach('insert malicious food', () => {
  //       return db.into('foods').insert([maliciousFood]);
  //     });
  //     it('removes XSS attack content', () => {
  //       return supertest(app)
  //         .get(`/pantry/${maliciousFood.id}`)
  //         .expect(200)
  //         .expect((res) => {
  //           expect(res.body.title).to.eql(
  //             'Naughty &lt;script&gt;alert("xss");&lt;/script&gt;'
  //           );
  //         });
  //     });
  //   });
});

describe(`GET /pantry/:foodId`, () => {
  context('Given there are no foods', () => {
    it('responds with 404', () => {
      const foodId = 123456;
      return supertest(app)
        .get(`/pantry/${foodId}`)
        .expect(404, { error: { message: `Food doesn't exist` } });
    });
  });

  context('Given there are foods in the database', () => {
    const testFoods = makeFoodsArray();

    beforeEach('insert foods', () => {
      return db.into('foods').insert(testFoods);
    });

    it('responds with a 200 and the specified food', () => {
      const foodId = 2;
      const expectedFood = testFoods[foodId - 1];

      return supertest(app)
        .get(`/pantry/${foodId}`)
        .expect((res) => {
          return res.body.id === expectedFood.id;
        });
    });
  });
  //   context(`Given an XSS attack Food`)
});

describe(`POST /pantry`, () => {
  it(`creates a food, responding with 201 and the new food`, function () {
    this.retries(3);
    const newFood = {
      title: 'Peach',
      cal: '200',
    };
    return supertest(app)
      .post('/pantry')
      .send(newFood)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).to.eql(newFood.title);
        expect(res.body.cal).to.eql(newFood.cal);
        expect(res.body).to.have.property('id');
        expect(res.headers.location).to.eql(`/pantry/${res.body.id}`);
      });
    //   .then((postRes) =>
    //     supertest(app).get(`/pantry/${postRes.body.id}`).expect(postRes.body)
    //   );
  });
  const requiredFields = ['title', 'cal'];

//   requiredFields.forEach((field) => {
//     const newFood = {
//       title: 'banana',
//       cal: '80',
//     };
//     it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//       delete newFood[field];

//       return supertest(app)
//         .post('/pantry')
//         .send(newFood)
//         .expect(400, {
//           error: { message: `Missing '${field}' in request body` },
//         });
//     });
//   });

describe(`DELETE /pantry/:foodId`, () => {
    context(`Given no food`, () => {
      it(`responds with 404`, () => {
        const foodId = 123456;
        return supertest(app)
          .delete(`/pantry/${foodId}`)
          .expect(404, { error: { message: `Food doesn't exist` } });
      });
    });
    context('Given there are foods in the database', () => {
      const testFoods = makeFoodsArray();

      beforeEach('insert foods', () => {
        return db.into('foods').insert(testFoods);
      });
      it('responds with 204 and removes the food', () => {
        const idToRemove = 2;
        const expectedFood = testFoods.filter(
          (food) => food.id !== idToRemove
        );
        return supertest(app)
          .delete(`/pantry/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app).get(`/pantry`).expect(expectedFood)
          );
      });
    });
  });
});
