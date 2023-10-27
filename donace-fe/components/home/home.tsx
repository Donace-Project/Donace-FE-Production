import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { CalendarClock, Plus } from "lucide-react";
import "@/styles/globals.css";


export default function HomeEvents() {
    return (
        <div className="page-content">
            <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Events</h1>
                    <div className="light lux-button min-w-[auto] p-0.5 overflow-hidden rounded-lg">
                        <ButtonGroup className="seggments relative grid grid-cols-2">
                            <Button as={Link} href="" type="button" className="text-sm text-black-light-theme relative rounded-none justify-center cursor-pointer transition-all duration-300 ease-in-out font-medium flex items-center bg-[#fff] dark:text-[#fff] dark:bg-[#fff2] shadow-xl">
                                <div className="">Upcoming</div>
                            </Button>
                            <Button as={Link} href="/home-past-event" type="button" className="text-sm relative text-black-blur-light-theme rounded-none justify-center cursor-pointer transition-all duration-300 ease-in-out font-medium flex items-center bg-[rgba(19,21,23,0.04)] dark:text-[hsla(0,0%,100%,.5)] dark:bg-[rgba(255,255,255,0.08)]">
                                <div className="">Past</div>
                            </Button>
                        </ButtonGroup>
                        {/* <div className="seggments relative dark:bg-white">
                        </div> */}
                    </div>
                </div>
                <div></div>
            </div>
            <div className="zm-container p-4 pt-8 max-width-global m-[0_auto]">
                <div className="load-more-observer"></div>
                <div className="min-h-[1]"></div>
            </div>
            <div className="large text-center mt-16 mb-[3rem!important] flex flex-col items-center">
                <div className="icon justify-center flex items-center">
                    <div className="mb-[-40px]">
                        <CalendarClock className="w-64 h-auto align-middle text-gray-300 dark:text-gray-400" />
                    </div>
                </div>
                <h3 className="text-2xl font-medium text-[rgba(19,21,23,0.64)] dark:text-[hsla(0,0%,100%,.79)] p-[0!important] mt-20 mb-[0!important]">No Upcoming Events</h3>
                <div className="desc pl-12 pr-12 light:text-[hsla(0,0%,100%,.5)] mt-4 font-normal">You have no upcoming events. Why not host one?</div>
                <div className="button-create mt-6 justify-center flex">
                    <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]" >
                        <Link href="/create" className="text-black-blur-light-theme dark:text-[rgba(255,255,255,0.64)]">
                            <Plus className=" mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle mt-0.5" />
                            <div className="label">Create Event</div>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}