import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import MapView from './components/MapView';
import BookingDetails from './components/BookingDetails';
import MyBookings from './components/MyBookings';
import AdminPanel from './components/AdminPanel';
import api from './api';
import 'leaflet/dist/leaflet.css';

export default function App() {
  const [listings, setListings] = useState([]);
  const [mapPoints, setMapPoints] = useState([]);
  const [selected, setSelected] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const clientId = 1; // TODO: получать из контекста аутентификации

  const onSearch = async ({ startDate, endDate }) => {
    try {
      const hotels = await api.fetchAvailableHotels(startDate, endDate);
      const rooms = [];
      const points = [];
      hotels.forEach(hotel => {
        hotel.roomList?.forEach(room => rooms.push({ ...room, hotel }));
        // Плейсхолдер координат
        points.push({
          id: hotel.id,
          label: hotel.name,
          coords: [51.5 + hotel.id * 0.01, -0.1 + hotel.id * 0.01]
        });
      });
      setListings(rooms);
      setMapPoints(points);
    } catch (e) {
      alert(e.message);
    }
  };

  const loadMyBookings = async () => {
    try {
      const bookings = await api.fetchMyBookings(clientId);
      setMyBookings(bookings);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    loadMyBookings();
  }, []);

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Booking</h1>
        <nav>
          <a href="/signin" className="me-3">Sign In</a>
          <a href="/signup">Sign Up</a>
        </nav>
      </header>

      <section className="mb-4">
        <SearchBar onSearch={onSearch} />
      </section>

      <div className="row gx-4">
        <aside className="col-md-3 mb-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Search Results</h5>
              <SearchResults listings={listings} onSelect={setSelected} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Bookings</h5>
              <MyBookings
                bookings={myBookings}
                clientId={clientId}
                onCancel={async id => {
                  try {
                    await api.cancelBooking(clientId, id);
                    loadMyBookings();
                  } catch (e) {
                    alert(e.message);
                  }
                }}
              />
            </div>
          </div>
        </aside>

        <section className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Map</h5>
              <MapView points={mapPoints} />
            </div>
          </div>
        </section>

        <aside className="col-md-3 mb-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Details</h5>
              <BookingDetails listing={selected} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Admin Panel</h5>
              <AdminPanel />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
