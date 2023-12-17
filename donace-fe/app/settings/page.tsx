
import SettingLandingPage from "@/components/settings-page/settings-ladingpage";

import Authorization from "@/components/authen/authentication";

export default function Page() {

    return (
        <Authorization >
     
                    <SettingLandingPage />
               
        </Authorization>
    )
}