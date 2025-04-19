import React from 'react';

export default function Toast({ message, type = 'info' }) {
  const bg = type === 'error' ? 'danger' : type === 'success' ? 'success' : 'secondary';
  return (
    <div className={`alert alert-${bg} mt-3`} role="alert">
      {message}
    </div>
  );
}
