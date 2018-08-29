import React, { Component } from 'react';

class ListView extends React.Component {
	render() {
		var ListView = this.props.ListView;
		return (

		<ul>
                  <li>Coffee</li>
                  <li>Food</li>
                  <li>Bar</li>
                  <li>Galleries</li>
                  <li>Monuments</li>
            </ul>


			)
	}
}

export default ListView;