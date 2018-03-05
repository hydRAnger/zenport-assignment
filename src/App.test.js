import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {fromJS} from 'immutable';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it(`If step 1 has invalid inputs, can't proceed to step 2`, () => {
  const app = mount(<App />);
  app.setState({
    currentStep: 0,
    stepValidaties: fromJS([false, false, false, true])
  });

  expect(app.find('li.next').hasClass('disabled')).toEqual(true);
});

it(`If step 2 has valid inputs, allow proceed to step 3`, () => {
  const app = mount(<App />);
  app.setState({
    currentStep: 1,
    stepValidaties: fromJS([true, true, false, true])
  });

  expect(app.find('li.next').hasClass('disabled')).toEqual(false);
});
