import Authorization from "@/components/authen/authentication";
import EventDetails from "@/components/event-detail/event-detail";
import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { sorted: number, calendarId: string } }) {

    return (
        <Authorization>
            <div className="page-wrapper ">
                <NavbarComponents />
                <div className="main">
                    <EventDetails sorted={params.sorted} calendarId={params.calendarId} />
                </div>
                <div className="footer">
                    <FooterPage />
                </div>
            </div>
        </Authorization>
    )
}