import React, { Component } from 'react';
import Square from "./Square";
export default class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          openState={this.props.squareStates[i]}
          diamond={this.props.diamondPositions.indexOf(i)>=0}
          hint={this.props.hint}
          hintPos = {this.props.hintPos}
          squarePos = {i}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const matrix = Array(this.props.matrixSize).fill(null);
      return (
        <div>
          {
            matrix.map((row,rowNo) => {
              return (
                <div className="board-row">
                  {
                    matrix.map((col, columnNo) => {
                      const squareIndex = ((rowNo) * this.props.matrixSize) + columnNo;
                      return this.renderSquare(squareIndex)
                    })
                  }
                </div>
              )
            })
          }
        </div>
      );
    }
  }