"use client";
import "@/styles/globals.css";
import React, { useState } from 'react';
import SignIn from "@/components/login/signIn";

export default function Page() {
    return (
        <div className="page-wrapper gradient-background">
            <SignIn />
        </div>
    )
}
