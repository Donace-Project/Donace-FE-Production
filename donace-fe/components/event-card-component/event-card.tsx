"use client"
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { Link, Radio, MapPin, Users2, ScanLine, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AMorPM, ConvertDateTime } from "../clock/cover-data-time";
import { EventDetailSorted } from "@/types/DonaceType";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import donace from "@/public/doanLogo.png";

interface EventCardProps {
    event: EventDetailSorted;
}

const EventCard = ({ event }: EventCardProps) => {

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
        <div className="w-full">
            <div className="card-wrapper">
                <div className="card-wrapper content-card transition-all duration-300 ease-in-out rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.04)]">
                    <div className="event-content gap-3 flex flex-col">
                        <div className="info-and-cover flex-col md:flex-row-reverse gap-4 flex">
                            <Link href={`${event.isHost ? `/events/manage/${event.id}` : `/user/join-event/${event.id}`}`} className="block">
                                <div className="aspect-square  md:w-40 md:h-40 rounded-lg">
                                    <Image as={NextImage} className="block w-full h-full object-cover" alt="you are invited" width={400} height={400} src={event.cover ? event.cover : donace.src} />
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
                                    <div className="truncate text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] ">
                                        <span>
                                            {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute} {AMorPM().buoi}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xl whitespace-nowrap">
                                    <h3 className="font-medium break-words mt-0 mb-4">{event.name}</h3>
                                </div>
                                <div className="gap-1 flex flex-col">
                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start whitespace-nowrap md:w-[350px]">
                                        <div className="icon text-base flex items-center">
                                            &nbsp;
                                            <MapPin className="w-4 h-4 block align-middle" />
                                        </div>
                                        <div className="text-base max-w-[350px] truncate">{event.addressName}</div>
                                    </div>
                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start whitespace-nowrap">
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
                                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                        >
                                            <div className="label">Check In</div>
                                            <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                        </Button>
                                        <Button as={Link} href={`/events/manage/${event.id}`} className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                            <div className="label">Quản lý sự kiện</div>
                                            <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                        </Button>
                                    </div>
                                    :
                                    <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                        <Button
                                            onClick={() => { openModalGenQr(); }}
                                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                        >
                                            <div className="label">Xem mã QR</div>
                                            <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                        </Button>
                                        <Button as={Link} href={`/user/join-event/${event.id}`} className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
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
    )

}

export {
    EventCard
}