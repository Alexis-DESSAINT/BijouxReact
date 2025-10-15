import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = ({ cartCount }) => (
  <div className="layout">
    <Navbar cartCount={cartCount} />
    <main className="main-content">
      <Outlet />
    </main>
    {/* ...footer éventuel... */}
  </div>
);

export default Layout;