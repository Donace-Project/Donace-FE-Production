"use client";
import "./global.css";
import { Avatar } from "@nextui-org/avatar";
import { Input, Textarea } from "@nextui-org/input";
import {
  ArrowUp,
  ArrowUpToLine,
  ChevronDown,
  ChevronDownIcon,
  Coins,
  CreditCard,
  MapPin,
  Video,
  Pen,
  Plus,
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
import { Link } from "@nextui-org/link";
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Animation from "../Animation_1701106485452.json";
import { NumericFormat } from "react-number-format";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "../../types/DonaceType";
import { useRouter, useSearchParams } from "next/navigation";
const goongGeocoder = require("@goongmaps/goong-geocoder");


interface createEventReponseType {

  name: string;
  startDate: string;
  endDate: string;
  calendarId: string | undefined;
  lat: number;
  long: number;
  addressName: string;
  cover: string;
  isOnline: boolean;
  linkMeet: string;
  isUnlimited: boolean;
  ticket: {
    isRequireApprove: boolean;
    isFree: boolean;
    price: number;
  };
  capacity: number;
}

export default function CreateFormFinal() {
  // ---------------Start: Local variable---------------
  const searchParams = useSearchParams();
  const calendarId = searchParams?.get("calendarId");
  let goongjs = useRef<any>(null);
  let map: any;
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const labelsMap = {
    offline: "Offline",
    online: "Online",
  };
  const router = useRouter();
  // ---------------End: Local variable---------------

  // ---------------Start: UseState---------------
  const [selectedOption, setSelectedOption] = React.useState(
    new Set(["offline"])
  );
  const [showOfflineContent, setShowOfflineContent] = React.useState(true);
  const modalMap = useDisclosure();
  const modalCapacity = useDisclosure();
  const modalPayment = useDisclosure();
  const modalCreateCalendar = useDisclosure();
  const modalPriceEvent = useDisclosure();
  const [creatEventErrorMessage, setCreatEventErrorMessage] = useState("");
  const [connectVnPayErrorMessage, setconnectVnPayErrorMessage] = useState("");
  const [loadingConnectVnPay, setloadingConnectVnPay] = useState(false);
  const [isVnpayConnected, setVnpayConnected] = useState(false);
  const [tmnCode, setTmnCode] = useState<string>("");
  const [hashSecret, setHashSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
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
  const [capacity, setCapacity] = useState("0");
  const [geocoder, setGeocoder] = useState<any>(null);
  const today = new Date();
  const formattedDate = formatDate(today, "yyyy-mm-dd");
  const [startDate, SetStartDate] = useState<any>({
    date: formattedDate,
    time: "12:00",
  });
  const [endDate, SetEndDate] = useState<any>({
    date: formattedDate,
    time: "12:00",
  });
  const [lstCalendar, setLstCalendar] = useState<Calendar[]>([]);
  const [selectedCalendar, SetSelectedCalendar] = useState<Calendar>();
  // const refDivBackground = useRef<HTMLDivElement | null>(null);
  const refDivAvatarCalendar = useRef<HTMLDivElement | null>(null);
  const [onlineLink, setOnlineLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [isFree, setIsFree] = useState(true);
  const [isCorrectFormatLink, setIsCorrectFormatLink] = useState(true);
  const [isUnlimitedCapacity, setIsUnlimitedCapacity] = useState(true);
  const [calendarReq, setCalendarReq] = useState({
    name: "",
    avatar: "",
    description: "",
  });
  const [image, setImage] = useState<string>("https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard1.png");

  const [eventReq, SetEventReq] = useState<createEventReponseType>({
    name: "",
    startDate: `${formattedDate}T12:00`,
    endDate: `${formattedDate}T12:00`,
    calendarId: "",
    lat: 0,
    long: 0,
    addressName: "",
    cover: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard1.png",
    isOnline: false,
    linkMeet: "",
    isUnlimited: true,
    ticket: {
      isRequireApprove: false,
      isFree: true,
      price: 0,
    },
    capacity: 0,
  });

  // ---------------End: UseState---------------

  // ---------------Begin: UseRef---------------
  // let refCoverUrl = useRef(
  //   "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard1.png"
  // );
  let refAvatarUrl = useRef(
    "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png"
  );
  // ---------------End: UseRef---------------

  // ---------------Start: Handle event---------------
  const handleConfirmPrice = () => {
    SetEventReq({
      ...eventReq,
      ticket: {
        ...eventReq.ticket,
        isFree: false,
        price: price,
      },
    });
    console.log("Help")
    modalPriceEvent.onClose();

    setIsFree(false);
  };

  const handleConfirmFree = () => {
    SetEventReq({
      ...eventReq,
      ticket: {
        ...eventReq.ticket,
        isFree: true,
        price: 0,
      },
    });
    modalPriceEvent.onClose();
    setIsFree(true);
  };


  const handleUploadEventBackground = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const url = await fetchWrapper.postFile(
        "api/Common/upload-file",
        formData
      );

      if (url != image && url) {
        setImage(url);
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadCalendarAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    // debugger;
    try {
      setIsAvatarUploading(true);
      const url = await fetchWrapper.postFile(
        "api/Common/upload-file",
        formData
      );

      if (refDivAvatarCalendar.current && url) {
        refDivAvatarCalendar.current.style.backgroundImage = `url(${url})`;
        refAvatarUrl.current = url;
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    } finally {
      setIsAvatarUploading(false);
    }
  };

  const handelRequiedApproved = (e: any) => {
    SetEventReq({
      ...eventReq,
      ticket: {
        ...eventReq.ticket,
        isRequireApprove: e.target.checked,
      },
    });
  };

  const handleCalendarSubmit = async (e: any) => {
    e.preventDefault();
    // debugger;
    if (calendarReq.name == "") {
      return;
    }

    calendarReq.avatar = refAvatarUrl.current;
    try {
      const response = await fetchWrapper.post(
        "/api/Calendar/create-calendar",
        calendarReq
      );

      if (!response.success) {
        console.error(`Lỗi khi tạo lịch: ${response.error}`);
        return;
      }
      // debugger;
      let lstCalendarTemp = await GetCalendars(setLstCalendar);
      SetCurrentCalendar(
        lstCalendarTemp,
        response.result.id,
        SetSelectedCalendar
      );
      modalCreateCalendar.onClose();
    } catch (error) {
      console.error(`Lỗi: ${String(Error)}`);
    }
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

  const handleSaveLocation = () => {
    setShowOfflineContent(true);
    setOnlineLink("");
  };

  const handleSelectedCalendar = (e: any, id: string) => {
    SetSelectedCalendar(lstCalendar.filter((c) => c.id == id)[0]);
  };

  function formatDate(date: Date, format: string): string {
    const map: Record<string, string> = {
      mm: (date.getMonth() + 1).toString().padStart(2, "0"),
      dd: date.getDate().toString().padStart(2, "0"),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear().toString(),
    };
    return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched]);
  }

  const updateStartDate = (type: string, newValue: string) => {
    if (type === "date") {
      SetStartDate({ ...startDate, date: newValue });
    } else {
      SetStartDate({ ...startDate, time: newValue });
    }
  };

  const updateEndDate = (type: string, newValue: string) => {
    if (type === "date") {
      SetEndDate({ ...endDate, date: newValue });
    } else {
      SetEndDate({ ...endDate, time: newValue });
    }
  };

  const handleSaveOnlineLink = () => {
    if (!isURL(onlineLink)) {
      setIsCorrectFormatLink(false);
      return;
    }
    SetEventReq({
      ...eventReq,
      isOnline: true,
      lat: 0,
      long: 0,
      addressName: "",
      linkMeet: onlineLink,
    });
    modalMap.onClose();
    setShowOfflineContent(false);
    setIsCorrectFormatLink(true);
  };

  const handleCreateEvent = async () => {
    // debugger;
    console.log(`${startDate.date}T${startDate.time}`)
    console.log(`${endDate.date}T${endDate.time}`)

    let startDateTemp = new Date(`${startDate.date}T${startDate.time}`);
    let endDateTemp = new Date(`${endDate.date}T${endDate.time}`);
    if (startDateTemp > endDateTemp) {
      setCreatEventErrorMessage("Ngày Bắt đầu phải lớn hơn ngày kết thúc!");
      return;
    }
    // Validation
    if (eventReq.name.trim() == "") {
      setCreatEventErrorMessage("Vui lòng nhập tên sự kiện!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchWrapper.post("/api/Event", {
        ...eventReq,
        startDate: `${startDate.date}T${startDate.time}`,
        endDate: `${endDate.date}T${endDate.time}`,
        cover: `${image}`,
      });
      
      if (response.id) {
        // Redirect
        router.push(`/events/manage/${response.id}`);
        return;
      }
      setCreatEventErrorMessage("không thể tạo sự kiện!");
      setIsLoading(false);
    } catch (error) {
      console.error(`Lỗi: ${String(Error)}`);
      setIsLoading(false);
    }
  };

  const handleConnectVnPay = async () => {
    if (tmnCode === "" || hashSecret === "") {
      setconnectVnPayErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setloadingConnectVnPay(true);
    // debugger;
    const res = await fetchWrapper.post("/api/Payment/connect", {
      tmnCode,
      hashSecret,
    });
    if (res.result === false) {
      setloadingConnectVnPay(false);
      setconnectVnPayErrorMessage(res.message);
      return;
    }
    // debugger;
    setVnpayConnected(true);
    setloadingConnectVnPay(false);
    modalPayment.onClose();
    modalPriceEvent.onOpen();
  };
  // ---------------End: Handle event---------------

  // ---------------Start: Use Effect---------------
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        let lstCalendarTemp = await GetCalendars(setLstCalendar);
        SetCurrentCalendar(lstCalendarTemp, calendarId, SetSelectedCalendar);
      } catch (error) {
        console.error("Error fetching calendar:", error);
      }
    };

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

    const fetchPayment = async () => {
      try {
        const paymentData = await fetchWrapper.get("/api/Payment/get-connect");
        if (paymentData === "") {
          setVnpayConnected(false);
        } else {
          setVnpayConnected(true);
        }
      } catch (error) {
        console.error("Error fetching Payment:", error);
      }
    };

    ImportMap();
    fetchCalendar();
    fetchPayment();
  }, []);

  // Thay đổi lịch
  useEffect(() => {
    eventReq.calendarId = selectedCalendar?.id;
  }, [selectedCalendar]);

  useEffect(() => {
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

        SetEventReq({
          ...eventReq,
          addressName: e.result.result.formatted_address,
          lat: e.result.result.geometry.location.lat,
          long: e.result.result.geometry.location.lng,
          isOnline: false,
          linkMeet: "",
          // Các giá trị khác nếu cần
        });
      });
      return () => {
        map.remove();
      };
    }
  }, [modalMap.isOpen, showOfflineContent]);
  // ---------------Start: Use Effect---------------
  return (
    <>
      <div className="page-content">
        <div className="page-container relative">
          <div className="zm-container w-full lg:w-[900px] md:w-[700px] m-auto">
            <div className="outer-wrapper md:my-10 my-2 ">
              <div className="content-card p-[1rem_1.25rem] relative rounded-xl bg-[#f2f3f4] dark:bg-[#212325] border border-solid border-[#f2f3f4] dark:border-[rgba(255,255,255,0.04)] backdrop-blur-lg shadow-none">
                <div className="content-container flex flex-col-reverse md:flex-row gap-4 justify-between">
                  <div className="left ">
                    <form action={"#"} className="flex flex-col gap-4">
                      <div>
                        <Dropdown>
                          <DropdownTrigger>
                            <div className="lux-menu-trigger-wrapper p-2 cursor-pointer rounded-lg gap-3 md:w-64 transition-all duration-300 ease-in-out inline-flex  w-full items-center bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] justify-between">
                              <div className="inline-flex justify-start items-center gap-4">
                                <div className="avatar-wrapper small">
                                  <Avatar
                                    radius="full"
                                    src={selectedCalendar?.avatar}
                                    name="Donace"
                                    className="w-6 h-6 relative"
                                  />
                                </div>
                                <div className="">
                                  <div className="text-xs text-black-blur-light-theme dark:text-[rgba(255,255,255,0.5)]">
                                    Tạo dưới
                                  </div>
                                  <div className="gap-1 flex items-center">
                                    <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                                      {selectedCalendar?.name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chevron text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]">
                                <ChevronDown className="block w-4 h-4 align-middle" />
                              </div>
                            </div>
                          </DropdownTrigger>
                          <DropdownMenu
                            variant="faded"
                            aria-label="Dropdown menu with description"
                            className="w-64"
                          >
                            {/* @ts-ignore */}
                            <DropdownSection title="Chọn Lịch để tạo Sự kiện:">
                              {lstCalendar ? (
                                lstCalendar.length > 0 ? (
                                  lstCalendar.map((calendar, index) => (
                                    <DropdownItem
                                      key={calendar.id}
                                      onClick={(e) =>
                                        handleSelectedCalendar(e, calendar.id)
                                      }
                                    >
                                      <User
                                        name={calendar.name}
                                        avatarProps={{
                                          radius: "sm",
                                          size: "sm",
                                          src: calendar.avatar
                                            ? `${calendar.avatar}`
                                            : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=20,height=20/avatars-default/community_avatar_12.png",
                                        }}
                                      />
                                    </DropdownItem>
                                  ))
                                ) : (
                                  <DropdownItem
                                    key="no-calendars"
                                    className="hidden"
                                  ></DropdownItem>
                                )
                              ) : (
                                <DropdownItem
                                  key="loading"
                                  className="hidden"
                                ></DropdownItem>
                              )}
                              <DropdownItem
                                onPress={modalCreateCalendar.onOpen}
                                startContent={
                                  <Plus className="block w-4 h-4 align-middle translate-y-px" />
                                }
                              >
                                <div className="cursor-pointer gap-3 transition-all duration-300 ease-in-out  flex items-center">
                                  <div>Tạo Lịch</div>
                                </div>
                              </DropdownItem>
                            </DropdownSection>
                          </DropdownMenu>
                        </Dropdown>
                        <Modal
                          isOpen={modalCreateCalendar.isOpen}
                          onOpenChange={modalCreateCalendar.onOpenChange}
                          size="md"
                          radius="lg" placement="center" backdrop="blur"

                          classNames={{
                            base: "flex flex-col relative",
                            closeButton: "hidden",
                          }}
                        >
                          {/* Tạo lịch */}
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalBody className="w-full p-[1rem_1.25rem]">
                                  <form
                                    action="#"
                                    className="gap-2 pt-2 flex flex-col"
                                  >
                                    <div>
                                      <div
                                        role="presentation"
                                        className="w-[54px] h-[54px] relative cursor-pointer"
                                      >
                                        <input
                                          aria-label="avatarCalendarImage"
                                          type="file"
                                          id="avatarCalendarImage"
                                          className="hidden"
                                          onChange={handleUploadCalendarAvatar}
                                        />
                                        <div
                                          onClick={() => {
                                            const fileInput =
                                              document.getElementById(
                                                "avatarCalendarImage"
                                              );
                                            if (fileInput) {
                                              fileInput.click();
                                            }
                                          }}
                                          className="upload-icon rounded-[0.5rem] bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[#212325] bg-[rgb(19,21,23)] dark:bg-[#fff] hover:bg-[#de3163] w-[35%] h-[35%] min-w-[24px] min-h-[24px] border-2 border-solid border-[#fff] dark:border-[#212325] absolute right-[-1px] bottom-[-1px] origin-center transition-all duration-300 ease-in-out"
                                        >
                                          {isAvatarUploading ? (
                                            <Spinner
                                              size="sm"
                                              color="success"
                                              className="mr-2 stroke-2 w-[65%] h-[65%] block align-middle spinner-uploading"
                                            />
                                          ) : (
                                            <ArrowUp className="stroke-2 w-[65%] h-[65%] block align-middle" />
                                          )}
                                        </div>
                                        <div
                                          onClick={() => {
                                            const fileInput =
                                              document.getElementById(
                                                "avatarCalendarImage"
                                              );
                                            if (fileInput) {
                                              fileInput.click();
                                            }
                                          }}
                                          ref={refDivAvatarCalendar}
                                          id="avatar square"
                                          className="bg-[url('https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png')] w-[54px] h-[54px] rounded-[0.5rem] bg-center bg-cover flex justify-center items-center bg-[#ebeced] dark:bg-[#333537]"
                                        ></div>
                                      </div>
                                    </div>
                                    <div className="pt-1">
                                      <div className="name-input text-[1.5rem] font-medium p-2 h-12">
                                        <textarea
                                          value={calendarReq.name}
                                          onChange={(e) =>
                                            setCalendarReq({
                                              ...calendarReq,
                                              name: e.target.value,
                                            })
                                          }
                                          id="lux-naked-input bordered mounted"
                                          spellCheck="false"
                                          autoCapitalize="words"
                                          placeholder="Tên lịch"
                                          className="h-[47.8px!important] p-2 border-b border-solid outline-none border-b-[#ebeced] transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1.5rem] font-medium w-full resize-none m-0 focus:border-b-2 focus:border-gray-400 hover:border-b-2 hover:border-gray-400"
                                        ></textarea>
                                      </div>
                                      <div id="desc-input" className="p-2">
                                        <textarea
                                          value={calendarReq.description}
                                          onChange={(e) =>
                                            setCalendarReq({
                                              ...calendarReq,
                                              description: e.target.value,
                                            })
                                          }
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
                                      onClick={(e) => handleCalendarSubmit(e)}
                                      type="button"
                                      className="text-[#fff] bg-[#333537] border-[#333537] cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                    >
                                      <div className="label">Tạo lịch</div>
                                    </Button>
                                  </form>
                                </ModalBody>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </div>
                      <div className="name-input-wrapper">
                        <Textarea
                          value={eventReq.name}
                          onChange={(e) =>
                            SetEventReq({
                              ...eventReq,
                              name: e.target.value,
                            })
                          }
                          className="transition-all duration-300 ease-in-out bg-transparent font-semibold w-full resize-none border-none"
                          placeholder="Tên Sự kiện"
                          spellCheck="false"
                          autoCapitalize="words"
                          minRows={1}
                          maxRows={1}
                          classNames={
                            {
                              input: ["font-semibold", "text-4xl"],
                              inputWrapper: ["shadow-none"],
                            }}
                        />
                      </div>
                      <div>
                        <div className="attribute-row w-full gap-3 mb-4 flex items-start">
                          <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] dark:border-[rgba(255,255,255,0.08)] text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] rounded-lg flex-shrink-0 mt-2 overflow-hidden justify-center flex items-center">
                            <div className="text-center w-full">
                              <div className="month bg-[rgba(19,21,23,0.1)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px">
                                {month}
                              </div>
                              <div className="day -translate-y-px font-medium">
                                {day}
                              </div>
                            </div>
                          </div>
                          <div className="time-picker bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] py-2 rounded-lg overflow-hidden flex flex-col w-full">
                            <div className="px-2 flex p-1 justify-between items-baseline flex-col md:flex-row gap-2">
                              <div className="label whitespace-nowrap lg:w-20">Bắt đầu:</div>
                              <div className="grid grid-cols-2 w-full gap-2">
                                <Input
                                  type="date"
                                  id="date"
                                  value={startDate.date}
                                  onChange={(e) =>
                                    updateStartDate(
                                      "date",
                                      e.target.value
                                    )
                                  }
                                  className="bg-transparent"
                                  variant="flat"
                                  radius="sm"
                                />

                                <Input
                                  type="time"
                                  id="time"
                                  value={startDate.time}
                                  onChange={(e) =>
                                    updateStartDate(
                                      "time",
                                      e.target.value
                                    )
                                  }
                                  className="bg-transparent"
                                  variant="flat"
                                  radius="sm"
                                />
                              </div>
                            </div>
                            <div className="px-2 p-1 flex justify-between items-baseline flex-col md:flex-row gap-2">
                              <div className="label whitespace-nowrap  lg:w-20">Kết thúc:</div>
                              <div className="grid grid-cols-2 w-full gap-2">
                                <Input
                                  type="date"
                                  id="date"
                                  value={endDate.date}
                                  onChange={(e) =>
                                    updateEndDate(
                                      "date",
                                      e.target.value
                                    )
                                  }
                                  className="bg-transparent"
                                  variant="flat"
                                  radius="sm"
                                />
                                <Input
                                  type="time"
                                  id="time"
                                  value={endDate.time}
                                  onChange={(e) =>
                                    updateEndDate(
                                      "time",
                                      e.target.value
                                    )
                                  }
                                  className="bg-transparent"
                                  variant="flat"
                                  radius="sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full gap-3 mb-4 flex items-start">
                          <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] dark:border-[rgba(255,255,255,0.08)] text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] rounded-lg flex-shrink-0 mt-3.5 overflow-hidden justify-center flex items-center">
                            {showOfflineContent ? (
                              <MapPin className="w-5 h-5 block align-middle" />
                            ) : (
                              <Video className="w-5 h-5 block align-middle" />
                            )}
                          </div>
                          <div className="location-picker-wrapper  flex-1">
                            <div className="lux-menu-trigger-wrapper cursor-pointer inline-flex  w-full">
                              <Button
                                as={"div"}
                                className="mt-2 bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]  h-full transition-all duration-300 ease-in-out w-full flex justify-start items-center p-0"
                                radius="sm"
                                type="button"
                                onPress={modalMap.onOpen}
                              >
                                <div className="inner min-h-unit-3.5 p-[0.375rem_0.75rem]">
                                  <div>
                                    <div>
                                      <div className="">
                                        <div className="dark:text-[hsla(0,0%,100%,.79)] font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[19rem]">
                                          {showOfflineContent ? (
                                            addressLat && addressLng ? (
                                              <div>{addressLat}</div>
                                            ) : (
                                              "Thêm địa điểm diễn ra sự kiện"
                                            )
                                          ) : (
                                            <>Online</>
                                          )}
                                        </div>

                                        {showOfflineContent ? (
                                          compoundLatCommune &&
                                            compoundLngCommune &&
                                            compoundLatDistrict &&
                                            compoundLngDistrict &&
                                            compoundLatProvince &&
                                            compoundLngProvince ? (
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm   dark:text-[hsla(0,0%,100%,.79)] max-w-[19rem]">
                                              <p>
                                                {compoundLatCommune},{" "}
                                                {compoundLatDistrict},{" "}
                                                {compoundLatProvince}
                                              </p>
                                            </div>
                                          ) : (
                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm   dark:text-[hsla(0,0%,100%,.79)] max-w-[19rem]">
                                              Tổ chức Online/Offline sự kiện của
                                              bạn
                                            </div>
                                          )
                                        ) : (
                                          <>
                                            <p className="short-description">
                                              {onlineLink}
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Button>
                              <Modal
                                backdrop="blur"
                                closeButton={false}
                                hideCloseButton={true}
                                isOpen={modalMap.isOpen}
                                onOpenChange={modalMap.onOpenChange}
                                placement="center"
                                size="3xl"
                                isDismissable={false}
                                scrollBehavior="outside"
                                className="w-fit-content px-0 py-4 backdrop-opacity-70 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(33,35,37,0.8)]"
                              >
                                <ModalContent className="w-full">
                                  {(onClose) => (
                                    <>
                                      <ModalHeader className="">
                                        Thêm địa điểm diễn ra sự kiện
                                      </ModalHeader>
                                      <Divider />
                                      <ModalBody>
                                        <div className="w-full flex flex-col gap-4 justify-between">
                                          <div className="w-full inline-flex justify-between items-center">
                                            <div className="font-medium text-base ">
                                              Chọn địa điểm:
                                            </div>
                                            <ButtonGroup
                                              variant="flat"
                                              className=""
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
                                                    "max-w-[300px]",
                                                    "max-w-full",
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
                                                  className="w-full"
                                                >
                                                  <DropdownItem
                                                    as={"button"}
                                                    key="offline"
                                                    onClick={() =>
                                                      handleSelectedOption(
                                                        "offline"
                                                      )
                                                    }
                                                    className="w-full text-left"
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
                                                    className="w-full text-left"
                                                  >
                                                    {labelsMap["online"]}
                                                  </DropdownItem>
                                                </DropdownMenu>
                                              </Dropdown>
                                            </ButtonGroup>
                                          </div>
                                          <div >
                                            {showOfflineContent ? (
                                              <div
                                                id="map"
                                                style={{
                                                  width: "100%",
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
                                                    height: "400px",
                                                    width: "100%",
                                                  }}
                                                ></Player>
                                                {!isCorrectFormatLink && (
                                                  <div className="text-[#f3236a]">
                                                    <div className="label break-words ml-4">
                                                      Vui lòng nhập đúng định
                                                      dạng link online
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                          <div className="">
                                            {showOfflineContent ? (
                                              <div className="flex justify-end">
                                                <Button
                                                  onPress={modalMap.onClose}
                                                  onClick={handleSaveLocation}
                                                  type="button"
                                                  className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center m-0"
                                                >
                                                  <div className="label">
                                                    Lưu
                                                  </div>
                                                </Button>
                                              </div>
                                            ) : (
                                              <div className="flex justify-between gap-4">
                                                <div className="w-full">
                                                  <Input
                                                    variant="underlined"
                                                    placeholder="Nhập Link của bạn."
                                                    isClearable
                                                    onClear={() => {
                                                      setOnlineLink("")
                                                    }}
                                                    value={onlineLink}
                                                    onChange={(e) => {

                                                      setOnlineLink(
                                                        e.target.value
                                                      );
                                                    }
                                                    }
                                                    classNames={{
                                                      base: ["width:100%"],
                                                      input: [
                                                        "text-lg",
                                                        "font-normal",
                                                      ],
                                                    }}
                                                  />
                                                </div>
                                                <div className="flex justify-end items-center">
                                                  <Button
                                                    onClick={
                                                      handleSaveOnlineLink
                                                    }
                                                    type="button"
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="advanced-optiions ">
                        <div className="lux-input-label medium text-sm block mb-1.5 font-medium   dark:text-white transition-all duration-300 ease-in-out">
                          <div>Cài đặt Sự kiện</div>
                        </div>
                        <div className="options-card mt-2 rounded-lg overflow-hidden dark:text-white light:text-gray-600">
                          <div className="option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]">
                            <div className="gap-2 flex items-center">
                              <div className="icon light:text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]">
                                <Ticket className="block w-4 h-4 align-middle translate-y-px" />
                              </div>
                              <div className=" select-none flex-1">
                                Loại vé
                              </div>
                              {isFree ? (
                                <div className="gap-1 flex items-center font-bold">
                                  <div>Miễn phí</div>
                                  {isVnpayConnected ? (
                                    <>
                                      <button
                                        onClick={modalPriceEvent.onOpen}
                                        aria-label="Button to open modalPayment"
                                        type="button"
                                        className="m-[-1px_-0.25rem_-1px_0px] bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center"
                                      >
                                        <Pen className="stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={modalPayment.onOpen}
                                        aria-label="Button to open modalPayment"
                                        type="button"
                                        className="m-[-1px_-0.25rem_-1px_0px] bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center"
                                      >
                                        <Pen className="stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px" />
                                      </button>
                                    </>
                                  )}
                                  <></>
                                </div>
                              ) : (
                                <div className="gap-1 flex items-center">
                                  <div className="value">
                                    {formatCurrency(price)}
                                  </div>
                                  {isVnpayConnected ? (
                                    <>
                                      <button
                                        onClick={modalPriceEvent.onOpen}
                                        aria-label="Button to open modalPayment"
                                        type="button"
                                        className="m-[-1px_-0.25rem_-1px_0px]  bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center"
                                      >
                                        <Pen className="stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={modalPayment.onOpen}
                                        aria-label="Button to open modalPayment"
                                        type="button"
                                        className="m-[-1px_-0.25rem_-1px_0px]  bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center"
                                      >
                                        <Pen className="stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px" />
                                      </button>
                                    </>
                                  )}
                                  <></>
                                </div>
                              )}
                              <Modal
                                isOpen={modalPayment.isOpen}
                                onOpenChange={modalPayment.onOpenChange}
                                size="xl"
                                placement="center" backdrop="blur"
                                radius="lg"
                                classNames={{
                                  base: "flex flex-col relative",
                                  closeButton: "hidden",
                                }}
                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      <ModalBody className="w-full p-[1rem_1.25rem]">
                                        <div className="flex flex-col">
                                          <div className="lux-alert-top pt-1">
                                            <div className="icon-wrapper m-[0.25rem_0px_0.75rem] w-14 h-14 rounded-full text-[#737577] dark:text-[#d2d4d7] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] justify-center flex items-center">
                                              <CreditCard className="w-8 h-8 block align-middle" />
                                            </div>
                                            <div className="title font-semibold text-xl mb-2">
                                              Liên kết{" "}
                                              <span className="text-red-500">
                                                VN
                                              </span>
                                              <span className="text-blue-500">
                                                PAY
                                              </span>
                                            </div>
                                            <div className="desc   dark:text-[hsla(0,0%,100%,.79)]">
                                              Tài khoản của bạn chưa được thiết
                                              lập để chấp nhận thanh toán.
                                            </div>
                                            <div className="desc   dark:text-[hsla(0,0%,100%,.79)]">
                                              Chúng tôi sử dụng VNPay làm bộ xử
                                              lý thanh toán. Kết nối tài khoản
                                              VNPay của bạn để bắt đầu thanh
                                              toán.
                                            </div>
                                            <Link
                                              href="https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop/"
                                              target="_blank"
                                              className="justify-end items-end flex text-sm pt-2"
                                            >
                                              <span>
                                                Click vào đây để làm theo hướng
                                                dẫn lấy keys.
                                              </span>
                                            </Link>
                                          </div>
                                          <div className="gap-4 mt-2 flex flex-col">
                                            <div className="lux-input-wrapper medium max-w-[auto]">
                                              <div className="inner-wrapper inline-block w-full">
                                                <label className="text-sm block mb-1.5 font-medium   transition-all duration-300 ease-in-out">
                                                  <div>Key</div>
                                                </label>
                                                <div className="input-wrapper flex items-baseline">
                                                  <div className="flex-1 flex items-center">
                                                    <div>&nbsp;</div>
                                                    <Input
                                                      placeholder="Điền key của bạn vào trong này."
                                                      size="md"
                                                      variant="bordered"
                                                      type="password"
                                                      inputMode="text"
                                                      value={tmnCode}
                                                      onChange={(e) =>
                                                        setTmnCode(
                                                          e.target.value
                                                        )
                                                      }
                                                      classNames={{
                                                        input: ["text-base"],
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="lux-input-wrapper medium max-w-[auto]">
                                              <div className="inner-wrapper inline-block w-full">
                                                <label className="text-sm block mb-1.5 font-medium   transition-all duration-300 ease-in-out">
                                                  <div>Secret key</div>
                                                </label>
                                                <div className="input-wrapper flex items-baseline">
                                                  <div className="flex-1 flex items-center">
                                                    <div>&nbsp;</div>
                                                    <Input
                                                      size="md"
                                                      variant="bordered"
                                                      type="password"
                                                      inputMode="text"
                                                      value={hashSecret}
                                                      onChange={(e) =>
                                                        setHashSecret(
                                                          e.target.value
                                                        )
                                                      }
                                                      placeholder="Điền secret key của bạn vào trong này."
                                                      classNames={{
                                                        input: ["text-base"],
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              {connectVnPayErrorMessage && (
                                                <div className="text-[#f3236a]">
                                                  <div className="label break-words">
                                                    {connectVnPayErrorMessage}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <div className="gap-2 flex justify-between items-center">
                                              <Button
                                                disabled={loadingConnectVnPay}
                                                type="button"
                                                onClick={(e) =>
                                                  handleConnectVnPay()
                                                }
                                                className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                              >
                                                <div className="label">
                                                  {loadingConnectVnPay ? (
                                                    <>
                                                      <Spinner
                                                        size="sm"
                                                        color="success"
                                                        className="translate-y-0.5 mr-2"
                                                      />
                                                      <span className="label">
                                                        Đang kết nối...
                                                      </span>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div className="label">
                                                        Kết nối
                                                      </div>
                                                    </>
                                                  )}
                                                </div>
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </ModalBody>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                              <Modal
                                isOpen={modalPriceEvent.isOpen}
                                onOpenChange={modalPriceEvent.onOpenChange}
                                size="sm"
                                radius="lg" placement="center" backdrop="blur"
                                classNames={{
                                  base: "flex flex-col relative",
                                  closeButton: "hidden",
                                }}
                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      <ModalBody className="w-full p-[1rem_1.25rem]">
                                        <div className="flex flex-col">
                                          <div className="lux-alert-top pt-1">
                                            <div className="icon-wrapper m-[0.25rem_0px_0.75rem] w-14 h-14 rounded-full justify-center flex items-center">
                                              <Coins className="w-8 h-8 block align-middle" />
                                            </div>
                                            <div className="title font-semibold text-xl mb-2">
                                              Giá vé
                                            </div>
                                            <div className="desc">
                                              Hãy điều chỉnh giá vé dành riêng
                                              cho Sự kiện của bạn.
                                            </div>
                                          </div>
                                          <div className="gap-4 pt-1 mt-2 flex flex-col">
                                            <div className="lux-input-wrapper medium max-w-[auto]">
                                              <div className="inner-wrapper inline-block w-full">
                                                <label className="text-sm block mb-1.5 font-medium   transition-all duration-300 ease-in-out">
                                                  <div>Giá vé</div>
                                                </label>
                                                <div className="input-wrapper flex items-baseline">
                                                  <div className="flex-1 flex items-center">
                                                    <div>&nbsp;</div>
                                                    {/* // TODO: khi nào có api check, check thành công thì đổi lại vị trí click */}
                                                    <NumericFormat
                                                      className="text-base h-auto donace-button  border border-solid light:border-[#ebeced] transition-all duration-300 ease-in-out m-0 focus:outline-none focus:border-[rgb(19,21,23)]"
                                                      thousandSeparator={true}
                                                      allowNegative={false}
                                                      prefix={"₫ "} // Dấu tiền tệ Việt Nam đồng
                                                      value={price}
                                                      placeholder={
                                                        "Nhập số tiền"
                                                      }
                                                      onValueChange={(e) =>
                                                        setPrice(e.floatValue ? e.floatValue : 0)
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="gap-2 flex justify-between items-center">
                                              <Button
                                                type="button"
                                                onClick={() =>
                                                  handleConfirmPrice()
                                                }
                                                className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                              >
                                                <p className="label">
                                                  Xác nhận
                                                </p>
                                              </Button>
                                              <Button
                                                onClick={() =>
                                                  handleConfirmFree()
                                                }
                                                type="button"
                                                className="  bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                              >
                                                <p className="label">
                                                  Sự kiện miễn phí
                                                </p>
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
                          <div className="option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]">
                            <div className="divider absolute top-0 left-11 right-0 border-b border-solid border-[rgba(19,21,23,0.04)] z-10"></div>
                            <div className="gap-2 flex items-center">
                              <div className="icon light:text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]">
                                <UserCheck className="block w-4 h-4 align-middle translate-y-px" />
                              </div>
                              <div className="select-none flex-1">
                                Phê duyệt
                              </div>
                              <div className="gap-1 flex items-center">
                                <Switch
                                  onChange={(e) => handelRequiedApproved(e)}
                                  color="success"
                                  classNames={{
                                    thumb: ["bg-[#fff]"],
                                    wrapper: ["bg-[rgba(19,21,23,0.16)]"],
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]">
                            <div className="divider absolute top-0 left-11 right-0 border-b border-solid border-[rgba(19,21,23,0.04)] z-10"></div>
                            <div className="gap-2 flex items-center">
                              <div className="icon light:text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]">
                                <ArrowUpToLine className="block w-4 h-4 align-middle translate-y-px" />
                              </div>
                              <div className="select-none flex-1">
                                Số lượng
                              </div>
                              <div className="gap-1 flex items-center font-bold">
                                <div >
                                  {isUnlimitedCapacity ? (
                                    "Không giới hạn"
                                  ) : (
                                    <>{eventReq.capacity}</>
                                  )}
                                </div>
                                <button
                                  aria-label="Button to open modalCapacity"
                                  onClick={modalCapacity.onOpen}
                                  type="button"
                                  className="m-[-1px_-0.25rem_-1px_0px] bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center"
                                >
                                  <Pen className="stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle translate-y-px" />
                                </button>
                              </div>
                            </div>
                            <Modal
                              isOpen={modalCapacity.isOpen}
                              onOpenChange={modalCapacity.onOpenChange}
                              size="sm" placement="center" backdrop="blur"
                              radius="lg"
                              classNames={{
                                base: "flex flex-col relative",
                                closeButton: "hidden",
                              }}
                            >
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalBody className="w-full p-[1rem_1.25rem]">
                                      <div className="flex flex-col">
                                        <div className="lux-alert-top pt-1">
                                          <div className="icon-wrapper m-[0.25rem_0px_0.75rem] w-14 h-14 rounded-full text-[#737577] dark:text-[#d2d4d7] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] justify-center flex items-center">
                                            <Upload className="w-8 h-8 block align-middle" />
                                          </div>
                                          <div className="title font-semibold text-xl mb-2">
                                            Số lượng tối đa
                                          </div>
                                          <div className="desc   dark:text-[hsla(0,0%,100%,.79)]">
                                            Đóng đăng ký tự động khi đã đạt số
                                            lượng đăng ký. Chỉ những khách mời
                                            được phê duyệt mới được tính vào số
                                            lượng đã đủ.
                                          </div>
                                        </div>
                                        <div className="gap-4 pt-1 mt-2 flex flex-col">
                                          <div className="lux-input-wrapper medium max-w-[auto]">
                                            <div className="inner-wrapper inline-block w-full">
                                              <label className="text-sm cursor-pointer block mb-1.5 font-medium   transition-all duration-300 ease-in-out">
                                                <div>Số lượng</div>
                                              </label>
                                              <div className="input-wrapper flex items-baseline">
                                                <div className="flex-1 flex items-center">
                                                  <div>&nbsp;</div>
                                                  <Input
                                                    size="md"
                                                    variant="bordered"
                                                    type="number"
                                                    inputMode="numeric"
                                                    step={1}
                                                    min={1}
                                                    classNames={{
                                                      input: ["text-base"],
                                                    }}
                                                    // onFocus={(e) =>
                                                    //   setCapacity("")
                                                    // }
                                                    value={capacity}
                                                    onChange={(e) => {
                                                      setCapacity(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="gap-2 flex justify-between items-center">
                                            <Button
                                              onPress={modalCapacity.onClose}
                                              type="button"
                                              onClick={(e) => {
                                                setIsUnlimitedCapacity(false);
                                                SetEventReq({
                                                  ...eventReq,
                                                  isUnlimited: false,
                                                  capacity: parseInt(capacity),
                                                });
                                              }}
                                              className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                            >
                                              <div className="label">
                                                Đặt giới hạn
                                              </div>
                                            </Button>
                                            <Button
                                              onPress={modalCapacity.onClose}
                                              onClick={(e) => {
                                                setIsUnlimitedCapacity(true);
                                                SetEventReq({
                                                  ...eventReq,
                                                  isUnlimited: true,
                                                  capacity: 0,
                                                });
                                              }}
                                              type="button"
                                              className="  bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0"
                                            >
                                              <div className="label">
                                                Không giới hạn
                                              </div>
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
                      </div>

                      <div className="ml-1 mt-3">
                        {creatEventErrorMessage && (
                          <div className="text-[#f3236a]">
                            <div className="label break-words">
                              {creatEventErrorMessage}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <Button
                          isDisabled={isLoading}
                          onClick={handleCreateEvent}
                          type="button"
                          className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                        >
                          <div className="label">
                            {isLoading ? (
                              <>
                                <Spinner
                                  size="sm"
                                  color="success"
                                  className="translate-y-0.5 mr-2"
                                />
                                <span className="label">
                                  Đang tạo sự kiện...
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="label">Tạo Sự kiện</div>
                              </>
                            )}
                          </div>
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div className="right ">
                    <div
                      role="button"
                      onClick={() => {
                        const fileInput =
                          document.getElementById("avatarImage");
                        if (fileInput) {
                          fileInput.click();
                        }
                      }}
                      className="photo-container bg-[rgba(19,21,23,0.04)] rounded-lg overflow-hidden outline-offset-2 outline-none transition-all duration-300 ease-in-out relative cursor-pointer"
                    >
                      <div className="image has-image transition-all duration-300 ease-in-out">
                        <div className="img-aspect-ratio w-full bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] overflow-hidden relative rounded-lg">
                          {/* <div
                            ref={refDivBackground}
                            className="bg-[url('https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard1.png')] cursor-pointer top-0 left-0  object-cover align-middle w-[auto] h-[380px] rounded-[0.5rem] bg-center bg-cover flex justify-center items-center bg-[#ebeced] dark:bg-[#333537]"
                          ></div> */}
                          <img className="h-[350px]  max-w-[350px] w-full object-cover" src={image} alt="img" />
                        </div>
                      </div>
                      <div className="z-20 absolute bottom-0 right-0 w-0 rounded-lg transition-all duration-300 ease-in-out justify-center flex items-center border-[#bcc0ec]">
                        <input
                          aria-label="avatarImage"
                          type="file"
                          id="avatarImage"
                          className="hidden"
                          onChange={handleUploadEventBackground}
                        />
                        <div
                          onClick={() => {
                            const fileInput =
                              document.getElementById("avatarImage");
                            if (fileInput) {
                              fileInput.click();
                            }
                          }}
                          id="upload-icon"
                          className="rounded-[0.5rem] bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[#212325] bg-[rgb(19,21,23)] dark:bg-[#fff] hover:bg-[#de3163] w-[35%] h-[35%] min-w-[30px] min-h-[30px] border-2 border-solid border-[#fff] dark:border-[#212325] absolute right-[-1px] bottom-[-1px] origin-center transition-all duration-300 ease-in-out"
                        >
                          {isUploading ? (
                            <Spinner size="sm" color="default" />
                          ) : (
                            <ArrowUp className="stroke-[2.5] w-[65%] h-[65%] block align-middle" />
                          )}{" "}
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
    </>
  );
}
function SetCurrentCalendar(
  lstCalendarTemp: Calendar[],
  calendarId: string | null | undefined,
  SetSelectedCalendar: React.Dispatch<
    React.SetStateAction<Calendar | undefined>
  >
) {
  let foundCalendars = lstCalendarTemp.filter((c) => c.id == calendarId);
  if (foundCalendars.length > 0) {
    SetSelectedCalendar(foundCalendars[0]);
  } else {
    SetSelectedCalendar(lstCalendarTemp[0]);
  }
}

async function GetCalendars(
  setLstCalendar: React.Dispatch<React.SetStateAction<Calendar[]>>
) {
  const calendarRes = await fetchWrapper.post("/api/Calendar/get-list", {
    pageNumber: 1,
    pageSize: 9999,
  });
  let lstCalendarTemp = calendarRes.result as Calendar[];
  setLstCalendar(lstCalendarTemp);
  return lstCalendarTemp;
}

function isURL(input: string): boolean {
  const urlRegex =
    /^(?:(?:(?:https?|ftp):)?\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
  return urlRegex.test(input);
}

function formatCurrency(value: number | undefined) {
  if (value == undefined) return "0 đ";
  const formattedValue = parseFloat(value.toString()).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Thêm ký tự 'đ' ở cuối số
  return formattedValue.replace(/\₫/g, "") + " đ";
}
