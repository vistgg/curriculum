import { DetailedHTMLProps, HTMLAttributes } from "react";
import Head from "next/head";

type LayoutProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	title: string;
};

export function Layout({ children, title, ...rest }: Base<LayoutProps>) {
	return (
		<div {...rest}>
			<Head>
				<title>{title + " - Lightbringer"}</title>
			</Head>
			{children}
		</div>
	);
}
