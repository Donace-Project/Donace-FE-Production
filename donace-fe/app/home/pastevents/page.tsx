import FooterPage from "@/components/footerInPage";
import HomePastEvent from "@/components/home/past-event";
import NavbarComponents from "@/components/navbar";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <HomePastEvent />
            </div>
            <div className="footer">
                <FooterPage />
            </div>
        </div>
    )
}