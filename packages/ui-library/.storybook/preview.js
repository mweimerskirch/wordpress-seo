import "./style.css";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		disable: true,
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		transformSource: ( src, storyContext ) => {
			try {
				return storyContext.unboundStoryFn( storyContext ).template;
			} catch ( e ) {
				return null;
			}
		},
	},
};
