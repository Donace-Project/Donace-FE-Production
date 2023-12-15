"use client"
// QRCodeGenerator.js
import React from 'react';
import QRCode from 'qrcode.react';

type QRCodeGeneratorProps = {
    value: string;

}

const QRCodeGenerator = ({ value }: QRCodeGeneratorProps) => {
    return (
        <QRCode value={value} size={300} level='H' className='m-auto' />
    );
};

export default QRCodeGenerator;
