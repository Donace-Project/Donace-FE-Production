import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";
import JoinEvent from "@/components/user/user-join-event/joinEvent";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <JoinEvent id={params.id} />
            </div>
            <div className="footer">
                <FooterPage />
            </div>
        </div>
    )
}