import React from 'react';
import { shallow } from 'enzyme';
import Cell from './Cell';

const MOCK_CELL_SIZE = 20;
const MOCK_CELL_X = 9;
const MOCK_CELL_Y = 15;

describe('Cell', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Cell
        x={MOCK_CELL_X}
        y={MOCK_CELL_Y}
        cellSize={MOCK_CELL_SIZE}
      />
    );
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
