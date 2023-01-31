module.exports = {
	extends: [
		"next",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
		"plugin:tailwindcss/recommended"
	],
	parser: "@typescript-eslint/parser",
	settings: {
		next: {
			rootDir: "apps/next/"
		}
	},
	root: true,
	plugins: ["tailwindcss", "simple-import-sort"],
	rules: {
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-var-requires": "off",
		"prettier/prettier": ["warn", { usePrettierrc: true }],
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-unused-vars": ["warn"],
		"tailwindcss/no-custom-classname": "off",
		"simple-import-sort/exports": "warn",
		"simple-import-sort/imports": [
			"warn",
			{
				groups: [
					// Packages `react` related packages come first.
					["^react", "^@?\\w"],
					// Internal packages.
					["^(@lightbringer)(/.*|$)"],
					// Side effect imports.
					["^\\u0000"],
					// Parent imports. Put `..` last.
					["^\\.\\.(?!/?$)", "^\\.\\./?$"],
					// Other relative imports. Put same-folder imports and `.` last.
					["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
					// Style imports.
					["^.+\\.?(css)$"]
				]
			}
		]
	}
};
