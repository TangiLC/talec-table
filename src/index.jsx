/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { sortedLines, filterLines, PageButtons, darkenColor } from "./utils";
import {
	titleStyle,
	evenStyle,
	oddStyle,
	initCustomLabels,
	arrowDivStyle,
} from "./const";

const TalecTable = ({ lines, titles, hide = [], custom = {} }) => {
	const lastColumn = custom.actionColumn ? custom.actionColumn : null;
	const colWidth = custom.columns?.width ? custom.columns.width : [];
	const lengthChoice = custom.lengthChoice ? custom.lengthChoice : [10, 20, 50];
	const defaultwidth = custom.columns?.values
		? Math.floor(
				100 /
					(custom.columns.values.length -
						hide.length +
						(custom.actionColumn ? 1 : 0))
		  )
		: Math.floor(
				100 /
					(Object.keys(titles).length -
						hide.length +
						(custom.actionColumn ? 1 : 0))
		  );

	const [customLabels, setCustomLabels] = useState(
		initCustomLabels(custom.text || {})
	);
	useEffect(() => {
		setCustomLabels(initCustomLabels(custom.text || {}));
	}, [custom.text]);

	const [emptyArrayMessage, setEmptyArrayMessage] = useState(
		custom.emptyArrayMessage || "No data"
	);
	useEffect(() => {
		setEmptyArrayMessage(custom?.emptyArrayMessage || "No data");
	}, [custom.emptyArrayMessage]);

	const [sortKey, setSortKey] = useState(null);
	const [filteredLines, setFilteredLines] = useState(lines);
	const [sortOrder, setSortOrder] = useState("asc");
	const [pageSize, setPageSize] = useState(lengthChoice[0]);
	const [currentPage, setCurrentPage] = useState(1);
	const [columns, setColumns] = useState([]);
	const searchColumns = custom.searchCol ? custom?.searchCol : columns;
	const [searchTerm, setSearchTerm] = useState("");

	const lStyle = titleStyle(custom.titleStyle || {});
	const eStyle = evenStyle(custom.evenLineStyle || {});
	const oStyle = oddStyle(custom.oddLineStyle || {});
	const selectedEStyle = {
		backgroundColor: darkenColor(eStyle.backgroundColor),
	};
	const selectedOStyle = {
		backgroundColor: darkenColor(oStyle.backgroundColor),
	};

	useEffect(() => {
		if (custom.columns) {
			setColumns(custom.columns.values);
		} else if (lines && lines.length > 0) {
			setColumns(Object.keys(lines[0]));
		}
	}, [custom.columns, lines]);

	const handleSort = (key) => {
		if (sortKey === key) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};

	const handlePageSizeChange = (e) => {
		setPageSize(parseInt(e.target.value));
		setCurrentPage(1);
	};

	const handleChangePage = (page) => {
		setCurrentPage(page);
	};

	const handleIconClick = (index, val) => {
		lastColumn.actions[index].func(val);
	};

	useEffect(() => {
		if (searchTerm.length > 1) {
			setFilteredLines(filterLines(searchTerm, lines, searchColumns));
			setCurrentPage(1);
		} else {
			setFilteredLines(lines);
		}
	}, [searchTerm, lines]);

	const sortedFilteredLines = sortedLines(sortKey, sortOrder, filteredLines);
	const totalPages = Math.ceil(sortedFilteredLines.length / pageSize);
	const paginatedLines = sortedFilteredLines.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	return (
		<div>
			<div
				style={{
					margin: "5px 20px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
				className="TalecTable-topContainer"
			>
				<div>
					{/* length */}
					<label>
						{customLabels.length}
						<select
							id="TalecTable-sizeSelect"
							test-id="TalecTable-sizeSelect"
							value={pageSize}
							onChange={handlePageSizeChange}
						>
							{lengthChoice.map((option, index) => (
								<option key={index} value={option}>
									{option}
								</option>
							))}
						</select>
					</label>
				</div>
				{/* search */}
				<div>
					<label>{customLabels.search}</label>
					<input
						id="TalecTable-searchInput"
						test-id="TalecTable-searchInput"
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			{filteredLines.length === 0 ? (
				<div className="noDataError">{emptyArrayMessage}</div>
			) : (
				<div>
					{/* Titles */}
					<div className="TalecTable-titlesContainer" style={lStyle}>
						{columns.map(
							(key, index) =>
								!hide.includes(key) && (
									<div
										key={index}
										style={{
											width: colWidth[index]
												? colWidth[index]
												: `${defaultwidth}%`,
											...(sortKey === key && selectedOStyle),
											display: "flex",
											flexDirection: "row",
											cursor: "pointer",
										}}
										onClick={() => handleSort(key)}
									>
										<div
											style={{
												width: "90%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: '""',
											}}
										>
											{titles[key]}
										</div>

										{sortKey === key && (
											<div style={{ width: "10%", fontSize: ".7rem" }}>
												{sortOrder === "asc" ? " ▲" : " ▼"}
											</div>
										)}
										{sortKey !== key && (
											<div style={{ display: "flex", flexDirection: "column" }}>
												<div style={arrowDivStyle("top")}>▲</div>
												<div style={arrowDivStyle("bottom")}>▼</div>
											</div>
										)}
									</div>
								)
						)}
						{
							<div style={{ flex: 1 }}>
								{lastColumn !== null ? lastColumn.name : null}
							</div>
						}
					</div>
					{/* Data */}
					{paginatedLines.map((line, index) => (
						<div
							className="TalecTable-rowContainer"
							key={index}
							style={{
								display: "flex",
								...(index % 2 === 0 ? eStyle : oStyle),
							}}
						>
							{columns.map(
								(key, subIndex) =>
									!hide.includes(key) && (
										<div
											key={subIndex}
											style={{
												width: colWidth[subIndex]
													? colWidth[subIndex]
													: `${defaultwidth}%`,
												...(sortKey === key &&
													(index % 2 === 0 ? selectedEStyle : selectedOStyle)),
											}}
										>
											{line[key] ? line[key] : ""}
										</div>
									)
							)}
							{/* Last Column */}
							{lastColumn !== null ? (
								<div
									className="TalecTable-actionsColumn"
									style={{
										flex: 1,
										display: "flex",
										justifyContent: "space-around",
										width: colWidth[-1] ? colWidth[-1] : `${defaultwidth}%`,
									}}
								>
									{lastColumn.actions.map(
										// eslint-disable-next-line no-unused-vars
										({ icon, func, target, label }, iconIndex) => (
											<span
												key={iconIndex}
												onClick={() => handleIconClick(iconIndex, line[target])}
												title={label}
											>
												{icon}
											</span>
										)
									)}
								</div>
							) : null}
						</div>
					))}
					{/* Pagination */}
					<div
						className="TalecTable-bottomContainer"
						style={{
							margin: "5px 20px",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<div>
							{customLabels.show[0]}&nbsp;
							{1 + parseInt(pageSize) * (currentPage - 1)}&nbsp;
							{customLabels.show[1]}&nbsp;
							{parseInt(pageSize) * currentPage >= sortedFilteredLines.length
								? sortedFilteredLines.length
								: parseInt(pageSize) * currentPage}
							&nbsp;
							{customLabels.show[2]}&nbsp;
							{sortedFilteredLines.length}
						</div>
						<div>
							{totalPages > 1 && (
								<div
									style={{
										display: "inline-flex",
										flexDirection: "row",
										justifyContent: "space-evenly",
									}}
								>
									<PageButtons
										totalPages={totalPages}
										handleChangePage={handleChangePage}
										currentPage={currentPage}
										colors={[eStyle.backgroundColor, oStyle.backgroundColor]}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TalecTable;
