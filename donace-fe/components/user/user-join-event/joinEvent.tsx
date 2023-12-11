'use client';
import { useEffect, useState } from "react";
import { EventDetailModels, EventDetailSorted, UserProfile } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { AlarmClock, ArrowUpRight, MapPin, QrCode, Radio, Receipt, ThumbsUp, Video } from "lucide-react";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { Textarea } from "@nextui-org/react";
import QRScanner from "@/components/QR/QRScanner";


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

export default function JoinEvent(props: { id: string }) {

    const modalContact = useDisclosure();
    const modalUnSub = useDisclosure();
    const modalResign = useDisclosure();
    const modalViewTicket = useDisclosure();

    var { id } = props;

    const [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    const [eventDetailSort, setEventDetailSort] = useState<EventDetailSorted | null>(null);
    const [sortedValue, setSortedValue] = useState<number | null>(null);
    const [calendarIdValue, setCalendarIdValue] = useState<string | null>(null);

    var [getProfile, setProfile] = useState<null | UserProfile>(null);
    const [thoiGian, setThoiGian] = useState(new Date());


    const gio = thoiGian.getHours();
    const buoi = gio >= 12 ? "PM" : "AM";

    const [addressName, setAddressName] = useState('');
    const [nameAddress, setNameAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => {
                setEventDetail(data);
                const addressParts = data.addressName.split(/, /);
                const addressName = addressParts[0]
                const nameAddress = addressParts[1];
                const district = addressParts[2];
                const city = addressParts[4];
                console.log('Tên địa chỉ:', addressName);
                console.log('Tên đường:', nameAddress);
                console.log('Quận huyện:', district);
                console.log('Thành phố:', city);
                setAddressName(addressName);
                setNameAddress(nameAddress);
                setDistrict(district);
                setCity(city);
            })
            .catch(error => {
                console.error('Lỗi khi lấy chi tiết sự kiện từ API:', error);
            });

        fetchWrapper.get('/api/User/profile')
            .then((data: UserProfile) => {
                console.log(data);
                setProfile(data);
            })
            .catch(error => console.error('Lỗi khi gọi API:', error));
    }, []);

    // * Click vào sẽ mở tab trong google map
    const handleMapLinkClick = () => {
        if (eventDetail && eventDetail.addressName) {
            const address = encodeURIComponent(eventDetail.addressName);
            const mapsURL = `https://www.google.com/maps/search/?api=1&query=${address}`;
            window.open(mapsURL, '_blank');
        }
    };


    //* Scan QR
    const qrcodeList = useState<any>([]);
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
                                <Image
                                    className="top-0 left-0 w-full h-full object-cover align-middle"
                                    src={eventDetail?.cover ? eventDetail.cover : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/retro1.png"}
                                />
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
                                                href="/profile"
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
                                        {/* //todo: fetch api hiển thị những ai đã có trạng thái chuyển sang going */}
                                        <div className="going">
                                            <div className="going flex justify-between items-center">64 đang đi</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gap-3.5 flex flex-col">
                                <Button
                                    onPress={modalContact.onOpen}
                                    className="text-[#fff] dark:text-[rgb(19,21,23)] border-[#939597] dark:border-[#fff] bg-[#333537] dark:bg-[#fff] p-0 h-auto border-none rounded-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0"
                                    type="button"
                                >
                                    <div className="label">Liên hệ với Người tổ chức</div>
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
                                                        <div className="day -translate-y-px font-medium">{ConvertDateTime(eventDetail.endDate).day}</div>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title text-black-light-theme dark:text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{DayOfWeek(CovertDate(eventDetail.startDate)[0])}, {ConvertDateTime(eventDetail.startDate).day} tháng {ConvertDateTime(eventDetail.startDate).month}</div>
                                                    <div className="desc text-black-more-blur-light-theme dark:text-[#fff] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">{ConvertDateTime(eventDetail.startDate).hour}:{ConvertDateTime(eventDetail.startDate).minute} {buoi} đến {ConvertDateTime(eventDetail.endDate).hour}:{ConvertDateTime(eventDetail.endDate).minute} {buoi}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            target="_blank"
                                            rel="nofollow noopener"
                                            className="transition-all duration-300 ease-in-out cursor-pointer"
                                            underline="none"
                                            onClick={handleMapLinkClick}
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
                                                    {/* <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">{district}, {city}</div> */}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="top-wrapper gap-2 flex flex-col">
                                <div className="top-card-content">
                                    <div className="title-wrapper mb-4 gap-2 flex justify-between items-start">
                                        <div className="min-w-0">
                                            <h1 className="title text-5xl break-words text-black-light-theme dark:text-[#fff] mb-0 font-semibold mt-0">
                                                tên sự kiện
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="meta mt-5 gap-3 flex flex-col">
                                        <div className="row-container rounded-lg -m-2 p-2">
                                            <div className="icon-row gap-4 flex items-center">
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                    <div className="calendar-card w-full text-center min-h-full">
                                                        <div className="month bg-[rgba(19,21,23,0.08)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px">12</div>
                                                        <div className="day -translate-y-px font-medium">12</div>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title text-black-light-theme dark:text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap">Thứ, Ngày Tháng ??</div>
                                                    <div className="desc text-black-more-blur-light-theme dark:text-[#fff] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">12:12 AM đến 12:12 PM</div>
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
                                                {/* <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                    <MapPin className="w-5 h-5 block align-middle" />
                                                </div> */}
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center overflow-hidden rounded-lg">
                                                    <Video className="w-5 h-5 block align-middle" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title text-black-light-theme dark:text-[#fff] font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                                                        <div className="gap-1 flex items-center max-w-sm">
                                                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">tên địa điểm</div>
                                                            <div className="icon opacity-50 translate-y-[0.5px] text-black-more-blur-light-theme transition-all duration-300 ease-in-out">
                                                                <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                            </div>
                                                        </div>
                                                        <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm mt-px overflow-hidden text-ellipsis whitespace-nowrap">Quận, huyện gì đó</div>
                                                        {/* <div className="title text-black-light-theme dark:text-[#fff] font-medium overflow-hidden whitespace-nowrap text-ellipsis">Online</div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="p-[0.75rem_1rem] bg-[#f5f6f7] dark:bg-[rgba(255,255,255,0.1)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-none shadow-md">
                            <div className="inner">
                                <div>
                                    {/* //TODO: NÀO CÓ DỮ LIỆU THÌ ĐI LOGIC ĐOẠN NÀY */}
                                    {/* <div className="left request-to-join gap-3 flex items-baseline mb-2 pb-2 bg-[#f7fafe] p-[0.75rem_1rem] border border-solid rounded-lg">
                                        <div className="icon">
                                            <ThumbsUp className="block w-5 h-5 align-middle translate-y-1" />
                                        </div>
                                        <div className="content">
                                            <div className="font-medium">Yêu cầu Tham gia sự kiện</div>
                                            <div className="desc mt-px text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">
                                                Đăng ký của bạn phải được sự chấp thuận của người tổ chức sự kiện.
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="left count-slots gap-3 flex items-baseline mb-2 pb-2 bg-[#f7fafe] p-[0.75rem_1rem] border border-solid rounded-lg">
                                        <div className="icon">
                                            <AlarmClock className="block w-5 h-5 align-middle translate-y-1" />
                                        </div>
                                        <div className="content">
                                            <div className="font-medium">Còn 49 chỗ trống</div>
                                            <div className="desc mt-px text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">
                                                Hãy nhanh đăng ký trước khi sự kiện kết thúc.
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="left money-request gap-3 flex items-baseline mb-2 pb-2 bg-[#f7fafe] p-[0.75rem_1rem] border border-solid rounded-lg">
                                        <div className="icon">
                                            <Receipt className="block w-5 h-5 align-middle translate-y-1" />
                                        </div>
                                        <div className="content">
                                            <div className="font-medium">49.000VND Vé</div>
                                            <div className="desc mt-px text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">
                                                Sự kiện này yêu cầu thanh toán qua <span className="text-red-500">VN</span><span className="text-blue-500">Pay</span>.
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="content gap-3 flex flex-col">
                                        {eventDetail?.isSub === true && eventDetail.isAppro === true ? (
                                            <div>
                                                <div className="waiting-request">
                                                    <div className="text-black-light-theme text-lg font-medium">Bạn đang tham gia</div>
                                                    <div className="text-black-more-blur-light-theme text-sm mt-1">
                                                        Email xác nhận đã được gửi tới: <span className="text-black-light-theme font-medium">{getProfile?.result.email}</span>.
                                                    </div>
                                                </div>
                                                <div className="join-event-online text-black-more-blur-light-theme text-xs mt-4">
                                                    <div className="cta-wrapper join-event">
                                                        <div className="cta gap-2 mb-1 flex items-center">
                                                            {eventDetail.isOnline === true ? (
                                                                <Button
                                                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button-w-fit transition-all duration-300 ease-in-out flex items-center m-0"
                                                                >
                                                                    <Video className="mr-2 w-5 h-5 align-middle block translate-y-px" />
                                                                    <div className="label">Tham gia</div>
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    onPress={modalViewTicket.onOpen}
                                                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button-w-fit transition-all duration-300 ease-in-out flex items-center m-0"
                                                                >
                                                                    <QrCode className="mr-2 w-5 h-5 align-middle block translate-y-px" />
                                                                    <div className="label">Xem vé</div>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : eventDetail?.isSub === true && eventDetail.isAppro === false ? (
                                            <div>
                                                <div>
                                                    {eventDetail.isLive === true ? (
                                                        <div
                                                            className="live-badge text-[#ff9641] flex items-center font-medium justify-end"
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
                                                            Live
                                                        </div>
                                                    ) : null}
                                                    <div className="user-row gap-2 flex items-center">
                                                        <div className="avatar-wrapper small">
                                                            <Avatar
                                                                src={getProfile?.result.avatar ? "https://avatars.githubusercontent.com/u/143386751?s=200&v=4" : "https://avatars.githubusercontent.com/u/143386751?s=200&v=4"}
                                                                className="w-5 h-5 relative"
                                                                radius="full"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex flex-wrap items-baseline justify-between w-full text-ellipsis overflow-auto whitespace-nowrap">
                                                            <div>
                                                                <b className="overflow-hidden text-ellipsis whitespace-nowrap mr-1 font-semibold">{getProfile?.result.userName}</b>
                                                                <span className="email text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] overflow-hidden text-ellipsis whitespace-nowrap">{getProfile?.result.email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content gap-3 mt-1 flex flex-col">
                                                    <div className="waiting-request">
                                                        <div className="text-black-light-theme text-lg font-medium">Đợi chấp nhận</div>
                                                        <div className="text-black-more-blur-light-theme text-sm mt-1">
                                                            Email xác nhận đã được gửi tới: <span className="text-black-light-theme font-medium">tungnhps17361@fpt.edu.vn</span>.
                                                        </div>
                                                        <div className="text-black-more-blur-light-theme text-sm">
                                                            Chúng tôi sẽ thông báo cho bạn khi đăng ký của bạn được phê duyệt.
                                                        </div>
                                                    </div>
                                                    <div className="left count-times gap-3 flex items-baseline bg-[#f7fafe] p-[0.25rem_1rem] border border-solid rounded-lg">
                                                        <div className="icon">
                                                            <AlarmClock className="block w-5 h-5 align-middle translate-y-1" />
                                                        </div>
                                                        <div className="content flex items-baseline justify-between w-full">
                                                            <div className="font-medium">Sự kiện bắt đầu sau</div>
                                                            <div className="text-[#ff9641] font-medium">21m 38s</div>
                                                        </div>
                                                    </div>
                                                    <div className="unsubs text-black-more-blur-light-theme text-xs">
                                                        <span>Không tiếp tục tham gia Sự kiện? Bạn có thể hủy đăng ký </span>
                                                        <Link
                                                            as={"span"}
                                                            className="text-[#ff9641] text-xs cursor-pointer"
                                                            underline="always"
                                                            onPress={modalUnSub.onOpen}
                                                        >
                                                            tại đây
                                                        </Link>
                                                    </div>
                                                    {/* <div className="waiting-request">
                                                        <div className="text-black-light-theme text-lg font-medium">Bạn đã hủy đăng ký sự kiện</div>
                                                        <div className="text-black-more-blur-light-theme text-sm mt-1">
                                                            Hi vọng sẽ gặp lại bạn ở lần sự kiện tiếp theo.
                                                        </div>
                                                    </div>
                                                    <div className="resign text-black-more-blur-light-theme text-xs">
                                                        <span>Bạn muốn tham gia lại Sự kiện? Bạn có thể đăng ký lại </span>
                                                        <Link
                                                            as={"span"}
                                                            className="text-[#ff9641] text-xs cursor-pointer"
                                                            underline="always"
                                                            onPress={modalResign.onOpen}
                                                        >
                                                            tại đây
                                                        </Link>
                                                    </div> */}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div>
                                                    Chào {getProfile?.result.userName}! Để tham gia sự kiện, vui lòng đăng ký phía bên dưới.
                                                </div>
                                                <div className="content gap-3 mt-2 flex flex-col">
                                                    <div className="user-row gap-2 flex items-center">
                                                        <div className="avatar-wrapper small">
                                                            <Avatar
                                                                src={getProfile?.result.avatar ? "https://avatars.githubusercontent.com/u/143386751?s=200&v=4" : "https://avatars.githubusercontent.com/u/143386751?s=200&v=4"}
                                                                className="w-5 h-5 relative"
                                                                radius="full"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex flex-wrap items-baseline">
                                                            <b className="overflow-hidden text-ellipsis whitespace-nowrap mr-1 font-semibold">{eventDetail?.name}</b>
                                                            <span className="email text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] overflow-hidden text-ellipsis whitespace-nowrap">{getProfile?.result.email}</span>
                                                        </div>
                                                    </div>
                                                    <div className="cta-wrapper">
                                                        <div className="cta gap-2 mb-1 flex items-center">
                                                            <Button
                                                                onClick={() => {

                                                                }}
                                                                className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                                            >
                                                                <div className="label">Tham gia sự kiện</div>
                                                            </Button>
                                                            {/* <Button
                                                                className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                                            >
                                                                <div className="label">Yêu cầu tham gia sự kiện</div>
                                                            </Button>
                                                            <Button
                                                                className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                                            >
                                                                <div className="label">Thanh toán</div>
                                                            </Button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-card desc">
                            <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)] gap-2 flex justify-between items-center">
                                <div className="title-label font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm">Thông tin</div>
                            </div>
                            <div className="content">
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <div className="label font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quidem quos, cum impedit laborum placeat expedita qui accusamus dolorem nisi molestias alias repudiandae dolorum est sunt eum commodi ipsa optio!</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-card map">
                            <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)] gap-2 flex justify-between items-center">
                                <div className="title-label font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm">Khu vực</div>
                            </div>
                            <div className="content">
                                {eventDetail ? (
                                    <div>
                                        <div className="cursor-copy">
                                            <div className="font-medium">{eventDetail.addressName}</div>
                                            <div className="text-tined text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm mt-1">
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="cursor-copy">
                                        <div className="font-medium">Thành phố Hồ Chí Minh</div>
                                        <div className="text-tined text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] text-sm mt-1">Việt Nam</div>
                                    </div>
                                )}
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
            <Modal
                isOpen={modalViewTicket.isOpen}
                onOpenChange={modalViewTicket.onOpenChange}
                size="sm"
                classNames={{
                    closeButton: [
                        "hidden"
                    ]
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="mt-2">
                                {/* <div className="border-4 border-dashed border-[rgba(19,21,23,0.2)] rounded-xl p-[0.5rem_1rem]">
                                    <Image
                                        className="bg-center bg-cover mb-2"
                                        width={500}
                                        height={500}
                                        alt="NextUI hero Image with delay"
                                        src="https://app.requestly.io/delay/2000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                                    />
                                </div> */}
                                <QRScanner onChildDataChange={handleChildDataChange} />
                                <div className="name-event text-lg font-medium text-black-light-theme">Tên sự kiện</div>
                                <div className="can-divide with-divider medium border-t-2 border-dashed border-[rgba(19,21,23,0.2)] m-0"></div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div className="email-user text-base font-medium text-black-light-theme">Email:</div>
                                        <div className="ml-auto text-base font-normal text-black-more-blur-light-theme">nguyenhiengiabao12</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div className="email-user text-base font-medium text-black-light-theme">Giá vé:</div>
                                        <div className="ml-auto text-base font-normal text-black-more-blur-light-theme">49.000 VNĐ</div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={modalUnSub.isOpen}
                onOpenChange={modalUnSub.onOpenChange}
                classNames={{
                    closeButton: [
                        "mt-2",
                        "mr-2",
                        "rounded-full",
                        "hover:bg-[#f2f3f4]",
                        "transition-all",
                        "duration-300",
                        "ease-in-out"
                    ],
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div className="title">
                                    <h1 className="font-semibold text-xl text-black-light-theme">Xác nhận hủy đăng ký</h1>
                                </div>
                            </ModalHeader>
                            <Divider />
                            <ModalBody className="mt-2">
                                <div className="content text-base text-black items-baseline">
                                    Chúng tôi sẽ cho người tổ chức sự kiện biết bạn sẽ không tham gia được.
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onPress={modalUnSub.onClose}
                                    type='button'
                                    className="text-[#fff] bg-[#e83b47] border-[#e83b47] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                >
                                    <div className="label">Xác nhận</div>
                                </Button>
                                <Button
                                    onPress={modalUnSub.onClose}
                                    type='button'
                                    className='text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                >
                                    <div className='label'>Hủy</div>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={modalContact.isOpen}
                onOpenChange={modalContact.onOpenChange}
                size="xl"
                radius="lg"
                classNames={{
                    closeButton: [
                        "mt-2",
                        "mr-2",
                        "rounded-full",
                        "hover:bg-[#f2f3f4]",
                        "transition-all",
                        "duration-300",
                        "ease-in-out"
                    ],
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <div>Liên hệ với Người tổ chức</div>
                            </ModalHeader>
                            <Divider />
                            <ModalBody className="mt-2 pt-2">
                                <Textarea
                                    label="Nội dung"
                                    labelPlacement="outside"
                                    placeholder="Hãy nhập nội dung tin nhắn của bạn..."
                                    minRows={3}
                                    variant="bordered"
                                    classNames={{
                                        label: [
                                            "text-lg",
                                            "font-medium",
                                            "text-black"
                                        ],
                                        input: [
                                            "font-normal",
                                            "text-base"
                                        ]
                                    }}


                                />
                                <div>
                                    <div className="title text-black-more-blur-light-theme dark:text-[#fff] font-medium">
                                        Người tổ chức sự kiện sẽ trả lời bạn qua gmail: <span className="text-black-light-theme">{getProfile?.result.email}</span>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button-w-fit transition-all duration-300 ease-in-out flex items-center m-0"
                                >
                                    <div className="label">Gửi</div>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}