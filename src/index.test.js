import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, queryByText } from "@testing-library/react";
import TalecTable from "./index";

const lines = [
	{ id: 1, name: "Charles", doB: "1996-01-01", zip: 58170 },
	{ id: 2, name: "Alice", doB: "2000-01-01", zip: 46800 },
	{ id: 3, name: "Bob", doB: "1990-01-01", zip: 51300 },
];
const titles = { id: "id", name: "name", doB: "doB", zip: "zip" };

describe("TalecTable", () => {
	it("renders minimal table without crashing", () => {
		render(<TalecTable lines={lines} titles={titles} />);
	});

	it("renders minimal table with custom columns (values,width) without crashing", () => {
		const custom = {
			columns: { width: ["20%", "20%", "20%"], values: ["id", "nom", "ddn"] },
		};
		render(<TalecTable lines={lines} titles={titles} custom={custom} />);
	});

	it("renders table with action column without crashing", () => {
		const custom = {
			actionColumn: {
				name: "Actions",
				actions: [
					{
						icon: "A",
						func: null,
						target: "id",
						label: "test",
					},
				],
			},
		};
		render(<TalecTable lines={lines} titles={titles} custom={custom} />);
	});

	it("displays custom empty array message if empty", () => {
		const customProps = {
			emptyArrayMessage: "No data available",
		};
		const { getByText } = render(
			<TalecTable lines={[]} titles={{}} custom={customProps} />
		);
		expect(getByText("No data available")).toBeInTheDocument();
	});

	it("renders the correct number of rows", () => {
		const { container } = render(<TalecTable lines={lines} titles={titles} />);
		const rows = container.querySelectorAll(".TalecTable-rowContainer");
		expect(rows.length).toBe(lines.length);
	});

	describe("Sorting by name", () => {
		it("sorts data in ascending order when name header is clicked", () => {
			const handleSortSpy = jest.fn();
			const { getByText, container } = render(
				<TalecTable lines={lines} titles={titles} handleSort={handleSortSpy} />
			);
			fireEvent.click(getByText("name"));

			const getDisplayedNames = () => {
				const rows = container.querySelectorAll(".TalecTable-rowContainer");
				const displayedNames = [];
				rows.forEach((row) => {
					const cells = row.querySelectorAll("div");
					if (cells.length > 1) {
						displayedNames.push(cells[1].textContent.trim());
					}
				});
				return displayedNames;
			};
			const sortedNames = [...lines.map((line) => line.name)].sort();

			expect(getDisplayedNames()).toEqual(sortedNames);
		});
		it("sorts data in descending order when name header is clicked twice", () => {
			const handleSortSpy = jest.fn();
			const { getByText, container } = render(
				<TalecTable lines={lines} titles={titles} handleSort={handleSortSpy} />
			);
			fireEvent.click(getByText("name"));
			fireEvent.click(getByText("name"));

			const getDisplayedNames = () => {
				const rows = container.querySelectorAll(".TalecTable-rowContainer");
				const displayedNames = [];
				rows.forEach((row) => {
					const cells = row.querySelectorAll("div");
					if (cells.length > 1) {
						displayedNames.push(cells[1].textContent.trim());
					}
				});
				return displayedNames;
			};
			const sortedNames = [...lines.map((line) => line.name)].sort().reverse();

			expect(getDisplayedNames()).toEqual(sortedNames);
		});
	});

	describe("Page change", () => {
		it("changes the page when page buttons are clicked", () => {
			const { getByText, getAllByTestId } = render(
				<TalecTable
					lines={lines}
					titles={titles}
					custom={{ lengthChoice: [1, 2, 3] }}
				/>
			);
			expect(getByText("Charles")).toBeInTheDocument();

			fireEvent.click(getAllByTestId("next")[0]);
			expect(queryByText(document.body, "Charles")).toBeNull();
			expect(getByText("Alice")).toBeInTheDocument();

			fireEvent.click(getAllByTestId("prev")[0]);
			expect(getByText("Charles")).toBeInTheDocument();
			expect(queryByText(document.body, "Alice")).toBeNull;
		});

		it("changes the page size when page size selector is changed", () => {
			const { getByRole, getByText, queryByText } = render(
				<TalecTable
					lines={lines}
					titles={titles}
					custom={{ lengthChoice: [1, 2, 3] }}
				/>
			);

			expect(getByText("Charles")).toBeInTheDocument();
			expect(queryByText("Alice")).not.toBeInTheDocument();
			expect(queryByText("Bob")).not.toBeInTheDocument();

			const selectList = getByRole("combobox", { name: "Items per page :" });
			fireEvent.change(selectList, {
				target: { value: "3" },
			});
			expect(getByText("Charles")).toBeInTheDocument();
			expect(getByText("Alice")).toBeInTheDocument();
			expect(getByText("Bob")).toBeInTheDocument();
		});
	});

	describe("Search functionality", () => {
		it("filters the table based on the search term", () => {
			const { getByRole, getByText, queryByText } = render(
				<TalecTable lines={lines} titles={titles} />
			);
			const searchInput = getByRole("textbox", { name: "" });
			fireEvent.change(searchInput, { target: { value: "Alice" } });
			expect(getByText("Alice")).toBeInTheDocument();
			expect(queryByText("Charles")).not.toBeInTheDocument();
			expect(queryByText("Bob")).not.toBeInTheDocument();
		});
	});

	describe("Action function", () => {
		it("launches function when icon is clicked", () => {
			const spyFunc = jest.fn();
			const custom = {
				actionColumn: {
					name: "Actions",
					actions: [
						{
							icon: "*SPY*",
							func: spyFunc,
							target: "id",
							label: "test",
						},
					],
				},
			};
			const { getAllByText } = render(
				<TalecTable lines={lines} titles={titles} custom={custom} />
			);
			const spyIcon = getAllByText("*SPY*");
			fireEvent.click(spyIcon[0]);
			expect(spyFunc).toHaveBeenCalled();
		});
	});
});
