import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    venues: []
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
      alert('Error downloading the map!')
    })
  }

  initMap = () => {
    //create the map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:37.983810 , lng:23.727539 },  
      zoom: 8
    });


  toggleBounce = () => {
	if (this.marker.getAnimation() !== null) {
	  this.marker.setAnimation(null);
	} else {
	  this.marker.setAnimation(window.google.maps.Animation.BOUNCE);
	  }
	}


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
      marker.addListener('click', this.toggleBounce);
      

      
      //when clicked open a window with info
      marker.addListener('click', function() {
        //every click change the info content
        infowindow.setContent(contentString)
        //open
        infowindow.open(map, marker);
      });


    })

  }




  render() {
    return (
      <main>
        <div id="map" role="container"></div>  
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
