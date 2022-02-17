module.exports = {
	stories: [ "../src/**/*.stories.@(js|jsx|ts|tsx|md|mdx)", "../src/**/stories.@(js|jsx|ts|tsx|md|mdx)" ],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-a11y",
		"@whitespace/storybook-addon-html",

		{
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					implementation: require( "postcss" ),
				},
			},
		},
	],
};
