"use client";
import "@/styles/globals.css";
import React from 'react';
import SignIn from "@/components/login/signIn";
import NavbarLanding from "@/components/navbarLandingPage";

export default function Page() {
    return (
        <div className="page-wrapper gradient-background">
            <NavbarLanding/>
            <div className="main">
                <SignIn />
            </div>
        </div>
    )
}
