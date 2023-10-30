import NavbarComponents from "@/components/navbar";
import SettingLandingPage from "@/components/settings-page/settings";

export default function Page(){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <SettingLandingPage/>
            </div>
        </div>
    )
}