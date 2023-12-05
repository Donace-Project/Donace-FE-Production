"use client"

// QRScanner.js
import React, { useState } from 'react';
import QrReader from 'react-web-qr-reader';


const QRScanner = ({onChildDataChange }) => {
  // const [result, setResult] = useState('no result');

  const handleScan = (data) => {
    if (data) {
      onChildDataChange(data.data);
      // console.log(data.data);
    }
  };

  const handleError = (err) => {
    console.error(err);
    onChildDataChange("error");
  };

  return (
    <div className='w-full'>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {/* <p>{result}</p> */}
    </div>
  );
};

export default QRScanner;
