import React from 'react';
import './Controller.css';
import PropTypes from 'prop-types';

const Controller = ({ stopGame, playGame, generateRandomBoard, clearCells,
  isGameRunning }) => (
    <div className="controls">

      {isGameRunning ?
        <button className="button" onClick={stopGame}>Stop</button> :
        <button className="button" onClick={playGame}>Play</button>
      }
      <button className="button" onClick={generateRandomBoard}>Random</button>
      <button className="button" onClick={clearCells}>Clear</button>

    </div>
  );

Controller.propTypes = {
  stopGame: PropTypes.func.isRequired,
  playGame: PropTypes.func.isRequired,
  generateRandomBoard: PropTypes.func.isRequired,
  clearCells: PropTypes.func.isRequired,
  isGameRunning: PropTypes.bool.isRequired
};

Controller.defaultProps = {
  isGameRunning: false
};
export default Controller;