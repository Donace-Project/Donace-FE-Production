"use client"
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { EventDetailModels } from "@/types/DonaceType";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function EventPayment(props: any) {

    const [isSelected, setIsSelected] = React.useState(false);
    const [isRequiredPayment, setIsRequiredPayment] = React.useState(false);

    const [showPriceInput, setShowPriceInput] = useState(false);
    const [ticketPrice, setTicketPrice] = useState('');

    const [tmnCode, setTmnCode] = useState<string>("");
    const [hashSecret, setHashSecret] = useState<string>("");

    const handleTicketTypeChange = (event: any) => {
        setShowPriceInput(event.target.value === 'paid');
    };

    const handleSetTicketPrice = () => {
        console.log(`Đã đặt giá vé là: ${ticketPrice}`);
        // Thêm code xử lý khi người dùng đặt giá vé ở đây
    };

    var { id } = props

    var [eventDetail, setEventDetail] = useState<EventDetailModels | null>(null);
    useEffect(() => {
        fetchWrapper.get(`api/Event/detail-by-id?id=${id}`)
            .then(data => setEventDetail(data));

        // fetchWrapper.post('api/Payment/connect', )
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
                                className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
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
                                className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
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
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Thiết lập loại vé</h2>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="flex flex-col">
                            <div className="bg-[rgba(19,21,23,0.08)] w-2/4 rounded-lg pl-4 p-[0.375rem_0px_0.875rem]">
                                <div className="flex justify-between">
                                    <label htmlFor="freeTicket">Miễn phí</label>
                                    <input
                                        type="radio"
                                        id="freeTicket"
                                        name="ticketType"
                                        value="free"
                                        onChange={handleTicketTypeChange}
                                        defaultChecked
                                        className="cursor-pointer mr-6"
                                    />
                                </div>
                            </div>
                            <div className="bg-[rgba(19,21,23,0.08)] w-2/4 rounded-lg pl-4 p-[0.375rem_0px_0.875rem] mt-2">
                                <div className="flex justify-between">
                                    <label htmlFor="paidTicket">Trả phí</label>
                                    <input
                                        type="radio"
                                        id="paidTicket"
                                        name="ticketType"
                                        value="paid"
                                        onChange={handleTicketTypeChange}
                                        className="cursor-pointer mr-6"
                                    />
                                </div>
                                {showPriceInput && (
                                    <div className="flex items-center pt-4">
                                        <NumericFormat
                                            className="text-base h-auto donace-button-w-fit bg-[#fff] border border-solid border-[#ebeced] transition-all duration-300 ease-in-out m-0 focus:outline-none focus:border-[rgb(19,21,23)]"
                                            thousandSeparator={true}
                                            allowNegative={false}
                                            prefix={"₫ "} // Dấu tiền tệ Việt Nam đồng
                                            placeholder={
                                                "Nhập số tiền"
                                            }
                                            value={ticketPrice}
                                            onChange={(e) => setTicketPrice(e.target.value)}
                                        />
                                        <Button
                                            radius="md"
                                            onClick={handleSetTicketPrice}
                                            className="px-4 py-2 bg-green-500 ml-12 text-white donace-button-w-fit"
                                        >
                                            Lưu
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="can-divide with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="section-title-row mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">
                                Thiết lập thanh toán qua <span className="text-red-500">VN</span><span className="text-blue-500">Pay</span>.
                            </h2>
                        </div>
                    </div>
                    <div className="setting-payment">
                        <div className="gap-4 mt-2 flex flex-col">
                            <div className="lux-input-wrapper medium max-w-[auto]">
                                <div className="inner-wrapper inline-block w-full">
                                    <label className="text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out">
                                        <div>Key</div>
                                    </label>
                                    <div className="input-wrapper flex items-baseline w-1/2">
                                        <div className="flex-1 flex items-center">
                                            <div>&nbsp;</div>
                                            <Input
                                                placeholder="Điền key của bạn vào trong này."
                                                size="md"
                                                variant="bordered"
                                                type="password"
                                                inputMode="text"
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
                                    <label className="text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out">
                                        <div>Secret key</div>
                                    </label>
                                    <div className="input-wrapper flex items-baseline w-1/2">
                                        <div className="flex-1 flex items-center">
                                            <div>&nbsp;</div>
                                            <Input
                                                size="md"
                                                variant="bordered"
                                                type="password"
                                                inputMode="text"
                                                placeholder="Điền secret key của bạn vào trong này."
                                                classNames={{
                                                    input: ["text-base"],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="gap-2 flex justify-between items-center">
                                <Button
                                    type="submit"
                                    className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-50 mt-4 flex items-center m-0"
                                >
                                    <div className="label">
                                        Kết nối
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}