import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Markers from './Marker.js';
import InfoWindow from './InfoWindow.js';

class Map extends React.Component {


   componentDidMount() {
    this.loadMap();
   }

       
    constructor(props) {
      super(props);
      this.state = { position: {

//      lat: this.lat,
//      lng: this.lng
      
      }
    }
}



	loadMap() {
	  if (this.props && this.props.google) {
//	    const{lat,lng} = this.state.position;
//	    const {google} = this.props;
//	    const maps = window.google.maps;
//	    const mapRef = this.refs.map;
	    }
	}


	componentDidCatch(error, info ) {
	  this.setState({ hasError: true});  
	  }

  render(){
    const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat:37.983810 , lng:23.727539 } }
        defaultZoom = { 15 }
      >
      <Markers/>
      </GoogleMap>
    ));

    return(
      <div ref="map">
           <Map
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%`, width: `100%` }} /> }
          >
          <Markers/>
          <Markers position= {this.position}/>

          </Map>
    
          <InfoWindow title= {this.props.contentString}
            latlng = {this.props.position}
            venueId = {this.props.title}  
            venues={this.props.venues}  
        />
      </div>
    );
  }
}

const api= 'https://api.foursquare.com/v2'

//let stringToken = localStorage.stringToken
//if (!stringToken)
//  stringToken = localStorage.stringToken = Math.random().toString(36).substr(-8)



//get all venues foursquare
export const getVenuesAll = () =>
  fetch(`${api}/venues/search?&radius=10000&limit10&client_id=
  	FTMNUGF4LCQEN1QMBIQI31GOSN1QRIBHV1P1BNVDOWB12J5G
  	&client_secret=HLK4RJGME4QTPEPTISXWMLUXUC230ACT4JFZ3YFNXVDTZ1OM
  	&limit=6&v=20180825&ll=37.983810,23.727539`)
    
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(error => {throw Error("There was an Error getting FourSquare data")})

// handle Errors
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

//select venues foursquare
export const select = (query) =>
  fetch(`${api}/venues/search?&radius=10000&query=
  	${query}
  	&limit10
  	&client_id=FTMNUGF4LCQEN1QMBIQI31GOSN1QRIBHV1P1BNVDOWB12J5G
  	&client_secret=HLK4RJGME4QTPEPTISXWMLUXUC230ACT4JFZ3YFNXVDTZ1OM
  	&limit=6&v=20180825&ll=37.983810,23.727539`)
    
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.response.venues)
    .catch(error => {throw Error("There was an Error getting FourSquare data")})


export default Map;