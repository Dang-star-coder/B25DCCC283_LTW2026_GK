import React from 'react';

const FilterBar = ({ searchTerm, onSearchChange, statusFilter, onStatusChange }) => (
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="search-input">Tìm kiếm</label>
    <input
      id="search-input"
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ marginRight: '20px', marginLeft: '5px' }}
    />

    <label htmlFor="status-select">Tình trạng</label>
    <select
      id="status-select"
      value={statusFilter}
      onChange={(e) => onStatusChange(e.target.value)}
      style={{ marginLeft: '5px' }}
    >
      <option value="Tất cả">Tất cả</option>
      <option value="Còn chỗ">Còn chỗ</option>
      <option value="Đã đầy">Đã đầy</option>
    </select>
  </div>
);

export default FilterBar;
