"use client"
import React, { useState } from 'react';
export default function CreateForm() {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [result, setResult] = useState('');

    const [formData, setFormData] = useState({
        sorted: 0,
        id: '',
        startDate: '',
        endDate: '',
        addressName: '',
        lat: '',
        long: '',
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
        const datetimeString = `${date} ${time}`;
        formData.startDate = datetimeString;
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <label htmlFor="time">Time:</label>
                <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />

                <label htmlFor="addressName">Địa chỉ:</label>
                <input type="text" id="addressName" name='addressName' value={formData.addressName} onChange={handleChange} />

                <label htmlFor='color' id='color'>Color</label>
                <input type="color" id='color' name='color' value={formData.color} onChange={handleChange} />

                <label htmlFor='capacity' id='capacity'>Capacity</label>
                <input type="number" id='capacity' name='capacity' placeholder='Số lượng chổ ngồi' value={formData.capacity} onChange={handleChange} />
                <button type="submit">Gửi</button>
            </form>
        </div>
    );
};