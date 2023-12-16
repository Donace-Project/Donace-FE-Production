import "@/styles/globals.css";
import React from 'react';
import SignIn from "@/components/login/signIn";
import NavbarLanding from "@/components/navbarLandingPage";
export default function Page() {
    return (
        <div className="page-wrapper bg-gradient-to-tr from-[#feb2b2] via-[#fbd38d] to-[#90cdf4] dark:from-[#2d3748] dark:via-[#2c7a7b] dark:to-[#ff9233]">
            <NavbarLanding />
            <div className="main">
                <SignIn />
            </div>
        </div>
    )
}

// #2d3748, #2c7a7b, #ff9233
// #feb2b2, #fbd38d, #90cdf4