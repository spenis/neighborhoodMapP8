import React, { Component } from 'react';
import defaultIcon from './icons8-marker-32.png';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './Maps.js';
import SearchBar from './SearchBar.js';
//import Marker from "react-google-maps";
import ReactDOM from 'react-dom';
import ListView from './ListView.js';
import Header from './Header.js';
import './App.css';
import { withGoogleMap } from 'react-google-maps';
import { mapStyles } from './mapStyles.js';
import logo from './logo2.png'



class App extends Component {
  
  constructor(props) {
    super(props);
    this.markerMount = this.markerMount.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.state = { error: null, errorInfo: null };
    this.state = {
      showingInfoWindow: false,
      map: [],
      selectedPlace: "",
      activeMarker: {},
      venues: [], 
      success: false,
      data: [],
      infoContent: "",     
      infoLoaded: true,
      query: "",
      searchVenue: [],
      markerfl: null,
      hasError: false
    };
  }

  componentDidUpdate() {
  }

  //Error Handling tips from https://medium.com/@leonardobrunolima/react-tips-error-handling-d6ca2171dd46
  componentDidCatch(error, errorInfo) {
    console.log("An error occured " + error);
    this.setState({ 
      error: error,
      errorInfo: errorInfo
    });
  }

  initMap = () => {
    //create the map
    var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat:37.983810 , lng:23.727539 },  
    zoom: 15,
    styles: {mapStyles}
  });}


  updateSearch(event) {
   	this.setState({search: event.target.value.substr(0,20)});
  }

  //Venue from foursquare & error handling
  getVenues() {
        maps.getVenuesAll()
        .then(venues => {
        this.setState({ venues: venues })       
          
  })
        .catch(error => this.componentDidCatch(error, error.toString()))
  }  

//  loadMap = () => {
//    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB44RGKJB9FKFF5kfBJQfjxD1KGxdCkaYs&callback=initMap")
//    window.initMap = this.initMap
//  }

  //load venue data   
  componentDidMount () {
   this.getVenues()
   // When Google Maps API fails >> alert
   window.gm_authFailure = () => {
   alert("Error loading Google Maps, Please Check The API Key!");
  };
  }
 
  //when I click a marker 
  markerMount(props, marker, e) {
    this.setState({

      activeMarker: marker,
      selectedPlace: props,
      icon: logo,
      showingInfoWindow: true,
      
     });
  };

  //map
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        
        activeMarker: null,
        selectedPlace: props,
        icon: defaultIcon,
        showingInfoWindow: false,
        
      })
    }
  };

  //list
  listMount(props, marker, e) {
    this.setState({

      activeMarker: marker,
      selectedPlace: props,
      icon: defaultIcon,
      showingInfoWindow: true,
      
     });
  };


	//getLocations = () => {
	//	const endPoint = "https://api.foursquare.com/v2/venues/explore?"
	//	const parameters = {
	//	client_id: "FTMNUGF4LCQEN1QMBIQI31GOSN1QRIBHV1P1BNVDOWB12J5G",
	//	client_secret: "HLK4RJGME4QTPEPTISXWMLUXUC230ACT4JFZ3YFNXVDTZ1OM",
	//	query: "coffee",
	//	near: "Athens",
	//	v: "20180815"
	//}

  gm_authFailure = () => {
  	
  	alert(`Google Maps API - could not loaded!`); 

  }	


  InfoWindowOff= (props) => {
    if (this.state.showingInfoWindow) {
      
      this.setState({

       showingInfoWindow: false,
       icon: defaultIcon
      
      })
    }
  };

  // Update locations list
  updateQuery = (query) => {
    
    this.setState({ query: query })
     this.setState({
    
        showingInfoWindow: false,
        icon: defaultIcon,

      })
    this.updateVenues(query)   
  }

  //update venues
  updateVenues = (query) => {

        if (query) {
            maps.select(query).then((searchVenue) => {

                    this.setState({ searchVenue: searchVenue })
                    this.setState({ venues: searchVenue })
                    
               
            })
            .catch(error => this.componentDidCatch(error, error.toString()))

        } else {
            this.setState({ searchVenue: [] })
        }
    }

  
  render() {
       
      if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <h3>                     
            {this.state.error.stack}
          </h3>
        </div>
      );
    }
     
     return (
     
  // HTML content    
  <div className="mainContainer">
  <header className="header"><Header/></header>
    <article className="main">
    
    { (
            
          
          <Map 
          google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={{
          lat: 37.983810,
          lng: 23.727539 
          }}
          zoom={18}
        >
        
     {this.state.venues.map(myMarker =>
        <Marker 
          ondomready={this.listMount}
          key={myMarker.id}
          id={myMarker.id}
          onClick={this.markerMount}
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
          onClose={this.InfoWindowOff}
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
  <aside className="aside">
        <h1>Find places on the map</h1>
  
        <div className="input-mainContainer">
          <input
            type="text"
            placeholder="Search here"
            aria-label="search"
            onChange={e => this.updateQuery(e.target.value)}
          />
        </div>
      <div>
        <ul className="list-query" tabIndex="0">
          {
        
        this.state.venues.map(place =>
              <li 
               
                key={place.id}
                className="result-item"
                tabIndex="0"
                id={place.id}                
               
                onClick={e => this.listMount(
                	place, this.marker, e)}>

                {place.name}
          
              </li>

            )
          }
        </ul>
        
      </div>
    
      </aside>

  
  </div>

    );
  }
}

    
export default GoogleApiWrapper({apiKey: "AIzaSyB44RGKJB9FKFF5kfBJQfjxD1KGxdCkaYs"})(App);
