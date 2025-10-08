import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => (
  <div className="layout">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    {/* ...footer éventuel... */}
  </div>
);

export default Layout;