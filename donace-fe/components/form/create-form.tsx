"use client"
import {
    useLoadScript,
    GoogleMap,
} from '@react-google-maps/api';
import axios from 'axios';
import { useMemo, useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

export default function CreateForm() {

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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Tên sự kiện'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="date">Start Date:</label>
                <input type="date" id="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <label htmlFor="time">Start Time:</label>
                <input type="time" id="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

                <label htmlFor="date">End Date:</label>
                <input type="date" id="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <label htmlFor="time">End Time:</label>
                <input type="time" id="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />


                <label htmlFor="addressName">Địa chỉ:</label>
                <input type="text" id="addressName" name='addressName' value={formData.addressName} onChange={handleChange} />

                <label htmlFor='color' id='color'>Color</label>
                <input type="color" id='color' name='color' value={formData.color} onChange={handleChange} />

                <div >
                    <div >
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
                    </div>
                    <GoogleMap
                        options={mapOptions}
                        zoom={14}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: '800px', height: '800px' }}
                        onLoad={(map) => console.log('Map Loaded')}
                    >
                    </GoogleMap>
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                    {formData.cover && <img src={formData.cover} alt="Preview" />}
                </div>

                <label htmlFor='capacity' id='capacity'>Capacity</label>
                <input type="number" id='capacity' name='capacity' placeholder='Số lượng chổ ngồi' value={formData.capacity} onChange={handleChange} />
                <button type="submit">Gửi</button>
            </form>
        </div>
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
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });
    };

    return (
        <div >
            <input
                value={value}

                disabled={!ready}
                onChange={(e) => setValue(e.target.value)}
                placeholder="FPT Polytechnic HCM"
            />

            {status === 'OK' && (
                <ul >{renderSuggestions()}</ul>
            )}
        </div>
    );
};



