module.exports = {
	// debug: process.env.NODE_ENV === "development",
	i18n: {
		defaultLocale: "pt-BR",
		locales: ["pt-BR"], // add en-US later
		reloadOnPrerender: process.env.NODE_ENV === "development"
	}
};
