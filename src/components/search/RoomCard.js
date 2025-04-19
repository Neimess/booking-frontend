import React from 'react';

export default function RoomCard({ item, onSelect }) {
  return (
    <button
      type="button"
      className="list-group-item list-group-item-action"
      onClick={() => onSelect(item)}
    >
      <h6 className="mb-1">{item.name}</h6>
      <small className="d-block text-truncate">{item.description}</small>
      <strong>${item.currentPrice?.value ?? item.currentPrice}</strong>
    </button>
  );
}