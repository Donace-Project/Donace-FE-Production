"use client";
import React from "react";
import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function DN() {
  return (
    <Link href="/route" as={Card}>
      <Card>
        <CardHeader className="absolute z-[350] top-4 left-5">
          <h5 className="text-white font-medium text-large">Đà Nẵng</h5>
        </CardHeader>
        <CardBody>
          <Image
            src="https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/08/The-Golden-Bridge-is-lifted-by-two-giant-hands-in-the-tourist-resort-on-Ba-Na-Hill-in-Danang-Vietnam.jpg"
            className="w-72 h-64 rounded-lg mb-4"
            alt="hình ảnh"
          />
        </CardBody>
      </Card>
    </Link>
  );
}
