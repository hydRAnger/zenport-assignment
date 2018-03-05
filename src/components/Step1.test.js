import React from 'react';
import {shallow} from 'enzyme';
import {fromJS} from 'immutable';

import Step1 from './Step1';

it('People shoul be 1-10, 3 is OK', () => {
  expect(shallow(<Step1 order={fromJS({
    meal: 'breakfast',
    people: 3
  })} />).state('isValid')).toEqual(true);
});

it('People shoul be 1-10, 0 is too less', () => {
  expect(shallow(<Step1 order={fromJS({
    meal: 'breakfast',
    people: 0
  })} />).state('isValid')).toEqual(false);
});

it('People shoul be 1-10, 23 is too many', () => {
  expect(shallow(<Step1 order={fromJS({
    meal: 'breakfast',
    people: 23
  })} />).state('isValid')).toEqual(false);
});

