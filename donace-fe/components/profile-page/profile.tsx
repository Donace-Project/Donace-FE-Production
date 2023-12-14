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
import { ItemEventsProfile, UserProfile } from "@/types/DonaceType";
import { Spinner } from "@nextui-org/react";

interface DateInfo {
  year: string;
  month: string;
  day: string;
}

const ConvertDate = (date: string): DateInfo => {
  const dateArray = date.split("-");
  const year = dateArray[0]; // Lấy thông tin về năm từ phần tử đầu tiên trong mảng
  const month = dateArray[1]; // Lấy thông tin về tháng từ phần tử thứ hai trong mảng
  const day = dateArray[2].split("T")[0]; // Lấy thông tin về ngày từ phần tử thứ ba và loại bỏ phần giờ nếu có

  return { year, month, day };
};

const currentDate = new Date();
const currentDateFormatted = currentDate
  .toLocaleDateString("en-US")
  .replace(/\//g, "-");
currentDate.setDate(currentDate.getDate() - 1);
const pastDateFormatted = currentDate
  .toLocaleString("en-US")
  .replace(/\//g, "-");

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const dateTimeTrue = true;
  const [loading, setLoading] = useState(false);
  let [userProfile, setUserProfile] = useState<any>(null);
  var [futureEvents, setFutureEvents] = useState<ItemEventsProfile[]>();
  const refAvatar = useRef();
  useEffect(() => {
    // Gọi API profile và gán dữ liệu cho biến profile
    fetchWrapper
      .get("/api/User/profile")
      .then((data: UserProfile) => {
        setUserProfile(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  useEffect(() => {
    fetchWrapper
      .get(`api/Event?IsNew=${dateTimeTrue}`)
      .then((data) => setFutureEvents(data.items));
  }, []);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  const placements = ["outside"];
  const variants = ["bordered"];

  const imageUrl =
    "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400/event-defaults/1-1/standard3.png";

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    const res = await fetchWrapper
      .post("/api/User/update-profile", userProfile)
      .then(() => {
        setIsLoading(false);
        onClose();
        // location.reload(); // Làm mới trang khi nút được nhấn
      });
  };

  // call api hinh
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleArrowUpClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="page-content relative">
      <div className="profile-page-theme font-sans font-normal">
        <div>
          <div className="profile-page-wrapper">
            <div className="profile-content-container">
              <div className="profile-bio is-me pt-4 bg-[#f0f7fb] dark:bg-[#0e151d]">
                <div className="user-header-wrapper p-[0_1rem] w-full max-w-2xl m-auto">
                  <div className="user-header pr-0 pb-8 pl-0 pt-8 block text-center">
                    <div className="image-container w-32 m-auto">
                      <Link
                        href="/calendars"
                        className="transition-all duration-300 ease-in-out cursor-pointer"
                        underline="none"
                      >
                        <div className="avatar-wrapper">
                          <Avatar
                            src={userProfile?.avatar ? userProfile?.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=100,height=100/avatars-default/avatar_8.png"}
                            radius="full"
                            name="Donace"
                            className="w-32 h-32 bg-[#fff] relative"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="bio-container">
                      <div className="user-header-text">
                        {userProfile ? (
                          <div>
                            <Link
                              className="text-inherit transition-all duration-300 ease-in-out cursor-pointer"
                              underline="none"
                            >
                              <h1 className="font-semibold text-3xl mt-4 mb-4">
                                {userProfile.userName}
                              </h1>
                            </Link>
                            <div className="bio whitespace-pre-line break-words text-sm text-[#849ba4] mb-2">
                              {userProfile.bio}
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="justify-center flex items-center">
                        {userProfile ? (
                          <div>
                            <div className="social-link large"></div>
                          </div>
                        ) : (
                          <div>
                            <div className="social-links -ml-2 -mr-2 flex items-center">
                              <div className="social-link large">
                                <Link
                                  defaultValue={userProfile?.instagram}
                                  href=""
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 text-black-blur-light-theme block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Instagram className="dark:text-[hsla(0,0%,100%,.5)] flex-shrink-0 block w-5 h-5 align-middle" />
                                </Link>
                              </div>
                              <div className="social-link large">
                                <Link
                                  href=""
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 text-black-blur-light-theme block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Twitter className="dark:text-[hsla(0,0%,100%,.5)] flex-shrink-0 block w-5 h-5 align-middle" />
                                </Link>
                              </div>
                              <div className="social-link large">
                                <Link
                                  href=""
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 text-black-blur-light-theme block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Youtube className="dark:text-[hsla(0,0%,100%,.5)] flex-shrink-0 block w-5 h-5 align-middle" />
                                </Link>
                              </div>
                              <div className="social-link large">
                                <Link
                                  href=""
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 text-black-blur-light-theme block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <FaTiktok className="dark:text-[hsla(0,0%,100%,.5)] flex-shrink-0 block w-5 h-5 align-middle" />
                                </Link>
                              </div>
                              <div className="social-link large">
                                <Link
                                  href=""
                                  target="_blank"
                                  rel="nofollow noopener"
                                  className="lux-menu-trigger p-2 text-black-blur-light-theme block min-w-0 transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Linkedin className="dark:text-[hsla(0,0%,100%,.5)] flex-shrink-0 block w-5 h-5 align-middle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pt-4">
                        <Modal
                          isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          scrollBehavior={scrollBehavior}
                          placement="center"
                        >
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="p-[0.75rem_1.25rem] border-b border-solid border-[#eff3f5] dark:border-[#0005] flex justify-between items-center">
                                  <div className="text-[#002f45] dark:text-white text-lg font-semibold">
                                    Chỉnh sửa thông tin cá nhân
                                  </div>
                                </ModalHeader>
                                <ModalBody className="w-full p-[1rem_1.25rem] overflow-auto dark:bg-[#0e151d]">
                                  <div className="edit-profile-modal pb-2">
                                    <form action={"#"}>
                                      <div className="avatar justify-center flex items-center">
                                        <div className="justify-center flex items-center">
                                          <div className="avatar-section flex-1">
                                            <label className="text-sm block mb-1.5 font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out">
                                              <div className="ml-1">
                                                Ảnh cá nhân
                                              </div>
                                            </label>
                                            <div
                                              role="presentation"
                                              className="relative w-24 h-24 cursor-pointer"
                                            >
                                              <input
                                                aria-label="avatarImage"
                                                accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                                                multiple
                                                type="file"
                                                tabIndex={-1}
                                                className="hidden text-inherit m-0"
                                                onChange={handleImageChange}
                                                ref={fileInputRef} // Reference to the file input
                                              />
                                              <div
                                                className="z-20 upload-icon rounded-full bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[rgb(19,21,23)] bg-[rgb(19,21,23)] dark:bg-[#fff] w-[35%] h-[35%] border-2 border-solid border-[#fff] dark:border-[rgb(19,21,23)] absolute right-0 bottom-0 origin-center transition-all duration-300 ease-in-out"
                                                onClick={handleArrowUpClick} // Trigger file input when the arrow icon is clicked
                                              >
                                                <ArrowUp className="stroke-2 w-2/3 block align-middle" />
                                              </div>
                                              <Avatar
                                                className="w-24 h-24 bg-center bg-cover flex justify-center items-center bg-[#ebeced]"
                                                radius="full"
                                                src={userProfile?.avatar ? userProfile?.avatar : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=100,height=100/avatars-default/avatar_8.png"}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="user-header-text">
                                        {placements.map((placement) => (
                                          <Input
                                            key={placement}
                                            type="text"
                                            label="Tên"
                                            labelPlacement={"outside"}
                                            autoCorrect="off"
                                            spellCheck="false"
                                            autoCapitalize="words"
                                            className="bg-transparent font-semibold mt-4 mb-2 pl-3 text-lg h-auto p-[0.375rem_0.75rem] transition-all duration-300 ease-in-out text-[#002f45] dark:text-white leading-4 rounded-lg w-full"
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
                                            maxLength={140}
                                            autoCapitalize="on"
                                            className="bg-transparent font-semibold mt-2 mb-2 pl-3 text-lg h-auto p-[0.375rem_0.75rem] transition-all duration-300 ease-in-out text-[#002f45] dark:text-white leading-6 rounded-lg w-full"
                                            onChange={(e) =>
                                              setUserProfile({
                                                ...userProfile,
                                                bio: e.target.value,
                                              })
                                            }
                                          />
                                        ))}
                                      </div>
                                      <div className="social-label dark:text-[#aec1ca]">
                                        Liên kết mạng xã hội
                                      </div>
                                      <div className="gap-2 flex flex-col">
                                        <div className="w-96 max-w-full gap-4 flex items-baseline">
                                          <Instagram className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                          <div className="max-w-[auto] flex-1">
                                            <div className="inner-wrapper inline-block w-full">
                                              <div className="input-wrapper flex items-baseline">
                                                <div className="flex-1 flex items-center">
                                                  <div>&nbsp;</div>
                                                  <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">
                                                    instagram.com/
                                                  </div>
                                                  <div className="input-innter-wrapper relative flex-1">
                                                    <Input
                                                      value={
                                                        userProfile?.instagram
                                                      }
                                                      type="text"
                                                      autoCorrect="off"
                                                      spellCheck="false"
                                                      className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
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
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="gap-2 flex flex-col">
                                        <div className="w-96 max-w-full gap-4 flex items-baseline">
                                          <Twitter className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                          <div className="max-w-[auto] flex-1">
                                            <div className="inner-wrapper inline-block w-full">
                                              <div className="input-wrapper flex items-baseline">
                                                <div className="flex-1 flex items-center">
                                                  <div>&nbsp;</div>
                                                  <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">
                                                    twitter.com/
                                                  </div>
                                                  <div className="input-innter-wrapper relative flex-1">
                                                    <Input
                                                      value={
                                                        userProfile?.twitter
                                                      }
                                                      type="text"
                                                      autoCorrect="off"
                                                      spellCheck="false"
                                                      className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
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
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="gap-2 flex flex-col">
                                        <div className="w-96 max-w-full gap-4 flex items-baseline">
                                          <Youtube className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                          <div className="max-w-[auto] flex-1">
                                            <div className="inner-wrapper inline-block w-full">
                                              <div className="input-wrapper flex items-baseline">
                                                <div className="flex-1 flex items-center">
                                                  <div>&nbsp;</div>
                                                  <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">
                                                    youtube.com/@
                                                  </div>
                                                  <div className="input-innter-wrapper relative flex-1">
                                                    <Input
                                                      value={
                                                        userProfile?.youtube
                                                      }
                                                      type="text"
                                                      autoCorrect="off"
                                                      spellCheck="false"
                                                      className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
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
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="gap-2 flex flex-col">
                                        <div className="w-96 max-w-full gap-4 flex items-baseline">
                                          <FaTiktok className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                          <div className="max-w-[auto] flex-1">
                                            <div className="inner-wrapper inline-block w-full">
                                              <div className="input-wrapper flex items-baseline">
                                                <div className="flex-1 flex items-center">
                                                  <div>&nbsp;</div>
                                                  <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">
                                                    tiktok.com/@
                                                  </div>
                                                  <div className="input-innter-wrapper relative flex-1">
                                                    <Input
                                                      value={
                                                        userProfile?.tiktok
                                                      }
                                                      type="text"
                                                      autoCorrect="off"
                                                      spellCheck="false"
                                                      className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
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
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="gap-2 flex flex-col">
                                        <div className="w-96 max-w-full gap-4 flex items-baseline">
                                          <Linkedin className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                          <div className="max-w-[auto] flex-1">
                                            <div className="inner-wrapper inline-block w-full">
                                              <div className="input-wrapper flex items-baseline">
                                                <div className="flex-1 flex items-center">
                                                  <div>&nbsp;</div>
                                                  <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">
                                                    linkedin.com
                                                  </div>
                                                  <div className="input-innter-wrapper relative flex-1">
                                                    <Input
                                                      value={
                                                        userProfile?.linkedIn
                                                      }
                                                      type="text"
                                                      autoCorrect="off"
                                                      spellCheck="false"
                                                      className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
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
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="w-86 gap-4 flex items-baseline mt-2">
                                        <Globe className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                        <div className="flex-1">
                                          <div className="input-wrapper flex items-baseline">
                                            <div className="flex-1 flex items-center">
                                              <div>&nbsp;</div>
                                              <div className="flex-1">
                                                <Input
                                                  value={userProfile?.website}
                                                  type="url"
                                                  autoCapitalize="off"
                                                  autoCorrect="off"
                                                  spellCheck="false"
                                                  className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 bg-transparent dark:text-white"
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
                                            </div>
                                          </div>
                                        </div>
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
                                <ModalFooter className="border-t border-solid border-t-[#eff3f5]">
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
                          type="button"
                          className="bg-[#a2b7bf] text-white dark:bg-[#122935] dark:text-[white] p-[0.25rem_0.75rem] font-medium border-none cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center m-0"
                          radius="full"
                        >
                          <Pen className="mr-1 w-3 h-3 block align-middle" />
                          <span className="text-base">Chỉnh sửa tiểu sử</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="profile-content"
                className="pt-4 w-full max-w-2xl flex flex-col pb-0 m-auto flex-1"
              >
                <div id="profile-block-wrapper" className="relative">
                  <div className="h-auto block">
                    <div className="profile-block-content">
                      <div className="view-block block">
                        <div>
                          <div className="profile-events-wrapper mx-3 md:mx-0">
                            <div className="mb-4 overflow-hidden flex justify-between align-baseline">
                              <h2 className="font-semibold text-xl mb-0 overflow-hidden text-ellipsis mt-0">
                                Sự kiện
                              </h2>
                              <div className="whitespace-nowrap pl-2">
                                <Link
                                  href={"/create"}
                                  className="block-action pl-0 pr-0 text-[#0099dd] dark:text-[#0099dd] inline-flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
                                  underline="none"
                                >
                                  <Plus className="mr-1 h-4 w-4 block align-middle mt-0.5" />
                                  <span>Tạo mới</span>
                                </Link>
                              </div>
                            </div>
                            <div className="block">
                              {futureEvents ? (
                                futureEvents && futureEvents.length > 0 ? (
                                  futureEvents.map((event, index) => (
                                    <div
                                      key={index}
                                      className="profile-events-content-wrapper"
                                    >
                                      <div className="profile-event-wrapper pb-0">
                                        <Link
                                          href="/events/detail"
                                          className="profile-event relative flex items-center m-[-0.75rem_-1.5rem] p-[0.75rem_1.5rem] rounded-lg transition-all duration-300 ease-in-out text-[#0099dd] cursor-pointer hover:bg-[#f0f7fb] hover:opacity-[1]"
                                          underline="none"
                                        >
                                          <div className="event-time-left w-14 text-center mr-6 border border-solid border-[#f0f8fd] rounded-lg bg-white overflow-hidden transition-all duration-300 ease-in-out">
                                            <div className="event-month uppercase text-xs font-semibold text-[#82aad8] bg-[#f0f8fd] p-[0.125rem_0px] transition-all duration-300 ease-in-out">
                                              {
                                                ConvertDate(event.startDate)
                                                  .month
                                              }
                                            </div>
                                            <div className="event-date text-2xl font-light m-[0.375rem_0px] text-[#002f45]">
                                              {ConvertDate(event.startDate).day}
                                            </div>
                                          </div>
                                          <div className="event-cover-wrapper w-40 mr-6 relative">
                                            <div
                                              className="pb-[50%] bg-cover bg-center rounded-md"
                                              style={{
                                                backgroundImage: `url(${imageUrl})`,
                                              }}
                                            ></div>
                                            <div className="bg-cover bg-center rounded-md absolute left-0 top-0 w-full transition-all duration-300 ease-in-out"></div>
                                          </div>
                                          <div className="event-info flex-1 min-w-0">
                                            <div>
                                              <span className="event-name text-lg mr-2 font-medium text-[#002f45]">
                                                {event.name}
                                              </span>
                                            </div>
                                            <div className="text-sm flex-wrap mt-1 flex items-center">
                                              <div
                                                className={`event-time ${event.isLive
                                                  ? "starting-soon text-[#ec660d]"
                                                  : "not-starting text-[#82aad8]"
                                                  }`}
                                              >
                                                {event.isLive
                                                  ? "Đang diễn ra"
                                                  : "Chưa bắt đầu"}
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="profile-event-empty w-full text-center p-[2rem_1rem_2rem_1rem] text-[#a2b7bf] dark:text-[#939597] border border-solid border-[#eff3f5] dark:border-[#151719] rounded-lg flex flex-col items-center">
                                    <CalendarX2 className="w-8 h-8 mb-4 block align-middle" />
                                    <div className="font-semibold mb-1">
                                      Không có sự kiện nào sắp diễn ra
                                    </div>
                                    <div className="text-sm">
                                      Đăng ký ngay để nhận những sự kiện sắp
                                      diễn ra.
                                    </div>
                                  </div>
                                )
                              ) : (
                                <div className="profile-event-empty w-full text-center p-[2rem_1rem_2rem_1rem] text-[#a2b7bf] dark:text-[#939597] border border-solid border-[#eff3f5] dark:border-[#151719] rounded-lg flex flex-col items-center">
                                  <CalendarX2 className="w-8 h-8 mb-4 block align-middle" />
                                  <div className="font-semibold mb-1">
                                    Không có sự kiện nào sắp diễn ra
                                  </div>
                                  <div className="text-sm">
                                    Đăng ký ngay để nhận những sự kiện sắp diễn
                                    ra.
                                  </div>
                                </div>
                              )}
                            </div>
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
    </div>
  );
}
