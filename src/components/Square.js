import React, { Component } from 'react';
export default function Square(props) {
    let contentCls = props.openState?(props.diamond?'diamond':(props.hintPos===props.squarePos?props.hint:'')):'unknown';

    return (
      <div className="square" onClick={props.onClick}>
        <div className={contentCls}></div>
      </div>
    );
  }