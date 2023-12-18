"use client";

import React from "react";
import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function Explore() {
  return (
    <div id="page-content" className="pt-[calc(3.25rem)+1px]">
      <div
        id="page-header"
        className="opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global"
      >
        <div
          id="spread"
          className="gap-2 mb-2 flex justify-between items-center"
        >
          <h1
            id="title"
            className="text-4xl font-semibold text-[rgb(19,21,23)] dark:text-[#fff] mb-0 mt-0"
          >
            Khám phá
          </h1>
        </div>
      </div>
      <div
        id="zm-container"
        className="pl-4 pr-4 max-width-global margin-global"
      >
        <h1 className="text-3xl font-normal text-[rgba(19,21,23,0.36)] dark:text-[hsla(0,0%,100%,.5)] mt-0 mb-4">
          Những sự kiện xung quanh thành phố của bạn
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="w-full h-full">
            <Link href="/explore/cities/hochiminh" className="flex justify-center sm:justify-start">
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none h-[500] shadow-xl shadow-white/10"
              >
                <Image
                  alt="Ho Chi Minh City"
                  className="object-cover"
                  height={500}
                  src="https://res.cloudinary.com/deupkdvle/image/upload/v1700906524/hcm_r4fxew.jpg"
                  width={500}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-sm text-white/80 pl-unit-16 font-medium">
                    Hồ Chí Minh
                  </p>
                  <Button
                    className="text-tiny font-medium text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Xem thêm
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="w-full h-full">
            <Link href="/explore/cities/hue" className="flex justify-center sm:justify-start">
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none shadow-xl shadow-white/10"
              >
                <Image
                  alt="The Ancient Capital of Hue"
                  className="object-cover"
                  height={500}
                  src="https://res.cloudinary.com/deupkdvle/image/upload/v1700906537/hue_qm6jwk.webp"
                  width={500}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-sm text-white/80 pl-unit-16 font-medium">
                    Huế
                  </p>
                  <Button
                    className="text-tiny font-medium text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Xem thêm
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="w-full h-full">
            <Link href="/explore/cities/cantho" className="flex justify-center sm:justify-start">
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none shadow-xl shadow-white/10"
              >
                <Image
                  alt="Can Tho City"
                  className="object-cover"
                  height={500}
                  src="https://res.cloudinary.com/deupkdvle/image/upload/v1700906489/cantho_nwydwd.jpg"
                  width={500}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-sm text-white/80 pl-unit-16 font-medium">
                    Cần Thơ
                  </p>
                  <Button
                    className="text-tiny font-medium text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Xem thêm
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
