"use client";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ArrowUpRight, MapPin, MapPinned, Send, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export type EventDetails = {
    totalCount: number
    items: Item[]
}

export type Item = {
    sort: number
    id: string
    startDate: string
    endDate: string
    addressName: string
    lat: string
    long: string
    capacity: number
    isOverCapacity: boolean
    cover: string
    name: string
    theme: string
    color: string
    fontSize: number
    instructions: string
    isMultiSection: true
    duration: number
    totalGuest: number
    calendarId: string
    isLive: boolean
}

export default function EventDetails() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    var [eventDetail, setEventDetail] = useState<EventDetails | null>(null);

    useEffect(() => {
        const sortValue = '1'; // Thay 'validSortValue' bằng giá trị hợp lệ từ tài liệu API hoặc người triển khai
        const calendarIdValue = 'ea75cecd-8bba-467c-bb80-e607678caa8a'; // Thay 'yourCalendarIdValue' bằng giá trị thích hợp

        fetchWrapper.get(`/api/Event/detail?sort=${sortValue}&calendarId=${calendarIdValue}`)
            .then(data => setEventDetail(data))
    }, []);

    return (
        <div className="page-content min-h-[100dvh] mt-5 relative bg-transparent">
            {eventDetail ? (
                eventDetail.items.length > 0 ? (
                    eventDetail.items.map((event, index) => (
                        <div>
                            <div className="flex flex-col" key={event.sort}>
                                <div className="main min-h-[80vh] w-full p-[0_0.25rem] relative max-width-global margin-global">
                                    <div className="top-card overflow-hidden bg-[rgba(19,21,23,0.48)] rounded-2xl shadow-md p-2">
                                        <div className="cover-image rounded-lg bg-[rgba(255,255,255,0.08)] w-full overflow-hidden relative">
                                            <Image className=" w-full h-full object-cover" alt="you are invited" src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/gallery-images/xn/c100b6ce-2ab4-4a53-b575-2c8a4fa308b9" />
                                        </div>
                                        <div className="top-card-content">

                                            <div className="spread gap-2 mb-4 flex justify-between items-start">
                                                <div className="min-w-0">
                                                    <h1 className="text-4xl font-sans break-words text-[#fff] mb-0 font-semibold mt-0">{event.name}</h1>
                                                    <div className="host mt-2">
                                                        <div className="text-tinted text-[hsla(0,0%,100%,.79)] gap-2 flex items-center">
                                                            <div className="flex items-center">
                                                                <Avatar radius="full" src="https://avatars.githubusercontent.com/u/88397960?v=4" name="Donace" className="relative w-5 h-5" />
                                                            </div>
                                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">Điều phối bởi Trần Phú Đạt</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="calendar-card w-16 rounded-lg overflow-hidden border border-solid border-[rgba(255,255,255,0.08)] text-[#fff] text-center min-h-full flex-shrink-0">
                                                    <div className="month text-sm p-[0.25rem_0] font-semibold uppercase tracking-[0.5px]">8</div>
                                                    <div className="day text-3xl p-2 pt-1.5 bg-[rgba(255,255,255,0.08)] font-medium">30</div>
                                                </div>
                                            </div>
                                            <div className="meta gap-12 mt-6 flex items-start">
                                                <div className="min-w-0 flex-1">
                                                    <div className="row-container rounded-lg -m-2 p-2">
                                                        <div className="icon-row gap-4 flex items-center">
                                                            <div className="icon-container w-10 h-10 border border-solid border-[rgba(255,255,255,0.08)] text-[hsla(0,0%,100%,.79)] m-[0.125rem_0] flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                                <div className="calendar-card w-full text-center min-h-full">
                                                                    <div className="month bg-[rgba(255,255,255,0.08)] text-xs font-semibold uppercase p-0.5">8</div>
                                                                    <div className="day -translate-y-px font-medium">30</div>
                                                                </div>
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="title text-[#fff] font-serif font-medium overflow-hidden text-ellipsis whitespace-nowrap">Thứ Tư, 30 tháng 8</div>
                                                                <div className="desc text-[hsla(0,0%,100%,.79)] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">6:00 PM đến 9:00 PM</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <Link
                                                        href="https://maps.app.goo.gl/DvKfmwvN6bZzkS1o8"
                                                        className="row-container transition-all duration-300 ease-in-out cursor-pointer"
                                                        target="_blank"
                                                        rel="nofollow noopener"
                                                        underline="none"
                                                    >
                                                        <div className="icon-row gap-4 flex items-center">
                                                            <div className="icon-container w-10 h-10 border border-solid border-[rgba(255,255,255,0.08)] text-[hsla(0,0%,100%,.79)] m-[0.125rem_0] flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                                <MapPinned className="w-5 h-5 block align-middle" />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="title text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                                                                    <div className="gap-1 flex items-center">
                                                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[18rem]">
                                                                            Công viên Phần mềm Quang Trung Tòa T FPT Polytechnic, P. Tân Chánh Hiệp, Q. 12, TP. HCM
                                                                        </div>
                                                                        <div className="opacity-50 translate-y-[0.5px] text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out">
                                                                            <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom-section mt-4 gap-4 flex items-start">
                                        <div className="gap-4 min-w-0 flex-1 flex flex-col">
                                            <div>
                                                <div className="lux-collpase show h-auto block filter-none">
                                                    <div className="content-card bg-[rgba(19,21,23,0.48)] rounded-2xl backdrop-blur-lg shadow-md">
                                                        <div className="content p-[0.75rem_1rem]">
                                                            <div className="top mb-1.5 m-[0.5rem_0.125rem_0.125rem] gap-4 flex flex-col">
                                                                <div>
                                                                    <div className="spread mt-1 flex justify-between items-start">
                                                                        <div className="avatar-wrapper">
                                                                            <Avatar src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="w-10 h-10 bg-center bg-cover relative" radius="full" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-[#fff] text-xl font-semibold font-serif mt-2">Cảm ơn bạn vì đã tham dự</div>
                                                                    <div className="desc text-[hsla(0,0%,100%,.79)]">Chúng tôi hi vọng bạn sẽ tận hưởng sự kiện này!</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sidebar w-80 gap-4 flex flex-col">
                                            <div className="content-card bg-[rgba(19,21,23,0.48)] rounded-2xl backdrop-blur-lg shadow-md">
                                                <div className="card-title p-[0.75rem_1rem] h-auto border-b border-solid border-[rgba(255,255,255,0.08)] gap-2 flex justify-between items-center">
                                                    <div className="gap-2 flex items-baseline">
                                                        <div className="title-icon text-[hsla(0,0%,100%,.79)] translate-y-0.5 justify-center flex items-center">
                                                            <MapPin className="block w-4 h-4 align-middle" />
                                                        </div>
                                                        <div className="title-label text-[#fff] text-lg font-semibold font-serif">Vị trí</div>
                                                    </div>
                                                </div>
                                                <div className="content p-[0.75rem_1rem]">
                                                    <div>
                                                        <div className="cursor-copy">
                                                            <div className="font-medium text-[#fff]">
                                                                Công viên Phần mềm Quang Trung Tòa T FPT Polytechnic, P. Tân Chánh Hiệp, Q. 12, TP. HCM
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content-card bg-[rgba(19,21,23,0.48)] rounded-2xl backdrop-blur-lg shadow-md">
                                                <div className="card-title p-[0.75rem_1rem] h-auto border-b border-solid border-[rgba(255,255,255,0.08)] gap-2 flex justify-between items-center">
                                                    <div className="gap-2 flex items-baseline">
                                                        <div className="title-icon text-[hsla(0,0%,100%,.79)] translate-y-0.5 justify-center flex items-center">
                                                            <Users className="block w-4 h-4 align-middle" />
                                                        </div>
                                                        <div className="title-label text-[#fff] text-lg font-semibold font-serif">Mọi người</div>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className="content p-[0.75rem_1rem]">
                                                    <div className="title text-[#fff] font-semibold mb-2">Quản trị</div>
                                                    <div>
                                                        <div className="hosts gap-3 mt-2 flex flex-col">
                                                            <div className="gap-2 flex items-center">
                                                                <Link
                                                                    className="overflow-hidden text-inherit gap-2 flex-1 flex items-center transition-all duration-300 ease-in-out cursor-pointer"
                                                                    underline="none"
                                                                >
                                                                    <div className="avatar-wrapper small">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/88397960?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap text-[#fff]">Trần Phú Đạt</div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="gap-2 mt-4 mb-1 flex items-center">
                                                            <Button
                                                                onPress={onOpen}
                                                                className="backdrop-blur-lg text-[rgba(255,255,255,0.64)] bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                                                type="button"
                                                            >
                                                                <div className="label">Liên lạc</div>
                                                            </Button>
                                                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                                                <ModalContent>
                                                                    {(onClose) => (
                                                                        <>
                                                                            <ModalHeader
                                                                                className="p-[0.75rem_1.25rem] bg-[#333537] text-[#fff] flex justify-between items-center"

                                                                            >
                                                                                <div className="text-lg font-semibold">Liên lạc với Quản trị</div>
                                                                            </ModalHeader>
                                                                            <Divider className="bg-[rgba(19,21,23,0.48)]" />
                                                                            <ModalBody className="w-full p-[1rem_1.25rem] overflow-auto ">
                                                                                <div>
                                                                                    <form action="#">
                                                                                        <div>
                                                                                            <div className="text-sm mb-4">
                                                                                                Chúng tôi sẽ gửi tin nhắn đến cho Quản trị từ <b>(Nguyễn Gia Bảo).</b>
                                                                                            </div>
                                                                                            <div className="lux-input-wrapper max-width-global">
                                                                                                <div className="inner-wrapper inline-block w-full">
                                                                                                    <Textarea
                                                                                                        variant="bordered"
                                                                                                        label="Mô tả"
                                                                                                        labelPlacement="outside"
                                                                                                        placeholder="Bạn có câu hỏi gì dành cho Quản trị không?"
                                                                                                        className="text-base align-top transition-all duration-300 ease-in-out"
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="text-sm mt-4">
                                                                                                Quản trị sẽ gửi tin nhắn đến email
                                                                                                <b> nguyenhiengiabao12@gmail.com</b>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="mt-4">
                                                                                            <Button
                                                                                                type="submit"
                                                                                                className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]"
                                                                                            >
                                                                                                <Send className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                                                                                                <div className="label">Gửi tin nhắn</div>
                                                                                            </Button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </ModalBody>
                                                                        </>
                                                                    )}
                                                                </ModalContent>
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <hr className="mb-4 mt-4 border-solid border-[rgba(255,255,255,0.08)] border" />
                                                        <div className="spread title-row mb-2 flex justify-between items-baseline">
                                                            <div className="title m-0 font-semibold text-[#fff]">
                                                                4&nbsp;
                                                                {/*  */}
                                                                {/*  */}
                                                                Khách
                                                            </div>
                                                        </div>
                                                        <Button
                                                            className="pl-0 pr-0 h-auto cursor-pointer m-0 bg-transparent border border-solid border-transparent leading-6 text-inherit"
                                                        >
                                                            <div className="guest pb-2 flex items-center">
                                                                <div className="heads flex items-center">
                                                                    <div className="head relative flex items-start">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/100475905?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                    <div className="head relative flex items-start">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/117459514?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                    <div className="head relative flex items-start">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/136686416?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                    <div className="head relative flex items-start">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/143791054?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                    <div className="head relative flex items-start">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/73122721?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Button>
                                                        <div className="text-tined text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out text-sm">Tiếp, Tùng, Hướng và 2 người khác</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <div className="flex flex-col">
                            <div className="main min-h-[80vh] w-full p-[0_0.25rem] relative max-width-global margin-global">
                                <div className="top-card overflow-hidden bg-[rgba(19,21,23,0.48)] rounded-2xl shadow-md p-2">
                                    <div className="cover-image rounded-lg bg-[rgba(255,255,255,0.08)] w-full overflow-hidden relative">
                                        <Image className=" w-full h-full object-cover" alt="you are invited" src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/gallery-images/xn/c100b6ce-2ab4-4a53-b575-2c8a4fa308b9" />
                                    </div>
                                    <div className="top-card-content">

                                        <div className="spread gap-2 mb-4 flex justify-between items-start">
                                            <div className="min-w-0">
                                                <h1 className="text-4xl font-sans break-words text-[#fff] mb-0 font-semibold mt-0">Họp Hội Đồng Donace</h1>
                                                <div className="host mt-2">
                                                    <div className="text-tinted text-[hsla(0,0%,100%,.79)] gap-2 flex items-center">
                                                        <div className="flex items-center">
                                                            <Avatar radius="full" src="https://avatars.githubusercontent.com/u/88397960?v=4" name="Donace" className="relative w-5 h-5" />
                                                        </div>
                                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">Điều phối bởi Trần Phú Đạt</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="calendar-card w-16 rounded-lg overflow-hidden border border-solid border-[rgba(255,255,255,0.08)] text-[#fff] text-center min-h-full flex-shrink-0">
                                                <div className="month text-sm p-[0.25rem_0] font-semibold uppercase tracking-[0.5px]">8</div>
                                                <div className="day text-3xl p-2 pt-1.5 bg-[rgba(255,255,255,0.08)] font-medium">30</div>
                                            </div>
                                        </div>
                                        <div className="meta gap-12 mt-6 flex items-start">
                                            <div className="min-w-0 flex-1">
                                                <div className="row-container rounded-lg -m-2 p-2">
                                                    <div className="icon-row gap-4 flex items-center">
                                                        <div className="icon-container w-10 h-10 border border-solid border-[rgba(255,255,255,0.08)] text-[hsla(0,0%,100%,.79)] m-[0.125rem_0] flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                            <div className="calendar-card w-full text-center min-h-full">
                                                                <div className="month bg-[rgba(255,255,255,0.08)] text-xs font-semibold uppercase p-0.5">8</div>
                                                                <div className="day -translate-y-px font-medium">30</div>
                                                            </div>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="title text-[#fff] font-serif font-medium overflow-hidden text-ellipsis whitespace-nowrap">Thứ Tư, 30 tháng 8</div>
                                                            <div className="desc text-[hsla(0,0%,100%,.79)] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">6:00 PM đến 9:00 PM</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <Link
                                                    href="https://maps.app.goo.gl/DvKfmwvN6bZzkS1o8"
                                                    className="row-container transition-all duration-300 ease-in-out cursor-pointer"
                                                    target="_blank"
                                                    rel="nofollow noopener"
                                                    underline="none"
                                                >
                                                    <div className="icon-row gap-4 flex items-center">
                                                        <div className="icon-container w-10 h-10 border border-solid border-[rgba(255,255,255,0.08)] text-[hsla(0,0%,100%,.79)] m-[0.125rem_0] flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                            <MapPinned className="w-5 h-5 block align-middle" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="title text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                                                                <div className="gap-1 flex items-center">
                                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[18rem]">
                                                                        Công viên Phần mềm Quang Trung Tòa T FPT Polytechnic, P. Tân Chánh Hiệp, Q. 12, TP. HCM
                                                                    </div>
                                                                    <div className="opacity-50 translate-y-[0.5px] text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out">
                                                                        <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-section mt-4 gap-4 flex items-start">
                                    <div className="gap-4 min-w-0 flex-1 flex flex-col">
                                        <div>
                                            <div className="lux-collpase show h-auto block filter-none">
                                                <div className="content-card bg-[rgba(19,21,23,0.48)] rounded-2xl backdrop-blur-lg shadow-md">
                                                    <div className="content p-[0.75rem_1rem]">
                                                        <div className="top mb-1.5 m-[0.5rem_0.125rem_0.125rem] gap-4 flex flex-col">
                                                            <div>
                                                                <div className="spread mt-1 flex justify-between items-start">
                                                                    <div className="avatar-wrapper">
                                                                        <Avatar src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="w-10 h-10 bg-center bg-cover relative" radius="full" />
                                                                    </div>
                                                                </div>
                                                                <div className="text-[#fff] text-xl font-semibold font-serif mt-2">Cảm ơn bạn vì đã tham dự</div>
                                                                <div className="desc text-[hsla(0,0%,100%,.79)]">Chúng tôi hi vọng bạn sẽ tận hưởng sự kiện này!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar w-80 gap-4 flex flex-col">
                                        <div className="content-card bg-[rgba(19,21,23,0.48)] rounded-2xl backdrop-blur-lg shadow-md">
                                            <div className="card-title p-[0.75rem_1rem] h-auto border-b border-solid border-[rgba(255,255,255,0.08)] gap-2 flex justify-between items-center">
                                                <div className="gap-2 flex items-baseline">
                                                    <div className="title-icon text-[hsla(0,0%,100%,.79)] translate-y-0.5 justify-center flex items-center">
                                                        <MapPin className="block w-4 h-4 align-middle" />
                                                    </div>
                                                    <div className="title-label text-[#fff] text-lg font-semibold font-serif">Vị trí</div>
                                                </div>
                                            </div>
                                            <div className="content p-[0.75rem_1rem]">
                                                <div>
                                                    <div className="cursor-copy">
                                                        <div className="font-medium text-[#fff]">
                                                            Công viên Phần mềm Quang Trung Tòa T FPT Polytechnic, P. Tân Chánh Hiệp, Q. 12, TP. HCM
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-card bg-[rgba(19,21,23,0.48)] rounded-2xl backdrop-blur-lg shadow-md">
                                            <div className="card-title p-[0.75rem_1rem] h-auto border-b border-solid border-[rgba(255,255,255,0.08)] gap-2 flex justify-between items-center">
                                                <div className="gap-2 flex items-baseline">
                                                    <div className="title-icon text-[hsla(0,0%,100%,.79)] translate-y-0.5 justify-center flex items-center">
                                                        <Users className="block w-4 h-4 align-middle" />
                                                    </div>
                                                    <div className="title-label text-[#fff] text-lg font-semibold font-serif">Mọi người</div>
                                                </div>
                                            </div>
                                            <Divider />
                                            <div className="content p-[0.75rem_1rem]">
                                                <div className="title text-[#fff] font-semibold mb-2">Quản trị</div>
                                                <div>
                                                    <div className="hosts gap-3 mt-2 flex flex-col">
                                                        <div className="gap-2 flex items-center">
                                                            <Link
                                                                className="overflow-hidden text-inherit gap-2 flex-1 flex items-center transition-all duration-300 ease-in-out cursor-pointer"
                                                                underline="none"
                                                            >
                                                                <div className="avatar-wrapper small">
                                                                    <Avatar src="https://avatars.githubusercontent.com/u/88397960?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap text-[#fff]">Trần Phú Đạt</div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="gap-2 mt-4 mb-1 flex items-center">
                                                        <Button
                                                            onPress={onOpen}
                                                            className="backdrop-blur-lg text-[rgba(255,255,255,0.64)] bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                                            type="button"
                                                        >
                                                            <div className="label">Liên lạc</div>
                                                        </Button>
                                                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                                            <ModalContent>
                                                                {(onClose) => (
                                                                    <>
                                                                        <ModalHeader
                                                                            className="p-[0.75rem_1.25rem] bg-[#333537] text-[#fff] flex justify-between items-center"

                                                                        >
                                                                            <div className="text-lg font-semibold">Liên lạc với Quản trị</div>
                                                                        </ModalHeader>
                                                                        <Divider className="bg-[rgba(19,21,23,0.48)]" />
                                                                        <ModalBody className="w-full p-[1rem_1.25rem] overflow-auto ">
                                                                            <div>
                                                                                <form action="#">
                                                                                    <div>
                                                                                        <div className="text-sm mb-4">
                                                                                            Chúng tôi sẽ gửi tin nhắn đến cho Quản trị từ <b>(Nguyễn Gia Bảo).</b>
                                                                                        </div>
                                                                                        <div className="lux-input-wrapper max-width-global">
                                                                                            <div className="inner-wrapper inline-block w-full">
                                                                                                <Textarea
                                                                                                    variant="bordered"
                                                                                                    label="Mô tả"
                                                                                                    labelPlacement="outside"
                                                                                                    placeholder="Bạn có câu hỏi gì dành cho Quản trị không?"
                                                                                                    className="text-base align-top transition-all duration-300 ease-in-out"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="text-sm mt-4">
                                                                                            Quản trị sẽ gửi tin nhắn đến email
                                                                                            <b> nguyenhiengiabao12@gmail.com</b>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="mt-4">
                                                                                        <Button
                                                                                            type="submit"
                                                                                            className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]"
                                                                                        >
                                                                                            <Send className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                                                                                            <div className="label">Gửi tin nhắn</div>
                                                                                        </Button>
                                                                                    </div>
                                                                                </form>
                                                                            </div>
                                                                        </ModalBody>
                                                                    </>
                                                                )}
                                                            </ModalContent>
                                                        </Modal>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className="mb-4 mt-4 border-solid border-[rgba(255,255,255,0.08)] border" />
                                                    <div className="spread title-row mb-2 flex justify-between items-baseline">
                                                        <div className="title m-0 font-semibold text-[#fff]">
                                                            4&nbsp;
                                                            {/*  */}
                                                            {/*  */}
                                                            Khách
                                                        </div>
                                                    </div>
                                                    <Button
                                                        className="pl-0 pr-0 h-auto cursor-pointer m-0 bg-transparent border border-solid border-transparent leading-6 text-inherit"
                                                    >
                                                        <div className="guest pb-2 flex items-center">
                                                            <div className="heads flex items-center">
                                                                <div className="head relative flex items-start">
                                                                    <Avatar src="https://avatars.githubusercontent.com/u/100475905?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                </div>
                                                                <div className="head relative flex items-start">
                                                                    <Avatar src="https://avatars.githubusercontent.com/u/117459514?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                </div>
                                                                <div className="head relative flex items-start">
                                                                    <Avatar src="https://avatars.githubusercontent.com/u/136686416?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                </div>
                                                                <div className="head relative flex items-start">
                                                                    <Avatar src="https://avatars.githubusercontent.com/u/143791054?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                </div>
                                                                <div className="head relative flex items-start">
                                                                    <Avatar src="https://avatars.githubusercontent.com/u/73122721?v=4" name="Donace" className="w-6 h-6 bg-center bg-cover relative" radius="full" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Button>
                                                    <div className="text-tined text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out text-sm">Tiếp, Tùng, Hướng và 2 người khác</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex justify-center items-center">
                    <Card className="w-[200px] space-y-5 p-4" radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}