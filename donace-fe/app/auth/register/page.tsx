import NavbarLanding from "@/components/navbarLandingPage";
import SignUp from "@/components/register/signUp";

export default function Page() {
    return (
        <div className="page-wrapper gradient-background">
            <NavbarLanding/>
            <div className="main">
                <SignUp />
            </div>
        </div>
    )
}