import NavbarComponents from "@/components/navbar";
import ProfilePage from "@/components/profile-page/profile";
import Authorization from "@/components/author/authorization";

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