"use client";

import { Avatar } from "@nextui-org/avatar";
import { Input, Textarea } from "@nextui-org/input";

import {
  ArrowUp,
  ArrowUpToLine,
  CheckCircle2,
  ChevronDown,
  ChevronDownIcon,
  Coins,
  CreditCard,
  Globe,
  MapPin,
  Pen,
  Plus,
  PlusIcon,
  Ticket,
  Upload,
  UserCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Spinner, Switch, User } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/react";

//@ts-ignore
// import goongjs from '@goongmaps/goong-js';
//@ts-ignore
import GoongGeocoder from "@goongmaps/goong-geocoder";
import { Link } from "@nextui-org/link";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../Animation_1701106485452.json";
import { NumericFormat } from "react-number-format";
import { CreateEventModel } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
export default function CreateFormFinal() {
  let goongjs = useRef<any>(null);

  // ?: options chọn địa điểm
  const [selectedOption, setSelectedOption] = React.useState(
    new Set(["offline"])
  );
  const [showOfflineContent, setShowOfflineContent] = React.useState(true);
  const [getCreateEvent, setCreateEvent] = useState<CreateEventModel | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  let map:any;
  const modalMap = useDisclosure();
  const modalCapacity = useDisclosure();
  const modalPayment = useDisclosure();
  const modalCreateCalendar = useDisclosure();
  const modalPriceEvent = useDisclosure();

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [result, setResult] = useState("");

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

  const [isCreating, setIsCreating] = useState(false);

  const [capacity, setCapacity] = useState("");

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  const [geocoder, setGeocoder] = useState<any>(null);

  const labelsMap = {
    offline: "Offline",
    online: "Online",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  const handleSelectedOption = (option: any) => {
    setSelectedOption(new Set([option]));
    if (option === "offline") {
      setShowOfflineContent(true);
    } else {
      setShowOfflineContent(false);
    }
  };

  const handleInputChange = (event: any) => {
    // Xử lý giá trị nhập vào nếu cần thiết
    console.log(event.target.value);
  };
  //

  const handleClick = async () => {
    await handleSubmit;
  };

  const handleSaveLocation = () => {
    setShowOfflineContent(true); // Hiển thị nội dung offline
    setSelectedLocation({ lat: lat, lng: lng }); // Lưu thông tin địa điểm đã chọn
  };

  const [getEventReq, setEventReq] = useState({
    startDate: "",
    endDate: "",
    addressName: "",
    lat: "",
    long: "",
    capacity: "",
    isOverCapacity: "",
    cover: "",
    name: "",
    theme: "",
    color: "",
    fontSize: "",
    instructions: "",
    isMultiSection: "",
    duration: "",
    calendarId: "",
    // Thêm các trường dữ liệu khác của form nếu có
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Xây dựng đối tượng dữ liệu từ formData
    const dataToSend = {
      startDate: getEventReq.startDate,
      endDate: getEventReq.endDate,
      addressName: getEventReq.addressName,
      lat: getEventReq.lat,
      long: getEventReq.long,
      capacity: getEventReq.capacity,
      cover: getEventReq.cover,
      name: getEventReq.name,
      theme: getEventReq.theme,
      color: getEventReq.color,
      fontSize: getEventReq.fontSize,
      instructions: getEventReq.instructions,
      duration: getEventReq.duration,
      calendarId: getEventReq.calendarId,
    };

    setIsCreating(true);

    try {
      if (!dataToSend.name) {
        // Hiển thị thông báo lỗi
        console.error("Name field is required.");
        setIsCreating(false); // Bỏ hiển thị Spinner và bỏ vô hiệu hóa nút
        return;
      }

      // Gửi request API và hiển thị Spinner
      const response = await fetchWrapper.post("/api/Event", dataToSend);

      if (!response.success) {
        // Xử lý lỗi từ API và hiển thị thông báo lỗi
        console.error(`Lỗi khi tạo sự kiện: ${response.error}`);
        setIsCreating(false); // Bỏ hiển thị Spinner và bỏ vô hiệu hóa nút
        return;
      }
      // Xử lý thành công
      console.log(<b>Sự kiện đã tạo thành công!</b>);
    } catch (error) {
      // Xử lý lỗi trong quá trình gửi yêu cầu và hiển thị thông báo lỗi
      console.error(`Lỗi: ${String(Error)}`);
      setIsCreating(false); // Bỏ hiển thị Spinner và bỏ vô hiệu hóa nút
    }
  };
  useEffect(() => {
    async function ImportMap() {
        goongjs.current = await require("@goongmaps/goong-js");     
        goongjs.current.accessToken = "wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW";
      setGeocoder(
        new GoongGeocoder({
          accessToken: "sbRzCkkevuDa7mTtXzH1mE1i3CZGdFjGAcG01XqF",
          goongjs: goongjs.current,
        })
      );
    }

    ImportMap();
  }, []);

  useEffect(() => {
    // Khởi tạo bản đồ khi component được mount
    if (modalMap.isOpen && showOfflineContent === true) {
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

          // console.log(e.result.result.geometry.location.lng);
          console.log(e.result.result);
          console.log(e.result.result.name);
          console.log(e.result.result.compound);
          setSelectedLocation({
            lat: e.result.result.name,
            lng: e.result.result.name,
          });

          setEventReq((prevState) => ({
            ...prevState,
            lat: e.result.result.geometry.location.lat,
            long: e.result.result.geometry.location.lng,
            // Các giá trị khác nếu cần
          }));
          // console.log(e.result.result.formatted_address); // log the place name
          // console.log(e.result.geometry); // log the coordinates [longitude, latitude]
        });
        return () => {
            map.remove();
          };
      }
  }, [modalMap.isOpen, showOfflineContent]);
    return (
        <>
            <div className='page-content'>
                <div className='page-container relative bg-transparent'>
                    <div className='zm-container p-[1.5rem_1rem] max-width-global margin-global'>
                        <div className='outer-wrapper -m-5'>
                            <div className='content-card p-[1rem_1.25rem] relative rounded-xl bg-[#f2f3f4] dark:bg-[#212325] border border-solid border-[#f2f3f4] dark:border-[rgba(255,255,255,0.04)] backdrop-blur-none shadow-none overflow-hidden'>
                                <div className='content-container grid grid-cols-2 gap-10'>
                                    <div className='left min-w-0'>
                                        <form action={"#"} onSubmit={handleSubmit}>
                                            <div>
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <div className='lux-menu-trigger-wrapper m-[-0.375rem_-0.625rem] p-[0.375rem_0.625rem] cursor-pointer rounded-lg gap-3 w-64 transition-all duration-300 ease-in-out inline-flex min-w-0 items-center'>
                                                            <div className='avatar-wrapper small'>
                                                                <Avatar
                                                                    radius="full"
                                                                    src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                                                    name="Donace"
                                                                    className="w-6 h-6 relative"
                                                                />
                                                            </div>
                                                            <div className='min-w-0 flex-1'>
                                                                <div className='text-xs text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]'>Tạo dưới</div>
                                                                <div className='gap-1 flex items-center'>
                                                                    <div className='font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm'>Lịch cá nhân</div>
                                                                </div>
                                                            </div>
                                                            <div className='chevron text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]'>
                                                                <ChevronDown className='block w-4 h-4 align-middle' />
                                                            </div>
                                                        </div>
                                                    </DropdownTrigger>
                                                    <DropdownMenu variant="faded" aria-label="Dropdown menu with description" className='w-64'>
                                                        <DropdownSection
                                                            title="Chọn Lịch để tạo Sự kiện:"
                                                        >
                                                            <DropdownItem
                                                                endContent={<CheckCircle2 className='block w-4 h-4 align-middle' />}
                                                            >
                                                                <User
                                                                    name="Lịch cá nhân"
                                                                    avatarProps={{
                                                                        radius: "sm",
                                                                        size: "sm",
                                                                        src: "https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                                                    }}
                                                                />
                                                            </DropdownItem>
                                                            <DropdownItem
                                                            >
                                                                <User
                                                                    name="Lịch công việc"
                                                                    avatarProps={{
                                                                        radius: "sm",
                                                                        size: "sm",
                                                                        src: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=20,height=20/avatars-default/community_avatar_12.png"
                                                                    }}
                                                                />
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onPress={modalCreateCalendar.onOpen}
                                                                startContent={<Plus className='block w-4 h-4 align-middle translate-y-px text-black-more-blur-light-theme' />}
                                                            >
                                                                <div className='cursor-pointer gap-3 transition-all duration-300 ease-in-out text-black-more-blur-light-theme flex items-center'>
                                                                    <div>Tạo Lịch</div>
                                                                </div>
                                                            </DropdownItem>
                                                        </DropdownSection>
                                                    </DropdownMenu>
                                                </Dropdown>
                                                <Modal
                                                    isOpen={modalCreateCalendar.isOpen}
                                                    onOpenChange={modalCreateCalendar.onOpenChange}
                                                    size='md'
                                                    radius="lg"
                                                    classNames={{
                                                        base: "flex flex-col relative",
                                                        closeButton: "hidden"
                                                    }}
                                                >
                                                    <ModalContent>
                                                        {(onClose) => (
                                                            <>
                                                                <ModalBody className='w-full p-[1rem_1.25rem]'>
                                                                    <form action="#" className='gap-2 pt-2 flex flex-col' onSubmit={handleSubmit}>
                                                                        <div>
                                                                            <div
                                                                                role='presentation'
                                                                                className='w-[54px] h-[54px] relative cursor-pointer'
                                                                            >
                                                                                <input
                                                                                    aria-label='avatarImage'
                                                                                    type="file"
                                                                                    id="avatarImage"
                                                                                    className="hidden"
                                                                                />
                                                                                <div
                                                                                    className="upload-icon rounded-[0.5rem] bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[#212325] bg-[rgb(19,21,23)] dark:bg-[#fff] hover:bg-[#de3163] w-[35%] h-[35%] min-w-[24px] min-h-[24px] border-2 border-solid border-[#fff] dark:border-[#212325] absolute right-[-1px] bottom-[-1px] origin-center transition-all duration-300 ease-in-out"
                                                                                >
                                                                                    <ArrowUp className='stroke-2 w-[65%] h-[65%] block align-middle' />
                                                                                </div>
                                                                                <div
                                                                                    id="avatar square"
                                                                                    className="bg-[url('https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png')] w-[54px] h-[54px] rounded-[0.5rem] bg-center bg-cover flex justify-center items-center bg-[#ebeced] dark:bg-[#333537]"
                                                                                >
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='pt-1'>
                                                                            <div
                                                                                className="name-input text-[1.5rem] font-medium p-2 h-12"
                                                                            >
                                                                                <textarea

                                                                                    id="lux-naked-input bordered mounted"
                                                                                    spellCheck="false"
                                                                                    autoCapitalize="words"
                                                                                    placeholder="Tên lịch"
                                                                                    className="h-[47.8px!important] p-2 border-b border-solid outline-none border-b-[#ebeced] transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1.5rem] font-medium w-full resize-none m-0 focus:border-b-2 focus:border-gray-400 hover:border-b-2 hover:border-gray-400"
                                                                                ></textarea>
                                                                            </div>
                                                                            <div id="desc-input" className="p-2">
                                                                                <textarea

                                                                                    id="lux-naked-input mounted"
                                                                                    spellCheck="false"
                                                                                    autoCapitalize="sentences"
                                                                                    placeholder="Một vài dòng mô tả ngắn về lịch của bạn."
                                                                                    maxLength={200}
                                                                                    className="h-[37px!important] p-2 outline-none transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1rem] font-normal w-full resize-none m-0"
                                                                                ></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            type='submit'
                                                                            className='text-[#fff] bg-[#333537] border-[#333537] cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                                        >
                                                                            <div className='label'>Tạo lịch</div>
                                                                        </Button>
                                                                    </form>
                                                                </ModalBody>
                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                            </div>
                                            <div className='name-input-wrapper -ml-2 m-6 flex'>
                                                <Textarea
                                                    value={getEventReq.name}
                                                    onChange={(e) =>
                                                        setEventReq({ ...getEventReq, name: e.target.value })
                                                    }
                                                    className='transition-all duration-300 ease-in-out text-black-light-theme dark:text-[#fff] overflow-hidden bg-transparent p-0 font-semibold w-full resize-none m-0'
                                                    placeholder='Tên Sự kiện'
                                                    spellCheck="false"
                                                    autoCapitalize='words'
                                                    minRows={1}
                                                    classNames={{
                                                        input: [
                                                            "font-semibold",
                                                            "text-4xl",
                                                        ],
                                                        inputWrapper: [
                                                            "shadow-none"
                                                        ]
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <div className='attribute-row w-full gap-3 mb-4 flex items-start'>
                                                    <div className='icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] dark:border-[rgba(255,255,255,0.08)] text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] rounded-lg flex-shrink-0 mt-2 overflow-hidden justify-center flex items-center'>
                                                        <div className='text-center w-full'>
                                                            <div className='month bg-[rgba(19,21,23,0.1)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px'>{month}</div>
                                                            <div className='day -translate-y-px font-medium'>{day}</div>
                                                        </div>
                                                    </div>
                                                    <div className='time-picker bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden flex-1'>
                                                        <div className='start-row p-[0.25rem_0.25rem_0.25rem_0.75rem] flex justify-between items-baseline'>
                                                            <div className='label w-12'>Bắt đầu</div>
                                                            <div className='pr-12 p-0'>
                                                                <div className='datetime-timezone w-auto max-w-full'>
                                                                    <div className='datetime-input max-w-[13.5rem] flex items-stretch transition-all duration-300 ease-in-out'>
                                                                        <div className='date-input border-r-0 rounded-tl rounded-tr-none rounded-br-none rounded-lr border-transparent transition-all duration-300 ease-in-out flex-1 flex items-center'>
                                                                            <div className='wrapper flex-1 relative flex items-center'>
                                                                                <Input
                                                                                    type="date"
                                                                                    id="date"
                                                                                    value={getEventReq.startDate}
                                                                                    onChange={(e) =>
                                                                                        setEventReq({ ...getEventReq, startDate: e.target.value })
                                                                                    }

                                                                                    className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                    variant='flat'
                                                                                    radius='none' />
                                                                            </div>
                                                                        </div>
                                                                        <div className='divider w-px bg-transparent transition-all duration-300 ease-in-out'></div>
                                                                        <div className='time-input border-l-0 rounded-tl-none rounded-tr rounded-br rounded-bl-none border border-solid border-transparent bg-[rgba(19,21,23,0.04)] transition-all duration-300 ease-in-out flex items-center'>
                                                                            <div className='lux-menu-trigger flex cursor-pointer min-w-0'>
                                                                                {/* <Input
                                                                                    type="time"
                                                                                    id="time"
                                                                                    value={getEventReq.startDate}
                                                                                    onChange={(e) =>
                                                                                        setEventReq({ ...getEventReq, startDate: e.target.value })
                                                                                    }
                                                                                    className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                    variant='flat'
                                                                                    radius='none'
                                                                                /> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='end-row p-[0.25rem_0.25rem_0.25rem_0.75rem] flex justify-between items-baseline mb-2'>
                                                            <div className='label w-12'>Kết thúc</div>
                                                            <div className='pr-12 p-0'>
                                                                <div className='datetime-timezone w-auto max-w-full'>
                                                                    <div className='datetime-input max-w-[13.5rem] flex items-stretch transition-all duration-300 ease-in-out'>
                                                                        <div className='date-input border-r-0 rounded-tl rounded-tr-none rounded-br-none rounded-lr border-transparent transition-all duration-300 ease-in-out flex-1 flex items-center'>
                                                                            <div className='wrapper flex-1 relative flex items-center'>
                                                                                <Input
                                                                                    type="date"
                                                                                    id="date"
                                                                                    value={getEventReq.endDate}
                                                                                    onChange={(e) =>
                                                                                        setEventReq({ ...getEventReq, endDate: e.target.value })
                                                                                    }
                                                                                    className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                    variant='flat'
                                                                                    radius='none'
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className='divider w-px bg-transparent transition-all duration-300 ease-in-out'></div>
                                                                        <div className='time-input border-l-0 rounded-tl-none rounded-tr rounded-br rounded-bl-none border border-solid border-transparent bg-[rgba(19,21,23,0.04)] transition-all duration-300 ease-in-out flex items-center'>
                                                                            <div className='lux-menu-trigger flex cursor-pointer min-w-0'>
                                                                                {/* <Input
                                                                                    type="time"
                                                                                    id="time"
                                                                                    value={getEventReq.endDate}
                                                                                    onChange={(e) =>
                                                                                        setEventReq({ ...getEventReq, endDate: e.target.value })
                                                                                    }
                                                                                    className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                    variant='flat'
                                                                                    radius='none'
                                                                                /> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='w-full gap-3 mb-4 flex items-start'>
                                                    <div className='icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] dark:border-[rgba(255,255,255,0.08)] text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] rounded-lg flex-shrink-0 mt-3.5 overflow-hidden justify-center flex items-center'>
                                                        <MapPin className='w-5 h-5 block align-middle' />
                                                    </div>
                                                    <div className='location-picker-wrapper min-w-0 flex-1'>
                                                        <div className='lux-menu-trigger-wrapper cursor-pointer inline-flex min-w-0 w-full'>
                                                            <Button
                                                                as={"div"}
                                                                className='mt-2 bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] min-w-0 h-full transition-all duration-300 ease-in-out w-full flex justify-start items-center p-0'
                                                                radius='sm'
                                                                type='button'
                                                                onPress={modalMap.onOpen}
                                                                onClick={handleClick}
                                                            >
                                                                <div className='inner min-h-unit-3.5 p-[0.375rem_0.75rem]'>
                                                                    <div>
                                                                        <div>
                                                                            <div className='min-w-0'>
                                                                                <Input
                                                                                    className='hidden'
                                                                                    value={getEventReq.lat}
                                                                                    onChange={(e) =>
                                                                                        setEventReq({ ...getEventReq, lat: e.target.value })
                                                                                    }
                                                                                />
                                                                                <Input
                                                                                    className='hidden'
                                                                                    value={getEventReq.long}
                                                                                    onChange={(e) =>
                                                                                        setEventReq({ ...getEventReq, long: e.target.value })
                                                                                    }
                                                                                />
                                                                                <div className='text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[19rem]'>
                                                                                    {addressLat && addressLng ? (
                                                                                        <div>
                                                                                            {addressLat}
                                                                                        </div>
                                                                                    ) : (
                                                                                        'Thêm địa điểm diễn ra sự kiện'
                                                                                    )}
                                                                                </div>
                                                                                {compoundLatCommune && compoundLngCommune && compoundLatDistrict && compoundLngDistrict && compoundLatProvince && compoundLngProvince ? (
                                                                                    <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] max-w-[19rem]'>
                                                                                        <p>{compoundLatCommune}, {compoundLatDistrict}, {compoundLatProvince}</p>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] max-w-[19rem]'>Tổ chức Online/Offline sự kiện của bạn</div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                            <Modal
                                                                isOpen={modalMap.isOpen}
                                                                onOpenChange={modalMap.onOpenChange}
                                                                size='3xl'
                                                                placement='center'
                                                                scrollBehavior='outside'
                                                            >
                                                                <ModalContent>
                                                                    {(onClose) => (
                                                                        <>
                                                                            <ModalHeader className="flex flex-col gap-1">Thêm địa điểm diễn ra sự kiện</ModalHeader>
                                                                            <Divider />
                                                                            <ModalBody>
                                                                                <div className='pt-2 m-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                                                                    <div className='font-medium text-base text-black-light-theme dark:text-[#fff] translate-y-2'>
                                                                                        Chọn địa điểm:
                                                                                    </div>
                                                                                    <ButtonGroup variant="flat" className='ml-[14rem]'>
                                                                                        <Button>{(labelsMap as { [key: string]: string })[selectedOptionValue]}</Button>
                                                                                        <Dropdown placement="bottom-end"
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
                                                                                                onSelectionChange={(option) => handleSelectedOption(option)}
                                                                                                className="max-w-[300px]"
                                                                                            >
                                                                                                <DropdownItem as={"button"} key="offline" onClick={() => handleSelectedOption('offline')} className='w-fit'>
                                                                                                    {labelsMap["offline"]}
                                                                                                </DropdownItem>
                                                                                                <DropdownItem as={"button"} key="online" onClick={() => handleSelectedOption('online')} className='w-fit'>
                                                                                                    {labelsMap["online"]}
                                                                                                </DropdownItem>
                                                                                            </DropdownMenu>
                                                                                        </Dropdown>
                                                                                    </ButtonGroup>
                                                                                    <div className='col-span-2 md:col-span-1'>
                                                                                        {showOfflineContent ? (
                                                                                            <div id="map" style={{ width: '700px', height: '400px' }}></div>
                                                                                        ) : (
                                                                                            <div>
                                                                                                <Player
                                                                                                    autoplay
                                                                                                    loop
                                                                                                    src={Animation}
                                                                                                    style={{ height: '350px', width: '400px', marginLeft: '10rem', justifyContent: "center", display: "flex", alignItems: "center" }}
                                                                                                >
                                                                                                </Player>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className='col-span-2 flex'>
                                                                                        {showOfflineContent ? (
                                                                                            <div className='flex justify-end ml-[39rem]'>
                                                                                                <Button
                                                                                                    onPress={modalMap.onClose}
                                                                                                    onClick={handleSaveLocation}
                                                                                                    type='submit'
                                                                                                    className='text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0'
                                                                                                >
                                                                                                    <div className='label'>Lưu</div>
                                                                                                </Button>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className='flex'>
                                                                                                <div className='flex-grow mr-2'>
                                                                                                    <Input
                                                                                                        variant='underlined'
                                                                                                        placeholder='Nhập Link của bạn.'
                                                                                                        isClearable
                                                                                                        classNames={{
                                                                                                            base: [
                                                                                                                "w-[38.5rem]"
                                                                                                            ],
                                                                                                            input: [
                                                                                                                "text-lg",
                                                                                                                "font-normal"
                                                                                                            ]
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className='flex items-center'>
                                                                                                    <Button
                                                                                                        type='submit'
                                                                                                        className='text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0'
                                                                                                    >
                                                                                                        <div className='label'>Lưu</div>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='advanced-optiions mt-6'>
                                                <div className='lux-input-label medium text-sm block mb-1.5 font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out'>
                                                    <div>Cài đặt Sự kiện</div>
                                                </div>
                                                <div className='options-card mt-2 rounded-lg overflow-hidden'>
                                                    <div className='option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]'>
                                                        <div className='gap-2 flex items-center'>
                                                            <div className='icon text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]'>
                                                                <Ticket className='block w-4 h-4 align-middle translate-y-px' />
                                                            </div>
                                                            <div className='text-black-more-blur-light-theme select-none flex-1 ' onClick={modalPriceEvent.onOpen}>Loại vé</div>
                                                            <Modal
                                                                isOpen={modalPriceEvent.isOpen}
                                                                onOpenChange={modalPriceEvent.onOpenChange}
                                                                size="sm"
                                                                radius="lg"
                                                                classNames={{
                                                                    base: "flex flex-col relative",
                                                                    closeButton: "hidden"
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
                                                                                            <Coins className="w-8 h-8 block align-middle" />
                                                                                        </div>
                                                                                        <div className="title font-semibold text-xl mb-2">Giá vé</div>
                                                                                        <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Hãy điều chỉnh giá vé dành riêng cho Sự kiện của bạn.</div>
                                                                                    </div>
                                                                                    <div className='gap-4 pt-1 mt-2 flex flex-col'>
                                                                                        <div className='lux-input-wrapper medium max-w-[auto]'>
                                                                                            <div className='inner-wrapper inline-block w-full'>
                                                                                                <label className='text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out'>
                                                                                                    <div>Giá vé</div>
                                                                                                </label>
                                                                                                <div className='input-wrapper flex items-baseline'>
                                                                                                    <div className='flex-1 flex items-center'>
                                                                                                        <div>&nbsp;</div>
                                                                                                        {/* // TODO: khi nào có api check, check thành công thì đổi lại vị trí click */}
                                                                                                        <NumericFormat
                                                                                                            className="text-base h-auto donace-button bg-[#fff] border border-solid border-[#ebeced] transition-all duration-300 ease-in-out m-0 focus:outline-none focus:border-[rgb(19,21,23)]"
                                                                                                            thousandSeparator={true}
                                                                                                            allowNegative={false}
                                                                                                            prefix={'₫ '} // Dấu tiền tệ Việt Nam đồng
                                                                                                            placeholder={'Nhập số tiền'}
                                                                                                            onValueChange={(values) => {
                                                                                                                handleInputChange({
                                                                                                                    target: {
                                                                                                                        value: values.value,
                                                                                                                    },
                                                                                                                });
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='gap-2 flex justify-between items-center'>
                                                                                            <Button
                                                                                                type='submit'
                                                                                                className='text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                                                            >
                                                                                                <div className='label'>Xác nhận</div>
                                                                                            </Button>
                                                                                            <Button
                                                                                                onPress={modalPriceEvent.onClose}
                                                                                                type='button'
                                                                                                className='text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                                                            >
                                                                                                <div className='label'>Sự kiện miễn phí</div>
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </ModalBody>
                                                                        </>
                                                                    )}
                                                                </ModalContent>
                                                            </Modal>
                                                            <div className='gap-1 flex items-center'>
                                                                <div className='value'>Miễn phí</div>
                                                                <button
                                                                    aria-label="Button to open modalPayment"
                                                                    type='button'
                                                                    onClick={modalPayment.onOpen}
                                                                    className='m-[-1px_-0.25rem_-1px_0px] text-black-blur-light-theme bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center'
                                                                >
                                                                    <Pen className='stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px' />
                                                                </button>
                                                            </div>
                                                            <Modal
                                                                isOpen={modalPayment.isOpen}
                                                                onOpenChange={modalPayment.onOpenChange}
                                                                size="xl"
                                                                radius="lg"
                                                                classNames={{
                                                                    base: "flex flex-col relative",
                                                                    closeButton: "hidden"
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
                                                                                            <CreditCard className="w-8 h-8 block align-middle" />
                                                                                        </div>
                                                                                        <div className="title font-semibold text-xl mb-2">Liên kết <span className='text-red-500'>VN</span><span className='text-blue-500'>PAY</span></div>
                                                                                        <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Tài khoản của bạn chưa được thiết lập để chấp nhận thanh toán.</div>
                                                                                        <div className='desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]'>
                                                                                            Chúng tôi sử dụng VNPay làm bộ xử lý thanh toán. Kết nối tài khoản VNPay của bạn để bắt đầu thanh toán. <strong>Phí quản lý là: 10.000 VND!</strong>
                                                                                        </div>
                                                                                        <Link
                                                                                            href='https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/'
                                                                                            target='_blank'
                                                                                            className='justify-end items-end flex text-sm pt-2'
                                                                                        >
                                                                                            <span>Click vào đây để làm theo hướng dẫn lấy keys.</span>
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className='gap-4 mt-2 flex flex-col'>
                                                                                        <div className='lux-input-wrapper medium max-w-[auto]'>
                                                                                            <div className='inner-wrapper inline-block w-full'>
                                                                                                <label className='text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out'>
                                                                                                    <div>Key</div>
                                                                                                </label>
                                                                                                <div className='input-wrapper flex items-baseline'>
                                                                                                    <div className='flex-1 flex items-center'>
                                                                                                        <div>&nbsp;</div>
                                                                                                        <Input
                                                                                                            placeholder='Điền key của bạn vào trong này.'
                                                                                                            size='md'
                                                                                                            variant='bordered'
                                                                                                            type='password'
                                                                                                            inputMode='text'
                                                                                                            step={1}
                                                                                                            min={1}
                                                                                                            classNames={{
                                                                                                                input: [
                                                                                                                    "text-base"
                                                                                                                ]
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='lux-input-wrapper medium max-w-[auto]'>
                                                                                            <div className='inner-wrapper inline-block w-full'>
                                                                                                <label className='text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out'>
                                                                                                    <div>Secret key</div>
                                                                                                </label>
                                                                                                <div className='input-wrapper flex items-baseline'>
                                                                                                    <div className='flex-1 flex items-center'>
                                                                                                        <div>&nbsp;</div>
                                                                                                        <Input
                                                                                                            size='md'
                                                                                                            variant='bordered'
                                                                                                            type='password'
                                                                                                            inputMode='text'
                                                                                                            step={1}
                                                                                                            min={1}
                                                                                                            placeholder='Điền secret key của bạn vào trong này.'
                                                                                                            classNames={{
                                                                                                                input: [
                                                                                                                    "text-base"
                                                                                                                ]
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className='gap-2 flex justify-between items-center'>
                                                                                            <Button
                                                                                                type='submit'
                                                                                                className='text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                                                            >
                                                                                                <div className='label'>Kết nối</div>
                                                                                            </Button>
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
                                                    <div className='option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]'>
                                                        <div className='divider absolute top-0 left-11 right-0 border-b border-solid border-[rgba(19,21,23,0.04)] z-10'></div>
                                                        <div className='gap-2 flex items-center'>
                                                            <div className='icon text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]'>
                                                                <UserCheck className='block w-4 h-4 align-middle translate-y-px' />
                                                            </div>
                                                            <div className='text-black-more-blur-light-theme select-none flex-1'>Phê duyệt</div>
                                                            <div className='gap-1 flex items-center'>
                                                                <Switch
                                                                    color='success'
                                                                    classNames={{
                                                                        thumb: [
                                                                            "bg-[#fff]",
                                                                        ],
                                                                        wrapper: [
                                                                            "bg-[rgba(19,21,23,0.16)]"
                                                                        ],
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]'>
                                                        <div className='divider absolute top-0 left-11 right-0 border-b border-solid border-[rgba(19,21,23,0.04)] z-10'></div>
                                                        <div className='gap-2 flex items-center'>
                                                            <div className='icon text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]'>
                                                                <ArrowUpToLine className='block w-4 h-4 align-middle translate-y-px' />
                                                            </div>
                                                            <div className='text-black-more-blur-light-theme select-none flex-1'>Số lượng</div>
                                                            <div className='gap-1 flex items-center'>
                                                                <div className='value'>{capacity || 'Không giới hạn'}</div>
                                                                <button
                                                                    aria-label='Button to open modalCapacity'
                                                                    onClick={modalCapacity.onOpen}
                                                                    type='button'
                                                                    className='m-[-1px_-0.25rem_-1px_0px] text-black-blur-light-theme bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center'
                                                                >
                                                                    <Pen className='stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <Modal
                                                            isOpen={modalCapacity.isOpen}
                                                            onOpenChange={modalCapacity.onOpenChange}
                                                            size="sm"
                                                            radius="lg"
                                                            classNames={{
                                                                base: "flex flex-col relative",
                                                                closeButton: "hidden"
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
                                                                                        <Upload className="w-8 h-8 block align-middle" />
                                                                                    </div>
                                                                                    <div className="title font-semibold text-xl mb-2">Số lượng tối đa</div>
                                                                                    <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Đóng đăng ký tự động khi đã đạt số lượng đăng ký. Chỉ những khách mời được phê duyệt mới được tính vào số lượng đã đủ.</div>
                                                                                </div>
                                                                                <div className='gap-4 pt-1 mt-2 flex flex-col'>
                                                                                    <div className='lux-input-wrapper medium max-w-[auto]'>
                                                                                        <div className='inner-wrapper inline-block w-full'>
                                                                                            <label className='text-sm cursor-pointer block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out'>
                                                                                                <div>Số lượng</div>
                                                                                            </label>
                                                                                            <div className='input-wrapper flex items-baseline'>
                                                                                                <div className='flex-1 flex items-center'>
                                                                                                    <div>&nbsp;</div>
                                                                                                    <Input
                                                                                                        placeholder='99'
                                                                                                        size='md'
                                                                                                        variant='bordered'
                                                                                                        type='number'
                                                                                                        inputMode='numeric'
                                                                                                        step={1}
                                                                                                        min={1}
                                                                                                        classNames={{
                                                                                                            input: [
                                                                                                                "text-base"
                                                                                                            ]
                                                                                                        }}
                                                                                                        value={getEventReq.capacity}
                                                                                                        onChange={(e) => {
                                                                                                            setCapacity(e.target.value);
                                                                                                            setEventReq({ ...getEventReq, capacity: e.target.value });
                                                                                                        }}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='gap-2 flex justify-between items-center'>
                                                                                        <Button
                                                                                            onPress={modalCapacity.onClose}
                                                                                            type='submit'
                                                                                            className='text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                                                        >
                                                                                            <div className='label'>Đặt giới hạn</div>
                                                                                        </Button>
                                                                                        <Button
                                                                                            onPress={modalCapacity.onClose}
                                                                                            type='button'
                                                                                            className='text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                                                        >
                                                                                            <div className='label'>Không giới hạn</div>
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </ModalBody>
                                                                    </>
                                                                )}
                                                            </ModalContent>
                                                        </Modal>
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.addressName}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, addressName: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='Address Name'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.calendarId}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, calendarId: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='CalendarID'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.color}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, color: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='Color'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.cover}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, cover: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='Cover'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.duration}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, duration: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='Duration'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.fontSize}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, fontSize: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='Font size'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.instructions}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, instructions: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='instructions'
                                                        />
                                                    </div>
                                                    <div className='options-row'>
                                                        <Input
                                                            value={getEventReq.theme}
                                                            onChange={(e) =>
                                                                setEventReq({ ...getEventReq, theme: e.target.value })
                                                            }
                                                            className='addressName mt-2'
                                                            variant='bordered'
                                                            placeholder='theme'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='pt-2 mt-6'>
                                                <Button
                                                    onSubmit={handleClick}
                                                    type='submit'
                                                    className='text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0'
                                                >
                                                    <div className='label'>Tạo Sự kiện</div>
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='right min-w-0'>
                                        <div>
                                            <div>
                                                <div
                                                    role='button'
                                                    className='photo-container bg-[rgba(19,21,23,0.04)] rounded-lg overflow-hidden outline-offset-2 outline-none transition-all duration-300 ease-in-out relative cursor-pointer'
                                                >
                                                    {/* <Input
                                                        type='file'
                                                        id="image" name="image"
                                                        accept='image/*,.jpg,.jpeg,.png,.gif,.webp'
                                                        onChange={handleImageChange}
                                                        tabIndex={-1}
                                                        className='hidden text-inherit m-0'
                                                    /> */}
                                                    <div className='image has-image transition-all duration-300 ease-in-out'>
                                                        <div className='img-aspect-ratio w-full bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] overflow-hidden relative rounded-lg'>
                                                            <Image
                                                                src='https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard1.png'
                                                                className='cursor-pointer top-0 left-0 w-full h-full object-cover align-middle'
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* phần hình ảnh chỗ này thì tui chưa làm được làm thế nào để nó mở file lên */}
                                                    <div className='z-20 absolute bottom-[-2px] right-[-2px] w-[calc(2rem+2px)] h-[calc(2rem+2px)] text-[#fff] dark:text-[rgb(19,21,23)] bg-[rgb(19,21,23)] dark:bg-[#fff] border-2 border-solid border-[#fff] dark:border-[rgb(19,21,23)] rounded-lg transition-all duration-300 ease-in-out justify-center flex items-center'>
                                                        {/* <FileImage className='block w-4 h-4 align-middle' />
                                                        <input type="file" id="image" name="image" className='-z-0 hidden' accept="image/*" onChange={handleImageChange} />
                                                        {formData.cover && <img src={formData.cover} alt="Preview" />} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}