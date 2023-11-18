import CalendarPeople from "@/components/calendars-page/manage/calendar-people";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CalendarPeople id={params.id}/>
            </div>
        </div>
    )
}