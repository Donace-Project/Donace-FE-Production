import NavbarComponents from "@/components/navbar";
import ProfilePage from "@/components/profile-page/profile";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents/>
            <ProfilePage />
        </div>
    )
}