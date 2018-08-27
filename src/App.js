import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';
//import SearchBox from 'react-google-maps/lib/places/SearchBox';
//import ham from './ham.svg';
import ListView from './ListView.js';
import SearchBar from './SearchBar.js';
//import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Map from './Maps.js';
//import Marker from "react-google-maps";
//import { withGoogleMap } from 'react-google-maps';
import { mapStyles } from './mapStyles.js';


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
       }
  }

  componentDidUpdate() {
  }

  state = {
    venues: [],
    query: '',
    infoContent: "",
    map: [],
    marker: []
}
  updateSearch(event) {
   	this.setState({search: event.target.value.substr(0,20)});
  }


  componentDidMount() {
    this.getLocations()  	
  }

  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB44RGKJB9FKFF5kfBJQfjxD1KGxdCkaYs&callback=initMap")
    window.initMap = this.initMap
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

	addMarker = (data) => {
     new window.google.maps.Marker({
        position: new window.google.maps.LatLng(data.lat, data.lng),
        
     });
    }


	//update state function
	updateQuery = (query)=>{
	  this.setState({query: query})
	}

	//a reset function
	clearQuery = ()=>{
	  this.setState({query: '' })
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
	    
	    //when clicked open a window with info
	    marker.addListener('click', function() {
	      //every click change the info content
	      infowindow.setContent(contentString)
	      //open
	      infowindow.open(map, marker);

	    //marker
	    var marker = new window.google.maps.Marker({
		  position: {lat:myLocation.venue.location.lat , lng:myLocation.venue.location.lng },
		  map: map,
		  title: myLocation.venue.name,
		  draggable: true,
		  animation:  window.google.maps.Animation.DROP
	    });
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
	    return (
	      <main className="App" role="Container">
	          <div className="App-header" id="app-header">
	              <img src={logo} className="App-logo" alt="logo" />
	              <h1>Athens is the new Berlin</h1>
	              <h2 className="App-title">Neighborhood Map Project 8</h2>
	                <SearchBar/>
	             
	                <ListView/>
	                
	          </div>
	          <Map id="map"
	              infoContent={this.state.infoContent}/>
	      </main>
	    );
  }
}




function loadScript(url) {
  var index = 
  window.document.getElementsByTagName("script")[0]	

  var script =
  window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  script.onerror = () => {
  alert('Error downloading the map!');
  }
}






export default App;
