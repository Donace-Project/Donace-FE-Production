"use client";
import { SearchIcon } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowUpRight, Mail, MailPlus, Send } from "lucide-react";
import { Divider } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GetCalendarById, ListEventByUser, UserProfile } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import React from "react";
import { data } from "autoprefixer";
import { format, set } from 'date-fns';

export type User = {
    code: string
    success: boolean
    result: Users[]
    pageInfo: any
}

export type Users = {
    id: string
    userName: string
    avatar: string
    email: string
    creationTime: string
}

export type detailUserJoin = {
    id: string,
    userName: string,
    email: string,
    avatar: string
}
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

export type Events = {
    totalCount: number;
    items: Item[];
}

export type Item = {
    id: string;
    startDate: string;
    endDate: string;
    addressName: string;
    lat: string;
    long: string;
    capacity: number;
    isOverCapacity: boolean;
    cover: string;
    name: string;
    theme: string;
    color: string;
    fontSize: number;
    instructions: string;
    isMultiSection: boolean;
    duration: number;
    totalGuest: number;
    calendarId: string;
    isLive: boolean;
    status: string
    isHost: boolean
}

interface DateTimeInfo {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
}




const ConvertDateTime = (dateTime: string): DateTimeInfo => {
    const date = new Date(dateTime);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return { year, month, day, hour, minute };
};





export default function CalendarPeople(props: any) {

    const modalInvite = useDisclosure();
    const modalUserDetails = useDisclosure();

    const [value, setValue] = React.useState("");
    const validateEmail = (value: any) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    var { id } = props

    const dateTimeTrue = true;

    const [getCalendars, setCalendars] = useState<GetCalendarById | null>(null);
    var [calendars, setCalendar] = useState<Calendar | null>(null);
    const [userProfile, setUserProfile] = useState<null | UserProfile>(null);
    var [futureEvents, setFutureEvents] = useState<Item[]>();
    const [thoiGian, setThoiGian] = useState(new Date());
    const [getUsers, setUsers] = useState<User | null>(null);
    const [getdataModal, setDataModal] = useState<detailUserJoin | null>(null);

    const handleOpenModal = (value: detailUserJoin) => {
        setDataModal(value);
        modalUserDetails.onOpen();
    };
    

    // if (typeof window !== 'undefined') {
    //     setUrl(window.location.href);
    // }

    //const router = useRouter();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const sendMailInviteJoin = () => {
        console.log(currentUrl);
        useEffect(() => {
            fetchWrapper.post(`/api/Calendar/invite-mail`, {email: value, urlInfo: currentUrl.substring(0, currentUrl.lastIndexOf('/')), calendarName: getCalendars?.name})
        }, []);
    }
    
    useEffect(() => {
        fetchWrapper.post(`/api/Calendar/get-by-id?Id=${id}`, null)
            .then(data => setCalendars(data));

        fetchWrapper.post('/api/Calendar/get-list', { pageNumber: 1, pageSize: 9999 })
            .then(data => setCalendar(data))

        fetchWrapper.get('/api/User/profile')
            .then((data: UserProfile) => {
                console.log(data); // Xem dữ liệu được trả về từ API
                setUserProfile(data);
            })
            .catch(error => console.error('Lỗi khi gọi API:', error));

        fetchWrapper.get(`api/Event?IsNew=${dateTimeTrue}`)
            .then(data => setFutureEvents(data.items));

        fetchWrapper.post('/api/Calendar/get-list-user', { pageNumber: 1, pageSize: 1000, id: id, keyword: "", isSubcribed: true})
            .then((data: User) => {
                //console.log(data);
                setUsers(data);
            })
        //sendMailInviteJoin()
    }, []);

    const gio = thoiGian.getHours();
    const buoi = gio >= 12 ? "PM" : "AM";

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
                                Người tham gia ({getUsers?.result ? getUsers.result.length + 1 : 1})
                            </h2>
                        </div>
                        <div className="section-subtitle -mt-3.5 mb-5 text-[#737577] dark:text-[#d2d4d7] text-base">Quản lý người đăng ký của bạn.</div>
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
                            <Button
                                onPress={modalInvite.onOpen}
                                type="button"
                                className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] hover:bg-gray-700 border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[1rem] p-[0.625rem_0.875rem] w-fit flex items-center m-0 leading-[1.5] ml-2"
                            >
                                <div className="label">Mời</div>
                            </Button>
                            <Modal
                                isOpen={modalInvite.isOpen}
                                onOpenChange={modalInvite.onOpenChange}
                                size="xl"
                                radius="lg"
                                classNames={{
                                    base: "flex flex-col relative",
                                }}
                            >
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalBody
                                                className="w-full p-[1rem_1.25rem]"
                                            >
                                                <div className="flex flex-col">
                                                    <div className="lux-alert-top pt-1">
                                                        <div className="icon-wrapper m-[0.25rem_0px_0.75rem] w-14 h-14 rounded-full text-[#737577] dark:text-[#d2d4d7] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] justify-center flex items-center">
                                                            <Mail className="w-8 h-8 block align-middle translate-y-px" />
                                                        </div>
                                                        <div className="title font-semibold text-xl mb-2">Mời mọi người tham gia lịch của bạn</div>
                                                        <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Chúng tôi sẽ gửi mail yêu cầu tham gia lịch tới những người bạn mời đến.</div>
                                                    </div>
                                                    <div className='gap-4 mt-2 flex flex-col'>
                                                        <div className='lux-input-wrapper medium max-w-[auto] mt-2'>
                                                            <div className='inner-wrapper inline-block w-full'>
                                                                <label className='text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out'>
                                                                    <div>Email</div>
                                                                </label>
                                                                <div className='input-wrapper flex items-baseline'>
                                                                    <div className='flex-1 flex items-center'>
                                                                        <div>&nbsp;</div>
                                                                        <Input
                                                                            value={value}
                                                                            isInvalid={isInvalid}
                                                                            color={isInvalid ? "danger" : "success"}
                                                                            errorMessage={isInvalid && "Vui lòng điền đúng email."}
                                                                            onValueChange={setValue}
                                                                            isClearable
                                                                            placeholder='Điền email của người bạn muốn mời.'
                                                                            size='md'
                                                                            variant='bordered'
                                                                            type='email'
                                                                            inputMode='text'
                                                                            classNames={{
                                                                                input: [
                                                                                    "text-sm",
                                                                                ],
                                                                                errorMessage: [
                                                                                    "text-sm",
                                                                                    "font-normal"
                                                                                ]
                                                                            }}
                                                                            startContent={<MailPlus className="w-5 h-5 block align-middle mr-2 translate-y-[0.025px]" />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='gap-2 flex justify-end items-center'>
                                                            <Link
                                                                onClick={sendMailInviteJoin}
                                                                className='text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit mt-4 flex items-center m-0'
                                                            >
                                                                <Send className="w-5 h-5 block align-middle translate-y-px" />
                                                                <div className='label'>Gửi</div>
                                                            </Link>
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

                    <div onClick={() => handleOpenModal(
                        {
                            id: userProfile?.result.id ? userProfile.result.id : "0", 
                            userName: userProfile?.result.userName ? userProfile.result.userName : "", 
                            email: userProfile?.result.email ? userProfile.result.email : "", 
                            avatar: userProfile?.result.avatar ? userProfile.result.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"
                        })} className="simple-table-wrapper bg-[#f2f3f4] mt-2 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
                        <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] cursor-pointer transition-all duration-300 ease-in-out">
                            <div className="gap-3 flex justify-between items-center">
                                <div className="avatar-wrapper small">
                                    <Avatar
                                        radius="full"
                                        src={userProfile?.result.avatar ? userProfile.result.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"}
                                        name="Donace"
                                        className="w-6 h-6 bg-center bg-cover bg-[#fff] relative"
                                    />
                                </div>
                                <div className="info overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] min-w-0 flex-1">
                                    <div className="name inline">
                                        <div className="inline font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme dark:text-[#fff] mr-2 min-w-0">{userProfile?.result.userName}</div>
                                    </div>
                                    <div className="email inline overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] dark:text-[#939597] min-w-0">{userProfile?.result.email}</div>
                                </div>
                                {/* //TODO: Chỗ này đổi thành ngày người tham gia lịch */}
                                <span className="whitespace-nowrap text-sm text-[#b3b5b7] dark:text-[#939597]" title="dat">5 Tháng 9</span>
                            </div>
                        </div>
                    </div>     

                    {getUsers?.result ? getUsers.result.map((item) => (
                        <div onClick={() => handleOpenModal(
                            {
                                id: item.id, 
                                userName: item.userName, 
                                email: item.email, 
                                avatar: item.avatar,
                            })} className="simple-table-wrapper bg-[#f2f3f4] mt-2 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.04)]">
                            <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] cursor-pointer transition-all duration-300 ease-in-out">
                                <div className="gap-3 flex justify-between items-center">
                                    <div className="avatar-wrapper small">
                                        <Avatar
                                            radius="full"
                                            src={userProfile?.result.avatar ? userProfile.result.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"}
                                            name="Donace"
                                            className="w-6 h-6 bg-center bg-cover bg-[#fff] relative"
                                        />
                                    </div>
                                    <div className="info overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] min-w-0 flex-1">
                                        <div className="name inline">
                                            <div className="inline font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme dark:text-[#fff] mr-2 min-w-0">{item.userName}</div>
                                        </div>
                                        <div className="email inline overflow-hidden text-ellipsis whitespace-nowrap text-[#b3b5b7] dark:text-[#939597] min-w-0">{item.email}</div>
                                    </div>
                                    {/* //TODO: Chỗ này đổi thành ngày người tham gia lịch */}
                                    <span className="whitespace-nowrap text-sm text-[#b3b5b7] dark:text-[#939597]" title="dat">{format(new Date(item.creationTime), 'dd/MM/yyyy')}</span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <></>
                    )}               

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
                            ],
                            closeButton: [
                                "hidden"
                            ]
                        }}
                        isOpen={modalUserDetails.isOpen}
                        onOpenChange={modalUserDetails.onOpenChange}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Chi tiết người tham gia</ModalHeader>
                                    <Divider />
                                    <ModalBody>
                                        <div>
                                            <div className="can-divide with-divider small">
                                                <div className="spread flex justify-between items-center">
                                                    <div className="gap-3 flex items-center">
                                                        <div className="avatar-wrapper">
                                                            <Avatar
                                                                src={getdataModal?.avatar ? getdataModal.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"}
                                                                radius="full"
                                                                name="Donace"
                                                                className="w-10 h-10 bg-center bg-cover bg-white relative"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">{getdataModal?.userName}</div>
                                                            <div className="cursor-copy text-sm text-[#737577] dark:text-[#d2d4d7]">{getdataModal?.email}</div>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] border-transparent bg-transparent p-0 h-auto border-none rounded-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0">
                                                        <div className="label">Xóa</div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="can-divide with-divider small mt-5 pt-5 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                                                <div className="section-title-wrapper small">
                                                    <div className="section-title-row mb-4 flex justify-between items-center">
                                                        <h2 className="text-lg font-semibold text-black-light-theme dark:text-[#fff] mb-0">Sự kiện</h2>
                                                    </div>
                                                </div>
                                                {futureEvents && futureEvents.length > 0 ? (
                                                    futureEvents.map((event, index) => (
                                                        <div key={index} className="mb-2 simple-table-wrapper border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden bg-[#f2f3f4] dark:bg-[rgba(255,255,255,0.04)]">
                                                            <div className="base-row border-b-0 border-t-0 p-[0.75rem_1rem] transition-all duration-300 ease-in-out">
                                                                <div>
                                                                    <Link
                                                                        className="text-black-light-theme dark:text-[#fff] transition-all duration-300 ease-in-out cursor-pointer"
                                                                        href=""
                                                                        underline="none"
                                                                    >
                                                                        <div className="font-semibold">{event.name}</div>
                                                                    </Link>
                                                                    <div className="gap-2 flex justify-between items-center">
                                                                        <div className="text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">{ConvertDateTime(event.startDate).day} tháng {ConvertDateTime(event.startDate).month}, {ConvertDateTime(event.startDate).year}, {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute} {buoi}</div>
                                                                        {event.status ? (
                                                                            <Chip className="p-[0.25rem_0.4375rem] text-xs whitespace-nowrap inline-flex items-center font-medium text-[#07a460] dark:text-[#47c97e] bg-[#07a46022] dark:bg-[#07a46022]">
                                                                                <div>{event.status}</div>
                                                                            </Chip>
                                                                        ) : (
                                                                            <Chip
                                                                                color="danger"
                                                                                className="p-[0.25rem_0.4375rem] text-xs whitespace-nowrap inline-flex items-center font-medium"
                                                                            >
                                                                                <div>Chưa tham gia</div>
                                                                            </Chip>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-red-500">Bạn hiện không có tham gia event nào cả</div>
                                                )}
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