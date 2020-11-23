var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoibGVvd2VpMDkyMiIsImEiOiJja2hydGI1dG8yZzZyMnJwZXVmYmN5bDRjIn0.OpbuLDJ2ptHBjK1JBaE3pg';
var map = new mapboxgl.Map({
  container: ' ',
  style: 'mapbox://styles/mapbox/streets-v11'
});
