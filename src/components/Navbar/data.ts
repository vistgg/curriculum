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
    name: "nav.home",
    href: "/",
    Icon: Home
  },
  {
    name: "nav.new-cv",
    href: "/cv/new",
    Icon: FilePlus
  }
];
