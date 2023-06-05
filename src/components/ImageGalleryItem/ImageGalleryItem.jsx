import React from 'react';
import {Li,Img} from './styled'

export const ImageGalleryItem = ({ src, alt, id, onImageClick}) => {

    return (
      <Li key={id}>
        <Img src={src} alt={alt} onClick={() => onImageClick()} />
      </Li>
    );
}
