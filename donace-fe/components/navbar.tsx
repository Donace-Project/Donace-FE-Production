import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Bell, CalendarRange, Compass, GraduationCap, Ticket } from "lucide-react";
import React from "react";
import { SearchIcon } from "./icons";
import { Avatar } from "@nextui-org/avatar";

export default function NavbarComponents() {
	return (
		<Navbar position="sticky" isBordered maxWidth="full" className="backdrop-blur-lg p-[0.75rem_1rem] flex justify-between items-center" >
			<NavbarBrand as={"div"}>
				<Link href="/home" aria-label="Donace Home" underline="none" className="relative z-[1] transition-global cursor-pointer">
					<NavbarContent className="logo-light transition-global flex items-center">
						<GraduationCap className="w-5 h-5 block align-middle" />
						<span className="font-medium text-base">Donace</span>
					</NavbarContent>
				</Link>
				<NavbarContent as={"div"} className="center-wrapper flex justify-between items-center flex-1 max-w-[820px] min-w-0">
					<NavbarItem className="center-links gap-6 p-[0px_1rem] text-sm flex items-baseline max-width-global m-[0_auto]">
						<Link href="/home" className="text-black-blur-light-theme font-medium">
							<NavbarContent as={"div"} className="gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)] ">
								<NavbarItem as={"div"} className="icon">
									<Ticket className="block w-4 h-4 align-middle mt-0.5" />
								</NavbarItem>
								<NavbarItem as={"div"} className="label">Events</NavbarItem>
							</NavbarContent>
						</Link>
						<Link href="/calendars" className="text-black-blur-light-theme font-medium ">
							<NavbarContent as={"div"} className="gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)]">
								<NavbarItem as={"div"} className="icon">
									<CalendarRange className="block w-4 h-4 align-middle mt-0.5" />
								</NavbarItem>
								<NavbarItem as={"div"} className="label">Calendars</NavbarItem>
							</NavbarContent>
						</Link>
						<Link href="/explore" className="text-black-blur-light-theme font-medium ">
							<NavbarContent as={"div"} className="gap-2 flex items-center transition-all duration-300 ease-in-out hover:text-[rgb(19,21,23)]">
								<NavbarItem as={"div"} className="icon">
									<Compass className="block w-4 h-4 align-middle mt-0.5" />
								</NavbarItem>
								<NavbarItem as={"div"} className="label">Explore</NavbarItem>
							</NavbarContent>
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent as={"div"} className="right-wrapper flex items-center gap-4" justify="end">
					<NavbarItem as={"div"} className="text-black-blur-light-theme text-sm">ĐÂY LÀ THỜI GIAN</NavbarItem>
					<Link href="/create" className="text-black-more-blur-light-theme relative transition-all duration-300 ease-in-out font-medium rounded-lg justify-center flex items-center cursor-pointer" underline="none">
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
					<Button className="lux-menu-trigger-wrapper	cursor-pointer notification-bell-button relative text-black-blur-light-theme transition-all duration-300 ease-in-out inline-flex min-w-0 font-medium rounded-lg bg-transparent border border-solid border-transparent leading-6 text-inherit">
						<NavbarContent as={"div"} className="cursor-pointer inline-flex min-w-0">
							<NavbarItem as={"div"} className="inline-flex relative">
								<NavbarItem as={"div"} className="icon">
									<Bell className="block w-4 h-4 align-middle"/>
									{/* <NavbarItem as={"div"} className="unread-dot"></NavbarItem> */}
								</NavbarItem>
							</NavbarItem>
						</NavbarContent>
					</Button>
					<NavbarItem as={"div"} className="avatar-wrapper -m-2 p-2 cursor-pointer transition-all duration-300 ease-in-out inline-flex min-w-0 items-center">
						<Avatar src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" radius="full" name="Donace" isBordered className="w-[28px] h-[28px] bg-center bg-cover bg-white relative"/>
					</NavbarItem>
				</NavbarContent>
			</NavbarBrand>
		</Navbar>
	);
}
