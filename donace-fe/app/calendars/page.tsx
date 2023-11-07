import CalendarPage from "@/components/calendars-page/calendars-page";
import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <CalendarPage />
            </div>
            <div className="footer">
                <FooterPage />
            </div>
        </div>
    )
}