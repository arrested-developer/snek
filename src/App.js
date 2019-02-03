import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './Board';

const H1 = styled.h1`
  font-size: 96px;
  margin: 16px;
  font-weight: bold;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <H1>Snek</H1>
        <Board snake={[[1, 2], [2, 2], [3, 2]]} />
      </div>
    );
  }
}

export default App;
