"use client";
import { SearchIcon } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowUpRight } from "lucide-react";
import { Divider } from "@nextui-org/react";
import { people } from "@/components/icon/data";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GetCalendarById } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export type Calendar = {
    code: string
    success: boolean
    result: Result[]
    pageInfo: any
}

export type Result = {
    id: string
    name: string
    totalSubcriber: number
    avatar: string
    userId: string
    sorted: number
}


export default function CalendarPeople(props: any) {
    var { id } = props

    const [getCalendars, setCalendars] = useState<GetCalendarById | null>(null);
    var [calendars, setCalendar] = useState<Calendar | null>(null);

    useEffect(() => {
        fetchWrapper.post(`api/Calendar/get-by-id?Id=${id}`, null)
            .then(data => setCalendars(data));

        fetchWrapper.post('/api/Calendar/get-list', { pageNumber: 1, pageSize: 9999 })
            .then(data => setCalendar(data))
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="page-content">
            <div className="page-header opacity-[2] pl-4 pr-4 pt-12 max-width-global margin-global">
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">
                        {getCalendars ? (
                            <div className="gap-3 flex items-center">
                                <div className="avatar-square">
                                    <Avatar
                                        radius="sm"
                                        src={getCalendars.avatar ? getCalendars.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png"}
                                        name="Donace"
                                        className="relative w-6 h-6 mt-1"
                                    />
                                </div>
                                <div>{getCalendars.name}</div>
                            </div>
                        ) : (
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
                        )}
                    </h1>
                    <Link
                        href="/calendars/details"
                        target="_blank"
                        className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
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
                        {getCalendars ? (
                            <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1" key={getCalendars.id}>
                                <div className="side-padding"></div>
                                <Link
                                    href={`/calendars/manage/${getCalendars.id}`}
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Sự kiện
                                </Link>
                                <Link
                                    href={`/calendars/manage/${getCalendars.id}/audience/`}
                                    className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Người tham gia
                                </Link>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    href={`/calendars/manage/${getCalendars.id}/settings`}
                                    underline="none"
                                >
                                    Cài đặt
                                </Link>
                            </div>
                        ) : (
                            <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                                <div className="side-padding"></div>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"

                                    underline="none"
                                >
                                    Sự kiện
                                </Link>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"

                                    underline="none"
                                >
                                    Người tham gia
                                </Link>
                                <Link
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"

                                    underline="none"
                                >
                                    Cài đặt
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] mb-4"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">
                                Người tham gia (2)
                            </h2>
                        </div>
                        <div className="section-subtitle -mt-3.5 mb-5 text-[#737577] dark:text-[#d2d4d7] text-base">Quản lý người đăng ký của bạn.</div>
                    </div>
                    <div className="search-bar">
                        <div className="flex justify-center relative overflow-hidden items-center transition-all duration-300 ease-in-out">
                            <Input
                                startContent={<SearchIcon className="dark:text-[rgba(255,255,255,0.32)]" />}
                                placeholder="Tìm kiếm.."
                                className="flex-1 m-0"
                                classNames={{
                                    input: [
                                        "text-lg",
                                        "text-black-light-theme",
                                        "dark:text-[#fff]"
                                    ],
                                    inputWrapper: [
                                        "pb-2",
                                        "pt-2",
                                        "bg-[#f2f3f4]",
                                        "dark:bg-[rgb(19,21,23)]",
                                        "border",
                                        "border-solid",
                                        "border-[#ebeced]",
                                        "dark:border-[#333537]",
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
                    <div onClick={onOpen} className="simple-table-wrapper bg-[#f2f3f4] mt-2 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
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
                                        <div className="inline font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme dark:text-[#fff] mr-2 min-w-0">demo</div>
                                    </div>
                                    <div className="email inline overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] dark:text-[#939597] min-w-0">dattranphu1114@gmail.com</div>
                                </div>
                                <span className="whitespace-nowrap text-sm text-[#b3b5b7] dark:text-[#939597]" title="dat">5 Tháng 9</span>
                            </div>
                        </div>
                    </div>
                    <Modal
                        classNames={{
                            base: [
                                "rounded-lg",
                                "shadow-lg",
                                "flex",
                            ],
                            body: [
                                "overflow-auto",
                                "flex-1",
                                "flex-col",
                                "relative",
                                "bg-[#fffd]",
                                "dark:bg-[rgba(33,35,37,0.8)]",
                                "w-full",
                                "p-[1rem_1.25rem]"
                            ],
                            wrapper: [
                                "backdrop-blur-sm",
                            ]
                        }}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                    // motionProps={{
                    //     initial: {
                    //         opacity: 0,
                    //         x: '100%',
                    //         right: 0,
                    //         top: '50%',
                    //         y: '-50%',
                    //         bottom: 'auto',
                    //         width: 620,
                    //         maxWidth: 620,
                    //         marginTop: 0,
                    //         overflowY: 'auto',
                    //         borderRadius: 0,
                    //         boxShadow: 'none',
                    //         outline: 'none',
                    //     },
                    //     animate: {
                    //         opacity: 1,
                    //         x: '50%',
                    //         transition: {
                    //             type: 'spring',
                    //             duration: 0.3,
                    //             ease: 'easeOut',
                    //             stiffness: 250,
                    //             damping: 25,
                    //             clamp: true,
                    //         },
                    //     },
                    //     exit: {
                    //         opacity: 0,
                    //         x: '100%',
                    //         transition: {
                    //             type: 'spring',
                    //             duration: 0.2,
                    //             ease: 'easeIn',
                    //             stiffness: 250,
                    //             damping: 25,
                    //             clamp: true,
                    //         },
                    //     },
                    // }}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">User Details</ModalHeader>
                                    <Divider />
                                    <ModalBody>
                                        <div>
                                            <div className="can-divide with-divider small">
                                                <div className="spread flex justify-between items-center">
                                                    <div className="gap-3 flex items-center">
                                                        <div className="avatar-wrapper">
                                                            <Avatar
                                                                src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                                                radius="full"
                                                                name="Donace"
                                                                className="w-10 h-10 bg-center bg-cover bg-white relative"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">demo</div>
                                                            <div className="cursor-copy text-sm text-[#737577] dark:text-[#d2d4d7]">dattranphu1114@gmail.com</div>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] border-transparent bg-transparent p-0 h-auto border-none rounded-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0">
                                                        <div className="label">Remove</div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="can-divide with-divider small mt-5 pt-5 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                                                <div className="section-title-wrapper small">
                                                    <div className="section-title-row mb-4 flex justify-between items-center">
                                                        <h2 className="text-lg font-semibold text-black-light-theme dark:text-[#fff] mb-0">Event</h2>
                                                    </div>
                                                </div>
                                                <div className="simple-table-wrapper border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden bg-[#f2f3f4] dark:bg-[rgba(255,255,255,0.04)]">
                                                    <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] transition-all duration-300 ease-in-out">
                                                        <div>
                                                            <Link
                                                                className="text-black-light-theme dark:text-[#fff] transition-all duration-300 ease-in-out cursor-pointer"
                                                                href=""
                                                                underline="none"
                                                            >
                                                                <div className="font-semibold">Đồ án tốt nghiệp</div>
                                                            </Link>
                                                            <div className="gap-2 flex justify-between items-center">
                                                                <div className="text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Sep 5, 2023, 6:00 PM</div>
                                                                <Chip className="p-[0.25rem_0.4375rem] text-xs whitespace-nowrap inline-flex items-center font-medium text-[#07a460] dark:text-[#47c97e] bg-[#07a46022] dark:bg-[#07a46022]">
                                                                    <div>Going</div>
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="base-row border-b-0 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] p-[0.75rem_1rem] transition-all duration-300 ease-in-out">
                                                        <div>
                                                            <Link
                                                                className="text-black-light-theme dark:text-[#fff] transition-all duration-300 ease-in-out cursor-pointer"
                                                                href=""
                                                                underline="none"
                                                            >
                                                                <div className="font-semibold">Demo</div>
                                                            </Link>
                                                            <div className="gap-2 flex justify-between items-center">
                                                                <div className="text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Sep 5, 2023, 6:00 PM</div>
                                                                <Chip className="p-[0.25rem_0.4375rem] text-xs whitespace-nowrap inline-flex items-center font-medium text-[#07a460] dark:text-[#47c97e] bg-[#07a46022] dark:bg-[#07a46022]">
                                                                    <div>Going</div>
                                                                </Chip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </div>
    )
}