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
      hint:'',
      hintPos:-1
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
    if(this.diamondsFound() === this.state.diamondCount) {
      return;
    }
    const isBlank = this.state.diamondPositions.indexOf(i) === -1;
    let hint = isBlank?this.getHintDirection(i):'';
    const updatedStates = [...this.state.squareStates];
    updatedStates[i] = 1;
    this.setState({
      squareStates: updatedStates,
      hint: hint,
      hintPos: i
    })
  }

  getHintDirection(i) {
    const matrixDistance = this.state.diamondPositions.filter((pos) => !this.state.squareStates[pos]).map((pos) => {
      return [pos,this.getDistance(i,pos)];
    });
    matrixDistance.sort((a,b) => a[1]<b[1]?-1:a[1]>b[1]?1:0);
    const closestDiamondPos = matrixDistance[0][0];
    return this.calcDirection(i,closestDiamondPos);
  }

  calcDirection(i,j) {
    let vector = '';
    const iLocation = this.getLocation(i);
    const jLocation = this.getLocation(j);
    if(Math.abs(iLocation[0] - jLocation[0]) > Math.abs(iLocation[1] - jLocation[1])) {
      vector = jLocation[0]<iLocation[0]?'up':'down'
    } 
    else {
      vector = jLocation[1]<iLocation[1]?'left':'right'
    }
    return vector;
  }

  getDistance(i,j) {
    const iLocation = this.getLocation(i);
    const jLocation = this.getLocation(j);
    return Math.abs(iLocation[0] - jLocation[0]) + Math.abs(iLocation[1] - jLocation[1])
  }

  getLocation(i) {
    return [parseInt(i/this.state.matrixSize),(i%this.state.matrixSize)];
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
              hintPos = {this.state.hintPos}
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
