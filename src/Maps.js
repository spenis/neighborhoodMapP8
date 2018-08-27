import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from './App.js';
import Infowindow from './App.js';

class Map extends Component {
      
	render(){

    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat:37.983810 , lng:23.727539 } }
        defaultZoom = { 15 }
      >
      <Marker/>
      </GoogleMap>
   ));
    return(
      <div>
        <Map
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%`, width: `100%` }} /> }
          
        />
    
      <Infowindow
          
        venues={this.props.venue}  



            />
      </div>
    );
  }
       
  
}

export default Map;