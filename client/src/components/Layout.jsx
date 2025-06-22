import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This will render Home, About, Services, etc. */}
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Layout;
