"use client";

import { Image } from "@nextui-org/image";
import React from "react";

export default function HoChiMinh() {
  return (
    <div className="panel ">
      <div className=" h-[400px] bg-gradient-to-r from-violet-300 to-cyan-200 ">
        <div className="head w-[800px] m-auto h-[100%] grid grid-cols-2  overflow-hidden">
          <div className="text z-50 grid grid-cols-1 justify-center items-center pb-[17.5rem] content-center">
            <h1 className="text-3xl font-medium text-[rgba(19,21,23,0.36)] dark:text-[hsla(0,0%,100%,.5)] mt-0 mb-4">
              Những sự kiện ở
            </h1>
            <h1
              id="title"
              className="text-4xl font-semibold text-[rgb(19,21,23)] dark:text-[#fff] mb-0 mt-0"
            >
              Hồ Chí Minh
            </h1>
          </div>
          <div className="img grid-cols-2">
            <img
              src="https://res.cloudinary.com/deupkdvle/image/upload/v1699278841/PANO0001-Pano11099tam_The_Landmark_81-removebg-preview_b4vexb.png"
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
