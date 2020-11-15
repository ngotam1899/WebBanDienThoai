"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helper = require("../utils/helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//component - CoreUI / CSpinner
var CSpinner = function CSpinner(props) {
  var Tag = props.tag,
      className = props.className,
      innerRef = props.innerRef,
      grow = props.grow,
      size = props.size,
      color = props.color,
      attributes = _objectWithoutPropertiesLoose(props, ["tag", "className", "innerRef", "grow", "size", "color"]); //render


  var type = grow ? 'grow' : 'border';
  var classes = (0, _classnames["default"])("spinner-" + type, size && "spinner-" + type + "-" + size, color && "text-" + color, className);
  return /*#__PURE__*/_react["default"].createElement(Tag, _extends({
    className: classes,
    "aria-hidden": "false",
    "aria-label": "Loading",
    role: "status"
  }, attributes, {
    ref: innerRef
  }));
};

CSpinner.propTypes = process.env.NODE_ENV !== "production" ? {
  tag: _helper.tagPropType,
  className: _propTypes["default"].string,
  //
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string]),
  grow: _propTypes["default"].bool,
  size: _propTypes["default"].string,
  color: _propTypes["default"].string
} : {};
CSpinner.defaultProps = {
  tag: 'div'
};
var _default = CSpinner;
exports["default"] = _default;
module.exports = exports.default;