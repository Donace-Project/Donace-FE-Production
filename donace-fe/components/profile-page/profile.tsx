"use client";
import React, { useEffect, useState, useRef } from "react";
import "@/styles/globals.css";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  CalendarX2,
  Globe,
  ArrowUp,
  Instagram,
  Linkedin,
  Pen,
  Plus,
  Twitter,
  Youtube,
  ArrowRight,
  CalendarClock,
  Frown,
  MapPin,
  Radio,
  ScanLine,
  Users2,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalProps,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { FaTiktok } from "react-icons/fa";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { EventDetailSorted, ItemEventsProfile, UserProfile } from "@/types/DonaceType";
import { Divider, Skeleton, Spinner, Tabs } from "@nextui-org/react";
import { user } from "@nextui-org/theme";
import donaceLogo from "@/public/doanLogo.png";
import { AMorPM, ConvertDateTime } from "../clock/cover-data-time";
import { Tab } from "@nextui-org/tabs";
import { DayOfWeek, CovertDate } from "../clock/day-of-week";

import { Image } from "@nextui-org/react";

const currentDate = new Date();

currentDate.setDate(currentDate.getDate() - 1);

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  let [userProfile, setUserProfile] = useState<any>(null);


  var [futureEvents, setFutureEvents] = useState<EventDetailSorted[]>();
  var [pastEvents, setPastEvents] = useState<EventDetailSorted[]>();

  const fetchEvents = async () => {
    try {
      const futureEventsData = await fetchWrapper.get(`api/Event?IsNew=${true}`);
      setFutureEvents(futureEventsData.items);

      const pastEventsData = await fetchWrapper.get(`api/Event?IsNew=${false}`);
      setPastEvents(pastEventsData.items);

    } catch (error) {
      console.error('Error fetching events:', error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Gọi API profile và gán dữ liệu cho biến profile
    fetchEvents();
  }, []);


  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    if (typeof window !== 'undefined') {
      // Chỉ thực hiện đăng ký sự kiện khi chạy trên phía client
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const placements = ["outside"];
  const variants = ["bordered"];
  const handleImageChange = async (e: any) => {
    debugger;
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const FileData = new FormData();
    FileData.append("file", selectedFile);

    setLoading(true);

    const url = await fetchWrapper.postFile("api/Common/upload-file", FileData);
    if (url != null) {
      console.log(url);
      setLoading(false);
    }

    setUserProfile({
      ...userProfile,
      avatar: url,
    });
  };

  const updateProfileHandle = async () => {
    setIsLoading(true);
    await fetchWrapper
      .post("/api/User/update-profile", userProfile)
      .then(() => {
        setIsLoading(false);
        onClose();
        // location.reload(); // Làm mới trang khi nút được nhấn
      });
  };

  //QR generator
  const modalViewTicket = useDisclosure();
  const [ticketIdForQr, setTicketIdForQr] = useState<string>("");

  const handleQrGenerator = async () => {
    if (ticketIdForQr == "") {
      let ticketId = await fetchWrapper.get("/api/UserTickets/get-ticket")
      if (ticketId != null) {
        setTicketIdForQr(ticketId)
      }
      else {
        console.log("some bug")
      }
    }
  }

  const openModalGenQr = () => {
    handleQrGenerator();
    modalViewTicket.onOpen();
  }

  // call api hinh
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleArrowUpClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  // bg-[url('https://th.bing.com/th/id/OIP.tfwNSpjXuFMQtsujE89LVwHaEK?rs=1&pid=ImgDetMain')]
  return (
    <div className="page-content relative">
      <div className="profile-page-theme font-sans font-normal">
        <div className="profile-page-wrapper">
          <div className="profile-content-container">
            <div className="profile-bio is-me pt-4 bg-transparent backdrop-blur-lg bg-no-repeat bg-cover">
              <div className="user-header-wrapper w-full m-auto">
                <div className="user-header py-8 block text-center">
                  <div className="image-container w-32 m-auto">
                    <div
                      className="transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      <div className="avatar-wrapper w-32 h-32  p-1 bg-background bg-opacity-70 rounded-full border border-solid border-background transition-all duration-300 ease-in-out">
                        <Avatar
                          src={userProfile?.avatar ? userProfile?.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=100,height=100/avatars-default/avatar_8.png"}
                          radius="full"
                          name="Donace"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bio-container">
                    <div className="user-header-text">
                      {userProfile ? (
                        <div>
                          <div
                            className="text-inherit transition-all duration-300 ease-in-out cursor-pointer"
                          >
                            <h1 className="font-semibold backdrop-blur-lg p-2 rounded-lg bg-transparent text-3xl mt-4 mb-4">
                              {userProfile.userName}
                            </h1>
                          </div>
                          <div className="bio whitespace-pre-line break-words text-sm text-foreground-700 mb-2">
                            {userProfile.bio}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className="justify-center flex items-center">
                      {!userProfile ? (
                        <div>
                          <div className="social-link large"></div>
                        </div>
                      ) : (
                        <div>
                          <div className="social-links  flex items-center">
                            {
                              userProfile.instagram != "" ? <div className="social-link large">
                                <Link
                                  color="foreground"
                                  defaultValue={userProfile?.instagram}
                                  href={"https://www.instagram.com/" + userProfile?.instagram}
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Instagram className="block w-5 h-5 align-middle" />
                                </Link>
                              </div> : <></>
                            }
                            {
                              userProfile.twitter != "" ? <div className="social-link large">
                                <Link
                                  color="foreground"
                                  href={"https://www.twitter.com/" + userProfile?.twitter}
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Twitter className="  block w-5 h-5 align-middle" />
                                </Link>
                              </div> : <></>
                            }
                            {
                              userProfile.youtube != "" ? <div className="social-link large">
                                <Link
                                  color="foreground"
                                  href={"https://www.youtube.com/" + userProfile?.youtube}
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Youtube className="  block w-5 h-5 align-middle" />
                                </Link>
                              </div> : <></>
                            }
                            {
                              userProfile.linkedIn != "" ? <div className="social-link large">
                                <Link
                                  color="foreground"
                                  href={"https://www.linkedin.com/" + userProfile?.linkedIn}
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Linkedin className="  block w-5 h-5 align-middle" />
                                </Link>
                              </div> : <></>
                            }
                            {
                              userProfile.tiktok != "" ? <div className="social-link large">
                                <Link
                                  color="foreground"
                                  href={"https://www.tiktok.com/" + userProfile?.tiktok}
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <FaTiktok className="  block w-5 h-5 align-middle" />
                                </Link>
                              </div> : <></>
                            }
                            {
                              userProfile.website != "" ? <div className="social-link large">
                                <Link
                                  color="foreground"
                                  href={userProfile?.website}
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Globe className="  block w-5 h-5 align-middle" />
                                </Link>
                              </div> : <></>
                            }
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="pt-4">
                      <Modal className="backdrop-blur-lg shadow-xl drop-shadow-lg bg-background bg-opacity-70"
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        scrollBehavior={scrollBehavior}
                        placement="center"
                        backdrop="blur"
                        size="lg"
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex justify-between items-center">
                                <div className="text-lg font-semibold">
                                  Chỉnh sửa thông tin cá nhân
                                </div>
                              </ModalHeader>
                              <ModalBody className="w-full">
                                <div className="edit-profile-modal">
                                  <form action={"#"}>
                                    <div className="avatar justify-center flex items-center w-full">
                                      <div className="justify-center flex items-center w-full">
                                        <div className="avatar-section py-2 bg-opacity-70 rounded-lg bg-[url('https://th.bing.com/th/id/OIP.tfwNSpjXuFMQtsujE89LVwHaEK?rs=1&pid=ImgDetMain')] bg-no-repeat bg-cover w-full">
                                          <label className="text-sm block font-medium transition-all duration-300 ease-in-out">
                                            <div className="text-center mb-2 drop-shadow-lg">
                                              Ảnh cá nhân
                                            </div>
                                          </label>
                                          <div
                                            role="presentation"
                                            className="relative w-24 h-24 cursor-pointer m-auto"
                                          >
                                            <input
                                              aria-label="avatarImage"
                                              accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                                              multiple
                                              type="file"
                                              className="hidden text-inherit m-0"
                                              onChange={handleImageChange}
                                              ref={fileInputRef} // Reference to the file input
                                            />
                                            <div
                                              className="z-20 upload-icon rounded-full bg-center bg-cover flex justify-center items-center text-background bg-opacity-70 bg-foreground w-8 h-8 border-2 border-solid border-foreground-700 absolute right-0 bottom-0 origin-center transition-all duration-300 ease-in-out"
                                              onClick={handleArrowUpClick} // Trigger file input when the arrow icon is clicked
                                            >
                                              <ArrowUp className="stroke-2 w-2/3 block align-middle" />
                                            </div>
                                            <Avatar
                                              onClick={() => {
                                                handleArrowUpClick();
                                              }}
                                              className="w-24 h-24 bg-center bg-cover flex justify-center items-center bg-opacity-70 bg-foreground"
                                              radius="full"
                                              src={userProfile?.avatar ? userProfile?.avatar : donaceLogo.src}

                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <div className="lux-input-wrapper">
                                        {placements.map((placement) => (
                                          <Input
                                            key={placement}
                                            type="text"
                                            label="Tên"
                                            labelPlacement={"outside"}
                                            autoCorrect="off"
                                            spellCheck="false"
                                            autoCapitalize="words"
                                            className="bg-transparent font-semibold transition-all duration-300 ease-in-out  leading-4 rounded-lg w-full"
                                            autoFocus
                                            autoComplete="disable"
                                            variant="bordered"
                                            value={userProfile?.userName}
                                            placeholder="Tên của bạn là gì?"
                                            onChange={(e) => {
                                              setUserProfile({
                                                ...userProfile,
                                                userName: e.target.value,
                                              });
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <div className="lux-input-wrapper">
                                        {variants.map((variant) => (
                                          <Textarea
                                            key={variant}
                                            variant={"bordered"}
                                            label="Tiểu sử"
                                            labelPlacement={"outside"}
                                            value={userProfile?.bio}
                                            placeholder="Hãy cho chúng tôi biết một số thông tin thú vị về bạn."
                                            maxLength={100}
                                            maxRows={2}
                                            autoCapitalize="on"
                                            className="bg-transparent font-semibold  text-lg transition-all duration-300 ease-in-out  leading-6 rounded-lg w-full"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                bio: e.target.value,
                                              })
                                            }
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <div className="font-bold text-lg">
                                      Liên kết mạng xã hội
                                    </div>
                                    <div className="flex flex-col gap-2">
                                      <div className="inline-flex flex-row justify-start gap-4 items-center">
                                        <Instagram className="w-4 h-4" />
                                        <div className="inline-flex gap-4 flex-row items-center w-full">
                                          <div className="accessory-text text-base p-2 border border-solid rounded-lg flex items-center">
                                            instagram.com/@
                                          </div>
                                          <Input
                                            value={
                                              userProfile?.instagram
                                            }
                                            type="text"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            className="text-base w-full"
                                            radius="sm"
                                            variant="bordered"
                                            placeholder="username"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                instagram:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="inline-flex flex-row justify-start gap-4 items-center">
                                        <Twitter className="w-4 h-4" />
                                        <div className="inline-flex gap-4 flex-row items-center w-full">
                                          <div className="accessory-text text-base  p-2 border border-solid rounded-lg flex items-center">
                                            twitter.com/@
                                          </div>
                                          <Input
                                            value={
                                              userProfile?.twitter
                                            }
                                            type="text"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            className="text-base w-full"
                                            radius="sm"
                                            variant="bordered"
                                            placeholder="username"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                twitter:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="inline-flex flex-row justify-start gap-4 items-center">
                                        <Youtube className="w-4 h-4" />
                                        <div className="inline-flex gap-4 flex-row items-center w-full">
                                          <div className="accessory-text text-base  p-2 border border-solid rounded-lg flex items-center">
                                            youtube.com/@
                                          </div>
                                          <Input
                                            value={
                                              userProfile?.youtube
                                            }
                                            type="text"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            className="text-base w-full"
                                            radius="sm"
                                            variant="bordered"
                                            placeholder="username"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                youtube:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="inline-flex flex-row justify-start gap-4 items-center">
                                        <FaTiktok className="w-4 h-4" />
                                        <div className="inline-flex gap-4 flex-row items-center w-full">
                                          <div className="accessory-text text-base  p-2 border border-solid rounded-lg flex items-center">
                                            tiktok.com/@
                                          </div>
                                          <Input
                                            value={
                                              userProfile?.tiktok
                                            }
                                            type="text"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            className="text-base w-full"
                                            radius="sm"
                                            variant="bordered"
                                            placeholder="username"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                tiktok:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="inline-flex flex-row justify-start gap-4 items-center">
                                        <Linkedin className="w-4 h-4" />
                                        <div className="inline-flex gap-4 flex-row items-center w-full">
                                          <div className="accessory-text text-base  p-2 border border-solid rounded-lg flex items-center">
                                            linkedin.com/@
                                          </div>
                                          <Input
                                            value={
                                              userProfile?.linkedIn
                                            }
                                            type="text"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            className="text-base w-full"
                                            radius="sm"
                                            variant="bordered"
                                            placeholder="username"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                linkedIn:
                                                  e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full flex gap-4 mt-2 items-center">
                                      <Globe className=" block w-4 h-4" />
                                      <Input
                                        value={userProfile?.website}
                                        type="url"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        className="text-base w-full"
                                        variant="bordered"
                                        placeholder="Website của bạn"
                                        onChange={(e) =>
                                          setUserProfile({
                                            ...userProfile,
                                            website: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </form>
                                </div>
                                {loading ? (
                                  <div className="absolute top-0 bottom-0 w-full backdrop-blur-lg z-auto">
                                    <div className="flex flex-row gap-2 h-full justify-center items-center">
                                      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                                      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                                      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                                    </div>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </ModalBody>
                              <ModalFooter className="m-4">
                                <Button
                                  onClick={updateProfileHandle}
                                  className="text-[#fff] bg-[#0099dd] border-[#0099dd] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out donace-button mt-6 flex items-center m-0 leading-6"
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
                                        <div className="label">Cập nhật</div>
                                      </>
                                    )}
                                  </div>
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                      <Button
                        onPress={onOpen}
                        variant="shadow"
                        type="button"
                        className="font-medium bg-background bg-opacity-70 border-none cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center"
                        radius="full"
                      >
                        <Pen className="w-4 h-4 block" />
                        <span className="text-base">Chỉnh sửa tiểu sử</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="profile-content"
              className="pt-4 w-full max-w-2xl flex flex-col pb-0 m-auto "
            >
              <div id="profile-block-wrapper" className="relative">
                <div className=" block">
                  <div className="profile-block-content">
                    <div className="view-block block">
                      <div>
                        <div className="profile-events-wrapper mx-3 md:mx-0">
                          {isOnline ? (
                            <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                              <div className="spread gap-2 mb-2 flex justify-between items-center">
                                <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Sự kiện</h1>
                              </div>
                              <div className="flex-col flex gap-2">
                                {loading ? (
                                  <div className="space-y-3 pt-1 mt-2">
                                    <Skeleton className="w-4/5 rounded-lg">
                                      <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-full rounded-lg">
                                      <div className="h-6 w-full rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-3/5 rounded-lg">
                                      <div className="h-6 w-3/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                  </div>
                                ) : (
                                  <Tabs aria-label="Options" >
                                    <Tab key="future" title="Sắp tới" className="font-semibold">
                                      <div className="zm-container  max-width-global margin-global">
                                        {futureEvents && futureEvents.length > 0 ? (
                                          <div className="timeline">
                                            {futureEvents?.map((event, index) => (
                                              <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                                                {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                                                <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                                                  <div className="container">
                                                    <div className="timeline-title">
                                                      <div className="content animated transition-all duration-300 ease-in-out">
                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                        <div className="text-foreground">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                      </div>
                                                    </div>
                                                    {/* <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                  <div className="dot-wrapper justify-center flex items-center">
                                    <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                  </div>
                                </div> */}
                                                  </div>
                                                </div>
                                                <div className="block md:hidden container">
                                                  <div className="w-full">
                                                    <div className="timeline-title">
                                                      <div className="content animated transition-all duration-300 ease-in-out">
                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                        <div className="text-foreground-900">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <Divider orientation="horizontal" />
                                                </div>
                                                <div className="w-full">
                                                  <div className="card-wrapper">
                                                    <div className="card-wrapper content-card transition-all duration-300 ease-in-out rounded-xl bg-background bg-opacity-70  border border-solid border-opacity-50 border-background">
                                                      <div className="event-content gap-3 flex flex-col">
                                                        <div className="info-and-cover flex-col md:flex-row-reverse gap-4 flex">
                                                          <Link href={`${event.isHost ? `/events/manage/${event.id}` : `/user/join-event/${event.id}`}`} className="block">
                                                            <div className="aspect-square  md:w-40 md:h-40 rounded-lg">
                                                              <Image className="block w-full h-full object-cover" alt="you are invited" width={400} height={400} src={event.cover ? event.cover : donaceLogo.src} />
                                                            </div>
                                                          </Link>
                                                          <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                                            <div className="event-time gap-2 flex items-center">
                                                              {event.isLive ? (
                                                                <div>
                                                                  <div className="live-badge text-[#ff9641] flex items-center font-medium"
                                                                    style={{
                                                                      animationName: 'breath',
                                                                      animationDuration: '2s',
                                                                      animationTimingFunction: 'ease',
                                                                      animationDelay: '0s',
                                                                      animationIterationCount: 'infinite',
                                                                      animationDirection: 'normal',
                                                                      animationFillMode: 'none',
                                                                      animationPlayState: 'running',
                                                                    }}
                                                                  >
                                                                    <Radio className="translate-y-px mr-2 w-4 h-4 block align-middle" />
                                                                    LIVE
                                                                  </div>
                                                                </div>
                                                              ) : (
                                                                <div className="hidden"></div>
                                                              )}
                                                              <div className="truncate text-foreground  ">
                                                                <span>
                                                                  {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute} {AMorPM().buoi}
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="text-xl whitespace-nowrap">
                                                              <h3 className="font-medium break-words mt-0 mb-4">{event.name}</h3>
                                                            </div>
                                                            <div className="gap-1 flex flex-col">
                                                              <div className="attribute text-base text-foreground  gap-3 flex items-start whitespace-nowrap w-full">
                                                                <div className="icon text-base flex items-center">
                                                                  &nbsp;
                                                                  <MapPin className="w-4 h-4 block align-middle" />
                                                                </div>
                                                                <div className="text-base max-w-[350px] truncate">{event.addressName}</div>
                                                              </div>
                                                              <div className="attribute text-base text-foreground gap-3 flex items-start whitespace-nowrap">
                                                                <div className="icon text-base flex items-center">
                                                                  &nbsp;
                                                                  <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                                                </div>
                                                                <div className="text-base min-w-0 ">{event.totalGuest} Khách</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="event-bottom-bar flex justify-between items-center">
                                                          {
                                                            event.isHost ?
                                                              <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                                                <Button
                                                                  as={Link}
                                                                  href={`/user/join-event/${event.id}`}
                                                                  className="bg-background bg-opacity-70  text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                                                >
                                                                  <div className="label">Check In</div>
                                                                  <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                                                </Button>
                                                                <Button as={Link} href={`/events/manage/${event.id}`} className="bg-background bg-opacity-70  text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                                                  <div className="label">Quản lý sự kiện</div>
                                                                  <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                                </Button>
                                                              </div>
                                                              :
                                                              <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                                                <Button
                                                                  onClick={() => { openModalGenQr(); }}
                                                                  className="bg-background bg-opacity-70  text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                                                >
                                                                  <div className="label">Xem mã QR</div>
                                                                  <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                                                </Button>
                                                                <Button as={Link} href={`/user/join-event/${event.id}`} className="bg-background bg-opacity-70  text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                                                  <div className="label">Xem sự kiện</div>
                                                                  <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                                </Button>
                                                              </div>
                                                          }

                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="large text-center mt-16 mb-[3rem!important] flex flex-col items-center">
                                            <div className="icon justify-center flex items-center">
                                              <div className="mb-[-40px]">
                                                <CalendarClock className="w-64 h-auto align-middle text-foreground-700" />
                                              </div>
                                            </div>
                                            <h3 className="text-2xl font-medium text-foreground-700 mt-20">
                                              Không có sự kiện gì sắp tới
                                            </h3>
                                            <div className="desc pl-12 pr-12 text-foreground-700 mt-4 font-normal">
                                              Bạn không có sự kiện gì sắp tới. Muốn thử không?
                                            </div>
                                            <div className="button-create mt-6 justify-center flex">
                                              <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer  bg-background bg-opacity-70">
                                                <Link
                                                  href="/create"
                                                  className="text-foreground-700"
                                                >
                                                  <Plus className=" mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle mt-0.5" />
                                                  <div className="label">Tạo sự kiện</div>
                                                </Link>
                                              </Button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </Tab>
                                    <Tab key="past" title="Đã qua" className="font-semibold">
                                      <div className="zm-container  max-width-global margin-global">
                                        {pastEvents && pastEvents.length > 0 ? (
                                          <div className="timeline">
                                            {pastEvents?.map((event, index) => (
                                              <div key={index} className="flex flex-col md:flex-row w-full justify-between gap-3">
                                                {/* <div className="line dark:border-[rgba(255,255,255,0.08)]"></div> */}
                                                <div className="title border-r-4 pe-4 border-dashed hidden md:block">
                                                  <div className="container">
                                                    <div className="timeline-title">
                                                      <div className="content animated transition-all duration-300 ease-in-out">
                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                        <div className="text-foreground">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                      </div>
                                                    </div>
                                                    {/* <div className="dot-outer-wrapper absolute top-1.5 right-[calc(-2rem-0.4375rem)] justify-center flex items-center">
                                <div className="dot-wrapper justify-center flex items-center">
                                  <div className="dot w-3 h-3 bg-[#f3f4f5] dark:bg-[rgb(19,21,23)] border-2 border-solid border-[rgba(19,21,23,0.2)] dark:border-[hsla(0,0%,100%,.32)] rounded-full"></div>
                                </div>
                              </div> */}
                                                  </div>
                                                </div>
                                                <div className="block md:hidden container">
                                                  <div className="w-full">
                                                    <div className="timeline-title">
                                                      <div className="content animated transition-all duration-300 ease-in-out">
                                                        <div className="date font-medium">{ConvertDateTime(event.startDate).day}/{ConvertDateTime(event.startDate).month}/{ConvertDateTime(event.startDate).year}</div>
                                                        <div className="text-foreground-900">{DayOfWeek(CovertDate(event.startDate)[0])}</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <Divider orientation="horizontal" />
                                                </div>
                                                <div className="w-full">
                                                  <div className="card-wrapper">
                                                    <div className="card-wrapper content-card transition-all duration-300 ease-in-out rounded-xl bg-background bg-opacity-70  border border-solid border-opacity-50 border-background">
                                                      <div className="event-content gap-3 flex flex-col">
                                                        <div className="info-and-cover flex-col md:flex-row-reverse gap-4 flex">
                                                          <Link href={`${event.isHost ? `/events/manage/${event.id}` : `/user/join-event/${event.id}`}`} className="block">
                                                            <div className="aspect-square  md:w-40 md:h-40 rounded-lg">
                                                              <Image className="block w-full h-full object-cover" alt="you are invited" width={400} height={400} src={event.cover ? event.cover : donaceLogo.src} />
                                                            </div>
                                                          </Link>
                                                          <div className="info gap-2 min-w-0 flex-1 flex flex-col">
                                                            <div className="event-time gap-2 flex items-center">
                                                              {event.isLive ? (
                                                                <div>
                                                                  <div className="live-badge text-[#ff9641] flex items-center font-medium"
                                                                    style={{
                                                                      animationName: 'breath',
                                                                      animationDuration: '2s',
                                                                      animationTimingFunction: 'ease',
                                                                      animationDelay: '0s',
                                                                      animationIterationCount: 'infinite',
                                                                      animationDirection: 'normal',
                                                                      animationFillMode: 'none',
                                                                      animationPlayState: 'running',
                                                                    }}
                                                                  >
                                                                    <Radio className="translate-y-px mr-2 w-4 h-4 block align-middle" />
                                                                    LIVE
                                                                  </div>
                                                                </div>
                                                              ) : (
                                                                <div className="hidden"></div>
                                                              )}
                                                              <div className="truncate text-foreground  ">
                                                                <span>
                                                                  {ConvertDateTime(event.startDate).hour}:{ConvertDateTime(event.startDate).minute} {AMorPM().buoi}
                                                                </span>
                                                              </div>
                                                            </div>
                                                            <div className="text-xl whitespace-nowrap">
                                                              <h3 className="font-medium break-words mt-0 mb-4">{event.name}</h3>
                                                            </div>
                                                            <div className="gap-1 flex flex-col">
                                                              <div className="attribute text-base text-foreground  gap-3 flex items-start whitespace-nowrap w-full">
                                                                <div className="icon text-base flex items-center">
                                                                  &nbsp;
                                                                  <MapPin className="w-4 h-4 block align-middle" />
                                                                </div>
                                                                <div className="text-base max-w-[350px] truncate">{event.addressName}</div>
                                                              </div>
                                                              <div className="attribute text-base text-foreground gap-3 flex items-start whitespace-nowrap">
                                                                <div className="icon text-base flex items-center">
                                                                  &nbsp;
                                                                  <Users2 className="w-4 h-4 block align-middle mt-0.5" />
                                                                </div>
                                                                <div className="text-base min-w-0 ">{event.totalGuest} Khách</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="event-bottom-bar flex justify-between items-center">

                                                          <div className="gap-2 flex flex-col md:flex-row items-center justify-between w-full">
                                                            <Button
                                                              as={Link}
                                                              href={`/user/join-event/${event.id}`}
                                                              className="bg-background bg-opacity-70  text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                                                            >
                                                              <div className="label">Xem sự kiện</div>
                                                              <ScanLine className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5" />
                                                            </Button>
                                                            <Button as={Link} href={`/events/manage/${event.id}`} className="bg-background bg-opacity-70  text-foregrounde border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer">
                                                              <div className="label">Quản lý sự kiện</div>
                                                              <ArrowRight className="mr-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                                                            </Button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="large text-center my-12 flex flex-col items-center">
                                            <div className="icon justify-center flex items-center">
                                              <div className="mb-[-40px]">
                                                <CalendarClock className="w-64 h-auto align-middle text-foreground-700" />
                                              </div>
                                            </div>
                                            <h3 className="text-2xl font-medium text-foreground-700 p-[0!important] mt-20 mb-[0!important]">
                                              Không có sự kiện gì sắp tới
                                            </h3>
                                            <div className="desc p-12 text-foreground-700 mt-4 font-normal">
                                              Bạn không có sự kiện gì sắp tới. Muốn thử không?
                                            </div>
                                            <div className="button-create mt-6 justify-center flex">
                                              <Button className="transition-all duration-300 ease-in-out donace-button mt-4 flex items-center cursor-pointer  bg-background bg-opacity-70">
                                                <Link
                                                  href="/create"
                                                  className="text-foreground-700"
                                                >
                                                  <Plus className=" mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle mt-0.5" />
                                                  <div className="label">Tạo sự kiện</div>
                                                </Link>
                                              </Button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </Tab>
                                  </Tabs>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                              <div className="icon justify-center flex items-center">
                                <div className="">
                                  <Frown className="w-64 h-auto align-middle text-foreground-700" />
                                </div>
                              </div>
                              <h3 className="text-2xl font-medium text-foreground-900 p-0 mt-4 mb-0">Bị lỗi mạng</h3>
                              <div className="desc pl-12 pr-12 text-foreground-900 mt-2">Chúng tôi nhận thấy rằng mạng đang có vấn đề. Xin vui lòng thử lại sau.</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-12 pt-12"></div>
            </div>
          </div>
          <div className="bar-container"></div>
        </div>
      </div>

    </div>
  );
}
