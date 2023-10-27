import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { ArrowRight, MapPin, Users2 } from "lucide-react";
import { Avatar } from "@nextui-org/avatar";

export default function HomePastEvent() {
    return (
        <div className="page-content">
            <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Events</h1>
                    <div className="light lux-button min-w-[auto] p-0.5 overflow-hidden rounded-lg">
                        <ButtonGroup className="seggments relative grid grid-cols-2">
                            <Button as={Link} href="/home" type="button" className="text-sm text-black-blur-light-theme relative rounded-none justify-center cursor-pointer transition-all duration-300 ease-in-out font-medium flex items-center bg-[rgba(19,21,23,0.04)] dark:text-[hsla(0,0%,100%,.5)] dark:bg-[rgba(255,255,255,0.08)] ">
                                <div className="">Upcoming</div>
                            </Button>
                            <Button as={Link} href="/home-past-event" type="button" className="text-sm relative text-black-light-theme  rounded-none justify-center cursor-pointer transition-all duration-300 ease-in-out font-medium flex items-center bg-[#fff] dark:text-[#fff] dark:bg-[#fff2] shadow-xl">
                                <div className="">Past</div>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="zm-container p-[2rem_1rem_1rem] max-width-global margin-global">
                <div className="timeline">
                    <div className="timeline-section relative flex w-full gap-16 pb-12">
                        <div className="line left-[calc(7rem+4rem/2)] dark:border-[rgba(255,255,255,0.08)]"></div>
                        <div className="title always relative w-28">
                            <div className="container sticky">
                                <div className="timeline-title">
                                    <div className="content animated transition-all duration-300 ease-in-out">
                                        <div className="date font-medium">Sep 5</div>
                                        <div className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Tuesday</div>
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
                                                <div className="w-40">
                                                    <div className="img-aspect-ratio w-full overflow-hidden relative rounded-lg">
                                                        <Image alt="you are invited" src="https://app.requestly.io/delay/500/https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=1,quality=75,width=360/event-defaults/retro2.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                                <div className="event-time gap-2 flex items-center">
                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                                        <span>6:00 PM</span>
                                                    </div>
                                                </div>
                                                <div className="text-xl">
                                                    <h3 className="inline text-xl font-medium break-words mt-0 mb-4">Happy Bee</h3>
                                                </div>
                                                <div className="gap-1 flex flex-col">
                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                        <div className="icon text-base flex items-center">
                                                            &nbsp;
                                                            <MapPin className="w-4 h-4 block align-middle mt-0.5" />
                                                        </div>
                                                        <div className="text-base min-w-0">Ho Chi Minh City</div>
                                                    </div>
                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                        <div className="icon text-base flex items-center">
                                                            &nbsp;
                                                            <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                                        </div>
                                                        <div className="text-base min-w-0">1 Guest</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="event-bottom-bar flex justify-between items-center">
                                            <div className="gap-2 flex items-center">
                                                <div className="status-or-price flex">
                                                    <Button as={Link} href="my-calendar" className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                                        <div className="label">Manage Event</div>
                                                        <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                    </Button>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-section relative flex w-full gap-16 pb-12">
                        <div className="line left-[calc(7rem+4rem/2)] dark:border-[rgba(255,255,255,0.08)]"></div>
                        <div className="title always relative w-28">
                            <div className="container sticky">
                                <div className="timeline-title">
                                    <div className="content animated transition-all duration-300 ease-in-out">
                                        <div className="date font-medium">Dec 25</div>
                                        <div className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">Monday</div>
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
                                                <div className="w-40">
                                                    <div className="img-aspect-ratio w-full overflow-hidden relative rounded-lg">
                                                        <Image alt="you are invited" src="https://app.requestly.io/delay/500/https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=1,quality=75,width=360/event-defaults/retro2.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                                <div className="event-time gap-2 flex items-center">
                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                                        <span>07:00 AM</span>
                                                    </div>
                                                </div>
                                                <div className="text-xl">
                                                    <h3 className="inline text-xl font-medium break-words mt-0 mb-4">Đồ án Tốt nghiệp</h3>
                                                </div>
                                                <div className="gap-1 flex flex-col">
                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                        <div className="icon text-base flex items-center">
                                                            &nbsp;
                                                            <MapPin className="w-4 h-4 block align-middle mt-0.5" />
                                                        </div>
                                                        <div className="text-base min-w-0">Ho Chi Minh City</div>
                                                    </div>
                                                    <div className="attribute text-base text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] gap-3 flex items-start">
                                                        <div className="icon text-base flex items-center">
                                                            &nbsp;
                                                            <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                                        </div>
                                                        <div className="text-base min-w-0">6 Guest</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="event-bottom-bar flex justify-between items-center">
                                            <div className="gap-2 flex items-center">
                                                <div className="status-or-price flex">
                                                    <Button as={Link} href="my-calendar" className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                                        <div className="label">Manage Event</div>
                                                        <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                    </Button>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/88397960?v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/100475905?v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/117459514?v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/143791054?v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/136686416?v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                    <div className="head relative flex items-start">
                                                        <Avatar radius="full" src="https://avatars.githubusercontent.com/u/73122721?v=4" name="Donace" className="relative w-5 h-5 dark:border dark:border-solid dark:border-[hsla(0,0%,100%,.5)]"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}