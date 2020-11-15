"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _helper = require("./helper.js");

var _CLink = _interopRequireDefault(require("../link/CLink"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//component - CoreUI / CBrand
var CBrand = function CBrand(props) {
  var _ref;

  var tag = props.tag,
      className = props.className,
      innerRef = props.innerRef,
      attributes = _objectWithoutPropertiesLoose(props, ["tag", "className", "innerRef"]); //render


  var classes = (0, _classnames["default"])(className);
  var Tag = attributes.to || attributes.href ? _CLink["default"] : tag;
  var ref = (_ref = {}, _ref["" + (typeof Tag === 'string' ? 'ref' : 'innerRef')] = innerRef, _ref);
  return /*#__PURE__*/_react["default"].createElement(Tag, _extends({
    className: classes
  }, attributes, ref));
};

CBrand.propTypes = process.env.NODE_ENV !== "production" ? {
  tag: _helper.tagPropType,
  children: _propTypes["default"].node,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array]),
  //
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string])
} : {};
CBrand.defaultProps = {
  tag: 'div'
};
var _default = CBrand;
exports["default"] = _default;
module.exports = exports.default;