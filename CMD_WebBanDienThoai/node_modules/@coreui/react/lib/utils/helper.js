"use strict";

exports.__esModule = true;
exports.DOMElement = DOMElement;
exports.deprecated = deprecated;
exports.tagPropType = exports.targetPropType = exports.canUseDOM = exports.CFadeProps = exports.TransitionPropTypeKeys = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Duplicated Transition.propType keys to ensure that Reactstrap builds
// for distribution properly exclude these keys for nested child HTML attributes
// since `react-transition-group` removes propTypes in production builds.
var TransitionPropTypeKeys = ['in', 'mountOnEnter', 'unmountOnExit', 'appear', 'enter', 'exit', 'timeout', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
exports.TransitionPropTypeKeys = TransitionPropTypeKeys;
var CFadeProps = [].concat(TransitionPropTypeKeys, ['baseClass', 'baseClassActive', 'tag']);
exports.CFadeProps = CFadeProps;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;

var targetPropType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, DOMElement, _propTypes["default"].shape({
  current: _propTypes["default"].any
})]);

exports.targetPropType = targetPropType;

var tagPropType = _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string, _propTypes["default"].shape({
  $$typeof: _propTypes["default"].symbol,
  render: _propTypes["default"].func
}), _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].string, _propTypes["default"].shape({
  $$typeof: _propTypes["default"].symbol,
  render: _propTypes["default"].func
})]))]);

exports.tagPropType = tagPropType;

function DOMElement(props, propName, componentName) {
  if (!(props[propName] instanceof Element)) {
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected prop to be an instance of Element. Validation failed.');
  }
}

function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] !== null && typeof props[propName] !== 'undefined') {
      console.error("\"" + propName + "\" property of \"" + componentName + "\" has been deprecated.\n" + explanation);
    }

    for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    return propType.apply(void 0, [props, propName, componentName].concat(rest));
  };
}