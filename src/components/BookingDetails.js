import React from 'react';

export default function BookingDetails({ listing }) {
  if (!listing) {
    return <p className="text-muted">Select a listing to see details</p>;
  }
  return (
    <div className="booking-details">
      <h6>{listing.name}</h6>
      <p>{listing.description}</p>
      <p>
        <small>Check-in: —</small><br/>
        <small>Check-out: —</small>
      </p>
      <button className="btn btn-success btn-sm">Book Now</button>
    </div>
  );
}
