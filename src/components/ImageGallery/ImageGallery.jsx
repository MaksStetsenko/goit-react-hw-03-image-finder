import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';

const ImageGallery = ({ searchData }) => {
  return (
    <ImageGalleryStyled>
      {searchData.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImageURL={webformatURL}
          fullSizedImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ImageGalleryStyled>
  );
};

ImageGallery.propTypes = {
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      smallImageURL: PropTypes.string,
      fullSizedImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};

export default ImageGallery;