"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CLink = _interopRequireDefault(require("../link/CLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//component - CoreUI / CPagination
var CPagination = function CPagination(props) {
  var className = props.className,
      innerRef = props.innerRef,
      addListClass = props.addListClass,
      activePage = props.activePage,
      size = props.size,
      firstButton = props.firstButton,
      previousButton = props.previousButton,
      nextButton = props.nextButton,
      lastButton = props.lastButton,
      dots = props.dots,
      arrows = props.arrows,
      doubleArrows = props.doubleArrows,
      limit = props.limit,
      pages = props.pages,
      align = props.align,
      onActivePageChange = props.onActivePageChange,
      attributes = _objectWithoutPropertiesLoose(props, ["className", "innerRef", "addListClass", "activePage", "size", "firstButton", "previousButton", "nextButton", "lastButton", "dots", "arrows", "doubleArrows", "limit", "pages", "align", "onActivePageChange"]);

  (0, _react.useEffect)(function () {
    pages < activePage && onActivePageChange(pages, true);
  }, [pages]); //render

  var listClasses = (0, _classnames["default"])('pagination', size && 'pagination-' + size, 'justify-content-' + align, addListClass);
  var backArrowsClasses = (0, _classnames["default"])('page-item', activePage === 1 && 'disabled');
  var nextArrowsClasses = (0, _classnames["default"])('page-item', activePage === pages && 'disabled');

  var showDots = function () {
    return dots && limit > 4 && limit < pages;
  }();

  var maxPrevItems = function () {
    return Math.floor((limit - 1) / 2);
  }();

  var maxNextItems = function () {
    return Math.ceil((limit - 1) / 2);
  }();

  var beforeDots = function () {
    return showDots && activePage > maxPrevItems + 1;
  }();

  var afterDots = function () {
    return showDots && activePage < pages - maxNextItems;
  }();

  var computedLimit = function () {
    return limit - afterDots - beforeDots;
  }();

  var range = function () {
    return activePage + maxNextItems;
  }();

  var lastItem = function () {
    return range >= pages ? pages : range - afterDots;
  }();

  var itemsAmount = function () {
    return pages < computedLimit ? pages : computedLimit;
  }();

  var items = function () {
    if (activePage - maxPrevItems <= 1) {
      return Array.from({
        length: itemsAmount
      }, function (v, i) {
        return i + 1;
      });
    } else {
      return Array.from({
        length: itemsAmount
      }, function (v, i) {
        return lastItem - i;
      }).reverse();
    }
  }();

  var setPage = function setPage(number) {
    if (number !== activePage) {
      onActivePageChange(number);
    }
  };

  return /*#__PURE__*/_react["default"].createElement("nav", _extends({
    className: className,
    "aria-label": "pagination"
  }, attributes, {
    ref: innerRef
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: listClasses
  }, doubleArrows && /*#__PURE__*/_react["default"].createElement("li", {
    className: backArrowsClasses
  }, /*#__PURE__*/_react["default"].createElement(_CLink["default"], {
    className: "page-link",
    onClick: function onClick() {
      return setPage(1);
    },
    "aria-label": "Go to first page",
    "aria-disabled": activePage === 1,
    disabled: activePage === 1
  }, firstButton)), arrows && /*#__PURE__*/_react["default"].createElement("li", {
    className: backArrowsClasses
  }, /*#__PURE__*/_react["default"].createElement(_CLink["default"], {
    className: "page-link",
    onClick: function onClick() {
      return setPage(activePage - 1);
    },
    "aria-label": "Go to previous page",
    "aria-disabled": activePage === 1,
    disabled: activePage === 1
  }, previousButton)), beforeDots && /*#__PURE__*/_react["default"].createElement("li", {
    role: "separator",
    className: "page-item disabled"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "page-link"
  }, "\u2026")), items.map(function (i) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: (activePage === i ? 'active' : '') + " page-item",
      key: i
    }, /*#__PURE__*/_react["default"].createElement(_CLink["default"], {
      className: "page-link",
      onClick: function onClick(e) {
        return setPage(i, e);
      },
      "aria-label": activePage === i ? "Current page " + i : "Go to page " + i
    }, i));
  }), afterDots && /*#__PURE__*/_react["default"].createElement("li", {
    role: "separator",
    className: "page-item disabled"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "page-link"
  }, "\u2026")), arrows && /*#__PURE__*/_react["default"].createElement("li", {
    className: nextArrowsClasses
  }, /*#__PURE__*/_react["default"].createElement(_CLink["default"], {
    className: "page-link",
    onClick: function onClick() {
      return setPage(activePage + 1);
    },
    "aria-label": "Go to next page",
    "aria-disabled": activePage === pages,
    disabled: activePage === pages
  }, nextButton)), doubleArrows && /*#__PURE__*/_react["default"].createElement("li", {
    className: nextArrowsClasses
  }, /*#__PURE__*/_react["default"].createElement(_CLink["default"], {
    className: "page-link",
    onClick: function onClick() {
      return setPage(pages);
    },
    "aria-label": "Go to last page",
    "aria-disabled": activePage === pages,
    disabled: activePage === pages
  }, lastButton))));
};

CPagination.propTypes = process.env.NODE_ENV !== "production" ? {
  className: _propTypes["default"].string,
  //
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string]),
  activePage: _propTypes["default"].number,
  dots: _propTypes["default"].bool,
  arrows: _propTypes["default"].bool,
  doubleArrows: _propTypes["default"].bool,
  firstButton: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  previousButton: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  nextButton: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  lastButton: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  size: _propTypes["default"].oneOf(['', 'sm', 'lg']),
  align: _propTypes["default"].oneOf(['start', 'center', 'end']),
  addListClass: _propTypes["default"].string,
  limit: _propTypes["default"].number,
  pages: _propTypes["default"].number,
  onActivePageChange: _propTypes["default"].func.isRequired
} : {};
CPagination.defaultProps = {
  activePage: 1,
  dots: true,
  arrows: true,
  doubleArrows: true,
  limit: 5,
  firstButton: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\xAB"),
  previousButton: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\u2039"),
  nextButton: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\u203A"),
  lastButton: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\xBB"),
  align: 'start',
  pages: 10
};
var _default = CPagination;
exports["default"] = _default;
module.exports = exports.default;