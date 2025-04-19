import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { stubPoints } from './stubPoints';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


export default function MapView({ points }) {
  const displayPoints = points.length ? points : stubPoints;
  const center = [displayPoints[0].lat, displayPoints[0].lng];

  return (
    <div 
      className="map-wrapper" 
      style={{ width: '100%', height: '600px', overflow: 'hidden' }}
    >
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayPoints.map(pt => (
          <Marker key={pt.id} position={[pt.lat, pt.lng]}>
            <Popup>{pt.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
