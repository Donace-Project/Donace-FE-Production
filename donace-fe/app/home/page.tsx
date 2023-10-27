import FooterPage from "@/components/footerInPage";
import HomeEvents from "@/components/home/home";
import NavbarComponents from "@/components/navbar";
export default function HomePage() {
    return (
        <div className="page-wrapper">
            <div className="">
                <HomeEvents/>
            </div>
            <div>
                <FooterPage/>
            </div>
        </div>
    )
}