import PropTypes from 'prop-types';
import { Component } from 'react';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { List } from './styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { fetchPictures } from '../Request/Request';


export class ImageGallery extends Component {
  static propTypes = {
    picturesName: PropTypes.string,
  };
  state = {
    images: [],
    totalImages: null,
    currentPage: 1,
    showModal: false,
    imageModal: null,
    descriptionPicture: null,
    loader: false,
  };

  fetchImages = () => {
    const { picturesName } = this.props;
    const { currentPage } = this.state;

    this.setState({ loader: true });
    fetchPictures(picturesName, currentPage)
      .then(data => {
        if (data.total === 0) {
          this.setState({ loader: false });
          alert('No results');
        } else {
          this.setState({ totalImages: data.totalHits });
          const nextImages = data.hits;
          this.setState(prevState => ({
            images: [...prevState.images, ...nextImages],
          }));
        }
      })
      .finally(() => this.setState({ loader: false }))
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
    console.log('this.state', this.state)
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
    console.log('this.imageModal', this.imageModal);

    this.setState({
      imageModal: item?.largeImageURL,
      descriptionPicture: item?.tags,
      showModal: !this.state.showModal,
    });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      showModal,
      imageModal,
      descriptionPicture,
      loader,
      totalImages,
    } = this.state;

    return (
      <>
        <List>
          {loader && <Loader />}
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
        {(totalImages > images.length && images.length > 0) && (
          <Button onNextPage={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            imageModal={imageModal}
            descriptionPicture={descriptionPicture}
            onClose={this.onCloseModal}
          />
        )}
      </>
    );
  }
}
