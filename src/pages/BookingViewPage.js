import React from 'react';
import { useParams } from 'react-router-dom';

export default function BookingViewPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Booking #{id}</h2>
      <p>More details will be loaded here...</p>
    </div>
  );
}