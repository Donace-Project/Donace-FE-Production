"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Tab, Tabs } from "@nextui-org/tabs";
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
                        <div className="label">Lịch</div>
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
                                href="/calendars/manage"
                                className="text-black-light-theme border-b-2 border-solid border-[rgb(19,21,23)] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Sự kiện
                            </Link>
                            <Link
                                href="/calendars/manage/audience"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Người tham gia
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper">
                        <div className="flex-col flex gap-2">
                            <Tabs aria-label="Options" >
                                <Tab key="future" title="Sắp tới">
                                    <div className="timeline-container">
                                        <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                            <div className="icon justify-center flex items-center">
                                                <div className="mb-2">
                                                    <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-medium text-black-more-blur-light-theme p-0 mt-6 mb-0">Không có sự kiện</h3>
                                            <div className="desc pl-12 pr-12 text-black-blur-light-theme mt-2">Lịch này không có sự kiện gì sắp diễn ra.</div>
                                            <div className="mt-6 justify-center flex items-center">
                                                <Button
                                                    as={Link}
                                                    href="/create"
                                                    type="button"
                                                    className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                >
                                                    <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                    <div className="label">Tạo sự kiện mới</div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab key="past" title="Đã qua">
                                    <div className="timeline-container">
                                        <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                            <div className="icon justify-center flex items-center">
                                                <div className="mb-2">
                                                    <CalendarX2 className="w-64 h-auto block align-middle text-foreground-200" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-medium text-black-more-blur-light-theme p-0 mt-6 mb-0">Không có sự kiện</h3>
                                            <div className="desc pl-12 pr-12 text-black-blur-light-theme mt-2">Lịch này không có sự kiện gì đã diễn ra.</div>
                                            <div className="mt-6 justify-center flex items-center">
                                                <Button
                                                    as={Link}
                                                    href="/create"
                                                    type="button"
                                                    className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                >
                                                    <Plus className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                    <div className="label">Tạo sự kiện mới</div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}