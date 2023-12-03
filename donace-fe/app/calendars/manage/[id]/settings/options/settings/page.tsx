import CalendarSettingOptions from "@/components/calendars-page/manage/calendar-options";
import NavbarComponents from "@/components/navbar";

export default function Page(){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CalendarSettingOptions/>
            </div>
        </div>
    )
}