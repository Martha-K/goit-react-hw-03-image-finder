import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { Div } from './styledApp';
export class App extends Component {
  state = {
    picturesName: '',
  };

  handelFormSubmit = picturesName => {
    this.setState({ picturesName: picturesName });
  };

  render() {
    return (
      <Div>
        <SearchBar onSubmit={this.handelFormSubmit} />
        <ImageGallery picturesName={this.state.picturesName} />
      </Div>
    );
  }
}
