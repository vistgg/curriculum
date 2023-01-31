import { Suspense } from "react";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import { Loading } from "@lightbringer/components/Loading";
import Navbar from "@lightbringer/components/Navbar";

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

			<div className="flex h-screen flex-1 flex-col overflow-y-auto">
				<Suspense fallback={<Loading />}>
					<SessionProvider session={session}>
						<Navbar />
						<main className="container m-auto flex flex-1 p-5">
							<Component {...pageProps} />
						</main>
						{/* <Footer /> */}
					</SessionProvider>
				</Suspense>
			</div>
		</div>
	);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default App;
