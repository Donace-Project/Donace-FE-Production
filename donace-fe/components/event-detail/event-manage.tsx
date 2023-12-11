'use client';
import "./global.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, Divider, ModalFooter } from "@nextui-org/react";
import { ArrowUpRight, ChevronDownIcon, MapPin, ScanLine } from "lucide-react";
import { EventDetailModels, GetCalendarById } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addHours } from "date-fns";
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItemProps } from "@nextui-org/dropdown";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../Animation_1701106485452.json";
import QRScanner from "../QR/QRScanner";

const goongGeocoder = require("@goongmaps/goong-geocoder");

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

const CovertDate = (date: string) => {
    return date.split("T");
}

const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];


const DayOfWeek = (date: string) => {
    let currentDate = new Date(date).getDay();
    return daysOfWeek[currentDate]
}
export default function EventManage(props: any) {
    var { id } = props
    // -----------------Start: Local Variable-----------------
    const labelsMap = {
        offline: "Offline",
        online: "Online",
    };
    let map: any;
    // Lấy hostname và port
    const [currentURL, setCurrentURL] = useState('');
    let endedEvent: boolean;
    // -----------------End: Local Variable-----------------

    // -----------------Start: useDisclosure-----------------
    const modalEditEvent = useDisclosure();
    const modalEditMap = useDisclosure();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // -----------------End: useDisclosure-----------------

    const Refbackground = useRef<any>(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedLocation, setSelectedLocation] = useState<{
        lat: number | null;
        lng: number | null;
    }>({ lat: null, lng: null });

    const [geocoder, setGeocoder] = useState<any>(null);

    // -----------------Start: useState-----------------
    const [getCalendars, setCalendars] = useState<GetCalendarById | null>(null);
    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    let goongjs = useRef<any>(null);
    const [lat, setLat] = useState(10.8537915);
    const [lng, setLng] = useState(106.6234887);
    const [addressLat, setAddressLat] = useState(null);
    const [addressLng, setAddressLng] = useState(null);
    const [compoundLatCommune, setCompoundLatCommune] = useState(null);
    const [compoundLngCommune, setCompoundLngCommune] = useState(null);
    const [compoundLatDistrict, setCompoundLatDistrict] = useState(null);
    const [compoundLngDistrict, setCompoundLngDistrict] = useState(null);
    const [compoundLatProvince, setCompoundLatProvince] = useState(null);
    const [compoundLngProvince, setCompoundLngProvince] = useState(null);
    const [editEventName, setEditEventName] = useState(null);
    const [editEventDesc, setEditEventDesc] = useState(null);
    const [editEventStartDate, setEventStartDate] = useState(null);
    const [editEventEndDate, setEventEndDate] = useState(null);
    const [eventReq, setEventReq] = useState({
        startDate: "",
        endDate: "",
        calendarId: "",
        name: "",
        lat: "",
        long: "",
        cover: "",
        addressName: "",
    });

    const [getStartDate, SetStartDate] = useState<any>({
        date: "2023-09-22",
        time: "12:00",
    })

    const [showOfflineContent, setShowOfflineContent] = React.useState(true);
    const [selectedOption, setSelectedOption] = React.useState(
        new Set(["offline"])
    );
    const qrcodeList = useState<any>([]);
    // -----------------End: useState-----------------

    // -----------------Start: Handler-----------------
    const handleSelectedOption = (option: any) => {
        setSelectedOption(new Set([option]));
        if (option === "offline") {
            setShowOfflineContent(true);
        } else {
            setShowOfflineContent(false);
        }
    };
    const handleSaveLocation = () => {
        setShowOfflineContent(true);
        setSelectedLocation({ lat: lat, lng: lng });
    };

    const handleDateChange = (date: any) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: any) => {
        setEndDate(date);
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) return;

        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append("file", selectedFile);
        const url = await fetchWrapper.postFile("api/Common/upload-file", formData);
        if (Refbackground.current && url) {
            Refbackground.current.style.backgroundImage = `url(${url})`;

            setEventReq({
                ...eventReq,
                cover: url,
            });
        }
    };

    const handleClick = async () => {
        await handleSubmit;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dataToSend = {
            id: eventDetail?.id,
            calendarId: eventDetail?.calendarId,
            name: eventReq.name,
            startDate: addHours(startDate, 7),
            endDate: addHours(endDate, 7),
            lat: eventReq.lat,
            long: eventReq.long,
            addressName: eventDetail?.addressName
        };
        console.log(Date.now);
        try {
            if (!dataToSend.name) {
                console.error("Name field is required.");
                return;
            }
            const response = await fetchWrapper.put("/api/Event", dataToSend);
            if (!response.success) {
                console.error(`Lỗi khi tạo sự kiện: ${response.error}`);
                return;
            }
            console.log(<b>Sự kiện đã cập nhật thành công!</b>);
        } catch (error) {
            console.error(`Lỗi: ${String(Error)}`);
        }
    }

    // QR Code
    const handleChildDataChange = (dataFromChild: any) => {
        // Xử lý dữ liệu từ component con ở đây
        if (dataFromChild == "error") {
            console.log("error")
            return;
        } else {
            if (qrcodeList.includes(dataFromChild)) {
                console.log("already in list")
            } else {
                qrcodeList.push(dataFromChild)
                try {
                    fetchWrapper.post("/api/UserTickets/Check-in", {
                        dataFromChild,
                        id
                    }).then(data => console.log(data))
                }
                catch (error) {
                    console.log(error)
                }
            }
        }

    };
    // -----------------End: Handler-----------------

    // -----------------Start: Local Method-----------------
    const selectedOptionValue = Array.from(selectedOption)[0];

    async function ImportMap() {
        goongjs.current = await require("@goongmaps/goong-js");
        goongjs.current.accessToken = "wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW";
        setGeocoder(
            new goongGeocoder({
                accessToken: "sbRzCkkevuDa7mTtXzH1mE1i3CZGdFjGAcG01XqF",
                goongjs: goongjs.current,
            })
        );
    }

    const updateStartDate = (type: string, newValue: string) => {
        console.log(newValue);
        if (type === "date") {
            setEventStartDate({ ...getStartDate, date: newValue });
        } else {
            setEventStartDate({ ...getStartDate, time: newValue });
        }

        setEventReq({
            ...eventReq,
            startDate: `${getStartDate.date}T${getStartDate.time}`,
        });
    };

    // -----------------End: Local Method-----------------

    // -----------------Start: UseEffect-----------------
    useEffect(() => {
        // Khởi tạo bản đồ khi component được mount
        if (modalEditEvent.isOpen && modalEditMap.isOpen && showOfflineContent === true) {
            map = new goongjs.current.Map({
                container: "map", // ID của phần tử HTML để chứa bản đồ
                style: "https://tiles.goong.io/assets/goong_map_web.json",
                center: [lng, lat], // Tọa độ trung tâm
                zoom: 9, // Mức độ zoom mặc định
            });

            map.addControl(geocoder);
            geocoder.on("result", function (e: any) {
                setLat(e.result.result.geometry.location.lat);
                setLng(e.result.result.geometry.location.lng);
                setAddressLat(e.result.result.name);
                setAddressLng(e.result.result.name);
                setCompoundLatCommune(e.result.result.compound.commune);
                setCompoundLngCommune(e.result.result.compound.commune);
                setCompoundLatDistrict(e.result.result.compound.district);
                setCompoundLngDistrict(e.result.result.compound.district);
                setCompoundLatProvince(e.result.result.compound.province);
                setCompoundLngProvince(e.result.result.compound.province);

                setSelectedLocation({
                    lat: e.result.result.name,
                    lng: e.result.result.name,
                });

                setEventReq({
                    ...eventReq,
                    addressName: e.result.result.formatted_address,
                    lat: e.result.result.geometry.location.lat,
                    long: e.result.result.geometry.location.lng,
                    // Các giá trị khác nếu cần
                });

                console.log("update location");
            });
            return () => {
                map.remove();
            };
        }
    }, [modalEditEvent.isOpen, modalEditMap.isOpen, showOfflineContent]);

    useEffect(() => {
        const hostname = window.location.hostname;
        const port = window.location.port;
        const finalPort = port === '80' || port === '' ? '3000' : port;
        setCurrentURL(`http://${hostname}:${finalPort}`);
        console.log(currentURL)
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => {
                setEventDetail(data)
                Refbackground.current.style.backgroundImage = `url(${data.cover})`;
            });
        ImportMap();
    }, []);
    // -----------------End: UseEffect-----------------

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
                            href={`/events/detail/${eventDetail.sorted}/${eventDetail.calendarId}`}
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
                                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Sự kiện
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/guests`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
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
                <div className="mb-4">
                    {eventDetail?.isLive ? (
                        <div className="banner text-[#d19d20] dark:text-[#facc28] bg-[#d19d2022] border-[#d19d20] dark:border-[#facc28] border border-solid p-[0.5rem_0.75rem_0.5rem_1rem] font-medium text-sm gap-2 flex justify-between items-center rounded-lg">
                            <div className="gap-3 flex items-center">
                                <div className="font-medium">Sự kiện này đang diễn ra.</div>
                            </div>
                            <Button
                                className="text-[#fff] dark:text-[rgb(9,21,23)] bg-[#d19d20] border-[#d19d20] border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"

                            >
                                <div className="lael">Check In</div>
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden"></div>
                    )}
                </div>
                <div className="outer mb-8">
                    <div className="content-card p-3 relative rounded-xl bg-[#fafafc] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden">
                        <div className="inner grid grid-cols-2 gap-5">
                            <div className="preview relative">
                                <div className="relative">
                                    <div
                                        ref={Refbackground}
                                        role="button"
                                        className={`bg-[url('https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard4.png')] aspect-square rounded-lg bg-[#ebeced] dark:bg-[#333537] block ml-auto mr-auto bg-center bg-cover overflow-hidden transition-all duration-300 ease-in-out relative cursor-pointer h-full`}
                                    ></div>
                                    <div className="url-wrapper absolute p-[0.375rem_0.75rem] rounded-lg bg-[rgba(19,21,23,0.32)] z-50 bottom-2 left-2 right-2 backdrop-blur-lg shadow-md text-sm">
                                        <div className="url amimated transition-all duration-300 ease-in-out gap-2 flex justify-between items-center">
                                            <Link
                                                href={`/ user / join - event / ${eventDetail?.id}`}
                                                target="_blank"
                                                className="text-[rgba(255,255,255,0.8)] gap-1 min-w-0 flex items-center transition-all duration-300 ease-in-out cursor-pointer"
                                                underline="none"
                                            >
                                                <div className="short-description whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-sm" id="myClipboard">
                                                    {`user/join-event/${eventDetail?.id}`}
                                                </div>
                                                <div className="flex items-center">
                                                    <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                </div>
                                            </Link>
                                            <button
                                                aria-label="copy link"
                                                type="button"
                                                className="text-[rgba(255,255,255,0.48)] border-[#939597] hover:text-[#fff] bg-transparent p-0 h-auto border-none rounded-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out font-medium relative whitespace-nowrap justify-center outline-none max-w-full w-fit flex items-center m-0 leading-6"
                                            >
                                                {/* // TODO: CSS hover cho nó nháy đén */}
                                                <div className="label" onClick={(e) => navigator.clipboard.writeText(`${currentURL}/user/join-event/${eventDetail?.id}`)}>SAO CHÉP</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {eventDetail ? (
                                <div className="when-where h-full gap-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="mt-2 text-lg font-semibold mb-4">Thời gian & Địa điểm</h3>
                                        <div className="gap-4 flex flex-col">
                                            <div className="gap-4 flex items-start">
                                                <div className="calendar-card-wrapper flex">
                                                    <div className="calendar-card border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden bg-[#fff] dark:bg-[#212325] w-11 h-11">
                                                        <div className="month bg-[rgba(19,21,23,0.08)] dark:bg-[rgba(255,255,255,0.08)] text-[0.625rem] font-semibold uppercase text-center text-[#b3b5b7] dark:text-[#939597]">{ConvertDateTime(eventDetail.startDate).month}</div>
                                                        <div className="day text-lg text-center">{ConvertDateTime(eventDetail.startDate).day}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-medium">{DayOfWeek(CovertDate(eventDetail.startDate)[0])}</div>
                                                    <div className="text-sm text-[#737577] dark:text-[#d2d4d7] text-ellipsis whitespace-nowrap overflow-hidden min-w-fit">{ConvertDateTime(eventDetail.startDate).day} tháng {ConvertDateTime(eventDetail.startDate).month}, {ConvertDateTime(eventDetail.startDate).hour}:{ConvertDateTime(eventDetail.startDate).minute} - {ConvertDateTime(eventDetail.endDate).day} tháng {ConvertDateTime(eventDetail.endDate).month}, {ConvertDateTime(eventDetail.endDate).hour}:{ConvertDateTime(eventDetail.endDate).minute} GMT+7</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="gap-4 flex items-center">
                                                    <div className="icon w-11 h-11 text-[#b3b5b7] dark:text-[#939597] rounded-lg border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] flex items-center justify-center flex-shrink-0">
                                                        <MapPin className="w-5 h-5 block align-middle" />
                                                    </div>
                                                    <div>
                                                        {eventDetail.addressName ? (
                                                            <>  <div className="font-medium">{eventDetail.addressName}</div></>
                                                        ) : (
                                                            <>  <div className="font-medium">Cập nhật sau...</div></>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-[#737577] dark:text-[#d2d4d7] mt-4">Địa chỉ này sẽ được công khai trong trang Sự kiện.</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button onPress={onOpen}
                                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer"

                                        >
                                            <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                            <div className="label">Check In</div>
                                        </Button>
                                        {/* <div className="flex-1"></div> */}
                                        <div className="buttons grid gap-2 grid-cols-2 justify-between w-full">
                                            <Button
                                                onPress={modalEditEvent.onOpen}
                                                type="button"
                                                className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                            >
                                                <div className="label">Chỉnh sửa Sự kiện</div>
                                            </Button>
                                            <input
                                                aria-label="coverImage"
                                                type="file"
                                                id="coverImage"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                            <Button
                                                onClick={() => {
                                                    const fileInput = document.getElementById("coverImage");
                                                    if (fileInput) {
                                                        fileInput.click();
                                                    }
                                                }}
                                                type="button"
                                                className="text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                            >
                                                <div className="label">Đổi Hình ảnh</div>
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                        </div>
                    </div>
                </div >
            </div >
            <Modal
                isOpen={modalEditEvent.isOpen}
                onOpenChange={modalEditEvent.onOpenChange}
                size="2xl"
                classNames={{
                    closeButton: [
                        "mt-2.5",
                        "mr-2",
                        "transition-all",
                        "duration-300",
                        "ease-in-out",
                        "hover:bg-[rgba(19,21,23,0.04)]",
                        "rounded-full"
                    ]
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form action={"#"} onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1">Chỉnh sửa sự kiện</ModalHeader>
                                <Divider />
                                <ModalBody>
                                    <div className="title font-semibold text-lg">Thông tin cơ bản</div>
                                    <div className="event-name w-full pb-2 mt-2">
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            labelPlacement="outside"
                                            label="Tên sự kiện"
                                            value={eventReq.name}
                                            onChange={(e) =>
                                                setEventReq({
                                                    ...eventReq,
                                                    name: e.target.value,
                                                })
                                            }
                                            placeholder={eventDetail?.name}
                                            classNames={{
                                                inputWrapper: [
                                                    "h-[calc(2.625rem+2*1px)]",
                                                    "bg-[#fff]",
                                                    "rounded-lg",
                                                    "border",
                                                    "border-solid",
                                                    "border-[#ebeced]",
                                                    "transition-all",
                                                    "duration-300",
                                                    "ease-in-out"
                                                ],
                                                input: [
                                                    "text-lg",
                                                    "font-medium",
                                                    "text-[rgb(19,21,23)]"
                                                ],
                                                label: [
                                                    "text-sm",
                                                    "font-medium",
                                                    "text-[rgba(19,21,23,0.64)]"
                                                ]
                                            }}
                                        />
                                    </div>
                                    <div className="desc w-full pb-2 mt-2">
                                        <Textarea
                                            type="text"
                                            variant="bordered"
                                            labelPlacement="outside"
                                            label="Mô tả"
                                            placeholder="Ai sẽ tham gia Sự kiện? Sự kiện này sẽ tổ chức về cái gì?"
                                            classNames={{
                                                inputWrapper: [
                                                    "h-[calc(2.625rem+2*1px)]",
                                                    "bg-[#fff]",
                                                    "rounded-lg",
                                                    "border",
                                                    "border-solid",
                                                    "border-[#ebeced]",
                                                    "transition-all",
                                                    "duration-300",
                                                    "ease-in-out"
                                                ],
                                                input: [
                                                    "text-base",
                                                    "font-normal",
                                                    "text-[rgb(19,21,23)]"
                                                ],
                                                label: [
                                                    "text-sm",
                                                    "font-medium",
                                                    "text-[rgba(19,21,23,0.64)]"
                                                ]
                                            }}
                                        />
                                        <hr className="mt-6 border-solid border-[rgba(19,21,23,0.08)] border-b"></hr>
                                    </div>
                                    <div className="time w-full pt-1.5 mb-2">
                                        <div className="time-title font-semibold text-lg">Thời gian</div>
                                        <div className="w-full gap-2 flex justify-between pt-4">
                                            <div className="date-picker-container flex flex-col flex-grow-0">
                                                <div className="label">Bắt đầu</div>
                                                <DatePicker
                                                    todayButton="Hôm nay"
                                                    selected={startDate}
                                                    onChange={handleDateChange}
                                                    startDate={startDate}
                                                    timeInputLabel="Time:"
                                                    dateFormat="dd/MM/yyyy h:mm aa"
                                                    showTimeInput
                                                    fixedHeight
                                                    className="border-2 border-solid border-[#babac1] focus:border-[rgb(19,21,23)] rounded-lg pl-16 pr-8 mt-2"
                                                    placeholderText="Ngày Bắt đầu sự kiện"
                                                />
                                            </div>
                                            <div className="date-picker-container flex flex-col flex-grow-0">
                                                <div className="label">Kết thúc</div>
                                                <DatePicker
                                                    fixedHeight
                                                    selected={endDate}
                                                    onChange={handleEndDateChange}
                                                    selectsEnd
                                                    endDate={endDate}
                                                    minDate={startDate}
                                                    timeInputLabel="Time:"
                                                    dateFormat="dd/MM/yyyy h:mm aa"
                                                    className="border-2 border-solid border-[#babac1] focus:border-[rgb(19,21,23)] rounded-lg pl-16 pr-8 mt-2"
                                                    placeholderText="Ngày Kết thúc sự kiện"
                                                />
                                            </div>
                                        </div>
                                        <hr className="mt-6 border-solid border-[rgba(19,21,23,0.08)] border-b"></hr>
                                    </div>
                                    <div className="location w-full mt-2">
                                        <div className="time-title font-semibold text-lg">Chọn địa điểm</div>
                                        <div className="gap-4 flex items-center " onClick={modalEditMap.onOpen}>
                                            <Input
                                                className="hidden"
                                                value={eventReq.lat}
                                                onChange={(e) =>
                                                    setEventReq({
                                                        ...eventReq,
                                                        lat: e.target.value,
                                                    })
                                                }
                                            />
                                            <Input
                                                className="hidden"
                                                value={eventReq.long}
                                                onChange={(e) =>
                                                    setEventReq({
                                                        ...eventReq,
                                                        long: e.target.value,
                                                    })
                                                }
                                            />
                                            <div

                                                className="w-full p-[0.25rem_1rem_0.25rem] cursor-pointer transition-all duration-300 ease-in-out block relative rounded-xl bg-[#f3f4f5] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
                                            >
                                                <div className="font-medium">
                                                    {addressLat && addressLng ? (
                                                        <div>{addressLat}</div>
                                                    ) : (
                                                        "Chỉnh sửa địa điểm diễn ra sự kiện"
                                                    )}
                                                </div>
                                                {compoundLatCommune &&
                                                    compoundLngCommune &&
                                                    compoundLatDistrict &&
                                                    compoundLngDistrict &&
                                                    compoundLatProvince &&
                                                    compoundLngProvince ? (
                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] max-w-[19rem]">
                                                        <p>
                                                            {compoundLatCommune},{" "}
                                                            {compoundLatDistrict},{" "}
                                                            {compoundLatProvince}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] max-w-[19rem]">
                                                        Sự kiện tổ chức Online hoặc Offline
                                                    </div>
                                                )}
                                                {/* <div className="text-sm text-[#737577] dark:text-[#d2d4d7]">Online hoặc Offline</div> */}
                                            </div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        onClick={handleClick}
                                        color="success"
                                        type="submit"
                                        className="text-[#ffff] font-medium text-xs border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                    >
                                        Cập nhật Sự kiện
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={modalEditMap.isOpen}
                onOpenChange={modalEditMap.onOpenChange}
                size="3xl"
                placement="center"
                scrollBehavior="outside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Thêm địa điểm diễn ra sự kiện
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="pt-2 m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="font-medium text-base text-black-light-theme dark:text-[#fff] translate-y-2">
                                        Chọn địa điểm:
                                    </div>
                                    <ButtonGroup
                                        variant="flat"
                                        className="ml-[14rem]"
                                    >
                                        <Button>
                                            {
                                                (
                                                    labelsMap as {
                                                        [key: string]: string;
                                                    }
                                                )[selectedOptionValue]
                                            }
                                        </Button>
                                        <Dropdown
                                            placement="bottom-end"
                                            classNames={{
                                                base: [
                                                    "min-w-0",
                                                    "right-[1.6rem]",
                                                ],
                                            }}
                                        >
                                            <DropdownTrigger>
                                                <Button isIconOnly>
                                                    <ChevronDownIcon />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                disallowEmptySelection
                                                selectedKeys={selectedOption}
                                                selectionMode="single"
                                                onSelectionChange={(option) =>
                                                    handleSelectedOption(option)
                                                }
                                                className="max-w-[300px]"
                                            >
                                                <DropdownItem
                                                    as={"button"}
                                                    key="offline"
                                                    onClick={() =>
                                                        handleSelectedOption(
                                                            "offline"
                                                        )
                                                    }
                                                    className="w-fit"
                                                >
                                                    {labelsMap["offline"]}
                                                </DropdownItem>
                                                <DropdownItem
                                                    as={"button"}
                                                    key="online"
                                                    onClick={() =>
                                                        handleSelectedOption(
                                                            "online"
                                                        )
                                                    }
                                                    className="w-fit"
                                                >
                                                    {labelsMap["online"]}
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </ButtonGroup>
                                    <div className="col-span-2 md:col-span-1">
                                        {showOfflineContent ? (
                                            <div
                                                className="mt-4 rounded-md border border-solid border-transparent"
                                                id="map"
                                                style={{
                                                    width: "700px",
                                                    height: "400px",
                                                }}
                                            ></div>
                                        ) : (
                                            <div>
                                                <Player
                                                    autoplay
                                                    loop
                                                    src={Animation}
                                                    style={{
                                                        height: "350px",
                                                        width: "400px",
                                                        marginLeft: "10rem",
                                                        justifyContent: "center",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                ></Player>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex">
                                        {showOfflineContent ? (
                                            <div className="flex justify-end ml-[39rem]">
                                                <Button
                                                    onPress={modalEditMap.onClose}
                                                    onClick={handleSaveLocation}
                                                    type="submit"
                                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                >
                                                    <div className="label">
                                                        Lưu
                                                    </div>
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                <div className="flex-grow mr-2">
                                                    <Input
                                                        variant="underlined"
                                                        placeholder="Nhập Link của bạn."
                                                        isClearable
                                                        classNames={{
                                                            base: ["w-[38.5rem]"],
                                                            input: [
                                                                "text-lg",
                                                                "font-normal",
                                                            ],
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex items-center">
                                                    <Button
                                                        type="submit"
                                                        className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                    >
                                                        <div className="label">
                                                            Lưu
                                                        </div>
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="4xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Scan QR code below</ModalHeader>
                            <ModalBody>
                                <div className='w-full  m-auto'>
                                    <QRScanner onChildDataChange={handleChildDataChange} />
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}