import React, { Component } from 'react';

// const SearchBar = () => {  This style of difining React components is called "Functional Component"
//     return <input />;
// }

class SearchBar extends Component {
  constructor(props) {
      super(props);

      this.state = {term: ''};
  }

  render() {
      return (
        <div className="search-bar">
          <input
            value={ this.state.term }
            onChange = {(e) =>  this.onInputChange(e.target.value)} />
        </div>
      );
  }

  onInputChange(term){
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;
