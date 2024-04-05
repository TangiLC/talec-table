"use strict";

var React = require("react");

function _interopDefaultLegacy(e) {
	return e && typeof e === "object" && "default" in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);

function _iterableToArrayLimit(r, l) {
	var t =
		null == r
			? null
			: ("undefined" != typeof Symbol && r[Symbol.iterator]) || r["@@iterator"];
	if (null != t) {
		var e,
			n,
			i,
			u,
			a = [],
			f = !0,
			o = !1;
		try {
			if (((i = (t = t.call(r)).next), 0 === l)) {
				if (Object(t) !== t) return;
				f = !1;
			} else
				for (
					;
					!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l);
					f = !0
				);
		} catch (r) {
			(o = !0), (n = r);
		} finally {
			try {
				if (!f && null != t.return && ((u = t.return()), Object(u) !== u))
					return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys(Object(t), !0).forEach(function (r) {
					_defineProperty(e, r, t[r]);
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
			: ownKeys(Object(t)).forEach(function (r) {
					Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			  });
	}
	return e;
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true,
		});
	} else {
		obj[key] = value;
	}
	return obj;
}
function _slicedToArray(arr, i) {
	return (
		_arrayWithHoles(arr) ||
		_iterableToArrayLimit(arr, i) ||
		_unsupportedIterableToArray(arr, i) ||
		_nonIterableRest()
	);
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
		return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _nonIterableRest() {
	throw new TypeError(
		"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
	);
}

var sortedLines = function sortedLines(key, order, lines) {
	if (!key) return lines;
	return lines.slice().sort(function (a, b) {
		var valueA = a[key];
		var valueB = b[key];
		var numA = parseFloat(valueA);
		var numB = parseFloat(valueB);
		if (!isNaN(numA) && !isNaN(numB)) {
			return order === "asc" ? numA - numB : numB - numA;
		} else if (valueA instanceof Date && valueB instanceof Date) {
			return order === "asc" ? valueA - valueB : valueB - valueA;
		} else {
			if (valueA < valueB) return order === "asc" ? -1 : 1;
			if (valueA > valueB) return order === "asc" ? 1 : -1;
			if (valueA === valueB) return 0;
		}
	});
};
var filterLines = function filterLines(searchTerm, lines, searchColumns) {
	return lines.filter(function (line) {
		return searchColumns.some(function (column) {
			var _line$column;
			return (_line$column = line[column]) === null || _line$column === void 0
				? void 0
				: _line$column
						.toString()
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
		});
	});
};
var PageButtons = function PageButtons(_ref) {
	var totalPages = _ref.totalPages,
		currentPage = _ref.currentPage,
		handleChangePage = _ref.handleChangePage,
		colors = _ref.colors;
	var generateDOMButtons = function generateDOMButtons() {
		var buttons = [];
		if (currentPage !== 1) {
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: "gotoFirst",
						onClick: function onClick() {
							return handleChangePage(1);
						},
					},
					"\u23EE"
				)
			);
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: "prev",
						onClick: function onClick() {
							return handleChangePage(currentPage - 1);
						},
					},
					"\xA0\u23F4\xA0"
				)
			);
		}
		if (currentPage > 2) {
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: "beforeEllipsis",
					},
					"..."
				)
			);
		}
		var start = Math.max(currentPage - 2, 1);
		var end = Math.min(currentPage + 2, totalPages);
		var _loop = function _loop(i) {
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: i,
						onClick: function onClick() {
							return handleChangePage(i);
						},
						style:
							currentPage === i
								? {
										padding: "3px",
										fontWeight: "bold",
										border: "1px solid black",
										background: "linear-gradient(0deg, "
											.concat(colors[0], " 0%, ")
											.concat(colors[1], " 100%)"),
								  }
								: {
										paddingTop: "4px",
								  },
					},
					"\xA0",
					i,
					"\xA0"
				)
			);
		};
		for (var i = start; i <= end; i++) {
			_loop(i);
		}
		if (currentPage < totalPages - 2) {
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: "afterEllipsis",
					},
					"..."
				)
			);
		}
		if (currentPage !== totalPages) {
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: "next",
						onClick: function onClick() {
							return handleChangePage(currentPage + 1);
						},
					},
					"\xA0\u23F5\xA0"
				)
			);
			buttons.push(
				/*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						key: "gotoEnd",
						onClick: function onClick() {
							return handleChangePage(totalPages);
						},
					},
					"\u23ED"
				)
			);
		}
		return buttons;
	};
	return generateDOMButtons();
};
var darkenColor = function darkenColor(color) {
	var r, g, b;
	if (color.startsWith("#")) {
		r = parseInt(color.slice(1, 3), 16);
		g = parseInt(color.slice(3, 5), 16);
		b = parseInt(color.slice(5, 7), 16);
	} else if (color.startsWith("rgb")) {
		var _color$match$map = color.match(/\d+/g).map(Number);
		var _color$match$map2 = _slicedToArray(_color$match$map, 3);
		r = _color$match$map2[0];
		g = _color$match$map2[1];
		b = _color$match$map2[2];
	} else {
		return color;
	}
	var darkenedR = Math.round(r * 0.88);
	var darkenedG = Math.round(g * 0.88);
	var darkenedB = Math.round(b * 0.88);
	return "rgb("
		.concat(darkenedR, ", ")
		.concat(darkenedG, ", ")
		.concat(darkenedB, ")");
};

var titleStyle = function titleStyle(customTitleStyle) {
	//default style of the title line, to be modified by customTitleStyle
	return _objectSpread2(
		_objectSpread2(
			{
				backgroundColor: "#fefefe",
				borderBottom: "1px solid #cccccc",
				lineHeight: "2rem",
				fontWeight: "600",
				textAlign: "center",
			},
			customTitleStyle
		),
		{},
		{
			display: "flex",
		}
	);
};
var arrowDivStyle = function arrowDivStyle(pos) {
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
var evenStyle = function evenStyle(customEvenStyle) {
	//default style of the even lines of the tables, to be modified by customEvenStyle
	return _objectSpread2(
		{
			backgroundColor: "#eeeeee",
			borderBottom: "1px solid #dddddd",
			lineHeight: "1.8rem",
		},
		customEvenStyle
	);
};
var oddStyle = function oddStyle(customOddStyle) {
	//default style of the odd lines of the tables, to be modified by customOddStyle
	return _objectSpread2(
		{
			backgroundColor: "#fdfdfd",
			borderBottom: "1px solid #dddddd",
			lineHeight: "1.8rem",
		},
		customOddStyle
	);
};
var initCustomLabels = function initCustomLabels(customText) {
	return {
		//default language names for labels, to be modified by customText
		length: customText.itemPerPage || "Items per page :",
		search: customText.search || "Search :",
		show: customText.showingItems || ["Showing items", "to", "out of"],
	};
};

var TalecTable = function TalecTable(_ref) {
	var _custom$columns, _custom$columns2;
	var lines = _ref.lines,
		titles = _ref.titles,
		_ref$hide = _ref.hide,
		hide = _ref$hide === void 0 ? [] : _ref$hide,
		_ref$custom = _ref.custom,
		custom = _ref$custom === void 0 ? {} : _ref$custom;
	var lastColumn = custom.actionColumn ? custom.actionColumn : null;
	var colWidth =
		(_custom$columns = custom.columns) !== null &&
		_custom$columns !== void 0 &&
		_custom$columns.width
			? custom.columns.width
			: [];
	var lengthChoice = custom.lengthChoice ? custom.lengthChoice : [10, 20, 50];
	var defaultwidth =
		(_custom$columns2 = custom.columns) !== null &&
		_custom$columns2 !== void 0 &&
		_custom$columns2.values
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
	var _useState = React.useState(initCustomLabels(custom.text || {})),
		_useState2 = _slicedToArray(_useState, 2),
		customLabels = _useState2[0],
		setCustomLabels = _useState2[1];
	React.useEffect(
		function () {
			setCustomLabels(initCustomLabels(custom.text || {}));
		},
		[custom.text]
	);
	var _useState3 = React.useState(custom.emptyArrayMessage || "No data"),
		_useState4 = _slicedToArray(_useState3, 2),
		emptyArrayMessage = _useState4[0],
		setEmptyArrayMessage = _useState4[1];
	React.useEffect(
		function () {
			setEmptyArrayMessage(
				(custom === null || custom === void 0
					? void 0
					: custom.emptyArrayMessage) || "No data"
			);
		},
		[custom.emptyArrayMessage]
	);
	var _useState5 = React.useState(null),
		_useState6 = _slicedToArray(_useState5, 2),
		sortKey = _useState6[0],
		setSortKey = _useState6[1];
	var _useState7 = React.useState(lines),
		_useState8 = _slicedToArray(_useState7, 2),
		filteredLines = _useState8[0],
		setFilteredLines = _useState8[1];
	var _useState9 = React.useState("asc"),
		_useState10 = _slicedToArray(_useState9, 2),
		sortOrder = _useState10[0],
		setSortOrder = _useState10[1];
	var _useState11 = React.useState(lengthChoice[0]),
		_useState12 = _slicedToArray(_useState11, 2),
		pageSize = _useState12[0],
		setPageSize = _useState12[1];
	var _useState13 = React.useState(1),
		_useState14 = _slicedToArray(_useState13, 2),
		currentPage = _useState14[0],
		setCurrentPage = _useState14[1];
	var _useState15 = React.useState([]),
		_useState16 = _slicedToArray(_useState15, 2),
		columns = _useState16[0],
		setColumns = _useState16[1];
	var searchColumns = custom.searchCol
		? custom === null || custom === void 0
			? void 0
			: custom.searchCol
		: columns;
	var _useState17 = React.useState(""),
		_useState18 = _slicedToArray(_useState17, 2),
		searchTerm = _useState18[0],
		setSearchTerm = _useState18[1];
	var lStyle = titleStyle(custom.titleStyle || {});
	var eStyle = evenStyle(custom.evenLineStyle || {});
	var oStyle = oddStyle(custom.oddLineStyle || {});
	var selectedEStyle = {
		backgroundColor: darkenColor(eStyle.backgroundColor),
	};
	var selectedOStyle = {
		backgroundColor: darkenColor(oStyle.backgroundColor),
	};
	React.useEffect(
		function () {
			if (custom.columns) {
				setColumns(custom.columns.values);
			} else if (lines && lines.length > 0) {
				setColumns(Object.keys(lines[0]));
			}
		},
		[custom.columns, lines]
	);
	var handleSort = function handleSort(key) {
		if (sortKey === key) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};
	var handlePageSizeChange = function handlePageSizeChange(e) {
		setPageSize(parseInt(e.target.value));
		setCurrentPage(1);
	};
	var handleChangePage = function handleChangePage(page) {
		setCurrentPage(page);
	};
	var handleIconClick = function handleIconClick(index, val) {
		lastColumn.actions[index].func(val);
	};
	React.useEffect(
		function () {
			if (searchTerm.length > 1) {
				setFilteredLines(filterLines(searchTerm, lines, searchColumns));
				setCurrentPage(1);
			} else {
				setFilteredLines(lines);
			}
		},
		[searchTerm, lines]
	);
	var sortedFilteredLines = sortedLines(sortKey, sortOrder, filteredLines);
	var totalPages = Math.ceil(sortedFilteredLines.length / pageSize);
	var paginatedLines = sortedFilteredLines.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);
	return /*#__PURE__*/ React__default["default"].createElement(
		"div",
		null,
		/*#__PURE__*/ React__default["default"].createElement(
			"div",
			{
				style: {
					margin: "5px 20px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				},
			},
			/*#__PURE__*/ React__default["default"].createElement(
				"div",
				null,
				/*#__PURE__*/ React__default["default"].createElement(
					"label",
					null,
					customLabels.length,
					/*#__PURE__*/ React__default["default"].createElement(
						"select",
						{
							value: pageSize,
							onChange: handlePageSizeChange,
						},
						lengthChoice.map(function (option, index) {
							return /*#__PURE__*/ React__default["default"].createElement(
								"option",
								{
									key: index,
									value: option,
								},
								option
							);
						})
					)
				)
			),
			/*#__PURE__*/ React__default["default"].createElement(
				"div",
				null,
				/*#__PURE__*/ React__default["default"].createElement(
					"label",
					null,
					customLabels.search
				),
				/*#__PURE__*/ React__default["default"].createElement("input", {
					type: "text",
					value: searchTerm,
					onChange: function onChange(e) {
						return setSearchTerm(e.target.value);
					},
				})
			)
		),
		filteredLines.length === 0
			? /*#__PURE__*/ React__default["default"].createElement(
					"div",
					{
						className: "noDataError",
					},
					emptyArrayMessage
			  )
			: /*#__PURE__*/ React__default["default"].createElement(
					"div",
					null,
					/*#__PURE__*/ React__default["default"].createElement(
						"div",
						{
							style: lStyle,
						},
						columns.map(function (key, index) {
							return (
								!hide.includes(key) &&
								/*#__PURE__*/ React__default["default"].createElement(
									"div",
									{
										key: index,
										style: _objectSpread2(
											_objectSpread2(
												{
													width: colWidth[index]
														? colWidth[index]
														: "".concat(defaultwidth, "%"),
												},
												sortKey === key && selectedOStyle
											),
											{},
											{
												display: "flex",
												flexDirection: "row",
												cursor: "pointer",
											}
										),
										onClick: function onClick() {
											return handleSort(key);
										},
									},
									/*#__PURE__*/ React__default["default"].createElement(
										"div",
										{
											style: {
												width: "90%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: '""',
											},
										},
										titles[key]
									),
									sortKey === key &&
										/*#__PURE__*/ React__default["default"].createElement(
											"div",
											{
												style: {
													width: "10%",
													fontSize: ".7rem",
												},
											},
											sortOrder === "asc" ? " ▲" : " ▼"
										),
									sortKey !== key &&
										/*#__PURE__*/ React__default["default"].createElement(
											"div",
											{
												style: {
													display: "flex",
													flexDirection: "column",
												},
											},
											/*#__PURE__*/ React__default["default"].createElement(
												"div",
												{
													style: arrowDivStyle("top"),
												},
												"\u25B2"
											),
											/*#__PURE__*/ React__default["default"].createElement(
												"div",
												{
													style: arrowDivStyle("bottom"),
												},
												"\u25BC"
											)
										)
								)
							);
						}),
						/*#__PURE__*/ React__default["default"].createElement(
							"div",
							{
								style: {
									flex: 1,
								},
							},
							lastColumn !== null ? lastColumn.name : null
						)
					),
					paginatedLines.map(function (line, index) {
						return /*#__PURE__*/ React__default["default"].createElement(
							"div",
							{
								key: index,
								style: _objectSpread2(
									{
										display: "flex",
									},
									index % 2 === 0 ? eStyle : oStyle
								),
							},
							columns.map(function (key, subIndex) {
								return (
									!hide.includes(key) &&
									/*#__PURE__*/ React__default["default"].createElement(
										"div",
										{
											key: subIndex,
											style: _objectSpread2(
												{
													width: colWidth[subIndex]
														? colWidth[subIndex]
														: "".concat(defaultwidth, "%"),
												},
												sortKey === key &&
													(index % 2 === 0 ? selectedEStyle : selectedOStyle)
											),
										},
										line[key] ? line[key] : ""
									)
								);
							}),
							lastColumn !== null
								? /*#__PURE__*/ React__default["default"].createElement(
										"div",
										{
											style: {
												flex: 1,
												display: "flex",
												justifyContent: "space-around",
												width: colWidth[-1]
													? colWidth[-1]
													: "".concat(defaultwidth, "%"),
											},
										},
										lastColumn.actions.map(
											// eslint-disable-next-line no-unused-vars
											function (_ref2, iconIndex) {
												var icon = _ref2.icon;
												_ref2.func;
												var target = _ref2.target,
													label = _ref2.label;
												return /*#__PURE__*/ React__default[
													"default"
												].createElement(
													"span",
													{
														key: iconIndex,
														onClick: function onClick() {
															return handleIconClick(iconIndex, line[target]);
														},
														title: label,
													},
													icon
												);
											}
										)
								  )
								: null
						);
					}),
					/*#__PURE__*/ React__default["default"].createElement(
						"div",
						{
							style: {
								margin: "5px 20px",
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							},
						},
						/*#__PURE__*/ React__default["default"].createElement(
							"div",
							null,
							customLabels.show[0],
							"\xA0",
							1 + parseInt(pageSize) * (currentPage - 1),
							"\xA0",
							customLabels.show[1],
							"\xA0",
							parseInt(pageSize) * currentPage >= sortedFilteredLines.length
								? sortedFilteredLines.length
								: parseInt(pageSize) * currentPage,
							"\xA0",
							customLabels.show[2],
							"\xA0",
							sortedFilteredLines.length
						),
						/*#__PURE__*/ React__default["default"].createElement(
							"div",
							null,
							totalPages > 1 &&
								/*#__PURE__*/ React__default["default"].createElement(
									"div",
									{
										style: {
											display: "inline-flex",
											flexDirection: "row",
											justifyContent: "space-evenly",
										},
									},
									/*#__PURE__*/ React__default["default"].createElement(
										PageButtons,
										{
											totalPages: totalPages,
											handleChangePage: handleChangePage,
											currentPage: currentPage,
											colors: [eStyle.backgroundColor, oStyle.backgroundColor],
										}
									)
								)
						)
					)
			  )
	);
};

module.exports = TalecTable;
