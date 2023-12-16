"use client"
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { GraduationCap } from "lucide-react";
import ThoiGian from "./clock/clock";
import { ThemeSwitch } from "./theme-switch";
import { usePathname } from 'next/navigation';
import { Button } from "@nextui-org/button";

import LogoDonace from "@/public/doanLogo.png";

export default function NavbarLanding() {
  const pathname = usePathname()
  return (
    <Navbar
      position="static"
      maxWidth="full"
      title="Donace"
      className="p-4 flex flex-row justify-between items-center h-14 bg-transparent backdrop-blur-lg shadow-medium"
    >
      <NavbarBrand>
        <Link
          href="/"
          aria-label="Donace Home"
          underline="none"
          className="relative z-[1] transition-global cursor-pointer sm:justify-start"
          target="_self"
        >
          <NavbarContent className="logo-light transition-all duration-300 ease-in-out flex items-center">
            <img src={LogoDonace.src} className="w-8 h-8 rounded-full" />

          </NavbarContent>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className="flex items-center">
        {/* @ts-ignore */}
        <div className=" text-sm">
          {/* <ThoiGian /> */}
        </div>
        {
          pathname == "/auth/login" ?
            <div className="m-[-4px_0]  ">
              <Link
                href="/auth/register"
                underline="none"
                color="foreground"
              >
              <Button variant="shadow" className="bg-white dark:bg-slate-800">
                  <div className="label p-4 font-bold text-foreground-900">Đăng ký</div>
                </Button>
              </Link>
            </div> :
            <div className="m-[-4px_0]  ">
              <Link
                href="/auth/login"

                color="foreground"
                underline="none"
              >
                <Button variant="shadow" className="bg-white dark:bg-slate-800">
                  <div className="label p-4 font-bold text-foreground-900">Đăng nhập</div>
                </Button>
              </Link>
            </div>
        }

        <Button className="md:hidden min-w-unit-10 bg-white  dark:bg-slate-800" variant="shadow" >
          <ThemeSwitch variant="default" />
        </Button>
        <Button className="hidden md:flex items-center bg-white  dark:bg-slate-800" variant="shadow">
          <ThemeSwitch variant="withText" />
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
