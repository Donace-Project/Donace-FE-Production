import React from "react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import {
	GithubIcon,
	SearchIcon,
} from "@/components/icons";
import { Bell, FileCode2, GraduationCap } from "lucide-react";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar position='sticky' maxWidth="full" isBordered className="spread p-[0.75rem_1rem] z-[200] flex justify-between items-center">
			<NavbarContent className="basis-1/5 sm:basis-full">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="relative z-[1] transition-global cursor-pointer no-underline" href="/">
						<GraduationCap className="light w-5 h-5 block align-middle" />
					</NextLink>
					<NextLink href="/">
						<p className="font-bold text-inherit ">Donace</p>
					</NextLink>
				</NavbarBrand>

				<ul className="hidden lg:flex gap-4 justify-center ml-44">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent as={"div"}
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.docs} aria-label="Docs">
						<FileCode2 className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
						as={Link}
						isExternal
						className="text-sm font-normal text-default-600 cursor-pointer notification-bell-button relative transition-global inline-flex min-w-0 rounded-lg button-reset bg-transparent border border-solid border-transparent leading-6 text-inherit " >
						<Bell className="block w-4 h-4 align-middle mt-[0.175rem]" />
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Dropdown>
						<DropdownTrigger>
							<Avatar size="sm"
								isBordered
								color="default"
								as="button"
								src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							<DropdownItem key="new">New file</DropdownItem>
							<DropdownItem key="copy">Copy link</DropdownItem>
							<DropdownItem key="edit">Edit file</DropdownItem>
							<DropdownItem key="delete" className="text-danger" color="danger">
								Delete file
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
