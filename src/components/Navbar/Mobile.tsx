import { FC } from "react";
import { Popover } from "@headlessui/react";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { links } from "./data";

const MobileNavbar: FC = () => {
	const location = useRouter();

	return (
		<div className="divide-y-2 divide-primary-50 rounded-lg bg-primary-800 shadow-lg ring-1 ring-white/5">
			<div className="px-5 pt-5 pb-6">
				<div className="flex items-center justify-between">
					<Popover.Button
						as={Link}
						legacyBehavior={false}
						href="/"
					>
						<span className="text-xl font-semibold text-primary-100 subpixel-antialiased">
							Lightbringer
						</span>
					</Popover.Button>
					<div className="-mr-2">
						<Popover.Button className="inline-flex items-center justify-center rounded-md bg-primary-900 p-2 text-gray-400 hover:bg-primary-700 hover:text-primary-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
							<span className="sr-only">Close menu</span>
							<X
								className="h-6 w-6"
								aria-hidden="true"
							/>
						</Popover.Button>
					</div>
				</div>
				<nav className="grid gap-y-8">
					{links.map(({ Icon, ...rest }) => (
						<Popover.Button
							key={rest.href}
							as={Link}
							{...rest}
						>
							<span
								className={`${
									location.pathname === rest.href
										? "text-primary-50 hover:text-primary-100"
										: "text-primary-200 hover:text-primary-100"
								}
                  prose flex gap-2 font-medium`}
							>
								<Icon className="h-5 w-5" />
								{rest.name}
							</span>
						</Popover.Button>
					))}
				</nav>
			</div>
		</div>
	);
};

export default MobileNavbar;
