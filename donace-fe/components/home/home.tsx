"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight, CalendarClock, Frown, MapPin, Plus, Radio, ScanLine, Users2 } from "lucide-react";
import "@/styles/globals.css";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Image } from "@nextui-org/image";
import { Tabs, Tab, Divider, useDisclosure } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";
// import { EventCard } from "@/components/event-card-component/event-card";
import { AMorPM, ConvertDateTime } from "../clock/cover-data-time";
import { EventDetailSorted } from "@/types/DonaceType";

import donace from "@/public/doanLogo.png";
import { DayOfWeek, CovertDate } from "../clock/day-of-week";


export default function HomeEvents() {

  var [futureEvents, setFutureEvents] = useState<EventDetailSorted[]>();
  var [pastEvents, setPastEvents] = useState<EventDetailSorted[]>();

  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);

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

  const fetchEvents = async () => {
    try {
      const futureEventsData = await fetchWrapper.get(`api/Event?IsNew=${true}`);
      setFutureEvents(futureEventsData.items);

      const pastEventsData = await fetchWrapper.get(`api/Event?IsNew=${false}`);
      setPastEvents(pastEventsData.items);

    } catch (error) {
      console.error('Error fetching events:', error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  //QR generator
  const modalViewTicket = useDisclosure();
  const [ticketIdForQr, setTicketIdForQr] = useState<string>("");

  const handleQrGenerator = async () => {
    if (ticketIdForQr == "") {
      let ticketId = await fetchWrapper.get("/api/UserTickets/get-ticket")
      if (ticketId != null) {
        setTicketIdForQr(ticketId)
      }
      else {
        console.log("some bug")
      }
    }
  }

  const openModalGenQr = () => {
    handleQrGenerator();
    modalViewTicket.onOpen();
  }

  return (
    <div className="page-content">
      {isOnline ? (
        <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
          <div className="spread gap-2 mb-2 flex justify-between items-center">
            <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Sự kiện</h1>
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
              <Tabs aria-label="Options" >
                <Tab key="future" title="Sắp tới" className="font-semibold">
                  <div className="zm-container  max-width-global margin-global">
                    {futureEvents && futureEvents.length > 0 ? (
                      <div className="timeline">
                        {futureEvents?.map((event, index) => (
                          <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                            {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                            <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                              <div className="container">
                                <div className="timeline-title">
                                  <div className="content animated transition-all duration-300 ease-in-out">
                                    <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                    <div className="text-foreground">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
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
                            <div className="w-full">
                              <div className="card-wrapper">
                                <div className="card-wrapper content-card transition-all duration-300 ease-in-out rounded-xl bg-background bg-opacity-40 border border-solid border-opacity-50 border-background">
                                  <div className="event-content gap-3 flex flex-col">
                                    <div className="info-and-cover flex-col md:flex-row-reverse gap-4 flex">
                                      <Link href={`${event.isHost ? `/events/manage/${event.id}` : `/user/join-event/${event.id}`}`} className="block">
                                        <div className="aspect-square  md:w-40 md:h-40 rounded-lg">
                                          <Image className="block w-full h-full object-cover" alt="you are invited" width={400} height={400} src={event.cover ? event.cover : donace.src} />
                                        </div>
                                      </Link>
                                      <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                        <div className="event-time gap-2 flex items-center">
                                          {event.isLive ? (
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
                                                <Radio className="translate-y-px mr-2 w-4 h-4 block align-middle" />
                                                LIVE
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="hidden"></div>
                                          )}
                                          <div className="truncate text-foreground  ">
                                            <span>
                                              {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute} {AMorPM().buoi}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-xl whitespace-nowrap">
                                          <h3 className="font-medium break-words mt-0 mb-4">{event.name}</h3>
                                        </div>
                                        <div className="gap-1 flex flex-col">
                                          <div className="attribute text-base text-foreground  gap-3 flex items-start whitespace-nowrap w-full">
                                            <div className="icon text-base flex items-center">
                                              &nbsp;
                                              <MapPin className="w-4 h-4 block align-middle" />
                                            </div>
                                            <div className="text-base max-w-[350px] truncate">{event.addressName}</div>
                                          </div>
                                          <div className="attribute text-base text-foreground gap-3 flex items-start whitespace-nowrap">
                                            <div className="icon text-base flex items-center">
                                              &nbsp;
                                              <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                            </div>
                                            <div className="text-base min-w-0 ">{event.totalGuest} Khách</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="event-bottom-bar flex justify-between items-center">
                                      {
                                        event.isHost ?
                                          <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                            <Button
                                              as={Link}
                                              href={`/user/join-event/${event.id}`}
                                              className="bg-background bg-opacity-50 text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                            >
                                              <div className="label">Check In</div>
                                              <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                            </Button>
                                            <Button as={Link} href={`/events/manage/${event.id}`} className="bg-background bg-opacity-50 text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                              <div className="label">Quản lý sự kiện</div>
                                              <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                            </Button>
                                          </div>
                                          :
                                          <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                            <Button
                                              onClick={() => { openModalGenQr(); }}
                                              className="bg-background bg-opacity-50 text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                            >
                                              <div className="label">Xem mã QR</div>
                                              <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                            </Button>
                                            <Button as={Link} href={`/user/join-event/${event.id}`} className="bg-background bg-opacity-50 text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                              <div className="label">Xem sự kiện</div>
                                              <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                            </Button>
                                          </div>
                                      }

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
                            <CalendarClock className="w-64 h-auto align-middle text-foreground-700" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-medium text-foreground-700 mt-20">
                          Không có sự kiện gì sắp tới
                        </h3>
                        <div className="desc pl-12 pr-12 text-foreground-700 mt-4 font-normal">
                          Bạn không có sự kiện gì sắp tới. Muốn thử không?
                        </div>
                        <div className="button-create mt-6 justify-center flex">
                          <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-opacity-50 bg-background">
                            <Link
                              href="/create"
                              className="text-foreground-700"
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
                  <div className="zm-container  max-width-global margin-global">
                    {pastEvents && pastEvents.length > 0 ? (
                      <div className="timeline">
                        {pastEvents?.map((event, index) => (
                          <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                            {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                            <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                              <div className="container">
                                <div className="timeline-title">
                                  <div className="content animated transition-all duration-300 ease-in-out">
                                    <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                    <div className="text-foreground">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
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
                            <div className="w-full">
                              <div className="card-wrapper">
                                <div className="card-wrapper content-card transition-all duration-300 ease-in-out rounded-xl bg-background bg-opacity-40 border border-solid border-opacity-50 border-background">
                                  <div className="event-content gap-3 flex flex-col">
                                    <div className="info-and-cover flex-col md:flex-row-reverse gap-4 flex">
                                      <Link href={`${event.isHost ? `/events/manage/${event.id}` : `/user/join-event/${event.id}`}`} className="block">
                                        <div className="aspect-square  md:w-40 md:h-40 rounded-lg">
                                          <Image className="block w-full h-full object-cover" alt="you are invited" width={400} height={400} src={event.cover ? event.cover : donace.src} />
                                        </div>
                                      </Link>
                                      <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                        <div className="event-time gap-2 flex items-center">
                                          {event.isLive ? (
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
                                                <Radio className="translate-y-px mr-2 w-4 h-4 block align-middle" />
                                                LIVE
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="hidden"></div>
                                          )}
                                          <div className="truncate text-foreground  ">
                                            <span>
                                              {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute} {AMorPM().buoi}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-xl whitespace-nowrap">
                                          <h3 className="font-medium break-words mt-0 mb-4">{event.name}</h3>
                                        </div>
                                        <div className="gap-1 flex flex-col">
                                          <div className="attribute text-base text-foreground  gap-3 flex items-start whitespace-nowrap w-full">
                                            <div className="icon text-base flex items-center">
                                              &nbsp;
                                              <MapPin className="w-4 h-4 block align-middle" />
                                            </div>
                                            <div className="text-base max-w-[350px] truncate">{event.addressName}</div>
                                          </div>
                                          <div className="attribute text-base text-foreground gap-3 flex items-start whitespace-nowrap">
                                            <div className="icon text-base flex items-center">
                                              &nbsp;
                                              <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                            </div>
                                            <div className="text-base min-w-0 ">{event.totalGuest} Khách</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="event-bottom-bar flex justify-between items-center">

                                      <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                        <Button
                                          as={Link}
                                          href={`/user/join-event/${event.id}`}
                                          className="bg-background bg-opacity-50 text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                        >
                                          <div className="label">Xem sự kiện</div>
                                          <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                        </Button>
                                        <Button as={Link} href={`/events/manage/${event.id}`} className="bg-background bg-opacity-50 text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
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
                      <div className="large text-center my-12 flex flex-col items-center">
                        <div className="icon justify-center flex items-center">
                          <div className="mb-[-40px]">
                            <CalendarClock className="w-64 h-auto align-middle text-foreground-700" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-medium text-foreground-700 p-[0!important] mt-20 mb-[0!important]">
                          Không có sự kiện gì sắp tới
                        </h3>
                        <div className="desc p-12 text-foreground-700 mt-4 font-normal">
                          Bạn không có sự kiện gì sắp tới. Muốn thử không?
                        </div>
                        <div className="button-create mt-6 justify-center flex">
                          <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-opacity-50 bg-background">
                            <Link
                              href="/create"
                              className="text-foreground-700"
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
              <Frown className="w-64 h-auto align-middle text-foreground-700" />
            </div>
          </div>
          <h3 className="text-2xl font-medium text-foreground-900 p-0 mt-4 mb-0">Bị lỗi mạng</h3>
          <div className="desc pl-12 pr-12 text-foreground-900 mt-2">Chúng tôi nhận thấy rằng mạng đang có vấn đề. Xin vui lòng thử lại sau.</div>
        </div>
      )}
    </div>
  );
}
