import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './components/Board'
import { getRandomIntInclusive } from "./utlis";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  restart() {
    this.setState(this.getDefaultState());
  }

  getDefaultState() {
    const matrixSize = 8;
    const diamondCount = 8;
    this.state = {}
    return {
      matrixSize: matrixSize,
      diamondCount: diamondCount,
      squareStates: Array(matrixSize*matrixSize).fill(0),
      diamondPositions: this.generateDiamondPositions(matrixSize, diamondCount),
      hint:''
    };
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
    const isBlank = this.state.diamondPositions.indexOf(i) === -1;
    let hint = '';
    if(isBlank) {
      
    }
    const updatedStates = [...this.state.squareStates];
    updatedStates[i] = 1;
    this.setState({
      squareStates: updatedStates
    })
  }

  getHintDirection(i) {
    let direction = '';
    let distance = this.state.matrixSize;
    const iLocation = [(i/this.state.matrixSize),(i%this.state.matrixSize) - 1];
    const matrixPositions = this.state.diamondPositions.map((pos) => {
      const diamondLocation = [(pos/this.state.matrixSize), (pos%this.state.matrixSize) - 1];

      const dVertical = Math.abs(iLocation[0] - diamondLocation[0]);
      const dHorizontal = Math.abs(iLocation[1] - diamondLocation[1]);

      if(dVertical<distance) {
        distance = dVertical;
      }

      if(dHorizontal<distance) {
        distance = dHorizontal;
      }

      return diamondLocation;
    })
  }

  diamondsFound() {
    return this.state.diamondPositions.map((position) => {
      return this.state.squareStates[position]
    }).reduce((a,b) => a+b, 0)
  }

  score() {
    return (this.state.matrixSize*this.state.matrixSize) - (this.state.squareStates.reduce((a,b) => a + b, 0));
  }

  render() {
    const remainingMoves = this.score();
    const diamongsFound = this.diamondsFound();
    return (
      <div>
        <h4>There are {this.state.diamondCount} diamonds. Find'em all. </h4>
        <div className="game">
          <div className="game-board">
            <Board
              diamondPositions={this.state.diamondPositions}
              squareStates={this.state.squareStates}
              matrixSize = {this.state.matrixSize}
              hint = {this.state.hint}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>Score: {remainingMoves}</div>
            <div>{(diamongsFound<this.state.diamondCount)?`${diamongsFound} Diamonds found`:'All diamonds found, Bravo'}</div>
            <div><button onClick={() => {this.restart()}}>Restart</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
