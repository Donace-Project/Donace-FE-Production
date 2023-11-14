"use client"
import { useEffect } from 'react';
//@ts-ignore
import goongjs from '@goongmaps/goong-js';
//@ts-ignore
import GoongGeocoder from '@goongmaps/goong-geocoder'

interface MapComponentProps {
  lng: number;
  lat: number;
  setLng: (newValue: number) => void;
  setLat: (newValue: number) => void;
}

let map: any;

const MapComponent = ({ lng, lat, setLat, setLng }: MapComponentProps) => {
  let geocoder = new GoongGeocoder({
    accessToken: 'sbRzCkkevuDa7mTtXzH1mE1i3CZGdFjGAcG01XqF',
    goongjs: goongjs
  });
  useEffect(() => {
    // Khởi tạo bản đồ khi component được mount
    goongjs.accessToken = 'wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW';
    map = new goongjs.Map({
      container: 'map', // ID của phần tử HTML để chứa bản đồ
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [lng, lat], // Tọa độ trung tâm
      zoom: 9, // Mức độ zoom mặc định
    });
    map.addControl(
      geocoder
    );
    geocoder.on('result', function (e: any) {
      setLat(e.result.result.geometry.location.lat);
      setLng(e.result.result.geometry.location.lng);
      // console.log(e.result.result.geometry.location.lng);
      console.log(e.result.result.formatted_address); // log the place name
      // console.log(ev.result.geometry); // log the coordinates [longitude, latitude]
    });

    return () => {
      map.remove();
    };
  }, [lng, lat]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );

};

export default MapComponent;