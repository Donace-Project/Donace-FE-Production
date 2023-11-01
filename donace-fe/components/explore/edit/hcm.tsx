"use client";
import React from "react";
import { Link } from "@nextui-org/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function HCM() {
  return (
    <Card>
      <Link href="/route" as={Card}>
        <CardHeader className="absolute z-[350] top-4 left-5">
          <h5 className="text-white font-medium text-large">Hồ Chí Minh</h5>
        </CardHeader>
        <CardBody className="p-0">
          <Image
            src="https://www.landmark81skyview.com/wp-content/uploads/2019/04/banner-day.png"
            className="w-72 h-64 rounded-lg mb-4"
            alt="Card background"
          />
        </CardBody>
      </Link>
    </Card>
  );
}
