"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//component - CoreUI / CLink
var CLink = function CLink(props) {
  var className = props.className,
      innerRef = props.innerRef,
      active = props.active,
      href = props.href,
      onClick = props.onClick,
      disabled = props.disabled,
      rest = _objectWithoutPropertiesLoose(props, ["className", "innerRef", "active", "href", "onClick", "disabled"]);

  var to = rest ? rest.to : null;

  var click = function click(e) {
    if (!href && !to || href === '#') {
      e.preventDefault();
    }

    !disabled && onClick && onClick(e);
  }; // render


  var classes = (0, _classnames["default"])(active && 'active', disabled && 'disabled', className);
  return to ? /*#__PURE__*/_react["default"].createElement(_reactRouterDom.NavLink, _extends({}, rest, {
    className: classes,
    onClick: click,
    ref: innerRef
  })) : /*#__PURE__*/_react["default"].createElement("a", _extends({
    href: href || '#',
    className: classes,
    rel: rest.target === '_blank' ? 'noopener norefferer' : null
  }, rest, {
    onClick: click,
    ref: innerRef
  }));
};

CLink.propTypes = process.env.NODE_ENV !== "production" ? _extends(_extends({
  //
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string]),
  active: _propTypes["default"].bool,
  href: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  disabled: _propTypes["default"].bool
}, _reactRouterDom.NavLink.propTypes), {}, {
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].array]),
  to: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].string, _propTypes["default"].func])
}) : {}; // CLink.sortAttributes = (attributesToSort) => {
//   const attributes = {}
//   const linkProps = {}
//   Object.entries(attributesToSort || {}).forEach(([key, value]) => {
//     if (Object.keys(CLink.propTypes).includes(key)) {
//       linkProps[key] = value
//     } else {
//       attributes[key] = value
//     }
//   })
//   return { linkProps, attributes }
// }

var _default = CLink;
exports["default"] = _default;
module.exports = exports.default;