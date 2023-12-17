"use client"
import { set } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

//@ts-ignore
const goongGeocoder = require("@goongmaps/goong-geocoder");
interface MapComponentProps {
  lngv: number;
  latv: number;
  hSize?: string;
  zoom?: number;
  makers?: [{
    lng: number;
    lat: number;
    color: string | "red" | "green" | "blue" | "yellow" | "pink" | "black" | "white" | "gray" | "orange" | "purple" | "brown" | "cyan" | "teal" | "lime" | "amber" | "indigo" | "maroon" | "navy" | "olive" | "fuchsia" | "crimson" | "gold" | "silver" | "bronze" | "platinum" | "transparent";
  }];
  // setLngFc: (newValue: number) => void;
  // setLatFc: (newValue: number) => void;
}
//, setLatFc, setLngFc 

const MapComponent = ({ lngv, latv, hSize = "400px", zoom = 9, makers }: MapComponentProps) => {

  let map: any;
  const [geocoder, setGeocoder] = useState<any>(null);
  let goongjs = useRef<any>(null);

  async function ImportMap() {
    goongjs.current = await require("@goongmaps/goong-js");
    goongjs.current.accessToken = "wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW";
    setGeocoder(
      new goongGeocoder({
        accessToken: "sbRzCkkevuDa7mTtXzH1mE1i3CZGdFjGAcG01XqF",
        goongjs: goongjs.current,
      })
    );
  }

  useEffect(() => {
    ImportMap();
    // Khởi tạo bản đồ khi component được mount

    setTimeout(() => {
      if (!goongjs.current) {
      } else {
        map = new goongjs.current.Map({
          container: "map", // ID của phần tử HTML để chứa bản đồ
          style: "https://tiles.goong.io/assets/goong_map_web.json",
          center: [lngv, latv], // Tọa độ trung tâm
          zoom: zoom, // Mức độ zoom mặc định
          // placeholder: 'Tìm kiếm địa điểm', // Placeholder của ô tìm kiếm

          // hash: true,
        });
        // map.addControl(
        //   geocoder
        // );
        // geocoder.on("result", function (e: any) {

        // });

        makers?.map((maker) => {
          new goongjs.current.Marker(
            {
              color: maker.color,
              draggable: false,
            }
          )
            .setLngLat([maker.lng, maker.lat])
            .addTo(map);
        });

        return () => {
          map.remove();
        };

      };
    }, 1000);
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: hSize }}></div>
  );

};

export default MapComponent;