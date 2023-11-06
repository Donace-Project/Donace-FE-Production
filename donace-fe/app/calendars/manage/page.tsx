import CalendarManage from "@/components/calendars-page/manage/calendar-manage";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CalendarManage/>
            </div>
        </div>
    )
}