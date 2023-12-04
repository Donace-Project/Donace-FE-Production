"use client"
// QRScanner.js
import React, { useState } from 'react';
import QrReader from 'react-web-qr-reader';

const QRScanner = () => {
  const [result, setResult] = useState('no result');

  const handleScan = (data) => {
    if (data) {
      setResult(data.data);
      console.log(data.data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  );
};

export default QRScanner;
