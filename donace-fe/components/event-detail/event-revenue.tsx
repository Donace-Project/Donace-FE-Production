'use client';
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { EventDetailModels } from "@/types/DonaceType";
import { Button, Link, Select, SelectItem, Spinner } from "@nextui-org/react";
import { ArrowUpRight, Sheet } from "lucide-react";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { RevenueIndex } from "../data";
import React from "react";

export default function EventRevenue(props: any) {


    var { id } = props
    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));
    }, []);
    return (
        <div className="page-content">
            <div className="page-header opacity-[2] pl-4 pr-4 pt-12 max-width-global margin-global">
                {eventDetail ? (
                    <div className="spread gap-2 mb-2 flex justify-between items-center">
                        <h1 className="tab-title text-4xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">
                            <div>
                                <div className="inline">{eventDetail.name}</div>
                            </div>
                        </h1>
                        <Link
                            href={`/events/detail/${eventDetail.id}`}
                            target="_blank"
                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                            underline="none"
                        >
                            <div className="label">Trang sự kiện</div>
                            <ArrowUpRight className="ml-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                        </Link>
                    </div>
                ) : (
                    <div className="hidden"></div>
                )}
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                            <div className="side-padding"></div>
                            <Link
                                href={`/events/manage/${eventDetail?.id}`}
                                underline="none"
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                Sự kiện
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/guests`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Khách
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/payment`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/insights`}
                                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Doanh thu
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/more`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Khác
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Thống kê doanh thu</h2>
                        </div>
                    </div>
                    <div className="main-content">
                        <Table
                            isStriped
                            aria-label="Example static collection table"
                        >
                            <TableHeader>
                                <TableColumn>Mã thanh toán</TableColumn>
                                <TableColumn>Email</TableColumn>
                                <TableColumn>Trạng thái</TableColumn>
                                <TableColumn>Thời điểm thanh toán</TableColumn>
                                <TableColumn>Thành tiền</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell>29321351</TableCell>
                                    <TableCell>tungnh230802@gmail.com</TableCell>
                                    <TableCell>Đã thanh toán</TableCell>
                                    <TableCell>23-08-2023</TableCell>
                                    <TableCell>59.000 VND</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell>29321352</TableCell>
                                    <TableCell>tungnh230802@gmail.com</TableCell>
                                    <TableCell>Đã thanh toán</TableCell>
                                    <TableCell>23-08-2023</TableCell>
                                    <TableCell>59.000 VND</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell>29321353</TableCell>
                                    <TableCell>tungnh230802@gmail.com</TableCell>
                                    <TableCell>Đã thanh toán</TableCell>
                                    <TableCell>23-08-2023</TableCell>
                                    <TableCell>59.000 VND</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="flex justify-end mt-4">

                            <Button
                                color="success"
                                className="text-[#fff] font-medium text-base w-fit"
                            >
                                <Sheet className="block align-middle w-4 h-4 mr-2 stroke-2"/>
                                <div className="label">Xuất file Excel</div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}