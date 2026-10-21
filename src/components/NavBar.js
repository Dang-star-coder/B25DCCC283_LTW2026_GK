import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

const NavBar = () => {
  const isDetailRoute = useMatch('/events/:id');

  return (
    <nav>
      <NavLink to="/" end className={({ isActive }) => (isActive && !isDetailRoute ? 'active' : '')}>
        Trang chủ
      </NavLink>
      <NavLink to="/events" className={({ isActive }) => (isActive && !isDetailRoute ? 'active' : '')}>
        Danh sách
      </NavLink>
      <NavLink to="/events/new" className={({ isActive }) => (isActive && !isDetailRoute ? 'active' : '')}>
        Thêm mới
      </NavLink>
    </nav>
  );
};

export default NavBar;
