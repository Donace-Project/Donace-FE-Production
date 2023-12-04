// pages/index.js
import React from 'react';
import QRScanner from '@/components/QR/QRScanner';

const HomePage = () => {
  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QRScanner />
    </div>
  );
};

export default HomePage;
