import styled from 'styled-components';

import {
  space,
  layout,
  color,
  typography,
  flexbox,
  background,
  border,
  position,
  shadow,
  grid,
} from 'styled-system';

const Box = styled('div')(
  {
    boxSizing: 'border-box',
  },
  space,
  layout,
  color,
  typography,
  flexbox,
  background,
  border,
  position,
  shadow,
  grid
);

export default Box;