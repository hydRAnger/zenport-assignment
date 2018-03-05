import React from 'react';
import {shallow} from 'enzyme';
import {fromJS} from 'immutable';

import Step2 from './Step2';

it('Restaurant has been selected', () => {
  expect(shallow(<Step2 order={fromJS({
    restaurant: 'some restaurant'
  })} />).state('isValid')).toEqual(true);
});

it('Restaurant was not selected', () => {
  expect(shallow(<Step2 order={fromJS({
    restaurant: ''
  })} />).state('isValid')).toEqual(false);
});
