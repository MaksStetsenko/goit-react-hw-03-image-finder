import Modal from '../Modal';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ImageGalleryItemStyled,
  ImageGalleryItemImageStyled,
} from './ImageGalleryItem.styled';

class ImageGalleryItem extends PureComponent {
  static propTypes = {
    smallImageURL: PropTypes.string.isRequired,
    fullSizedImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };

  render() {
    const { openModal } = this.state;
    const { smallImageURL, fullSizedImageURL, tags } = this.props;
    return (
      <>
        <ImageGalleryItemStyled onClick={this.toggleModal}>
          <ImageGalleryItemImageStyled
            src={smallImageURL}
            alt={tags}
            loading="lasy"
          />
        </ImageGalleryItemStyled>

        {openModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={fullSizedImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;