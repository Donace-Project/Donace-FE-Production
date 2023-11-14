import CalendarPeople from "@/components/calendars-page/manage/calendar-people";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CalendarPeople/>
            </div>
        </div>
    )
}