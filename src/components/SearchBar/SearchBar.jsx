import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import {Searchbar,SearchForm,SearchFormButton,SearchFormButtonLabel,Input} from './styled'
export class SearchBar extends Component {
  state = {
    picturesName: '',
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.picturesName === '') {
      alert('jhdfsk');
      return;
    }
    this.props.onSubmit(this.state.picturesName);
    this.setState({ picturesName: '' });
  };

  handelPicturesName = event => {
    this.setState({ picturesName: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <>
        <Searchbar>
          <SearchForm onSubmit={this.onSubmit}>
            <SearchFormButton type="submit">
              <ImSearch />
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
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
