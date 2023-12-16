import NavbarComponents from "@/components/navbar";
import SettingLandingPage from "@/components/settings-page/settings-ladingpage";

import Authorization from "@/components/authen/authentication";

export default function Page() {

    return (
        <Authorization >
            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <SettingLandingPage />
                </div>
            </div>
        </Authorization>
    )
}