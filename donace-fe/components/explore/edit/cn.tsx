"use client";
import React from "react";
import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function CN() {
  return (
    <Link href="/route" as={Card}>
      <Card>
        <CardHeader className="absolute z-[350] top-4 left-5">
          <h5 className="text-white font-medium text-large">Cần Thơ</h5>
        </CardHeader>
        <CardBody>
          <Image
            src="https://media.vneconomy.vn/images/upload/2023/05/13/dbscl-4604.jpg"
            className="w-72 h-64 rounded-lg mb-4"
            alt="hình ảnh"
          />
        </CardBody>
      </Card>
    </Link>
  );
}
