import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('Automatic tab switching handling', () => {
  it('Should render component properly', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
