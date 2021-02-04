'use strict';

function makeDietsArray() {
  return [
    {
      id: 1,
      cal_limit: 2000, 
      cal_eaten: 500,
    },
    {
      id: 2,
      cal_limit: 1000, 
      cal_eaten: 400,
    },
    {
      id: 3,
      cal_limit: 500, 
      cal_eaten: 300,
    },
    {
      id: 4,
      cal_limit: 250, 
      cal_eaten: 200,
    },
  ];
}

module.exports = {makeDietsArray};