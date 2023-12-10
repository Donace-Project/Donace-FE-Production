'use client';
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { GetCalendarById } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowUp, ArrowUpRight, CheckCircle, Settings2, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function CalendarDisplay(props: any) {
    var { id } = props

    const [getCalendars, setCalendars] = useState<GetCalendarById | null>(null);
    //var [calendars, setCalendar] = useState<Calendar | null>(null);

    useEffect(() => {
        fetchWrapper.post(`api/Calendar/get-by-id?Id=${id}`, null)
            .then(data => setCalendars(data));

        // fetchWrapper.post('/api/Calendar/get-list', { pageNumber: 1, pageSize: 9999 })
        //     .then(data => setCalendar(data))
    }, []);
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
                                    href={`/calendars/manage/${getCalendars.id}/audience`}
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Người tham gia
                                </Link>
                                <Link
                                    className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
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
                <div className="content grid grid-cols-[160px_1fr] gap-8">
                    <div className="sidebar">
                        <div className="tabs flex-col gap-3 sticky top-[6.5rem] flex">
                            <Link
                                href={`/calendars/manage/${id}/settings`}
                                className="transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                <div className="tab gap-3 text-black-light-theme rounded-lg font-medium transition-all duration-300 ease-in-out flex items-center">
                                    <div className="icon">
                                        <Wand2 className="block w-4 h-4 align-middle" />
                                    </div>
                                    <div className="whitespace-nowrap">Hiển thị</div>
                                </div>
                            </Link>
                            <Link
                                href={`/calendars/manage/${id}/settings/options`}
                                className="transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                <div className="tab gap-3 text-black-blur-light-theme hover:text-black rounded-lg font-medium transition-all duration-300 ease-in-out flex items-center">
                                    <div className="icon">
                                        <Settings2 className="block w-4 h-4 align-middle" />
                                    </div>
                                    <div className="whitespace-nowrap">Tùy chọn</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <div>
                            <form action={"#"} className="gap-4 flex flex-col">
                                <div className="content-card p-0 relative rounded-xl bg-[#f9f9f9] border border-solid border-[#fff] overflow-hidden">
                                    <div className="top-card">
                                        <div
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
                                                />
                                                <Button
                                                    onClick={() => {
                                                        const fileInput = document.getElementById("coverImage");
                                                        if (fileInput) {
                                                            fileInput.click();
                                                        }
                                                    }}
                                                    type="button"
                                                    className="hover:text-[#fff] hover:bg-gray-800 text-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[0.875rem] p-[0.4375rem_0.625rem] h-[calc(1.75rem+2*1px)] w-fit flex items-center m-0 leading-[1.5]"
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
                                        <div className="pb-8">
                                            <div className="absolute -translate-y-2/4 border-[0.25rem] border-solid border-[#fff] rounded-xl ml-3.5">
                                                <div>
                                                    <div
                                                        role="presentation"
                                                        className="w-16 h-16 relative cursor-pointer"
                                                    >
                                                        <input
                                                            aria-label="avatarImage"
                                                            type="file"
                                                            id="avatarImage"
                                                            className="hidden"
                                                        />
                                                        <div
                                                            onClick={() => {
                                                                const fileInput = document.getElementById("avatarImage");
                                                                if (fileInput) {
                                                                    fileInput.click();
                                                                }
                                                            }}
                                                            id="upload-icon"
                                                            className="rounded-[0.5rem] bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[#212325] bg-[rgb(19,21,23)] dark:bg-[#fff] hover:bg-[#de3163] w-[35%] h-[35%] min-w-[24px] min-h-[24px] border-2 border-solid border-[#fff] dark:border-[#212325] absolute right-[-1px] bottom-[-1px] origin-center transition-all duration-300 ease-in-out"
                                                        >
                                                            <ArrowUp className="stroke-[2.5] w-[65%] h-[65%] block align-middle" />
                                                        </div>
                                                        <div
                                                            id="avatar square"
                                                            className="bg-[url('https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=64,height=64/avatars-default/community_avatar_13.png')] w-16 h-16 rounded-[0.5rem] bg-center bg-cover flex justify-center items-center bg-[#ebeced] dark:bg-[#333537]"
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {getCalendars ? (
                                            <div
                                                id="input-container"
                                                className="p-[0.5rem_1rem] pb-0 flex flex-col"
                                            >
                                                <div
                                                    id="name-input"
                                                    className="text-[1.5rem] font-medium p-2 h-12"
                                                >
                                                    <textarea
                                                        spellCheck="false"
                                                        autoCapitalize="words"
                                                        placeholder={getCalendars.name}
                                                        className="lux-naked-input bordered mounted h-[47.8px!important] p-2 border-b border-solid outline-none border-b-[#ebeced] transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1.5rem] font-medium w-full resize-none m-0 focus:border-b-2 focus:border-gray-400 hover:border-b-2 hover:border-gray-400"
                                                    ></textarea>
                                                </div>
                                                <div id="desc-input" className="p-2">
                                                    <textarea
                                                        spellCheck="false"
                                                        autoCapitalize="sentences"
                                                        placeholder="Một vài dòng mô tả ngắn về lịch của bạn."
                                                        maxLength={200}
                                                        className="lux-naked-input mounted h-[37px!important] p-2 outline-none transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1rem] font-normal w-full resize-none m-0"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                id="input-container"
                                                className="p-[0.5rem_1rem] pb-0 flex flex-col"
                                            >
                                                <div
                                                    id="name-input"
                                                    className="text-[1.5rem] font-medium p-2 h-12"
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
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] hover:bg-gray-700'} border-[#333537] dark:border-[#fff] focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#333537] border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[1rem] p-[0.625rem_0.875rem] w-fit flex items-center m-0 leading-[1.5]"
                                >
                                    <CheckCircle className="mr-2 stroke-[2.5] w-4 h-4 flex-shrink-0 block align-middle" />
                                    <div id="label" className="...">Cập nhật</div>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}