# Neighborhood Map Project 8

## Project description
    
    This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Built with HTML, CSS, JavaScript, React and axios.
    This is a webpage showing my neighborhood map listing the cafees in the center of Athens. The map is generated by Google Maps API and also Foursquare API gives the location and information of each coffee place. 

## General Instructions

Development Mode

    Download or Clone the Repository.
    Install all project dependencies with npm install
    Start the server with npm start

Production Mode

    To create a production build use npm run build
    Navigate to the build directory and start the server with npm run deploy
    This mode includes a Service Worker. So in production, we register a service worker to serve assets from local cache.

## Load App in Developement mode

  `https://github.com/spenis/neighborhoodMapP8.git`
    Download or Clone the Repository.
  
  `npm start`
    `Starts the server. A new browser window should automatically open displaying the app. If it doesn't, navigate to http://localhost:3000/ in your browser.`

  `npm run build`
    `Bundles the app into static files for production.`

  npm test
    `Starts the test runner.`

  npm run eject
    `Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!`

install dependancy of axios
  `npm install axios`

## Loading the App in Production Mode

To run the app in production mode run:

`npm run build`

Then navigate to the build directory and start a localhost with python.
 If you have Python 2.x installed, try this:

`python -m SimpleHTTPServer 8000`

For Python 3.x, the command is:

`python -m http.server 8000`

In either case, navigate copying `http://localhost:8000` to your browser.


## Udacity Guides:

    Udacity CSS Style Guide
    Udacity Git Commit Message Style Guide
    Udacity HTML Style Guide
    Udacity JavaScript Style Guide
