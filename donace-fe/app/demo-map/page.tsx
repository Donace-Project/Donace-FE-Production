"use client"
import {
    useLoadScript,
    GoogleMap,
    MarkerF,
    CircleF,
} from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

export const DemoPage = () => {
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

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA6tRumkn2d-0HeK3ektor7FvHFSceVduk" as string,
        libraries: libraries as any,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
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
    );
};

export default DemoPage;

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