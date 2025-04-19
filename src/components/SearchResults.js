import React from 'react';

export default function SearchResults({ listings, onSelect }) {
  if (!listings.length) {
    return <p className="text-muted">No results</p>;
  }
  return (
    <div className="list-group">
      {listings.map(item => (
        <button
          key={item.id}
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(item)}
        >
          <h6 className="mb-1">{item.name}</h6>
          <small className="d-block text-truncate">{item.description}</small>
          <strong>${item.currentPrice.value ?? item.currentPrice}</strong>
        </button>
      ))}
    </div>
  );
}
