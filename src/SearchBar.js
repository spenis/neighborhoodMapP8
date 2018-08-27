import React from 'react';

class SearchBar extends React.Component {

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