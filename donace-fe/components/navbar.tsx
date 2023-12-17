"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import {
  CalendarRange,
  Compass,
  Contact2,
  GraduationCap,
  LogOut,
  Settings,
  Ticket,
} from "lucide-react";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { ThemeSwitch } from "./theme-switch";
import ThoiGian from "./clock/clock";
import { authHelper } from "../helpers/authHelper";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AppUser } from "../types/DonaceType";

import LogoDonace from "@/public/doanLogo.png";
import { Button } from "@nextui-org/button";
interface MenuItems {
  icon?: string;
  name: string;
  path: string;

}
// export interface NavbarProps {
// 	className?: string;
// 	classNames?: SwitchProps["classNames"];
// 	variant?: 'default' | 'withText'; // Add a variant prop
// }

interface NavbarProps {
  variant?: "default" | "landing" | "after"; // Add a variant prop
}

export default function NavbarComponents({
  variant = "default",
}: NavbarProps) {
  const page = usePathname()?.split("/")[1];
  const pathname = usePathname();
  let { data: session, status: status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let [user, setUser] = useState<null | AppUser>(null);
  useEffect(() => {
    if (status === "authenticated") {
      authHelper.saveToken(session?.token);
      setUser(session?.user as any);
    }
  }, [status]);

  const items: MenuItems[] = [
    { icon: "home", name: "Trang chủ", path: "home" },
    { icon: "calendar-check", name: "Sự kiện", path: "home" },
    { icon: "tv-2", name: "Khám phá", path: "explore" },
    { icon: "calendar-days", name: "Lịch", path: "calendars" },
    { icon: "calendar-plus", name: "Tạo sự kiện", path: "create" }];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nextauth.message");
    signOut({
      redirect: true,
      callbackUrl: "/auth/login",
    });
  };

  return (
    <div className="sticky top-0 z-50 ">
      {
        variant === "landing" ? (
          <Navbar
            position="static"
            maxWidth="full"
            title="Donace"
            className="p-4 flex flex-row justify-between items-center h-20 bg-transparent backdrop-blur-lg shadow-medium"
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
        ) : (
          <>
            <Navbar
              maxWidth="full"
              className="p-2 hidden justify-between h-20 md:flex items-center bg-transparent backdrop-blur-lg shadow-medium"
            >
              <NavbarBrand as={"div"}>
                <Link
                  color="foreground"
                  href="/home"

                  aria-label="Donace Home"
                  underline="none"
                  className="transition-global cursor-pointer"
                >
                  <NavbarContent className="transition-all duration-300 ease-in-out flex items-center justify-between hover:text-[rgb(19,21,23)] dark:hover:text-[#fff]">
                    <img src={LogoDonace.src} className="w-8 h-8 rounded-full" />
                    {/* <p className="font-semibold text-2xl ">
                Donace
              </p> */}
                  </NavbarContent>
                </Link>
                <NavbarContent
                  as={"div"}
                  className="center-wrapper flex justify-between items-center flex-1 max-w-[820px] min-w-0 pl-11"
                >
                  <NavbarItem className="center-links gap-6 px-1 text-sm flex items-baseline max-width-global mx-auto">
                    <Link
                      color="foreground"
                      href="/home"
                      className="font-medium"
                    >
                      <NavbarContent
                        as={"div"}
                        className={`${page === "home" ? "text-[rgb(19,21,23)] dark:text-[#fff]" : ""
                          } dark:hover:text-[#fff] gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)] `}
                      >
                        <NavbarItem as={"div"} className="icon">
                          <Ticket className="block w-4 h-4 align-middle mt-0.5" />
                        </NavbarItem>
                        <NavbarItem as={"div"} className="label">
                          Sự kiện
                        </NavbarItem>
                      </NavbarContent>
                    </Link>
                    <Link
                      color="foreground"
                      href="/calendars"
                      className={`font-medium`}
                    >
                      <NavbarContent
                        as={"div"}
                        className={`${page === "calendars"
                          ? "text-[rgb(19,21,23)] dark:text-[#fff]"
                          : ""
                          } dark:hover:text-[#fff] gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)]`}
                      >
                        <NavbarItem as={"div"} className="icon">
                          <CalendarRange className="block w-4 h-4 align-middle mt-0.5" />
                        </NavbarItem>
                        <NavbarItem as={"div"} className="label">
                          Lịch
                        </NavbarItem>
                      </NavbarContent>
                    </Link>
                    <Link
                      href="/explore"
                      color="foreground"
                      className="font-medium "
                    >
                      <NavbarContent
                        as={"div"}
                        className={`${page === "explore"
                          ? "text-[rgb(19,21,23)] dark:text-[#fff]"
                          : ""
                          } dark:hover:text-[#fff] gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)]`}
                      >
                        <NavbarItem as={"div"} className="icon">
                          <Compass className="block w-4 h-4 align-middle mt-0.5" />
                        </NavbarItem>
                        <NavbarItem as={"div"} className="label">
                          Khám phá
                        </NavbarItem>
                      </NavbarContent>
                    </Link>
                  </NavbarItem>
                </NavbarContent>
                <NavbarContent
                  as={"div"}
                  className="right-wrapper flex items-center gap-4"
                  justify="end"
                >
                  <NavbarItem
                  >
                    {/* @ts-ignore */}
                    {/* <ThoiGian /> */}
                  </NavbarItem>
                  <Link
                    href="/create"
                    color="foreground"

                    className="hover:text-[rgb(19,21,23)] dark:hover:text-[#fff] relative transition-all duration-300 ease-in-out font-medium rounded-lg justify-center flex items-center cursor-pointer"
                    underline="none"
                  >
                    <Button
                    variant="ghost"
                      color="warning"
                    >
                      <NavbarItem as={"div"} className="text-sm text-foreground-900 font-bold whitespace-nowrap">
                        <span> Tạo sự kiện</span>
                      </NavbarItem>
                    </Button>
                  </Link>
                  <NavbarItem
                    as={"div"}
                    className="avatar-wrapper  p-2 cursor-pointer transition-all duration-300 ease-in-out inline-flex min-w-0 items-center"
                  >
                    <Dropdown className="dark:bg-[rgba(33,35,37,0.8)] shadow-sm rounded-lg border border-solid border-[rgba(19,21,23,0.08)] overflow-auto">
                      <DropdownTrigger>
                        <Avatar
                          src={
                            user?.avatar?.trim()
                              ? user.avatar
                              : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"
                          }
                          radius="full"
                          name="Donace"
                          className="w-8 h-8 bg-center bg-cover bg-white"
                        />
                      </DropdownTrigger>
                      <DropdownMenu as={"div"} className="switcher-menu">
                        <DropdownSection as={"div"} showDivider>
                          <DropdownItem as={"div"}>
                            <Link
                              color="foreground"
                              href="/profile"
                              className="transition-all duration-300 ease-in-out cursor-pointer"
                              underline="none"
                            >
                              <div className="switcher-row cursor-pointer transition-all duration-300 ease-in-out flex items-center">
                                <div className="avatar-wrapper">
                                  <Avatar
                                    isBordered
                                    radius="full"
                                    src={
                                      user?.avatar?.trim()
                                        ? user.avatar
                                        : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"
                                    }
                                    name="Donace"
                                    className="w-[32px] h-[32px] bg-center bg-cover relative"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="name dark:text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap  max-w-[180px]">
                                    {user?.userName}
                                  </div>
                                  <div className="desc text-xs gap-1 flex text-[rgba(19,21,23,0.36)]">
                                    <div className="gap-1 min-w-0 flex items-center">
                                      <div className="dark:text-[hsla(0,0%,100%,.5)] overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex-1">
                                        Cá nhân
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </DropdownItem>
                        </DropdownSection>
                        <DropdownItem as={"div"}>
                          <div className="transition-all duration-300 ease-in-out cursor-pointer">
                            <div className="menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                              <ThemeSwitch variant="withText" />
                            </div>
                          </div>
                        </DropdownItem>
                        <DropdownItem>
                          <Link

                            href="/profile"
                            color="foreground"
                            className="transition-all duration-300 ease-in-out cursor-pointer"
                            underline="none"
                          >
                            <div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                              <Contact2 className="w-4 h-4 align-middle block mt-0.5" />
                              <span className=" flex-1 font-medium">Trang cá nhân</span>
                            </div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            href="/settings"
                            className="transition-all duration-300 ease-in-out cursor-pointer"
                            underline="none"
                            color="foreground"
                          >
                            <div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                              <Settings className="w-4 h-4 align-middle block mt-0.5" />
                              <span className=" flex-1 font-medium">Cài đặt</span>
                            </div>
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            onClick={handleLogout}
                            href="/auth/login"
                            color="foreground"
                            className="transition-all duration-300 ease-in-out cursor-pointer"
                            underline="none"
                          >
                            <div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                              <LogOut className="w-4 h-4 align-middle block mt-0.5" />
                              <span className=" flex-1 font-medium">Đăng xuất</span>
                            </div>
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavbarItem>
                </NavbarContent>
              </NavbarBrand>
            </Navbar>
            <Navbar onMenuOpenChange={setIsMenuOpen} className="md:hidden flex items-center bg-transparent backdrop-blur-lg shadow-medium ">
              <NavbarContent>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
                />
                <NavbarBrand>
                  <Link
                    href="/home"
                    aria-label="Donace Home"
                    underline="none"
                    className="relative z-[1] transition-global cursor-pointer"
                  >
                    <NavbarContent className="logo-light transition-all duration-300 ease-in-out flex items-center">
                      {/* <GraduationCap className="dark:text-[hsla(0,0%,100%,.5)] w-5 h-5 block align-middle " /> */}

                      <img src={LogoDonace.src} className="w-8 h-8 rounded-full" />
                      <p className="dark:text-[#ffffff] font-semibold text-2xl ">
                        Donace
                      </p>
                    </NavbarContent>
                  </Link>
                </NavbarBrand>
              </NavbarContent>
              <NavbarContent justify="end">
                <NavbarItem>
                  <Dropdown className="dark:bg-[rgba(33,35,37,0.8)] shadow-sm relative rounded-lg border border-solid border-[rgba(19,21,23,0.08)] overflow-auto">
                    <DropdownTrigger>
                      <Avatar
                        src={
                          user?.avatar?.trim()
                            ? user.avatar
                            : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"
                        }
                        radius="full"
                        name="Donace"
                        className="w-[28px] h-[28px] bg-center bg-cover bg-white relative"
                      />
                    </DropdownTrigger>
                    <DropdownMenu as={"div"} className="switcher-menu">
                      <DropdownSection as={"div"} showDivider>
                        <DropdownItem as={"div"}>
                          <Link
                            href="/profile"
                            className="transition-all duration-300 ease-in-out cursor-pointer w-full border-none flex items-center justify-start"
                            underline="none"
                          >
                            <div className="switcher-row cursor-pointer transition-all duration-300 ease-in-out flex items-center">
                              <div className="avatar-wrapper">
                                <Avatar
                                  isBordered
                                  radius="full"
                                  src={
                                    user?.avatar?.trim()
                                      ? user.avatar
                                      : "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=32,height=32/avatars-default/avatar_8.png"
                                  }
                                  name="Donace"
                                  className="w-[32px] h-[32px] bg-center bg-cover bg-[#fff] relative"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="name dark:text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap  max-w-[180px]">
                                  {user?.userName}
                                </div>
                                <div className="desc text-xs gap-1 flex text-[rgba(19,21,23,0.36)]">
                                  <div className="gap-1 min-w-0 flex items-center">
                                    <div className="dark:text-[hsla(0,0%,100%,.5)] overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex-1">
                                      Cá nhân
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </DropdownItem>
                      </DropdownSection>
                      <DropdownItem as={"div"}>
                        <div className="transition-all duration-300 ease-in-out cursor-pointer w-full border-none flex items-center justify-start">
                          <div className="menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                            <ThemeSwitch variant="withText" />
                          </div>
                        </div>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          href="/profile"
                          className="transition-all duration-300 ease-in-out cursor-pointer w-full border-none flex items-center justify-start"
                          underline="none"
                        >
                          <div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                            <Contact2 className="w-4 h-4 align-middle block mt-0.5" />
                            <span className=" flex-1 font-medium">Trang cá nhân</span>
                          </div>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link
                          href="/settings"
                          className="transition-all duration-300 ease-in-out cursor-pointer w-full border-none flex items-center justify-start"
                          underline="none"
                        >
                          <div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                            <Settings className="w-4 h-4 align-middle block mt-0.5" />
                            <span className=" flex-1 font-medium">Cài đặt</span>
                          </div>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Button
                          variant="ghost"
                          onClick={handleLogout}
                          className="transition-all bg-transparent duration-300 ease-in-out w-full border-none flex items-center justify-start px-3"
                        >
                          <div className="transition-all duration-300 ease-in-out text-sm gap-4 flex items-center ">
                            <LogOut className="w-4 h-4 align-middle block mt-0.5" />
                            <span className="font-medium">Đăng xuất</span>
                          </div>
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>
              </NavbarContent>
              <NavbarMenu>
                {items.map((item, index) => (
                  <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                      color={
                        index === 2 ? "primary" : index === items.length - 1 ? "danger" : "foreground"
                      }
                      className="w-full"
                      href={item.path}
                      size="lg"
                    >
                      <div className="flex flex-row justify-start gap-2">

                        {item.name}
                      </div>
                    </Link>
                  </NavbarMenuItem>
                ))}

              </NavbarMenu>
            </Navbar>
          </>
        )
      }
    </div >
  );
}
