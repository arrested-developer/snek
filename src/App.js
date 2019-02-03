import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './Board';

const H1 = styled.h1`
  font-size: 96px;
  margin: 16px;
  font-weight: bold;
`;

class App extends Component {
  constructor() {
    super();
    this.state = { snake: [[1, 2], [2, 2], [3, 2]] };
  }
  componentDidMount() {
    this.interval = setInterval(this.moveSnake, 500);
  }
  moveSnake = () => {
    this.setState(s => {
      const prevSnake = s.snake;
      const [lastX, lastY] = prevSnake[prevSnake.length - 1];
      const newPos = [lastX + 1, lastY];
      return { snake: prevSnake.concat([newPos]) };
    });
  };
  render() {
    return (
      <div className="App">
        <H1>Snek</H1>
        <Board snake={this.state.snake} />
      </div>
    );
  }
}

export default App;
