"use client"
// pages/index.js
import React, { useState } from 'react';
import QRScanner from '@/components/QR/QRScanner';
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import NavbarComponents from '@/components/navbar';
import { Users } from 'lucide-react';

const CheckinPage = ({ params }: { params: { id: string } }) => {
  const [guestsApproved, setGuestsApproved] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  var informations = {
    guests: [
      {
        "id": 1,
        "name": "Trần Phú Đạt",
        "email": "",
        "ticket": "VIP",
        "status": "not approved"
      },
      {
        "id": 2,
        "name": "Trần Phú Đạt",
        "email": "",
        "ticket": "VIP",
        "status": "not approved"
      },
      {
        "id": 3,
        "name": "Trần Phú Đạt",
        "email": "",
        "ticket": "VIP",
        "status": "not approved"
      }
    ]
  }

  const handleChildDataChange = (dataFromChild: any) => {

    // Xử lý dữ liệu từ component con ở đây
    if (dataFromChild == "error") {
      console.log("error")
      return;
    } else {
      var isGuest = informations.guests.filter(p => p.status == "not approved" && p.id == dataFromChild).filter(
        p => p.id == dataFromChild
      );
      if (isGuest != null) {
        setGuestsApproved(guestsApproved + 1);
        console.log("sussess", dataFromChild)
      } else {
        console.log("not in list or you already checked in")
      }
    }

  };

  return (
    <>
      <div className="page-wrapper">
        <NavbarComponents />
        <div className="main">
          <div className='container m-auto'>
            <div className='w-[200px] m-auto my-4'>
              <Button onPress={onOpen} variant='faded' className='bg-[rgba(19,21,23,0.04)]  dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button items-center cursor-pointer'><Users />Guests</Button>
            </div>
            <p className='text-center font-bold text-2xl'>Scan QR code below</p>
            <div className='w-[600px]  m-auto'>
              <QRScanner onChildDataChange={handleChildDataChange} />
            </div>
            <Divider className='my-8' />
            <div className='grid grid-cols-2 gap-5 justify-between text-center'>
              <div className=''>
                {informations.guests.length} Guests
              </div>
              <div className=''>
                {guestsApproved} Guests Approved
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placeholder='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckinPage;
