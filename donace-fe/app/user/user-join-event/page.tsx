import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";
import JoinEvent from "@/components/user/user-join-event/joinEvent";

export default function Page(){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <JoinEvent/>
            </div>
            <div className="footer">
                <FooterPage/>
            </div>
        </div>
    )
}