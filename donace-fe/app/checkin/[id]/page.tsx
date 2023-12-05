"use client"
// pages/index.js
import React, { useState } from 'react';
import QRScanner from '@/components/QR/QRScanner';
import { Divider } from "@nextui-org/react";

const CheckinPage = ({ params }: { params: { id: string } }) => {
  const [guestsApproved, setGuestsApproved] = useState(0);

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
      }else{
        console.log("not in list or you already checked in")
      }
    }

  };

  return (
    <div className='container m-auto'>
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
  );
};

export default CheckinPage;
