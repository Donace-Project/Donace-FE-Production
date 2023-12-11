"use client";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { UploadImage } from "@/types/DonaceType";
import { Button } from "@nextui-org/button";
import { ArrowUp, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function CreateCalendar(props: any) {
  var { id } = props;
  const router = useRouter();
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = async () => {
    await handleSubmit;
  };

  const [calendarReq, setCalendarReq] = useState({
    name: "",
    cover: "",
    avatar:
      "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png",
    color:
      "https://res.cloudinary.com/vietnamenglishcore/image/upload/v1700141954/fe2ce513-512b-42d0-b1c7-68a2d4758b9c.webp",
    publicURL: "",
    lat: "",
    long: "",
    addressName: "",
    // Thêm các trường dữ liệu khác của form nếu có
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    const url = await fetchWrapper.postFile("api/Common/upload-file", formData);
    // setBackgrounUrl(text);

    if (backgroundRef.current && url) {
      backgroundRef.current.style.backgroundImage = `url(${url})`;

      setCalendarReq({
        ...calendarReq,
        cover: url,
      });
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);

    try {
      const url = await fetchWrapper.postFile(
        "api/Common/upload-file",
        formData
      );

      if (iconRef.current && url) {
        iconRef.current.style.backgroundImage = `url(${url})`;

        setCalendarReq({
          ...calendarReq,
          avatar: url,
        });
      }
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    } finally {
      setIsUploading(false);
    }
  };

  var [images, setImages] = useState<UploadImage | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Xây dựng đối tượng dữ liệu từ formData
    const dataToSend = {
      name: calendarReq.name,
      cover: calendarReq.cover,
      avatar: calendarReq.avatar,
      color: calendarReq.color,
      publicURL: calendarReq.publicURL,
      lat: calendarReq.lat,
      long: calendarReq.long,
      addressName: calendarReq.addressName,
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
      const response = await fetchWrapper.post(
        "/api/Calendar/create-calendar",
        dataToSend
      );

      if (!response.success) {
        // Xử lý lỗi từ API và hiển thị thông báo lỗi
        console.error(`Lỗi khi tạo lịch: ${response.error}`);
        setIsCreating(false); // Bỏ hiển thị Spinner và bỏ vô hiệu hóa nút
        return;
      }

      router.push(`/calendars/manage/${response.result.id}`);
    } catch (error) {
      // Xử lý lỗi trong quá trình gửi yêu cầu và hiển thị thông báo lỗi
      console.error(`Lỗi: ${String(Error)}`);
      setIsCreating(false); // Bỏ hiển thị Spinner và bỏ vô hiệu hóa nút
    }
  };
  return (
    <div className="page-content">
      <Toaster />
      <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
        <div className="spread gap-2 mb-2 flex justify-between items-center">
          <h1 className="tab-title text-4xl font-semibold text-black-light-theme mb-0 mt-0 dark:text-[#fff]">
            Tạo Lịch
          </h1>
        </div>
      </div>
      <div
        id="zm-container"
        className="pt-[1.5rem!important] p-[1rem!important] max-w-[820px] m-[0_auto]"
      >
        <form
          action={"#"}
          onSubmit={handleSubmit}
          className="gap-6 flex flex-col"
        >
          <div
            id="content-card-1"
            className="p-0 relative rounded-[0.75rem] bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden"
          >
            <div id="top-card">
              <div
                ref={backgroundRef}
                role="button"
                className="bg-[url('https://res.cloudinary.com/vietnamenglishcore/image/upload/v1700141954/fe2ce513-512b-42d0-b1c7-68a2d4758b9c.webp')] aspect-[3.5] bg-[#ebeced] dark:bg-[#333537] block ml-auto mr-auto bg-center bg-cover overflow-hidden transition-all duration-300 ease-in-out relative cursor-pointer"
              >
                <div
                  id="animated image"
                  className="transition-all duration-300 ease-in-out"
                >
                  <div id="placeholder" className="pb-[calc(100%/(3/5))]"></div>
                </div>
                <div
                  id="change-cover-container"
                  className="absolute top-2 right-2 backdrop-blur-xl backdrop-contrast-[50%] backdrop-brightness-[130%] border border-solid border-[rgba(19,21,23,0.08)] rounded-[0.5rem] overflow-hidden"
                >
                  <input
                    aria-label="coverImage"
                    type="file"
                    id="coverImage"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    type="button"
                    className="hover:text-[#fff] hover:bg-gray-800 text-[rgba(19,21,23,0.64)] dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[0.875rem] p-[0.4375rem_0.625rem] h-[calc(1.75rem+2*1px)] w-fit flex items-center m-0 leading-[1.5]"
                    onClick={() => {
                      const fileInput = document.getElementById("coverImage");
                      if (fileInput) {
                        fileInput.click();
                      }
                    }}
                  >
                    <div
                      id="label"
                      className="leading-[1] m-[-4px_0] p-[4px_0] overflow-hidden text-ellipsis"
                    >
                      Thay đổi ảnh bìa
                    </div>
                  </Button>
                </div>
              </div>
              <div className="pb-[32px]">
                <div
                  id="avatar-container"
                  className="absolute transform translate-y-[-50%] border-[0.25rem] border-solid border-[#fff] dark:border-[#212325] rounded-[0.75rem] ml-[0.875rem]"
                >
                  <div>
                    <div
                      role="presentation"
                      id="avatar-wrapper"
                      className="w-[64px] h-[64px] relative cursor-pointer"
                    >
                      <input
                        aria-label="avatarImage"
                        type="file"
                        id="avatarImage"
                        className="hidden"
                        onChange={handleAvatarUpload}
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
                        className="rounded-[0.5rem] bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[#212325] bg-[rgb(19,21,23)] dark:bg-[#fff] hover:bg-[#de3163] w-[35%] h-[35%] min-w-[24px] min-h-[24px] border-2 border-solid border-[#fff] dark:border-[#212325] absolute right-[-1px] bottom-[-1px] origin-center transition-all duration-300 ease-in-out"
                      >
                        {isUploading ? (
                          <Spinner size="sm" color="default" />
                        ) : (
                          <ArrowUp className="stroke-[2.5] w-[65%] h-[65%] block align-middle" />
                        )}
                      </div>
                      <div
                        ref={iconRef}
                        onClick={() => {
                          const fileInput =
                            document.getElementById("avatarImage");
                          if (fileInput) {
                            fileInput.click();
                          }
                        }}
                        id="avatar square"
                        className="bg-[url('https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png')] w-16 h-16 rounded-[0.5rem] bg-center bg-cover flex justify-center items-center bg-[#ebeced] dark:bg-[#333537]"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="input-container"
                className="p-[0.5rem_1rem] pb-0 flex flex-col"
              >
                <div
                  id="name-input"
                  className="text-[1.5rem] font-medium p-2 h-12"
                >
                  <textarea
                    value={calendarReq.name}
                    onChange={(e) =>
                      setCalendarReq({ ...calendarReq, name: e.target.value })
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
                    id="lux-naked-input mounted"
                    spellCheck="false"
                    autoCapitalize="sentences"
                    placeholder="Một vài dòng mô tả ngắn về lịch của bạn."
                    maxLength={200}
                    className="h-[37px!important] p-2 outline-none transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1rem] font-normal w-full resize-none m-0"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className={`text-[#fff] dark:text-[rgb(19,21,23)] ${
              isCreating
                ? "bg-gray-500"
                : "bg-[#333537] dark:bg-[#fff] hover:bg-gray-700"
            } border-[#333537] dark:border-[#fff] focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#333537] border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[1rem] p-[0.625rem_0.875rem] w-fit flex items-center m-0 leading-[1.5]}`}
            onClick={handleClick}
            isDisabled={isCreating}
          >
            {isCreating ? (
              <>
                <Spinner size="sm" color="success" />
                <span className="label">Đang tạo lịch...</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 stroke-[2.5] w-4 h-4 flex-shrink-0 block align-middle" />
                <div id="label" className="...">
                  Tạo lịch
                </div>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
