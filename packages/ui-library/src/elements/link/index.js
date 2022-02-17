import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Link = ( {
	as: Component,
	className,
	children,
	...props
} ) => (
	<Component
		className={ classNames(
			"yst-link",
			className,
		) }
		{ ...props }
	>
		{ children }
	</Component>
);
Link.propTypes = {
	as: PropTypes.oneOfType( [ PropTypes.string, PropTypes.elementType ] ),
	className: PropTypes.string,
	children: PropTypes.node,
};
Link.defaultProps = {
	as: "a",
	className: "",
};

export default Link;
