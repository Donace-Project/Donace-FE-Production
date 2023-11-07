export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Donace",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Events",
			href: "/home",
		},
		{
			label: "Calendars",
			href: "/calendars"
		},
		{
			label: "Explore",
			href: "/explore"
		},
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/Donace-Project",
		twitter: "https://twitter.com/getnextui",
		docs: "https://www.notion.so/Donace-T-ng-quan-29499fa07cac4c098c0bf42cff887173",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
