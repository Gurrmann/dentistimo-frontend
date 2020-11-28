import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvd2VpMDkyMiIsImEiOiJja2hydGI1dG8yZzZyMnJwZXVmYmN5bDRjIn0.OpbuLDJ2ptHBjK1JBaE3pg';

class DenistryMap extends React.Component {
    // initial latitude, longitude, and zoom of the map.
    constructor(props) {
        super(props);
        this.state = {
          lng: 5,
          lat: 34,
          zoom: 2 
        };
      }
      // this function will be invoked right after the app 
      // is inserted into the DOM tree of your HTML page.
      componentDidMount() {
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });
          });
      }
      // entry point to initialize a Mapbox map in a React app is through a single element 
      // provided in the return statement of the render method
      render() {
        return (
          <div>
            <div className='sidebarStyle'>
              <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
              </div>
            </div>
            <div ref={el => this.mapContainer = el} className='mapContainer'/>
          </div>
        )
      }
  }
  
  ReactDOM.render(<DenistryMap />, document.getElementById('app'));

  export default DenistryMap


/*import React from 'react'
import '../css/DenistryMap.css'
import MapboxMap from 'react-mapbox-wrapper';

export default function DenistryMap({ coordinates }) {
    return (
          <div style={{ height: 400, width: 400 }}>
            <MapboxMap accessToken='pk.eyJ1IjoibGVvd2VpMDkyMiIsImEiOiJja2hydGI1dG8yZzZyMnJwZXVmYmN5bDRjIn0.OpbuLDJ2ptHBjK1JBaE3pg' 
            coordinates={{ lat: 11.9743374, lng: 57.708581 }} />
          </div>
    );
} */

    
   