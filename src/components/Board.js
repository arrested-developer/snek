import React from 'react';

import { Grid, Snake, Egg } from './Board.styles';

const Board = props => {
  return (
    <Grid gridSize={props.gridSize}>
      {props.snake.map((s, i) => (
        <Snake key={i} posX={s[0]} posY={s[1]} />
      ))}
      {props.egg && <Egg posX={props.egg[0]} posY={props.egg[1]} />}
    </Grid>
  );
};

export default Board;
