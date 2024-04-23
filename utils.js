"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortedLines = exports.filterLines = exports.darkenColor = exports.PageButtons = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* eslint-disable no-mixed-spaces-and-tabs */
var sortedLines = exports.sortedLines = function sortedLines(key, order, lines) {
  return lines.slice().sort(function (a, b) {
    var A = a[key];
    var B = b[key];
    var dateA = /\d{4}-\d{2}-\d{2}/.test(A) ? new Date(A) : A;
    var dateB = /\d{4}-\d{2}-\d{2}/.test(B) ? new Date(B) : B;
    var numA = parseFloat(A);
    var numB = parseFloat(B); // dates sorting
    if (dateA instanceof Date && dateB instanceof Date) {
      return order === "asc" ? dateA - dateB : dateB - dateA;
    } // number sorting
    if (!isNaN(numA) && !isNaN(numB)) {
      return order === "asc" ? numA - numB : numB - numA;
    }
    // Alpha sorting
    if (typeof A === "string" && typeof B === "string") {
      var strA = A.toLowerCase();
      var strB = B.toLowerCase();
      if (strA < strB) return order === "asc" ? -1 : 1;
      if (strA > strB) return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};
var filterLines = exports.filterLines = function filterLines(searchTerms, lines, searchColumns) {
  var searchTerm = searchTerms.split(/[ ,.!?]+/).filter(Boolean);
  return lines.filter(function (line) {
    return searchTerm.some(function (term) {
      return searchColumns.some(function (column) {
        var _line$column;
        return (_line$column = line[column]) === null || _line$column === void 0 ? void 0 : _line$column.toString().toLowerCase().includes(term.toLowerCase());
      });
    });
  });
};
var PageButtons = exports.PageButtons = function PageButtons(_ref) {
  var totalPages = _ref.totalPages,
    currentPage = _ref.currentPage,
    handleChangePage = _ref.handleChangePage,
    colors = _ref.colors;
  var generateDOMButtons = function generateDOMButtons() {
    var buttons = [];
    if (currentPage !== 1) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: "gotoFirst",
        "data-testid": "gotoFirst",
        onClick: function onClick() {
          return handleChangePage(1);
        }
      }, "\u23EE1"));
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: "prev",
        "data-testid": "prev",
        onClick: function onClick() {
          return handleChangePage(currentPage - 1);
        }
      }, "\xA0\u23F4\xA0"));
    }
    if (currentPage > 2) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: "beforeEllipsis",
        "data-testid": "beforeEll"
      }, "..."));
    }
    var start = Math.max(currentPage - 2, 1);
    var end = Math.min(currentPage + 2, totalPages);
    var _loop = function _loop(i) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        onClick: function onClick() {
          return handleChangePage(i);
        },
        style: currentPage === i ? {
          padding: "3px",
          fontWeight: "bold",
          border: "1px solid black",
          background: "linear-gradient(0deg, ".concat(colors[0], " 0%, ").concat(colors[1], " 100%)")
        } : {
          paddingTop: "4px"
        }
      }, "\xA0", i, "\xA0"));
    };
    for (var i = start; i <= end; i++) {
      _loop(i);
    }
    if (currentPage < totalPages - 2) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: "afterEllipsis",
        "data-testid": "afterEll"
      }, "..."));
    }
    if (currentPage !== totalPages) {
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: "next",
        "data-testid": "next",
        onClick: function onClick() {
          return handleChangePage(currentPage + 1);
        }
      }, "\xA0\u23F5\xA0"));
      buttons.push( /*#__PURE__*/_react["default"].createElement("div", {
        key: "gotoEnd",
        "data-testid": "gotoEnd",
        onClick: function onClick() {
          return handleChangePage(totalPages);
        }
      }, totalPages, "\u23ED"));
    }
    return buttons;
  };
  return generateDOMButtons();
};
var darkenColor = exports.darkenColor = function darkenColor(color) {
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
  return "rgb(".concat(darkenedR, ", ").concat(darkenedG, ", ").concat(darkenedB, ")");
};