// jest test const.js

import {
	titleStyle,
	arrowDivStyle,
	evenStyle,
	oddStyle,
	initCustomLabels,
} from "./const";

describe("Constantes React Tests", () => {
	test("titleStyle returns expected style", () => {
		const customTitleStyle = { color: "red" };
		const expectedStyle = {
			backgroundColor: "#fefefe",
			borderBottom: "1px solid #cccccc",
			lineHeight: "2rem",
			fontWeight: "600",
			textAlign: "center",
			display: "flex",
			...customTitleStyle,
		};

		expect(titleStyle(customTitleStyle)).toEqual(expectedStyle);
	});

	test("arrowDivStyle returns expected style for top position", () => {
		const pos = "top";
		const expectedStyle = {
			width: "10%",
			fontSize: ".6rem",
			color: "lightgrey",
			marginBottom: "-.75rem",
			marginTop: null,
			padding: "0px",
		};

		expect(arrowDivStyle(pos)).toEqual(expectedStyle);
	});

	test("arrowDivStyle returns expected style for bottom position", () => {
		const pos = "bottom";
		const expectedStyle = {
			width: "10%",
			fontSize: ".6rem",
			color: "lightgrey",
			marginBottom: null,
			marginTop: "-.75rem",
			padding: "0px",
		};

		expect(arrowDivStyle(pos)).toEqual(expectedStyle);
	});

	test("evenStyle returns expected style", () => {
		const customEvenStyle = { backgroundColor: "blue" };
		const expectedStyle = {
			backgroundColor: "#eeeeee",
			borderBottom: "1px solid #dddddd",
			lineHeight: "1.8rem",
			...customEvenStyle,
		};

		expect(evenStyle(customEvenStyle)).toEqual(expectedStyle);
	});

	test("oddStyle returns expected style", () => {
		const customOddStyle = { backgroundColor: "green" };
		const expectedStyle = {
			backgroundColor: "#fdfdfd",
			borderBottom: "1px solid #dddddd",
			lineHeight: "1.8rem",
			...customOddStyle,
		};

		expect(oddStyle(customOddStyle)).toEqual(expectedStyle);
	});

	test("initCustomLabels returns expected labels with custom text", () => {
		const customText = {
			itemPerPage: "Items par page :",
			search: "Rechercher :",
			showingItems: ["Affichage des éléments", "à", "sur"],
		};
		const expectedLabels = {
			length: "Items par page :",
			search: "Rechercher :",
			show: ["Affichage des éléments", "à", "sur"],
		};

		expect(initCustomLabels(customText)).toEqual(expectedLabels);
	});

	test("initCustomLabels returns expected labels with default text when custom text is not provided", () => {
		const expectedLabels = {
			length: "Items per page :",
			search: "Search :",
			show: ["Showing items", "to", "out of"],
		};

		expect(initCustomLabels({})).toEqual(expectedLabels);
	});
});
