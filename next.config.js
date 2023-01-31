// eslint-disable-next-line @typescript-eslint/no-var-requires

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["https://wiejaeruigokkpsyvbcf.supabase.co"]
	}
};

module.exports = nextConfig;
