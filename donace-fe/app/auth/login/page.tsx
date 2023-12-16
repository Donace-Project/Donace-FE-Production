"use client";
import "@/styles/globals.css";
import React from 'react';
import SignIn from "@/components/login/signIn";
import NavbarLanding from "@/components/navbarLandingPage";
export default function Page() {
    return (
        <div className="page-wrapper bg-gradient-to-tr from-orange-600 via-white to-pink-500 dark:from-indigo-600 dark:via-purple-500 dark:to-pink-500">
            <NavbarLanding />
            <div className="main">
                <SignIn />
            </div>
        </div>
    )
}
