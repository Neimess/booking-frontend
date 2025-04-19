import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Кастомный маркер для отелей
const hotelIcon = new L.Icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView = ({ points = [] }) => {
  // Если нет точек, показываем центр Москвы по умолчанию
  const center = points.length > 0
    ? [points[0].coords[0], points[0].coords[1]]
    : [55.7558, 37.6173]; // Москва

  return (
    <Box sx={{ height: '100%', minHeight: 300, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
      {points.length === 0 ? (
        <Paper
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#e9e9e9'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Нет доступных локаций
          </Typography>
        </Paper>
      ) : (
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {points.map((point) => (
            <Marker
              key={point.id}
              position={[point.coords[0], point.coords[1]]}
              icon={hotelIcon}
            >
              <Popup>
                <Typography variant="subtitle2" fontWeight="bold">
                  {point.label}
                </Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Box>
  );
};

export default MapView;
