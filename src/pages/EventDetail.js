import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Countdown from '../components/Countdown';

const EventDetail = ({ events }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return <div>Không tìm thấy sự kiện</div>;
  }

  return (
    <div>
      <h2>Chi tiết sự kiện</h2>
      <div>Tên sự kiện: {event.name}</div>
      <div>Địa điểm: {event.location}</div>
      <div>Ngày: {event.date}</div>
      <div>Số chỗ: {event.registered}/{event.capacity}</div>
      <div style={{ marginTop: '10px' }}>
        <strong>Thời gian đếm ngược: </strong>
        <Countdown date={event.date} />
      </div>
      <button onClick={() => navigate(-1)} style={{ marginTop: '15px' }}>
        Quay lại
      </button>
    </div>
  );
};

export default EventDetail;
