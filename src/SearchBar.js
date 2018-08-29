import React from 'react';
//import sortBy from 'sort-by';


class SearchBar extends React.Component {
  static propTypes = {
	}

	state = {
		query: '',
		locationsSearchResult: []
	}

	updateQuery = (query) => {
		this.setState({
			query: query
	})
}
  render() {

    return (
      <div className='search-filter' tabIndex='0'>
	    <input
	    type='text'
	    placeholder='Search'
	    aria-label = "Enter location"
        />
       	</div>
		)
	}
}

export default SearchBar;