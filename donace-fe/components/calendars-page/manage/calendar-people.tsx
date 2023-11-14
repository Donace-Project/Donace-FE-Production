"use client";
import { SearchIcon } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowDownWideNarrow, ArrowUpRight } from "lucide-react";
import { Select, SelectItem } from "@nextui-org/react";
import { people } from "@/components/icon/data";

export default function CalendarPeople() {
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
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Sự kiện
                            </Link>
                            <Link
                                href="/calendars/manage/audience"
                                className="text-black-light-theme border-b-2 border-solid border-[rgb(19,21,23)] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Người tham gia
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] mb-4"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0">
                                Người tham gia (2)
                            </h2>
                        </div>
                        <div className="section-subtitle -mt-3.5 mb-5 text-[#737577] text-base">Quản lý người đăng ký của bạn.</div>
                    </div>
                    <div className="search-bar">
                        <div className="flex justify-center relative overflow-hidden items-center transition-all duration-300 ease-in-out">
                            <Input
                                startContent={<SearchIcon />}
                                placeholder="Tìm kiếm.."
                                className="flex-1 m-0"
                                classNames={{
                                    input: [
                                        "text-lg",
                                        "text-black-light-theme",
                                    ],
                                    inputWrapper: [
                                        "pb-2",
                                        "pt-2",
                                        "bg-[#f2f3f4]",
                                        "border",
                                        "border-solid",
                                        "border-[#ebeced]"
                                    ]
                                }}
                            />
                        </div>
                    </div>
                    {/* <div className="spread gap-2 mb-2 mt-2 flex justify-end items-center">
                        <div className="w-1/4">
                            <Select
                                items={people}
                                label="Bộ lọc hiển thị"
                                placeholder="Theo danh mục.."
                                startContent={<ArrowDownWideNarrow className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block mt-0.5" />}
                            >
                                {(people) => <SelectItem key={people.value}>{people.label}</SelectItem>}
                            </Select>
                        </div>
                    </div> */}
                    <div className="simple-table-wrapper bg-[#f2f3f4] mt-2">
                        <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] cursor-pointer transition-all duration-300 ease-in-out">
                            <div className="gap-3 flex justify-between items-center">
                                <div className="avatar-wrapper small">
                                    <Avatar
                                        radius="full"
                                        src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                        name="Donace"
                                        className="w-6 h-6 bg-center bg-cover bg-[#fff] relative"
                                    />
                                </div>
                                <div className="info overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] min-w-0 flex-1">
                                    <div className="name inline">
                                        <div className="inline font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme mr-2 min-w-0">demo</div>
                                    </div>
                                    <div className="email inline overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] min-w-0">dattranphu1114@gmail.com</div>
                                </div>
                                <span className="whitespace-nowrap text-sm text-[#b3b5b7]" title="dat">5 Tháng 9</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}