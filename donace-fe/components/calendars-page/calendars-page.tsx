"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
import { CalendarX, Plus } from "lucide-react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { fetchWrapper } from '../../helpers/fetch-wrapper'
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

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

    useEffect(() => {
        fetchWrapper.post('/api/Calendar/get-list', { pageNumber: 1, pageSize: 999 })
            .then(data => setCalendar(data))
    }, []);

    useEffect(() => {
        fetchWrapper.post('/api/Calendar/get-list-subcribed', { pageNumber: 1, pageSize: 999 })
            .then(data => setSubscribed(data))
    }, []);


    return (
        <div className="page-content">
            <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold text-black-light-theme mb-0 mt-0 dark:text-[#fff]">Calendars</h1>
                </div>
            </div>
            <div className="zm-container pt-8 pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0 dark:text-[#fff]">My Calendars</h2>
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
                                        <div className="label">Create</div>
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
                                            key={index}
                                            className="p-[1rem_1rem_0.875rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                            underline="none"
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
                                                        <p>{calendar.totalSubcriber} Subscribers</p>
                                                    ) : (
                                                        <p>No Calendars</p>
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
                                        <div className="title font-medium text-lg mt-3 mb-1 text-black-more-blur-light-theme dark:text-[#fff]">No Calendars</div>
                                        <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">You are not an admin of any calendars.</div>
                                    </div>
                                )
                            ) : (
                                <Card className="w-[200px] space-y-5 p-4" radius="lg">
                                    <Skeleton className="rounded-lg">
                                        <div className="h-24 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                    <div className="space-y-3">
                                        <Skeleton className="w-3/5 rounded-lg">
                                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="w-4/5 rounded-lg">
                                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="w-2/5 rounded-lg">
                                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
                <div className="can-divide with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)]">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-text-black-light-theme mb-0 mt-0">Subscribed Calendars</h2>
                            <div className="right-element -m-1"></div>
                        </div>
                    </div>
                    <div className="calendar-grid grid grid-auto-cols gap-3">
                        {subscribeds ? (
                            subscribeds.result.length > 0 ? (
                                subscribeds.result.map((subscribed, index) => (
                                    <Link
                                        key={index}
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
                                                    <p>{subscribed.totalSubcriber} Subscribers</p>
                                                ) : (
                                                    <p>No Subscribers</p>
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
                                    <div className="title font-medium text-lg mt-3 mb-1 text-black-more-blur-light-theme dark:text-[#fff]">No Subscriptions</div>
                                    <div className="text-tertiary-alpha text-sm text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">You have not subscribed to any calendars.</div>
                                </div>
                            )
                        ) : (
                            <Card className="w-[200px] space-y-5 p-4" radius="lg">
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">
                                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </Card>
                        )}
                    </div>
                </div >
            </div >
        </div >
    )
}