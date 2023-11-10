"use client";

import { Image } from "@nextui-org/image";
import React from "react";

export default function CanTho() {
  return (
    <div className="panel ">
      <div className=" h-[400px] bg-gradient-to-r from-violet-300 to-rose-300 ">
        <div className="head w-[800px] m-auto h-[100%] grid grid-cols-2  overflow-hidden">
          <div className="text z-50 grid grid-cols-1 content-center">
            <h1 className="text-3xl font-medium text-[rgba(19,21,23,0.36)] dark:text-[hsla(0,0%,100%,.5)] mt-0 mb-4">
              Những sự kiện ở
            </h1>
            <h1
              id="title"
              className="text-4xl font-semibold text-[rgb(19,21,23)] dark:text-[#fff] mb-0 mt-0"
            >
              Cần Thơ
            </h1>
          </div>
          <div className="img grid-cols-2">
            <img
              src="https://res.cloudinary.com/deupkdvle/image/upload/v1699610509/z4867580777094_71d800d720a55b27bb4f97f342cfc506-removebg-preview_kcukkn.png"
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
