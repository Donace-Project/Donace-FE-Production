'use client';
import { useEffect, useState } from "react";
import { EventDetailModels, EventDetailSorted, PaymentMethod, UserProfile } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { AlarmClock, ArrowUpRight, MapPin, QrCode, Radio, Receipt, ThumbsUp, Video } from "lucide-react";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { Textarea } from "@nextui-org/react";
import { set } from "date-fns";

import QRCodeGenerator from "@/components/QR/QRGenerator";

import MapComponent from "@/components/map/goong-map";
import EventDetails from "@/components/event-detail/event-detail";

import donaceLogo from "@/public/doanLogo.png";
import formatCurrency from "@/components/currency/currency";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react";
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


    const router = useRouter();

    const { data: session } = useSession();

    const modalContact = useDisclosure();
    const modalUnSub = useDisclosure();
    const modalResign = useDisclosure();
    const modalViewTicket = useDisclosure();

    var { id } = props;

    const [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    // const [eventDetailSort, setEventDetailSort] = useState<EventDetailSorted | null>(null);
    // const [sortedValue, setSortedValue] = useState<number | null>(null);
    const [calendarIdValue, setCalendarIdValue] = useState<string | null>(null);

    var [getProfile, setProfile] = useState<null | UserProfile>(null);
    const [thoiGian, setThoiGian] = useState(new Date());

    const gio = thoiGian.getHours();
    const buoi = gio >= 12 ? "PM" : "AM";

    // const [addressName, setAddressName] = useState('');
    // const [nameAddress, setNameAddress] = useState('');
    // const [district, setDistrict] = useState('');
    // const [city, setCity] = useState('');

    // const [isFree, setIsFree] = useState(false);
    // const [isApprove, setIsApprove] = useState(false);
    // const [isSub, setIsSub] = useState(false);
    // const [isLive, setisLive] = useState(false);

    useEffect(() => {
        fetchWrapper.get(`api/EventPublic/detail-by-id?id=${id}`)
            .then(data => {
                setEventDetail(data);
                // setIsFree(!data.isFree);
                // setIsApprove(!data.isAppro);
                // setIsSub(!data.isSub);
                // setisLive(!data.isLive);
                // const addressParts = data.addressName.split(/, /);
                // const addressName = addressParts[0]
                // const nameAddress = addressParts[1];
                // const district = addressParts[2];
                // const city = addressParts[4];
                // console.log('Tên địa chỉ:', addressName);
                // console.log('Tên đường:', nameAddress);
                // console.log('Quận huyện:', district);
                // console.log('Thành phố:', city);
                // setAddressName(addressName);
                // setNameAddress(nameAddress);
                // setDistrict(district);
                // setCity(city);
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

    const handleConnectPayment = async () => {

        if (session) {

            await fetchWrapper.get(`api/Payment/get-connect/${eventDetail?.creatorId}`).then(data => {
                if (data != null) {
                    fetchWrapper.post("api/Order/create", {
                        status: 0,
                        userId: getProfile?.result.id,
                        ticketId: eventDetail?.ticketId,
                        totalPrice: eventDetail?.price,
                        paymentMethodId: data.id
                    }).then(data => router.replace(data.url)).catch(error => console.error('Lỗi khi gọi API:', error));
                }
            }).catch(error => console.error('Lỗi khi gọi API:', error));


        } else {

            router.push(`/auth/login?callbackUrl=${window.location.origin}/user/join-event/${id}`);
        }
    }

    // callbackUrl=http%3A%2F%2Flocalhost%3A3000
    // {
    //     "totalPrice": 0,
    //     "status": 0,
    //     "paymentMethodId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "ticketId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    //   }


    // * Click vào sẽ mở tab trong google map
    const handleMapLinkClick = () => {
        if (eventDetail && eventDetail.addressName) {
            const address = encodeURIComponent(eventDetail.addressName);
            const mapsURL = `https://www.google.com/maps/search/?api=1&query=${address}`;
            window.open(mapsURL, '_blank');
        }
    };

    const [ticketIdForQr, setTicketIdForQr] = useState<string>("");

    const handleQrGenerator = async () => {
        if (getProfile == null) {
            console.log("some bug")
        }
        if (ticketIdForQr == "") {
            let ticketId = await fetchWrapper.get("api/UserTickets/get-ticket")
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

    const [joiningLoading, setJoiningLoading] = useState(false);

    const handleJoinEvent = async () => {
        setJoiningLoading(true);
        let data = await fetchWrapper.post("api/Event/user-join", {
            userId: getProfile?.result.id,
            calendarId: calendarIdValue,
            eventId: id,
        }).then(data => console.log(data))

        if (data != null) {
            setJoiningLoading(false);
            console.log(data)
        }
    }

    return (
        <div className="page-content">
            <div className="page-container relative bg-transparent mt-8 ">
                <div className="content-wrapper flex items-start gap-8 p-4 max-width-global margin-global  bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(35,35,35,0.8)] backdrop-blur-lg rounded-lg">
                    <div className="left flex flex-col gap-6 min-w-0 w-80">
                        <div className="cover-with-glow relative justify-center flex items-center">
                            {/* <div className="img-aspect-ratio opacity-5 rounded-lg absolute top-4 blur-xl w-full bg-[rgba(19,21,23,0.04)]">
                                <Image className="absolute top-0 left-0 w-full h-full object-cover align-middle" src="https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/retro1.png" />
                            </div> */}
                            <div className="img-view rounded-2xl w-full bg-rgba(19,21,23,0.04) relative">
                                <Image
                                    className="top-0 left-0 w-full h-full object-cover align-middle"
                                    src={eventDetail?.cover ? eventDetail.cover : donaceLogo.src}
                                />
                            </div>
                        </div>
                        <div className="desktop-only flex flex-col gap-6 min-w-0">
                            <div className="content-card">
                                <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.36)] dark:border-[rgba(255,255,255,0.2)]">
                                    <div className="title-label font-medium  text-sm dark:text-[hsla(0,0%,100%,.79)]">Điều phối bởi</div>
                                </div>
                                <div className="content">
                                    <div className="hosts gap-3 flex flex-col">
                                        <div className="gap-2 flex items-center">
                                            <Link
                                                href="/profile"

                                                className="text-inherit gap-2 flex-1 flex items-center "
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
                                                    <div className="font-medium  text-ellipsis whitespace-nowrap">{eventDetail?.email}</div>
                                                </div>
                                            </Link>
                                        </div>
                                        {/* //todo: fetch api hiển thị những ai đã có trạng thái chuyển sang going */}
                                        <div className="going">
                                            <div className="going flex justify-between items-center">{eventDetail?.totalGuest} đang tham dự</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gap-3 flex flex-col">
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
                                            <h1 className="title text-5xl break-words  dark:text-[#fff] mb-0 font-semibold mt-0">
                                                {eventDetail.name}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="meta mt-5 gap-3 flex flex-col">
                                        <div className="row-container rounded-lg -m-2 p-2">
                                            <div className="icon-row gap-4 flex items-center">
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]  dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center  rounded-lg">
                                                    <div className="calendar-card w-full text-center min-h-full">
                                                        <div className="month bg-[rgba(19,21,23,0.08)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px">{ConvertDateTime(eventDetail.startDate).month}</div>
                                                        <div className="day -translate-y-px font-medium">{ConvertDateTime(eventDetail.endDate).day}</div>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title  dark:text-[#fff] font-medium  text-ellipsis whitespace-nowrap">{DayOfWeek(CovertDate(eventDetail.startDate)[0])}, {ConvertDateTime(eventDetail.startDate).day} tháng {ConvertDateTime(eventDetail.startDate).month}</div>
                                                    <div className="desc  dark:text-[#fff] text-sm mt-px  text-ellipsis whitespace-nowrap">{ConvertDateTime(eventDetail.startDate).hour}:{ConvertDateTime(eventDetail.startDate).minute} {buoi} đến {ConvertDateTime(eventDetail.endDate).hour}:{ConvertDateTime(eventDetail.endDate).minute} {buoi}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            target="_blank"
                                            rel="nofollow noopener"
                                            className="text-foreground-900 cursor-pointer"
                                            underline="none"
                                            onClick={handleMapLinkClick}
                                        >
                                            <div className="gap-4 flex items-center">
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]  dark:text-[hsla(0,0%,100%,.79)] justify-center flex items-center rounded-lg">
                                                    <MapPin className="w-5 h-5 block align-middle" />
                                                </div>
                                                <div className="">
                                                    <div className="title dark:text-[#fff] font-medium">
                                                        <div className="gap-1 flex items-center max-w-[300px]">
                                                            <div className="truncate">{eventDetail.addressName}</div>
                                                            <div className="icon opacity-50 transition-all duration-300 ease-in-out">
                                                                <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="desc  dark:text-[hsla(0,0%,100%,.79)] text-sm mt-px  text-ellipsis whitespace-nowrap">{district}, {city}</div> */}
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
                                            <h1 className="title text-5xl break-words  dark:text-[#fff] mb-0 font-semibold mt-0">
                                                tên sự kiện
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="meta mt-5 gap-3 flex flex-col">
                                        <div className="row-container rounded-lg -m-2 p-2">
                                            <div className="icon-row gap-4 flex items-center">
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]  dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center  rounded-lg">
                                                    <div className="calendar-card w-full text-center min-h-full">
                                                        <div className="month bg-[rgba(19,21,23,0.08)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px">12</div>
                                                        <div className="day -translate-y-px font-medium">12</div>
                                                    </div>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title  dark:text-[#fff] font-medium  text-ellipsis whitespace-nowrap">Thứ, Ngày Tháng ??</div>
                                                    <div className="desc  dark:text-[#fff] text-sm mt-px  text-ellipsis whitespace-nowrap">12:12 AM đến 12:12 PM</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href="https://maps.app.goo.gl/PcmdqBSLh3SwXnZN7"
                                            target="_blank"
                                            rel="nofollow noopener"
                                            className=""

                                            underline="none"
                                        >
                                            <div className="icon-row gap-4 flex items-center">
                                                {/* <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]  dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center  rounded-lg">
                                                    <MapPin className="w-5 h-5 block align-middle" />
                                                </div> */}
                                                <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]  dark:text-[hsla(0,0%,100%,.79)] m-0.5 flex-shrink-0 justify-center flex items-center  rounded-lg">
                                                    <Video className="w-5 h-5 block align-middle" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="title  dark:text-[#fff] font-medium  whitespace-nowrap text-ellipsis">
                                                        <div className="gap-1 flex items-center max-w-sm">
                                                            <div className=" text-ellipsis whitespace-nowrap">tên địa điểm</div>
                                                            <div className="icon opacity-50 translate-y-[0.5px]  transition-all duration-300 ease-in-out">
                                                                <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                            </div>
                                                        </div>
                                                        <div className="desc  dark:text-[hsla(0,0%,100%,.79)] text-sm mt-px  text-ellipsis whitespace-nowrap">Quận, huyện gì đó</div>
                                                        {/* <div className="title  dark:text-[#fff] font-medium  whitespace-nowrap text-ellipsis">Online</div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="px-4 py-2 bg-[#f5f6f7] dark:bg-[rgba(255,255,255,0.1)] border border-solid border-[#f3f4f5] dark:border-[rgba(255,255,255,0.1)] rounded-xl backdrop-blur-none shadow-md">
                            <div className="inner">
                                <div>
                                    {
                                        eventDetail?.isHost === true ? (
                                            <>
                                                Bạn là người tổ chức sự kiện này
                                            </>) : (
                                            eventDetail?.isFree == true ? (
                                                <>
                                                    <div className="content gap-3 flex flex-col">
                                                        {/* eventDetail?.isSub == true && eventDetail.isAppro === true */}
                                                        {eventDetail?.isSub == true && eventDetail?.isAppro == true ? (
                                                            <div>
                                                                <div className="waiting-request">
                                                                    <div className=" text-lg font-medium">Bạn đang tham gia</div>
                                                                    <div className=" text-sm mt-1">
                                                                        Email xác nhận đã được gửi tới: <span className=" font-medium">{getProfile?.result.email}</span>.
                                                                    </div>
                                                                </div>
                                                                <div className="join-event-online  text-xs mt-4">
                                                                    <div className="cta-wrapper join-event">
                                                                        <div className="cta gap-2 mb-1 flex items-center">
                                                                            {eventDetail?.isOnline == true ? (
                                                                                <Button
                                                                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button-w-fit transition-all duration-300 ease-in-out flex items-center m-0"
                                                                                >
                                                                                    <Video className="mr-2 w-5 h-5 align-middle block translate-y-px" />
                                                                                    <div className="label">Tham gia</div>
                                                                                </Button>
                                                                            ) : (
                                                                                <Button
                                                                                    onPress={() => { openModalGenQr() }}
                                                                                    className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button-w-fit transition-all duration-300 ease-in-out flex items-center m-0"
                                                                                >
                                                                                    <div className="label">Xem vé</div>
                                                                                </Button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-center text-sm">
                                                                            <span className="text-[#ff9641] font-medium">Lưu ý:</span> Vui lòng kiểm tra email của bạn để xem vé.
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Button color="danger"
                                                                            variant="ghost">
                                                                            <p>Hủy đăng ký</p>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            // eventDetail?.isSub && eventDetail.isAppro === false
                                                        ) : eventDetail?.isSub == true && eventDetail?.isAppro == false ? (
                                                            <div>
                                                                {eventDetail?.isLive === true ? (
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
                                                                            <b className=" text-ellipsis whitespace-nowrap mr-1 font-semibold">{getProfile?.result.userName}</b>
                                                                            <span className="email text-sm  dark:text-[hsla(0,0%,100%,.79)]  text-ellipsis whitespace-nowrap">{getProfile?.result.email}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="content gap-3 mt-1 flex flex-col">
                                                                    <div className="waiting-request">
                                                                        <div className=" text-lg font-medium">Đợi chấp nhận</div>
                                                                        <div className=" text-sm mt-1">
                                                                            Email xác nhận đã được gửi tới: <span className=" font-medium">tungnhps17361@fpt.edu.vn</span>.
                                                                        </div>
                                                                        <div className=" text-sm">
                                                                            Chúng tôi sẽ thông báo cho bạn khi đăng ký của bạn được phê duyệt.
                                                                        </div>
                                                                    </div>
                                                                    <div className="left count-times gap-3 flex items-baseline bg-background p-[0.25rem_1rem] border border-solid rounded-lg">
                                                                        <div className="icon">
                                                                            <AlarmClock className="block w-5 h-5 align-middle translate-y-1" />
                                                                        </div>
                                                                        <div className="content flex items-baseline justify-between w-full">
                                                                            <div className="font-medium">Sự kiện bắt đầu sau</div>
                                                                            <div className="text-[#ff9641] font-medium">21m 38s</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="unsubs  text-xs">
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
                                                        <div className=" text-lg font-medium">Bạn đã hủy đăng ký sự kiện</div>
                                                        <div className=" text-sm mt-1">
                                                            Hi vọng sẽ gặp lại bạn ở lần sự kiện tiếp theo.
                                                        </div>
                                                    </div>
                                                    <div className="resign  text-xs">
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
                                                                            <b className=" text-ellipsis whitespace-nowrap mr-1 font-semibold">{eventDetail?.name}</b>
                                                                            <span className="email  dark:text-[hsla(0,0%,100%,.79)]  text-ellipsis whitespace-nowrap">{getProfile?.result.email}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="cta-wrapper">
                                                                        <div className="cta gap-2 mb-1 flex items-center">
                                                                            {
                                                                                joiningLoading ?
                                                                                    <Button
                                                                                        isLoading
                                                                                        className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                                                                    >
                                                                                        <div className="label">Tham gia sự kiện</div>
                                                                                    </Button>
                                                                                    : <Button
                                                                                        onClick={() => {
                                                                                            handleJoinEvent()
                                                                                        }}
                                                                                        className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid donace-button transition-all duration-300 ease-in-out flex items-center m-0"
                                                                                    >
                                                                                        <div className="label">Tham gia sự kiện</div>
                                                                                    </Button>
                                                                            }

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
                                                </>
                                            ) : (
                                                <div className=" flex flex-col items-center gap-2 w-full">
                                                    <div className="items-center w-full hover:bg-opacity-70 hover:border-foreground-900 cursor-pointer request-to-join gap-3 flex bg-background px-4 py-2 border border-solid rounded-lg"
                                                        onClick={() => {
                                                            handleConnectPayment()
                                                        }}
                                                    >
                                                        <div className="icon">
                                                            <ThumbsUp className="block w-5 h-5 align-middle translate-y-1" />
                                                        </div>
                                                        <div className="content">
                                                            <div className="font-medium">Yêu cầu Tham gia sự kiện</div>
                                                            <div className="desc mt-px text-sm  dark:text-[hsla(0,0%,100%,.79)]">
                                                                Đăng ký của bạn phải được sự chấp thuận của người tổ chức sự kiện.
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="items-center count-slots w-full gap-3 flex bg-background px-4 py-2 border border-solid rounded-lg">
                                                        <div className="icon">
                                                            <AlarmClock className="block w-5 h-5 align-middle translate-y-1" />
                                                        </div>
                                                        <div className="content">
                                                            {
                                                                eventDetail?.isUnlimited ? (
                                                                    <>
                                                                        <div className="font-medium">Sự kiện không giới hạn số lượng tham gia</div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="font-medium">{eventDetail?.capacity}</div>
                                                                    </>
                                                                )
                                                            }
                                                            <div className="desc mt-px text-sm  dark:text-[hsla(0,0%,100%,.79)]">
                                                                Hãy nhanh đăng ký trước khi sự kiện kết thúc.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="items-center money-request w-full gap-3 flex bg-background px-4 py-2 border border-solid rounded-lg">
                                                        <div className="icon">
                                                            <Receipt className="block w-5 h-5 align-middle translate-y-1" />
                                                        </div>
                                                        <div className="content">
                                                            <div className="font-medium">{formatCurrency(eventDetail?.price)}</div>
                                                            <div className="desc mt-px text-sm  dark:text-[hsla(0,0%,100%,.79)]">
                                                                Sự kiện này yêu cầu thanh toán qua <span className="text-red-500">VN</span><span className="text-blue-500">Pay</span>.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>))
                                    }
                                    {/* //TODO: NÀO CÓ DỮ LIỆU THÌ ĐI LOGIC ĐOẠN NÀY */}



                                </div>
                            </div>
                        </div>
                        <div className="content-card desc">
                            <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)] gap-2 flex justify-between items-center">
                                <div className="title-label font-medium  dark:text-[hsla(0,0%,100%,.79)] text-sm">Thông tin</div>
                            </div>
                            <div className="content">
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <div className="label font-normal">Chưa cập nhật...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-card map">
                            <div className="card-title pb-2 mb-4 border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.2)] gap-2 flex justify-between items-center">
                                <div className="title-label font-medium  dark:text-[hsla(0,0%,100%,.79)] text-sm">Khu vực</div>
                            </div>
                            <div className="content">
                                {
                                    eventDetail?.isOnline ? (
                                        <Link href={eventDetail.linkMeet} >
                                            <p className="truncate">
                                                {eventDetail.linkMeet}
                                            </p>
                                        </Link>

                                    ) :
                                        (
                                            eventDetail?.addressName ? (
                                                <div className="gap-4 flex items-center">
                                                    <div className="icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]  dark:text-[hsla(0,0%,100%,.79)] justify-center flex items-center rounded-lg">
                                                        <MapPin className="w-5 h-5 block align-middle" />
                                                    </div>
                                                    <div className="">
                                                        <div className="title dark:text-[#fff] font-medium">
                                                            <div className="gap-1 flex items-center max-w-[300px]">
                                                                <div className="truncate">{eventDetail.addressName}</div>
                                                                <div className="icon opacity-50 transition-all duration-300 ease-in-out">
                                                                    <ArrowUpRight className="block w-4 h-4 align-middle" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="desc  dark:text-[hsla(0,0%,100%,.79)] text-sm mt-px  text-ellipsis whitespace-nowrap">{district}, {city}</div> */}
                                                    </div>
                                                </div>
                                            ) : (
                                                <>  <div className="font-medium">Cập nhật sau...</div>
                                                </>
                                            ))
                                }
                                {
                                    eventDetail?.isOnline ? (
                                        <>
                                            Sự kiện online
                                        </>
                                    ) :
                                        (eventDetail?.addressName ? (
                                            <div className="gmaps mt-4">
                                                {/* <Link
                                                    href="https://maps.app.goo.gl/22D1FfAT2NYKF4cv8"
                                                    className="block rounded-lg "
                                                    underline="none"
                                                    target="_blank"
                                                    rel="nofollow noopener"
                                                >
                                                    <div className="shadow-lg p-2 dark:bg-[#333537] bg-[#fff]">
                                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4441623916387!2d106.62348197465653!3d10.853782889299758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1699268739213!5m2!1svi!2s" className="w-full border-none h-48 flex pointer-events-none rounded-lg" loading="lazy"></iframe>

                                                    </div>
                                                </Link> */}
                                                <MapComponent lngv={eventDetail?.long} latv={eventDetail?.lat} hSize="200px" zoom={13} makers={[
                                                    {
                                                        lat: eventDetail?.lat,
                                                        lng: eventDetail?.long,
                                                        color: "red"
                                                    }
                                                ]} />

                                            </div>
                                        ) : <>
                                            Đang cập nhật...
                                        </>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                className="dark:bg-[rgba(33,35,37,0.8)] bg-[rgb(255,255,255,0.8)] p-4 backdrop-blur-lg"
                isOpen={modalViewTicket.isOpen}
                onOpenChange={modalViewTicket.onOpenChange}
                size="sm"
                backdrop="blur"
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
                                <div className="text-center text-lg font-medium">Mã QR của bạn</div>
                                {/* <div className="border-4 border-dashed border-[rgba(19,21,23,0.2)] rounded-xl p-[0.5rem_1rem]">
                                    <Image
                                        className="bg-center bg-cover mb-2"
                                        width={500}
                                        height={500}
                                        alt="NextUI hero Image with delay"
                                        src="https://app.requestly.io/delay/2000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                                    />
                                </div> */}
                                {/* <QRScanner onChildDataChange={handleChildDataChange} /> */}
                                <QRCodeGenerator value={ticketIdForQr} />
                                <div className="flex justify-between items-center">
                                    <div className="name-event text-lg font-medium ">Tên sự kiện</div>
                                    <div className="can-divide with-divider medium border-t-2 border-dashed border-[rgba(19,21,23,0.2)] m-0">
                                        {eventDetail?.name}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">

                                    <div className="email-user text-base font-medium ">Người tham dự:</div>
                                    <div className="ml-auto text-base font-normal ">{getProfile?.result.userName}</div>
                                </div>
                                {/* <div>
                                    <div className="flex justify-between items-center">
                                        <div className="email-user text-base font-medium ">Giá vé:</div>
                                        <div className="ml-auto text-base font-normal ">49.000 VNĐ</div>
                                    </div>
                                </div> */}
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
                                    <h1 className="font-semibold text-xl ">Xác nhận hủy đăng ký</h1>
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
                                    className=' bg-[rgba(19,21,23,0.04)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
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
                                    <div className="title  dark:text-[#fff] font-medium">
                                        Người tổ chức sự kiện sẽ trả lời bạn qua gmail: <span className="">{getProfile?.result.email}</span>
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