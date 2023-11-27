"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
import { CalendarX, Frown, Plus } from "lucide-react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import { Skeleton } from "@nextui-org/skeleton";

export type Calendar = {
    code: string
    success: boolean
    result: Result[]
    pageInfo: any
}

export type Result = {
    sorted: number
    id: string
    name: string
    totalSubcriber: number
    avatar: string
    userId: string
    isSubcribed: boolean
}

export type CalendarSub = {
    code: string
    success: boolean
    result: ResultSub[]
    pageInfo: any
}

export type ResultSub = {
    id: string
    name: string
    totalSubcriber: number
    avatar: string
    userId: string
    sorted: number
}

export default function CalendarPage() {
    var [calendars, setCalendar] = useState<Calendar | null>(null);
    var [subscribeds, setSubscribed] = useState<CalendarSub | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const [loadingCalendar, setLoadingCalendar] = useState(true);
    const [loadingSubscribed, setLoadingSubscribed] = useState(true);


    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        if (typeof window !== 'undefined') {
            // Chỉ thực hiện đăng ký sự kiện khi chạy trên phía client
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }
    }, []);

    useEffect(() => {
        const fetchCalendar = async () => {
            try {
                const calendarData = await fetchWrapper.post('/api/Calendar/get-list', { pageNumber: 1, pageSize: 9999 });
                setCalendar(calendarData);
                setLoadingCalendar(false);
            } catch (error) {
                console.error('Error fetching calendar:', error);
                setLoadingCalendar(false);
            }
        };

        fetchCalendar();
    }, []);

    useEffect(() => {
        const fetchSubscribed = async () => {
            try {
                const subscribedData = await fetchWrapper.post('/api/Calendar/get-list-subscribed', { pageNumber: 1, pageSize: 9999 });
                setSubscribed(subscribedData);
                setLoadingSubscribed(false);
            } catch (error) {
                console.error('Error fetching subscribed calendar:', error);
                setLoadingSubscribed(false);
            }
        };

        fetchSubscribed();
    }, []);


    return (
        <div className="page-content">
            {isOnline ? (
                <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                    <div className="spread gap-2 mb-2 flex justify-between items-center">
                        <h1 className="tab-title text-4xl font-semibold text-black-light-theme mb-0 mt-0 dark:text-[#fff]">Lịch</h1>
                    </div>
                    <div className="zm-container pt-8 pl-0.5 pr-4 max-width-global margin-global">
                        {loadingCalendar ? (
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
                            <div className="can-divide with-divider medium">
                                <div className="section-title-wrapper">
                                    <div className="section-title-row mb-5 flex justify-between items-center">
                                        <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0 dark:text-[#fff]">Lịch của tôi</h2>
                                        <div className="right-element -mb-1">
                                            <Button
                                                className="bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                            >
                                                <Link
                                                    href="/create-calendar"
                                                    className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] "
                                                    underline="none"
                                                >
                                                    <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                    <div className="label">Tạo mới</div>
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="gap-3 flex flex-col">
                                    <div className="calendar-grid grid grid-auto-cols gap-3">
                                        {calendars ? (
                                            calendars.result.length > 0 ? (
                                                calendars.result.map((calendar, index) => (
                                                    <Link
                                                        key={calendar.id}
                                                        className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                                        underline="none"
                                                        href={`/calendars/manage/${calendar.id}`}
                                                    >
                                                        <div className="spread min-h-full flex justify-between flex-col">
                                                            <Image
                                                                width={48}
                                                                height={48}
                                                                radius="full"
                                                                alt="Donace"
                                                                src={calendar.avatar}
                                                            />
                                                            <div className="title font-medium text-lg mt-3 mb-1 text-black-light-theme dark:text-[#fff]">
                                                                {calendar.name}
                                                            </div>
                                                            <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                                                {calendar.totalSubcriber !== 0 ? (
                                                                    <p>{calendar.totalSubcriber} đăng ký</p>
                                                                ) : (
                                                                    <p>Không có người đăng ký</p>
                                                                )}
                                                            </div>
                                                            <div className="spread gap-2 mt-4 flex justify-between flex-wrap items-center">
                                                                <div className="text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Cá nhân</div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div
                                                    className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                                >
                                                    <div className="icon">
                                                        <div className="mb-0">
                                                            <CalendarX className="w-auto h-12 block align-middle text-foreground-500" />
                                                        </div>
                                                    </div>
                                                    <div className="title font-medium text-lg mt-3 mb-1 text-black-more-blur-light-theme dark:text-[#fff]">Không có lịch</div>
                                                    <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Bạn không phải là quản trị của lịch sự kiện.</div>
                                                </div>
                                            )
                                        ) : (
                                            <div
                                                className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                            >
                                                <div className="icon">
                                                    <div className="mb-0">
                                                        <CalendarX className="w-auto h-12 block align-middle text-foreground-500" />
                                                    </div>
                                                </div>
                                                <div className="title font-medium text-lg mt-3 mb-1 text-black-more-blur-light-theme dark:text-[#fff]">Không có lịch</div>
                                                <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Bạn không phải là quản trị của lịch sự kiện.</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {loadingSubscribed ? (
                            <div className="hidden"></div>
                        ) : (
                            <div className="can-divide with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)]">
                                <div className="section-title-wrapper medium">
                                    <div className="section-title-row mb-5 flex justify-between items-center">
                                        <h2 className="text-xl font-semibold text-text-black-light-theme mb-0 mt-0">Lịch đã đăng ký</h2>
                                        <div className="right-element -m-1"></div>
                                    </div>
                                </div>
                                <div className="calendar-grid grid grid-auto-cols gap-3">
                                    {subscribeds ? (
                                        subscribeds.result.length > 0 ? (
                                            subscribeds.result.map((subscribed, index) => (
                                                <Link
                                                    key={subscribed.id}
                                                    className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                                    underline="none"
                                                >
                                                    <div className="spread min-h-full flex justify-between flex-col">
                                                        <Image
                                                            width={48}
                                                            height={48}
                                                            radius="full"
                                                            alt="Donace"
                                                            src={subscribed.avatar}
                                                        />
                                                        <div className="title font-medium text-lg mt-3 mb-1 text-black-light-theme dark:text-[#fff]">
                                                            {subscribed.name}
                                                        </div>
                                                        <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                                            {subscribed.totalSubcriber !== 0 ? (
                                                                <p>{subscribed.totalSubcriber} đăng ký</p>
                                                            ) : (
                                                                <p>Không người đăng ký</p>
                                                            )}
                                                        </div>
                                                        <div className="spread gap-2 mt-4 flex justify-between flex-wrap items-center">
                                                            <div className="text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Personal</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div
                                                className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                            >
                                                <div className="icon">
                                                    <div className="mb-0">
                                                        <CalendarX className="w-auto h-12 block align-middle text-foreground-500" />
                                                    </div>
                                                </div>
                                                <div className="title font-medium text-lg mt-3 mb-1 text-black-more-blur-light-theme dark:text-[#fff]">Không có lịch đăng ký</div>
                                                <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Bạn chưa đăng ký lịch nào.</div>
                                            </div>
                                        )
                                    ) : (
                                        <div
                                            className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                        >
                                            <div className="icon">
                                                <div className="mb-0">
                                                    <CalendarX className="w-auto h-12 block align-middle text-foreground-500" />
                                                </div>
                                            </div>
                                            <div className="title font-medium text-lg mt-3 mb-1 text-black-more-blur-light-theme dark:text-[#fff]">Không có lịch đăng ký</div>
                                            <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Bạn chưa đăng ký lịch nào.</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div >
                </div>
            ) : (
                <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                    <div className="icon justify-center flex items-center">
                        <div className="">
                            <Frown className="w-64 h-auto align-middle text-gray-300 dark:text-gray-400" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-medium text-black-more-blur-light-theme p-0 mt-4 mb-0">Bị lỗi mạng</h3>
                    <div className="desc pl-12 pr-12 text-black-blur-light-theme mt-2">Chúng tôi nhận thấy rằng mạng đang có vấn đề. Xin vui lòng thử lại sau.</div>
                </div>
            )}
        </div >
    )
}