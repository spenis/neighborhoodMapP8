import React from 'react';
//import { Marker } from "react-google-maps";

class Markers extends React.Component {

renderMarker() {
   //define the map, position and center of map components
    let {
      map, position, mapCenter
    } = this.props;

    //grab position and create new LatLng object for it's elements.
    //If no position passed then use mapCenter
    let pos = position || mapCenter;
    position = new window.google.maps.LatLng(
    	pos.lat, pos.lng);
    //create a new google.maps.Marker() object using these preferences
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