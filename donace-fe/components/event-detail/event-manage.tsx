'use client';
import React, { useEffect, useState } from "react";
import { Link, Image, Divider, ModalFooter } from "@nextui-org/react";
import { ArrowUpRight, MapPin, ScanLine } from "lucide-react";
import { EventDetailModels, GetCalendarById } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export type Calendar = {
    code: string
    success: boolean
    result: Result[]
    pageInfo: any
}

export type Result = {
    id: string
    name: string
    totalSubcriber: number
    avatar: string
    userId: string
    sorted: number
}

interface DateTimeInfo {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
}

const ConvertDateTime = (dateTime: string): DateTimeInfo => {
    const date = new Date(dateTime);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return { year, month, day, hour, minute };
};

const CovertDate = (date: string) => {
    return date.split("T");
}

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];


const DayOfWeek = (date: string) => {
    let currentDate = new Date(date).getDay();
    return daysOfWeek[currentDate]
}
export default function EventManage(props: any) {
    var { id } = props

    const modalEditEvent = useDisclosure();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [getCalendars, setCalendars] = useState<GetCalendarById | null>(null);
    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));

        fetchWrapper.post(`api/Calendar/get-by-id?Id=${id}`, null)
            .then(data => setCalendars(data));
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
                    <div></div>
                )}
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                            <div className="side-padding"></div>
                            <Link
                                href=""
                                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Tổng thể
                            </Link>
                            <Link
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Người tham gia
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="mb-4">
                    {eventDetail?.isLive ? (
                        <div className="banner text-[#d19d20] dark:text-[#facc28] bg-[#d19d2022] border-[#d19d20] dark:border-[#facc28] border border-solid p-[0.5rem_0.75rem_0.5rem_1rem] font-medium text-sm gap-2 flex justify-between items-center rounded-lg">
                            <div className="gap-3 flex items-center">
                                <div className="font-medium">Sự kiện này đang diễn ra.</div>
                            </div>
                            <Link
                                className="text-[#fff] dark:text-[rgb(9,21,23)] bg-[#d19d20] border-[#d19d20] border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                                underline="none"
                            >
                                <div className="lael">Check In</div>
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden"></div>
                    )}
                </div>
                <div className="outer mb-8">
                    <div className="content-card p-3 relative rounded-xl bg-[#fafafc] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden">
                        <div className="inner grid grid-cols-2 gap-5">
                            <div className="preview relative">
                                <div className="relative">
                                    <Image
                                        className="w-full h-auto bg-cover object-cover border border-solid border-[rgba(19,21,23,0.08)]"
                                        alt="you are invited"
                                        src={eventDetail?.cover ? 'https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard4.png' : 'https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard4.png'}
                                    />
                                    <div className="url-wrapper absolute p-[0.375rem_0.75rem] rounded-lg bg-[rgba(19,21,23,0.32)] z-50 bottom-2 left-2 right-2 backdrop-blur-lg shadow-md text-sm">
                                        <div className="url amimated transition-all duration-300 ease-in-out gap-2 flex justify-between items-center">
                                            <Link
                                                href=""
                                                target="_blank"
                                                className="text-[rgba(255,255,255,0.8)] gap-1 min-w-0 flex items-center transition-all duration-300 ease-in-out cursor-pointer"
                                                underline="none"
                                            >
                                                <div className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                                                    Chỗ này là hiển thị link eventDetail
                                                </div>
                                                <div className="flex items-center">
                                                    <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                </div>
                                            </Link>
                                            <button
                                                aria-label="copy link"
                                                type="button"
                                                className="text-[rgba(255,255,255,0.48)] border-[#939597] bg-transparent p-0 h-auto border-none rounded-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out font-medium relative whitespace-nowrap justify-center outline-none max-w-full w-fit flex items-center m-0 leading-6"
                                            >
                                                <div className="label">SAO CHÉP</div>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {eventDetail ? (
                                <div className="when-where h-full gap-1 flex flex-col">
                                    <h3 className="mt-2 text-lg font-semibold mb-4">Thời gian & Địa điểm</h3>
                                    <div className="gap-4 flex flex-col">
                                        <div className="gap-4 flex items-start">
                                            <div className="calendar-card-wrapper flex">
                                                <div className="calendar-card border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden bg-[#fff] dark:bg-[#212325] w-11 h-11">
                                                    <div className="month bg-[rgba(19,21,23,0.08)] dark:bg-[rgba(255,255,255,0.08)] text-[0.625rem] font-semibold uppercase text-center text-[#b3b5b7] dark:text-[#939597]">{ConvertDateTime(eventDetail.startDate).month}</div>
                                                    <div className="day text-lg text-center">{ConvertDateTime(eventDetail.startDate).day}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium">{DayOfWeek(CovertDate(eventDetail.startDate)[0])}</div>
                                                <div className="text-sm text-[#737577] dark:text-[#d2d4d7] text-ellipsis whitespace-nowrap overflow-hidden min-w-fit">{ConvertDateTime(eventDetail.startDate).day} tháng {ConvertDateTime(eventDetail.startDate).month}, {ConvertDateTime(eventDetail.startDate).hour}:{ConvertDateTime(eventDetail.startDate).minute} - {ConvertDateTime(eventDetail.endDate).day} tháng {ConvertDateTime(eventDetail.endDate).month}, {ConvertDateTime(eventDetail.endDate).hour}:{ConvertDateTime(eventDetail.endDate).minute} GMT+7</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="gap-4 flex items-center">
                                                <div className="icon w-11 h-11 text-[#b3b5b7] dark:text-[#939597] rounded-lg border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="w-5 h-5 block align-middle" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{eventDetail.addressName}</div>
                                                    <div className="text-sm text-[#737577] dark:text-[#d2d4d7]">Vietnam TODO</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-[#737577] dark:text-[#d2d4d7] mt-4">Địa chỉ này sẽ được công khai trong trang Sự kiện.</div>
                                            <Link
                                                className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer"
                                                underline="none"
                                            >
                                                <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                                <div className="label">Check In</div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex-1"></div>
                                    <div className="buttons grid gap-2 grid-cols-2">
                                        <Button
                                            onPress={modalEditEvent.onOpen}
                                            type="button"
                                            className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                        >
                                            <div className="label">Chỉnh sửa Sự kiện</div>
                                        </Button>
                                        <Button
                                            type="button"
                                            className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                        >
                                            <div className="label">Đổi Hình ảnh</div>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalEditEvent.isOpen}
                onOpenChange={modalEditEvent.onOpenChange}
                size="2xl"
                classNames={{
                    closeButton: [
                        "mt-2.5",
                        "mr-2",
                        "transition-all",
                        "duration-300",
                        "ease-in-out",
                        "hover:bg-[rgba(19,21,23,0.04)]",
                        "rounded-full"
                    ]
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Chỉnh sửa sự kiện</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="title font-semibold text-lg">Thông tin cơ bản</div>
                                <div className="event-name w-full pb-2 mt-2">
                                    <Input
                                        type="text"
                                        variant="bordered"
                                        labelPlacement="outside"
                                        label="Tên sự kiện"
                                        placeholder={eventDetail?.name}
                                        classNames={{
                                            inputWrapper: [
                                                "h-[calc(2.625rem+2*1px)]",
                                                "bg-[#fff]",
                                                "rounded-lg",
                                                "border",
                                                "border-solid",
                                                "border-[#ebeced]",
                                                "transition-all",
                                                "duration-300",
                                                "ease-in-out"
                                            ],
                                            input: [
                                                "text-lg",
                                                "font-medium",
                                                "text-[rgb(19,21,23)]"
                                            ],
                                            label: [
                                                "text-sm",
                                                "font-medium",
                                                "text-[rgba(19,21,23,0.64)]"
                                            ]
                                        }}
                                    />
                                </div>
                                <div className="desc w-full pb-2 mt-2">
                                    <Textarea
                                        type="text"
                                        variant="bordered"
                                        labelPlacement="outside"
                                        label="Mô tả"
                                        placeholder="Ai sẽ tham gia Sự kiện? Sự kiện này sẽ tổ chức về cái gì?"
                                        classNames={{
                                            inputWrapper: [
                                                "h-[calc(2.625rem+2*1px)]",
                                                "bg-[#fff]",
                                                "rounded-lg",
                                                "border",
                                                "border-solid",
                                                "border-[#ebeced]",
                                                "transition-all",
                                                "duration-300",
                                                "ease-in-out"
                                            ],
                                            input: [
                                                "text-base",
                                                "font-normal",
                                                "text-[rgb(19,21,23)]"
                                            ],
                                            label: [
                                                "text-sm",
                                                "font-medium",
                                                "text-[rgba(19,21,23,0.64)]"
                                            ]
                                        }}
                                    />
                                    <hr className="mt-6 border-solid border-[rgba(19,21,23,0.08)] border-b"></hr>
                                </div>
                                <div className="time w-full pt-1.5 mb-2">
                                    <div className="time-title font-semibold text-lg">Thời gian</div>
                                    <div className="w-full gap-2 flex justify-between pt-4">
                                        <div className="date-picker-container flex flex-col flex-grow-0">
                                            <div className="label">Bắt đầu</div>
                                            <DatePicker
                                                todayButton="Hôm nay"
                                                selected={startDate}
                                                onChange={(date: any) => setStartDate(date)}
                                                startDate={startDate}
                                                endDate={endDate}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                showTimeInput
                                                fixedHeight
                                                className="border-2 border-solid border-[#babac1] focus:border-[rgb(19,21,23)] rounded-lg pl-16 pr-8 mt-2"
                                                placeholderText="Ngày Bắt đầu sự kiện"
                                            />
                                        </div>
                                        <div className="date-picker-container flex flex-col flex-grow-0">
                                            <div className="label">Kết thúc</div>
                                            <DatePicker
                                                fixedHeight
                                                selected={endDate}
                                                onChange={(date: any) => setEndDate(date)}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                timeInputLabel="Time:"
                                                dateFormat="MM/dd/yyyy h:mm aa"
                                                className="border-2 border-solid border-[#babac1] focus:border-[rgb(19,21,23)] rounded-lg pl-16 pr-8 mt-2"
                                                placeholderText="Ngày Kết thúc sự kiện"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="location w-full mt-2">
                                    <div className="gap-4 flex items-center">
                                        <MapPin className="w-7 h-7 block align-middle" />
                                        <div
                                            className="w-full p-[0.25rem_1rem_0.25rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                        >
                                            <div className="font-medium">Thêm địa điểm</div>
                                            <div className="text-sm text-[#737577] dark:text-[#d2d4d7]">Online hoặc Offline</div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="success"
                                    type="submit"
                                    className="text-[#ffff] font-medium text-xs border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                >
                                    Cập nhật Sự kiện
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}