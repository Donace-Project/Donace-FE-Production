"use client";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { EventDetailModels, GetCalendarById, GetListEventByCalendarId, ItemsCalendarManage } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";
import { ArrowRight, ArrowUpRight, CalendarX2, MapPin, Plus, Radio, ScanLine, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import { Divider, Spinner } from "@nextui-org/react";

import { EventCard } from "@/components/event-card-component/event-card";

import donaceLogo from "@/public/doanLogo.png";
import { AMorPM } from "@/components/clock/cover-data-time";

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


const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

const CovertDate = (date: string) => {
    return date.split("T");
}

const DayOfWeek = (date: string) => {
    let currentDate = new Date(date).getDay();
    return daysOfWeek[currentDate]
}

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1)

export default function CalendarManage(props: any) {

    var { id } = props
    const dateTimeTrue = true;
    const dateTimeFalse = false;
    const dateTimeSubTrue = true;
    const dateTimeSubFalse = false;

    const [getCalendars, setCalendars] = useState<GetCalendarById>();

    const [isJoin, setIsJoin] = useState<boolean>(false);

    const [newSub, setnewSub] = useState<EventDetailModels[]>([]);
    const [newUnSub, setnewUnSub] = useState<EventDetailModels[]>([]);
    const [oldSub, setoldSub] = useState<EventDetailModels[]>([]);
    const [oldUnSub, setoldUnSub] = useState<EventDetailModels[]>([]);

    const handleJoinCalendar = async () => {
        setLoadingJoin(true);
        try {
            await fetchWrapper.post(`api/Calendar/user-join`,
                {
                    creatorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    sorted: 0,
                    calendarId: id
                }
            );

            setIsJoin(true);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoadingJoin(false);
    }

    const [loadingJoin, setLoadingJoin] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {

            fetchWrapper.post(`api/Calendar/get-by-id?Id=${id}`, null).then(data => setCalendars(data));

            fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeTrue}-${dateTimeSubTrue}`).then(data => setnewSub(data));
            fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeFalse}-${dateTimeSubFalse}`).then(data => setoldUnSub(data));
            fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeTrue}-${dateTimeSubFalse}`).then(data => setnewUnSub(data));
            fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeFalse}-${dateTimeSubTrue}`).then(data => setoldSub(data));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);

        if (getCalendars?.isHost === true || getCalendars?.isSub === true) {
            setIsJoin(true);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);
    // console.log(getCalendars)
    return (
        <div className="page-content">
            <div className="page-header opacity-[2] pl-4 pr-4 pt-12 max-width-global margin-global">
                {loading ? (
                    <div className="w-2/16 flex items-center justify-between gap-3">
                        <div>
                            <Skeleton className="flex rounded-full w-6 h-6" />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-6 w-3/5 rounded-lg" />
                        </div>
                        <Skeleton className="flex justify-end items-end w-2/12 rounded-lg">
                            <div className="h-6 w-2/12 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                ) : (
                    <div className="spread gap-2 mb-2 flex justify-between items-center">
                        <div className="gap-3 flex items-center">
                            <div className="w-8 h-8">
                                <Avatar
                                    radius="sm"
                                    src={getCalendars?.avatar ? getCalendars?.avatar : donaceLogo.src}
                                    name="Donace"
                                    className="relative w-6 h-6 mt-1"
                                />
                            </div>
                            <p className="tab-title text-4xl font-semibold ">{getCalendars?.name}</p>
                        </div>

                        <div className="flex justify-end items-center gap-2">
                            {
                                isJoin == true ? (<></>) : (
                                    <Button
                                        onClick={handleJoinCalendar}
                                        className="transition-all duration-300 ease-in-out flex items-center cursor-pointer"
                                    >
                                        <div className="flex justify-between align-middle gap-2">
                                            {
                                                loadingJoin ? (
                                                    <div className="inline-flex justify-between gap-2 flex-row">
                                                        <Spinner
                                                            size="sm"
                                                            color="success"
                                                            className=""
                                                        />
                                                        <span className="label">Đang gửi yêu cầu..</span>
                                                    </div>
                                                ) : (
                                                    <div className="label">Tham gia</div>
                                                )
                                            }
                                        </div>
                                    </Button>
                                )
                            }
                            <Link
                                href="/calendars"
                                className="text-foreground bg-background border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                                underline="none"
                            >
                                <div className="label">Lịch</div>
                                <ArrowUpRight className="ml-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                            </Link>
                        </div>
                    </div>
                )
                }
            </div >
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        {
                            getCalendars ? (
                                <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1" key={getCalendars.id}>
                                    <div className="side-padding"></div>
                                    <Link
                                        color="foreground"
                                        href={`/calendars/manage/${getCalendars.id}`}
                                        className="  border-b-2 border-solid  whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                        underline="none"
                                    >
                                        Sự kiện
                                    </Link>
                                    <Link
                                        color="foreground"
                                        href={`/calendars/manage/${getCalendars.id}/audience/`}
                                        className="  border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                        underline="none"
                                    >
                                        Người tham gia
                                    </Link>
                                    <Link
                                        color="foreground"
                                        href={`/calendars/manage/${getCalendars.id}/settings`}
                                        className="  border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                        underline="none"
                                    >
                                        Cài đặt
                                    </Link>
                                </div>
                            )
                                : (
                                    <></>
                                )
                        }


                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper">
                        {loading ? (
                            <div className="space-y-3 pt-1 mt-2">
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-full rounded-lg">
                                    <div className="h-6 w-full rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-6 w-3/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        ) : (
                            <div className="flex-col flex gap-2">
                                <Tabs aria-label="Options" >
                                    <Tab key="newUnSub" title="Sắp tới và chưa đăng ký" className="text-sm font-semibold">
                                        {newUnSub && newUnSub.length > 0 ? (
                                            <div className="timeline">
                                                {newUnSub.map((event, index) => (
                                                    <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                                                        {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                                                        <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                                                            <div className="container">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className=" ">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                                          <div className="dot-wrapper justify-center flex items-center">
                                                            <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                                          </div>
                                                        </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="block md:hidden container">
                                                            <div className="w-full">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className="text-foreground-900">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider orientation="horizontal" />
                                                        </div>
                                                        <EventCard event={event} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="timeline-container">
                                                <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                                    <div className="icon justify-center flex items-center">
                                                        <div className="mb-2">
                                                            <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200 dark:text-[#484848]" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-medium text-foreground p-0 mt-6 mb-0">Không có sự kiện</h3>
                                                    <div className="desc pl-12 pr-12   mt-2">Lịch này không có sự kiện gì sắp diễn ra.</div>
                                                    <div className="mt-6 justify-center flex items-center">
                                                        <Button
                                                            as={Link}
                                                            href={`/create`}
                                                            type="button"
                                                            className="text-foreground bg-background border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                        >
                                                            <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                            <div className="label">Tạo sự kiện mới</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab key="newSub" title="Sắp tới đã đăng ký" className="text-sm font-semibold">
                                        {newSub && newSub.length > 0 ? (
                                            <div className="timeline">
                                                {newSub.map((event, index) => (
                                                    <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                                                        {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                                                        <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                                                            <div className="container">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className=" ">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                                          <div className="dot-wrapper justify-center flex items-center">
                                                            <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                                          </div>
                                                        </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="block md:hidden container">
                                                            <div className="w-full">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className="text-foreground-900">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider orientation="horizontal" />
                                                        </div>
                                                        <EventCard event={event} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="timeline-container">
                                                <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                                    <div className="icon justify-center flex items-center">
                                                        <div className="mb-2">
                                                            <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200 dark:text-[#484848]" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-medium text-foreground p-0 mt-6 mb-0">Không có sự kiện</h3>
                                                    <div className="desc pl-12 pr-12   mt-2">Lịch này không có sự kiện gì sắp diễn ra.</div>
                                                    <div className="mt-6 justify-center flex items-center">
                                                        <Button
                                                            as={Link}
                                                            href={`/create`}
                                                            type="button"
                                                            className="text-foreground bg-background border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                        >
                                                            <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                            <div className="label">Tạo sự kiện mới</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab key="oldUnSub" title="Đã qua chưa tham gia" className="text-sm font-semibold">
                                        {oldUnSub && oldUnSub.length > 0 ? (
                                            <div className="timeline">
                                                {oldUnSub.map((event, index) => (
                                                    <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                                                        {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                                                        <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                                                            <div className="container">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className=" ">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                                          <div className="dot-wrapper justify-center flex items-center">
                                                            <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                                          </div>
                                                        </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="block md:hidden container">
                                                            <div className="w-full">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className="text-foreground-900">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider orientation="horizontal" />
                                                        </div>
                                                        <EventCard event={event} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="timeline-container">
                                                <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                                    <div className="icon justify-center flex items-center">
                                                        <div className="mb-2">
                                                            <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200 dark:text-[#484848]" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-medium text-foreground p-0 mt-6 mb-0">Không có sự kiện</h3>
                                                    <div className="desc pl-12 pr-12   mt-2">Lịch này không có sự kiện gì đã diễn ra.</div>
                                                    <div className="mt-6 justify-center flex items-center">
                                                        <Button
                                                            as={Link}
                                                            href={`/create`}
                                                            type="button"
                                                            className="text-foreground bg-background border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                        >
                                                            <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                            <div className="label">Tạo sự kiện mới</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab key="oldSub" title="Đã qua đã tham gia" className="text-sm font-semibold">
                                        {oldSub && oldSub.length > 0 ? (
                                            <div className="timeline">
                                                {oldSub.map((event, index) => (
                                                    <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                                                        {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                                                        <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                                                            <div className="container">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className=" ">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                                          <div className="dot-wrapper justify-center flex items-center">
                                                            <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                                          </div>
                                                        </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="block md:hidden container">
                                                            <div className="w-full">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                                        <div className="text-foreground-900">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider orientation="horizontal" />
                                                        </div>
                                                        <EventCard event={event} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="timeline-container">
                                                <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                                    <div className="icon justify-center flex items-center">
                                                        <div className="mb-2">
                                                            <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200 dark:text-[#484848]" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-medium text-foreground p-0 mt-6 mb-0">Không có sự kiện</h3>
                                                    <div className="desc pl-12 pr-12   mt-2">Lịch này không có sự kiện gì đã diễn ra.</div>
                                                    <div className="mt-6 justify-center flex items-center">
                                                        <Button
                                                            as={Link}
                                                            href={`/create`}
                                                            type="button"
                                                            className="text-foreground bg-background border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                        >
                                                            <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                            <div className="label">Tạo sự kiện mới</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Tab>
                                </Tabs>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}