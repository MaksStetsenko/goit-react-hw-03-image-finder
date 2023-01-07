import React from 'react';
import PropTypes from 'prop-types';

import { LoadMoreBtnStyled } from './Button.styled';

const Button = ({onClick}) => {
    return (
        <LoadMoreBtnStyled>
            Load More
        </LoadMoreBtnStyled>
    )
}

export default Button;

Button.propTypes = { onClick: PropTypes.func.isRequired };