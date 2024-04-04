export const titleStyle = (customTitleStyle) => {
	//default style of the title line, to be modified by customTitleStyle
	return {
		backgroundColor: "#fefefe",
		borderBottom: "1px solid #cccccc",
		lineHeight: "2rem",
		fontWeight: "600",
		textAlign: "center",
		...customTitleStyle,
		display: "flex",
	};
};

export const arrowDivStyle = (pos) => {
	//default style of the sorting arrow, either top or bottom
	return {
		width: "10%",
		fontSize: ".6rem",
		color: "lightgrey",
		marginBottom: pos === "top" ? "-.75rem" : null,
		marginTop: pos === "bottom" ? "-.75rem" : null,
		padding: "0px",
	};
};

export const evenStyle = (customEvenStyle) => {
	//default style of the even lines of the tables, to be modified by customEvenStyle
	return {
		backgroundColor: "#eeeeee",
		borderBottom: "1px solid #dddddd",
		lineHeight: "1.8rem",
		...customEvenStyle,
	};
};

export const oddStyle = (customOddStyle) => {
	//default style of the odd lines of the tables, to be modified by customOddStyle
	return {
		backgroundColor: "#fdfdfd",
		borderBottom: "1px solid #dddddd",
		lineHeight: "1.8rem",
		...customOddStyle,
	};
};

export const initCustomLabels = (customText) => ({
	//default language names for labels, to be modified by customText
	length: customText.itemPerPage || "Items per page :",
	search: customText.search || "Search :",
	show: customText.showingItems || ["Showing items", "to", "out of"],
});
