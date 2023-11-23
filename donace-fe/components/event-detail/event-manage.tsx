'use client';
import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, Link, Image } from "@nextui-org/react";
import { ArrowUpRight, MapPin, ScanLine } from "lucide-react";
import { EventDetailModels, GetCalendarById } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

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
                                        className="w-full h-full bg-cover object-cover"
                                        alt="you are invited"
                                        // src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/gallery-images/xn/c100b6ce-2ab4-4a53-b575-2c8a4fa308b9"
                                        src={eventDetail?.cover ? 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/gallery-images/xn/c100b6ce-2ab4-4a53-b575-2c8a4fa308b9' : 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/gallery-images/xn/c100b6ce-2ab4-4a53-b575-2c8a4fa308b9'}
                                    />
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
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}