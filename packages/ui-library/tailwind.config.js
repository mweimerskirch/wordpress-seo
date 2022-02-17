// TODO: Move this to Tailwind preset package.
const theme = require( "./src/theme" );

module.exports = {
	content: [ "./src/**/*.{ts,tsx,js,jsx}" ],
	theme: {
		extend: {
			colors: theme.colors
		},
	},
	plugins: [],
	prefix: "yst-",
};
