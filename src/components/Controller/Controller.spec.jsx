import React from 'react';
import { shallow } from 'enzyme';
import Controller from './Controller';

const MOCK_STOP_GAME = jest.fn();
const MOCK_PLAY_GAME = jest.fn();
const MOCK_HANDLE_RANDOM = jest.fn();
const MOCK_HANDLE_CLEAR = jest.fn();
const MOCK_IS_GAME_RUN = false;

describe('Controller', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Controller stopGame={MOCK_STOP_GAME} playGame={MOCK_PLAY_GAME}
    generateRandomBoard={MOCK_HANDLE_RANDOM} clearCells={MOCK_HANDLE_CLEAR} isGameRunning={MOCK_IS_GAME_RUN}
  />)));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });


});