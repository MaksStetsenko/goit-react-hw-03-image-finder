import React from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';

const IdleScreen = ({ children }) => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      position="fixed"
      color="lightgray"
      fontSize="l"
    >
      <h1>Pixabay searching App</h1>
    </Box>
  );
};

export default IdleScreen;

IdleScreen.propTypes = { children: PropTypes.node };
