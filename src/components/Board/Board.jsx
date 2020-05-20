import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';
import './Board.css';

const Board = ({ handleSingleClick, width, height, cellSize, cells, boardRef }) => (

  <div className="Board"
    style={{ width: width, height: height, backgroundSize: `${cellSize}px ${cellSize}px` }}
    onClick={handleSingleClick}
    ref={boardRef}
  >
    {cells.map(cell => (
      <Cell key={`${cell.x},${cell.y}`} x={cell.x} y={cell.y} cellSize={cellSize} />
    ))}
  </div>
);

Board.propTypes = {
  handleSingleClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  cellSize: PropTypes.number,
  cells: PropTypes.array.isRequired,
  boardRef: PropTypes.func,
};

Board.defaultProps = {
  cells: [],
};

export default Board;