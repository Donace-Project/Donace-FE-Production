"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { NavLink } from "react-router-dom";
import { Bell, CalendarRange, Compass, Contact2, GraduationCap, LogOut, Settings, Ticket } from "lucide-react";
import { SearchIcon } from "./icons";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { ThemeSwitchWithText } from "./theme-switch";
import ThoiGian from "./clock/clock";

export default function NavbarComponents() {
	return (
		<Navbar position="sticky" isBordered maxWidth="full" className="backdrop-blur-lg p-[0.75rem_1rem] flex justify-between items-center" >
			<NavbarBrand as={"div"}>
				<Link href="/home" aria-label="Donace Home" underline="none" className="relative z-[1] transition-global cursor-pointer">
					<NavbarContent className="logo-light transition-all duration-300 ease-in-out flex items-center">
						<GraduationCap className="dark:text-[hsla(0,0%,100%,.5)] w-5 h-5 block align-middle text-black-blur-light-theme" />
						<span className="dark:text-[hsla(0,0%,100%,.5)] font-medium text-base text-black-blur-light-theme">Donace</span>
					</NavbarContent>
				</Link>
				<NavbarContent as={"div"} className="center-wrapper flex justify-between items-center flex-1 max-w-[820px] min-w-0">
					<NavbarItem className="center-links gap-6 p-[0px_1rem] text-sm flex items-baseline max-width-global m-[0_auto]">
						<Link href="/home" className="dark:text-[hsla(0,0%,100%,.5)] text-black-blur-light-theme font-medium">
							<NavbarContent as={"div"} className="dark:hover:text-[#fff] gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)] ">
								<NavbarItem as={"div"} className="icon">
									<Ticket className="block w-4 h-4 align-middle mt-0.5" />
								</NavbarItem>
								<NavbarItem as={"div"} className="label">Events</NavbarItem>
							</NavbarContent>
						</Link>
						<Link href="/calendars" className="dark:text-[hsla(0,0%,100%,.5)] text-black-blur-light-theme font-medium ">
							<NavbarContent as={"div"} className="dark:hover:text-[#fff] gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)]">
								<NavbarItem as={"div"} className="icon">
									<CalendarRange className="block w-4 h-4 align-middle mt-0.5" />
								</NavbarItem>
								<NavbarItem as={"div"} className="label">Calendars</NavbarItem>
							</NavbarContent>
						</Link>
						<Link href="/explore" className="dark:text-[hsla(0,0%,100%,.5)] text-black-blur-light-theme font-medium ">
							<NavbarContent as={"div"} className="dark:hover:text-[#fff] gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)]">
								<NavbarItem as={"div"} className="icon">
									<Compass className="block w-4 h-4 align-middle mt-0.5" />
								</NavbarItem>
								<NavbarItem as={"div"} className="label">Explore</NavbarItem>
							</NavbarContent>
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent as={"div"} className="right-wrapper flex items-center gap-4" justify="end">
					<NavbarItem as={"div"} className="dark:text-[hsla(0,0%,100%,.5)] text-black-blur-light-theme text-sm">
						<ThoiGian/>
					</NavbarItem>
					<Link href="/create" className="dark:text-[hsla(0,0%,100%,.79)] text-black-more-blur-light-theme relative transition-all duration-300 ease-in-out font-medium rounded-lg justify-center flex items-center cursor-pointer" underline="none">
						<NavbarItem as={"div"} className="text-sm whitespace-nowrap">
							Create
							<span> Event</span>
						</NavbarItem>
					</Link>
					<Input
						classNames={{
							base: "max-w-full sm:max-w-[10rem] h-10",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Type to search..."
						size="sm"
						startContent={<SearchIcon size={18} />}
						type="search"
					/>
					<Dropdown>
						<DropdownTrigger>
							<Button className="lux-menu-trigger-wrapper	cursor-pointer notification-bell-button relative text-black-blur-light-theme transition-all duration-300 ease-in-out inline-flex min-w-0 font-medium rounded-lg bg-transparent border border-solid border-transparent leading-6 text-inherit">
								<NavbarContent as={"div"} className="cursor-pointer inline-flex min-w-0">
									<NavbarItem as={"div"} className="inline-flex relative">
										<NavbarItem as={"div"} className="icon">
											<Bell className="block w-4 h-4 align-middle" />
										</NavbarItem>
									</NavbarItem>
								</NavbarContent>
							</Button>
						</DropdownTrigger>
						<DropdownMenu className="dark:bg-[rgba(33,35,37,0.8)] w-80 max-w-[300px] min-h-[300px] max-h-[60vh] overflow-auto">
							<DropdownItem className="text-sm">
								<div className="noti-row relative p-[0.875rem_1rem]">
									<Link href="/my-calendars" className="text-inherit transition-all duration-300 ease-in-out cursor-pointer" underline="none">
										<div className="gap-3 flex items-start">
											<div className="icon-wrapper relative mt-0.5">
												<div className="avatar">
													<Avatar isBordered color="primary" radius="full" src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="relative" />
												</div>
											</div>
											<div className="main break-words min-w-0 flex-1 flex flex-col">
												<div>
													<span>
														<strong>Donace </strong>
														registered for
														<br />
														<strong className="font-medium">Do an Tot Nghiep</strong>
													</span>
													<br />
													<span className="dark:text-[hsla(0,0%,100%,.5)] text-black-blur-light-theme">Sep 5</span>
												</div>
											</div>
										</div>
									</Link>
								</div>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<NavbarItem as={"div"} className="avatar-wrapper -m-2 p-2 cursor-pointer transition-all duration-300 ease-in-out inline-flex min-w-0 items-center">
						<Dropdown className="dark:bg-[rgba(33,35,37,0.8)] shadow-sm relative rounded-lg border border-solid border-[rgba(19,21,23,0.08)] overflow-auto">
							<DropdownTrigger>
								<Avatar src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" radius="full" name="Donace" isBordered className="w-[28px] h-[28px] bg-center bg-cover bg-white relative" />
							</DropdownTrigger>
							<DropdownMenu as={"div"} className="switcher-menu">
								<DropdownSection as={"div"} showDivider>
									<DropdownItem as={"div"}>
										<Link href="/home" className="transition-all duration-300 ease-in-out cursor-pointer" underline="none">
											<div className="switcher-row cursor-pointer transition-all duration-300 ease-in-out flex items-center">
												<div className="avatar-wrapper">
													<Avatar isBordered src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" radius="full" name="Donace" className="w-[32px] h-[32px] bg-center bg-cover bg-[#fff] relative" />
												</div>
												<div className="min-w-0 flex-1">
													<div className="name dark:text-[#fff] font-medium overflow-hidden text-ellipsis whitespace-nowrap text-black-light-theme">Donace</div>
													<div className="desc text-xs gap-1 flex text-[rgba(19,21,23,0.36)]">
														<div className="gap-1 min-w-0 flex items-center">
															<div className="dark:text-[hsla(0,0%,100%,.5)] overflow-hidden text-ellipsis whitespace-nowrap min-w-0 flex-1">Personal</div>
														</div>
													</div>
												</div>
											</div>
										</Link>
									</DropdownItem>
								</DropdownSection>
								<DropdownItem as={"div"}>
									<div className="transition-all duration-300 ease-in-out cursor-pointer">
										<div className="menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center text-black-more-blur-light-theme">
											<ThemeSwitchWithText />
										</div>
									</div>
								</DropdownItem>
								<DropdownItem>
									<Link href="/profile" className="transition-all duration-300 ease-in-out cursor-pointer" underline="none">
										<div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center text-black-more-blur-light-theme">
											<Contact2 className="w-4 h-4 align-middle block mt-0.5"/>
											<span className=" flex-1 font-medium">View Profile</span>
										</div>
									</Link>
								</DropdownItem>
								<DropdownItem>
									<Link href="/settings" className="transition-all duration-300 ease-in-out cursor-pointer" underline="none">
										<div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center text-black-more-blur-light-theme">
											<Settings className="w-4 h-4 align-middle block mt-0.5" />
											<span className=" flex-1 font-medium">Settings</span>
										</div>
									</Link>
								</DropdownItem>
								<DropdownItem>
									<Link href="/" className="transition-all duration-300 ease-in-out cursor-pointer" underline="none">
										<div className="dark:text-[hsla(0,0%,100%,.79)] menu-row transition-all duration-300 ease-in-out text-sm gap-4 flex items-center text-black-more-blur-light-theme">
											<LogOut className="w-4 h-4 align-middle block mt-0.5" />
											<span className=" flex-1 font-medium ">Logout</span>
										</div>
									</Link>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				</NavbarContent>
			</NavbarBrand>
		</Navbar>
	)
}
