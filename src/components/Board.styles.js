import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.gridSize || 20}, 1fr);
  grid-template-rows: repeat(${props => props.gridSize || 20}, 1fr);
  grid-gap: 1px;
  width: calc(100vmin - 32px);
  height: calc(100vmin - 32px);
  max-width: 60vh;
  max-height: 60vh;
  margin: 0 auto;
  border: 5px solid black;
  box-sizing: border-box;
`;

const Snake = styled.div`
  background: black;
  grid-column-start: ${props => props.posX};
  grid-row-start: ${props => props.posY};
`;

const Egg = styled(Snake)`
  background: red;
`;

export { Grid, Snake, Egg };
