"use client"
import { Avatar } from '@nextui-org/avatar';
import { Input, Textarea } from '@nextui-org/input';
import {
    useLoadScript,
    GoogleMap,
} from '@react-google-maps/api';
import axios from 'axios';
import { ArrowUp10, ChevronDown, MapPin, Pen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { SearchIcon } from "../icon/searchIcon";

export default function CreateForm() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');

    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [result, setResult] = useState('');

    const [lat, setLat] = useState(10.8537915);
    const [lng, setLng] = useState(106.6234887);

    const libraries = useMemo(() => ['places'], []);
    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
        }),
        []
    );

    const [formData, setFormData] = useState({
        sorted: 0,
        id: '',
        startDate: '',
        endDate: '',
        addressName: '',
        lat: '',
        long: '',
        cover: "",
        capacity: 0,
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        formData.endDate = `${endDate} ${endTime}`;
        formData.startDate = `${startDate} ${startTime}`;

        formData.long = lng.toString();
        formData.lat = lat.toString();

        // axios.post('http://118.71.175.86/api/', formData.cover, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "Accept": "text/plain"
        //     }
        // })
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        console.log(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA6tRumkn2d-0HeK3ektor7FvHFSceVduk" as string,
        libraries: libraries as any,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <div className='page-content'>
                <div className='page-container relative bg-transparent'>
                    <div className='zm-container p-[1.5rem_1rem] max-width-global margin-global'>
                        <div className='outer-wrapper -m-5'>
                            <div className='content-card p-[1rem_1.25rem] relative rounded-xl bg-[#f2f3f4] border border-solid border-[#f2f3f4] backdrop-blur-none shadow-none overflow-hidden'>
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
                                                    <div className='text-xs text-black-blur-light-theme'>Create under</div>
                                                    <div className='gap-1 flex items-center'>
                                                        <div className='font-medium overflow-hidden text-ellipsis whitespace-nowrap text-sm'>Personal Calendar</div>
                                                    </div>
                                                </div>
                                                <div className='chevron text-black-blur-light-theme'>
                                                    <ChevronDown className='block w-4 h-4 align-middle' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='name-input-wrapper -ml-2 m-6 flex'>
                                            <Textarea
                                                className='transition-all duration-300 ease-in-out text-black-light-theme overflow-hidden bg-transparent p-0 font-semibold w-full resize-none m-0'
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
                                                <div className='icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] text-black-blur-light-theme rounded-lg flex-shrink-0 mt-2 overflow-hidden justify-center flex items-center'>
                                                    <div className='text-center w-full'>
                                                        <div className='month bg-[rgba(19,21,23,0.1)] text-[0.5rem] font-semibold uppercase p-px'>Nov</div>
                                                        <div className='day -translate-y-px font-medium'>6</div>
                                                    </div>
                                                </div>
                                                <div className='time-picker bg-[rgba(19,21,23,0.04)] rounded-lg overflow-hidden flex-1'>
                                                    <div className='start-row p-[0.25rem_0.25rem_0.25rem_0.75rem] flex justify-between items-baseline'>
                                                        <div className='label w-12'>Start</div>
                                                        <div className='pr-12 p-0'>
                                                            <div className='datetime-timezone w-auto max-w-full'>
                                                                <div className='datetime-input max-w-[13.5rem] flex items-stretch transition-all duration-300 ease-in-out'>
                                                                    <div className='date-input border-r-0 rounded-tl rounded-tr-none rounded-br-none rounded-lr border-transparent transition-all duration-300 ease-in-out flex-1 flex items-center'>
                                                                        <div className='wrapper flex-1 relative flex items-center'>
                                                                            {/* <div className='h-auto min-w-0 flex bg-transparent text-base outline-none text-black-light-theme w-full border-0 border-solid border-transparent rounded-md text-left appearance-none items-center transition-all duration-300 ease-in-out'>
                                                                        </div> */}
                                                                            <Input
                                                                                type="date"
                                                                                id="date"
                                                                                value={startDate}
                                                                                onChange={(e) => setStartDate(e.target.value)}
                                                                                className='bg-transparent'
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
                                                                                className='bg-transparent'
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
                                                                                className='bg-transparent'
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
                                                                                className='bg-transparent'
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
                                                <div className='icon-container w-10 h-10 border border-solid border-[rgba(19,21,23,0.1)] text-black-blur-light-theme rounded-lg flex-shrink-0 mt-2 overflow-hidden justify-center flex items-center'>
                                                    <MapPin className='w-5 h-5 block align-middle' />
                                                </div>
                                                <div className='location-picker-wrapper min-w-0 flex-1'>
                                                    <div className='lux-menu-trigger-wrapper cursor-pointer inline-flex min-w-0 w-full'>
                                                        <Button
                                                            className='mt-2 bg-[rgba(19,21,23,0.04)] min-w-0 transition-all duration-300 ease-in-out w-full'
                                                            radius='sm'
                                                            type='button'
                                                            onPress={onOpen}
                                                        >
                                                            <div className='inner min-h-unit-3.5 p-[0.375rem_0.75rem]'>
                                                                <div>
                                                                    <div>
                                                                        <div className='min-w-0'>
                                                                            <div className='text-black-more-blur-light-theme font-medium overflow-hidden text-ellipsis whitespace-nowrap'>Add Event Location</div>
                                                                            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black-more-blur-light-theme'>Event location or pick via Maps</div>
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
                                                                                <PlacesAutocomplete
                                                                                    onAddressSelect={(address) => {
                                                                                        getGeocode({ address: address }).then((results) => {
                                                                                            const { lat, lng } = getLatLng(results[0]);

                                                                                            setLat(lat);
                                                                                            setLng(lng);

                                                                                            console.log(lat, lng);
                                                                                        });
                                                                                    }}

                                                                                />
                                                                                <div className='pt-4 font-medium text-base text-black-light-theme'>Or pick your location via Maps:</div>
                                                                                <div className='pt-4'>
                                                                                    <GoogleMap
                                                                                        options={mapOptions}
                                                                                        zoom={14}
                                                                                        center={mapCenter}
                                                                                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                                                                                        mapContainerStyle={{ width: '690px', height: '400px' }}
                                                                                        onLoad={(map) => console.log('Map Loaded')}
                                                                                    >
                                                                                    </GoogleMap>
                                                                                </div>
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
                                            <div className='lux-input-label medium text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out'>
                                                <div>Event Options</div>
                                            </div>
                                            <div className='options-card mt-2 rounded-lg overflow-hidden'>
                                                <div className='option-row w-full p-[0.5rem_0.75rem] transition-all duration-300 ease-in-out relative overflow-hidden bg-[rgba(19,21,23,0.04)]'>
                                                    <div className='gap-2 flex items-center'>
                                                        <div className='icon text-[rgba(19,21,23,0.2)] m-[0px_0.25rem]'>
                                                            <ArrowUp10 className='block w-4 h-4 align-middle' />
                                                        </div>
                                                        <div className='text-black-more-blur-light-theme select-none flex-1' id='capacity'>Capacity</div>
                                                        <div className='gap-1 flex items-center'>
                                                            <Button
                                                                aria-label='Edit'
                                                                type='button'
                                                                className='m-[-1px_-0.25rem_-1px_0px] text-black-blur-light-theme bg-transparent border-transparent border border-solid flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit flex items-center'
                                                            >
                                                                <div className='text-black-blur-light-theme font-medium capitalize'>Unlimited</div>
                                                                <Pen className='stroke-2 w-3.5 h-3.5 flex-shrink-0 block align-middle mt-0.5' />
                                                            </Button>
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
                </div>
            </div>
        </>
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="name">Tên:</label>
        //             <input
        //                 type="text"
        //                 id="name"
        //                 name="name"
        //                 placeholder='Tên sự kiện'
        //                 value={formData.name}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <label htmlFor="date">Start Date:</label>
        //         <input type="date" id="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        //         <label htmlFor="time">Start Time:</label>
        //         <input type="time" id="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        //         <label htmlFor="date">End Date:</label>
        //         <input type="date" id="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        //         <label htmlFor="time">End Time:</label>
        //         <input type="time" id="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />


        //         <label htmlFor="addressName">Địa chỉ:</label>
        //         <input type="text" id="addressName" name='addressName' value={formData.addressName} onChange={handleChange} />

        //         <label htmlFor='color' id='color'>Color</label>
        //         <input type="color" id='color' name='color' value={formData.color} onChange={handleChange} />

        // <div >
        //     <div >
        //         <PlacesAutocomplete
        //             onAddressSelect={(address) => {
        //                 getGeocode({ address: address }).then((results) => {
        //                     const { lat, lng } = getLatLng(results[0]);

        //                     setLat(lat);
        //                     setLng(lng);

        //                     console.log(lat, lng);
        //                 });
        //             }}
        //         />
        //     </div>
        //     <GoogleMap
        //         options={mapOptions}
        //         zoom={14}
        //         center={mapCenter}
        //         mapTypeId={google.maps.MapTypeId.ROADMAP}
        //         mapContainerStyle={{ width: '800px', height: '800px' }}
        //         onLoad={(map) => console.log('Map Loaded')}
        //     >
        //     </GoogleMap>
        // </div>

        //         <div>
        //             <label htmlFor="image">Image:</label>
        //             <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        //             {formData.cover && <img src={formData.cover} alt="Preview" />}
        //         </div>

        //         <label htmlFor='capacity' id='capacity'>Capacity</label>
        //         <input type="number" id='capacity' name='capacity' placeholder='Số lượng chổ ngồi' value={formData.capacity} onChange={handleChange} />
        //         <button type="submit">Gửi</button>
        //     </form>
        // </div>
    );
};


const PlacesAutocomplete = ({
    onAddressSelect,
}: {
    onAddressSelect?: (address: string) => void;
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: 'vn' } },
        debounce: 500,
        cache: 86400,
    });

    const renderSuggestions = () => {
        return data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
            } = suggestion;

            return (
                <li
                    key={place_id}
                    onClick={() => {
                        setValue(description, false);
                        clearSuggestions();
                        onAddressSelect && onAddressSelect(description);
                    }}
                    className='border-b-2 border-solid border-[#f1f2f3] bg-[rgba(19,21,23,0.08)] pl-3 py-1.5'
                >
                    <strong>{main_text}</strong>
                    <br></br>
                    <small className='font-normal'>{secondary_text}</small>
                </li>
            );
        });
    };

    return (
        <div >
            <Input
                value={value}
                disabled={!ready}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Enter location..'
                label='Location'
                radius='sm'
                labelPlacement='outside'
                isClearable
            />

            {status === 'OK' && (
                <ul >{renderSuggestions()}</ul>
            )}
        </div>
    );
};



