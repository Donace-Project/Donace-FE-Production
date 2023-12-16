import CalendarPage from "@/components/calendars-page/calendars-page";
import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";
import Authorization from "@/components/author/authorization";

export default function Page() {
    return (
        <Authorization>
            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <CalendarPage />
                </div>
                <div className="footer">
                    <FooterPage />
                </div>
            </div>
        </Authorization>
    )
}