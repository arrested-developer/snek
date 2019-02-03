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
    this.gridSize = 20;
    this.dir = 'right';
  }
  componentDidMount() {
    this.interval = setInterval(this.update, 500);
  }
  update = () => {
    this.moveSnake(this.dir);
  };
  moveSnake = dir => {
    this.setState(prev => {
      const [x, y] = prev.snake[prev.snake.length - 1];
      let nextPos;
      if (dir === 'right') {
        nextPos = [x === this.gridSize ? 1 : x + 1, y];
      } else if (dir === 'left') {
        nextPos = [x === 1 ? this.gridSize : x - 1, y];
      } else if (dir === 'down') {
        nextPos = [x, y === this.gridSize ? 1 : y + 1];
      } else if (dir === 'up') {
        nextPos = [x, y === 1 ? this.gridSize : y - 1];
      }
      return { snake: prev.snake.concat([nextPos]) };
    });
  };
  render() {
    return (
      <div className="App">
        <H1>Snek</H1>
        <Board snake={this.state.snake} gridSize={this.gridSize} />
      </div>
    );
  }
}

export default App;
