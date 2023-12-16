import NavbarComponents from "@/components/navbar";
import ProfilePage from "@/components/profile-page/profile";
import Authorization from "@/components/authen/authentication";

export default function Page() {
    return (
        <Authorization>
            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <ProfilePage />
                </div>
            </div>
        </Authorization>

    )
}