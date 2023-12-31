'use client';
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { EventDetailModels, ListUserJoinEvent } from "@/types/DonaceType";
import { Link } from "@nextui-org/link";
import { ArrowUpRight, ArrowUpToLine, CheckCircle2, Info, MailOpen, PencilLine, SearchIcon, Send, Sparkles, Upload, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, Divider, Progress } from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/modal";
import { User } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";

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

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

export default function EventUserJoin(props: any) {

    const [selectedColor, setSelectedColor] = React.useState("default");

    const modalInviteUser = useDisclosure();
    const modalEditCapacity = useDisclosure();
    const [showEmailContent, setShowEmailContent] = useState(false);
    const [showNoContent, setShowNoContent] = useState(false);
    const [showSuggestedContent, setShowSuggestedContent] = useState(false);

    const statusAppro = 2;
    const statusDeclin = 1;

    const handleEmailButtonClick = () => {
        setShowEmailContent(true);
        setShowSuggestedContent(false);
        setShowNoContent(false);
    };

    const handleSuggestedButtonClick = () => {
        setShowEmailContent(false);
        setShowSuggestedContent(true);
        setShowNoContent(false);
    };

    const handleNoContentClick = () => {
        setShowNoContent(true)
        setShowEmailContent(false);
        setShowSuggestedContent(false);
    }

    const validateEmail = (email: any) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const [email, setEmail] = React.useState("");

    const isInvalid = React.useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    var { id } = props

    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    const [userJoin, setUserJoin] = useState<ListUserJoinEvent[]>([]);

    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const [eventReq, setEventReq] = useState({
        startDate: "",
        endDate: "",
        calendarId: "",
        name: "",
        lat: "",
        long: "",
        cover: "",
        addressName: "",
        capacity: "",
    });

    const handleClick = async () => {
        await handleSubmit;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dataToSend = {
            id: eventDetail?.id,
            calendarId: eventDetail?.calendarId,
            name: eventDetail?.name,
            startDate: eventDetail?.startDate,
            endDate: eventDetail?.endDate,
            lat: eventDetail?.lat,
            long: eventDetail?.long,
            addressName: eventDetail?.addressName,
            capacity: eventReq.capacity,
        };
        try {
            if (!dataToSend.name) {
                console.error("Name field is required.");
                return;
            }
            const response = await fetchWrapper.put("/api/Event", dataToSend);
            if (!response.success) {
                console.error(`Lỗi khi cập nhật số lượng: ${response.error}`);
                return;
            }
            console.log(<b>Đã cập nhật số lượng thành công!</b>);
        } catch (error) {
            console.error(`Lỗi: ${String(Error)}`);
        }
    }



    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));

        fetchWrapper.get(`api/Event/user-join/${id}`)
            .then(data => setUserJoin(data));

    }, []);

    // useEffect(() => {
    //     setIdPart(userJoin);
    // }, [userJoin]);

    const [showAcceptDiv, setShowAcceptDiv] = useState(false);

    // const handleRenderPage = () => {
    //     handleApprovalClick();
    //     setStatus(2)
    //     setShowAcceptDiv(true);
    // }

    function handleApprovalClick(idPart: string, idUser: string) {
        fetchWrapper.post(`api/Event/approval`, { idPart: idPart, status: statusAppro, qr: "VaiLAnhTiepOI", userId: idUser })
            .then(data => {

                fetchWrapper.get(`api/Event/user-join/${id}`)
                    .then(data => setUserJoin(data));
            })
            .catch(error => console.error("Error:", error));
    };

    const handleApprovalDeclineClick = (idPart: string, idUser: string) => {
        // Gọi API khi người dùng click vào nút
        fetchWrapper.post(`api/Event/approval`, { idPart: idPart, status: statusDeclin, qr: "VaiLAnhTiepOI", userId: idUser })
            .then(data => {
                fetchWrapper.get(`api/Event/user-join/${id}`)
                    .then(data => setUserJoin(data));
            })
            .catch(error => console.error("Error:", error));
    };

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
                            href={`/user/join-event/${id}`}
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
                                href={`/events/manage/${eventDetail?.id}/payment`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/insights`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Doanh thu
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/more`}
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
                                        aria-label="Joining..."
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
                    {/* TODO: Sẽ xuất hiện khi mà sự kiện bị đóng để thông báo */}
                    {/* <div className="pt-1 translate-x-2 text-[#737577] gap-2 flex items-baseline">
                        <div className="icon-wrapper flex items-center">
                            <AlertCircle className="translate-y-0.5 block w-4 h-4 align-middle" />
                        </div>
                        <div>Sự kiện đã bị đóng.</div>
                    </div> */}
                    <div className="quick-actions-wrapper mt-6">
                        <div className="quick-actions grid grid-cols-3 gap-2">
                            <Button
                                onPress={modalInviteUser.onOpen}
                                onClick={handleNoContentClick}
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
                                onPress={modalEditCapacity.onOpen}
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
                            <Modal
                                isOpen={modalEditCapacity.isOpen}
                                onOpenChange={modalEditCapacity.onOpenChange}
                                size="sm"
                                radius="lg"
                                classNames={{
                                    base: "flex flex-col relative",
                                    closeButton: "hidden",
                                }}
                            >
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <form action={"#"} onSubmit={handleSubmit}>

                                                <ModalBody className="w-full p-[1rem_1.25rem]">
                                                    <div className="flex flex-col">
                                                        <div className="lux-alert-top pt-1">
                                                            <div className="icon-wrapper m-[0.25rem_0px_0.75rem] w-14 h-14 rounded-full text-[#737577] dark:text-[#d2d4d7] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] justify-center flex items-center">
                                                                <Upload className="w-8 h-8 block align-middle" />
                                                            </div>
                                                            <div className="title font-semibold text-xl mb-2">
                                                                Chỉnh sửa Số lượng
                                                            </div>
                                                            <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">
                                                                Đóng đăng ký tự động khi đã đạt số
                                                                lượng đăng ký. Chỉ những khách mời
                                                                được phê duyệt mới được tính vào số
                                                                lượng đã đủ.
                                                            </div>
                                                        </div>
                                                        <div className="gap-4 pt-1 mt-2 flex flex-col">
                                                            <div className="lux-input-wrapper medium max-w-[auto]">
                                                                <div className="inner-wrapper inline-block w-full">
                                                                    <label className="text-sm cursor-pointer block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out">
                                                                        <div>Số lượng</div>
                                                                    </label>
                                                                    <div className="input-wrapper flex items-baseline">
                                                                        <div className="flex-1 flex items-center">
                                                                            <div>&nbsp;</div>
                                                                            <Input
                                                                                placeholder="99"
                                                                                size="md"
                                                                                variant="bordered"
                                                                                type="number"
                                                                                inputMode="numeric"
                                                                                step={1}
                                                                                min={1}
                                                                                classNames={{
                                                                                    input: ["text-base"],
                                                                                }}
                                                                                value={eventReq.capacity}
                                                                                onChange={(e) =>
                                                                                    setEventReq({
                                                                                        ...eventReq,
                                                                                        capacity: e.target.value,
                                                                                    })
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="gap-2 flex justify-between items-center">
                                                                <Button
                                                                    onPress={modalEditCapacity.onClose}
                                                                    onClick={handleClick}
                                                                    type="submit"
                                                                    className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                                                >
                                                                    <div className="label">
                                                                        Đặt giới hạn
                                                                    </div>
                                                                </Button>
                                                                <Button
                                                                    onPress={modalEditCapacity.onClose}
                                                                    type="button"
                                                                    className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                                                >
                                                                    <div className="label">
                                                                        Không giới hạn
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ModalBody>
                                            </form>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                            <Button
                                type="button"
                                className="bg-[#f4f5f6] rounded-xl h-auto borde-0 font-medium overflow-hidden p-[0.5rem_0.75rem_0.5rem_0.5rem] relative transition-all duration-300 ease-in-out cursor-pointer flex m-0"
                            >
                                <div className="content gap-3 relative pointer-events-none transition-all duration-300 ease-in-out flex-1 flex items-center">
                                    <div className="icon rounded-lg bg-[#e83b4722] text-[#e83b47] p-2 pointer-events-none justify-center flex items-center">
                                        <XCircle className="w-6 h-6 block align-middle" />
                                    </div>
                                    {/* TODO: Khi mà event hủy đăng ký thì sẽ hiển thị */}
                                    {/* <div className="icon rounded-lg bg-[#07a46022] text-[#07a460] p-2 pointer-events-none justify-center flex items-center">
                                        <CheckCircle2 className="w-6 h-6 block align-middle" />
                                    </div> */}
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
                                    aria-label="select key"
                                    items={userJoin}
                                    placeholder="Hiển thị danh sách người tham dự"
                                    className="max-w-xs"
                                >
                                    {(user) => <SelectItem key={user.id}>{user.name}</SelectItem>}
                                </Select>
                            </div>
                            <div className="time inline-flex min-w-0">
                                <div className="label">5 tháng 9</div>
                            </div>
                        </div>
                        {userJoin ? (
                            userJoin.length > 0 ? (
                                userJoin.map((user) => (
                                    <div key={user.id} className="simple-table-wrapper bg-[#f2f3f4] mt-2 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
                                        <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] cursor-pointer transition-all duration-300 ease-in-out">
                                            <div className="gap-3 flex justify-between items-center">
                                                <div className="avatar-wrapper small">
                                                    <Avatar
                                                        radius="full"
                                                        src={user.avatar ? user.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"}
                                                        name="Donace"
                                                        className="w-6 h-6 bg-center bg-cover bg-[#fff] relative"
                                                    />
                                                </div>
                                                <div className="info overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] min-w-0 flex-1">
                                                    <div className="name inline">
                                                        <div className="inline font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme dark:text-[#fff] mr-2 min-w-0">{user.name}</div>
                                                    </div>
                                                    <div className="email inline overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] dark:text-[#939597] min-w-0">{user.email}</div>
                                                </div>
                                                {user.status == 0 && (
                                                    <div className="flex space-x-4">
                                                        <Button
                                                            color="success"
                                                            onClick={() => handleApprovalClick(user.id, user.userId)}
                                                            className="text-[#fff] text-base font-medium"
                                                        >
                                                            <div className="icon">
                                                                <CheckCircle2 className="align-middle block w-4 h-4" />
                                                            </div>
                                                            <div className="label">Chấp nhận</div>
                                                        </Button>
                                                        <Button
                                                            color="danger"
                                                            onClick={() => handleApprovalDeclineClick(user.id, user.userId)}
                                                            className="text-base font-medium"
                                                        >
                                                            <div className="icon">
                                                                <XCircle className="align-middle block w-4 h-4" />
                                                            </div>
                                                            <div className="label">Từ chối</div>
                                                        </Button>
                                                    </div>
                                                )}
                                                {user.status === 2 && (
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="icon mr-2">
                                                            <Info className="block align-middle items-center w-4 h-4" />
                                                        </div>
                                                        <div className="label">
                                                            Người dùng này đã tham gia sự kiện
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                    <div className="icon justify-center flex items-center">
                                        <Users className="w-16 h-16 text-black-blur-light-theme block align-middle" />
                                    </div>
                                    <h3 className="text-black-more-blur-light-theme p-0 mt-4 mb-0 text-lg font-semibold">Không có khách nào tham dự</h3>
                                    <div className="pl-12 pr-12 text-black-blur-light-theme mt-2">
                                        Chia sẻ hoặc Mời bạn bè tham gia sự kiện!
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                <div className="icon justify-center flex items-center">
                                    <Users className="w-16 h-16 text-black-blur-light-theme block align-middle" />
                                </div>
                                <h3 className="text-black-more-blur-light-theme p-0 mt-4 mb-0 text-lg font-semibold">Không có khách nào tham dự</h3>
                                <div className="pl-12 pr-12 text-black-blur-light-theme mt-2">
                                    Chia sẻ hoặc Mời bạn bè tham gia sự kiện!
                                </div>
                            </div>
                        )}
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
                                                onClick={handleSuggestedButtonClick}
                                                type="button"
                                                className="text-black-light-theme flex items-center gap-3 p-2 m-[0px_-0.5rem] rounded-md w-full font-medium cursor-pointer transition-all duration-300 ease-in-out border border-solid border-transparent"
                                            >
                                                <div className="icon flex justify-center min-w-[1rem] text-black-blur-light-theme">
                                                    <Sparkles className="block w-4 h-4 align-middle" />
                                                </div>
                                                <div className="label text-sm">Đề xuất</div>
                                            </button>
                                            <button
                                                onClick={handleEmailButtonClick}
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
                                                onClick={handleSuggestedButtonClick}
                                                type="button"
                                                className="p-[0.25rem_0.5rem] m-[0.25rem_-0.5rem] rounded-lg w-full cursor-pointer transition-all duration-300 ease-in-out bg-transparent border border-solid border-transparent flex flex-col items-start"
                                            >
                                                <div className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">{eventDetail?.name}</div>
                                                <div className="text-xs text-black-blur-light-theme">{ConvertDateTime(eventDetail?.startDate).day} tháng {ConvertDateTime(eventDetail?.startDate).month}, 1 khách</div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="right flex flex-col w-[70%] min-w-[350px] min-h-[70dvh] h-full relative">
                                        {showSuggestedContent && (
                                            <div className="min-h-0 flex-1 flex flex-col">
                                                <div className="search-bar z-20 p-[1rem_1rem_0px] relative">
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
                                                <div className="pl-4 pr-4 pb-2 pt-4 overflow-auto">
                                                    <div className="flex pl-4 pr-4 justify-between items-center pb-4">
                                                        <div className="guests text-black-more-blur-light-theme font-normal">2 người</div>
                                                        <div className="select cursor-pointer text-black-more-blur-light-theme font-normal">Chọn hết</div>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <Table
                                                            isStriped
                                                            color="default"
                                                            selectionMode="multiple"
                                                            aria-label="Example static collection table"
                                                        >
                                                            <TableHeader>
                                                                <TableColumn>Tên</TableColumn>
                                                            </TableHeader>
                                                            <TableBody className="flex justify-start items-start">
                                                                <TableRow key="1">
                                                                    <TableCell>
                                                                        <User
                                                                            name="Nguyễn Hoàng Tùng"
                                                                            description="nguyenhoangtung@gmail.com"
                                                                            avatarProps={{
                                                                                src: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_30.png"
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow key="2">
                                                                    <TableCell>
                                                                        <User
                                                                            name="Nguyễn Hoàng Tùng"
                                                                            description="nguyenhoangtung@gmail.com"
                                                                            avatarProps={{
                                                                                src: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_30.png"
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {showEmailContent && (
                                            <div className="min-h-0 flex-1 flex flex-col">
                                                <div className="search-bar z-20 p-[1rem_1rem_0px] relative">
                                                    <div className="flex justify-between relative overflow-hidden items-center transition-all duration-300 ease-in-out">
                                                        <Input
                                                            type="email"
                                                            value={email}
                                                            isInvalid={isInvalid}
                                                            color={isInvalid ? "danger" : "success"}
                                                            onValueChange={setEmail}
                                                            isClearable
                                                            variant="bordered"
                                                            startContent={<SearchIcon className="dark:text-[rgba(255,255,255,0.32)]" />}
                                                            placeholder="Nhập Email của bạn.."
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
                                                        <Button
                                                            type="button"
                                                            className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] hover:bg-gray-700 border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[1rem] p-[0.625rem_0.875rem] w-fit flex items-center m-0 leading-[1.5] ml-2"
                                                        >
                                                            <div className="label">Thêm</div>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-3 mt-6">
                                                    <Table
                                                        isStriped
                                                        color="default"
                                                        selectionMode="multiple"
                                                        aria-label="Example static collection table"
                                                    >
                                                        <TableHeader>
                                                            <TableColumn>Tên</TableColumn>
                                                        </TableHeader>
                                                        <TableBody className="flex justify-start items-start">
                                                            <TableRow key="1">
                                                                <TableCell>
                                                                    <User
                                                                        name="Nguyễn Hoàng Tùng"
                                                                        description="nguyenhoangtung@gmail.com"
                                                                        avatarProps={{
                                                                            src: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_30.png"
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key="2">
                                                                <TableCell>
                                                                    <User
                                                                        name="Nguyễn Hoàng Tùng"
                                                                        description="nguyenhoangtung@gmail.com"
                                                                        avatarProps={{
                                                                            src: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_30.png"
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        )}
                                        {showNoContent && (
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
                                                        onClick={handleEmailButtonClick}
                                                        type="button"
                                                        className="text-[#fff] bg-[#333537] border-[#333537] border-solid border cursor-auto transition-all duration-300 ease-in-out donace-button-w-fit flex items-center mt-4 translate-x-8"
                                                    >
                                                        <div className="label">Thêm email thủ công</div>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
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