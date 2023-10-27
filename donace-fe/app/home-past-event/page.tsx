import FooterPage from "@/components/footerInPage";
import HomePastEvent from "@/components/home/past-event";

export default function Page() {
    return (
        <div className="page-wrapper">
            <div className="main">
                <HomePastEvent/>
            </div>
            <div className="footer">
                <FooterPage/>
            </div>
        </div>
)
}