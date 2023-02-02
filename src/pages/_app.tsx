import { Suspense } from "react";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import { Loading } from "@lightbringer/components/Loading";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function App({ Component, pageProps: { ...pageProps } }: AppProps) {
	return (
		<div className={`${inter.variable} bg-background font-sans`}>
			<Head>
				<title>Loading - Lightbringer</title>
				<meta
					name="description"
					content=""
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta
					name="monetag"
					content={process.env.NEXT_PUBLIC_MONETAG}
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<div className="flex h-screen flex-1 flex-col overflow-y-auto">
				<Suspense fallback={<Loading />}>
					{/* <SessionProvider session={session}> */}
					{/* <Navbar /> */}
					<main className="container m-auto flex flex-1 p-5">
						<Component {...pageProps} />
					</main>
					{/* <Footer /> */}
					{/* </SessionProvider> */}
				</Suspense>
				<div className="flex flex-col justify-evenly bg-zinc-300 p-6 text-center lg:flex-row">
					<span className="text-zinc-600 hover:text-zinc-800">
						Feito por{" "}
						<a
							target="_blank"
							href="https://github.com/ivopr"
							rel="noreferrer"
						>
							@ivopr
						</a>
					</span>
					<span className="text-zinc-600 hover:text-zinc-800">
						<a
							target="_blank"
							href="mailto:ivopr@proton.me"
							rel="noreferrer"
						>
							Contato/Suporte: ivopr@proton.me
						</a>
					</span>
				</div>
			</div>

			{process.env.NODE_ENV === "production" ? (
				// <!-- Google tag (gtag.js) -->
				<>
					<Script
						strategy="lazyOnload"
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
					/>

					<Script
						id="ga4"
						strategy="lazyOnload"
					>
						{`
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
							page_path: window.location.pathname,
							});
						`}
					</Script>
					<Script
						id="ads"
						strategy="lazyOnload"
					>
						{`
							(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5692178,document.body||document.documentElement)
						`}
					</Script>
				</>
			) : null}
		</div>
	);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default App;
