import React from 'react';
import PropTypes from 'prop-types';

import { LoadMoreBtnStyled } from './Button.styled';

const Button = ({onClick}) => {
    return (
        <LoadMoreBtnStyled type="button" onClick={onClick} hidden="hidden">
            Load More
        </LoadMoreBtnStyled>
    )
}

export default Button;

Button.propTypes = { onClick: PropTypes.func.isRequired };