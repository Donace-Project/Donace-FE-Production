import { Avatar } from "@nextui-org/avatar";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowUpRight, CalendarX2, Plus } from "lucide-react";

export default function CalendarManage() {
    return (
        <div className="page-content">
            <div className="page-header opacity-[2] pl-4 pr-4 pt-12 max-width-global margin-global">
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold text-black-light-theme mb-0">
                        <div className="gap-3 flex items-center">
                            <div className="avatar-square">
                                <Avatar
                                    radius="sm"
                                    src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                    name="Donace"
                                    className="relative w-6 h-6 mt-1"
                                />
                            </div>
                            <div>Donace</div>
                        </div>
                    </h1>
                    <Link
                        href="/calendars/details"
                        target="_blank"
                        className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                        underline="none"
                    >
                        <div className="label">Calendar Page</div>
                        <ArrowUpRight className="ml-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                    </Link>
                </div>
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                            <div className="side-padding"></div>
                            <Link
                                href="/calendar/manage"
                                className="text-black-light-theme border-b-2 border-solid border-[rgb(19,21,23)] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Events
                            </Link>
                            <Link
                                href="/calendar/manage"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                People
                            </Link>
                            <Link
                                href="/calendar/manage"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Newletters
                            </Link>
                            <Link
                                href="/calendar/manage"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Insights
                            </Link>
                            <Link
                                href="/calendar/manage"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">
                                <div className="section-title gap-2 flex items-center">
                                    <span>Events</span>
                                    <Button
                                        aria-label="Add Event"
                                        type="button"
                                        className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] p-[0.1875rem] border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                        size="sm"
                                    >
                                        <Plus className="stroke-2 w-3.5 h-3.5 block align-middle" />
                                    </Button>
                                </div>
                            </h2>
                            <div className="right-element m-[-.25rem_0]">
                                <div className="lux-button min-w-[auto] p-0.5 overflow-hidden rounded-lg">
                                    <ButtonGroup className="seggments relative grid grid-cols-2">
                                        <Button
                                            as={Link}
                                            href=""
                                            type="button"
                                            className="text-sm text-black-light-theme relative rounded-none justify-center cursor-pointer transition-all duration-300 ease-in-out font-medium flex items-center bg-[#fff] dark:text-[#fff] dark:bg-[#fff2] shadow-xl"
                                        >
                                            <div className="">Sắp tới</div>
                                        </Button>
                                        <Button
                                            as={Link}
                                            href=""
                                            type="button"
                                            className="text-sm relative text-black-blur-light-theme rounded-none justify-center cursor-pointer transition-all duration-300 ease-in-out font-medium flex items-center bg-[rgba(19,21,23,0.04)] dark:text-[hsla(0,0%,100%,.5)] dark:bg-[rgba(255,255,255,0.08)]"
                                        >
                                            <div>Đã qua</div>
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-container">
                        <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                            <div className="icon justify-center flex items-center">
                                <div className="mb-2">
                                    <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-medium text-black-more-blur-light-theme p-0 mt-6 mb-0">No Events</h3>
                            <div className="desc pl-12 pr-12 text-black-blur-light-theme">This calendar has no upcoming events.</div>
                            <div className="mt-6 justify-center flex items-center">
                                <Button
                                    type="button"
                                    className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                >
                                    <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle"/>
                                    <div className="label">Add Event</div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}