'use client';
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { EventDetailModels } from "@/types/DonaceType";
import { Link } from "@nextui-org/link";
import { ArrowUpRight, ArrowUpToLine, MailOpen, PencilLine, SearchIcon, Send, Sparkles, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, Divider, Progress } from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/react";
import { usersAll } from "../data"
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/modal";

interface DateTimeInfo {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
}

const ConvertDateTime = (dateTime: any): DateTimeInfo => {
    const date = new Date(dateTime);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return { year, month, day, hour, minute };
};

export default function EventUserJoin(props: any) {

    const modalInviteUser = useDisclosure();

    var { id } = props
    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);

    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));
    }, []);

    return (
        <div className="page-content">
            <div className="page-header opacity-[2] pl-4 pr-4 pt-12 max-width-global margin-global">
                {eventDetail ? (
                    <div className="spread gap-2 mb-2 flex justify-between items-center">
                        <h1 className="tab-title text-4xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">
                            <div>
                                <div className="inline">{eventDetail.name}</div>
                            </div>
                        </h1>
                        <Link
                            href={`/events/detail/${eventDetail.id}`}
                            target="_blank"
                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                            underline="none"
                        >
                            <div className="label">Trang sự kiện</div>
                            <ArrowUpRight className="ml-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                        </Link>
                    </div>
                ) : (
                    <div className="hidden"></div>
                )}
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                            <div className="side-padding"></div>
                            <Link
                                href={`/events/manage/${eventDetail?.id}`}
                                underline="none"
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                Sự kiện
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/guests`}
                                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"

                                underline="none"
                            >
                                Khách
                            </Link>
                            <Link
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Doanh thu
                            </Link>
                            <Link
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Khác
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Tổng quan Sự kiện</h2>
                        </div>
                    </div>
                    <div className="bar-wrapper -mt-1">
                        <div className="guest-bar">
                            <div className="top-numbers flex justify-between items-baseline">
                                <div className="approved text-[#b3b5b7]">
                                    <span className="large-number text-2xl">0</span>
                                    <span className="large-caption ml-1">khách tham gia</span>
                                </div>
                            </div>
                            <div className="bar-wrapper pb-0 pt-4">
                                <div className="bar">
                                    <Progress
                                        aria-label="Downloading..."
                                        size="md"
                                        label="Tiến độ tham dự"
                                        value={value}
                                        showValueLabel={true}
                                        color="success"
                                        className="max-w-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="quick-actions-wrapper mt-6">
                        <div className="quick-actions grid grid-cols-3 gap-2">
                            <Button
                                onPress={modalInviteUser.onOpen}
                                type="button"
                                className="bg-[#f4f5f6] rounded-xl h-auto borde-0 font-medium overflow-hidden p-[0.5rem_0.75rem_0.5rem_0.5rem] relative transition-all duration-300 ease-in-out cursor-pointer flex m-0"
                            >
                                <div className="content gap-3 relative pointer-events-none transition-all duration-300 ease-in-out flex-1 flex items-center">
                                    <div className="icon rounded-lg bg-[#325ffa22] text-[#325ffa] p-2 pointer-events-none justify-center flex items-center">
                                        <MailOpen className="w-6 h-6 block align-middle" />
                                    </div>
                                    <div className="name text-black-light-theme pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap flex-1 flex">
                                        Mời người dùng
                                    </div>
                                </div>
                            </Button>
                            <Button
                                type="button"
                                className="bg-[#f4f5f6] rounded-xl h-auto borde-0 font-medium overflow-hidden p-[0.5rem_0.75rem_0.5rem_0.5rem] relative transition-all duration-300 ease-in-out cursor-pointer flex m-0"
                            >
                                <div className="content gap-3 relative pointer-events-none transition-all duration-300 ease-in-out flex-1 flex items-center">
                                    <div className="icon rounded-lg bg-[#ec660d22] text-[#ec660d] p-2 pointer-events-none justify-center flex items-center">
                                        <ArrowUpToLine className="w-6 h-6 block align-middle" />
                                    </div>
                                    <div className="name text-black-light-theme pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap flex-1 flex">
                                        Thiết lập số lượng
                                    </div>
                                </div>
                            </Button>
                            <Button
                                type="button"
                                className="bg-[#f4f5f6] rounded-xl h-auto borde-0 font-medium overflow-hidden p-[0.5rem_0.75rem_0.5rem_0.5rem] relative transition-all duration-300 ease-in-out cursor-pointer flex m-0"
                            >
                                <div className="content gap-3 relative pointer-events-none transition-all duration-300 ease-in-out flex-1 flex items-center">
                                    <div className="icon rounded-lg bg-[#e83b4722] text-[#e83b47] p-2 pointer-events-none justify-center flex items-center">
                                        <XCircle className="w-6 h-6 block align-middle" />
                                    </div>
                                    <div className="name text-black-light-theme pointer-events-none transition-all duration-300 ease-in-out whitespace-nowrap flex-1 flex">
                                        Tắt đăng ký tham gia
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="can-divide with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Danh sách Người tham gia</h2>
                        </div>
                        <div className="search-bar">
                            <div className="flex justify-between relative overflow-hidden items-center transition-all duration-300 ease-in-out">
                                <Input
                                    isClearable
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
                        <div className="filter gap-2 mb-2 mt-2 flex justify-between items-center">
                            <div className="lux-menu-trigger-wrapper cursor-pointer inline-flex min-w-0 w-2/4">
                                <Select
                                    items={usersAll}
                                    placeholder="Hiển thị danh sách người tham dự"
                                    className="max-w-xs"
                                >
                                    {(user) => <SelectItem key={user.value}>{user.label}</SelectItem>}
                                </Select>
                            </div>
                            <div className="time inline-flex min-w-0">
                                <div className="label">5 tháng 9</div>
                            </div>
                        </div>
                        <div className="simple-table-wrapper bg-[#f2f3f4] mt-2 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
                            <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] cursor-pointer transition-all duration-300 ease-in-out">
                                <div className="gap-3 flex justify-between items-center">
                                    <div className="avatar-wrapper small">
                                        <Avatar
                                            radius="full"
                                            // src={userProfile?.result.avatar ? userProfile.result.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"}
                                            src="https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"
                                            name="Donace"
                                            className="w-6 h-6 bg-center bg-cover bg-[#fff] relative"
                                        />
                                    </div>
                                    <div className="info overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] min-w-0 flex-1">
                                        <div className="name inline">
                                            <div className="inline font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme dark:text-[#fff] mr-2 min-w-0">Nguyễn Hoàng Tùng</div>
                                        </div>
                                        <div className="email inline overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] dark:text-[#939597] min-w-0">nguyenhoangtung@gmail.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                        <div className="icon justify-center flex items-center">
                            <Users className="w-16 h-16 text-black-blur-light-theme block align-middle" />
                        </div>
                        <h3 className="text-black-more-blur-light-theme p-0 mt-4 mb-0 text-lg font-semibold">Không có khách nào tham dự</h3>
                        <div className="pl-12 pr-12 text-black-blur-light-theme mt-2">
                            Chia sẻ hoặc Mời bạn bè tham gia sự kiện!
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                size="4xl"
                isOpen={modalInviteUser.isOpen}
                onOpenChange={modalInviteUser.onOpenChange}
                classNames={{
                    closeButton: [
                        "mt-1.5 mr-2 hover:bg-[rgba(19,21,23,0.08)] transition-all duration-300 ease-in-out"
                    ],
                    header: [
                        "flex justify-center"
                    ]
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 ">Mời Người tham dự</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="main flex flex-grow min-h-0">
                                    <div className="left p-[0.5rem_1rem] w-[30%] min-w-[200px] border-r border-solid border-[rgba(19,21,23,0.8)] h-full overflow-y-auto transition-all duration-300 ease-in-out">
                                        <div className="left-section top-buttons -mb-1">
                                            <button
                                                type="button"
                                                className="text-black-light-theme flex items-center gap-3 p-2 m-[0px_-0.5rem] rounded-md w-full font-medium cursor-pointer transition-all duration-300 ease-in-out border border-solid border-transparent"
                                            >
                                                <div className="icon flex justify-center min-w-[1rem] text-black-blur-light-theme">
                                                    <Sparkles className="block w-4 h-4 align-middle" />
                                                </div>
                                                <div className="label text-sm">Đề xuất</div>
                                            </button>
                                            <button
                                                type="button"
                                                className="text-black-light-theme mt-px flex items-center gap-3 p-2 m-[0px_-0.5rem] rounded-md w-full font-medium cursor-pointer transition-all duration-300 ease-in-out border border-solid border-transparent"
                                            >
                                                <div className="icon flex justify-center min-w-[1rem] text-black-blur-light-theme">
                                                    <PencilLine className="block w-4 h-4 align-middle" />
                                                </div>
                                                <div className="label text-sm">Điền Email</div>
                                            </button>
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-solid border-[rgba(19,21,23,0.08)]">
                                            <div className="font-semibold uppercase text-xs text-black-blur-light-theme mb-1">sự kiện</div>
                                            <button
                                                type="button"
                                                className="p-[0.25rem_0.5rem] m-[0.25rem_-0.5rem] rounded-lg w-full cursor-pointer transition-all duration-300 ease-in-out bg-transparent border border-solid border-transparent flex flex-col items-start"
                                            >
                                                <div className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">{eventDetail?.name}</div>
                                                <div className="text-xs text-black-blur-light-theme">{ConvertDateTime(eventDetail?.startDate).day} tháng {ConvertDateTime(eventDetail?.startDate).month}, 1 khách</div>
                                            </button>

                                        </div>
                                    </div>
                                    <div className="right flex flex-col w-[70%] min-w-[350px] h-full relative">
                                        <div className="pt-12 min-h-full flex flex-col">
                                            <div className="w-full flex flex-col items-center">
                                                <div className="icon-container w-60 h-52 relative">
                                                    <div className="avatar-1 absolute left-0 top-10 -rotate-45">
                                                        <div className="avatar bg-[url('https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=40,height=40/misc/hw/740ebb8b-610e-4ed6-bca2-96f3ef63a0d2')] w-10 h-10 rounded-full bg-center bg-cover relative"></div>
                                                    </div>
                                                    <div className="absolute left-6 top-[calc(40px+1.5rem)] transform rotate-[25deg] origin-left h-[2px] w-20 bg-gradient-to-r from-transparent via-[rgba(19,21,23,0.06)] to-transparent"></div>
                                                    <div className="avatar-2 absolute left-1/2 top-0 -translate-y-1/2">
                                                        <div className="avatar bg-[url('https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=40,height=40/misc/hf/04ee6146-4069-4bbf-82c6-4447b4a22cf7')] w-10 h-10 rounded-full bg-center bg-cover relative"></div>
                                                    </div>
                                                    <div className="absolute left-[140px] -translate-y-5 h-[50px] w-[2px] top-10 transform origin-left bg-gradient-to-r from-transparent via-[rgba(19,21,23,0.06)] to-transparent"></div>
                                                    <div className="avatar-3 absolute -right-10 top-10 rotate-45">
                                                        <div className="avatar bg-[url('https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=40,height=40/misc/tm/7c9ac2b9-d358-4df0-81e4-1b7bd72d9930')] w-10 h-10 rounded-full bg-center bg-cover relative"></div>
                                                    </div>
                                                    <div className="absolute -right-5 top-[calc(40px+1.5rem)] transform rotate-[-25deg] origin-right h-[2px] w-20 bg-gradient-to-r from-transparent via-[rgba(19,21,23,0.06)] to-transparent"></div>
                                                    <div className="absolute left-2/4 -translate-x-4 top-20 mb-0 border border-solid border-[rgba(19,21,23,0.08)] rounded-3xl bg-[#fff]">
                                                        <Sparkles className="w-20 h-20 block align-middle text-foreground-600" />
                                                    </div>
                                                </div>
                                                <div className="translate-x-8 max-w-[250px] margin-global text-center text-sm">
                                                    <div className="font-medium">Bắt đầu mời những vị khách ngay hôm nay</div>
                                                    <div className="text-black-blur-light-theme mt-1">Sau khi kết thúc sự kiện, bạn sẽ tìm thấy những ai đã tham gia ở đây.</div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    className="text-[#fff] bg-[#333537] border-[#333537] border-solid border cursor-auto transition-all duration-300 ease-in-out donace-button-w-fit flex items-center mt-4 translate-x-8"
                                                >
                                                    <div className="label">Thêm email thủ công</div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <Divider />
                            <ModalFooter className="p-[0.75rem_1rem] flex justify-between items-center">
                                <div className="transition-all duration-300 ease-in-out text-black-blur-light-theme font-medium">
                                    <span>Đã chọn</span>
                                    <span>&nbsp;0</span>
                                </div>
                                <Button
                                    color="success"
                                    type="button"
                                    className="text-[#fff] donace-button-w-fit cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                    <Send className="w-4 h-4 align-middle block translate-y-px" />
                                    <div className="label">Gửi</div>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}