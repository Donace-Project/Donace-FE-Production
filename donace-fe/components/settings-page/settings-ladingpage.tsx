"use client";
import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowUp, UserCheck2, Lock } from "lucide-react";
import { UserProfile } from "@/types/DonaceType";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export default function SettingLandingPage() {

  const handleClick = () => {
    location.reload(); // Làm mới trang khi nút được nhấn
  };

  const [value, setValue] = React.useState("");

  const validateEmail = (value: any) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  let [userProfile, setUsersProfile] = useState<null | UserProfile>(null);

  useEffect(() => {
    // Gọi API profile và gán dữ liệu cho biến profile
    fetchWrapper
      .get("/api/User/profile")
      .then((data: UserProfile) => {
        console.log(data); // Xem dữ liệu được trả về từ API
        setUsersProfile(data);
      })
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    avatar: "",
    bio: "",
    instagram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
    linkedIn: "",
    website: "",
    // Thêm các trường dữ liệu khác của form nếu có
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Xây dựng đối tượng dữ liệu từ formData
    const dataToSend = {
      userName: formData.userName,
      avatar: formData.avatar,
      bio: formData.bio,
      instagram: formData.instagram,
      twitter: formData.twitter,
      youtube: formData.youtube,
      tiktok: formData.tiktok,
      linkedIn: formData.linkedIn,
      website: formData.website,
    };

    if (!dataToSend.userName) {
      // Hiển thị thông báo lỗi
      console.error("User Name field is required.");
    } else {
      // Gửi yêu cầu POST lên API.
      fetchWrapper
        .put("/api/User/update-profile", dataToSend)
        .then((response) => {
          if (response.success) {
            // Cập nhật giao diện người dùng hoặc hiển thị thông báo thành công
            console.log("User updated successfully.");
          } else {
            // Xử lý lỗi từ API và hiển thị thông báo lỗi
            console.error("Error updated User:", response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className="page-content">
      <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
        <div className="spread gap-2 mb-2 flex justify-between items-center md:px-2 sm:px-2">
          <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">
            Cài đặt
          </h1>
        </div>
      </div>
      <div className="tab-wrapper m-auto pt-2 md:px-2 sm:px-2">
        <div className="zm-container pt-1 max-width-global margin-global">
          <div className="page-header-tabs-wrapper flex justify-between items-baseline">
            <div className="flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
              <div className="side-padding">&nbsp;</div>
              <Link
                href="/settings"
                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                underline="none"
              >
                Tài khoản
              </Link>
              <Link
                href="/settings/payment"
                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                underline="none"
              >
                Thanh toán
              </Link>
              <div className="side-padding pl-0.5"></div>
            </div>
          </div>
        </div>
        <div className="border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] mb-7"></div>
      </div>
      <div className="main-container pl-4 pr-4 max-width-global margin-global">
        <div className="can-divider with-divider medium md:px-2 sm:px-2">
          <div className="section-title-wrapper medium">
            <div className="spread mb-5 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black-light-theme dark:text-[#fff] mb-0 mt-0">
                Tài khoản của bạn
              </h2>
              <div className="right-element m-[-0.25rem_0]"></div>
            </div>
            <div className="-mt-3.5 mb-5 text-[#737577] dark:text-[#d2d4d7] text-base">
              Hãy xem cách bạn hiển thị với tư cách là Quản trị hay là Người
              tham dự.
            </div>
          </div>
          <div className="wrapper flex items-start flex-row-reverse gap-16">
            <div className="avatar-section flex-1">
              <label className="text-sm block mb-1.5 font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out">
                <div className="ml-1">Ảnh cá nhân</div>
              </label>
              <div
                role="presentation"
                className="relative w-24 h-24 cursor-pointer"
              >
                <input
                  aria-label="input"
                  accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                  multiple
                  type="file"
                  tabIndex={-1}
                  className="hidden text-inherit m-0"
                />
                <div className="z-20 upload-icon rounded-full bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[rgb(19,21,23)] bg-[rgb(19,21,23)] dark:bg-[#fff] w-[35%] h-[35%] border-2 border-solid border-[#fff] dark:border-[rgb(19,21,23)] absolute right-0 bottom-0 origin-center transition-all duration-300 ease-in-out">
                  <ArrowUp className="stroke-2 w-2/3 block align-middle" />
                </div>
                <Avatar
                  className="w-24 h-24 bg-center bg-cover flex justify-center items-center bg-[#ebeced]"
                  radius="full"
                  src="https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=100,height=100/avatars-default/avatar_8.png"
                />
              </div>
            </div>
            <div className="form w-80 max-w-[320px]">
              {userProfile && userProfile.result ? (
                <form action={"#"} onSubmit={handleSubmit}>
                  <div>
                    <div className="lux-input-wrapper max-width-global mb-4">
                      <div className="inner-wrapper inline-block w-full">
                        <Input
                          type="text"
                          label="Tên"
                          labelPlacement={"outside"}
                          // placeholder="Tên của bạn là gì?"
                          placeholder={
                            userProfile?.result.userName
                              ? userProfile.result.userName
                              : "Tên của bạn là gì?"
                          }
                          autoCorrect="off"
                          spellCheck="false"
                          autoCapitalize="words"
                          isInvalid={true}
                          variant="faded"
                          classNames={{
                            inputWrapper: [
                              "bg-[#fff]",
                              "text-base",
                              "h-auto",
                              "w-full",
                              "p-[0.625rem_0.875rem]",
                              "dark:text-[#fff]",
                              "dark:bg-[rgb(19,21,23)]",
                            ],
                          }}
                          value={formData.userName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userName: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="lux-input-wrapper max-width-global mb-4">
                      <div className="inner-wrapper inline-block w-full">
                        <Textarea
                          type="text"
                          label="Tiểu sử"
                          labelPlacement={"outside"}
                          placeholder={
                            userProfile?.result.bio
                              ? userProfile.result.bio
                              : "Hãy cùng chia sẻ một chút về thông tin hoặc sở thích của bạn."
                          }
                          autoCorrect="off"
                          spellCheck="false"
                          autoCapitalize="words"
                          variant="faded"
                          minRows={2}
                          classNames={{
                            inputWrapper: [
                              "bg-[#fff]",
                              "text-base",
                              "h-auto",
                              "w-full",
                              "dark:text-[#fff]",
                              "dark:bg-[rgb(19,21,23)]",
                            ],
                          }}
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button
                        type="submit"
                        className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                        onClick={handleClick}
                      >
                        <UserCheck2 className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                        <div className="label">Lưu thay đổi</div>
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        {userProfile && userProfile.result ? (
          <div className="can-divider with-divider medium md:px-2 sm:px-2 mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.16)]">
            <div className="section-title-wrapper medium">
              <div className="spread mb-5 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black-light-theme dark:text-[#fff] mb-0 mt-0">
                  Email và Số điện thoại
                </h2>
                <div className="right-element m-[-0.25rem_0]"></div>
              </div>
              <div className="-mt-3.5 mb-5 text-[#737577] dark:text-[#d2d4d7] text-base">
                Quản lý email và số điện thoại bạn sử dụng để đăng nhập vào
                Donace và nhận những thông báo mới.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <form action={"#"} onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <Input
                    className="w-full"
                    value={value}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    errorMessage={
                      isInvalid && "Please enter a valid email"
                    }
                    onValueChange={setValue}
                    type="email"
                    label="Email"
                    labelPlacement={"outside"}
                    placeholder={
                      userProfile?.result.email
                        ? userProfile.result.email
                        : "Điền email của bạn."
                    }
                    autoCorrect="off"
                    spellCheck="false"
                    autoCapitalize="words"
                    variant="faded"
                    classNames={{
                      inputWrapper: [
                        "bg-[#fff]",
                        "text-base",
                        "h-auto",
                        "w-full",
                        "p-[0.625rem_0.875rem]",
                        "dark:text-[#fff]",
                        "dark:bg-[rgb(19,21,23)]",
                      ],
                    }}
                  />
                  <Button
                    type="submit"
                    className="text-background bg-foreground-900 border-[#333537] dark:border-[rgba(255,255,255,0.16)] border border-solid cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg whitespace-nowrap justify-center outline-offset-[.125rem] outline-none text-base flex items-center m-0 translate-y-3"
                  >
                    <div className="label">Cập nhật</div>
                  </Button>
                </div>
              </form>
              <form action={"#"} onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <Input
                    type="tel"
                    label="Số điện thoại"
                    labelPlacement={"outside"}
                    placeholder="+84 123 456 789"
                    variant="faded"
                    classNames={{
                      inputWrapper: [
                        "bg-[#fff]",
                        "text-base",
                        "h-auto",
                        "w-full",
                        "p-[0.625rem_0.875rem]",
                        "dark:text-[#fff]",
                        "dark:bg-[rgb(19,21,23)]",
                      ],
                    }}
                  />
                  <Button
                    type="submit"
                    className="text-background bg-foreground-900 border-[#333537] dark:border-[rgba(255,255,255,0.16)] border border-solid cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg whitespace-nowrap justify-center outline-offset-[.125rem] outline-none text-base flex items-center m-0 translate-y-3"
                  >
                    <div className="label">Cập nhật</div>
                  </Button>
                </div>
              </form>
            </div>
            <div className="text-secondary-alpha text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] pt-4">
              Vì bảo mật, chúng tôi sẽ gửi mã xác minh thông qua email của bạn.
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="can-divider with-divider medium md:px-2 sm:px-2 mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.16)]">
          <div className="section-title-wrapper medium">
            <div className="spread mb-5 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black-light-theme dark:text-[#fff] mb-0 mt-0">
                Mật khẩu & Bảo mật
              </h2>
              <div className="right-element m-[-0.25rem_0]"></div>
            </div>
            <div className="-mt-3.5 mb-5 text-[#737577] dark:text-[#d2d4d7] text-base">
              Bảo mật tài khoản của bạn bằng cách xác minh password.
            </div>
          </div>
          <div className="content-card p-[0.875rem_1rem] relative rounded-xl bg-[#F2f3f4] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.04)] overflow-hidden">
            <div className="spread gap-2 flex justify-between items-center">
              <div className="left gap-3 flex items-baseline">
                <div className="icon translate-y-0.5">
                  <Lock className="block w-4 h-4 align-middle" />
                </div>
                <div className="content">
                  <div className="font-medium">Mật khẩu tài khoản</div>
                  <div className="desc mt-px text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">
                    Vui lòng hoàn thành các bước trong email để hoàn tất thiết
                    lập mật khẩu của bạn.
                  </div>
                </div>
              </div>
              <div className="right">
                <Button
                  type="submit"
                  className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[rgba(255,255,255,0.16)] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                >
                  <div className="label">Đặt mật khẩu</div>
                </Button>
              </div>
            </div>
            {/* <hr className="margin-hr" />
                        <div className="spread gap-2 flex justify-between items-center">
                            <div className="left gap-3 flex items-baseline">
                                <div className="icon translate-y-0.5">
                                    <ShieldCheck className="block w-4 h-4 align-middle" />
                                </div>
                                <div className="content">
                                    <div className="font-medium">Two-Factor Authentication</div>
                                    <div className="desc mt-px text-sm text-black-more-blur-light-theme">Please set a password before enabling two-factor authentication.</div>
                                </div>
                            </div>
                            <div className="right">
                                <Button type="button" className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="label">Enable 2FA</div>
                                </Button>
                            </div>
                        </div> */}
          </div>
        </div>
        {/* <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="spread mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Third Party Accounts</h2>
                            <div className="right-element m-[-0.25rem_0]"></div>
                        </div>
                        <div className="-mt-3.5 mb-5 text-[#737577] text-base">Link your accounts to sign into Donace and automate your workflows.</div>
                    </div>
                    <div className="connected-accounts grid gap-3 grid-cols-[repeat(auto-fill,_minmax(240px,1fr))]">
                        <div className="content-card p-[0.5rem_0.75rem] relative rounded-xl bg-[#F2F3F4] border border-solid border-[#fff] overflow-hidden">
                            <div className="conntected-account gap-2.5 flex items-center">
                                <div className="icon flex-shrink-0">
                                    <FaGoogle className="w-5 h-5 block align-middle"/>
                                </div>
                                <div className="content min-w-0 flex-1">
                                    <b className="font-semibold">Google</b>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme">dattranphu1114@gmail.com</div>
                                </div>
                                <Button type="button" color="default" className="min-w-[4rem] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="labe">Unlink</div>
                                </Button>
                            </div>
                        </div>
                        <div className="content-card p-[0.5rem_0.75rem] relative rounded-xl bg-[#F2F3F4] border border-solid border-[#fff] overflow-hidden">
                            <div className="conntected-account gap-2.5 flex items-center">
                                <div className="icon flex-shrink-0">
                                    <Github className="w-5 h-5 block align-middle"/>
                                </div>
                                <div className="content min-w-0 flex-1">
                                    <b className="font-semibold">Github</b>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme">Not Linked</div>
                                </div>
                                <Button type="button" color="primary" className="min-w-[4rem] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="labe">Link</div>
                                </Button>
                            </div>
                        </div>
                        <div className="content-card p-[0.5rem_0.75rem] relative rounded-xl bg-[#F2F3F4] border border-solid border-[#fff] overflow-hidden">
                            <div className="conntected-account gap-2.5 flex items-center">
                                <div className="icon flex-shrink-0">
                                    <Github className="w-5 h-5 block align-middle"/>
                                </div>
                                <div className="content min-w-0 flex-1">
                                    <b className="font-semibold">Solana</b>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme">Not Linked</div>
                                </div>
                                <Button type="button" color="success" className="text-[#fff] min-w-[4rem] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="labe">Link</div>
                                </Button>
                            </div>
                        </div>
                        <div className="content-card p-[0.5rem_0.75rem] relative rounded-xl bg-[#F2F3F4] border border-solid border-[#fff] overflow-hidden">
                            <div className="conntected-account gap-2.5 flex items-center">
                                <div className="icon flex-shrink-0">
                                    <Github className="w-5 h-5 block align-middle"/>
                                </div>
                                <div className="content min-w-0 flex-1">
                                    <b className="font-semibold">Github</b>
                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme">Not Linked</div>
                                </div>
                                <Button type="button" color="secondary" className="text-[#fff] min-w-[4rem] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="labe">Link</div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> */}
        {/* <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="spread mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Sync Calendar</h2>
                            <div className="right-element m-[-0.25rem_0]"></div>
                        </div>
                        <div className="-mt-3.5 mb-5 text-[#737577] text-base">You can sync all of your events with your Google, Outlook, or Apple calendar.</div>
                    </div>
                </div> */}
        {/* <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]"></div> */}
      </div>
    </div>
  );
}
