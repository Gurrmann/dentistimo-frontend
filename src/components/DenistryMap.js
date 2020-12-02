import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../css/DenistryMap.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvd2VpMDkyMiIsImEiOiJja2hydGI1dG8yZzZyMnJwZXVmYmN5bDRjIn0.OpbuLDJ2ptHBjK1JBaE3pg';

class DenistryMap extends React.Component {
    // initial latitude, longitude, and zoom of the map.
    constructor(props) {
        super(props);
        this.state = {
          lng: 11.974560,
          lat: 57.708870,
          zoom: 11.5
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

        // eslint-disable-next-line
        var YourDentist = new mapboxgl.Marker()
        .setLngLat([11.969388, 57.707619])
        .addTo(map);

        // eslint-disable-next-line
        var ToothFairyDentist = new mapboxgl.Marker()
        .setLngLat([11.942625, 57.685255])
        .addTo(map);

        // eslint-disable-next-line
        var TheCrown = new mapboxgl.Marker()
        .setLngLat([11.940386, 57.709872])
        .addTo(map);
        
        // add map controllers
        map.addControl(new mapboxgl.NavigationControl());

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
  


  export default DenistryMap
   