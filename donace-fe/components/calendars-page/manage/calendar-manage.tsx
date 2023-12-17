"use client";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { GetCalendarById, GetListEventByCalendarId, ItemsCalendarManage } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";
import { ArrowRight, ArrowUpRight, CalendarX2, MapPin, Plus, ScanLine, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/react";


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
const currentDateFormatted = currentDate.toLocaleDateString('en-US').replace(/\//g, '-');
currentDate.setDate(currentDate.getDate() - 1)
const pastDateFormatted = currentDate.toLocaleString('en-US').replace(/\//g, '-');

export default function CalendarManage(props: any) {

    var { id } = props
    const dateTimeTrue = true;
    const dateTimeFalse = false;
    const dateTimeSubTrue = true;
    const dateTimeSubFalse = false;
    const dateTimeEvent = dateTimeTrue ? 'true' : 'false';

    const [getCalendars, setCalendars] = useState<GetCalendarById | null>(null);
    const [calendars, setCalendar] = useState<Calendar | null>(null);

    const [isJoin, setIsJoin] = useState<boolean>(false);

    const [getEvent, setEvents] = useState<GetListEventByCalendarId[]>([]);
    const [getPastEvent, setPastEvents] = useState<GetListEventByCalendarId[]>([]);
    const [getEventSub, setEventSub] = useState<GetListEventByCalendarId[]>([]);
    const [getPastEventSub, setPastEventSub] = useState<GetListEventByCalendarId[]>([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const calendarsData = await fetchWrapper.post(`api/Calendar/get-by-id?Id=${id}`, null);
                setCalendars(calendarsData);

                const eventsData = await fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeTrue}-${dateTimeSubTrue}`);
                setEvents(eventsData);

                const pastEventsIdData = await fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeFalse}-${dateTimeSubFalse}`);
                setPastEvents(pastEventsIdData);

                const TrueFalse = await fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeTrue}-${dateTimeSubFalse}`);
                setPastEvents(TrueFalse);

                const FalseTrue = await fetchWrapper.get(`api/Event/list-event-by-calendar-${id}-${dateTimeFalse}-${dateTimeSubTrue}`);
                setPastEvents(FalseTrue);

               

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);

            if (getCalendars?.isHost === true || getCalendars?.isSub === true) {
                setIsJoin(true);
            }
        };
        fetchData();
    }, []);
    console.log(getCalendars)
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
                        <h1 className="tab-title text-4xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">
                            {getCalendars ? (
                                <div className="gap-3 flex items-center">
                                    <div className="w-8 h-8">
                                        <Avatar
                                            radius="sm"
                                            src={getCalendars.avatar ? getCalendars.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png"}
                                            name="Donace"
                                            className="relative w-6 h-6 mt-1"
                                        />
                                    </div>
                                    <div>{getCalendars.name}</div>
                                </div>
                            ) : (
                                <div className="gap-3 flex items-center">
                                    <div className="w-8 h-8">
                                        <Avatar
                                            radius="sm"
                                            src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                            name="Donace"
                                            className="relative w-6 h-6 mt-1"
                                        />
                                    </div>
                                    <div>Donace</div>
                                </div>
                            )}
                        </h1>
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
                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                            underline="none"
                        >
                            <div className="label">Lịch</div>
                            <ArrowUpRight className="ml-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                        </Link>

                    </div>
                )}
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        {getCalendars ? (
                            <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1" key={getCalendars.id}>
                                <div className="side-padding"></div>
                                <Link
                                    href={`/calendars/manage/${getCalendars.id}`}
                                    className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Sự kiện
                                </Link>
                                <Link
                                    href={`/calendars/manage/${getCalendars.id}/audience/`}
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Người tham gia
                                </Link>
                                <Link
                                    href={`/calendars/manage/${getCalendars.id}/settings`}
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Cài đặt
                                </Link>
                            </div>
                        ) : (
                            <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                                <div className="side-padding"></div>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Sự kiện
                                </Link>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Người tham gia
                                </Link>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Cài đặt
                                </Link>
                            </div>
                        )}
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
                                    <Tab key="future" title="Sắp tới" className="text-sm font-semibold">
                                        {getEvent && getEvent.length > 0 ? (
                                            <div className="timeline">
                                                {getEvent.map((event, index) => (
                                                    <div key={index} className="timeline-section relative flex w-full gap-16 pb-12">
                                                        <div className="line left-[calc(7rem+4rem/2)] dark:border-[rgba(255,255,255,0.08)]"></div>
                                                        <div className="title always relative w-28">
                                                            <div className="container sticky">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{CovertDate(event.startDate)[0]}</div>
                                                                        <div className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                                                    <div className="dot-wrapper justify-center flex items-center">
                                                                        <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="card-wrapper">
                                                                <div className="card-wrapper content-card cursor-pointer transition-all duration-300 ease-in-out relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.04)]">
                                                                    <Link className="event-link absolute inset-0 transition-all duration-300 ease-in-out cursor-pointer" underline="none">&nbsp;</Link>
                                                                    <div className="event-content gap-3 flex flex-col">
                                                                        <div className="info-and-cover flex-row-reverse gap-4 flex">
                                                                            <div className="cover-image pointer-events-none">
                                                                                <div className="w-40 h-40">
                                                                                    <div className="object-cover img-aspect-ratio w-full h-full overflow-hidden relative rounded-lg">
                                                                                        <Image className="w-full h-full" alt="you are invited" src={event.cover} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                                                                <div className="event-time gap-2 flex items-center">
                                                                                    <div>
                                                                                        <div className="live-badge text-[#ff9641] flex items-center font-medium"
                                                                                            style={{
                                                                                                animationName: 'breath',
                                                                                                animationDuration: '2s',
                                                                                                animationTimingFunction: 'ease',
                                                                                                animationDelay: '0s',
                                                                                                animationIterationCount: 'infinite',
                                                                                                animationDirection: 'normal',
                                                                                                animationFillMode: 'none',
                                                                                                animationPlayState: 'running',
                                                                                            }}
                                                                                        >
                                                                                            LIVE
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                                                                        <span>
                                                                                            {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-xl">
                                                                                    <h3 className="inline text-xl font-medium break-words mt-0 mb-4">{event.name}</h3>
                                                                                </div>
                                                                                <div className="gap-1 flex flex-col">
                                                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                                                        <div className="icon text-base flex items-center">
                                                                                            &nbsp;
                                                                                            <MapPin className="w-4 h-4 block align-middle mt-0.5" />
                                                                                        </div>
                                                                                        <div className="text-base min-w-0 truncate">{event.addressName}</div>
                                                                                    </div>
                                                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                                                        <div className="icon text-base flex items-center">
                                                                                            &nbsp;
                                                                                            <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                                                                        </div>
                                                                                        <div className="text-base min-w-0">{event.totalGuest} Khách</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="event-bottom-bar flex justify-between items-center">
                                                                            <div className="gap-2 flex items-center">
                                                                                <Button
                                                                                    as={Link}
                                                                                    href={`/user/join-event/${event.id}`}
                                                                                    className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                                                                >
                                                                                    <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                                                                    <div className="label">Check In</div>
                                                                                </Button>
                                                                                <Button
                                                                                    as={Link}
                                                                                    href={`/events/manage/${event.id}`}
                                                                                    className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                                                                    <div className="label">Quản lý sự kiện</div>
                                                                                    <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                    <h3 className="text-2xl font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] p-0 mt-6 mb-0">Không có sự kiện</h3>
                                                    <div className="desc pl-12 pr-12 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] mt-2">Lịch này không có sự kiện gì sắp diễn ra.</div>
                                                    <div className="mt-6 justify-center flex items-center">
                                                        <Button
                                                            as={Link}
                                                            href={`/create/?calendarId=${id}`}
                                                            type="button"
                                                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                        >
                                                            <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                            <div className="label">Tạo sự kiện mới</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab key="past" title="Đã qua" className="text-sm font-semibold">
                                        {getPastEvent && getPastEvent.length > 0 ? (
                                            <div className="timeline">
                                                {getPastEvent.map((event, index) => (
                                                    <div key={index} className="timeline-section relative flex w-full gap-16 pb-12">
                                                        <div className="line left-[calc(7rem+4rem/2)] dark:border-[rgba(255,255,255,0.08)]"></div>
                                                        <div className="title always relative w-28">
                                                            <div className="container sticky">
                                                                <div className="timeline-title">
                                                                    <div className="content animated transition-all duration-300 ease-in-out">
                                                                        <div className="date font-medium">{CovertDate(event.startDate)[0]}</div>
                                                                        <div className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                                                    <div className="dot-wrapper justify-center flex items-center">
                                                                        <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="card-wrapper">
                                                                <div className="card-wrapper content-card cursor-pointer transition-all duration-300 ease-in-out relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.04)]">
                                                                    <Link className="event-link absolute inset-0 transition-all duration-300 ease-in-out cursor-pointer" underline="none">&nbsp;</Link>
                                                                    <div className="event-content gap-3 flex flex-col">
                                                                        <div className="info-and-cover flex-row-reverse gap-4 flex">
                                                                            <div className="cover-image pointer-events-none">
                                                                                <div className="w-40 h-20">
                                                                                    <div className="img-aspect-ratio cover-event-image w-full h-full overflow-hidden relative rounded-lg">
                                                                                        <Image className="w-full h-full" alt="you are invited" src={event.cover} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                                                                <div className="event-time gap-2 flex items-center">
                                                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                                                                        <span>
                                                                                            {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-xl">
                                                                                    <h3 className="inline text-xl font-medium break-words mt-0 mb-4">{event.name}</h3>
                                                                                </div>
                                                                                <div className="gap-1 flex flex-col">
                                                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                                                        <div className="icon text-base flex items-center">
                                                                                            &nbsp;
                                                                                            <MapPin className="w-4 h-4 block align-middle mt-0.5" />
                                                                                        </div>
                                                                                        <div className="text-base min-w-0">{event.addressName}</div>
                                                                                    </div>
                                                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                                                        <div className="icon text-base flex items-center">
                                                                                            &nbsp;
                                                                                            <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                                                                        </div>
                                                                                        <div className="text-base min-w-0">{event.totalGuest} Khách</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="event-bottom-bar flex justify-between items-center">
                                                                            <div className="gap-2 flex items-center">
                                                                                <Button
                                                                                    as={Link}
                                                                                    href={`/events/manage/${event.id}`}
                                                                                    className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                                                                >
                                                                                    <div className="label">Quản lý sự kiện</div>
                                                                                    <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                    <h3 className="text-2xl font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] p-0 mt-6 mb-0">Không có sự kiện</h3>
                                                    <div className="desc pl-12 pr-12 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] mt-2">Lịch này không có sự kiện gì đã diễn ra.</div>
                                                    <div className="mt-6 justify-center flex items-center">
                                                        <Button
                                                            as={Link}
                                                            href={`/create/?calendarId=${id}`}
                                                            type="button"
                                                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
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