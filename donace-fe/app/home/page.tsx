import FooterPage from "@/components/footerInPage";
import HomeEvents from "@/components/home/home";
import NavbarComponents from "@/components/navbar";
import Authorization from "@/components/author/authorization";

export default function HomePage() {


    return (
        <Authorization >

            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <HomeEvents />
                </div>
                <div className="footer">
                    <FooterPage />
                </div>
            </div>
        </Authorization>
    )
}