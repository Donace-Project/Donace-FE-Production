
interface DateTimeInfo {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
}


const ConvertDateTime = (dateTime: string): DateTimeInfo => {
    const date = new Date(dateTime);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return { year, month, day, hour, minute };
};

interface AMorPMInfo {
    gio: number;
    buoi: string;
}

const AMorPM = (): AMorPMInfo => {
    const thoiGian = new Date();

    const gio = thoiGian.getHours();
    const buoi = gio >= 12 ? "PM" : "AM";
    return {
        gio: gio,
        buoi: buoi
    }
}

export {
    ConvertDateTime,
    AMorPM
}