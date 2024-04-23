// jest test utils.js
import "@testing-library/jest-dom";
import React from "react";
import {
	render,
	fireEvent,
	getByTestId,
	queryByTestId,
} from "@testing-library/react";

import { sortedLines, filterLines, PageButtons, darkenColor } from "./utils";

describe("sortedLines", () => {
	const lines = [
		{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
		{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
		{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
	];

	test("should sort lines by dates in ascending order", () => {
		const result = sortedLines("doB", "asc", lines);
		expect(result).toEqual([
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
		]);
	});

	test("should sort lines by dates in descending order", () => {
		const result = sortedLines("doB", "desc", lines);
		expect(result).toEqual([
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
		]);
	});

	test("should sort lines by numbers in ascending order", () => {
		const result = sortedLines("zip", "asc", lines);
		expect(result).toEqual([
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
		]);
	});

	test("should sort lines by numbers in descending order", () => {
		const result = sortedLines("zip", "desc", lines);
		expect(result).toEqual([
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
		]);
	});

	test("should sort lines alphabetically by name in ascending order", () => {
		const result = sortedLines("name", "asc", lines);
		expect(result).toEqual([
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
		]);
	});

	test("should sort lines alphabetically by name in descending order", () => {
		const result = sortedLines("name", "desc", lines);
		expect(result).toEqual([
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
		]);
	});

	test("should return no sorting if unconsistant key", () => {
		const result = sortedLines("phone", "asc", lines);
		expect(result).toEqual([
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
		]);
	});

	test("should return no sorting if no key", () => {
		const result = sortedLines("", "asc", lines);
		expect(result).toEqual([
			{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
		]);
	});
});

describe("filterLines", () => {
	const lines = [
		{ id: 1, name: "John", doB: "1996-01-01", zip: 58170 },
		{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46808 },
		{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
	];

	test("should filter lines by name", () => {
		const result = filterLines("Alice", lines, ["name"]);
		expect(result).toEqual([
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46808 },
		]);
	});

	test("should filter lines by multiple terms", () => {
		const result = filterLines("Alice Bob", lines, ["name"]);
		expect(result).toEqual([
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46808 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
		]);
	});

	test("should filter lines by multiple columns", () => {
		const result = filterLines("00", lines, ["doB", "zip"]);
		expect(result).toEqual([
			{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46808 },
			{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
		]);
	});
});

describe("PageButtons", () => {
	test("should render buttons correctly on first page", () => {
		const { getByText, getByTestId } = render(
			<PageButtons
				totalPages={8}
				currentPage={1}
				handleChangePage={jest.fn()}
				colors={["red", "blue"]}
			/>
		);
		expect(queryByTestId(document.body, "gotoFirst")).toBeNull();
		expect(queryByTestId(document.body, "prev")).toBeNull();
		expect(queryByTestId(document.body, "beforeEll")).toBeNull();
		expect(getByTestId("gotoEnd")).toBeInTheDocument();
		expect(getByTestId("next")).toBeInTheDocument();
		expect(getByTestId("afterEll")).toBeInTheDocument();
	});

	test("should render buttons correctly on last page", () => {
		const { getByText, getByTestId } = render(
			<PageButtons
				totalPages={8}
				currentPage={8}
				handleChangePage={jest.fn()}
				colors={["red", "blue"]}
			/>
		);
		expect(queryByTestId(document.body, "gotoEnd")).toBeNull();
		expect(queryByTestId(document.body, "next")).toBeNull();
		expect(queryByTestId(document.body, "afterEll")).toBeNull();
		expect(getByTestId("gotoFirst")).toBeInTheDocument();
		expect(getByTestId("prev")).toBeInTheDocument();
		expect(getByTestId("beforeEll")).toBeInTheDocument();
	});

	test("should render buttons correctly", () => {
		const { getByText, getByTestId } = render(
			<PageButtons
				totalPages={8}
				currentPage={5}
				handleChangePage={jest.fn()}
				colors={["red", "blue"]}
			/>
		);
		expect(getByTestId("gotoFirst")).toBeInTheDocument();
		expect(getByTestId("prev")).toBeInTheDocument();
		expect(getByTestId("beforeEll")).toBeInTheDocument();
		expect(getByTestId("gotoEnd")).toBeInTheDocument();
		expect(getByTestId("next")).toBeInTheDocument();
		expect(getByTestId("afterEll")).toBeInTheDocument();
	});

	test("should handle page change correctly", () => {
		const totalPages = 7;
		const currentPage = 5;
		const handleChangePage = jest.fn();
		const colors = ["red", "blue"];

		const { getByText } = render(
			<PageButtons
				totalPages={totalPages}
				currentPage={currentPage}
				handleChangePage={handleChangePage}
				colors={colors}
			/>
		);

		fireEvent.click(getByText("⏵"));
		expect(handleChangePage).toHaveBeenCalledWith(6);
		fireEvent.click(getByText("⏴"));
		expect(handleChangePage).toHaveBeenCalledWith(4);
		fireEvent.click(getByText("6"));
		expect(handleChangePage).toHaveBeenCalledWith(6);
		fireEvent.click(getByText("⏮1"));
		expect(handleChangePage).toHaveBeenCalledWith(1);
		fireEvent.click(getByText("7⏭"));
		expect(handleChangePage).toHaveBeenCalledWith(7);
	});
});

describe("darkenColor", () => {
	test("should darken hex color", () => {
		const result = darkenColor("#64C832");
		expect(result).toBe("rgb(88, 176, 44)");
	});

	test("should darken RGB color", () => {
		const result = darkenColor("rgb(100, 200, 50)");
		expect(result).toBe("rgb(88, 176, 44)");
	});

	test("should return the same color if it cannot be parsed", () => {
		const result = darkenColor("invalid-color");
		expect(result).toBe("invalid-color");
	});
});
