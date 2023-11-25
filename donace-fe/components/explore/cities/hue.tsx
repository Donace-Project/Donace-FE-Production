"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Skeleton } from "@nextui-org/skeleton";
import {
  ArrowRight,
  CalendarClock,
  Frown,
  MapPin,
  Plus,
  ScanLine,
  Users2,
} from "lucide-react";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Tabs, Tab, Card } from "@nextui-org/react";

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
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return { year, month, day, hour, minute };
};

export type Events = {
  totalCount: number;
  items: Item[];
};

const daysOfWeek = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

export type Item = {
  id: string;
  startDate: string;
  endDate: string;
  addressName: string;
  lat: string;
  long: string;
  capacity: number;
  isOverCapacity: boolean;
  cover: string;
  name: string;
  theme: string;
  color: string;
  fontSize: number;
  instructions: string;
  isMultiSection: boolean;
  duration: number;
  totalGuest: number;
  calendarId: string;
  isLive: boolean;
};

const CovertDate = (date: string) => {
  return date.split("T");
};

const DayOfWeek = (date: string) => {
  let currentDate = new Date(date).getDay();
  return daysOfWeek[currentDate];
};

const currentDate = new Date();
const currentDateFormatted = currentDate
  .toLocaleDateString("en-US")
  .replace(/\//g, "-");
currentDate.setDate(currentDate.getDate() - 1);
const pastDateFormatted = currentDate
  .toLocaleString("en-US")
  .replace(/\//g, "-");

export default function Hue() {
  var [pastEvents, setPastEvents] = useState<Item[]>();
  var [futureEvents, setFutureEvents] = useState<Item[]>();
  const [isOnline, setIsOnline] = useState(true);
  const [thoiGian, setThoiGian] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    if (typeof window !== "undefined") {
      // Chỉ thực hiện đăng ký sự kiện khi chạy trên phía client
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  // useEffect(() => {
  //   fetchWrapper.get(`/api/Event?FromDate=${currentDateFormatted}&ToDate=12-31-9998&PageNumber=1&PageSize=9999`)
  //     .then(data => setFutureEvents(data.items));

  //   fetchWrapper.get(`/api/Event?FromDate=01-01-1996&ToDate=${pastDateFormatted}&PageNumber=1&PageSize=9999`)
  //     .then(data => setPastEvents(data.items));
  // }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const futureEventsData = await fetchWrapper.get(
          `/api/Event?FromDate=${currentDateFormatted}&ToDate=12-31-9998&PageNumber=1&PageSize=9999`
        );
        setFutureEvents(futureEventsData.items);
        setLoading(false);

        const pastEventsData = await fetchWrapper.get(
          `/api/Event?FromDate=01-01-1996&ToDate=${pastDateFormatted}&PageNumber=1&PageSize=9999`
        );
        setPastEvents(pastEventsData.items);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const gio = thoiGian.getHours();
  const buoi = gio >= 12 ? "PM" : "AM";
  return (
    <div className="panel ">
      <div className=" h-[400px] bg-gradient-to-r from-rose-300 to-amber-300 ">
        <div className="head w-[800px] m-auto h-[100%] grid grid-cols-2  overflow-hidden">
          <div className="text z-50 grid grid-cols-1 content-center">
            <h1 className="text-3xl font-medium text-[rgba(19,21,23,0.36)] dark:text-[hsla(0,0%,100%,.5)] mt-0 mb-4">
              Những sự kiện ở
            </h1>
            <h1
              id="title"
              className="text-4xl font-semibold text-[rgb(19,21,23)] dark:text-[#fff] mb-0 mt-0"
            >
              Huế
            </h1>
          </div>
          <div className="img grid-cols-2">
            <img
              src="https://res.cloudinary.com/deupkdvle/image/upload/v1699611051/hue-vietnam-travel-itinerary-02-removebg-preview_bdk81t.png"
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
      <div className="page-content">
        {isOnline ? (
          <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
            <div className="spread gap-2 mb-2 flex justify-between items-center">
              <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">
                Sự kiện
              </h1>
            </div>
            <div className="flex-col flex gap-2">
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
                <Tabs aria-label="Options">
                  <Tab key="future" title="Sắp tới" className="font-semibold">
                    <div className="zm-container p-[2rem_1rem_1rem] max-width-global margin-global">
                      {futureEvents && futureEvents.length > 0 ? (
                        <div className="timeline">
                          {futureEvents?.map((event, index) => (
                            <div
                              key={index}
                              className="timeline-section relative flex w-full gap-16 pb-12"
                            >
                              <div className="line left-[calc(7rem+4rem/2)] dark:border-[rgba(255,255,255,0.08)]"></div>
                              <div className="title always relative w-28">
                                <div className="container sticky">
                                  <div className="timeline-title">
                                    <div className="content animated transition-all duration-300 ease-in-out">
                                      <div className="date font-medium">
                                        {CovertDate(event.startDate)[0]}
                                      </div>
                                      <div className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                        {DayOfWeek(
                                          CovertDate(event.startDate)[0]
                                        )}
                                      </div>
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
                                    <Link
                                      className="event-link absolute inset-0 transition-all duration-300 ease-in-out cursor-pointer"
                                      underline="none"
                                    >
                                      &nbsp;
                                    </Link>
                                    <div className="event-content gap-3 flex flex-col">
                                      <div className="info-and-cover flex-row-reverse gap-4 flex">
                                        <div className="cover-image pointer-events-none">
                                          <div className="w-40 h-20">
                                            <div className="img-aspect-ratio cover-event-image w-full h-full overflow-hidden relative rounded-lg">
                                              <Image
                                                className="w-full h-full"
                                                alt="you are invited"
                                                src={event.cover}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                          <div className="event-time gap-2 flex items-center">
                                            {event.isLive ? (
                                              <div>
                                                <div
                                                  className="live-badge text-[#ff9641] flex items-center font-medium"
                                                  style={{
                                                    animationName: "breath",
                                                    animationDuration: "2s",
                                                    animationTimingFunction:
                                                      "ease",
                                                    animationDelay: "0s",
                                                    animationIterationCount:
                                                      "infinite",
                                                    animationDirection:
                                                      "normal",
                                                    animationFillMode: "none",
                                                    animationPlayState:
                                                      "running",
                                                  }}
                                                >
                                                  LIVE
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="hidden"></div>
                                            )}
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                              <span>
                                                {
                                                  ConvertDateTime(
                                                    event.startDate
                                                  ).hour
                                                }
                                                :
                                                {
                                                  ConvertDateTime(
                                                    event.startDate
                                                  ).minute
                                                }{" "}
                                                {buoi}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="text-xl">
                                            <h3 className="inline text-xl font-medium break-words mt-0 mb-4">
                                              {event.name}
                                            </h3>
                                          </div>
                                          <div className="gap-1 flex flex-col">
                                            <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                              <div className="icon text-base flex items-center">
                                                &nbsp;
                                                <MapPin className="w-4 h-4 block align-middle mt-0.5" />
                                              </div>
                                              <div className="text-base min-w-0">
                                                {event.addressName}
                                              </div>
                                            </div>
                                            <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                              <div className="icon text-base flex items-center">
                                                &nbsp;
                                                <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                              </div>
                                              <div className="text-base min-w-0">
                                                {event.totalGuest} Khách
                                              </div>
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
                                            <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                            <div className="label">
                                              Check In
                                            </div>
                                          </Button>
                                          <Button
                                            as={Link}
                                            href={`/events/manage/${event.id}`}
                                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                          >
                                            <div className="label">
                                              Quản lý sự kiện
                                            </div>
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
                        <div className="large text-center mt-16 mb-[3rem!important] flex flex-col items-center">
                          <div className="icon justify-center flex items-center">
                            <div className="mb-[-40px]">
                              <CalendarClock className="w-64 h-auto align-middle text-gray-300 dark:text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-medium text-[rgba(19,21,23,0.64)] dark:text-[hsla(0,0%,100%,.79)] p-[0!important] mt-20 mb-[0!important]">
                            Không có sự kiện gì sắp tới
                          </h3>
                          <div className="desc pl-12 pr-12 light:text-[hsla(0,0%,100%,.5)] mt-4 font-normal">
                            Bạn không có sự kiện gì sắp tới. Muốn thử không?
                          </div>
                          <div className="button-create mt-6 justify-center flex">
                            <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]">
                              <Link
                                href="/create"
                                className="text-black-blur-light-theme dark:text-[rgba(255,255,255,0.64)]"
                              >
                                <Plus className=" mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle mt-0.5" />
                                <div className="label">Tạo sự kiện</div>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab>
                  <Tab key="past" title="Đã qua" className="font-semibold">
                    <div className="zm-container p-[2rem_1rem_1rem] max-width-global margin-global">
                      {pastEvents && pastEvents.length > 0 ? (
                        <div className="timeline">
                          {pastEvents?.map((event, index) => (
                            <div
                              key={index}
                              className="timeline-section relative flex w-full gap-16 pb-12"
                            >
                              <div className="line left-[calc(7rem+4rem/2)] dark:border-[rgba(255,255,255,0.08)]"></div>
                              <div className="title always relative w-28">
                                <div className="container sticky">
                                  <div className="timeline-title">
                                    <div className="content animated transition-all duration-300 ease-in-out">
                                      <div className="date font-medium">
                                        {CovertDate(event.startDate)[0]}
                                      </div>
                                      <div className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                        {DayOfWeek(
                                          CovertDate(event.startDate)[0]
                                        )}
                                      </div>
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
                                    <Link
                                      className="event-link absolute inset-0 transition-all duration-300 ease-in-out cursor-pointer"
                                      underline="none"
                                    >
                                      &nbsp;
                                    </Link>
                                    <div className="event-content gap-3 flex flex-col">
                                      <div className="info-and-cover flex-row-reverse gap-4 flex">
                                        <div className="cover-image pointer-events-none">
                                          <div className="w-40 h-20">
                                            <div className="img-aspect-ratio cover-event-image w-full h-full overflow-hidden relative rounded-lg">
                                              <Image
                                                className="w-full h-full"
                                                alt="you are invited"
                                                src={event.cover}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                          <div className="event-time gap-2 flex items-center">
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                              <span>
                                                {
                                                  ConvertDateTime(
                                                    event.startDate
                                                  ).hour
                                                }
                                                :
                                                {
                                                  ConvertDateTime(
                                                    event.startDate
                                                  ).minute
                                                }{" "}
                                                {buoi}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="text-xl">
                                            <h3 className="inline text-xl font-medium break-words mt-0 mb-4">
                                              {event.name}
                                            </h3>
                                          </div>
                                          <div className="gap-1 flex flex-col">
                                            <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                              <div className="icon text-base flex items-center">
                                                &nbsp;
                                                <MapPin className="w-4 h-4 block align-middle mt-0.5" />
                                              </div>
                                              <div className="text-base min-w-0">
                                                {event.addressName}
                                              </div>
                                            </div>
                                            <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                              <div className="icon text-base flex items-center">
                                                &nbsp;
                                                <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                              </div>
                                              <div className="text-base min-w-0">
                                                {event.totalGuest} Khách
                                              </div>
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
                                            <div className="label">
                                              Quản lý sự kiện
                                            </div>
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
                        <div className="large text-center mt-16 mb-[3rem!important] flex flex-col items-center">
                          <div className="icon justify-center flex items-center">
                            <div className="mb-[-40px]">
                              <CalendarClock className="w-64 h-auto align-middle text-gray-300 dark:text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-medium text-[rgba(19,21,23,0.64)] dark:text-[hsla(0,0%,100%,.79)] p-[0!important] mt-20 mb-[0!important]">
                            Không có sự kiện gì sắp tới
                          </h3>
                          <div className="desc pl-12 pr-12 light:text-[hsla(0,0%,100%,.5)] mt-4 font-normal">
                            Bạn không có sự kiện gì sắp tới. Muốn thử không?
                          </div>
                          <div className="button-create mt-6 justify-center flex">
                            <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]">
                              <Link
                                href="/create"
                                className="text-black-blur-light-theme dark:text-[rgba(255,255,255,0.64)]"
                              >
                                <Plus className=" mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle mt-0.5" />
                                <div className="label">Tạo sự kiện</div>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              )}
            </div>
          </div>
        ) : (
          <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
            <div className="icon justify-center flex items-center">
              <div className="">
                <Frown className="w-64 h-auto align-middle text-gray-300 dark:text-gray-400" />
              </div>
            </div>
            <h3 className="text-2xl font-medium text-black-more-blur-light-theme p-0 mt-4 mb-0">
              Bị lỗi mạng
            </h3>
            <div className="desc pl-12 pr-12 text-black-blur-light-theme mt-2">
              Chúng tôi nhận thấy rằng mạng đang có vấn đề. Xin vui lòng thử lại
              sau.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
