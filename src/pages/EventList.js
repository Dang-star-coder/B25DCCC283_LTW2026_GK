import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import EventTable from '../components/EventTable';

const EventList = ({ events, loading, error, onDelete, onRegister }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFull = event.registered >= event.capacity;

    let matchesStatus = true;
    if (statusFilter === 'Còn chỗ') {
      matchesStatus = !isFull;
    } else if (statusFilter === 'Đã đầy') {
      matchesStatus = isFull;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2>Danh sách sự kiện</h2>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <div style={{ marginBottom: '10px' }}>
        Tìm thấy {filteredEvents.length} sự kiện
      </div>
      {filteredEvents.length === 0 ? (
        <div>Không có dữ liệu</div>
      ) : (
        <EventTable events={filteredEvents} onDelete={onDelete} onRegister={onRegister} />
      )}
    </div>
  );
};

export default EventList;
