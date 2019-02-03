import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './Board';
import Message from './Message';

const H1 = styled.h1`
  font-size: 96px;
  margin: 16px;
  font-weight: bold;
  font-family: 'Helvetica', 'Arial', sans-serif;
`;

const ScoreBoard = styled.div`
  margin: 16px;
  font-size: 24px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = { snake: [[1, 4]], egg: false };
    this.gridSize = 25;
    this.dir = 'right';
    this.nextDir = 'right';
    this.level = 1;
    this.gameOver = false;
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
    window.addEventListener('click', e => {
      if (this.gameOver) this.resetGame();
    });
  }
  setSpeed = level => {
    let q = 1;
    if (level < 10) q = 2 + level / 3;
    else if (level < 20) q = 5.25 + (level - 10) / 4;
    else if (level < 25) q = 7.5 + (level - 20) / 6;
    else q = 8.2 + (level - 25) / 8;
    return 500 / q;
  };
  startInterval = () => {
    const egg = this.newEgg();
    this.setState(s => ({ egg }));
    this.interval = setInterval(this.updateBoard, this.setSpeed(this.level));
  };
  stopInterval = () => {
    clearInterval(this.interval);
  };
  resetInterval = () => {
    this.stopInterval();
    this.startInterval();
  };
  newEgg = () => {
    const randomWithin = n => Math.ceil(Math.random() * n);
    const eggPos = [randomWithin(this.gridSize), randomWithin(this.gridSize)];
    let clash = false;
    this.state.snake.forEach(part => {
      if (this.coordsMatch(part, eggPos)) clash = true;
    });
    if (clash) return this.newEgg();
    else return eggPos;
  };
  coordsMatch = (a, b) => {
    return a[0] === b[0] && a[1] === b[1];
  };
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
  updateBoard = () => {
    this.dir = this.nextDir;
    if (this.snakeCollided()) this.endGame();
    if (this.snakeFoundEgg()) this.levelUp();
    this.moveSnake(this.dir);
  };
  moveSnake = () => {
    this.setState(prev => {
      const nextPos = this.getNextPos(prev.snake);
      const snake = this.makeNewSnake(prev.snake, nextPos, this.level);
      return {
        snake,
      };
    });
  };
  snakeFoundEgg = () =>
    this.coordsMatch(this.getNextPos(this.state.snake), this.state.egg);
  snakeCollided = () => {
    const nextPos = this.getNextPos(this.state.snake);
    // if nextPos is any of the existing body positions
    let collision = false;
    this.state.snake.forEach(s => {
      if (this.coordsMatch(s, nextPos)) collision = true;
    });
    return collision;
  };
  getNextPos = snake => {
    const [x, y] = snake[snake.length - 1];
    let nextPos;
    if (this.dir === 'right') {
      nextPos = [x === this.gridSize ? 1 : x + 1, y];
    } else if (this.dir === 'left') {
      nextPos = [x === 1 ? this.gridSize : x - 1, y];
    } else if (this.dir === 'down') {
      nextPos = [x, y === this.gridSize ? 1 : y + 1];
    } else if (this.dir === 'up') {
      nextPos = [x, y === 1 ? this.gridSize : y - 1];
    }
    return nextPos;
  };
  makeNewSnake(prevSnake, nextPos, level) {
    return prevSnake.concat([nextPos]).slice(-1 * (level + 4));
  }
  levelUp = () => {
    this.level++;
    this.setState(s => ({ egg: this.newEgg() }));
    this.stopInterval();
    this.startInterval();
  };
  endGame = () => {
    this.stopInterval();
    this.gameOver = true;
  };
  resetGame = () => {
    this.setState({
      snake: [[1, 4]],
      egg: false,
    });
    this.level = 1;
    this.dir = this.nextDir = 'right';
    this.gameOver = false;
    this.startInterval();
  };
  render() {
    return (
      <div className="App">
        <H1>Snek</H1>
        <ScoreBoard>Score: {this.level}</ScoreBoard>
        <Board
          snake={this.state.snake}
          egg={this.state.egg}
          gridSize={this.gridSize}
        />
        {this.gameOver && <Message>Game Over!</Message>}
      </div>
    );
  }
}

export default App;
