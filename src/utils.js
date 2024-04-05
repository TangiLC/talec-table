/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";

export const sortedLines = (key, order, lines) => {
	if (!key) return lines;

	return lines.slice().sort((a, b) => {
		const valueA = a[key];
		const valueB = b[key];

		const dateA = /\d{4}-\d{2}-\d{2}/.test(valueA) ? new Date(valueA) : valueA;
		const dateB = /\d{4}-\d{2}-\d{2}/.test(valueB) ? new Date(valueB) : valueB;

		const numA = parseFloat(valueA);
		const numB = parseFloat(valueB);

		// dates sorting
		if (dateA instanceof Date && dateB instanceof Date) {
			return order === "asc" ? dateA - dateB : dateB - dateA;
		}
		// number sorting
		if (!isNaN(numA) && !isNaN(numB)) {
			return order === "asc" ? numA - numB : numB - numA;
		}
		// Alpha sorting
		if (valueA < valueB) return order === "asc" ? -1 : 1;
		if (valueA > valueB) return order === "asc" ? 1 : -1;
		return 0;
	});
};

export const filterLines = (searchTerm, lines, searchColumns) => {
	return lines.filter((line) => {
		return searchColumns.some((column) =>
			line[column]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
		);
	});
};

export const PageButtons = ({
	totalPages,
	currentPage,
	handleChangePage,
	colors,
}) => {
	const generateDOMButtons = () => {
		const buttons = [];
		if (currentPage !== 1) {
			buttons.push(
				<div
					key="gotoFirst"
					data-testid="gotoFirst"
					onClick={() => handleChangePage(1)}
				>
					⏮
				</div>
			);
			buttons.push(
				<div
					key="prev"
					data-testid="prev"
					onClick={() => handleChangePage(currentPage - 1)}
				>
					&nbsp;⏴&nbsp;
				</div>
			);
		}
		if (currentPage > 2) {
			buttons.push(
				<div key="beforeEllipsis" data-testid="beforeEll">
					...
				</div>
			);
		}
		let start = Math.max(currentPage - 2, 1);
		let end = Math.min(currentPage + 2, totalPages);

		for (let i = start; i <= end; i++) {
			buttons.push(
				<div
					key={i}
					onClick={() => handleChangePage(i)}
					style={
						currentPage === i
							? {
									padding: "3px",
									fontWeight: "bold",
									border: "1px solid black",
									background: `linear-gradient(0deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
							  }
							: { paddingTop: "4px" }
					}
				>
					&nbsp;{i}&nbsp;
				</div>
			);
		}

		if (currentPage < totalPages - 2) {
			buttons.push(
				<div key="afterEllipsis" data-testid="afterEll">
					...
				</div>
			);
		}

		if (currentPage !== totalPages) {
			buttons.push(
				<div
					key="next"
					data-testid="next"
					onClick={() => handleChangePage(currentPage + 1)}
				>
					&nbsp;⏵&nbsp;
				</div>
			);
			buttons.push(
				<div
					key="gotoEnd"
					data-testid="gotoEnd"
					onClick={() => handleChangePage(totalPages)}
				>
					⏭
				</div>
			);
		}

		return buttons;
	};

	return generateDOMButtons();
};

export const darkenColor = (color) => {
	let r, g, b;
	if (color.startsWith("#")) {
		r = parseInt(color.slice(1, 3), 16);
		g = parseInt(color.slice(3, 5), 16);
		b = parseInt(color.slice(5, 7), 16);
	} else if (color.startsWith("rgb")) {
		[r, g, b] = color.match(/\d+/g).map(Number);
	} else {
		return color;
	}
	const darkenedR = Math.round(r * 0.88);
	const darkenedG = Math.round(g * 0.88);
	const darkenedB = Math.round(b * 0.88);
	return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
};
