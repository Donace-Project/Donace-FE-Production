"use client"
import React, { useState, useEffect } from 'react';

function ThoiGian() {
    const [thoiGian, setThoiGian] = useState(new Date());

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Mã cập nhật thời gian chỉ chạy trên máy khách
            const interval = setInterval(() => {
                setThoiGian(new Date());
            }, 1000);

            // Làm sạch interval khi component bị hủy
            return () => clearInterval(interval);
        }
    }, []);
    const gio = thoiGian.getHours();
    const phut = thoiGian.getMinutes();
    // Xác định AM hoặc PM dựa vào giờ
    const buoi = gio >= 12 ? "PM" : "AM";

    // Chuyển đổi giờ sang định dạng 12 giờ
    const gio12 = gio > 12 ? gio - 12 : gio;
    return (
        <div>
            <p>{gio12 < 10 ? '0' : ''}{gio12}:{phut < 10 ? '0' : ''}{phut} {buoi}</p>
        </div>
    );
}

export default ThoiGian;