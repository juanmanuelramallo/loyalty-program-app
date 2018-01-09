import React, { Component } from 'react';
import "../stylesheets/coin.css";

export default class Coin extends Component {
  render() {
    return(
      <div className="coin">
        <div className="coin-first-ring">
          <div className="coin-second-ring"></div>
        </div>
      </div>
    );
  }
}
