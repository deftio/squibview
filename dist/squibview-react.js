import React from 'https://esm.sh/react@18.2.0';
import SquibView from './squibview.esm.min.js';

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var _excluded = ["className"];

/**
 * React component wrapper for SquibView
 */
var SquibViewReact = /*#__PURE__*/function (_React$Component) {
  function SquibViewReact(props) {
    var _this;
    _classCallCheck(this, SquibViewReact);
    _this = _callSuper(this, SquibViewReact, [props]);
    _this.containerRef = React.createRef();
    _this.state = {
      editor: null
    };
    return _this;
  }
  _inherits(SquibViewReact, _React$Component);
  return _createClass(SquibViewReact, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (this.containerRef.current) {
        // Initialize SquibView
        var instance = new SquibView(this.containerRef.current, {
          initialContent: this.props.initialContent,
          inputContentType: this.props.inputContentType,
          showControls: this.props.showControls,
          initialView: this.props.initialView,
          titleShow: this.props.titleShow,
          titleContent: this.props.titleContent
        });

        // Listen for editor events and re-emit them as props callbacks
        instance.events.on('content:rendered', function (contentType) {
          if (_this2.props.onContentRendered) {
            _this2.props.onContentRendered(contentType);
          }
        });
        instance.events.on('revision:undo', function (content, contentType) {
          if (_this2.props.onUndoRedo) {
            _this2.props.onUndoRedo('undo', content, contentType);
          }
        });
        instance.events.on('revision:redo', function (content, contentType) {
          if (_this2.props.onUndoRedo) {
            _this2.props.onUndoRedo('redo', content, contentType);
          }
        });

        // Listen for content changes from the editor
        instance.events.on('content:changed', function (newContent, type) {
          if (_this2.props.onChange) {
            _this2.props.onChange(newContent, type);
          }
        });
        this.setState({
          editor: instance
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var editor = this.state.editor;
      if (!editor) return;

      // Handle content updates from parent only if they're different from current editor content
      if (this.props.initialContent !== prevProps.initialContent) {
        var currentContent = editor.getContent();
        if (currentContent !== this.props.initialContent) {
          editor.setContent(this.props.initialContent, this.props.inputContentType || editor.inputContentType, false);
        }
      }

      // Handle content type changes
      if (this.props.inputContentType !== prevProps.inputContentType) {
        editor.setContent(editor.getContent(), this.props.inputContentType, false);
      }

      // Handle view changes
      if (this.props.initialView !== prevProps.initialView) {
        editor.setView(this.props.initialView);
      }

      // Handle controls visibility
      if (this.props.showControls !== prevProps.showControls) {
        editor.controlsShow(this.props.showControls);
      }

      // Handle title visibility
      if (this.props.titleShow !== prevProps.titleShow) {
        editor.titleShow(this.props.titleShow);
      }

      // Handle title content
      if (this.props.titleContent !== prevProps.titleContent) {
        editor.titleSetContent(this.props.titleContent);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Clean up event listeners
      if (this.state.editor && this.state.editor.events) {
        this.state.editor.events.off('*');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        className = _this$props.className,
        otherProps = _objectWithoutProperties(_this$props, _excluded);
      return React.createElement('div', _objectSpread2({
        ref: this.containerRef,
        className: "squibview-react-container ".concat(className || '')
      }, otherProps));
    }
  }]);
}(React.Component); // Add prop types documentation for IDE support
SquibViewReact.propTypes = {
  // React's PropTypes are not included directly to avoid dependencies
  // This is just for documentation purposes
  /*
  initialContent: PropTypes.string,
  inputContentType: PropTypes.string,
  showControls: PropTypes.bool,
  initialView: PropTypes.string,
  titleShow: PropTypes.bool,
  titleContent: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onViewChange: PropTypes.func,
  onContentRendered: PropTypes.func,
  onUndoRedo: PropTypes.func
  */
};

// Default props
SquibViewReact.defaultProps = {
  initialContent: '',
  inputContentType: 'md',
  showControls: true,
  initialView: 'split',
  titleShow: false,
  titleContent: '',
  className: ''
};

export { SquibViewReact as default };
//# sourceMappingURL=squibview-react.js.map
