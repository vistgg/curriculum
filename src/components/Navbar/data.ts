import { FilePlus, Home, LucideIcon } from "lucide-react";

type LinkProp = {
	name: string;
	href: string;
	Icon: LucideIcon;
	target?: string;
	rel?: string;
};

export const links: LinkProp[] = [
	{
		name: "Início",
		href: "/",
		Icon: Home
	},
	{
		name: "Novo CV",
		href: "/novo",
		Icon: FilePlus
	}
];
