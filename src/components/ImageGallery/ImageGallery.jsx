import { Component } from 'react';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import{List} from './styled'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

const KEY = '35106389-b5a872e61a54744fed1e01881';

export class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    showModal: false,
    imageModal: null,
    descriptionPicture: null,
  };

  fetchImages = () => {
    const { picturesName } = this.props;
    const { currentPage } = this.state;
    const apiUrl = `https://pixabay.com/api/?q=${picturesName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const nextImages = data.hits;
        this.setState(prevState => ({
          images: [...prevState.images, ...nextImages],
        }));
      })
      .catch(error => {
        console.log('Error fetching images:', error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.picturesName !== this.props.picturesName) {
      this.setState({ images: [], currentPage: 1 }, () => {
        this.fetchImages();
      });
    }
  }

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  totalModal = item => {
    this.setState({ imageModal: item?.largeImageURL });
    this.setState({ descriptionPicture: item?.tags });
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };
 

  render() {
    const { images, showModal, imageModal, descriptionPicture } = this.state;

    return (
      <>
        <List>
          {images.map(item => (
            <ImageGalleryItem
              src={item.webformatURL}
              alt={item.tags}
              id={item.id}
              key={item.id}
              onImageClick={() => this.totalModal(item)}
            />
          ))}
        </List>
        {images.length > 0 && <Button onNextPage={this.handleLoadMore} />}
        {showModal && (
          <Modal
            imageModal={imageModal}
            descriptionPicture={descriptionPicture}
            onClose={this.totalModal}
          />
        )}
      </>
    );
  }
}
