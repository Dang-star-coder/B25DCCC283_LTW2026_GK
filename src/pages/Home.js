import React from 'react';

const Home = ({ events, loading, error }) => {
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Không tải được dữ liệu</div>;

  const totalEvents = events.length;
  const totalRegistered = events.reduce((sum, event) => sum + event.registered, 0);
  const totalFullEvents = events.filter((event) => event.registered >= event.capacity).length;

  return (
    <div>
      <h1>Sự kiện CLB</h1>
      <div>Tổng số sự kiện: {totalEvents}</div>
      <div>Tổng số lượt đăng ký: {totalRegistered}</div>
      <div>Số sự kiện đã đầy: {totalFullEvents}</div>
    </div>
  );
};

export default Home;
