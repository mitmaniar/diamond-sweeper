import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './components/Board'
import { getRandomIntInclusive } from "./utlis";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const matrixSize = 8;
    const diamondCount = 8;

    const state = {
      matrixSize: matrixSize,
      diamondCount: diamondCount,
      squareStates: Array(matrixSize*matrixSize).fill(0),
      diamondPositions: this.generateDiamondPositions(matrixSize, diamondCount),
      history: []
    };

    state.history.push(...state.squareStates);

    this.state = state;
  }

  generateDiamondPositions(matrixSize, diamondCount) {
    const diamondPositions = [];
    while(diamondPositions.length<diamondCount) {
      const newPosition = getRandomIntInclusive(0,matrixSize*matrixSize)
      if(diamondPositions.indexOf(newPosition) === -1){
        diamondPositions.push(newPosition);
      }
    }
    return diamondPositions;
  }

  handleClick(i) {
    const updatedStates = [...this.state.squareStates];
    updatedStates[i] = 1;
    this.setState({
      squareStates: updatedStates
    })
  }

  render() {
    const remainingMoves = (this.state.matrixSize*this.state.matrixSize) - (this.state.squareStates.reduce((a,b) => a + b, 0));
    return (
      <div>
        <h3>Find'em all </h3>
        <div className="game">
          <div className="game-board">
            <Board
              diamondPositions={this.state.diamondPositions}
              squareStates={this.state.squareStates}
              matrixSize = {this.state.matrixSize}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>Remaining Moves: {remainingMoves}</div>
            <ol>{remainingMoves?'Playing':'All diamongs found'}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
