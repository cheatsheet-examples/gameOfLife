import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

const MOCK_CELL_SIZE = 20;
const MOCK_HANDLE_CLICK = jest.fn();
const MOCK_HEIGHT = 600;
const MOCK_WIDTH = 800;
const MOCK_CELLS = [];
const MOCK_BOARDREF = jest.fn();

describe('Board', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Board handleSingleClick={MOCK_HANDLE_CLICK} width={MOCK_HEIGHT} height={MOCK_WIDTH}
        cellSize={MOCK_CELL_SIZE} cells={MOCK_CELLS} boardRef={MOCK_BOARDREF} />
    );
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
