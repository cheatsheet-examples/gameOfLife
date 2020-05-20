import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';
import Board from '../Board/Board';
import Controller from '../Controller/Controller';

describe('Game', () => {
    let wrapper;
    beforeEach(() => (wrapper = shallow(<Game />)));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render the Board and Controller Components', () => {
        expect(
            wrapper.containsAllMatchingElements([
                <Board
                    handleSingleClick={wrapper.instance().handleSingleClick}
                    cells={wrapper.instance().state.cells} />,
                <Controller
                    stopGame={wrapper.instance().stopGame}
                    playGame={wrapper.instance().playGame}
                    generateRandomBoard={wrapper.instance().generateRandomBoard}
                    isGameRunning={wrapper.instance().state.isGameRunning}
                    clearCells={wrapper.instance().clearCells}
                />,
            ])
        ).toEqual(true);

    });
    it('should get empty board', () => {
        wrapper.instance().rows = 3;
        wrapper.instance().cols = 3;
        let mockBoard = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        let expectEmptyBoard = wrapper.instance().generateEmptyBoard();
        expect(expectEmptyBoard).toEqual(mockBoard);
    });

    it('should generate empty cells array by empty board', () => {
        wrapper.instance().rows = 3;
        wrapper.instance().cols = 3;
        wrapper.instance().generateEmptyBoard();
        let expectCells = wrapper.instance().generateCells();
        expect(expectCells).toEqual([]);

    });

    it('should generate cells array by board have true', () => {
        wrapper.instance().board = [
            [true, false, false],
            [false, false, false],
            [false, false, true],
        ];

        let expectCells = wrapper.instance().generateCells();
        expect(expectCells.length).toEqual(2);
        expect(expectCells).toEqual([{ x: 0, y: 0 }, { x: 2, y: 2 }]);
    });

    it('should random generate cells could not be all be true or false', () => {
        wrapper.instance().generateRandomBoard();
        expect(wrapper.state('cells')).not.toEqual([]);
        expect(wrapper.state('cells').length < wrapper.instance().cols * wrapper.instance().rows).toBeTruthy();

    });
    describe('calculate next step of game of life', () => {
        it('should still live if centre cell have 2 neighbors', () => {
            wrapper.instance().board = [
                [true, false, false],
                [false, true, false],
                [false, false, true],
            ];
            wrapper.instance().rows = 3;
            wrapper.instance().cols = 3;

            let expectCells = wrapper.instance().generateCells();
            expect(expectCells.length).toEqual(3);
            wrapper.instance().goNextStep();
            let actualBoard = [
                [false, false, false],
                [false, true, false],
                [false, false, false],
            ];
            expect(wrapper.state('cells')).toEqual([{ x: 1, y: 1 }]);
            expect(wrapper.instance().board).toEqual(actualBoard);
        });
        it('should still live if centre cell have 3 neighbors', () => {
            wrapper.instance().board = [
                [true, false, false],
                [false, true, true],
                [false, false, false],
            ];
            wrapper.instance().rows = 3;
            wrapper.instance().cols = 3;
            wrapper.instance().goNextStep();
            expect(wrapper.state('cells')).toEqual([{ x: 1, y: 0 }, { x: 1, y: 1 }]);
            expect(wrapper.instance().board[1][1]).toEqual(true);
        });
        it('should still live if dead centre cell have 3 neighbors', () => {
            wrapper.instance().board = [
                [true, false, false],
                [false, false, true],
                [false, true, false],
            ];
            wrapper.instance().rows = 3;
            wrapper.instance().cols = 3;

            wrapper.instance().goNextStep();

            expect(wrapper.state('cells')).toEqual([{ x: 1, y: 1 }]);
            expect(wrapper.instance().board[1][1]).toEqual(true);
        });
        it('should  dead if 1 neighbors', () => {
            wrapper.instance().board = [
                [true, false, false],
                [false, true, false],
                [false, false, false],
            ];
            wrapper.instance().rows = 3;
            wrapper.instance().cols = 3;

            wrapper.instance().goNextStep();
            expect(wrapper.state('cells')).toEqual([]);
            expect(wrapper.instance().board[1][1]).toEqual(false);
        });
        it('should  dead if 4 neighbors', () => {
            wrapper.instance().board = [
                [true, false, true],
                [false, true, false],
                [true, false, true],
            ];
            wrapper.instance().rows = 3;
            wrapper.instance().cols = 3;

            wrapper.instance().goNextStep();
            expect(wrapper.instance().board[1][1]).toEqual(false);
        });
    });

    describe('check neighbors number ', () => {
        it('should get 0 neighbor true when board all cells are flase', () => {
            let mockBoard = [
                [false, false, false],
                [false, false, false],
                [false, false, false],
            ];
            const expectNumber = wrapper.instance().getNeighbors(mockBoard, 1, 1);
            expect(expectNumber).toEqual(0);
        });

        it('should get 1 neighbor true when board has [0,0] true', () => {
            let mockBoard = [
                [true, false, false],
                [false, false, false],
                [false, false, false],
            ];
            const expectNumber = wrapper.instance().getNeighbors(mockBoard, 1, 1);
            expect(expectNumber).toEqual(1);
        });
        it('should get 2 neighbor true when board has [0,0] and [2,2] true', () => {
            let mockBoard = [
                [true, false, false],
                [false, false, false],
                [false, false, true],
            ];
            const expectNumber = wrapper.instance().getNeighbors(mockBoard, 1, 1);
            expect(expectNumber).toEqual(2);
        });
        it('should get 8 neighbor true when middle cell all neighbors are true', () => {
            let mockBoard = [
                [true, true, true],
                [true, false, true],
                [true, true, true],
            ];
            const expectNumber = wrapper.instance().getNeighbors(mockBoard, 1, 1);
            expect(expectNumber).toEqual(8);
        });
    });
    describe('button click', () => {
        it('isGameRuning status change for play game', () => {
            wrapper.instance().playGame();
            expect(wrapper.state('isGameRunning')).toEqual(true);
            expect(wrapper.instance().timeoutHandler).not.toBeNull();
        });
        it('isGameRuning status change for stop game', () => {
            wrapper.instance().stopGame();
            expect(wrapper.state('isGameRunning')).toEqual(false);
            expect(wrapper.instance().timeoutHandler).toBeUndefined();
        });
        it('check state after clear cells', () => {
            wrapper.instance().clearCells();
            expect(wrapper.state('isGameRunning')).toEqual(false);
            expect(wrapper.instance().timeoutHandler).toBeUndefined();
            expect(wrapper.state('cells')).toEqual([]);
        });
        it('check state after generate random', () => {
            wrapper.instance().generateRandomBoard();
            expect(wrapper.state('isGameRunning')).toEqual(false);
            expect(wrapper.instance().timeoutHandler).toBeUndefined();
            expect(wrapper.state('cells')).not.toEqual([]);
        });
        it('check state after click on the board', () => {
            const mockElemOffset = jest.spyOn(wrapper.instance(), 'getBoardBound');
            mockElemOffset.mockReturnValue({ x: 0, y: 0 });
            wrapper.instance().handleSingleClick({ clientX: 15, clientY: 15 });
            expect(wrapper.state('isGameRunning')).toEqual(false);
            expect(wrapper.state('cells')).toEqual([{ x: 0, y: 0 }]);
            expect(wrapper.instance().board[0, 0]).toBeTruthy();


            wrapper.instance().handleSingleClick({ clientX: 30, clientY: 30 });
            expect(wrapper.state('cells')).toEqual([{ x: 0, y: 0 }, { x: 1, y: 1 }]);
            expect(wrapper.instance().board[1, 1]).toBeTruthy();

            wrapper.instance().handleSingleClick({ clientX: 15, clientY: 15 });
            expect(wrapper.state('cells')).toEqual([{ x: 1, y: 1 }]);

        });
    });
});