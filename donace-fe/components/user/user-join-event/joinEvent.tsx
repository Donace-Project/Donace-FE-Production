'use client';
import { useEffect, useState } from "react";
import { EventDetailModels, GetCalendarById, ItemEventsProfile, UserProfile } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

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


const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

const CovertDate = (date: string) => {
    return date.split("T");
}

const DayOfWeek = (date: string) => {
    let currentDate = new Date(date).getDay();
    return daysOfWeek[currentDate]
}

export default function JoinEvent(props: any) {
    var { id } = props
    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    var [getProfile, setProfile] = useState<null | UserProfile>(null);
    const [thoiGian, setThoiGian] = useState(new Date());


    const gio = thoiGian.getHours();
    const buoi = gio >= 12 ? "PM" : "AM";

    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));

        fetchWrapper.get('/api/User/profile')
            .then((data: UserProfile) => {
                console.log(data); // Xem dữ liệu được trả về từ API
                setProfile(data);
            })
            .catch(error => console.error('Lỗi khi gọi API:', error));
    }, []);
    return (
        <div className="page-content">
            <div className="page-container min-h-[100dvh] relative bg-transparent">
                <div className="content-wrapper flex items-start gap-8 p-4 max-width-global margin-global">
                    <div className="left flex flex-col gap-6 min-w-0 w-80">
                        <div className="cover-with-glow relative justify-center flex items-center">
                            <div className="img-aspect-ratio opacity-5 rounded-lg absolute top-4 blur-xl w-full bg-[rgba(19,21,23,0.04)] overflow-hidden">
                                <Image className="absolute top-0 left-0 w-full h-full object-cover align-middle" src="https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/retro1.png" />
                            </div>
                            <div className="img-view rounded-2xl w-full bg-rgba(19,21,23,0.04) overflow-hidden relative">
                                <Image className="top-0 left-0 w-full h-full object-cover align-middle" src="https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/retro1.png" />
                            </div>
                        </div>
                        <div className="desktop-only flex flex-col gap-6 min-w-0">
                            <div className="content-card">
                                <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.36)] dark:border-[rgba(255,255,255,0.2)]">
                                    <div className="title-label font-medium text-black-more-blur-light-theme text-sm dark:text-[hsla(0,0%,100%,.79)]">Điều phối bởi</div>
                                </div>
                                <div className="content">
                                    <div className="hosts gap-3 flex flex-col">
                                        <div className="gap-2 flex items-center">
                                            <Link
                                                className="overflow-hidden text-inherit gap-2 flex-1 flex items-center transition-all duration-300 ease-in-out cursor-pointer"
                                                underline="none"
                                            >
                                                <div className="avatar-wrapper">
                                                    <Avatar
                                                        className="w-6 h-6 relative"
                                                        radius="full"
                                                        src={getProfile?.result.avatar ? "https://avatars.githubusercontent.com/u/143386751?s=200&v=4" : "https://avatars.githubusercontent.com/u/143386751?s=200&v=4"}
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">{getProfile?.result.userName}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gap-3.5 flex flex-col">
                                <Button
                                    className="text-[#fff] dark:text-[rgb(19,21,23)] border-[#939597] dark:border-[#fff] bg-[#333537] dark:bg-[#fff] p-0 h-auto border-none rounded-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                    type="button"
                                >
                                    <div className="label">Liên hệ với Quản trị</div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="right flex flex-col gap-6 min-w-0 flex-1">
                        {eventDetail ? (
                            <div className="top-wrapper gap-2 flex flex-col">
                                <div className="top-card-content">
                                    <div className="title-wrapper mb-4 gap-2 flex justify-between items-start">
                                        <div className="min-w-0">
                                            <h1 className="title text-5xl break-words text-black-light-theme dark:text-[#fff] mb-0 font-semibold mt-0">
                                                {eventDetail.name}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="meta mt-5 gap-3 flex flex-col">
                                        <div className="row-container rounded-lg -m-2 p-2">
                                            <div className="icon-row gap-4 flex items-center">
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                    <div className="calendar-card w-full text-center min-h-full">
                                                        <div className="month bg-[rgba(19,21,23,0.08)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px">{ConvertDateTime(eventDetail.startDate).month}</div>
                                                        <div className="day -translate-y-px font-medium">{ConvertDateTime(eventDetail.startDate).day}</div>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title text-black-light-theme dark:text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{DayOfWeek(CovertDate(eventDetail.startDate)[0])}, {ConvertDateTime(eventDetail.startDate).day} tháng {ConvertDateTime(eventDetail.startDate).month}</div>
                                                    <div className="desc text-black-more-blur-light-theme dark:text-[#fff] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">{ConvertDateTime(eventDetail.startDate).hour}:{ConvertDateTime(eventDetail.startDate).minute} {buoi} đến {ConvertDateTime(eventDetail.endDate).hour}:{ConvertDateTime(eventDetail.endDate).minute} {buoi}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href="https://maps.app.goo.gl/PcmdqBSLh3SwXnZN7"
                                            target="_blank"
                                            rel="nofollow noopener"
                                            className="transition-all duration-300 ease-in-out cursor-pointer"
                                            underline="none"
                                        >
                                            <div className="icon-row gap-4 flex items-center">
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                    <MapPin className="w-5 h-5 block align-middle" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title text-black-light-theme dark:text-[#fff] font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                                                        <div className="gap-1 flex items-center max-w-sm">
                                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">{eventDetail.addressName}</div>
                                                            <div className="icon opacity-50 translate-y-[0.5px] text-black-more-blur-light-theme transition-all duration-300 ease-in-out">
                                                                <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">{eventDetail.lat}, {eventDetail.long}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>không có gì cả, tui lười viết thêm</div>
                        )}
                        <div className="p-[0.75rem_1rem] bg-[#f5f6f7] dark:bg-[rgba(255,255,255,0.1)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-none shadow-md">
                            <div className="inner">
                                <div>
                                    <div className="content gap-3 flex flex-col">
                                        <div>Click vào nút bên dưới để tham gia Event ngay hôm nay.</div>
                                        <div className="content gap-3 mt-2 flex flex-col">
                                            <div className="user-row gap-2 flex items-center">
                                                <div className="avatar-wrapper small">
                                                    <Avatar
                                                        src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                                        className="w-5 h-5 relative"
                                                        radius="full"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex flex-wrap items-baseline">
                                                    <b className="overflow-hidden text-ellipsis whitespace-nowrap mr-1 font-semibold">Donace</b>
                                                    <span className="email text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] overflow-hidden text-ellipsis whitespace-nowrap">dattranphu1114@gmail.com</span>
                                                </div>
                                            </div>
                                            <div className="cta-wrapper">
                                                <div className="cta gap-2 mb-1 flex items-center">
                                                    <Button
                                                        className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                                    >
                                                        <div className="label">Tham gia sự kiện</div>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-card">
                            <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)] gap-2 flex justify-between items-center">
                                <div className="title-label font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm">Khu vực</div>
                            </div>
                            <div className="content">
                                <div>
                                    <div className="cursor-copy">
                                        <div className="font-medium">Thành phố Hồ Chí Minh</div>
                                        <div className="text-tined text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm mt-1">Việt Nam</div>
                                    </div>
                                </div>
                                <div className="gmaps mt-4">
                                    <Link
                                        href="https://maps.app.goo.gl/22D1FfAT2NYKF4cv8"
                                        className="block overflow-hidden rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
                                        underline="none"
                                        target="_blank"
                                        rel="nofollow noopener"
                                    >
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4441623916387!2d106.62348197465653!3d10.853782889299758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1699268739213!5m2!1svi!2s" className="w-full border-none h-48 flex pointer-events-none" loading="lazy"></iframe>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}