import EventDetails from "@/components/event-detail/event-detail";
import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper gradient-background">
            <NavbarComponents />
            <div className="main">
                <EventDetails />
            </div>
            <div className="footer">
                <FooterPage />
            </div>
        </div>
    )
}