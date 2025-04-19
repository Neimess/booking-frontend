import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <form
      className="row g-2 align-items-center"
      onSubmit={e => {
        e.preventDefault();
        onSearch({ startDate, endDate });
      }}
    >
      <div className="col-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Поиск"
        />
      </div>
      <div className="col-auto">
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}
