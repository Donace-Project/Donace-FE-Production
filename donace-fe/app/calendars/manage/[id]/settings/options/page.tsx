import CalendarSetting from "@/components/calendars-page/manage/calendar-display";
import NavbarComponents from "@/components/navbar";

export default function Page(){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CalendarSetting/>
            </div>
        </div>
    )
}