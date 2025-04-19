import React from 'react';

export default function AdminPanel() {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item"><a href="/admin/bookings">Bookings</a></li>
      <li className="list-group-item"><a href="/admin/users">Users</a></li>
      <li className="list-group-item"><a href="/admin/listings">Listings</a></li>
    </ul>
  );
}
