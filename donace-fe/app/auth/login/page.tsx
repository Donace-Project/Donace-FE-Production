"use client";
import "@/styles/globals.css";
import React from 'react';
import SignIn from "@/components/login/signIn";
export default function Page() {
    return (
        <div className="page-wrapper gradient-background">
            <div className="main">
                <SignIn />
            </div>
        </div>
    )
}
