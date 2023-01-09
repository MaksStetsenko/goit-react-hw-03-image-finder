import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    closeModal: PropTypes.func,
  };

  closeModal = e => {
    const { toggleModal } = this.props;

    if (toggleModal === undefined) {
      return;
    }

    if (e.code === 'Escape' || e.currentTarget === e.target) {
      toggleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    const { children } = this.props;

    return createPortal(
      <OverlayStyled onClick={this.closeModal}>
        <ModalStyled>{children}</ModalStyled>
      </OverlayStyled>,
      modalRoot
    );
  }
}

export default Modal;