"use client";
import "@/styles/globals.css";
import React, { useState } from 'react';
import Home from "../page";
import useToken from '@/app/useToken';
import SignIn from "@/components/login/signIn";

export default function Page() {
    const { token, setToken } = useToken();
    // if(!token) {
    // 	return <Home setToken={setToken} />
    //   }
    return (
        <div className="page-wrapper gradient-background">
            <SignIn setToken={setToken}/>
        </div>
    )
}