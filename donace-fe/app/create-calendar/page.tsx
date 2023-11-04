import CreateCalendar from "@/components/calendars-page/create-calendar";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CreateCalendar />
            </div>
        </div>
    )
}