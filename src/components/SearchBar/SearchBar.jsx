import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  Input,
} from './styled';
export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  };
  state = {
    picturesName: '',
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.picturesName === '') {
      alert('Error');
      return;
    }
    this.props.onSubmit(this.state.picturesName);
    this.setState({ picturesName: '' });
  };

  handelPicturesName = event => {
    this.setState({
      picturesName: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  render() {
    return (
      <>
        <Searchbar>
          <SearchForm onSubmit={this.onSubmit}>
            <SearchFormButton type="submit">
              <ImSearch />
            </SearchFormButton>

            <Input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.picturesName}
              onChange={this.handelPicturesName}
            />
          </SearchForm>
        </Searchbar>
      </>
    );
  }
}
