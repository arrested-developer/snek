import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './Board';
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from 'constants';

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
    this.level = 1;
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
      const snake = this.makeNewSnake(prev.snake, nextPos, this.level);
      return {
        snake,
      };
    });
  };
  makeNewSnake(prevSnake, nextPos, level) {
    return prevSnake.concat([nextPos]).slice(-1 * (level + 4));
  }
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
