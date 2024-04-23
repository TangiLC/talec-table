"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleStyle = exports.oddStyle = exports.initCustomLabels = exports.evenStyle = exports.arrowDivStyle = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var titleStyle = exports.titleStyle = function titleStyle(customTitleStyle) {
  //default style of the title line, to be modified by customTitleStyle
  return _objectSpread(_objectSpread({
    backgroundColor: "#fefefe",
    borderBottom: "1px solid #cccccc",
    lineHeight: "2rem",
    fontWeight: "600",
    textAlign: "center"
  }, customTitleStyle), {}, {
    display: "flex"
  });
};
var arrowDivStyle = exports.arrowDivStyle = function arrowDivStyle(pos) {
  //default style of the sorting arrow, either top or bottom
  return {
    width: "10%",
    fontSize: ".6rem",
    color: "lightgrey",
    marginBottom: pos === "top" ? "-.75rem" : null,
    marginTop: pos === "bottom" ? "-.75rem" : null,
    padding: "0px"
  };
};
var evenStyle = exports.evenStyle = function evenStyle(customEvenStyle) {
  //default style of the even lines of the tables, to be modified by customEvenStyle
  return _objectSpread({
    backgroundColor: "#eeeeee",
    borderBottom: "1px solid #dddddd",
    lineHeight: "1.8rem"
  }, customEvenStyle);
};
var oddStyle = exports.oddStyle = function oddStyle(customOddStyle) {
  //default style of the odd lines of the tables, to be modified by customOddStyle
  return _objectSpread({
    backgroundColor: "#fdfdfd",
    borderBottom: "1px solid #dddddd",
    lineHeight: "1.8rem"
  }, customOddStyle);
};
var initCustomLabels = exports.initCustomLabels = function initCustomLabels(customText) {
  return {
    //default language names for labels, to be modified by customText
    length: customText.itemPerPage || "Items per page :",
    search: customText.search || "Search :",
    show: customText.showingItems || ["Showing items", "to", "out of"]
  };
};