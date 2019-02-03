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
    this.interval = setInterval(this.update, 500);
  }
  update = () => {
    this.moveSnake('down');
  };
  moveSnake = dir => {
    let changeX = 0;
    let changeY = 0;
    if (dir === 'right') {
      changeX = 1;
    } else if (dir === 'left') {
      changeX = -1;
    } else if (dir === 'down') {
      changeY = 1;
    } else if (dir === 'up') {
      changeY = -1;
    }
    this.setState(prev => {
      const [lastX, lastY] = prev.snake[prev.snake.length - 1];
      const newPos = [lastX + changeX, lastY + changeY];
      return { snake: prev.snake.concat([newPos]) };
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
