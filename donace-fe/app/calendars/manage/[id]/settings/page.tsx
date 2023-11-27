import CalendarSetting from "@/components/calendars-page/manage/calendar-setting";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CalendarSetting id={params.id}/>
            </div>
        </div>
    )
}