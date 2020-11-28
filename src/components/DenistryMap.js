import React from 'react'
import '../css/DenistryMap.css'
import MapboxMap from 'react-mapbox-wrapper';

export default function DenistryMap({ coordinates }) {
    return (
        <div style={{ height: 400, width: 400 }}>
            <MapboxMap accessToken='pk.eyJ1IjoibGVvd2VpMDkyMiIsImEiOiJja2hydGI1dG8yZzZyMnJwZXVmYmN5bDRjIn0.OpbuLDJ2ptHBjK1JBaE3pg' 
            coordinates={{ lat: 11.9743374, lng: 57.708581 }} />
        </div>
    );
} 

    
   