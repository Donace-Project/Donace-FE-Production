'use client';

import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { EventDetailModels } from "@/types/DonaceType";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowUpRight, Copy, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";


export default function EventMore(props: any) {
    const [startDate, setStartDate] = useState(new Date());


    var { id } = props
    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));
    }, []);

    return (
        <div className="page-content">
            <div className="page-header opacity-[2] pl-4 pr-4 pt-12 max-width-global margin-global">
                {eventDetail ? (
                    <div className="spread gap-2 mb-2 flex justify-between items-center">
                        <h1 className="tab-title text-4xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">
                            <div>
                                <div className="inline">{eventDetail.name}</div>
                            </div>
                        </h1>
                        <Link
                            href={`/events/detail/${eventDetail.id}`}
                            target="_blank"
                            className="text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid transition-all duration-300 ease-in-out donace-button-w-fit flex items-center cursor-pointer"
                            underline="none"
                        >
                            <div className="label">Trang sự kiện</div>
                            <ArrowUpRight className="ml-1.5 stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle" />
                        </Link>
                    </div>
                ) : (
                    <div className="hidden"></div>
                )}
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        <div className="tabs flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                            <div className="side-padding"></div>
                            <Link
                                href={`/events/manage/${eventDetail?.id}`}
                                underline="none"
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                Sự kiện
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/guests`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Khách
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/payment`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/insights`}
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Doanh thu
                            </Link>
                            <Link
                                href={`/events/manage/${eventDetail?.id}/more`}
                                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Khác
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-title-divider border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] mb-7"></div>
            </div>
            <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divide with-divider medium">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Sao chép Sự kiện</h2>
                        </div>
                        <div className="section-subtitle -mt-3.5 mb-5 text-[#737577] text-base">
                            <span>
                                Tạo Sự kiện mới với thông tin giống như Sự kiện này. Mọi thứ trừ danh sách khách mời sẽ được sao chép qua.
                            </span>
                        </div>
                    </div>
                    <form action={"#"}>
                        <div className="create-wrapper mt-6">
                            <div className="date-picker-container flex flex-col flex-grow-0">
                                <div className="label">Thời gian bắt đầu</div>
                                <DatePicker
                                    todayButton="Hôm nay"
                                    selected={startDate}
                                    onChange={(date: any) => setStartDate(date)}
                                    startDate={startDate}
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    showTimeInput
                                    fixedHeight
                                    className="border-2 border-solid border-[#babac1] focus:border-[rgb(19,21,23)] rounded-lg pl-16 pr-8 mt-2"
                                    placeholderText="Ngày Bắt đầu sự kiện"
                                />
                            </div>
                        </div>
                        <Button
                            type="button"
                            className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] hover:bg-gray-700 border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit mt-6 flex items-center"
                        >
                            <Copy className="block align-middle w-4 h-4 flex-shrink-0 mr-2" />
                            <div className="label">Sao chép</div>
                        </Button>
                    </form>
                </div>
                <div className="can-divide with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Hủy Sự kiện</h2>
                        </div>
                        <div className="section-subtitle -mt-3.5 mb-5 text-[#737577] text-base">
                            <span>
                                Hủy và xóa vĩnh viễn Sự kiện này. Thao tác này không thể hoàn tác. Nếu có khách đã đăng ký, chúng tôi sẽ thông báo cho họ rằng Sự kiện đã bị hủy.
                            </span>
                        </div>
                    </div>
                    <Button
                        type="button"
                        className="text-[#fff] bg-[#e83b47] border border-solid border-[#e83b47] transition-all duration-300 ease-in-out cursor-pointer donace-button-w-fit flex items-center mt-6"
                    >
                        <XCircle className="block align-middle w-4 h-4 flex-shrink-0 mr-2" />
                        <div className="label">Hủy Sự kiện</div>
                    </Button>
                </div>
            </div>
        </div>
    )
}