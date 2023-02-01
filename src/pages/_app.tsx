import { Suspense } from "react";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

import { Loading } from "@lightbringer/components/Loading";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>

			<Script
				async
				strategy="afterInteractive"
				onError={(e) => {
					console.error("Script failed to load", e);
				}}
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5180240693126418"
			/>
			<div className="flex h-screen flex-1 flex-col overflow-y-auto">
				<Suspense fallback={<Loading />}>
					<SessionProvider session={session}>
						{/* <Navbar /> */}
						<main className="container m-auto flex flex-1 p-5">
							<Component {...pageProps} />
						</main>
						{/* <Footer /> */}
					</SessionProvider>
				</Suspense>
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
				</>
			) : null}
		</div>
	);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default App;
