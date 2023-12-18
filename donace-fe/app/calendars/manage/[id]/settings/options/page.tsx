import CalendarSettingOptions from "@/components/calendars-page/manage/calendar-options";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <CalendarSettingOptions id={params.id} />
            </div>
        </div>
    )
}