import React from 'react';

export default function MyBookings({ bookings, onCancel }) {
  if (!bookings.length) {
    return <p className="text-muted">No bookings</p>;
  }
  return (
    <ul className="list-group list-group-flush">
      {bookings.map(b => (
        <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{b.room.name}</strong><br/>
            <small>
              {new Date(b.startDate).toLocaleDateString()} —{' '}
              {new Date(b.endDate).toLocaleDateString()}
            </small>
          </div>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onCancel(b.id)}
          >
            Cancel
          </button>
        </li>
      ))}
    </ul>
  );
}
