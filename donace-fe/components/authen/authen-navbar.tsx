"use client";
import { useSession } from "next-auth/react";

import NavbarComponents from "@/components/navbar";

interface AuthenNavbarProps {
    children?: React.ReactNode;
}

export default function AuthenNavbar({ children }: AuthenNavbarProps) {
    const { data: session } = useSession();
    return (
        <div className="page-wrapper p-0 m-0">
            {
                session ? <NavbarComponents /> : <NavbarComponents variant="landing" />
            }
            <div className="main">
                {children}
            </div>
        </div>
    )
}

