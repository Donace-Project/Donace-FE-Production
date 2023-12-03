"use client"
import { Avatar } from '@nextui-org/avatar';
import { Input, Textarea } from '@nextui-org/input';

import { ArrowUp10, ChevronDown, ChevronsUpDown, FileImage, MapPin, Pen } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Popover, PopoverTrigger, PopoverContent, Checkbox, Image } from "@nextui-org/react";

import MapComponent from '@/components/map/goong-map';

export default function CreateForm() {

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');

    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [result, setResult] = useState('');

    const [lat, setLat] = useState(10.8537915);
    const [lng, setLng] = useState(106.6234887);

    const [formData, setFormData] = useState({
        sorted: 0,
        id: '',
        startDate: '',
        endDate: '',
        addressName: '',
        lat: '',
        long: '',
        cover: "",
        capacity: "",
        isOverCapacity: true,
        name: '',
        theme: '',
        color: '#f6b73c',
        fontSize: 0,
        instructions: '',
        isMultiSection: true,
        duration: 0,
        totalGuest: 0,
        calendarId: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        formData.endDate = `${endDate} ${endTime}`;
        formData.startDate = `${startDate} ${startTime}`;

        formData.long = lng.toString();
        formData.lat = lat.toString();

        console.log(formData);
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        setSelectedImage(file || null);
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setFormData({
                    ...formData,
                    cover: result,
                });
            }
        };
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <div className='page-content'>
                <div className='page-container relative bg-transparent'>
                    <div className='zm-container p-[1.5rem_1rem] max-width-global margin-global'>
                        <div className='outer-wrapper -m-5'>
                            <div className='content-card p-[1rem_1.25rem] relative rounded-xl bg-[#f2f3f4] dark:bg-[#212325] border border-solid border-[#f2f3f4] dark:border-[rgba(255,255,255,0.04)] backdrop-blur-none shadow-none overflow-hidden'>
                                <div className='content-container grid grid-cols-2 gap-10'>
                                    <div className='left min-w-0'>
                                        <div>
                                            <div className='lux-menu-trigger-wrapper m-[-0.375rem_-0.625rem] p-[0.375rem_0.625rem] cursor-pointer rounded-lg gap-3 w-64 transition-all duration-300 ease-in-out inline-flex min-w-0 items-center'>
                                                <div className='avatar-wrapper small'>
                                                    <Avatar
                                                        radius="full"
                                                        src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
                                                        name="Donace"
                                                        className="w-6 h-6 relative"
                                                    />
                                                </div>
                                                <div className='min-w-0 flex-1'>
                                                    <div className='text-xs text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]'>Create under</div>
                                                    <div className='gap-1 flex items-center'>
                                                        <div className='font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm'>Personal Calendar</div>
                                                    </div>
                                                </div>
                                                <div className='chevron text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)]'>
                                                    <ChevronDown className='block w-4 h-4 align-middle' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='name-input-wrapper -ml-2 m-6 flex'>
                                            <Textarea
                                                className='transition-all duration-300 ease-in-out text-black-light-theme dark:text-[#fff] overflow-hidden bg-transparent p-0 font-semibold w-full resize-none m-0'
                                                placeholder='Event Name'
                                                spellCheck="false"
                                                autoCapitalize='words'
                                                minRows={1}
                                                classNames={{
                                                    input: [
                                                        "font-semibold",
                                                        "text-4xl",
                                                    ],
                                                    inputWrapper: [

                                                        "shadow-none"
                                                    ]
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div className='attribute-row w-full gap-3 mb-4 flex items-start'>
                                                <div className='icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] dark:border-[rgba(255,255,255,0.08)] text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] rounded-lg flex-shrink-0 mt-2 overflow-hidden justify-center flex items-center'>
                                                    <div className='text-center w-full'>
                                                        <div className='month bg-[rgba(19,21,23,0.1)] dark:bg-[rgba(255,255,255,0.08)] text-[0.5rem] font-semibold uppercase p-px'>Nov</div>
                                                        <div className='day -translate-y-px font-medium'>6</div>
                                                    </div>
                                                </div>
                                                <div className='time-picker bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden flex-1'>
                                                    <div className='start-row p-[0.25rem_0.25rem_0.25rem_0.75rem] flex justify-between items-baseline'>
                                                        <div className='label w-12'>Start</div>
                                                        <div className='pr-12 p-0'>
                                                            <div className='datetime-timezone w-auto max-w-full'>
                                                                <div className='datetime-input max-w-[13.5rem] flex items-stretch transition-all duration-300 ease-in-out'>
                                                                    <div className='date-input border-r-0 rounded-tl rounded-tr-none rounded-br-none rounded-lr border-transparent transition-all duration-300 ease-in-out flex-1 flex items-center'>
                                                                        <div className='wrapper flex-1 relative flex items-center'>
                                                                            <Input
                                                                                type="date"
                                                                                id="date"
                                                                                value={startDate}
                                                                                onChange={(e) => setStartDate(e.target.value)}
                                                                                className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                variant='flat'
                                                                                radius='none' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='divider w-px bg-transparent transition-all duration-300 ease-in-out'></div>
                                                                    <div className='time-input border-l-0 rounded-tl-none rounded-tr rounded-br rounded-bl-none border border-solid border-transparent bg-[rgba(19,21,23,0.04)] transition-all duration-300 ease-in-out flex items-center'>
                                                                        <div className='lux-menu-trigger flex cursor-pointer min-w-0'>
                                                                            <Input
                                                                                type="time"
                                                                                id="time"
                                                                                value={startTime}
                                                                                onChange={(e) => setStartTime(e.target.value)}
                                                                                className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                variant='flat'
                                                                                radius='none' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='end-row p-[0.25rem_0.25rem_0.25rem_0.75rem] flex justify-between items-baseline'>
                                                        <div className='label w-12'>End</div>
                                                        <div className='pr-12 p-0'>
                                                            <div className='datetime-timezone w-auto max-w-full'>
                                                                <div className='datetime-input max-w-[13.5rem] flex items-stretch transition-all duration-300 ease-in-out'>
                                                                    <div className='date-input border-r-0 rounded-tl rounded-tr-none rounded-br-none rounded-lr border-transparent transition-all duration-300 ease-in-out flex-1 flex items-center'>
                                                                        <div className='wrapper flex-1 relative flex items-center'>
                                                                            <Input
                                                                                type="date"
                                                                                id="date"
                                                                                value={endDate}
                                                                                onChange={(e) => setEndDate(e.target.value)}
                                                                                className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                variant='flat'
                                                                                radius='none' />
                                                                        </div>
                                                                    </div>
                                                                    <div className='divider w-px bg-transparent transition-all duration-300 ease-in-out'></div>
                                                                    <div className='time-input border-l-0 rounded-tl-none rounded-tr rounded-br rounded-bl-none border border-solid border-transparent bg-[rgba(19,21,23,0.04)] transition-all duration-300 ease-in-out flex items-center'>
                                                                        <div className='lux-menu-trigger flex cursor-pointer min-w-0'>
                                                                            <Input
                                                                                type="time"
                                                                                id="time"
                                                                                value={endTime}
                                                                                onChange={(e) => setEndTime(e.target.value)}
                                                                                className='bg-transparent dark:bg-[rgba(255,255,255,0.08)] dark:text-[#fff]'
                                                                                variant='flat'
                                                                                radius='none' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full gap-3 mb-4 flex items-start'>
                                                <div className='icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] dark:border-[rgba(255,255,255,0.08)] text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] rounded-lg flex-shrink-0 mt-2 overflow-hidden justify-center flex items-center'>
                                                    <MapPin className='w-5 h-5 block align-middle' />
                                                </div>
                                                <div className='location-picker-wrapper min-w-0 flex-1'>
                                                    <div className='lux-menu-trigger-wrapper cursor-pointer inline-flex min-w-0 w-full'>
                                                        <Button
                                                            className='mt-2 bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] min-w-0 transition-all duration-300 ease-in-out w-full'
                                                            radius='sm'
                                                            type='button'
                                                            onPress={onOpen}
                                                        >
                                                            <div className='inner min-h-unit-3.5 p-[0.375rem_0.75rem]'>
                                                                <div>
                                                                    <div>
                                                                        <div className='min-w-0'>
                                                                            <div className='text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] font-medium overflow-hidden text-ellipsis whitespace-nowrap'>Add Event Location</div>
                                                                            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]'>Event location or pick via Maps</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Button>
                                                        <Modal
                                                            isOpen={isOpen}
                                                            onOpenChange={onOpenChange}
                                                            size='3xl'
                                                            placement='center'
                                                            scrollBehavior='inside'
                                                        >
                                                            <ModalContent>
                                                                {(onClose) => (
                                                                    <>
                                                                        <ModalHeader className="flex flex-col gap-1">Adding Event Location</ModalHeader>
                                                                        <Divider />
                                                                        <ModalBody>
                                                                            <div className='pt-2 m-2'>

                                                                                <div className='pt-4 font-medium text-base text-black-light-theme dark:text-[#fff]'>Or pick your location via Maps:</div>
                                                                                <div className='pt-4'>
                                                                                    <MapComponent lngv={lng} latv={lat} />
                                                                                </div>
                                                                                {/* setLngFc={setLng} setLatFc={setLat} */}
                                                                            </div>
                                                                        </ModalBody>
                                                                    </>
                                                                )}
                                                            </ModalContent>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='advanced-optiions mt-6'>
                                            <div className='lux-input-label medium text-sm block mb-1.5 font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] transition-all duration-300 ease-in-out'>
                                                <div>Event Options</div>
                                            </div>
                                            <div className='options-card mt-2 rounded-lg overflow-hidden'>
                                                <div className='option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]'>
                                                    <div className='gap-2 flex items-center'>
                                                        <div className='icon text-[rgba(19,21,23,0.2)] dark:text-[hsla(0,0%,100%,.32)] m-[0px_0.25rem]'>
                                                            <ArrowUp10 className='block w-4 h-4 align-middle' />
                                                        </div>
                                                        <div className='text-black-more-blur-light-them dark:text-[hsla(0,0%,100%,.79)]e select-none flex-1' id='capacity'>Số lượng</div>
                                                        <div className='gap-1 flex items-center'>
                                                            <Popover placement="bottom" showArrow offset={10}>
                                                                <PopoverTrigger>
                                                                    <Button
                                                                        aria-label='Edit'
                                                                        type='button'
                                                                        className='m-[-1px_-0.25rem_-1px_0px] text-black-blur-light-theme bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center'
                                                                    >
                                                                        <div className='text-black-blur-light-theme font-medium capitalize dark:text-[hsla(0,0%,100%,.5)]'>Unlimited</div>
                                                                        <Pen className='stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5 dark:text-[hsla(0,0%,100%,.5)]' />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[240px]">
                                                                    {(titleProps) => (
                                                                        <div className="px-1 py-2 w-full">
                                                                            <p className="text-small font-bold text-foreground" id='capacity' {...titleProps}>
                                                                                Capacity
                                                                            </p>
                                                                            <div className="mt-2 flex flex-col gap-2 w-full">
                                                                                <Input
                                                                                    type="number"
                                                                                    inputMode='numeric'
                                                                                    id='capacity'
                                                                                    value={formData.capacity}
                                                                                    onChange={handleChange}

                                                                                    placeholder="0"
                                                                                    labelPlacement="outside"
                                                                                    variant="bordered"
                                                                                />
                                                                                <div className='mt-2'>
                                                                                    <Checkbox className='label text-base font-medium'>Over-Capacity Waitlist</Checkbox>
                                                                                </div>
                                                                                <div className='mt-2 gap-2 flex justify-between items-center'>
                                                                                    <Button
                                                                                        type='submit'
                                                                                        className='text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0'
                                                                                    >
                                                                                        <div className='label'>Đồng ý</div>
                                                                                    </Button>
                                                                                    <Button
                                                                                        type='submit'
                                                                                        className='text-black-more-blur-light-theme dark:text-[rgba(255,255,255,0.64)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border-transparent border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0'
                                                                                    >
                                                                                        <div className='label'>Xóa</div>
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pt-2 mt-6'>
                                            <Button
                                                type='submit'
                                                className='text-[#fff] dark:text-[rgb(19,21,23)] bg-[#333537] dark:bg-[#fff] border-[#333537] dark:border-[#fff] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0'
                                            >
                                                <div className='label'>Tạo Sự kiện</div>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='right min-w-0'>
                                        <div>
                                            <div>
                                                <div
                                                    role='button'
                                                    className='photo-container bg-[rgba(19,21,23,0.04)] rounded-lg overflow-hidden outline-offset-2 outline-none transition-all duration-300 ease-in-out relative cursor-pointer'
                                                >
                                                    <Input
                                                        type='file'
                                                        id="image" name="image"
                                                        accept='image/*,.jpg,.jpeg,.png,.gif,.webp'
                                                        onChange={handleImageChange}
                                                        tabIndex={-1}
                                                        className='hidden text-inherit m-0'
                                                    />
                                                    <div className='image has-image transition-all duration-300 ease-in-out'>
                                                        <div className='img-aspect-ratio w-full bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] overflow-hidden relative rounded-lg'>
                                                            <Image
                                                                src='https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-defaults/1-1/standard1.png'
                                                                className='cursor-pointer top-0 left-0 w-full h-full object-cover align-middle'
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* phần hình ảnh chỗ này thì tui chưa làm được làm thế nào để nó mở file lên */}
                                                    <div className='z-20 absolute bottom-[-2px] right-[-2px] w-[calc(2rem+2px)] h-[calc(2rem+2px)] text-[#fff] dark:text-[rgb(19,21,23)] bg-[rgb(19,21,23)] dark:bg-[#fff] border-2 border-solid border-[#fff] dark:border-[rgb(19,21,23)] rounded-lg transition-all duration-300 ease-in-out justify-center flex items-center'>
                                                        <FileImage className='block w-4 h-4 align-middle' />
                                                        <input type="file" id="image" name="image" className='-z-0 hidden' accept="image/*" onChange={handleImageChange} />
                                                        {formData.cover && <img src={formData.cover} alt="Preview" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pt-4'>
                                            <div className='theme-control-card rounded-lg overflow-hidden'>
                                                <div className='h-auto block filter-none'>
                                                    <Popover placement="bottom" showArrow={true}>
                                                        <PopoverTrigger>
                                                            <div className='lux-menu-trigger-wrapper color cursor-pointer inline-flex min-w-0 w-full'>
                                                                <div className='option-row w-full p-[0.5rem_0.75rem] flex-1 transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)]'>
                                                                    <div className='divider'></div>
                                                                    <div className='gap-2 flex items-center'>
                                                                        <div>
                                                                            <div className='dot bg-[#939597] dark:bg-[#d2d4d7] w-6 h-6 rounded-full'></div>
                                                                        </div>
                                                                        <div className='text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] select-none flex-1'>Color</div>
                                                                        <div className='gap-1 flex items-center'>
                                                                            <div className='value text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] font-medium capitalize'>Gray</div>
                                                                            <div className='accessory flex items-center justify-center text-[rgba(19,21,23,0.2)] dark:text-[hsla(0,0%,100%,.32)] w-[calc(0.3125rem*2+0.875rem+2px)] -mr-1 transition-all duration-300 ease-in-out'>
                                                                                <ChevronsUpDown className='block w-4 h-4 align-middle mt-0.5' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </PopoverTrigger>
                                                        {/* content này là về bảng màu á, chỉ cần ông muốn thêm màu là copy dot-container là được */}
                                                        <PopoverContent
                                                            className='shadow-md relative rounded-lg border border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[#fffd] dark:bg-[rgba(33,35,37,0.8)] overflow-auto'
                                                        >
                                                            <div className='max-w-[95vw] p-4'>
                                                                <div>
                                                                    <div className='dots gap-1 flex flex-wrap items-center'>
                                                                        <div className='dot-container'>
                                                                            <div className='dot-ring opacity-[1] border-[#939597] dark:border-[#d2d4d7] border-[0.125rem] border-solid rounded-full p-0.5 transition-all duration-300 ease-in-out cursor-pointer' role='button'>
                                                                                <div className='bg-[#939597] dark:bg-[#d2d4d7] w-5 h-5 rounded-full flex items-center transition-all duration-300 ease-in-out'></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
