"use client"
// pages/index.js
import React from 'react';
import QRCodeGenerator from '@/components/QR/QRGenerator';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import NavbarComponents from '@/components/navbar';

const QRCodeDemoPage = ({ params }: { params: { id: string } }) => {

  var informations = {
    "name": "Trần Phú Đạt",
    "email": "jackandy249@gmail.com",
    "ticket": "VIP"
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let qrCodeValue = "1"; // Replace with your actual QR code value


  return (
    <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
            <div>
      <h1>QR Code Generator</h1>

      <Button onPress={onOpen}>Open Generator QR code</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center' size='xs' >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalBody className='p-8'>
                <div className='w-full h-full'>
                  <div className='w-min h-min p-8 rounded-lg bg-[rgba(255,255,255,0.5)] backdrop-blur-sm border-dashed border-black border-2 m-auto'>
                    <QRCodeGenerator value={qrCodeValue} />
                  </div>
                  <Divider orientation="horizontal" className='my-4' />
                </div>
                <div>
                  <p className='text-2xl'>
                    Tên sự kiện
                  </p>
                </div>
                <div className='grid grid-cols-2 gap-2 justify-between'>
                  <div className='grid grid-rows-2'>
                    <p>Tên</p>
                    <p className='truncate'>{informations.name}</p>
                  </div>
                  <div className='grid grid-rows-2'>
                    <p>Email</p>
                    <p className='truncate'>{informations.email}</p>
                  </div>
                  <div className='grid grid-rows-2'>
                    <p>Hạng vé</p>
                    <p className='truncate'>{informations.ticket}</p>
                  </div>
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
            </div>
        </div>
    
  );
};

export default QRCodeDemoPage;
