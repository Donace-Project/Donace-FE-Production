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
        className="opacity-[1] pt-12 pl-[1rem!important] pr-[1rem!important] max-w-[820px] m-[0_auto]"
      >
        <div
          id="spread"
          className="gap-[.5rem] mb-[.5rem!important] flex justify-between items-center"
        >
          <h1
            id="title"
            className="text-[2rem] font-semibold text-[rgb(19,21,23)] mb-0 leading-[1.2] mt-0"
          >
            Khám phá
          </h1>
        </div>
        <div></div>
      </div>
      <div
        id="zm-container"
        className="pl-[1rem!important] pr-[1rem!important] max-w-[820px] m-[0_auto]"
      >
        <h1 className="text-[1.75rem] font-normal text-[rgba(19,21,23,0.36)] leading-[1.2] mt-0 mb-4">
          Những sự kiện xung quanh thành phố bạn
        </h1>

        <div className="grid grid-cols-2 justify-center items-center gap-5">
          <div className="w-full h-full">
            <Link href="/explore/cities/hochiminh">
              <Card isFooterBlurred radius="lg" className="border-none h-[500]">
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  height={500}
                  src="https://file1.dangcongsan.vn/data/0/images/2021/04/27/vuongle/ttxxvnktvn.jpg"
                  width={500}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Hồ Chí Minh</p>
                  <Button
                    className="text-tiny text-white bg-black/20"
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
            <Link href="/explore/cities/hue">
              <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  height={500}
                  src="https://cdnimg.vietnamplus.vn/uploaded/ivpycivo/2023_07_13/pho_co_hoi_an.png"
                  width={500}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Huế</p>
                  <Button
                    className="text-tiny text-white bg-black/20"
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
            <Link href="/explore/cities/cantho">
              <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  height={500}
                  src="https://media.vneconomy.vn/images/upload/2023/05/13/dbscl-4604.jpg"
                  width={500}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Cần Thơ</p>
                  <Button
                    className="text-tiny text-white bg-black/20"
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
