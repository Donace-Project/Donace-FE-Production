"use client";

import { SessionProvider } from "next-auth/react";

export const CustomProviders = ({ children }) => {
    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}