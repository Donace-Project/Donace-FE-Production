
import ProfilePage from "@/components/profile-page/profile";
import Authorization from "@/components/authen/authentication";

export default function Page() {
    return (
        <Authorization>
           
                    <ProfilePage />
            
        </Authorization>

    )
}