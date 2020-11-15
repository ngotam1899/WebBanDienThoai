"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CSpinner = _interopRequireDefault(require("../spinner/CSpinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//component - CoreUI / CElementCover
var CElementCover = function CElementCover(props) {
  var className = props.className,
      children = props.children,
      innerRef = props.innerRef,
      boundaries = props.boundaries,
      opacity = props.opacity,
      attributes = _objectWithoutPropertiesLoose(props, ["className", "children", "innerRef", "boundaries", "opacity"]);

  var _useState = (0, _react.useState)({}),
      customBoundaries = _useState[0],
      setCustomBoundaries = _useState[1];

  var ref = (0, _react.createRef)(null);
  innerRef && innerRef(ref);

  var getCustomBoundaries = function getCustomBoundaries() {
    if (!ref || !ref.current || !boundaries) {
      return {};
    }

    var parent = ref.current.parentElement;
    var parentCoords = parent.getBoundingClientRect();
    var customBoundaries = {};
    boundaries.forEach(function (_ref) {
      var sides = _ref.sides,
          query = _ref.query;
      var element = parent.querySelector(query);

      if (!element || !sides) {
        return;
      }

      var coords = element.getBoundingClientRect();
      sides.forEach(function (side) {
        var sideMargin = Math.abs(coords[side] - parentCoords[side]);
        customBoundaries[side] = sideMargin + 'px';
      });
    });
    return customBoundaries;
  };

  (0, _react.useEffect)(function () {
    setCustomBoundaries(getCustomBoundaries());
  }, [JSON.stringify(getCustomBoundaries())]); //render

  var classes = (0, _classnames["default"])(className);

  var containerCoords = _extends({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, customBoundaries);

  var coverStyles = _extends(_extends({}, containerCoords), {}, {
    position: 'absolute',
    backgroundColor: "rgb(255,255,255," + opacity + ")"
  });

  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: classes,
    style: coverStyles
  }, attributes, {
    ref: ref
  }), children || /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)'
    }
  }, /*#__PURE__*/_react["default"].createElement(_CSpinner["default"], {
    grow: true,
    size: "lg",
    color: "primary"
  })));
};

CElementCover.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  //
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string]),
  boundaries: _propTypes["default"].array,
  opacity: _propTypes["default"].number
} : {};
CElementCover.defaultProps = {
  opacity: 0.4
};
var _default = CElementCover;
exports["default"] = _default;
module.exports = exports.default;