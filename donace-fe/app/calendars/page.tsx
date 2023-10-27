import CalendarPage from "@/components/calendars-page/calendars-page";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper">
            <div className="navbar">
                {/* <NavbarComponents /> */}
            </div>
            <div className="main">
                <CalendarPage />
            </div>
        </div>
    )
}