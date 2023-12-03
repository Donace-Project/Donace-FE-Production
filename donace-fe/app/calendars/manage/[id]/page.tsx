import CalendarManage from "@/components/calendars-page/manage/calendar-manage";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <CalendarManage id={params.id}/>
            </div>
        </div>
    )
}