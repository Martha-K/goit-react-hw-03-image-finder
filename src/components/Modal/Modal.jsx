import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Wrapper } from './styled';

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.body.appendChild(modalRoot);

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('e', e)
        this.props.onClose();
      }
    });
  }
  render() {
    return createPortal(
      <Overlay onClick={this.props.onClose}>
        <Wrapper>
          <img
            onClick={e => e.stopPropagation()}
            src={this.props.imageModal}
            alt={this.props.descriptionPicture}
          />
        </Wrapper>
      </Overlay>,
      modalRoot
    );
  }
}

