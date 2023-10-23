import React from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { CalendarClock, Plus } from "lucide-react";

export default function HomeEvents() {
    return (
        <div className="page-content">
            <div className="page-header opacity-[1] pt-12 pl-[1rem!important] pr-[1rem!important] max-w-4xl m-[0_auto]">
                <div className="spread gap-2 mb-[.5rem!important] flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Events</h1>
                    <div className="light lux-button min-w-[auto] p-0.5 overflow-hidden rounded-lg light:bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] ">
                        <div className="seggments grid grid-cols-2 relative">
                            <Button type="button" className="text-sm p-[0.25rem_0.5rem] relative justify-center cursor-pointer transition-global font-medium flex items-center m-0 bg-gray-200 border border-solid border-transparent leading-6">
                                <div className="light:text-[rgb(19,21,23)] dark:text-[#fff]">Upcoming</div>
                            </Button>
                            <Button type="button" className="text-xs p-[0.25rem_0.5rem] relative justify-center cursor-pointer transition-global font-medium flex items-center m-0 bg-transparent border border-solid border-transparent leading-6">
                                <div className="light:text-[rgb(19,21,23)] dark:text-[#fff]">Past</div>
                            </Button>
                        </div>
                        {/* <div className="slider pointer-events-none bg-[#fff2] rounded-lg w-4 shadow-lg absolute h-2 z-[1] transition-global"></div> */}
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
                        <CalendarClock className="w-64 h-auto align-middle text-gray-300 dark:text-gray-500" />
                    </div>
                </div>
                <h3 className="text-2xl font-medium light:text-[rgba(19,21,23,0.64)] dark:text-[hsla(0,0%,100%,.79)] p-[0!important] mt-20 mb-[0!important]">No Upcoming Events</h3>
                <div className="desc pl-12 pr-12 light:text-[hsla(0,0%,100%,.5)] mt-4 font-normal">You have no upcoming events. Why not host one?</div>
                <div className="button-create mt-6 justify-center flex">
                    <Link href="/create"
                        className="dark dark:text-[rgba(255,255,255,0.64)] dark:bg-[rgba(255,255,255,0.08)] text-[rgba(19,21,23,0.64)] bg-[rgba(19,21,23,0.04)] border-transparent border border-solid transition-global donace-button mt-4 flex items-center cursor-pointer">
                        <Plus className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle mt-0.5" />
                        <div className="label">Create Event</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}