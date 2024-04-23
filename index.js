"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _const = require("./const");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* eslint-disable no-mixed-spaces-and-tabs */ /* eslint-disable react/prop-types */
var TalecTable = function TalecTable(_ref) {
  var _custom$columns, _custom$columns2;
  var _ref$lines = _ref.lines,
    lines = _ref$lines === void 0 ? [] : _ref$lines,
    _ref$titles = _ref.titles,
    titles = _ref$titles === void 0 ? {} : _ref$titles,
    _ref$hide = _ref.hide,
    hide = _ref$hide === void 0 ? [] : _ref$hide,
    _ref$custom = _ref.custom,
    custom = _ref$custom === void 0 ? {} : _ref$custom;
  var lastColumn = custom.actionColumn ? custom.actionColumn : null;
  var colWidth = (_custom$columns = custom.columns) !== null && _custom$columns !== void 0 && _custom$columns.width ? custom.columns.width : [];
  var lengthChoice = custom.lengthChoice ? custom.lengthChoice : [10, 20, 50];
  var defaultwidth = (_custom$columns2 = custom.columns) !== null && _custom$columns2 !== void 0 && _custom$columns2.values ? Math.floor(100 / (custom.columns.values.length - hide.length + (custom.actionColumn ? 1 : 0))) : Math.floor(100 / (Object.keys(titles).length - hide.length + (custom.actionColumn ? 1 : 0)));
  var _useState = (0, _react.useState)((0, _const.initCustomLabels)(custom.text || {})),
    _useState2 = _slicedToArray(_useState, 2),
    customLabels = _useState2[0],
    setCustomLabels = _useState2[1];
  (0, _react.useEffect)(function () {
    setCustomLabels((0, _const.initCustomLabels)(custom.text || {}));
  }, [custom.text]);
  var _useState3 = (0, _react.useState)(custom.emptyArrayMessage || "No data"),
    _useState4 = _slicedToArray(_useState3, 2),
    emptyArrayMessage = _useState4[0],
    setEmptyArrayMessage = _useState4[1];
  (0, _react.useEffect)(function () {
    setEmptyArrayMessage((custom === null || custom === void 0 ? void 0 : custom.emptyArrayMessage) || "No data");
  }, [custom.emptyArrayMessage]);
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    sortKey = _useState6[0],
    setSortKey = _useState6[1];
  var _useState7 = (0, _react.useState)(lines),
    _useState8 = _slicedToArray(_useState7, 2),
    filteredLines = _useState8[0],
    setFilteredLines = _useState8[1];
  var _useState9 = (0, _react.useState)("asc"),
    _useState10 = _slicedToArray(_useState9, 2),
    sortOrder = _useState10[0],
    setSortOrder = _useState10[1];
  var _useState11 = (0, _react.useState)(lengthChoice[0]),
    _useState12 = _slicedToArray(_useState11, 2),
    pageSize = _useState12[0],
    setPageSize = _useState12[1];
  var _useState13 = (0, _react.useState)(1),
    _useState14 = _slicedToArray(_useState13, 2),
    currentPage = _useState14[0],
    setCurrentPage = _useState14[1];
  var _useState15 = (0, _react.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    columns = _useState16[0],
    setColumns = _useState16[1];
  var searchColumns = custom.searchCol ? custom === null || custom === void 0 ? void 0 : custom.searchCol : columns;
  var _useState17 = (0, _react.useState)(""),
    _useState18 = _slicedToArray(_useState17, 2),
    searchTerm = _useState18[0],
    setSearchTerm = _useState18[1];
  var lStyle = (0, _const.titleStyle)(custom.titleStyle || {});
  var eStyle = (0, _const.evenStyle)(custom.evenLineStyle || {});
  var oStyle = (0, _const.oddStyle)(custom.oddLineStyle || {});
  var selectedEStyle = {
    backgroundColor: (0, _utils.darkenColor)(eStyle.backgroundColor)
  };
  var selectedOStyle = {
    backgroundColor: (0, _utils.darkenColor)(oStyle.backgroundColor)
  };
  (0, _react.useEffect)(function () {
    if (custom.columns) {
      setColumns(custom.columns.values);
    } else if (lines && lines.length > 0) {
      setColumns(Object.keys(lines[0]));
    }
  }, [custom.columns, lines]);
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
  (0, _react.useEffect)(function () {
    if (searchTerm.length > 1) {
      setFilteredLines((0, _utils.filterLines)(searchTerm, lines, searchColumns));
      setCurrentPage(1);
    } else {
      setFilteredLines(lines);
    }
  }, [searchTerm, lines]);
  var sortedFilteredLines = (0, _utils.sortedLines)(sortKey, sortOrder, filteredLines);
  var totalPages = Math.ceil(sortedFilteredLines.length / pageSize);
  var paginatedLines = sortedFilteredLines.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: "5px 20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    className: "TalecTable-topContainer"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, customLabels.length, /*#__PURE__*/_react["default"].createElement("select", {
    id: "TalecTable-sizeSelect",
    "test-id": "TalecTable-sizeSelect",
    value: pageSize,
    onChange: handlePageSizeChange
  }, lengthChoice.map(function (option, index) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: index,
      value: option
    }, option);
  })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, customLabels.search), /*#__PURE__*/_react["default"].createElement("input", {
    id: "TalecTable-searchInput",
    "test-id": "TalecTable-searchInput",
    type: "text",
    value: searchTerm,
    onChange: function onChange(e) {
      return setSearchTerm(e.target.value);
    }
  }))), filteredLines.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "noDataError"
  }, emptyArrayMessage) : /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "TalecTable-titlesContainer",
    style: lStyle
  }, columns.map(function (key, index) {
    return !hide.includes(key) && /*#__PURE__*/_react["default"].createElement("div", {
      className: "TalecTable-title",
      key: index,
      style: _objectSpread(_objectSpread({
        width: colWidth[index] ? colWidth[index] : "".concat(defaultwidth, "%")
      }, sortKey === key && selectedOStyle), {}, {
        display: "flex",
        flexDirection: "row",
        cursor: "pointer"
      }),
      onClick: function onClick() {
        return handleSort(key);
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: "90%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: '""'
      }
    }, titles[key]), sortKey === key ? /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: "10%",
        fontSize: ".7rem"
      }
    }, sortOrder === "asc" ? " ▲" : " ▼") : /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _const.arrowDivStyle)("top")
    }, "\u25B2"), /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _const.arrowDivStyle)("bottom")
    }, "\u25BC")));
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      flex: 1
    }
  }, lastColumn !== null ? lastColumn.name : null)), paginatedLines.map(function (line, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "TalecTable-rowContainer",
      key: index,
      style: _objectSpread({
        display: "flex"
      }, index % 2 === 0 ? eStyle : oStyle)
    }, columns.map(function (key, subIndex) {
      return !hide.includes(key) && /*#__PURE__*/_react["default"].createElement("div", {
        key: subIndex,
        style: _objectSpread({
          width: colWidth[subIndex] ? colWidth[subIndex] : "".concat(defaultwidth, "%")
        }, sortKey === key && (index % 2 === 0 ? selectedEStyle : selectedOStyle))
      }, line[key] ? line[key] : "");
    }), lastColumn !== null ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "TalecTable-actionsColumn",
      style: {
        flex: 1,
        display: "flex",
        justifyContent: "space-around",
        width: colWidth.length > Object.keys(titles).length ? colWidth[-1] : "".concat(defaultwidth, "%")
      }
    }, lastColumn.actions.map(
    // eslint-disable-next-line no-unused-vars
    function (_ref2, iconIndex) {
      var icon = _ref2.icon,
        func = _ref2.func,
        target = _ref2.target,
        label = _ref2.label;
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: iconIndex,
        onClick: function onClick() {
          return handleIconClick(iconIndex, line[target]);
        },
        title: label
      }, icon);
    })) : null);
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "TalecTable-bottomContainer",
    style: {
      margin: "5px 20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, customLabels.show[0], "\xA0", 1 + parseInt(pageSize) * (currentPage - 1), "\xA0", customLabels.show[1], "\xA0", parseInt(pageSize) * currentPage >= sortedFilteredLines.length ? sortedFilteredLines.length : parseInt(pageSize) * currentPage, "\xA0", customLabels.show[2], "\xA0", sortedFilteredLines.length), /*#__PURE__*/_react["default"].createElement("div", null, totalPages > 1 && /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "space-evenly"
    }
  }, /*#__PURE__*/_react["default"].createElement(_utils.PageButtons, {
    totalPages: totalPages,
    handleChangePage: handleChangePage,
    currentPage: currentPage,
    colors: [eStyle.backgroundColor, oStyle.backgroundColor]
  }))))));
};
var _default = exports["default"] = TalecTable;