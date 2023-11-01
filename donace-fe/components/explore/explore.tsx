"use client";

import React from "react";
import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function ExploreEdit() {
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
            Explore
          </h1>
        </div>
        <div></div>
      </div>
      <div
        id="zm-container"
        className="pl-[1rem!important] pr-[1rem!important] max-w-[820px] m-[0_auto]"
      >
        <h1 className="text-[1.75rem] font-normal text-[rgba(19,21,23,0.36)] leading-[1.2] mt-0 mb-4">
          Tech Events in Your City
        </h1>
        {/* <div className="cities grid grid-rows-2 grid-flow-col p-0 gap-6 justify-center items-center pt-4">
          <HCM />
          <DL />
          <DN />
          <CN />
        </div> */}

        <div className="grid grid-cols-2 justify-center items-center gap-5">
          <div className="w-full h-full">
            <Link href="/route">
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
          <div className="w-full h-full">
            <Link href="/route">
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
          <div className="w-full h-full">
            <Link href="/route">
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
