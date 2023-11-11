import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { GraduationCap } from "lucide-react";
import ThoiGian from "./clock/clock";
import { Button } from "@nextui-org/button";

export default function NavbarLanding() {
    return (
        <Navbar
            position="static"
            maxWidth="full"
            className="p-[0.75rem_1rem] flex justify-between items-center h-20 bg-transparent"
        >
            <NavbarBrand>
                <Link
                    href="/"
                    aria-label="Donace Home"
                    underline="none"
                    className="relative z-[1] transition-global cursor-pointer"
                    target="_self"
                >
                    <NavbarContent className="logo-light transition-all duration-300 ease-in-out flex items-center">
                        <GraduationCap className="dark:text-[hsla(0,0%,100%,.5)] w-5 h-5 block align-middle text-black-blur-light-theme" />
                    </NavbarContent>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="end" className="flex items-center">
                <div className="text-[hsla(0,0%,100%,.5)] text-sm relative">
                    <ThoiGian />
                </div>
                <div className="m-[-4px_0]">
                    <Link 
                        href="/auth/login"
                        className="text-black-more-blur-light-theme bg-[rgba(255,255,255,0.18)] rounded-full border-transparent border border-solid transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
                        underline="none"
                    >
                        <div className="label">Đăng nhập</div>
                    </Link>
                </div>
            </NavbarContent>
        </Navbar>
    )
}