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
    this.nextDir = 'right';
    this.level = 1;
  }
  componentDidMount() {
    this.startInterval();
    window.addEventListener('keydown', e => {
      if (e.code === 'ArrowUp') {
        this.setNextDir('up');
      } else if (e.code === 'ArrowDown') {
        this.setNextDir('down');
      } else if (e.code === 'ArrowLeft') {
        this.setNextDir('left');
      } else if (e.code === 'ArrowRight') {
        this.setNextDir('right');
      }
    });
  }
  startInterval() {
    this.interval = setInterval(this.update, 500);
  }
  stopInterval() {
    clearInterval(this.interval);
  }
  setNextDir = dir => {
    const opposite = {
      up: 'down',
      down: 'up',
      right: 'left',
      left: 'right',
    };
    if (dir !== opposite[this.dir]) {
      this.nextDir = dir;
    }
  };
  update = () => {
    this.dir = this.nextDir;
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
