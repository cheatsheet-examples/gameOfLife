import React, { Component } from 'react';
import Broad from '../Board/Board';
import Controller from '../Controller/Controller';

const WIDTH = 800;
const HEIGHT = 300;
const CELL_SIZE = 20;
const INTERVAL = 400;
const RANDON_RATE = 0.5;

class Game extends Component {
    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.generateEmptyBoard();
    }

    state = {
        cells: [],
        isGameRunning: false,
    }

    generateEmptyBoard() {
        return Array.from(Array(this.rows), () => new Array(this.cols).fill(false));
    }

    generateCells() {
        let cells = [];
        this.board.forEach((cols, y) => {
            cols.forEach((col, x) => {
                if (col) {
                    cells.push({ x, y });
                }
            })
        });
        return cells;
    }

    handleSingleClick = (event) => {
        this.stopGame();
        const elemOffset = this.getBoardBound();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
            this.setState({ cells: this.generateCells() });
        }
    }

    playGame = () => {
        this.setState({ isGameRunning: true });
        this.runNextStep();
    }

    stopGame = () => {
        this.setState({ isGameRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    getBoardBound() {
        return this.boardRef.getBoundingClientRect();
    }

    runNextStep() {
        this.goNextStep();
        this.timeoutHandler = window.setTimeout(() => {
            this.runNextStep();
        }, INTERVAL);
    }

    goNextStep() {
        let newBoard = this.generateEmptyBoard();
        let oldBoard = this.board;
        this.board.forEach((cols, y) => {
            cols.forEach((col, x) => {
                let neighbors = this.getNeighbors(oldBoard, x, y);
                if (oldBoard[y][x]) {
                    newBoard[y][x] = (neighbors === 2 || neighbors === 3) ? true : false;

                } else {
                    if (!oldBoard[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            })
        });

        this.board = newBoard;
        this.setState({ cells: this.generateCells() });
    }

    getNeighbors(board, x, y) {

        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        dirs.forEach((dir) => {
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows) {
                if (board[y1][x1]) {
                    neighbors++;
                }
            }
        });
        return neighbors;
    }


    clearCells = () => {
        this.stopGame();
        this.board = this.generateEmptyBoard();
        this.setState({ cells: [] });
    }

    generateRandomBoard = () => {
        this.stopGame();
        this.board.forEach((cols, y) => {
            cols.forEach((col, x) => {
                this.board[y][x] = (Math.random() >= RANDON_RATE);
            })
        });
        this.setState({ cells: this.generateCells() });
    }

    render() {
        const { cells, isGameRunning } = this.state;
        return (
            <div>
                <h1>Game of Life</h1>
                <Broad handleSingleClick={this.handleSingleClick} width={WIDTH} height={HEIGHT}
                    cellSize={CELL_SIZE} cells={cells} boardRef={(n) => { this.boardRef = n; }} />
                <Controller stopGame={this.stopGame} playGame={this.playGame} generateRandomBoard={this.generateRandomBoard}
                    clearCells={this.clearCells}
                    isGameRunning={isGameRunning}
                />
            </div>
        );
    }
}
export default Game;
