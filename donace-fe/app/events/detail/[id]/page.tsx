import EventDetails from "@/components/event-detail/event-detail";
import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper gradient-background">
            <NavbarComponents />
            <div className="main">
                <EventDetails id={params.id}/>
            </div>
            <div className="footer">
                <FooterPage />
            </div>
        </div>
    )
}