import React, { Component } from 'react';
import { Marker } from "react-google-maps";

class Markers extends React.Component {

renderMarker() {
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new window.google.maps.LatLng(
    	pos.lat, pos.lng);

    const pref = {
        map: map,
        position: position
      };
      this.marker = new window.google.maps.Marker(pref);
    
  }
	 
	render() {
    return null;

	}

}

export default Markers;