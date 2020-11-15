"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactTransitionGroup = require("react-transition-group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getTransitionClass = function getTransitionClass(s) {
  return s === 'entering' ? 'collapsing' : s === 'entered' ? 'collapse show' : s === 'exiting' ? 'collapsing' : 'collapse';
}; //component - CoreUI / CCollapse


var CCollapse = function CCollapse(props) {
  var children = props.children,
      className = props.className,
      innerRef = props.innerRef,
      show = props.show,
      navbar = props.navbar,
      attributes = _objectWithoutPropertiesLoose(props, ["children", "className", "innerRef", "show", "navbar"]);

  var _useState = (0, _react.useState)(),
      height = _useState[0],
      setHeight = _useState[1];

  var onEntering = function onEntering(node) {
    setHeight(node.scrollHeight);
  };

  var onEntered = function onEntered() {
    setHeight(null);
  };

  var onExit = function onExit(node) {
    setHeight(node.scrollHeight);
  };

  var onExiting = function onExiting(node) {
    var _unused = node.offsetHeight; // eslint-disable-line no-unused-vars

    setHeight(0);
  };

  var onExited = function onExited() {
    setHeight(null);
  }; //render


  return /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.Transition, {
    "in": show,
    timeout: 350,
    appear: false,
    enter: true,
    exit: true,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited
  }, function (status) {
    var collapseClass = getTransitionClass(status);
    var classes = (0, _classnames["default"])(className, collapseClass, navbar && 'navbar-collapse');
    var style = height === null ? null : {
      height: height
    };
    return /*#__PURE__*/_react["default"].createElement("div", _extends({}, attributes, {
      style: _extends(_extends({}, attributes.style), style),
      className: classes,
      ref: innerRef
    }), children);
  });
};

CCollapse.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  className: _propTypes["default"].string,
  //
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string]),
  show: _propTypes["default"].bool,
  navbar: _propTypes["default"].bool
} : {};
CCollapse.defaultProps = {
  show: false
};
var _default = CCollapse;
exports["default"] = _default;
module.exports = exports.default;