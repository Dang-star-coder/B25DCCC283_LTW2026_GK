import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEvent = ({ events, onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !date.trim() || !capacity) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }

    const capacityNum = Number(capacity);
    if (Number.isNaN(capacityNum) || capacityNum < 10 || capacityNum > 1000) {
      setErrorMessage('Sức chứa phải từ 10 đến 1000');
      return;
    }

    const maxId = events.length > 0 ? Math.max(...events.map((event) => event.id)) : 0;
    onAdd({
      id: maxId + 1,
      name,
      location,
      date,
      capacity: capacityNum,
      registered: 0,
    });
    navigate('/events', { replace: true });
  };

  return (
    <div>
      <h2>Thêm sự kiện mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-input">Tên sự kiện</label>
          <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="location-input">Địa điểm</label>
          <input
            id="location-input"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date-input">Ngày diễn ra</label>
          <input id="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="capacity-input">Sức chứa</label>
          <input
            id="capacity-input"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AddEvent;
