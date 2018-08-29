import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';
import ListView from './ListView.js';
import SearchBar from './SearchBar.js';
import ReactDOM from 'react-dom';
import { defaultIcon, logo } from './logo.svg';
import maps from './Maps.js';
//import Marker from "react-google-maps";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { withGoogleMap } from 'react-google-maps';
import { mapStyles } from './mapStyles.js';
import Header from './Header.js';
import Footer from './Footer.js';


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
         map: [],
         marker: [], 
         showingPlaces: [],
         data: [],
         query: '',
         venues: [],
       	 infoContent: "",
       	 showingInfoWindow: false,
         selectedPlace: "",
      	 activeMarker: {},
         success: false,     
         infoLoaded: true,
         findPlaces: [],
         markerfl: null,
         hasError: false 
       }
  this.onMarkerClick = this.onMarkerClick.bind(this);
  this.onMapClicked = this.onMapClicked.bind(this);
  this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
  this.state = { error: null, errorInfo: null };
  }

  componentDidUpdate() {
  }
    //Handles error catching
  componentDidCatch(error, errorInfo) {
    console.log("There is an error in loading the map " + error);
    this.setState({ 
      error: error,
      errorInfo: errorInfo
    });
  }

  updateSearch(event) {
   	this.setState({search: event.target.value.substr(0,20)});
  }


  componentDidMount() {
    this.getLocations()  	
  }

//  loadMap = () => {
//    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB44RGKJB9FKFF5kfBJQfjxD1KGxdCkaYs&callback=initMap")
//    window.initMap = this.initMap
//  }

  //Get information about map location using foursquare.API
  getLocations() {
        maps.getLocationsAll()
        .then(venues => {
        this.setState({ venues: venues })       
          
  })
        .catch(error => this.componentDidCatch(error, error.toString()))
  }  


	getLocations = () => {
		const endPoint = "https://api.foursquare.com/v2/venues/explore?"
		const parameters = {
		client_id: "FTMNUGF4LCQEN1QMBIQI31GOSN1QRIBHV1P1BNVDOWB12J5G",
		client_secret: "HLK4RJGME4QTPEPTISXWMLUXUC230ACT4JFZ3YFNXVDTZ1OM",
		query: "coffee",
		near: "Athens",
		v: "20180815"
	}
 

	axios.get(endPoint + new URLSearchParams(parameters))
	  .then(response => {
	    this.setState({
	   	locations: response.data.response.groups[0].items	
	    }, this.loadMap())
	  })
	  .catch(error => {
	    alert('Error downloading the map!' + error)
	 })
	}

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      icon: logo,
     });
  };
 
  onListClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      icon: logo,
     });
  };


  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: props,
        icon: defaultIcon,
        
      })
    }
  };

  onMouseoverMarker(props, marker, e) {
      this.setState({
      selectedPlace: props,
      activeMarker: marker,
      icon: defaultIcon
    
    });
  };


  onInfoWindowClose= (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
       showingInfoWindow: false,
       activeMarker: null,
       icon: defaultIcon
      })
    }
  };

	//update state function
	updateQuery = (query)=>{
	  this.setState({query: query})
	  this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        icon: defaultIcon,

      })
    this.updatesfindLocations(query)   
  }


	//a reset function
	clearQuery = ()=>{
	  this.setState({query: '' })
	}
    
  updatesfindLocations = (query) => {
        //query interogation, look for locations that match
        if (query) {
            //using maps display matching places
            maps.getSelectedAll(query).then((findPlaces) => {
                //check if search query doesn't exist or generate error, then no results, empty array               
                //Reference: https://dev.to/sarah_chima/error-boundaries-in-react-3eib
                               //in location math with query then it are displayed
                    this.setState({ findPlaces: findPlaces })
                    this.setState({ venues: findPlaces })
                    
               
            })
            .catch(error => this.componentDidCatch(error, error.toString()))
            //no query shows us no results, empty array
        } else {
            this.setState({ findPlaces: [] })
        }
    }
  

	initMap = () => {
	  //create the map
	  var map = new window.google.maps.Map(document.getElementById('map'), {
	    center: {lat:37.983810 , lng:23.727539 },  
	    zoom: 15,
	    styles: mapStyles
	});


	//infowindow
	var infowindow = new window.google.maps.InfoWindow()

	  this.state.locations.map(myLocation => {
	    var contentString = `${myLocation.venue.name}`;
	    
	    //marker
	    var marker = new window.google.maps.Marker({
		  position: {lat:myLocation.venue.location.lat , lng:myLocation.venue.location.lng },
		  map: map,
		  title: myLocation.venue.name,
		  draggable: true,
		  animation:  window.google.maps.Animation.DROP
	    
	    });

	    //when clicked open a window with info
	    marker.addListener('click', function() {
	      //every click change the info content
	      infowindow.setContent(contentString)
	      //open
	      infowindow.open(map, marker);
	      console.log(marker);


	    //animation from https://developers.google.com
        if(marker.getAnimation() !== null) {
            marker.setAnimation(null) ;
            } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
	  })
	    });

	}



 render() {
       
      if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>                     
            {this.state.error.stack}
          </details>
        </div>
      );
    }
     
     return (
     
  // HTML content    
  <div className="wrapper">
  <header className="header"><Header/></header>
    <article className="main">
    
    { (
            
          
          <Map 
          google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={{
          lat: 45.039638,
          lng: 23.266628
          }}
          zoom={15}
        >
        
     {this.state.venues.map(myMarker =>
        <Marker 
          ondomready={this.onListClick}
          key={myMarker.id}
          id={myMarker.id}
          onClick={this.onMarkerClick}
          icon={this.state.selectedPlace.id === myMarker.id ? this.state.icon : defaultIcon }
          position={myMarker.location}
          title={myMarker.title}
          name={myMarker.name} 
          animation={this.state.activeMarker ? (this.state.selectedPlace.id === myMarker.id ? '1' : '0') : '0'}

        > 
        </Marker>
      )} 
      
        <InfoWindow 

          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}         
          position={this.state.selectedPlace.location}
          onClose={this.onInfoWindowClose}
        >
           <div key={this.state.selectedPlace.id}>                    
           <h1> {this.state.selectedPlace.name} </h1>
          {this.state.venues.map(info =>            
           <div key={info.id}> 
           <p>{this.state.selectedPlace.id === info.id ?info.location.address : ''} </p>
           <p>{this.state.selectedPlace.id === info.id ?info.location.crossStreet : ''} </p>
           </div>  
        )}
            </div>
        </InfoWindow>       

      </Map>
       )}
    
  </article>
  <aside className="aside aside-1">
        <h1>Find places on the map</h1>
        
         

      <div className="input-wrapper">
          <input
            type="text"
            placeholder="Find places on map"
            aria-label="Find places on map"
            onChange={e => this.updateQuery(e.target.value)}
          />
      </div>
      <div>
        <ul className="filtered-list" tabIndex="0">
          {
        
        this.state.venues.map(place =>
              <li 
               
                key={place.id}
                className="result-item"
                tabIndex="0"
                id={place.id}                
               
                onClick={e => this.onListClick(place, this.marker, e)}                
                          
              >
                {place.name}
          
              </li>

            )
          }
        </ul>
        
      </div>
    
      </aside>

  <footer className="footer"><Footer/></footer>
  </div>

 



    );
  }
}

    // Google api calling
    export default GoogleApiWrapper({
      apiKey: "AIzaSyB7Ma3Ggl2TFUdsMaW8E4_F62uR65DPHZQ",
      v: "3.30"
    })(App);
//export default App;
