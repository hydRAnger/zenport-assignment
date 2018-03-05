import React from 'react';
import {shallow} from 'enzyme';
import {fromJS} from 'immutable';

import Step3 from './Step3';

it(`4 dishes for 3 people, it's OK`, () => {
  expect(shallow(<Step3 order={fromJS({
    meal: 'breakfast',
    people: 3,
    dishes: [
      {
        name: 'A',
        num: 2
      }, {
        name: 'B',
        num: 2
      }
    ]
  })} />).state('isValid')).toEqual(true);
});

it(`4 dishes for 5 people, dishes should be greater or equal to the number of person`, () => {
  expect(shallow(<Step3 order={fromJS({
    meal: 'breakfast',
    people: 5,
    dishes: [
      {
        name: 'A',
        num: 2
      }, {
        name: 'B',
        num: 2
      }
    ]
  })} />).state('isValid')).toEqual(false);
});

it(`14 dishes for 5 people, maximum of dishes is 10`, () => {
  expect(shallow(<Step3 order={fromJS({
    meal: 'breakfast',
    people: 5,
    dishes: [
      {
        name: 'A',
        num: 1
      }, {
        name: 'B',
        num: 5
      }, {
        name: 'C',
        num: 8
      }
    ]
  })} />).state('isValid')).toEqual(false);
});
