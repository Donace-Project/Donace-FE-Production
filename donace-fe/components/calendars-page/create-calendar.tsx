"use client";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { UploadImage } from "@/types/DonaceType";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ArrowUp, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


export type CreateCalendar = {
    code: string
    success: boolean
    result: CalendarModel[]
    pageInfo: any
}

export type CalendarModel = {
    name: string
    cover: string
    avatar: string
    color: string
    publicURL: string
    lat: string
    long: string
    addressName: string
}

export default function CreateCalendar() {

    const router = useRouter();

    const handleClick = () => {
        // Thực hiện các thao tác cần thiết

        // Sau khi thực hiện hành động, điều hướng đến trang khác
        router.push('/calendars'); // hoặc router.replace('/other-page') nếu bạn không muốn lịch sử trình duyệt
    };

    const handleFileUpload = async (event: any) => {
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/Common/upload-file', {
                method: 'POST',
                body: formData,
                // Đảm bảo rằng headers được cấu hình đúng
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload thành công:', data);
            } else {
                console.error('Upload thất bại:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };


    var [images, setImages] = useState<UploadImage | null>(null);

    useEffect(() => {
        fetchWrapper.post('/api/Common/upload-file', { pageNumber: 1, pageSize: 9999 })
            .then(data => setImages(data))
    }, []);


    const [formData, setFormData] = useState({
        name: "",
        cover: "",
        avatar: "",
        color: "",
        publicURL: "",
        lat: "",
        long: "",
        addressName: ""
        // Thêm các trường dữ liệu khác của form nếu có
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Xây dựng đối tượng dữ liệu từ formData
        const dataToSend = {
            name: formData.name,
            cover: formData.cover,
            avatar: formData.avatar,
            color: formData.color,
            publicURL: formData.publicURL,
            lat: formData.lat,
            long: formData.long,
            addressName: formData.addressName,
        };

        if (!dataToSend.name) {
            // Hiển thị thông báo lỗi
            console.error("Name field is required.");
        } else {
            // Gửi yêu cầu POST lên API.
            fetchWrapper.post("/api/Calendar/create-calendar", dataToSend)
                .then((response) => {
                    if (response.success) {
                        // Cập nhật giao diện người dùng hoặc hiển thị thông báo thành công
                        console.log("Calendar created successfully.");

                    } else {
                        // Xử lý lỗi từ API và hiển thị thông báo lỗi
                        console.error("Error creating calendar:", response.message);
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
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold text-black-light-theme mb-0 mt-0 dark:text-[#fff]">Tạo Lịch</h1>
                </div>
            </div>
            <div id="zm-container" className="pt-[1.5rem!important] p-[1rem!important] max-w-[820px] m-[0_auto]">
                <form action={'#'} onSubmit={handleSubmit} className="gap-6 flex flex-col">
                    <div id="content-card-1" className="p-0 relative rounded-[0.75rem] bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(255,255,255,0.04)] border border-solid border-[#fff] dark:border-[rgba(255,255,255,0.04)] overflow-hidden">
                        <div id="top-card">
                            <div role="button" className="aspect-[3.5] bg-[#ebeced] dark:bg-[#333537] overflow-hidden transition-all duration-300 ease-in-out relative cursor-pointer">
                                <Input
                                    value={formData.cover}
                                    onChange={(e) =>
                                        setFormData({ ...formData, cover: e.target.value })
                                    }
                                    accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                                    type="file"
                                    tabIndex={-1}
                                    className="hidden m-0"
                                />
                                <div id="overlay animated" className="hover:bg-gray-300 absolute top-0 left-0 right-0 bottom-0 bg-transparent transition-all duration-300 ease-in-out"></div>
                                <div id="animated image" className="transition-all duration-300 ease-in-out">
                                    <div id="placeholder" className="pb-[calc(100%/(3/5))]"></div>
                                </div>
                                <div id="change-cover-container" className="absolute top-2 right-2 backdrop-blur-xl backdrop-contrast-[50%] backdrop-brightness-[130%] border border-solid border-[rgba(19,21,23,0.08)] rounded-[0.5rem] overflow-hidden">
                                    <input type="file" id="coverImage" className="hidden" onChange={handleFileUpload} />
                                    <Button
                                        type="button"
                                        className="hover:text-[#fff] hover:bg-gray-800 text-[rgba(19,21,23,0.64)] dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[0.875rem] p-[0.4375rem_0.625rem] h-[calc(1.75rem+2*1px)] w-fit flex items-center m-0 leading-[1.5]"
                                        onClick={() => {
                                            const fileInput = document.getElementById('coverImage');
                                            if (fileInput) {
                                                fileInput.click();
                                            }
                                        }}
                                    >
                                        <div id="label" className="leading-[1] m-[-4px_0] p-[4px_0] overflow-hidden text-ellipsis">Thay đổi ảnh bìa</div>
                                    </Button>
                                </div>
                            </div>
                            <div className="pb-[32px]">
                                <div id="avatar-container" className="absolute transform translate-y-[-50%] border-[0.25rem] border-solid border-[#fff] dark:border-[#212325] rounded-[0.75rem] ml-[0.875rem]">
                                    <div>
                                        <div role="presentation" id="avatar-wrapper" className="w-[64px] h-[64px] relative cursor-pointer">
                                            <Input
                                                value={formData.avatar}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, avatar: e.target.value })
                                                }
                                                accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                                                type="file"
                                                tabIndex={-1}
                                                className="hidden m-0" />
                                            <div id="upload-icon" className="rounded-[0.5rem] bg-center bg-cover flex justify-center items-center text-[#fff] dark:text-[#212325] bg-[rgb(19,21,23)] dark:bg-[#fff] hover:bg-red-500 w-[35%] h-[35%] min-w-[24px] min-h-[24px] border-2 border-solid border-[#fff] dark:border-[#212325] absolute right-[-1px] bottom-[-1px] origin-center transition-all duration-300 ease-in-out">
                                                <ArrowUp className="stroke-[2.5] w-[65%] h-[65%] block align-middle" />
                                            </div>
                                            <div id="avatar square" className="w-[64px] h-[64px] rounded-[0.5rem] bg-center bg-cover flex justify-center items-center bg-[#ebeced] dark:bg-[#333537]">
                                                <Avatar radius="full" src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="relative" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="input-container" className="p-[0.5rem_1rem] pb-0 flex flex-col">
                                <div id="name-input" className="text-[1.5rem] font-medium p-2 h-12">
                                    <textarea
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        id="lux-naked-input bordered mounted"
                                        spellCheck="false" autoCapitalize="words"
                                        placeholder="Tên lịch"
                                        className="h-[47.8px!important] p-2 border-b border-solid outline-none border-b-[#ebeced] transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1.5rem] font-medium w-full resize-none m-0 focus:border-b-2 focus:border-gray-400 hover:border-b-2 hover:border-gray-400"></textarea>
                                </div>
                                <div id="desc-input" className="p-2">
                                    <textarea id="lux-naked-input mounted" spellCheck="false" autoCapitalize="sentences" placeholder="Một vài dòng mô tả ngắn về lịch của bạn." maxLength={200} className="h-[37px!important] p-2 outline-none transition-all duration-300 ease-in-out height-0 text-[rgb(19,21,23)] dark:text-[#fff] leading-[1.3] overflow-hidden bg-transparent text-[1rem] font-normal w-full resize-none m-0"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] hover:bg-gray-700 border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-[all 0.3s cubic-bezier(0.4,0,0.2,1)] outline-[0s] font-medium rounded-[0.5rem] relative whitespace-nowrap justify-center outline-offset-[.125rem] outline-none max-w-full text-[1rem] p-[0.625rem_0.875rem] w-fit flex items-center m-0 leading-[1.5]"
                        onClick={handleClick}
                    >
                        <CheckCircle className="mr-2 stroke-[2.5] w-4 h-4 flex-shrink-0 block align-middle" />
                        <div id="label" className="leading-[1] m-[-4px_0] p-[4px_0] overflow-hidden text-ellipsis">Tạo lịch</div>
                    </Button>
                </form>
            </div>
        </div>
    )
}