"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight, CalendarClock, Frown, Fullscreen, MapPin, Plus, Users2 } from "lucide-react";
import "@/styles/globals.css";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export type Events = {
  totalCount: number;
  items: Item[];
}

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];


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
}


const demo_event: Events = {
  totalCount: 2,
  items: [
    {
      id: "1",
      startDate: "2022-02-01T10:00:00.000Z",
      endDate: "2022-02-01T12:00:00.000Z",
      addressName: "123 Main St, New York, NY",
      lat: "40.7128",
      long: "-74.0060",
      capacity: 50,
      isOverCapacity: false,
      cover: "https://example.com/event1.jpg",
      name: "Event 1",
      theme: "light",
      color: "#ffffff",
      fontSize: 16,
      instructions: "Please bring your own water bottle.",
      isMultiSection: false,
      duration: 120,
      totalGuest: 30,
      calendarId: "1",
      isLive: false,
    },
    {
      id: "2",
      startDate: "2024-02-15T14:00:00.000Z",
      endDate: "2022-02-15T16:00:00.000Z",
      addressName: "456 Elm St, Los Angeles, CA",
      lat: "34.0522",
      long: "-118.2437",
      capacity: 100,
      isOverCapacity: true,
      cover: "https://example.com/event2.jpg",
      name: "Event 2",
      theme: "dark",
      color: "#000000",
      fontSize: 18,
      instructions: "Please arrive 15 minutes early.",
      isMultiSection: true,
      duration: 180,
      totalGuest: 120,
      calendarId: "2",
      isLive: true,
    },
  ],

}


const CovertDate = (date: string) => {
  return date.split("T");
}

const DayOfWeek = (date: string) => {
  let currentDate = new Date(date).getDay();
  return daysOfWeek[currentDate]
}

export default function HomeEvents() {
  var [pastEvents, setPastEvents] = useState<Item[]>();
  var [futureEvents, setFutureEvents] = useState<Item[]>();
  const [isOnline, setIsOnline] = useState(true);

  function filterEvents(events: Events) {
    const now = new Date();
    const pastEvents = events.items.filter(event => new Date(event.startDate) < now);
    const futureEvents = events.items.filter(event => new Date(event.startDate) >= now);

    setPastEvents(pastEvents);
    setFutureEvents(futureEvents);
  }

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
    // uncomment khi có dữ liệu từ api
    // fetchWrapper.get('/api/Event?PageSize=9999')
    //   .then(data => filterEvents(data));


    // // Xóa khi có dữ liệu từ api
    filterEvents(demo_event);
    console.log(futureEvents);
    console.log(pastEvents);
  }, []);

  return (
    <div className="page-content">
      {isOnline ? (
        <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
          <div className="spread gap-2 mb-2 flex justify-between items-center">
            <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Sự kiện</h1>
          </div>
          <div className="flex-col flex gap-2">
            <Tabs aria-label="Options" >
              <Tab key="future" title="Sắp tới">
                <div className="zm-container p-[2rem_1rem_1rem] max-width-global margin-global">
                  {demo_event ? (
                    <div className="timeline">
                      {futureEvents?.map((event, index) => (
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
                                          <span>{CovertDate(event.startDate)[1]}</span>
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
                                        href="/user/user-join-event"
                                        className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                      >
                                        <Fullscreen className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                        <div className="label">Check In</div>
                                      </Button>
                                      <Button as={Link} href="my-event" className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                        <div className="label">Quản lý sự kiện</div>
                                        <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                      </Button>
                                      <div className="flex items-center">
                                        <div className="head relative flex items-start">
                                          <Avatar radius="full" src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]" />
                                        </div>
                                      </div>
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
              <Tab key="past" title="Đã qua">
                <div className="zm-container p-[2rem_1rem_1rem] max-width-global margin-global">
                  {demo_event ? (
                    <div className="timeline">
                      {pastEvents?.map((event, index) => (
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
                                          <span>{CovertDate(event.startDate)[1]}</span>
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
                                      <Button as={Link} href="my-event" className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                        <div className="label">Quản lý sự kiện</div>
                                        <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                      </Button>
                                      <div className="flex items-center">
                                        <div className="head relative flex items-start">
                                          <Avatar radius="full" src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]" />
                                        </div>
                                      </div>
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
          </div>
        </div>
      ) : (
        <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
          <div className="icon justify-center flex items-center">
            <div className="">
              <Frown className="w-64 h-auto align-middle text-gray-300 dark:text-gray-400"/>
            </div>
          </div>
          <h3 className="text-2xl font-medium text-black-more-blur-light-theme p-0 mt-4 mb-0">Bị lỗi mạng</h3>
          <div className="desc pl-12 pr-12 text-black-blur-light-theme mt-2">Chúng tôi nhận thấy rằng mạng đang có vấn đề. Xin vui lòng thử lại sau.</div>
        </div>
      )}
    </div>
  );
}
