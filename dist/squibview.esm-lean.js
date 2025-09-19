import TinyEmitter from 'tiny-emitter';
import DiffMatchPatch from 'diff-match-patch';
import MarkdownIt from 'markdown-it';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
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
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: true,
      configurable: true,
      writable: true
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: true
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = false, next;
            return next.value = t, next.done = true, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = true;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, true);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, true);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// This file is auto-generated by tools/updateVersion.js. Do not edit directly.
var VERSION = "1.0.19";
var REPO_URL = "https://github.com/deftio/squibview";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var eventemitter3 = {exports: {}};

(function (module) {

	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';

	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @private
	 */
	function Events() {}

	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);

	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}

	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Add a listener for a given event.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} context The context to invoke the listener with.
	 * @param {Boolean} once Specify if the listener is a one-time listener.
	 * @returns {EventEmitter}
	 * @private
	 */
	function addListener(emitter, event, fn, context, once) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('The listener must be a function');
	  }

	  var listener = new EE(fn, context || emitter, once)
	    , evt = prefix ? prefix + event : event;

	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
	  else emitter._events[evt] = [emitter._events[evt], listener];

	  return emitter;
	}

	/**
	 * Clear event by name.
	 *
	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	 * @param {(String|Symbol)} evt The Event name.
	 * @private
	 */
	function clearEvent(emitter, evt) {
	  if (--emitter._eventsCount === 0) emitter._events = new Events();
	  else delete emitter._events[evt];
	}

	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;

	  if (this._eventsCount === 0) return names;

	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Array} The registered listeners.
	 * @public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  var evt = prefix ? prefix + event : event
	    , handlers = this._events[evt];

	  if (!handlers) return [];
	  if (handlers.fn) return [handlers.fn];

	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
	    ee[i] = handlers[i].fn;
	  }

	  return ee;
	};

	/**
	 * Return the number of listeners listening to a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Number} The number of listeners.
	 * @public
	 */
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
	  var evt = prefix ? prefix + event : event
	    , listeners = this._events[evt];

	  if (!listeners) return 0;
	  if (listeners.fn) return 1;
	  return listeners.length;
	};

	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Add a listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  return addListener(this, event, fn, context, false);
	};

	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {*} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  return addListener(this, event, fn, context, true);
	};

	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {(String|Symbol)} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {*} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events[evt]) return this;
	  if (!fn) {
	    clearEvent(this, evt);
	    return this;
	  }

	  var listeners = this._events[evt];

	  if (listeners.fn) {
	    if (
	      listeners.fn === fn &&
	      (!once || listeners.once) &&
	      (!context || listeners.context === context)
	    ) {
	      clearEvent(this, evt);
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	        listeners[i].fn !== fn ||
	        (once && !listeners[i].once) ||
	        (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }

	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else clearEvent(this, evt);
	  }

	  return this;
	};

	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {(String|Symbol)} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;

	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) clearEvent(this, evt);
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;

	//
	// Expose the module.
	//
	{
	  module.exports = EventEmitter;
	} 
} (eventemitter3));

var papaparse_min = {exports: {}};

/* @license
Papa Parse
v5.5.2
https://github.com/mholt/PapaParse
License: MIT
*/

(function (module, exports) {
	((e,t)=>{module.exports=t();})(commonjsGlobal,function r(){var n="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:{};var d,s=!n.document&&!!n.postMessage,a=n.IS_PAPA_WORKER||false,o={},h=0,v={};function u(e){this._handle=null,this._finished=false,this._completed=false,this._halted=false,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=true,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(t,e){var i=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<i){let e=this._config.newline;e||(r=this._config.quoteChar||'"',e=this._handle.guessLineEndings(t,r)),t=[...t.split(e).slice(i)].join(e);}this.isFirstChunk&&U(this._config.beforeFirstChunk)&&void 0!==(r=this._config.beforeFirstChunk(t))&&(t=r),this.isFirstChunk=false,this._halted=false;var i=this._partialLine+t,r=(this._partialLine="",this._handle.parse(i,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){t=r.meta.cursor,i=(this._finished||(this._partialLine=i.substring(t-this._baseIndex),this._baseIndex=t),r&&r.data&&(this._rowCount+=r.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview);if(a)n.postMessage({results:r,workerId:v.WORKER_ID,finished:i});else if(U(this._config.chunk)&&!e){if(this._config.chunk(r,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=true);this._completeResults=r=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(r.data),this._completeResults.errors=this._completeResults.errors.concat(r.errors),this._completeResults.meta=r.meta),this._completed||!i||!U(this._config.complete)||r&&r.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=true),i||r&&r.meta.paused||this._nextChunk(),r}this._halted=true;},this._sendError=function(e){U(this._config.error)?this._config.error(e):a&&this._config.error&&n.postMessage({workerId:v.WORKER_ID,error:e,finished:false});};}function f(e){var r;(e=e||{}).chunkSize||(e.chunkSize=v.RemoteChunkSize),u.call(this,e),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else {if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),s||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var e,t=this._config.downloadRequestHeaders;for(e in t)r.setRequestHeader(e,t[e]);}var i;this._config.chunkSize&&(i=this._start+this._config.chunkSize-1,r.setRequestHeader("Range","bytes="+this._start+"-"+i));try{r.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}s&&0===r.status&&this._chunkError();}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize||r.responseText.length,this._finished=!this._config.chunkSize||this._start>=(e=>null!==(e=e.getResponseHeader("Content-Range"))?parseInt(e.substring(e.lastIndexOf("/")+1)):-1)(r),this.parseChunk(r.responseText)));},this._chunkError=function(e){e=r.statusText||e;this._sendError(new Error(e));};}function l(e){(e=e||{}).chunkSize||(e.chunkSize=v.LocalChunkSize),u.call(this,e);var i,r,n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,n?((i=new FileReader).onload=y(this._chunkLoaded,this),i.onerror=y(this._chunkError,this)):i=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input,t=(this._config.chunkSize&&(t=Math.min(this._start+this._config.chunkSize,this._input.size),e=r.call(e,this._start,t)),i.readAsText(e,this._config.encoding));n||this._chunkLoaded({target:{result:t}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function c(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){var e,t;if(!this._finished)return e=this._config.chunkSize,i=e?(t=i.substring(0,e),i.substring(e)):(t=i,""),this._finished=!i,this.parseChunk(t)};}function p(e){u.call(this,e=e||{});var t=[],i=true,r=false;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=true);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=true;},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=y(function(){this._streamCleanUp(),r=true,this._streamData("");},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function i(m){var n,s,a,t,o=Math.pow(2,53),h=-o,u=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,d=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,i=this,r=0,f=0,l=false,e=false,c=[],p={data:[],errors:[],meta:{}};function y(e){return "greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(p&&a&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+v.DefaultDelimiter+"'"),a=false),m.skipEmptyLines&&(p.data=p.data.filter(function(e){return !y(e)})),_()){if(p)if(Array.isArray(p.data[0])){for(var e=0;_()&&e<p.data.length;e++)p.data[e].forEach(t);p.data.splice(0,1);}else p.data.forEach(t);function t(e,t){U(m.transformHeader)&&(e=m.transformHeader(e,t)),c.push(e);}}function i(e,t){for(var i=m.header?{}:[],r=0;r<e.length;r++){var n=r,s=e[r],s=((e,t)=>(e=>(m.dynamicTypingFunction&&void 0===m.dynamicTyping[e]&&(m.dynamicTyping[e]=m.dynamicTypingFunction(e)),true===(m.dynamicTyping[e]||m.dynamicTyping)))(e)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&((e=>{if(u.test(e)){e=parseFloat(e);if(h<e&&e<o)return 1}})(t)?parseFloat(t):d.test(t)?new Date(t):""===t?null:t):t)(n=m.header?r>=c.length?"__parsed_extra":c[r]:n,s=m.transform?m.transform(s,n):s);"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s;}return m.header&&(r>c.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+c.length+" fields but parsed "+r,f+t):r<c.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+c.length+" fields but parsed "+r,f+t)),i}var r;p&&(m.header||m.dynamicTyping||m.transform)&&(r=1,!p.data.length||Array.isArray(p.data[0])?(p.data=p.data.map(i),r=p.data.length):p.data=i(p.data,0),m.header&&p.meta&&(p.meta.fields=c),f+=r);}function _(){return m.header&&0===c.length}function k(e,t,i,r){e={type:e,code:t,message:i};void 0!==r&&(e.row=r),p.errors.push(e);}U(m.step)&&(t=m.step,m.step=function(e){p=e,_()?g():(g(),0!==p.data.length&&(r+=e.data.length,m.preview&&r>m.preview?s.abort():(p.data=p.data[0],t(p,i))));}),this.parse=function(e,t,i){var r=m.quoteChar||'"',r=(m.newline||(m.newline=this.guessLineEndings(e,r)),a=false,m.delimiter?U(m.delimiter)&&(m.delimiter=m.delimiter(e),p.meta.delimiter=m.delimiter):((r=((e,t,i,r,n)=>{var s,a,o,h;n=n||[",","\t","|",";",v.RECORD_SEP,v.UNIT_SEP];for(var u=0;u<n.length;u++){for(var d,f=n[u],l=0,c=0,p=0,g=(o=void 0,new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e)),_=0;_<g.data.length;_++)i&&y(g.data[_])?p++:(d=g.data[_].length,c+=d,void 0===o?o=d:0<d&&(l+=Math.abs(d-o),o=d));0<g.data.length&&(c/=g.data.length-p),(void 0===a||l<=a)&&(void 0===h||h<c)&&1.99<c&&(a=l,s=f,h=c);}return {successful:!!(m.delimiter=s),bestDelimiter:s}})(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess)).successful?m.delimiter=r.bestDelimiter:(a=true,m.delimiter=v.DefaultDelimiter),p.meta.delimiter=m.delimiter),w(m));return m.preview&&m.header&&r.preview++,n=e,s=new E(r),p=s.parse(n,t,i),g(),l?{meta:{paused:true}}:p||{meta:{paused:false}}},this.paused=function(){return l},this.pause=function(){l=true,s.abort(),n=U(m.chunk)?"":n.substring(s.getCharIndex());},this.resume=function(){i.streamer._halted?(l=false,i.streamer.parseChunk(n,true)):setTimeout(i.resume,3);},this.aborted=function(){return e},this.abort=function(){e=true,s.abort(),p.meta.aborted=true,U(m.complete)&&m.complete(p),n="";},this.guessLineEndings=function(e,t){e=e.substring(0,1048576);var t=new RegExp(P(t)+"([^]*?)"+P(t),"gm"),i=(e=e.replace(t,"")).split("\r"),t=e.split("\n"),e=1<t.length&&t[0].length<i[0].length;if(1===i.length||e)return "\n";for(var r=0,n=0;n<i.length;n++)"\n"===i[n][0]&&r++;return r>=i.length/2?"\r\n":"\r"};}function P(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(C){var S=(C=C||{}).delimiter,O=C.newline,x=C.comments,I=C.step,A=C.preview,T=C.fastMode,D=null,L=false,F=null==C.quoteChar?'"':C.quoteChar,j=F;if(void 0!==C.escapeChar&&(j=C.escapeChar),("string"!=typeof S||-1<v.BAD_DELIMITERS.indexOf(S))&&(S=","),x===S)throw new Error("Comment character same as delimiter");true===x?x="#":("string"!=typeof x||-1<v.BAD_DELIMITERS.indexOf(x))&&(x=false),"\n"!==O&&"\r"!==O&&"\r\n"!==O&&(O="\n");var z=0,M=false;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=S.length,s=O.length,a=x.length,o=U(I),h=[],u=[],d=[],f=z=0;if(!i)return b();if(T||false!==T&&-1===i.indexOf(F)){for(var l=i.split(O),c=0;c<l.length;c++){if(d=l[c],z+=d.length,c!==l.length-1)z+=O.length;else if(r)return b();if(!x||d.substring(0,a)!==x){if(o){if(h=[],k(d.split(S)),R(),M)return b()}else k(d.split(S));if(A&&A<=c)return h=h.slice(0,A),b(true)}}return b()}for(var p=i.indexOf(S,z),g=i.indexOf(O,z),_=new RegExp(P(j)+P(F),"g"),m=i.indexOf(F,z);;)if(i[z]===F)for(m=z,z++;;){if(-1===(m=i.indexOf(F,m+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:z}),E();if(m===n-1)return E(i.substring(z,m).replace(_,F));if(F===j&&i[m+1]===j)m++;else if(F===j||0===m||i[m-1]!==j){ -1!==p&&p<m+1&&(p=i.indexOf(S,m+1));var y=v(-1===(g=-1!==g&&g<m+1?i.indexOf(O,m+1):g)?p:Math.min(p,g));if(i.substr(m+1+y,e)===S){d.push(i.substring(z,m).replace(_,F)),i[z=m+1+y+e]!==F&&(m=i.indexOf(F,z)),p=i.indexOf(S,z),g=i.indexOf(O,z);break}y=v(g);if(i.substring(m+1+y,m+1+y+s)===O){if(d.push(i.substring(z,m).replace(_,F)),w(m+1+y+s),p=i.indexOf(S,z),m=i.indexOf(F,z),o&&(R(),M))return b();if(A&&h.length>=A)return b(true);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:z}),m++;}}else if(x&&0===d.length&&i.substring(z,z+a)===x){if(-1===g)return b();z=g+s,g=i.indexOf(O,z),p=i.indexOf(S,z);}else if(-1!==p&&(p<g||-1===g))d.push(i.substring(z,p)),z=p+e,p=i.indexOf(S,z);else {if(-1===g)break;if(d.push(i.substring(z,g)),w(g+s),o&&(R(),M))return b();if(A&&h.length>=A)return b(true)}return E();function k(e){h.push(e),f=z;}function v(e){var t=0;return t=-1!==e&&(e=i.substring(m+1,e))&&""===e.trim()?e.length:t}function E(e){return r||(void 0===e&&(e=i.substring(z)),d.push(e),z=n,k(d),o&&R()),b()}function w(e){z=e,k(d),d=[],g=i.indexOf(O,z);}function b(e){if(C.header&&!t&&h.length&&!L){var s=h[0],a={},o=new Set(s);let n=false;for(let r=0;r<s.length;r++){let i=s[r];if(a[i=U(C.transformHeader)?C.transformHeader(i,r):i]){let e,t=a[i];for(;e=i+"_"+t,t++,o.has(e););o.add(e),s[r]=e,a[i]++,n=true,(D=null===D?{}:D)[e]=i;}else a[i]=1,s[r]=i;o.add(i);}n&&console.warn("Duplicate headers found and renamed."),L=true;}return {data:h,errors:u,meta:{delimiter:S,linebreak:O,aborted:M,truncated:!!e,cursor:f+(t||0),renamedHeaders:D}}}function R(){I(b()),h=[],u=[];}},this.abort=function(){M=true;},this.getCharIndex=function(){return z};}function g(e){var t=e.data,i=o[t.workerId],r=false;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=true,_(t.workerId,{data:[],errors:[],meta:{aborted:true}});},pause:m,resume:m};if(U(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results;}else U(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!r&&_(t.workerId,t.results);}function _(e,t){var i=o[e];U(i.userComplete)&&i.userComplete(t),i.terminate(),delete o[e];}function m(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t,i=Array.isArray(e)?[]:{};for(t in e)i[t]=w(e[t]);return i}function y(e,t){return function(){e.apply(t,arguments);}}function U(e){return "function"==typeof e}return v.parse=function(e,t){var i=(t=t||{}).dynamicTyping||false;U(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!U(t.transform)&&t.transform,!t.worker||!v.WORKERS_SUPPORTED)return i=null,v.NODE_STREAM_INPUT,"string"==typeof e?(e=(e=>65279!==e.charCodeAt(0)?e:e.slice(1))(e),i=new(t.download?f:c)(t)):true===e.readable&&U(e.read)&&U(e.on)?i=new p(t):(n.File&&e instanceof File||e instanceof Object)&&(i=new l(t)),i.stream(e);(i=(()=>{var e;return !!v.WORKERS_SUPPORTED&&(e=(()=>{var e=n.URL||n.webkitURL||null,t=r.toString();return v.BLOB_URL||(v.BLOB_URL=e.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",t,")();"],{type:"text/javascript"})))})(),(e=new n.Worker(e)).onmessage=g,e.id=h++,o[e.id]=e)})()).userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=U(t.step),t.chunk=U(t.chunk),t.complete=U(t.complete),t.error=U(t.error),delete t.worker,i.postMessage({input:e,config:t,workerId:i.id});},v.unparse=function(e,t){var n=false,_=true,m=",",y="\r\n",s='"',a=s+s,i=false,r=null,o=false,h=((()=>{if("object"==typeof t){if("string"!=typeof t.delimiter||v.BAD_DELIMITERS.filter(function(e){return  -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter),"boolean"!=typeof t.quotes&&"function"!=typeof t.quotes&&!Array.isArray(t.quotes)||(n=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines),"string"==typeof t.newline&&(y=t.newline),"string"==typeof t.quoteChar&&(s=t.quoteChar),"boolean"==typeof t.header&&(_=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns;} void 0!==t.escapeChar&&(a=t.escapeChar+s),t.escapeFormulae instanceof RegExp?o=t.escapeFormulae:"boolean"==typeof t.escapeFormulae&&t.escapeFormulae&&(o=/^[=+\-@\t\r].*$/);}})(),new RegExp(P(s),"g"));"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||Object.keys(e[0]),e,i)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||r),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e,t,i){var r="",n=("string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t)),Array.isArray(e)&&0<e.length),s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(r+=m),r+=k(e[a],a);0<t.length&&(r+=y);}for(var o=0;o<t.length;o++){var h=(n?e:t[o]).length,u=false,d=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var f=[],l=0;l<h;l++){var c=s?e[l]:l;f.push(t[o][c]);}u=""===f.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!d&&(r+=m);var g=n&&s?e[p]:p;r+=k(t[o][g],p);}o<t.length-1&&(!i||0<h&&!d)&&(r+=y);}}return r}function k(e,t){var i,r;return null==e?"":e.constructor===Date?JSON.stringify(e).slice(1,25):(r=false,o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=true),i=e.toString().replace(h,a),(r=r||true===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||((e,t)=>{for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return  true;return  false})(i,v.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i)}},v.RECORD_SEP=String.fromCharCode(30),v.UNIT_SEP=String.fromCharCode(31),v.BYTE_ORDER_MARK="\ufeff",v.BAD_DELIMITERS=["\r","\n",'"',v.BYTE_ORDER_MARK],v.WORKERS_SUPPORTED=!s&&!!n.Worker,v.NODE_STREAM_INPUT=1,v.LocalChunkSize=10485760,v.RemoteChunkSize=5242880,v.DefaultDelimiter=",",v.Parser=E,v.ParserHandle=i,v.NetworkStreamer=f,v.FileStreamer=l,v.StringStreamer=c,v.ReadableStreamStreamer=p,n.jQuery&&((d=n.jQuery).fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&n.FileReader)||!this.files||0===this.files.length)return  true;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)});}),e(),this;function e(){if(0===h.length)U(o.complete)&&o.complete();else {var e,t,i,r,n=h[0];if(U(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(U(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){U(a)&&a(e,n.file,n.inputElem),u();},v.parse(n.file,n.instanceConfig);}}function u(){h.splice(0,1),e();}}),a&&(n.onmessage=function(e){e=e.data;void 0===v.WORKER_ID&&e&&(v.WORKER_ID=e.workerId);"string"==typeof e.input?n.postMessage({workerId:v.WORKER_ID,results:v.parse(e.input,e.config),finished:true}):(n.File&&e.input instanceof File||e.input instanceof Object)&&(e=v.parse(e.input,e.config))&&n.postMessage({workerId:v.WORKER_ID,results:e,finished:true});}),(f.prototype=Object.create(u.prototype)).constructor=f,(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(c.prototype)).constructor=c,(p.prototype=Object.create(u.prototype)).constructor=p,v}); 
} (papaparse_min));

var papaparse_minExports = papaparse_min.exports;
var Papa = /*@__PURE__*/getDefaultExportFromCjs(papaparse_minExports);

function extend (destination) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) destination[key] = source[key];
    }
  }
  return destination
}

function repeat (character, count) {
  return Array(count + 1).join(character)
}

function trimLeadingNewlines (string) {
  return string.replace(/^\n*/, '')
}

function trimTrailingNewlines (string) {
  // avoid match-at-end regexp bottleneck, see #370
  var indexEnd = string.length;
  while (indexEnd > 0 && string[indexEnd - 1] === '\n') indexEnd--;
  return string.substring(0, indexEnd)
}

var blockElements = [
  'ADDRESS', 'ARTICLE', 'ASIDE', 'AUDIO', 'BLOCKQUOTE', 'BODY', 'CANVAS',
  'CENTER', 'DD', 'DIR', 'DIV', 'DL', 'DT', 'FIELDSET', 'FIGCAPTION', 'FIGURE',
  'FOOTER', 'FORM', 'FRAMESET', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER',
  'HGROUP', 'HR', 'HTML', 'ISINDEX', 'LI', 'MAIN', 'MENU', 'NAV', 'NOFRAMES',
  'NOSCRIPT', 'OL', 'OUTPUT', 'P', 'PRE', 'SECTION', 'TABLE', 'TBODY', 'TD',
  'TFOOT', 'TH', 'THEAD', 'TR', 'UL'
];

function isBlock (node) {
  return is(node, blockElements)
}

var voidElements = [
  'AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT',
  'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'
];

function isVoid (node) {
  return is(node, voidElements)
}

function hasVoid (node) {
  return has(node, voidElements)
}

var meaningfulWhenBlankElements = [
  'A', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TH', 'TD', 'IFRAME', 'SCRIPT',
  'AUDIO', 'VIDEO'
];

function isMeaningfulWhenBlank (node) {
  return is(node, meaningfulWhenBlankElements)
}

function hasMeaningfulWhenBlank (node) {
  return has(node, meaningfulWhenBlankElements)
}

function is (node, tagNames) {
  return tagNames.indexOf(node.nodeName) >= 0
}

function has (node, tagNames) {
  return (
    node.getElementsByTagName &&
    tagNames.some(function (tagName) {
      return node.getElementsByTagName(tagName).length
    })
  )
}

var rules = {};

rules.paragraph = {
  filter: 'p',

  replacement: function (content) {
    return '\n\n' + content + '\n\n'
  }
};

rules.lineBreak = {
  filter: 'br',

  replacement: function (content, node, options) {
    return options.br + '\n'
  }
};

rules.heading = {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

  replacement: function (content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));

    if (options.headingStyle === 'setext' && hLevel < 3) {
      var underline = repeat((hLevel === 1 ? '=' : '-'), content.length);
      return (
        '\n\n' + content + '\n' + underline + '\n\n'
      )
    } else {
      return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
    }
  }
};

rules.blockquote = {
  filter: 'blockquote',

  replacement: function (content) {
    content = content.replace(/^\n+|\n+$/g, '');
    content = content.replace(/^/gm, '> ');
    return '\n\n' + content + '\n\n'
  }
};

rules.list = {
  filter: ['ul', 'ol'],

  replacement: function (content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
      return '\n' + content
    } else {
      return '\n\n' + content + '\n\n'
    }
  }
};

rules.listItem = {
  filter: 'li',

  replacement: function (content, node, options) {
    content = content
      .replace(/^\n+/, '') // remove leading newlines
      .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
      .replace(/\n/gm, '\n    '); // indent
    var prefix = options.bulletListMarker + '   ';
    var parent = node.parentNode;
    if (parent.nodeName === 'OL') {
      var start = parent.getAttribute('start');
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + '.  ';
    }
    return (
      prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
    )
  }
};

rules.indentedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'indented' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function (content, node, options) {
    return (
      '\n\n    ' +
      node.firstChild.textContent.replace(/\n/g, '\n    ') +
      '\n\n'
    )
  }
};

rules.fencedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'fenced' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function (content, node, options) {
    var className = node.firstChild.getAttribute('class') || '';
    var language = (className.match(/language-(\S+)/) || [null, ''])[1];
    var code = node.firstChild.textContent;

    var fenceChar = options.fence.charAt(0);
    var fenceSize = 3;
    var fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm');

    var match;
    while ((match = fenceInCodeRegex.exec(code))) {
      if (match[0].length >= fenceSize) {
        fenceSize = match[0].length + 1;
      }
    }

    var fence = repeat(fenceChar, fenceSize);

    return (
      '\n\n' + fence + language + '\n' +
      code.replace(/\n$/, '') +
      '\n' + fence + '\n\n'
    )
  }
};

rules.horizontalRule = {
  filter: 'hr',

  replacement: function (content, node, options) {
    return '\n\n' + options.hr + '\n\n'
  }
};

rules.inlineLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'inlined' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    var href = node.getAttribute('href');
    if (href) href = href.replace(/([()])/g, '\\$1');
    var title = cleanAttribute(node.getAttribute('title'));
    if (title) title = ' "' + title.replace(/"/g, '\\"') + '"';
    return '[' + content + '](' + href + title + ')'
  }
};

rules.referenceLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'referenced' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node, options) {
    var href = node.getAttribute('href');
    var title = cleanAttribute(node.getAttribute('title'));
    if (title) title = ' "' + title + '"';
    var replacement;
    var reference;

    switch (options.linkReferenceStyle) {
      case 'collapsed':
        replacement = '[' + content + '][]';
        reference = '[' + content + ']: ' + href + title;
        break
      case 'shortcut':
        replacement = '[' + content + ']';
        reference = '[' + content + ']: ' + href + title;
        break
      default:
        var id = this.references.length + 1;
        replacement = '[' + content + '][' + id + ']';
        reference = '[' + id + ']: ' + href + title;
    }

    this.references.push(reference);
    return replacement
  },

  references: [],

  append: function (options) {
    var references = '';
    if (this.references.length) {
      references = '\n\n' + this.references.join('\n') + '\n\n';
      this.references = []; // Reset references
    }
    return references
  }
};

rules.emphasis = {
  filter: ['em', 'i'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.emDelimiter + content + options.emDelimiter
  }
};

rules.strong = {
  filter: ['strong', 'b'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.strongDelimiter + content + options.strongDelimiter
  }
};

rules.code = {
  filter: function (node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;

    return node.nodeName === 'CODE' && !isCodeBlock
  },

  replacement: function (content) {
    if (!content) return ''
    content = content.replace(/\r?\n|\r/g, ' ');

    var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? ' ' : '';
    var delimiter = '`';
    var matches = content.match(/`+/gm) || [];
    while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';

    return delimiter + extraSpace + content + extraSpace + delimiter
  }
};

rules.image = {
  filter: 'img',

  replacement: function (content, node) {
    var alt = cleanAttribute(node.getAttribute('alt'));
    var src = node.getAttribute('src') || '';
    var title = cleanAttribute(node.getAttribute('title'));
    var titlePart = title ? ' "' + title + '"' : '';
    return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
  }
};

function cleanAttribute (attribute) {
  return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : ''
}

/**
 * Manages a collection of rules used to convert HTML to Markdown
 */

function Rules (options) {
  this.options = options;
  this._keep = [];
  this._remove = [];

  this.blankRule = {
    replacement: options.blankReplacement
  };

  this.keepReplacement = options.keepReplacement;

  this.defaultRule = {
    replacement: options.defaultReplacement
  };

  this.array = [];
  for (var key in options.rules) this.array.push(options.rules[key]);
}

Rules.prototype = {
  add: function (key, rule) {
    this.array.unshift(rule);
  },

  keep: function (filter) {
    this._keep.unshift({
      filter: filter,
      replacement: this.keepReplacement
    });
  },

  remove: function (filter) {
    this._remove.unshift({
      filter: filter,
      replacement: function () {
        return ''
      }
    });
  },

  forNode: function (node) {
    if (node.isBlank) return this.blankRule
    var rule;

    if ((rule = findRule(this.array, node, this.options))) return rule
    if ((rule = findRule(this._keep, node, this.options))) return rule
    if ((rule = findRule(this._remove, node, this.options))) return rule

    return this.defaultRule
  },

  forEach: function (fn) {
    for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
  }
};

function findRule (rules, node, options) {
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if (filterValue(rule, node, options)) return rule
  }
  return void 0
}

function filterValue (rule, node, options) {
  var filter = rule.filter;
  if (typeof filter === 'string') {
    if (filter === node.nodeName.toLowerCase()) return true
  } else if (Array.isArray(filter)) {
    if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true
  } else if (typeof filter === 'function') {
    if (filter.call(rule, node, options)) return true
  } else {
    throw new TypeError('`filter` needs to be a string, array, or function')
  }
}

/**
 * The collapseWhitespace function is adapted from collapse-whitespace
 * by Luc Thevenard.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Luc Thevenard <lucthevenard@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * collapseWhitespace(options) removes extraneous whitespace from an the given element.
 *
 * @param {Object} options
 */
function collapseWhitespace (options) {
  var element = options.element;
  var isBlock = options.isBlock;
  var isVoid = options.isVoid;
  var isPre = options.isPre || function (node) {
    return node.nodeName === 'PRE'
  };

  if (!element.firstChild || isPre(element)) return

  var prevText = null;
  var keepLeadingWs = false;

  var prev = null;
  var node = next(prev, element, isPre);

  while (node !== element) {
    if (node.nodeType === 3 || node.nodeType === 4) { // Node.TEXT_NODE or Node.CDATA_SECTION_NODE
      var text = node.data.replace(/[ \r\n\t]+/g, ' ');

      if ((!prevText || / $/.test(prevText.data)) &&
          !keepLeadingWs && text[0] === ' ') {
        text = text.substr(1);
      }

      // `text` might be empty at this point.
      if (!text) {
        node = remove(node);
        continue
      }

      node.data = text;

      prevText = node;
    } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
      if (isBlock(node) || node.nodeName === 'BR') {
        if (prevText) {
          prevText.data = prevText.data.replace(/ $/, '');
        }

        prevText = null;
        keepLeadingWs = false;
      } else if (isVoid(node) || isPre(node)) {
        // Avoid trimming space around non-block, non-BR void elements and inline PRE.
        prevText = null;
        keepLeadingWs = true;
      } else if (prevText) {
        // Drop protection if set previously.
        keepLeadingWs = false;
      }
    } else {
      node = remove(node);
      continue
    }

    var nextNode = next(prev, node, isPre);
    prev = node;
    node = nextNode;
  }

  if (prevText) {
    prevText.data = prevText.data.replace(/ $/, '');
    if (!prevText.data) {
      remove(prevText);
    }
  }
}

/**
 * remove(node) removes the given node from the DOM and returns the
 * next node in the sequence.
 *
 * @param {Node} node
 * @return {Node} node
 */
function remove (node) {
  var next = node.nextSibling || node.parentNode;

  node.parentNode.removeChild(node);

  return next
}

/**
 * next(prev, current, isPre) returns the next node in the sequence, given the
 * current and previous nodes.
 *
 * @param {Node} prev
 * @param {Node} current
 * @param {Function} isPre
 * @return {Node}
 */
function next (prev, current, isPre) {
  if ((prev && prev.parentNode === current) || isPre(current)) {
    return current.nextSibling || current.parentNode
  }

  return current.firstChild || current.nextSibling || current.parentNode
}

/*
 * Set up window for Node.js
 */

var root = (typeof window !== 'undefined' ? window : {});

/*
 * Parsing HTML strings
 */

function canParseHTMLNatively () {
  var Parser = root.DOMParser;
  var canParse = false;

  // Adapted from https://gist.github.com/1129031
  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if (new Parser().parseFromString('', 'text/html')) {
      canParse = true;
    }
  } catch (e) {}

  return canParse
}

function createHTMLParser () {
  var Parser = function () {};

  {
    if (shouldUseActiveX()) {
      Parser.prototype.parseFromString = function (string) {
        var doc = new window.ActiveXObject('htmlfile');
        doc.designMode = 'on'; // disable on-page scripts
        doc.open();
        doc.write(string);
        doc.close();
        return doc
      };
    } else {
      Parser.prototype.parseFromString = function (string) {
        var doc = document.implementation.createHTMLDocument('');
        doc.open();
        doc.write(string);
        doc.close();
        return doc
      };
    }
  }
  return Parser
}

function shouldUseActiveX () {
  var useActiveX = false;
  try {
    document.implementation.createHTMLDocument('').open();
  } catch (e) {
    if (root.ActiveXObject) useActiveX = true;
  }
  return useActiveX
}

var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();

function RootNode (input, options) {
  var root;
  if (typeof input === 'string') {
    var doc = htmlParser().parseFromString(
      // DOM parsers arrange elements in the <head> and <body>.
      // Wrapping in a custom element ensures elements are reliably arranged in
      // a single element.
      '<x-turndown id="turndown-root">' + input + '</x-turndown>',
      'text/html'
    );
    root = doc.getElementById('turndown-root');
  } else {
    root = input.cloneNode(true);
  }
  collapseWhitespace({
    element: root,
    isBlock: isBlock,
    isVoid: isVoid,
    isPre: options.preformattedCode ? isPreOrCode : null
  });

  return root
}

var _htmlParser;
function htmlParser () {
  _htmlParser = _htmlParser || new HTMLParser();
  return _htmlParser
}

function isPreOrCode (node) {
  return node.nodeName === 'PRE' || node.nodeName === 'CODE'
}

function Node$1 (node, options) {
  node.isBlock = isBlock(node);
  node.isCode = node.nodeName === 'CODE' || node.parentNode.isCode;
  node.isBlank = isBlank(node);
  node.flankingWhitespace = flankingWhitespace(node, options);
  return node
}

function isBlank (node) {
  return (
    !isVoid(node) &&
    !isMeaningfulWhenBlank(node) &&
    /^\s*$/i.test(node.textContent) &&
    !hasVoid(node) &&
    !hasMeaningfulWhenBlank(node)
  )
}

function flankingWhitespace (node, options) {
  if (node.isBlock || (options.preformattedCode && node.isCode)) {
    return { leading: '', trailing: '' }
  }

  var edges = edgeWhitespace(node.textContent);

  // abandon leading ASCII WS if left-flanked by ASCII WS
  if (edges.leadingAscii && isFlankedByWhitespace('left', node, options)) {
    edges.leading = edges.leadingNonAscii;
  }

  // abandon trailing ASCII WS if right-flanked by ASCII WS
  if (edges.trailingAscii && isFlankedByWhitespace('right', node, options)) {
    edges.trailing = edges.trailingNonAscii;
  }

  return { leading: edges.leading, trailing: edges.trailing }
}

function edgeWhitespace (string) {
  var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
  return {
    leading: m[1], // whole string for whitespace-only strings
    leadingAscii: m[2],
    leadingNonAscii: m[3],
    trailing: m[4], // empty for whitespace-only strings
    trailingNonAscii: m[5],
    trailingAscii: m[6]
  }
}

function isFlankedByWhitespace (side, node, options) {
  var sibling;
  var regExp;
  var isFlanked;

  if (side === 'left') {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }

  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue);
    } else if (options.preformattedCode && sibling.nodeName === 'CODE') {
      isFlanked = false;
    } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
      isFlanked = regExp.test(sibling.textContent);
    }
  }
  return isFlanked
}

var reduce = Array.prototype.reduce;
var escapes = [
  [/\\/g, '\\\\'],
  [/\*/g, '\\*'],
  [/^-/g, '\\-'],
  [/^\+ /g, '\\+ '],
  [/^(=+)/g, '\\$1'],
  [/^(#{1,6}) /g, '\\$1 '],
  [/`/g, '\\`'],
  [/^~~~/g, '\\~~~'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/^>/g, '\\>'],
  [/_/g, '\\_'],
  [/^(\d+)\. /g, '$1\\. ']
];

function TurndownService (options) {
  if (!(this instanceof TurndownService)) return new TurndownService(options)

  var defaults = {
    rules: rules,
    headingStyle: 'setext',
    hr: '* * *',
    bulletListMarker: '*',
    codeBlockStyle: 'indented',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
    br: '  ',
    preformattedCode: false,
    blankReplacement: function (content, node) {
      return node.isBlock ? '\n\n' : ''
    },
    keepReplacement: function (content, node) {
      return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
    },
    defaultReplacement: function (content, node) {
      return node.isBlock ? '\n\n' + content + '\n\n' : content
    }
  };
  this.options = extend({}, defaults, options);
  this.rules = new Rules(this.options);
}

TurndownService.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns A Markdown representation of the input
   * @type String
   */

  turndown: function (input) {
    if (!canConvert(input)) {
      throw new TypeError(
        input + ' is not a string, or an element/document/fragment node.'
      )
    }

    if (input === '') return ''

    var output = process.call(this, new RootNode(input, this.options));
    return postProcess.call(this, output)
  },

  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array} plugin The plugin or array of plugins to add
   * @returns The Turndown instance for chaining
   * @type Object
   */

  use: function (plugin) {
    if (Array.isArray(plugin)) {
      for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
    } else if (typeof plugin === 'function') {
      plugin(this);
    } else {
      throw new TypeError('plugin must be a Function or an Array of Functions')
    }
    return this
  },

  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns The Turndown instance for chaining
   * @type Object
   */

  addRule: function (key, rule) {
    this.rules.add(key, rule);
    return this
  },

  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */

  keep: function (filter) {
    this.rules.keep(filter);
    return this
  },

  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns The Turndown instance for chaining
   * @type Object
   */

  remove: function (filter) {
    this.rules.remove(filter);
    return this
  },

  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns A string with Markdown syntax escaped
   * @type String
   */

  escape: function (string) {
    return escapes.reduce(function (accumulator, escape) {
      return accumulator.replace(escape[0], escape[1])
    }, string)
  }
};

/**
 * Reduces a DOM node down to its Markdown string equivalent
 * @private
 * @param {HTMLElement} parentNode The node to convert
 * @returns A Markdown representation of the node
 * @type String
 */

function process (parentNode) {
  var self = this;
  return reduce.call(parentNode.childNodes, function (output, node) {
    node = new Node$1(node, self.options);

    var replacement = '';
    if (node.nodeType === 3) {
      replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue);
    } else if (node.nodeType === 1) {
      replacement = replacementForNode.call(self, node);
    }

    return join(output, replacement)
  }, '')
}

/**
 * Appends strings as each rule requires and trims the output
 * @private
 * @param {String} output The conversion output
 * @returns A trimmed version of the ouput
 * @type String
 */

function postProcess (output) {
  var self = this;
  this.rules.forEach(function (rule) {
    if (typeof rule.append === 'function') {
      output = join(output, rule.append(self.options));
    }
  });

  return output.replace(/^[\t\r\n]+/, '').replace(/[\t\r\n\s]+$/, '')
}

/**
 * Converts an element node to its Markdown equivalent
 * @private
 * @param {HTMLElement} node The node to convert
 * @returns A Markdown representation of the node
 * @type String
 */

function replacementForNode (node) {
  var rule = this.rules.forNode(node);
  var content = process.call(this, node);
  var whitespace = node.flankingWhitespace;
  if (whitespace.leading || whitespace.trailing) content = content.trim();
  return (
    whitespace.leading +
    rule.replacement(content, node, this.options) +
    whitespace.trailing
  )
}

/**
 * Joins replacement to the current output with appropriate number of new lines
 * @private
 * @param {String} output The current conversion output
 * @param {String} replacement The string to append to the output
 * @returns Joined output
 * @type String
 */

function join (output, replacement) {
  var s1 = trimTrailingNewlines(output);
  var s2 = trimLeadingNewlines(replacement);
  var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
  var separator = '\n\n'.substring(0, nls);

  return s1 + separator + s2
}

/**
 * Determines whether an input can be converted
 * @private
 * @param {String|HTMLElement} input Describe this parameter
 * @returns Describe what it returns
 * @type String|Object|Array|Boolean|Number
 */

function canConvert (input) {
  return (
    input != null && (
      typeof input === 'string' ||
      (input.nodeType && (
        input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11
      ))
    )
  )
}

/**
 * Converts HTML content to Markdown format using the Turndown library with 
 * customizations specific to SquibView's needs.
 */
var HtmlToMarkdown = /*#__PURE__*/function () {
  function HtmlToMarkdown() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, HtmlToMarkdown);
    this.turndownService = new TurndownService(_objectSpread2({
      headingStyle: 'atx',
      // Use # style headings
      codeBlockStyle: 'fenced',
      // Use ``` style code blocks
      emDelimiter: '*',
      // Use * for emphasis
      bulletListMarker: '-'
    }, options));

    // Add a simple cache for converted content to improve performance
    this.cache = new Map();
    this.cacheSize = options.cacheSize || 10;

    // Store special blocks for preservation
    this._specialBlocks = new Map();
    this.configureTurndownRules();
  }

  /**
   * Configure custom Turndown rules
   */
  return _createClass(HtmlToMarkdown, [{
    key: "configureTurndownRules",
    value: function configureTurndownRules() {
      var _this = this;
      // Since we're using pre-processing for data-source-type containers,
      // we can simplify this and keep it as a fallback for any missed cases
      this.turndownService.addRule('squibviewFencedBlock', {
        filter: function filter(node) {
          return node.nodeName === 'DIV' && node.hasAttribute('data-source-type');
        },
        replacement: function replacement(content, node, options) {
          var lang = node.getAttribute('data-source-type') || 'code';
          var innerContent = '';
          switch (lang) {
            case 'mermaid':
            case 'math':
              var contentFromHtml = node.innerHTML;
              // Convert <br> tags to newlines first
              contentFromHtml = contentFromHtml.replace(/<br\s*\/?>/gi, '\n');
              // For Mermaid and Math, the content is expected to be text-like after <br> replacement.
              // Avoid stripping other tags if they are part of the intended content (e.g. MathML in MathJax)
              // Instead, rely on a robust way to get text content, then trim.
              var tempDiv = node.ownerDocument.createElement('div');
              tempDiv.innerHTML = contentFromHtml; // Let browser parse it
              innerContent = tempDiv.textContent || tempDiv.innerText || ''; // Get text content
              break;
            case 'geojson':
            case 'topojson':
            case 'stl':
              // For GeoJSON, TopoJSON, and STL, the original data is stored in data-original-source attribute
              if (node.hasAttribute('data-original-source')) {
                // The attribute value is HTML-escaped, browser will decode it when getting the attribute
                innerContent = node.getAttribute('data-original-source');
              } else if (node.textContent && node.textContent.trim()) {
                // Fallback to text content if not yet rendered
                innerContent = node.textContent;
              } else {
                // If no original data available, we can't recover it
                console.warn('[HtmlToMarkdown] Missing original data for', lang, 'block');
                innerContent = 'Error: Original data lost during rendering';
              }
              break;
            case 'svg':
              // The 'node' is the div with data-source-type="svg".
              // For proper round-trip fidelity, use the original source from the data attribute if available
              if (node.hasAttribute('data-original-source')) {
                // The attribute value is HTML-escaped, browser will decode it when getting the attribute
                innerContent = node.getAttribute('data-original-source');
              } else {
                // Fallback to innerHTML if no original source stored
                innerContent = node.innerHTML;
              }
              // console.warn('[HtmlToMarkdown] squibviewFencedBlock SVG: Captured content:', innerContent.substring(0, 200));
              break;
            case 'csv':
            case 'tsv':
            case 'psv':
              var tableElement = node.querySelector('table');
              if (tableElement) {
                innerContent = _this._htmlTableToDelimitedText(tableElement, lang);
              } else {
                innerContent = 'Error: Table not found for ' + lang;
                console.warn('Could not find table inside div[data-source-type="' + lang + '"]');
              }
              break;
            default:
              // Handles 'javascript', 'python', 'code', etc.
              var preElement = node.querySelector('pre');
              if (preElement) {
                var codeElement = preElement.querySelector('code');
                // textContent of <code> or <pre> contains the code.
                innerContent = (codeElement || preElement).textContent; // trimEnd removed, will be handled by trim() later
              } else {
                // Fallback if <pre> not found (e.g. if it was just a div with code)
                innerContent = node.textContent; // trimEnd removed
                console.warn('Could not find <pre> inside div[data-source-type="' + lang + '"]');
              }
              break;
          }
          var langTag = lang === 'code' ? '' : lang;
          var finalInnerContent = innerContent.trim(); // Trim whitespace consistently here

          if (finalInnerContent) {
            // If there's content after trimming
            finalInnerContent = '\n' + finalInnerContent + '\n';
          } else {
            // If content was empty or just whitespace
            finalInnerContent = '\n'; // Ensure a blank line for empty fenced blocks
          }
          return '\n```' + langTag + finalInnerContent + '```\n';
        }
      });

      // Preserve HTML image tags by returning their outerHTML
      this.turndownService.addRule('keepImageTags', {
        filter: 'img',
        replacement: function replacement(content, node) {
          return node.outerHTML;
        }
      });

      // TEMPORARILY DISABLED: Preserve standalone <svg> tags NOT inside a data-source-type div
      /*
      this.turndownService.addRule('keepStandaloneSvgTags', {
        filter: function(node) {
          if (node.nodeName !== 'SVG') return false;
          
          // Don't process SVG elements that are inside a data-source-type div
          const parentDiv = node.closest('div[data-source-type]');
          if (parentDiv) {
            console.warn('[HtmlToMarkdown] Skipping SVG inside data-source-type div');
            return false;
          }
          
          console.warn('[HtmlToMarkdown] Processing standalone SVG');
          return true;
        },
        replacement: function (content, node) {
          // console.warn('[HtmlToMarkdown] standalone SVG rule processing:', node.outerHTML);
          return node.outerHTML;
        }
      });
      */

      // Preserve Mermaid diagram blocks with special identifiers
      this.turndownService.addRule('mermaid', {
        filter: function filter(node) {
          return node.nodeName === 'DIV' && node.classList.contains('mermaid');
        },
        replacement: function replacement(content, node) {
          // Generate a unique ID for this mermaid block to help with matching later
          var blockId = 'mermaid_' + Math.random().toString(36).substring(2, 10);

          // Store the raw content for later use
          if (_this._specialBlocks) {
            _this._specialBlocks.set(blockId, {
              type: 'mermaid',
              content: node.textContent
            });
          }

          // Return with special marker that can be identified later
          return "\n<div data-special-block=\"".concat(blockId, "\" class=\"mermaid\">\n") + node.textContent + "\n</div>\n";
        }
      });

      /*
      // Preserve SVG elements with special identifiers
      this.turndownService.addRule('svg', {
        filter: node => {
          // Only apply this rule if the SVG is NOT inside one of our data-source-type divs
          // and has one of our specific identifiers (e.g., an id starting with "squib-svg-")
          // or if it does not have a data-source-type attribute itself.
          const isInsideSquibDiv = node.closest('div[data-source-type]');
          const hasSquibIdentifier = node.id && node.id.startsWith('squib-svg-'); // Example identifier
          const isSpecialSquibSvg = node.hasAttribute('data-source-type') && node.getAttribute('data-source-type') === 'svg';
           if (isInsideSquibDiv || isSpecialSquibSvg) {
            // console.warn('[HtmlToMarkdown] SVG rule: Skipping SVG inside data-source-type div or special SVG.');
            return false; // Don't process if it's already handled or should be handled by squibviewFencedBlock
          }
          // console.warn('[HtmlToMarkdown] SVG rule: Processing standalone SVG:', node.outerHTML.substring(0,100));
          return node.nodeName === 'SVG' && hasSquibIdentifier; // Or other conditions for standalone SVGs
        },
        replacement: function (content, node) {
          // console.warn('[HtmlToMarkdown] SVG rule: Replacing with outerHTML for node:', node.outerHTML.substring(0,100));
          return node.outerHTML; // Preserve the whole SVG tag
        }
      });
      */

      // Preserve GeoJSON map blocks
      this.turndownService.addRule('geojson', {
        filter: function filter(node) {
          return node.nodeName === 'DIV' && node.classList.contains('geojson-map');
        },
        replacement: function replacement(content, node) {
          // Generate a unique ID for this GeoJSON block
          var blockId = 'geojson_' + Math.random().toString(36).substring(2, 10);

          // Try to extract the GeoJSON data from the script element
          var geojsonContent = '';
          try {
            // The actual GeoJSON would be in a script tag or in a data attribute
            // Here we'll use a placeholder since the actual data is hard to extract
            geojsonContent = node.dataset.geojson || '{"type":"FeatureCollection","features":[]}';
          } catch (e) {
            console.error('Error extracting GeoJSON data:', e);
          }
          if (_this._specialBlocks) {
            _this._specialBlocks.set(blockId, {
              type: 'geojson',
              content: geojsonContent
            });
          }
          return "\n<div data-special-block=\"".concat(blockId, "\" class=\"geojson-container\">\n") + geojsonContent + "\n</div>\n";
        }
      });

      // Preserve Math blocks
      this.turndownService.addRule('math', {
        filter: function filter(node) {
          return node.nodeName === 'DIV' && node.classList.contains('math-display');
        },
        replacement: function replacement(content, node) {
          // Generate a unique ID for this math block
          var blockId = 'math_' + Math.random().toString(36).substring(2, 10);

          // Get the raw math content (might be wrapped in $$...$$ in the original)
          var mathContent = node.textContent;

          // Remove $$ delimiters if present
          mathContent = mathContent.replace(/^\$\$([\s\S]*)\$\$$/, '$1');
          if (_this._specialBlocks) {
            _this._specialBlocks.set(blockId, {
              type: 'math',
              content: mathContent
            });
          }
          return "\n<div data-special-block=\"".concat(blockId, "\" class=\"math-container\">\n") + mathContent + "\n</div>\n";
        }
      });

      // Special handling for code blocks
      this.turndownService.addRule('codeBlock', {
        filter: function filter(node) {
          return node.nodeName === 'PRE' && node.firstChild && node.firstChild.nodeName === 'CODE';
        },
        replacement: function replacement(content, node) {
          var code = node.firstChild.textContent;
          var language = '';

          // Try to detect language from class
          if (node.firstChild.className) {
            var match = node.firstChild.className.match(/language-(\w+)/);
            if (match) {
              language = match[1];
            }
          }
          return '\n```' + language + '\n' + code.trim() + '\n```\n';
        }
      });

      // Improve table handling
      this.turndownService.addRule('tableCell', {
        filter: ['th', 'td'],
        replacement: function replacement(content, node) {
          return ' ' + content.trim() + ' |';
        }
      });
      this.turndownService.addRule('tableRow', {
        filter: 'tr',
        replacement: function replacement(content, node) {
          var prefix = '|';

          // Handle header rows
          if (node.parentNode.nodeName === 'THEAD') {
            var cells = node.querySelectorAll('th, td').length;
            var separatorRow = '\n|' + ' --- |'.repeat(cells);
            return prefix + content + separatorRow;
          }
          return prefix + content + '\n';
        }
      });
      this.turndownService.addRule('table', {
        filter: 'table',
        replacement: function replacement(content, node) {
          // If this table is inside our data-source-type div, it's already handled.
          if (node.parentElement && node.parentElement.hasAttribute('data-source-type')) {
            var type = node.parentElement.getAttribute('data-source-type');
            if (type === 'csv' || type === 'tsv' || type === 'psv') {
              return content; // Turndown will process children, but our main rule handles the fence.
            }
          }
          // Default table processing otherwise
          // (Existing complex table rule logic from Turndown or custom might be here)
          // For simplicity, using a basic version of Turndown's own table handling as a placeholder
          // if not already handled by a more specific rule like the one above for data-source-type.
          var markdown = '';
          var headerRow = node.querySelector('thead tr');
          if (headerRow) {
            markdown += '|';
            headerRow.querySelectorAll('th').forEach(function (th) {
              markdown += " ".concat(_this.turndownService.turndown(th.innerHTML).trim(), " |");
            });
            markdown += '\n|';
            headerRow.querySelectorAll('th').forEach(function () {
              markdown += ' --- |';
            });
            markdown += '\n';
          }
          var bodyRows = node.querySelectorAll('tbody tr');
          bodyRows.forEach(function (row) {
            markdown += '|';
            row.querySelectorAll('td').forEach(function (td) {
              markdown += " ".concat(_this.turndownService.turndown(td.innerHTML).trim(), " |");
            });
            markdown += '\n';
          });
          return '\n' + markdown + '\n';
        }
      });

      // Ensure this class is aware of custom GFM task list items if not default in Turndown version
      this.turndownService.keep(['li']); // Keep <li> to allow custom rule for task list items
      this.turndownService.addRule('taskListItems', {
        filter: function filter(node) {
          return node.nodeName === 'LI' && node.firstChild && node.firstChild.nodeName === 'INPUT' && node.firstChild.type === 'checkbox';
        },
        replacement: function replacement(content, node) {
          var checkbox = node.firstChild;
          var checked = checkbox.checked;
          // Need to remove the input from the content that turndown processes for the <li>
          // The first child (input) is already handled, process the rest of the <li> content.
          // Create a temporary div to hold the rest of the li children
          var restOfLiContent = '';
          var current = checkbox.nextSibling;
          while (current) {
            restOfLiContent += current.outerHTML || current.textContent;
            current = current.nextSibling;
          }
          // Turndown the rest of the LI content
          var markdownContent = this.turndownService.turndown(restOfLiContent).trim();
          return (checked ? '[x] ' : '[ ] ') + markdownContent;
        }
      });
    }

    /**
     * Get a simplified hash code of a string for caching
     * 
     * @private
     * @param {string} str - The string to hash
     * @returns {string} A hash representation of the string
     */
  }, {
    key: "_getStringHash",
    value: function _getStringHash(str) {
      // Simple and fast hash function for strings
      // This is not a cryptographic hash, just for caching purposes
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        var _char = str.charCodeAt(i);
        hash = (hash << 5) - hash + _char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash.toString(36); // Convert to base36 for shorter string
    }

    /**
     * Convert HTML to Markdown with caching for performance
     * 
     * @param {string} html - The HTML content to convert
     * @param {Object} options - Additional options
     * @param {string} options.originalSource - The original source if available
     * @returns {string} The converted Markdown content
     */
  }, {
    key: "convert",
    value: function convert(html) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Clear special blocks map for this conversion
      this._specialBlocks.clear();
      this._placeholders = [];

      // Use a hash of the HTML as the cache key
      var cacheKey = this._getStringHash(html);

      // Check if we have a cached version
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Pre-process HTML to extract and preserve data-source-type containers
      var processedHtml = this._preProcessSpecialContainers(html);

      // Convert the HTML to Markdown
      var markdown = this.turndownService.turndown(processedHtml);

      // Post-process the markdown to restore special blocks
      markdown = this._postProcessMarkdown(markdown, options.originalSource);

      // Cache the result
      this.cache.set(cacheKey, markdown);

      // Keep the cache size under control
      if (this.cache.size > this.cacheSize) {
        // Remove the oldest entry
        var firstKey = this.cache.keys().next().value;
        this.cache["delete"](firstKey);
      }
      return markdown;
    }

    /**
     * Pre-process HTML to extract data-source-type containers and replace them with placeholders
     * 
     * @private
     * @param {string} html - The HTML to process
     * @returns {string} - The processed HTML with placeholders
     */
  }, {
    key: "_preProcessSpecialContainers",
    value: function _preProcessSpecialContainers(html) {
      var _this2 = this;
      // Handle both browser and test environments safely
      if (typeof document === 'undefined' || !document.createElement) {
        // If no document is available, skip pre-processing and use the original HTML
        console.warn('Document not available, skipping pre-processing');
        this._placeholders = [];
        return html;
      }
      var tempDiv;
      try {
        tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        // Test if querySelector is available - if not, we'll use a fallback approach
        if (typeof tempDiv.querySelector !== 'function') {
          throw new Error('querySelector not available');
        }
      } catch (e) {
        // Fallback: if DOM methods aren't available, use simple regex-based processing
        console.warn('DOM methods not available, using regex fallback for pre-processing');
        return this._regexFallbackPreProcess(html);
      }

      // Find all divs with data-source-type attribute
      var specialDivs = tempDiv.querySelectorAll('div[data-source-type]');
      var placeholders = [];
      specialDivs.forEach(function (div, index) {
        var sourceType = div.getAttribute('data-source-type');
        var placeholder = "__SPECIAL_CONTAINER_".concat(index, "__");
        var content;
        if (sourceType === 'svg' && div.hasAttribute('data-original-source')) {
          content = div.getAttribute('data-original-source');
        } else if (['mermaid', 'math', 'geojson', 'topojson', 'stl'].includes(sourceType) && div.hasAttribute('data-original-source')) {
          content = div.getAttribute('data-original-source');
        } else if (sourceType === 'csv' || sourceType === 'tsv' || sourceType === 'psv') {
          var tableElement = div.querySelector('table');
          if (tableElement) {
            content = _this2._htmlTableToDelimitedText(tableElement, sourceType);
          } else {
            content = 'Error: Table not found for ' + sourceType;
          }
        } else {
          var preElement = div.querySelector('pre');
          if (preElement) {
            var codeElement = preElement.querySelector('code');
            content = (codeElement || preElement).textContent.replace(/^[\r\n]+|[\r\n]+$/g, '');
          } else {
            content = div.textContent.replace(/^[\r\n]+|[\r\n]+$/g, '');
          }
        }
        placeholders.push({
          placeholder: placeholder,
          type: sourceType,
          content: content
        });
        var placeholderText = document.createTextNode(placeholder);
        if (div.parentNode) {
          div.parentNode.replaceChild(placeholderText, div);
        }
      });

      // Store placeholders for post-processing
      this._placeholders = placeholders;
      return tempDiv.innerHTML;
    }

    /**
     * Post-process markdown to restore special blocks and apply additional formatting
     * 
     * @private
     * @param {string} markdown - The converted markdown 
     * @param {string} originalSource - The original markdown source if available
     * @returns {string} - The processed markdown
     */
  }, {
    key: "_postProcessMarkdown",
    value: function _postProcessMarkdown(markdown, originalSource) {
      // First pass: Replace placeholders with proper fenced code blocks
      if (this._placeholders && this._placeholders.length > 0) {
        this._placeholders.forEach(function (_ref) {
          var placeholder = _ref.placeholder,
            type = _ref.type,
            content = _ref.content;
          var langTag = type === 'code' ? '' : type;
          var blockContent = content.replace(/^[\r\n]+|[\r\n]+$/g, '');
          var fencedBlock = "```".concat(langTag, "\n").concat(blockContent, "\n```");

          // Handle both DOM-based placeholders (text nodes) and regex-based placeholders
          var textPlaceholder = placeholder; // This is __SPECIAL_CONTAINER_${idx}__
          var escapedPlaceholder = textPlaceholder.replace(/_/g, '\\_'); // Turndown escapes underscores

          // Replace the placeholder with the fenced block (try both forms)
          if (markdown.includes(textPlaceholder)) {
            markdown = markdown.replace(textPlaceholder, fencedBlock);
          } else if (markdown.includes(escapedPlaceholder)) {
            markdown = markdown.replace(escapedPlaceholder, fencedBlock);
          }
        });
      }

      // Second pass: Convert any remaining special blocks markers back to proper markdown

      // Convert mermaid blocks
      var mermaidBlockRegex = /<div data-special-block="mermaid_[^"]*" class="mermaid">\s*([\s\S]*?)\s*<\/div>/g;
      markdown = markdown.replace(mermaidBlockRegex, function (match, content) {
        return "\n```mermaid\n".concat(content.trim(), "\n```\n");
      });

      // Convert SVG blocks
      var svgBlockRegex = /<div data-special-block="svg_[^"]*" class="svg-container">\s*([\s\S]*?)\s*<\/div>/g;
      markdown = markdown.replace(svgBlockRegex, function (match, content) {
        // Try to find a closing SVG tag
        var svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
        if (svgMatch) {
          return "\n```svg\n".concat(svgMatch[0], "\n```\n");
        }
        return match;
      });

      // Convert GeoJSON blocks
      var geojsonBlockRegex = /<div data-special-block="geojson_[^"]*" class="geojson-container">\s*([\s\S]*?)\s*<\/div>/g;
      markdown = markdown.replace(geojsonBlockRegex, function (match, content) {
        try {
          // Ensure content is valid JSON before creating the code block
          JSON.parse(content);
          return "\n```geojson\n".concat(content.trim(), "\n```\n");
        } catch (e) {
          console.error('Invalid GeoJSON data:', e);
          return "\n```geojson\n{\"type\":\"FeatureCollection\",\"features\":[]}\n```\n";
        }
      });

      // Convert Math blocks
      var mathBlockRegex = /<div data-special-block="math_[^"]*" class="math-container">\s*([\s\S]*?)\s*<\/div>/g;
      markdown = markdown.replace(mathBlockRegex, function (match, content) {
        return "\n```math\n".concat(content.trim(), "\n```\n");
      });

      // Second pass: Restore blocks from original source if possible
      if (originalSource) {
        // Extract code blocks from original source
        var codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/g;
        var match;
        var blockIndex = 0;
        var originalBlocks = [];
        while ((match = codeBlockRegex.exec(originalSource)) !== null) {
          var type = match[1];
          match[2];
          if (type === 'mermaid' || type === 'svg' || type === 'geojson' || type === 'topojson' || type === 'stl' || type === 'math') {
            originalBlocks.push({
              type: type,
              content: match[0],
              index: blockIndex++
            });
          }
        }

        // Try to match original blocks with current blocks
        // This is a simplistic approach that assumes blocks are in the same order

        var mermaidIndex = 0;
        var svgIndex = 0;
        var geojsonIndex = 0;
        var mathIndex = 0;

        // Replace mermaid blocks
        markdown = markdown.replace(/```mermaid\s*([\s\S]*?)```/g, function (match, content) {
          var mermaidBlocks = originalBlocks.filter(function (b) {
            return b.type === 'mermaid';
          });
          if (mermaidIndex < mermaidBlocks.length) {
            return mermaidBlocks[mermaidIndex++].content;
          }
          return match;
        });

        // Replace SVG blocks
        markdown = markdown.replace(/```svg\s*([\s\S]*?)```/g, function (match, content) {
          var svgBlocks = originalBlocks.filter(function (b) {
            return b.type === 'svg';
          });
          if (svgIndex < svgBlocks.length) {
            return svgBlocks[svgIndex++].content;
          }
          return match;
        });

        // Replace GeoJSON blocks
        markdown = markdown.replace(/```geojson\s*([\s\S]*?)```/g, function (match, content) {
          var geojsonBlocks = originalBlocks.filter(function (b) {
            return b.type === 'geojson';
          });
          if (geojsonIndex < geojsonBlocks.length) {
            return geojsonBlocks[geojsonIndex++].content;
          }
          return match;
        });

        // Replace TopoJSON blocks
        var topojsonIndex = 0;
        markdown = markdown.replace(/```topojson\s*([\s\S]*?)```/g, function (match, content) {
          var topojsonBlocks = originalBlocks.filter(function (b) {
            return b.type === 'topojson';
          });
          if (topojsonIndex < topojsonBlocks.length) {
            return topojsonBlocks[topojsonIndex++].content;
          }
          return match;
        });

        // Replace STL blocks
        var stlIndex = 0;
        markdown = markdown.replace(/```stl\s*([\s\S]*?)```/g, function (match, content) {
          var stlBlocks = originalBlocks.filter(function (b) {
            return b.type === 'stl';
          });
          if (stlIndex < stlBlocks.length) {
            return stlBlocks[stlIndex++].content;
          }
          return match;
        });

        // Replace Math blocks
        markdown = markdown.replace(/```math\s*([\s\S]*?)```/g, function (match, content) {
          var mathBlocks = originalBlocks.filter(function (b) {
            return b.type === 'math';
          });
          if (mathIndex < mathBlocks.length) {
            return mathBlocks[mathIndex++].content;
          }
          return match;
        });
      }
      return markdown;
    }

    /**
     * Converts an HTML table element to a delimited string (CSV, TSV, etc.).
     * @param {HTMLTableElement} tableElement The HTML table element.
     * @param {string} type The type of delimited format ('csv', 'tsv', 'psv').
     * @returns {string} The delimited text representation of the table.
     * @private
     */
  }, {
    key: "_htmlTableToDelimitedText",
    value: function _htmlTableToDelimitedText(tableElement, type) {
      var delimiter;
      switch (type) {
        case 'csv':
          delimiter = ',';
          break;
        case 'tsv':
          delimiter = '\t';
          break;
        case 'psv':
          delimiter = '|';
          break;
        default:
          delimiter = ',';
        // Default to CSV
      }
      var data = [];

      // Check if we have proper DOM methods available
      if (!tableElement || typeof tableElement.querySelectorAll !== 'function') {
        console.warn('DOM methods not available for table extraction, using regex fallback');
        return this._extractTableDataFromHtml(tableElement ? tableElement.outerHTML || tableElement.innerHTML || String(tableElement) : '', type);
      }
      var rows = tableElement.querySelectorAll('tr');

      // Additional safety check for the rows result
      if (!rows || typeof rows.forEach !== 'function') {
        console.warn('querySelectorAll did not return proper NodeList, falling back to regex');
        return this._extractTableDataFromHtml(tableElement.outerHTML || tableElement.innerHTML || String(tableElement), type);
      }
      rows.forEach(function (row) {
        var rowData = [];
        var cells = row.querySelectorAll('th, td');
        cells.forEach(function (cell) {
          // Basic text content extraction. For complex cell content, might need refinement.
          // Replace newlines within a cell with a space, trim content.
          var cellText = cell.textContent || '';
          cellText = cellText.replace(/\r?\n|\r/g, ' ').trim();
          // If delimiter is comma, and cellText contains comma, quote it.
          if (delimiter === ',' && cellText.includes(',')) {
            cellText = "\"".concat(cellText.replace(/"/g, '""'), "\"");
          }
          // If delimiter is tab, and cellText contains tab, it might be an issue depending on consumer.
          // For PSV, if cellText contains pipe, it's an issue unless handled by quoting (not standard for PSV).
          rowData.push(cellText);
        });
        data.push(rowData.join(delimiter));
      });
      return data.join('\n');
    }

    /**
     * Extract table data from HTML content using regex when DOM methods aren't available
     * 
     * @private
     * @param {string} htmlContent - The HTML content containing the table
     * @param {string} type - The type of delimited format ('csv', 'tsv', 'psv')
     * @returns {string} - The extracted delimited text
     */
  }, {
    key: "_extractTableDataFromHtml",
    value: function _extractTableDataFromHtml(htmlContent, type) {
      var delimiter;
      switch (type) {
        case 'csv':
          delimiter = ',';
          break;
        case 'tsv':
          delimiter = '\t';
          break;
        case 'psv':
          delimiter = '|';
          break;
        default:
          delimiter = ',';
        // Default to CSV
      }
      try {
        // Extract all table rows using regex
        var rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
        var rows = [];
        var match;
        while ((match = rowRegex.exec(htmlContent)) !== null) {
          var rowContent = match[1];

          // Extract all cells (th or td) from this row
          var cellRegex = /<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/gi;
          var cells = [];
          var cellMatch = void 0;
          while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
            var cellText = cellMatch[1];

            // Remove HTML tags and decode entities
            cellText = cellText.replace(/<[^>]*>/g, '') // Remove all HTML tags
            .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\r?\n|\r/g, ' ') // Replace newlines with spaces
            .trim();

            // Handle CSV quoting if cell contains delimiter
            if (delimiter === ',' && cellText.includes(',')) {
              cellText = "\"".concat(cellText.replace(/"/g, '""'), "\"");
            }
            cells.push(cellText);
          }
          if (cells.length > 0) {
            rows.push(cells.join(delimiter));
          }
        }
        return rows.join('\n');
      } catch (e) {
        console.error('Error extracting table data from HTML:', e);
        return 'Error: Could not extract table data';
      }
    }

    /**
     * Regex-based fallback for pre-processing when DOM methods aren't available
     * 
     * @private
     * @param {string} html - The HTML to process
     * @returns {string} - The processed HTML with placeholders
     */
  }, {
    key: "_regexFallbackPreProcess",
    value: function _regexFallbackPreProcess(html) {
      var _this3 = this;
      // Simple regex-based approach when DOM isn't available
      // This matches div elements with data-source-type attributes
      var divRegex = /<div[^>]*data-source-type="([^"]*)"[^>]*>([\s\S]*?)<\/div>/g;
      var placeholders = [];
      var index = 0;
      var processedHtml = html.replace(divRegex, function (match, sourceType, content) {
        var placeholder = "__SPECIAL_CONTAINER_".concat(index, "__");

        // Extract content based on type
        var extractedContent;
        if (sourceType === 'svg') {
          // For SVG, look for data-original-source attribute first
          var originalSourceMatch = match.match(/data-original-source="([^"]*)"/);
          if (originalSourceMatch) {
            // Decode HTML entities in the attribute value
            extractedContent = originalSourceMatch[1].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
          } else {
            // Fallback to inner SVG content
            var svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
            extractedContent = svgMatch ? svgMatch[0] : content;
          }
        } else if (sourceType === 'csv' || sourceType === 'tsv' || sourceType === 'psv') {
          // For delimited data, we need to extract from table using regex
          extractedContent = _this3._extractTableDataFromHtml(content, sourceType);
        } else {
          // For code blocks, extract from pre/code elements
          var preMatch = content.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/);
          if (preMatch) {
            extractedContent = preMatch[1].replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
          } else {
            // For other content types (mermaid, math, etc.), use raw content but decode HTML entities
            extractedContent = content.replace(/<[^>]*>/g, '') // Remove any HTML tags
            .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); // &amp; should be last to avoid double-decoding
          }
        }
        placeholders.push({
          placeholder: placeholder,
          type: sourceType,
          content: extractedContent
        });
        index++;
        return "<p>".concat(placeholder, "</p>");
      });

      // Store placeholders for post-processing
      this._placeholders = placeholders;
      return processedHtml;
    }
  }]);
}();

var HtmlToMarkdown$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: HtmlToMarkdown
});

/**
 * RevisionHistory class handles content revisions with memory-efficient diff storage
 */
var RevisionManager = /*#__PURE__*/function () {
  /**
   * Creates a new RevisionManager instance
   */
  function RevisionManager() {
    _classCallCheck(this, RevisionManager);
    this.initialContent = '';
    this.initialContentType = ''; // Store the initial content type separately
    this.contentType = ''; // Current content type
    this.diffs = [];
    this.currentIndex = -1;
    this.diffEngine = new DiffMatchPatch();
  }

  /**
   * Initializes the revision manager with initial content
   *
   * @param {string} content - The initial content
   * @param {string} contentType - The content type
   */
  return _createClass(RevisionManager, [{
    key: "initialize",
    value: function initialize(content, contentType) {
      this.initialContent = content;
      this.initialContentType = contentType; // Store initial content type
      this.contentType = contentType; // Current content type
      this.diffs = [];
      this.currentIndex = -1;
    }

    /**
     * Adds a new revision
     *
     * @param {string} newContent - The new content to add as a revision
     * @param {string} contentType - The content type of the revision
     */
  }, {
    key: "addRevision",
    value: function addRevision(newContent, contentType) {
      // Calculate diff between current state and new state
      var currentContent = this.getCurrentContent();
      var diff = this.diffEngine.diff_main(currentContent, newContent);
      this.diffEngine.diff_cleanupSemantic(diff);
      var patchText = this.diffEngine.patch_toText(this.diffEngine.patch_make(currentContent, diff));

      // Remove any forward history if we're branching
      if (this.currentIndex < this.diffs.length - 1) {
        this.diffs = this.diffs.slice(0, this.currentIndex + 1);
      }

      // Add new diff and update content type if it changed
      this.diffs.push({
        diff: patchText,
        contentType: contentType !== this.contentType ? contentType : undefined
      });

      // Update the content type if it changed
      if (contentType !== this.contentType) {
        this.contentType = contentType;
      }
      this.currentIndex = this.diffs.length - 1;
    }

    /**
     * Moves backward in the revision history
     *
     * @returns {Object|null} The previous revision state or null if at the beginning
     */
  }, {
    key: "undo",
    value: function undo() {
      if (this.currentIndex >= 0) {
        this.currentIndex--;
        return {
          content: this.getCurrentContent(),
          contentType: this.getCurrentContentType()
        };
      }
      return null;
    }

    /**
     * Moves forward in the revision history
     *
     * @returns {Object|null} The next revision state or null if at the end
     */
  }, {
    key: "redo",
    value: function redo() {
      if (this.currentIndex < this.diffs.length - 1) {
        this.currentIndex++;
        return {
          content: this.getCurrentContent(),
          contentType: this.getCurrentContentType()
        };
      }
      return null;
    }

    /**
     * Gets the content at the current revision point
     *
     * @returns {string} The current content
     */
  }, {
    key: "getCurrentContent",
    value: function getCurrentContent() {
      if (this.currentIndex < 0) return this.initialContent;

      // Apply all diffs up to currentIndex
      var content = this.initialContent;
      for (var i = 0; i <= this.currentIndex; i++) {
        var patches = this.diffEngine.patch_fromText(this.diffs[i].diff);
        var _this$diffEngine$patc = this.diffEngine.patch_apply(patches, content),
          _this$diffEngine$patc2 = _slicedToArray(_this$diffEngine$patc, 1),
          patchedText = _this$diffEngine$patc2[0];
        content = patchedText;
      }
      return content;
    }

    /**
     * Gets the content type at the current revision point
     *
     * @returns {string} The current content type
     */
  }, {
    key: "getCurrentContentType",
    value: function getCurrentContentType() {
      if (this.currentIndex < 0) return this.initialContentType;

      // Find the last content type change up to the current index
      var currentType = this.initialContentType;
      for (var i = 0; i <= this.currentIndex; i++) {
        if (this.diffs[i].contentType !== undefined) {
          currentType = this.diffs[i].contentType;
        }
      }
      return currentType;
    }

    /**
     * Sets the revision to a specific index
     *
     * @param {number} index - The revision index to set
     * @returns {Object|null} The revision state at the index or null if invalid
     */
  }, {
    key: "setRevision",
    value: function setRevision(index) {
      if (index >= -1 && index < this.diffs.length) {
        this.currentIndex = index;
        return {
          content: this.getCurrentContent(),
          contentType: this.getCurrentContentType()
        };
      }
      return null;
    }

    /**
     * Returns the total number of revisions
     *
     * @returns {number} The number of revisions
     */
  }, {
    key: "getRevisionCount",
    value: function getRevisionCount() {
      return this.diffs.length;
    }

    /**
     * Returns the current index in the revision history
     *
     * @returns {number} The current revision index
     */
  }, {
    key: "getCurrentIndex",
    value: function getCurrentIndex() {
      return this.currentIndex;
    }

    /**
     * Gets the content at a specific revision index
     *
     * @param {number} index - Revision index (-1 for initial, 0 to n-1 for revisions)
     * @returns {Object} Object with { content: string, contentType: string }
     */
  }, {
    key: "getContentAtRevision",
    value: function getContentAtRevision(index) {
      // Validate index
      if (index < -1 || index >= this.diffs.length) {
        throw new Error("Invalid revision index: ".concat(index, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }

      // Return initial content if index is -1
      if (index === -1) {
        return {
          content: this.initialContent,
          contentType: this.initialContentType
        };
      }

      // Apply diffs up to the specified index to get content
      var content = this.initialContent;
      for (var i = 0; i <= index; i++) {
        var patches = this.diffEngine.patch_fromText(this.diffs[i].diff);
        var _this$diffEngine$patc3 = this.diffEngine.patch_apply(patches, content),
          _this$diffEngine$patc4 = _slicedToArray(_this$diffEngine$patc3, 1),
          patchedText = _this$diffEngine$patc4[0];
        content = patchedText;
      }

      // Find the content type at this revision
      var currentType = this.initialContentType;
      for (var _i = 0; _i <= index; _i++) {
        if (this.diffs[_i].contentType !== undefined) {
          currentType = this.diffs[_i].contentType;
        }
      }
      return {
        content: content,
        contentType: currentType
      };
    }

    /**
     * Computes diff between two revisions
     *
     * @param {number} fromIndex - Starting revision index (null for current)
     * @param {number} toIndex - Ending revision index (null for current)
     * @returns {Array} DiffMatchPatch diff array
     */
  }, {
    key: "computeDiff",
    value: function computeDiff() {
      var fromIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var toIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Default to comparing previous revision to current if not specified
      if (fromIndex === null) {
        fromIndex = this.currentIndex - 1;
      }
      if (toIndex === null) {
        toIndex = this.currentIndex;
      }

      // Validate indices
      if (fromIndex < -1 || fromIndex >= this.diffs.length) {
        throw new Error("Invalid fromIndex: ".concat(fromIndex, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }
      if (toIndex < -1 || toIndex >= this.diffs.length) {
        throw new Error("Invalid toIndex: ".concat(toIndex, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }
      if (fromIndex > toIndex) {
        throw new Error("fromIndex (".concat(fromIndex, ") cannot be greater than toIndex (").concat(toIndex, ")"));
      }

      // Get content at both revisions
      var fromContent = this.getContentAtRevision(fromIndex).content;
      var toContent = this.getContentAtRevision(toIndex).content;

      // Compute and return the diff
      var diff = this.diffEngine.diff_main(fromContent, toContent);
      this.diffEngine.diff_cleanupSemantic(diff);
      return diff;
    }

    /**
     * Computes line-based diff between revisions
     *
     * @param {number} fromIndex - Starting revision index (null for current - 1)
     * @param {number} toIndex - Ending revision index (null for current)
     * @returns {Array} Array of line diff objects with { type, content, oldLineNum, newLineNum }
     */
  }, {
    key: "computeLineDiff",
    value: function computeLineDiff() {
      var fromIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var toIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Default to comparing previous revision to current if not specified
      if (fromIndex === null) {
        fromIndex = this.currentIndex - 1;
      }
      if (toIndex === null) {
        toIndex = this.currentIndex;
      }

      // Validate indices
      if (fromIndex < -1 || fromIndex >= this.diffs.length) {
        throw new Error("Invalid fromIndex: ".concat(fromIndex, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }
      if (toIndex < -1 || toIndex >= this.diffs.length) {
        throw new Error("Invalid toIndex: ".concat(toIndex, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }
      if (fromIndex > toIndex) {
        throw new Error("fromIndex (".concat(fromIndex, ") cannot be greater than toIndex (").concat(toIndex, ")"));
      }

      // Get the full content to properly handle line numbers
      var fromContent = this.getContentAtRevision(fromIndex).content;
      var toContent = this.getContentAtRevision(toIndex).content;

      // Split content into lines for reference
      fromContent.split('\n');
      toContent.split('\n');

      // Use diff_match_patch to compute line-level diffs
      var lineDiff = this.diffEngine.diff_linesToChars_(fromContent, toContent);
      var diffs = this.diffEngine.diff_main(lineDiff.chars1, lineDiff.chars2, false);
      this.diffEngine.diff_charsToLines_(diffs, lineDiff.lineArray);

      // Convert to our format
      var lineDiffs = [];
      var oldLineNum = 1;
      var newLineNum = 1;
      var _iterator = _createForOfIteratorHelper(diffs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            operation = _step$value[0],
            text = _step$value[1];
          var lines = text.split('\n').filter(function (line, idx, arr) {
            return (
              // Keep all lines except empty last one (which is just the trailing newline)
              idx < arr.length - 1 || line !== ''
            );
          });
          var _iterator2 = _createForOfIteratorHelper(lines),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var line = _step2.value;
              if (operation === DiffMatchPatch.DIFF_EQUAL) {
                lineDiffs.push({
                  type: 'unchanged',
                  content: line,
                  oldLineNum: oldLineNum,
                  newLineNum: newLineNum
                });
                oldLineNum++;
                newLineNum++;
              } else if (operation === DiffMatchPatch.DIFF_DELETE) {
                lineDiffs.push({
                  type: 'removed',
                  content: line,
                  oldLineNum: oldLineNum,
                  newLineNum: null
                });
                oldLineNum++;
              } else if (operation === DiffMatchPatch.DIFF_INSERT) {
                lineDiffs.push({
                  type: 'added',
                  content: line,
                  oldLineNum: null,
                  newLineNum: newLineNum
                });
                newLineNum++;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return lineDiffs;
    }

    /**
     * Gets statistics about changes between revisions
     *
     * @param {number} fromIndex - Starting revision index (null for current - 1)
     * @param {number} toIndex - Ending revision index (null for current)
     * @returns {Object} Stats object with { additions, deletions, modifications, totalChanges }
     */
  }, {
    key: "getDiffStats",
    value: function getDiffStats() {
      var fromIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var toIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Default to comparing previous revision to current if not specified
      if (fromIndex === null) {
        fromIndex = this.currentIndex - 1;
      }
      if (toIndex === null) {
        toIndex = this.currentIndex;
      }

      // Validate indices (same validation as computeLineDiff)
      if (fromIndex < -1 || fromIndex >= this.diffs.length) {
        throw new Error("Invalid fromIndex: ".concat(fromIndex, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }
      if (toIndex < -1 || toIndex >= this.diffs.length) {
        throw new Error("Invalid toIndex: ".concat(toIndex, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }
      if (fromIndex > toIndex) {
        throw new Error("fromIndex (".concat(fromIndex, ") cannot be greater than toIndex (").concat(toIndex, ")"));
      }

      // Get the line diff
      var lineDiff = this.computeLineDiff(fromIndex, toIndex);

      // Calculate statistics
      var stats = {
        additions: 0,
        deletions: 0,
        modifications: 0,
        totalChanges: 0
      };

      // Count different types of changes
      for (var i = 0; i < lineDiff.length; i++) {
        var line = lineDiff[i];
        if (line.type === 'added') {
          stats.additions++;
          stats.totalChanges++;
        } else if (line.type === 'removed') {
          stats.deletions++;
          stats.totalChanges++;

          // Check if this is part of a modification (removed line followed by added line)
          // This is a simplified heuristic - a more sophisticated approach would use
          // line similarity analysis
          if (i + 1 < lineDiff.length && lineDiff[i + 1].type === 'added') {
            stats.modifications++;
            // Don't double count the deletion and addition as separate changes
            stats.totalChanges--;
          }
        }
      }
      return stats;
    }

    /**
     * Gets metadata about a revision
     *
     * @param {number} index - Revision index (-1 for initial, 0+ for revisions)
     * @returns {Object} Revision metadata including index, contentType, size, and other info
     */
  }, {
    key: "getRevisionInfo",
    value: function getRevisionInfo(index) {
      // Validate index
      if (index < -1 || index >= this.diffs.length) {
        throw new Error("Invalid revision index: ".concat(index, ". Valid range: -1 to ").concat(this.diffs.length - 1));
      }

      // Get the content at this revision
      var _this$getContentAtRev = this.getContentAtRevision(index),
        content = _this$getContentAtRev.content,
        contentType = _this$getContentAtRev.contentType;

      // Build revision info object
      var info = {
        index: index,
        contentType: contentType,
        contentSize: content.length,
        lineCount: content.split('\n').length,
        isCurrent: index === this.currentIndex
      };

      // Add diff-specific info for non-initial revisions
      if (index >= 0) {
        info.diffSize = this.diffs[index].diff.length;
        info.hasContentTypeChange = this.diffs[index].contentType !== undefined;

        // Add stats comparing to previous revision
        var stats = this.getDiffStats(index - 1, index);
        info.changeStats = stats;
      } else {
        // Initial revision has no diff
        info.diffSize = 0;
        info.hasContentTypeChange = false;
        info.changeStats = {
          additions: 0,
          deletions: 0,
          modifications: 0,
          totalChanges: 0
        };
      }
      return info;
    }
  }]);
}();

// Import highlight.js for syntax highlighting
// Use dynamic lookup to maintain compatibility with different build targets
function getHljs() {
  try {
    if (typeof window !== 'undefined' && window.hljs) {
      return window.hljs;
    }
    if (typeof global !== 'undefined' && global.hljs) {
      return global.hljs;
    }
  } catch (e) {
    // Ignore errors
  }
  return null;
}

// Fix for development mode
/*
try {
  if (!TinyEmitter || !DiffMatchPatch) {
    // If direct imports failed, try the shim
    const shim = await import('./import-shim.js');
    if (!TinyEmitter && shim.TinyEmitter) TinyEmitter = shim.TinyEmitter;
    if (!DiffMatchPatch && shim.DiffMatchPatch) DiffMatchPatch = shim.DiffMatchPatch;
  }
} catch (e) {
  console.warn('Import shim not available, continuing with direct imports', e);
}
*/

/**
 * SquibView is a lightweight editor that live-renders different content types
 */
var SquibView = /*#__PURE__*/function () {
  /**
   * Creates a new SquibView instance.
   * 
   * @param {HTMLElement|string} element - The DOM element or selector where the editor will be mounted
   * @param {Object} options - Configuration options for the editor
   * @param {string} [options.initialContent=''] - Initial content to load
   * @param {string} [options.inputContentType='md'] - Type of the initial content ('md', 'html', 'reveal', 'csv', 'tsv')
   * @param {boolean} [options.showControls=true] - Whether to show the control buttons
   * @param {boolean} [options.titleShow=false] - Whether to show the title section
   * @param {string} [options.titleContent=''] - Content for the title section
   * @param {string} [options.initialView='split'] - Initial view mode ('src', 'html', 'split')
   * @param {string} [options.baseClass='squibview'] - Base CSS class for styling
   * @param {Object|null} [options.autoload_deps=null] - Configuration for autoloading dependencies. null = disabled (default), { all: true } = enable all, or fine-grained control per library
   * @throws {Error} Throws if the container element is not found
   */
  function SquibView(element) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SquibView);
    /**
     * Debounced version of updateLineNumbers
     * @private
     */
    _defineProperty(this, "updateLineNumbersDebounced", this.debounce(function () {
      requestAnimationFrame(function () {
        return _this.updateLineNumbers();
      });
    }, 100));
    this.options = _objectSpread2(_objectSpread2({}, SquibView.defaultOptions), options);
    this.container = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Initialize autoload configuration
    this._initializeAutoload();

    // Initialize event emitter for plugin communication and selection events
    this.events = new TinyEmitter();

    // Initialize revision manager
    this.revisionManager = new RevisionManager();

    // Track last selection data
    this.lastSelectionData = null;

    // Store text selection handlers
    this._onTextReplacementHandler = null;

    // Initialize renderer registry
    this.renderers = {};

    // Initialize HTML to Markdown converter
    this._initializeHtmlToMarkdown();

    // Initialize libraries and register default renderers
    this.initializeLibraries();
    this.registerDefaultRenderers();

    // Create DOM structure
    this.createStructure();
    this.initializeEventHandlers();
    this.initializeResizeObserver();

    // Initialize line numbers if enabled
    if (this.options.showLineNumbers) {
      this.initializeLineNumbers();
    }

    // Set initial content
    if (this.options.initialContent) {
      this.revisionManager.initialize(this.options.initialContent, this.options.inputContentType);
      this.setContent(this.options.initialContent, this.options.inputContentType, false);
    } else {
      this.revisionManager.initialize('', this.options.inputContentType);
    }

    // Set initial view
    this.setView(this.options.initialView);

    // Update UI elements based on current content type
    this.updateTypeButtons();

    // Set up text replacement handler if provided in options
    if (this.options.onReplaceSelectedText) {
      this.onReplaceSelectedText = this.options.onReplaceSelectedText;
    }
  }

  /**
   * Initialize autoload configuration
   * @private
   */
  return _createClass(SquibView, [{
    key: "_initializeAutoload",
    value: function _initializeAutoload() {
      var _this2 = this;
      var autoloadConfig = this.options.autoload_deps;

      // If autoload is disabled (null or false), do nothing
      if (!autoloadConfig) {
        this.autoloadConfig = null;
        return;
      }

      // Parse the configuration
      this.autoloadConfig = {
        enabled: true,
        cdnUrls: _objectSpread2(_objectSpread2({}, SquibView.DEFAULT_CDN_URLS), autoloadConfig.cdnUrls || {}),
        libraries: {}
      };

      // Helper to parse library config
      var parseLibConfig = function parseLibConfig(libName, config) {
        // If 'all' is set, apply to all libraries
        if (config.all === true) {
          return {
            strategy: 'ondemand'
          };
        } else if (config.all === 'auto') {
          return {
            strategy: 'auto'
          };
        } else if (config.all === false) {
          return {
            strategy: 'none'
          };
        }

        // Check specific library config
        var libConfig = config[libName];
        if (libConfig === false || libConfig === 'none') {
          return {
            strategy: 'none'
          };
        } else if (libConfig === true || libConfig === 'ondemand') {
          return {
            strategy: 'ondemand'
          };
        } else if (libConfig === 'auto') {
          return {
            strategy: 'auto'
          };
        } else if (typeof libConfig === 'function') {
          return {
            strategy: 'custom',
            handler: libConfig
          };
        } else if (_typeof(libConfig) === 'object') {
          return libConfig;
        }

        // Default based on 'all' setting or ondemand
        return config.all ? {
          strategy: 'ondemand'
        } : {
          strategy: 'none'
        };
      };

      // Configure each library
      ['mermaid', 'hljs', 'mathjax', 'leaflet', 'three'].forEach(function (lib) {
        _this2.autoloadConfig.libraries[lib] = parseLibConfig(lib, autoloadConfig);
      });

      // Track loaded libraries
      this.loadedLibraries = new Set();
      this.loadingPromises = {};

      // Load 'auto' libraries immediately after init
      setTimeout(function () {
        return _this2._loadAutoLibraries();
      }, 0);
    }

    /**
     * Load libraries configured with 'auto' strategy
     * @private
     */
  }, {
    key: "_loadAutoLibraries",
    value: (function () {
      var _loadAutoLibraries2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _i, _Object$entries, _Object$entries$_i, libName, config;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.autoloadConfig || !this.autoloadConfig.enabled)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _i = 0, _Object$entries = Object.entries(this.autoloadConfig.libraries);
            case 3:
              if (!(_i < _Object$entries.length)) {
                _context.next = 11;
                break;
              }
              _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), libName = _Object$entries$_i[0], config = _Object$entries$_i[1];
              if (!(config.strategy === 'auto')) {
                _context.next = 8;
                break;
              }
              _context.next = 8;
              return this._autoloadLibrary(libName);
            case 8:
              _i++;
              _context.next = 3;
              break;
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function _loadAutoLibraries() {
        return _loadAutoLibraries2.apply(this, arguments);
      }
      return _loadAutoLibraries;
    }()
    /**
     * Load a script dynamically
     * @private
     */
    )
  }, {
    key: "_loadScript",
    value: function _loadScript(src) {
      return new Promise(function (resolve, reject) {
        if (document.querySelector("script[src=\"".concat(src, "\"]"))) {
          resolve();
          return;
        }
        var script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = function () {
          return reject(new Error("Failed to load script: ".concat(src)));
        };
        document.head.appendChild(script);
      });
    }

    /**
     * Load a CSS file dynamically
     * @private
     */
  }, {
    key: "_loadCSS",
    value: function _loadCSS(href) {
      return new Promise(function (resolve, reject) {
        if (document.querySelector("link[href=\"".concat(href, "\"]"))) {
          resolve();
          return;
        }
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = function () {
          return reject(new Error("Failed to load CSS: ".concat(href)));
        };
        document.head.appendChild(link);
      });
    }

    /**
     * Autoload a specific library
     * @private
     */
  }, {
    key: "_autoloadLibrary",
    value: (function () {
      var _autoloadLibrary2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(libName) {
        var config, result, cdnConfig, _result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!this.autoloadConfig || !this.autoloadConfig.enabled)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", false);
            case 2:
              config = this.autoloadConfig.libraries[libName];
              if (!(!config || config.strategy === 'none')) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return", false);
            case 5:
              if (!this.loadedLibraries.has(libName)) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", true);
            case 7:
              if (!this._isLibraryLoaded(libName)) {
                _context2.next = 10;
                break;
              }
              this.loadedLibraries.add(libName);
              return _context2.abrupt("return", true);
            case 10:
              if (!(config.strategy === 'custom' && config.handler)) {
                _context2.next = 16;
                break;
              }
              _context2.next = 13;
              return config.handler();
            case 13:
              result = _context2.sent;
              if (result) this.loadedLibraries.add(libName);
              return _context2.abrupt("return", result);
            case 16:
              if (!this.loadingPromises[libName]) {
                _context2.next = 18;
                break;
              }
              return _context2.abrupt("return", this.loadingPromises[libName]);
            case 18:
              // Start loading
              cdnConfig = this.autoloadConfig.cdnUrls[libName];
              if (cdnConfig) {
                _context2.next = 21;
                break;
              }
              return _context2.abrupt("return", false);
            case 21:
              this.loadingPromises[libName] = this._loadLibraryAssets(libName, cdnConfig);
              _context2.prev = 22;
              _context2.next = 25;
              return this.loadingPromises[libName];
            case 25:
              _result = _context2.sent;
              if (_result) {
                this.loadedLibraries.add(libName);
                // Re-initialize if needed
                if (libName === 'mermaid') {
                  this.initializeLibraries();
                }
              }
              return _context2.abrupt("return", _result);
            case 28:
              _context2.prev = 28;
              delete this.loadingPromises[libName];
              return _context2.finish(28);
            case 31:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[22,, 28, 31]]);
      }));
      function _autoloadLibrary(_x) {
        return _autoloadLibrary2.apply(this, arguments);
      }
      return _autoloadLibrary;
    }()
    /**
     * Load library assets (script and optional CSS)
     * @private
     */
    )
  }, {
    key: "_loadLibraryAssets",
    value: (function () {
      var _loadLibraryAssets2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(libName, cdnConfig) {
        var promises;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              promises = [];
              if (cdnConfig.script) {
                promises.push(this._loadScript(cdnConfig.script));
              }
              if (cdnConfig.css) {
                promises.push(this._loadCSS(cdnConfig.css));
              }
              _context3.next = 6;
              return Promise.all(promises);
            case 6:
              _context3.next = 8;
              return this._waitForLibrary(libName);
            case 8:
              if (!(libName === 'three' && window.THREE)) {
                _context3.next = 15;
                break;
              }
              if (!this.autoloadConfig.cdnUrls.stlLoader) {
                _context3.next = 12;
                break;
              }
              _context3.next = 12;
              return this._loadScript(this.autoloadConfig.cdnUrls.stlLoader.script);
            case 12:
              if (!this.autoloadConfig.cdnUrls.orbitControls) {
                _context3.next = 15;
                break;
              }
              _context3.next = 15;
              return this._loadScript(this.autoloadConfig.cdnUrls.orbitControls.script);
            case 15:
              return _context3.abrupt("return", this._isLibraryLoaded(libName));
            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              if (this.autoloadConfig.debug) {
                console.error("Failed to load ".concat(libName, ":"), _context3.t0);
              }
              return _context3.abrupt("return", false);
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 18]]);
      }));
      function _loadLibraryAssets(_x2, _x3) {
        return _loadLibraryAssets2.apply(this, arguments);
      }
      return _loadLibraryAssets;
    }()
    /**
     * Wait for a library to become available
     * @private
     */
    )
  }, {
    key: "_waitForLibrary",
    value: function _waitForLibrary(libName) {
      var _this3 = this;
      var maxAttempts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
      return new Promise(function (resolve) {
        var attempts = 0;
        var _check = function check() {
          if (_this3._isLibraryLoaded(libName) || attempts >= maxAttempts) {
            resolve();
          } else {
            attempts++;
            setTimeout(_check, 100);
          }
        };
        _check();
      });
    }

    /**
     * Check if a library is loaded
     * @private
     */
  }, {
    key: "_isLibraryLoaded",
    value: function _isLibraryLoaded(libName) {
      switch (libName) {
        case 'mermaid':
          return typeof window !== 'undefined' && typeof window.mermaid !== 'undefined';
        case 'hljs':
          return typeof window !== 'undefined' && typeof window.hljs !== 'undefined';
        case 'mathjax':
          return typeof window !== 'undefined' && typeof window.MathJax !== 'undefined';
        case 'leaflet':
          return typeof window !== 'undefined' && typeof window.L !== 'undefined';
        case 'three':
          return typeof window !== 'undefined' && typeof window.THREE !== 'undefined';
        default:
          return false;
      }
    }

    /**
     * Check content and autoload required libraries
     * @private
     */
  }, {
    key: "_checkAndAutoloadLibraries",
    value: (function () {
      var _checkAndAutoloadLibraries2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(content) {
        var promises, config, _config, _config2, _config3, _config4;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!this.autoloadConfig || !this.autoloadConfig.enabled)) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return");
            case 2:
              promises = []; // Check for mermaid diagrams
              if (content.includes('```mermaid')) {
                config = this.autoloadConfig.libraries.mermaid;
                if (config && config.strategy === 'ondemand') {
                  promises.push(this._autoloadLibrary('mermaid'));
                }
              }

              // Check for code blocks (for syntax highlighting)
              if (/```\w+/.test(content)) {
                _config = this.autoloadConfig.libraries.hljs;
                if (_config && _config.strategy === 'ondemand') {
                  promises.push(this._autoloadLibrary('hljs'));
                }
              }

              // Check for math content
              if (content.includes('$$') || content.includes('```math')) {
                _config2 = this.autoloadConfig.libraries.mathjax;
                if (_config2 && _config2.strategy === 'ondemand') {
                  promises.push(this._autoloadLibrary('mathjax'));
                }
              }

              // Check for GeoJSON/TopoJSON
              if (content.includes('```geojson') || content.includes('```topojson')) {
                _config3 = this.autoloadConfig.libraries.leaflet;
                if (_config3 && _config3.strategy === 'ondemand') {
                  promises.push(this._autoloadLibrary('leaflet'));
                }
              }

              // Check for STL 3D models
              if (content.includes('```stl')) {
                _config4 = this.autoloadConfig.libraries.three;
                if (_config4 && _config4.strategy === 'ondemand') {
                  promises.push(this._autoloadLibrary('three'));
                }
              }

              // Wait for all libraries to load
              if (!(promises.length > 0)) {
                _context4.next = 11;
                break;
              }
              _context4.next = 11;
              return Promise.all(promises);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function _checkAndAutoloadLibraries(_x4) {
        return _checkAndAutoloadLibraries2.apply(this, arguments);
      }
      return _checkAndAutoloadLibraries;
    }()
    /**
     * Initialize the HTML to Markdown converter
     *
     * @private
     */
    )
  }, {
    key: "_initializeHtmlToMarkdown",
    value: (function () {
      var _initializeHtmlToMarkdown2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var module, HtmlToMarkdownClass;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              if (!(typeof HtmlToMarkdown !== 'undefined')) {
                _context5.next = 5;
                break;
              }
              // If HtmlToMarkdown is already available globally (e.g., in UMD build)
              this._htmlToMarkdownConverter = new HtmlToMarkdown({
                cacheSize: 20 // Cache up to 20 recent conversions for better performance
              });
              _context5.next = 10;
              break;
            case 5:
              _context5.next = 7;
              return Promise.resolve().then(function () { return HtmlToMarkdown$1; });
            case 7:
              module = _context5.sent;
              HtmlToMarkdownClass = module["default"];
              this._htmlToMarkdownConverter = new HtmlToMarkdownClass({
                cacheSize: 20
              });
            case 10:
              _context5.next = 16;
              break;
            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              console.error('Failed to load HtmlToMarkdown module:', _context5.t0);
              // Provide a minimal fallback implementation
              this._htmlToMarkdownConverter = {
                convert: function convert(html) {
                  var div = document.createElement('div');
                  div.innerHTML = html;
                  return div.textContent;
                }
              };
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 12]]);
      }));
      function _initializeHtmlToMarkdown() {
        return _initializeHtmlToMarkdown2.apply(this, arguments);
      }
      return _initializeHtmlToMarkdown;
    }()
    /**
     * Initializes the required libraries for rendering content.
     * Sets up Mermaid for diagrams and markdown-it for Markdown processing.
     * 
     * @private
     */
    )
  }, {
    key: "initializeLibraries",
    value: function initializeLibraries() {
      var _this4 = this;
      // Initialize Mermaid for diagram rendering if available
      if (typeof window !== 'undefined' && window.mermaid) {
        var self = this;
        window.mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'default',
          errorCallback: function errorCallback(error) {
            // Only log errors if not in streaming mode or if explicitly configured
            if (!self._shouldSuppressErrors('mermaid')) {
              console.warn("Mermaid error:", error);
            }
            return "<div class='mermaid-error'></div>";
          }
        });
        // Don't auto-init in streaming mode - we'll handle it manually
        if (!this.options.streamingMode) {
          window.mermaid.init(undefined, ".mermaid");
        }
      }

      // Initialize markdown-it with options and syntax highlighting
      this.md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function highlight(str, lang) {
          var hljs = getHljs();
          if (lang && hljs && hljs.getLanguage && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, {
                language: lang
              }).value;
            } catch (e) {
              // Fallback to no highlighting on error
            }
          }
          return '';
        }
      });

      // Configure custom fence rendering for markdown-it
      this.md.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      this.md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var info = token.info.trim().toLowerCase(); // Normalize to lowercase
        var content = token.content; // Raw content from the fenced block

        // Handle Mermaid diagrams
        if (info === 'mermaid') {
          var escapedContent = _this4.md.utils.escapeHtml(content);
          return "<div class=\"mermaid\" data-source-type=\"mermaid\">".concat(escapedContent, "</div>");
        }

        // Handle SVG directly
        if (info === 'svg') {
          var escapeForAttribute = function escapeForAttribute(str) {
            return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          };
          var escapedSource = escapeForAttribute(content);
          return "<div class=\"svg-container\" data-source-type=\"svg\" data-original-source=\"".concat(escapedSource, "\">").concat(content, "</div>");
        }

        // Handle GeoJSON maps
        if (info === 'geojson') {
          var _escapedContent = _this4.md.utils.escapeHtml(content);
          var _escapedSource = _this4.md.utils.escapeHtml(content);
          return "<div class=\"geojson-container\" data-source-type=\"geojson\" data-original-source=\"".concat(_escapedSource, "\">").concat(_escapedContent, "</div>");
        }

        // Handle TopoJSON maps  
        if (info === 'topojson') {
          var _escapedContent2 = _this4.md.utils.escapeHtml(content);
          var _escapedSource2 = _this4.md.utils.escapeHtml(content);
          return "<div class=\"topojson-container\" data-source-type=\"topojson\" data-original-source=\"".concat(_escapedSource2, "\">").concat(_escapedContent2, "</div>");
        }

        // Handle STL 3D models
        if (info === 'stl') {
          var _escapedContent3 = _this4.md.utils.escapeHtml(content);
          var _escapedSource3 = _this4.md.utils.escapeHtml(content);
          return "<div class=\"stl-container\" data-source-type=\"stl\" data-original-source=\"".concat(_escapedSource3, "\">").concat(_escapedContent3, "</div>");
        }

        // Handle mathematical expressions
        if (info === 'math') {
          var mathId = 'math-' + Math.random().toString(36).substring(2, 15);
          // Pass raw 'content' to MathJax, wrapped in $$ ... $$ on a single line
          var singleLineContent = content.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
          return "<div id=\"".concat(mathId, "\" class=\"math-display\" data-source-type=\"math\">$", '$').concat(singleLineContent, "$", '$', "</div>");
        }

        // Default fence renderer (for code blocks)
        var langName = token.info.trim().split(/\s+/)[0] || '';
        var escapedLangName = _this4.md.utils.escapeHtml(langName);
        var tableLangs = ['csv', 'tsv', 'psv'];
        if (tableLangs.includes(langName)) {
          try {
            if (typeof Papa === 'undefined' || typeof Papa.parse !== 'function') {
              return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangName, "\">Error: PapaParse library not loaded.</pre>");
            }
            var parseConfig = {
              skipEmptyLines: true
            };
            if (langName !== 'tsv') parseConfig.delimiter = langName === 'csv' ? ',' : '|';
            var parsedData = Papa.parse(content, parseConfig);
            if (parsedData.errors && parsedData.errors.length > 0) {
              var errorMessages = parsedData.errors.map(function (err) {
                return "".concat(err.type, ": ").concat(err.message, " (Row: ").concat(err.row, ")");
              }).join('\n');
              return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangName, "\">Error parsing ").concat(langName, " data:\n").concat(_this4.md.utils.escapeHtml(errorMessages), "</pre>");
            }
            return "<div data-source-type=\"".concat(escapedLangName, "\">").concat(_this4._dataToHtmlTable(parsedData.data), "</div>");
          } catch (e) {
            return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangName, "\">Could not render ").concat(_this4.md.utils.escapeHtml(langName), " table.</pre>");
          }
        }
        var codeHtml;
        var hljs = getHljs();
        if (hljs && hljs.getLanguage && hljs.getLanguage(langName)) {
          try {
            var highlightedContent = hljs.highlight(content, {
              language: langName,
              ignoreIllegals: true
            }).value;
            codeHtml = "<pre><code class=\"hljs language-".concat(escapedLangName, "\" data-source-type=\"code\" data-lang=\"").concat(escapedLangName, "\">").concat(highlightedContent, "</code></pre>");
          } catch (e) {
            // Fallback to non-highlighted if error occurs
          }
        }
        if (!codeHtml) {
          var _escapedContent4 = _this4.md.utils.escapeHtml(content);
          codeHtml = "<pre><code class=\"hljs language-".concat(escapedLangName, "\" data-source-type=\"code\" data-lang=\"").concat(escapedLangName, "\">").concat(_escapedContent4, "</code></pre>");
        }
        return "<div data-source-type=\"".concat(escapedLangName || 'code', "\">").concat(codeHtml, "</div>");
      };
    }

    /**
     * Converts parsed data (array of arrays) to an HTML table string.
     *
     * @param {Array<Array<string>>} rows - The data rows, where the first row is the header.
     * @returns {string} An HTML table string.
     * @private
     */
  }, {
    key: "_dataToHtmlTable",
    value: function _dataToHtmlTable(rows) {
      var _this5 = this;
      if (!rows || rows.length === 0) {
        return '<p class="squibview-info">No data to display.</p>';
      }
      var html = '<table class="squibview-data-table">';

      // Header
      var headerCells = rows[0];
      html += '<thead><tr>';
      headerCells.forEach(function (cell) {
        html += "<th>".concat(_this5.md.utils.escapeHtml(String(cell)), "</th>");
      });
      html += '</tr></thead>';

      // Body
      html += '<tbody>';
      for (var i = 1; i < rows.length; i++) {
        html += '<tr>';
        var bodyCells = rows[i];
        // Ensure all rows have the same number of cells as the header
        // by either truncating or padding with empty cells
        for (var j = 0; j < headerCells.length; j++) {
          var cellContent = bodyCells[j] !== undefined ? String(bodyCells[j]) : '';
          html += "<td>".concat(this.md.utils.escapeHtml(cellContent), "</td>");
        }
        html += '</tr>';
      }
      html += '</tbody></table>';
      return html;
    }

    /**
     * Registers a content type renderer with specified configuration
     * 
     * @param {string} type - The content type identifier ('md', 'html', etc.)
     * @param {Object} config - Renderer configuration
     * @param {Function} config.render - Function to render the content type
     * @param {Function} [config.sourceToOutput] - Function to transform source to output
     * @param {Function} [config.outputToSource] - Function to transform output back to source
     * @param {Object} [config.operations] - Map of operations that can be performed on this content type
     * @param {Array} [config.buttons] - Buttons to display when this content type is active
     */
  }, {
    key: "registerRenderer",
    value: function registerRenderer(type, config) {
      this.renderers[type] = config;

      // Trigger event for plugins to react
      this.events.emit('renderer:registered', type, config);

      // Update buttons if this is the current content type
      if (this.inputContentType === type) {
        this.updateTypeButtons();
      }
    }

    /**
     * Registers the default renderers for standard content types
     * 
     * @private
     */
  }, {
    key: "registerDefaultRenderers",
    value: function registerDefaultRenderers() {
      var _this6 = this;
      // Markdown renderer
      this.registerRenderer('md', {
        render: function render(source) {
          return _this6.renderMarkdown(source);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this6.md.render(source);
        },
        outputToSource: function outputToSource(output) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return _this6.htmlToMarkdown(output, options);
        },
        operations: {
          increaseHeadings: function increaseHeadings(src) {
            return _this6.markdownAdjustHeadings(src, 1);
          },
          decreaseHeadings: function decreaseHeadings(src) {
            return _this6.markdownAdjustHeadings(src, -1);
          },
          removeHR: function removeHR(src) {
            return src.replace(/---/g, '');
          },
          fixLinefeeds: function fixLinefeeds(src) {
            return _this6.fixLinefeedsInMarkdown(src);
          },
          toggleLinefeedView: function toggleLinefeedView() {
            _this6.toggleLinefeedView();
            return _this6.getContent();
          }
        },
        buttons: [{
          label: 'H-',
          action: 'decreaseHeadings',
          title: 'Decrease heading levels'
        }, {
          label: 'H+',
          action: 'increaseHeadings',
          title: 'Increase heading levels'
        }, {
          label: 'Remove HR',
          action: 'removeHR',
          title: 'Remove horizontal rules'
        }, {
          label: 'Smart Linefeeds',
          action: 'fixLinefeeds',
          title: 'Convert all single line breaks to hard line breaks (two spaces + newline) in the source.'
        }]
      });

      // HTML renderer
      this.registerRenderer('html', {
        render: function render(source) {
          return _this6.renderHTML(source);
        },
        sourceToOutput: function sourceToOutput(source) {
          return source;
        },
        outputToSource: function outputToSource(output) {
          return output;
        },
        operations: {},
        buttons: []
      });

      // RevealJS renderer
      this.registerRenderer('reveal', {
        render: function render(source) {
          return _this6.renderHTML(_this6.makeRevealJSFullPage(source));
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this6.makeRevealJSFullPage(source);
        },
        outputToSource: function outputToSource(output) {
          return output;
        },
        operations: {},
        buttons: []
      });

      // CSV renderer
      this.registerRenderer('csv', {
        render: function render(source) {
          var markdownTable = _this6.csvOrTsvToMarkdownTable(source, ',');
          _this6.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this6.csvOrTsvToMarkdownTable(source, ',');
        },
        outputToSource: function outputToSource(output) {
          return _this6.tableToCSV(output);
        },
        operations: {},
        buttons: []
      });

      // TSV renderer
      this.registerRenderer('tsv', {
        render: function render(source) {
          var markdownTable = _this6.csvOrTsvToMarkdownTable(source, '\t');
          _this6.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this6.csvOrTsvToMarkdownTable(source, '\t');
        },
        outputToSource: function outputToSource(output) {
          return _this6.tableToCSV(output, '\t');
        },
        operations: {},
        buttons: []
      });

      // Semicolon separated values renderer
      this.registerRenderer('semisv', {
        render: function render(source) {
          var markdownTable = _this6.csvOrTsvToMarkdownTable(source, ';');
          _this6.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this6.csvOrTsvToMarkdownTable(source, ';');
        },
        outputToSource: function outputToSource(output) {
          return _this6.tableToCSV(output, ';');
        },
        operations: {},
        buttons: []
      });

      // Space separated values renderer
      this.registerRenderer('ssv', {
        render: function render(source) {
          var markdownTable = _this6.csvOrTsvToMarkdownTable(source, ' ');
          _this6.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this6.csvOrTsvToMarkdownTable(source, ' ');
        },
        outputToSource: function outputToSource(output) {
          return _this6.tableToCSV(output, ' ');
        },
        operations: {},
        buttons: []
      });
    }

    /**
     * Creates the DOM structure for the editor.
     * Sets up the title bar, controls, and editor areas.
     * 
     * @private
     */
  }, {
    key: "createStructure",
    value: function createStructure() {
      this.container.classList.add(this.options.baseClass);
      this.container.innerHTML = "\n      <div class=\"".concat(this.options.baseClass, "-title\" ").concat(!this.options.titleShow ? 'style="display:none"' : '', ">\n        ").concat(this.options.titleContent, "\n      </div>\n      <div class=\"").concat(this.options.baseClass, "-controls\" ").concat(!this.options.showControls ? 'style="display:none"' : '', ">\n        <button data-view='src'>Source</button>\n        <button data-view=\"html\">Rendered</button>\n        <button data-view=\"split\">Split</button>\n        <button class=\"copy-src-button\">Copy Source</button>\n        <button class=\"copy-html-button\">Copy Rendered</button>\n        <button class=\"revision-undo\" title=\"Undo\">&#x21A9;</button>\n        <button class=\"revision-redo\" title=\"Redo\">&#x21AA;</button>\n        <span class=\"").concat(this.options.baseClass, "-type-buttons\"></span>\n      </div>\n      <div class=\"").concat(this.options.baseClass, "-editor\">\n        ").concat(this.options.showLineNumbers ? "<div class=\"".concat(this.options.baseClass, "-source-panel\">\n            <div class=\"").concat(this.options.baseClass, "-line-gutter\"></div>\n            <textarea class=\"").concat(this.options.baseClass, "-input\"></textarea>\n          </div>") : "<textarea class=\"".concat(this.options.baseClass, "-input\"></textarea>"), "\n        <div class=\"").concat(this.options.baseClass, "-output\"></div>\n      </div>\n    ");
      this.title = this.container.querySelector(".".concat(this.options.baseClass, "-title"));
      this.controls = this.container.querySelector(".".concat(this.options.baseClass, "-controls"));
      this.editor = this.container.querySelector(".".concat(this.options.baseClass, "-editor"));
      this.input = this.container.querySelector(".".concat(this.options.baseClass, "-input"));
      this.output = this.container.querySelector(".".concat(this.options.baseClass, "-output"));
      this.typeButtonsContainer = this.container.querySelector(".".concat(this.options.baseClass, "-type-buttons"));
      this.universalButtonsContainer = this.container.querySelector(".".concat(this.options.baseClass, "-universal-buttons"));

      // Line numbers elements
      if (this.options.showLineNumbers) {
        this.sourcePanel = this.container.querySelector(".".concat(this.options.baseClass, "-source-panel"));
        this.lineGutter = this.container.querySelector(".".concat(this.options.baseClass, "-line-gutter"));
      }
    }

    /**
     * Updates the type-specific buttons based on the current content type
     * 
     * @private
     */
  }, {
    key: "updateTypeButtons",
    value: function updateTypeButtons() {
      var _this7 = this;
      // Clear current buttons
      this.typeButtonsContainer.innerHTML = '';

      // Get buttons for current content type
      var renderer = this.renderers[this.inputContentType];
      if (renderer && renderer.buttons && renderer.buttons.length > 0) {
        renderer.buttons.forEach(function (button) {
          var btn = document.createElement('button');
          btn.textContent = button.label;
          if (button.title) {
            btn.title = button.title;
          }
          btn.addEventListener('click', function () {
            if (renderer.operations && renderer.operations[button.action]) {
              var newContent = renderer.operations[button.action](_this7.getContent());
              _this7.setContent(newContent, _this7.inputContentType);
            }
          });
          _this7.typeButtonsContainer.appendChild(btn);
        });
      }
    }

    /**
     * Sets up event listeners for user interactions.
     * Handles view changes, copy functionality, and input changes.
     * 
     * @private
     */
  }, {
    key: "initializeEventHandlers",
    value: function initializeEventHandlers() {
      var _this8 = this;
      // View buttons
      this.controls.querySelectorAll('button[data-view]').forEach(function (button) {
        button.addEventListener('click', function () {
          return _this8.setView(button.dataset.view);
        });
      });

      // Copy buttons
      this.controls.querySelector('.copy-src-button').addEventListener('click', function () {
        return _this8.copySource();
      });
      this.controls.querySelector('.copy-html-button').addEventListener('click', function () {
        return _this8.copyHTML();
      });

      // Undo/redo buttons
      this.controls.querySelector('.revision-undo').addEventListener('click', function () {
        return _this8.revisionUndo();
      });
      this.controls.querySelector('.revision-redo').addEventListener('click', function () {
        return _this8.revisionRedo();
      });

      // Input source change event
      this.input.addEventListener('input', function () {
        _this8.setContent();
      });

      // Text selection event in source panel
      this.input.addEventListener('mouseup', function () {
        var selection = document.getSelection();
        if (selection && selection.toString().trim() !== '') {
          var selectionData = {
            panel: 'source',
            text: selection.toString(),
            range: {
              start: _this8.input.selectionStart,
              end: _this8.input.selectionEnd
            }
          };
          _this8.lastSelectionData = selectionData;
          _this8.events.emit('text:selected', selectionData);
        }
      });

      // Listen for changes in rendered content to support bidirectional editing
      // Use a debounce pattern to prevent processing every keystroke
      var editDebounceTimer = null;

      // Create a map to store special content blocks
      this.specialContentBlocks = new Map();
      this.output.addEventListener('input', function () {
        if (_this8.currentView === 'html' || _this8.currentView === 'split') {
          var editableContent = _this8.output.querySelector('[contenteditable="true"]');
          if (editableContent) {
            // Clear any existing timer
            if (editDebounceTimer) {
              clearTimeout(editDebounceTimer);
            }

            // Set a new timer to process the edit after a short delay (300ms)
            editDebounceTimer = setTimeout(function () {
              var renderedContent = editableContent.innerHTML;
              var renderer = _this8.renderers[_this8.inputContentType];
              if (renderer && renderer.outputToSource) {
                // Get the original source markdown
                var originalSource = _this8.input.value;

                // Process the HTML back to markdown, passing original source for context
                var newSource = renderer.outputToSource(renderedContent, {
                  originalSource: originalSource
                });

                // Update source without triggering render cycle
                _this8.input.value = newSource;

                // Only save revision after editing stops for a moment
                _this8.revisionManager.addRevision(newSource, _this8.inputContentType);

                // Emit content change event
                _this8.events.emit('content:change', newSource, _this8.inputContentType);
              }

              // Clear the timer reference
              editDebounceTimer = null;
            }, 300);
          }
        }
      });

      // Text selection event in rendered panel
      this.output.addEventListener('mouseup', function () {
        var selection = document.getSelection();
        if (selection && selection.toString().trim() !== '') {
          var range = selection.getRangeAt(0);
          var selectionData = {
            panel: 'rendered',
            text: selection.toString(),
            range: range,
            element: _this8.output.querySelector('[contenteditable="true"]')
          };
          _this8.lastSelectionData = selectionData;
          _this8.events.emit('text:selected', selectionData);
        }
      });
    }

    /**
     * Preserves special content blocks like Mermaid diagrams, SVG, GeoJSON and math from original source
     * @param {string} originalSource - The original markdown source
     * @param {string} newSource - The new source after HTML-to-Markdown conversion
     * @returns {string} - Source with special blocks preserved
     * @private
     */
  }, {
    key: "preserveSpecialBlocks",
    value: function preserveSpecialBlocks(originalSource, newSource) {
      // If no original source, just return the new source
      if (!originalSource) return newSource;

      // Extract special blocks from original source
      var specialBlocks = [];

      // Extract Mermaid blocks: ```mermaid ... ```
      var mermaidRegex = /```mermaid\s*([\s\S]*?)```/g;
      var mermaidMatch;
      while ((mermaidMatch = mermaidRegex.exec(originalSource)) !== null) {
        specialBlocks.push({
          type: 'mermaid',
          content: mermaidMatch[0],
          startIndex: mermaidMatch.index,
          endIndex: mermaidMatch.index + mermaidMatch[0].length
        });
      }

      // Extract GeoJSON blocks: ```geojson ... ```
      var geojsonRegex = /```geojson\s*([\s\S]*?)```/g;
      var geojsonMatch;
      while ((geojsonMatch = geojsonRegex.exec(originalSource)) !== null) {
        specialBlocks.push({
          type: 'geojson',
          content: geojsonMatch[0],
          startIndex: geojsonMatch.index,
          endIndex: geojsonMatch.index + geojsonMatch[0].length
        });
      }

      // Extract Math blocks: ```math ... ```
      var mathRegex = /```math\s*([\s\S]*?)```/g;
      var mathMatch;
      while ((mathMatch = mathRegex.exec(originalSource)) !== null) {
        specialBlocks.push({
          type: 'math',
          content: mathMatch[0],
          startIndex: mathMatch.index,
          endIndex: mathMatch.index + mathMatch[0].length
        });
      }

      // Find corresponding locations in new source and preserve the special blocks
      // This is a heuristic approach - we look for markers that might indicate where
      // the special content was converted to something else

      var modifiedSource = newSource;

      // Look for elements in the newSource which likely represent our special blocks
      var mermaidDivRegex = /<div[^>]*class=['"]?mermaid['"]?[^>]*>([\s\S]*?)<\/div>/g;
      var geojsonDivRegex = /<div[^>]*class=['"]?geojson-map['"]?[^>]*>[\s\S]*?<\/div>/g;
      var mathDivRegex = /<div[^>]*class=['"]?math-display['"]?[^>]*>[\s\S]*?<\/div>/g;

      // Replace mermaid divs with original mermaid code blocks
      var mermaidDivMatch;
      var mermaidIndex = 0;
      while ((mermaidDivMatch = mermaidDivRegex.exec(modifiedSource)) !== null) {
        // Find the next available mermaid block
        var mermaidBlocks = specialBlocks.filter(function (block) {
          return block.type === 'mermaid';
        });
        if (mermaidIndex < mermaidBlocks.length) {
          // Replace the div with the original mermaid code block
          modifiedSource = modifiedSource.substring(0, mermaidDivMatch.index) + mermaidBlocks[mermaidIndex].content + modifiedSource.substring(mermaidDivMatch.index + mermaidDivMatch[0].length);
          mermaidIndex++;
        }
      }

      // Replace GeoJSON divs with original GeoJSON code blocks
      var geojsonDivMatch;
      var geojsonIndex = 0;
      while ((geojsonDivMatch = geojsonDivRegex.exec(modifiedSource)) !== null) {
        // Find the next available GeoJSON block
        var geojsonBlocks = specialBlocks.filter(function (block) {
          return block.type === 'geojson';
        });
        if (geojsonIndex < geojsonBlocks.length) {
          // Replace the div with the original GeoJSON code block
          modifiedSource = modifiedSource.substring(0, geojsonDivMatch.index) + geojsonBlocks[geojsonIndex].content + modifiedSource.substring(geojsonDivMatch.index + geojsonDivMatch[0].length);
          geojsonIndex++;
        }
      }

      // Replace Math divs with original Math code blocks
      var mathDivMatch;
      var mathIndex = 0;
      while ((mathDivMatch = mathDivRegex.exec(modifiedSource)) !== null) {
        // Find the next available math block
        var mathBlocks = specialBlocks.filter(function (block) {
          return block.type === 'math';
        });
        if (mathIndex < mathBlocks.length) {
          // Replace the div with the original math code block
          modifiedSource = modifiedSource.substring(0, mathDivMatch.index) + mathBlocks[mathIndex].content + modifiedSource.substring(mathDivMatch.index + mathDivMatch[0].length);
          mathIndex++;
        }
      }
      return modifiedSource;
    }

    /**
     * Sets up a resize observer to adjust the layout when the container size changes.
     * 
     * @private
     */
  }, {
    key: "initializeResizeObserver",
    value: function initializeResizeObserver() {
      var _this9 = this;
      var resizeObserver = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (entry.target === _this9.container) {
              _this9.adjustLayout();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      resizeObserver.observe(this.container);
    }

    /**
     * Adjusts the layout of the editor components based on the current view and container size.
     * 
     * @private
     */
  }, {
    key: "adjustLayout",
    value: function adjustLayout() {
      var containerRect = this.container.getBoundingClientRect();
      var titleHeight = this.title.offsetHeight;
      var controlsHeight = this.controls.offsetHeight;
      var availableHeight = containerRect.height - titleHeight - controlsHeight;
      var availableWidth = containerRect.width;
      this.editor.style.height = "".concat(availableHeight, "px");
      this.editor.style.width = "".concat(availableWidth, "px");
      if (this.currentView === 'split') {
        this.input.style.width = '50%';
        this.output.style.width = '50%';
      } else if (this.currentView === 'src') {
        this.input.style.width = '100%';
      } else if (this.currentView === 'html') {
        this.output.style.width = '100%';
      }

      // Emit layout change event for plugins
      this.events.emit('layout:change', this.currentView, {
        containerWidth: availableWidth,
        containerHeight: availableHeight
      });
    }

    /**
     * Sets or gets the streaming mode state
     * @param {boolean} [enabled] - If provided, sets streaming mode. If omitted, returns current state.
     * @returns {boolean|undefined} Current streaming mode state if no parameter provided
     */
  }, {
    key: "streamingMode",
    value: function streamingMode(enabled) {
      if (enabled === undefined) {
        return this.options.streamingMode;
      }
      this.options.streamingMode = Boolean(enabled);
      // Re-render if content exists to apply new mode
      if (this.input.value) {
        this.renderMarkdown();
      }
    }

    /**
     * Sets the content of the editor and renders it.
     *
     * @param {string} [content=this.input.value] - The content to set
     * @param {string} [contentType=this.inputContentType] - The type of content ('md', 'html', 'reveal', 'csv', 'tsv')
     * @param {boolean} [saveRevision=true] - Whether to save this change to the revision history
     */
  }, {
    key: "setContent",
    value: function setContent() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.input.value;
      var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.inputContentType;
      var saveRevision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // Check if content type has changed
      var typeChanged = contentType !== this.inputContentType;
      if (typeChanged) {
        this.inputContentType = contentType;
        this.updateTypeButtons();
      }
      this.input.value = content;

      // Add to revision history if required
      if (saveRevision) {
        this.revisionManager.addRevision(content, contentType);
      }

      // Render the content
      this.renderOutput();

      // Update line numbers if enabled
      if (this.options.showLineNumbers && this.lineGutter) {
        this.updateLineNumbers();
      }

      // Emit content change event
      this.events.emit('content:change', content, contentType);
    }

    /**
     * Undoes the last change if possible.
     * Decrements the revision index and restores the content from that revision.
     */
  }, {
    key: "revisionUndo",
    value: function revisionUndo() {
      var prevState = this.revisionManager.undo();
      if (prevState) {
        this.input.value = prevState.content;
        this.inputContentType = prevState.contentType;

        // Update buttons if content type changed
        this.updateTypeButtons();

        // Render the content
        this.renderOutput();

        // Emit undo event
        this.events.emit('revision:undo', prevState.content, prevState.contentType);
      }
    }

    /**
     * Redoes a previously undone change if possible.
     * Increments the revision index and restores the content from that revision.
     */
  }, {
    key: "revisionRedo",
    value: function revisionRedo() {
      var nextState = this.revisionManager.redo();
      if (nextState) {
        this.input.value = nextState.content;
        this.inputContentType = nextState.contentType;

        // Update buttons if content type changed
        this.updateTypeButtons();

        // Render the content
        this.renderOutput();

        // Emit redo event
        this.events.emit('revision:redo', nextState.content, nextState.contentType);
      }
    }

    /**
     * Sets the revision to a specific index in the history.
     * 
     * @param {number} index - The revision index to set
     */
  }, {
    key: "revisionSet",
    value: function revisionSet(index) {
      var state = this.revisionManager.setRevision(index);
      if (state) {
        this.input.value = state.content;
        this.inputContentType = state.contentType;

        // Update buttons if content type changed
        this.updateTypeButtons();

        // Render the content
        this.renderOutput();

        // Emit revision:set event
        this.events.emit('revision:set', index, state.content, state.contentType);
      }
    }

    /**
     * Returns the total number of revisions in the history.
     * 
     * @returns {number} The number of revisions
     */
  }, {
    key: "revisionNumRevsions",
    value: function revisionNumRevsions() {
      return this.revisionManager.getRevisionCount();
    }

    /**
     * Returns the current index in the revision history.
     * 
     * @returns {number} The current revision index
     */
  }, {
    key: "revisionGetCurrentIndex",
    value: function revisionGetCurrentIndex() {
      return this.revisionManager.getCurrentIndex();
    }

    /**
     * Gets the current content from the input textarea.
     * 
     * @returns {string} The current content
     */
  }, {
    key: "getContent",
    value: function getContent() {
      return this.input.value;
    }

    /**
     * Cleans markdown content by removing markdown code fence markers.
     * 
     * @param {string} md - The markdown content to clean
     * @returns {string} The cleaned markdown content
     */
  }, {
    key: "cleanMarkdown",
    value: function cleanMarkdown(md) {
      return md.replace(/^```markdown\s+/, '').replace(/```$/, '');
    }

    /**
     * Detects if content has incomplete fence blocks
     * @private
     * @param {string} content - The content to check
     * @returns {Array} Array of incomplete block info {type, startLine, content}
     */
  }, {
    key: "_detectIncompleteBlocks",
    value: function _detectIncompleteBlocks(content) {
      var incompleteBlocks = [];
      var lines = content.split('\n');
      var inBlock = false;
      var blockType = '';
      var blockStartLine = 0;
      var blockContent = [];
      var fenceLength = 0;
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var fenceMatch = line.match(/^(`{3,}|~{3,})\s*(\w*)/);
        if (fenceMatch && !inBlock) {
          // Starting a fence block
          inBlock = true;
          fenceLength = fenceMatch[1].length;
          blockType = fenceMatch[2] || 'code';
          blockStartLine = i;
          blockContent = [];
        } else if (inBlock) {
          var closeFence = line.match(/^(`{3,}|~{3,})\s*$/);
          if (closeFence && closeFence[1].length >= fenceLength) {
            // Closing fence found
            inBlock = false;
            blockType = '';
            blockContent = [];
            fenceLength = 0;
          } else {
            blockContent.push(line);
          }
        }
      }

      // If we're still in a block at the end, it's incomplete
      if (inBlock) {
        incompleteBlocks.push({
          type: blockType,
          startLine: blockStartLine,
          content: blockContent.join('\n')
        });
      }
      return incompleteBlocks;
    }

    /**
     * Renders a placeholder for incomplete blocks
     * @private
     * @param {string} blockType - The type of the incomplete block
     * @returns {string} HTML for the placeholder
     */
  }, {
    key: "_renderIncompletePlaceholder",
    value: function _renderIncompletePlaceholder(blockType) {
      var placeholder = this.options.incompleteBlockPlaceholder || '⏳ Rendering...';
      return "<div class=\"incomplete-block\" data-block-type=\"".concat(blockType, "\">\n      <div class=\"incomplete-block-message\">").concat(placeholder, "</div>\n      <div class=\"incomplete-block-type\">Incomplete ").concat(blockType, " block</div>\n    </div>");
    }

    /**
     * Renders a placeholder for render errors
     * @private
     * @param {string} blockType - The type of the block that failed
     * @returns {string} HTML for the error placeholder
     */
  }, {
    key: "_renderErrorPlaceholder",
    value: function _renderErrorPlaceholder(blockType) {
      var placeholder = this.options.renderErrorPlaceholder || '❌ Render error';
      return "<div class=\"render-error\" data-block-type=\"".concat(blockType, "\">\n      <div class=\"render-error-message\">").concat(placeholder, "</div>\n      <div class=\"render-error-type\">").concat(blockType, " rendering failed</div>\n    </div>");
    }

    /**
     * Determines if errors should be suppressed for a given type
     * @private
     * @param {string} errorType - The type of error (mermaid, math, etc.)
     * @returns {boolean} True if errors should be suppressed
     */
  }, {
    key: "_shouldSuppressErrors",
    value: function _shouldSuppressErrors(errorType) {
      if (this.options.streamingMode) {
        return true;
      }
      if (this.options.errorHandling) {
        var key = "suppress".concat(errorType.charAt(0).toUpperCase() + errorType.slice(1), "Errors");
        return this.options.errorHandling[key] === true;
      }
      return false;
    }

    /**
     * Renders Markdown content to HTML and processes the result.
     * Converts images to data URLs and initializes Mermaid diagrams.
     *
     * @param {string} [md] - The Markdown content to render, defaults to current input value
     * @returns {Promise<void>} A promise that resolves when rendering is complete
     */
  }, {
    key: "renderMarkdown",
    value: (function () {
      var _renderMarkdown = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(md) {
        var _this10 = this;
        var markdown, incompleteBlocks, lines, result, inIncompleteBlock, currentBlockType, _loop, i, html, processedHtml, contentDiv, images, _iterator2, _step2, _loop2, mermaidElements, _iterator3, _step3, element, originalContent, hasError, originalConsoleError, originalConsoleWarn, beforeHtml;
        return _regeneratorRuntime().wrap(function _callee6$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              markdown = md || this.input.value; // Check for incomplete blocks if in streaming mode
              if (!(this.options.streamingMode || this.options.errorHandling && this.options.errorHandling.showIncompleteBlockPlaceholder)) {
                _context8.next = 18;
                break;
              }
              incompleteBlocks = this._detectIncompleteBlocks(markdown);
              if (!(incompleteBlocks.length > 0)) {
                _context8.next = 18;
                break;
              }
              // Replace incomplete blocks with HTML placeholders instead of processing them
              lines = markdown.split('\n');
              result = [];
              inIncompleteBlock = false;
              currentBlockType = '';
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
                var line, isIncompleteStart;
                return _regeneratorRuntime().wrap(function _loop$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      line = lines[i]; // Check if this line starts an incomplete block
                      isIncompleteStart = incompleteBlocks.some(function (block) {
                        if (block.startLine === i) {
                          inIncompleteBlock = true;
                          currentBlockType = block.type;
                          return true;
                        }
                        return false;
                      });
                      if (!isIncompleteStart) {
                        _context6.next = 7;
                        break;
                      }
                      // Add placeholder instead of the incomplete block
                      result.push("\n\n<div class=\"incomplete-block-marker\" data-type=\"".concat(currentBlockType, "\">INCOMPLETE:").concat(currentBlockType, "</div>\n\n"));
                      // Skip to end of content
                      return _context6.abrupt("return", 1);
                    case 7:
                      if (!inIncompleteBlock) {
                        result.push(line);
                      }
                    case 8:
                    case "end":
                      return _context6.stop();
                  }
                }, _loop);
              });
              i = 0;
            case 10:
              if (!(i < lines.length)) {
                _context8.next = 17;
                break;
              }
              return _context8.delegateYield(_loop(i), "t0", 12);
            case 12:
              if (!_context8.t0) {
                _context8.next = 14;
                break;
              }
              return _context8.abrupt("break", 17);
            case 14:
              i++;
              _context8.next = 10;
              break;
            case 17:
              markdown = result.join('\n');
            case 18:
              if (!(this.autoloadConfig && this.autoloadConfig.enabled)) {
                _context8.next = 21;
                break;
              }
              _context8.next = 21;
              return this._checkAndAutoloadLibraries(markdown);
            case 21:
              try {
                html = this.md.render(markdown);
              } catch (error) {
                if (!this._shouldSuppressErrors('markdown')) {
                  console.error('Markdown rendering error:', error);
                }
                html = this._renderErrorPlaceholder('markdown');
              }
              processedHtml = html;
              if (this.linefeedViewEnabled) {
                // Only process paragraphs, not code blocks or pre
                processedHtml = processedHtml.replace(/(<p>)([\s\S]*?)(<\/p>)/g, function (match, open, content, close) {
                  // Split by <br> or by line
                  var lines = content.split(/<br\s*\/?>(?![^<]*<\/code>)/g);
                  var processedLines = lines.map(function (line) {
                    // If line is empty or already ends with <br>, skip
                    if (/\s*<\/?.*?>\s*/.test(line) || line.trim() === '') return line;
                    // If line already ends with <br>, skip
                    if (/<br\s*\/?>(\s*)$/.test(line)) return line;
                    return line + '<br>';
                  });
                  return open + processedLines.join('') + close;
                });
              }
              // Replace incomplete block markers with visual indicators
              if (this.options.streamingMode || this.options.errorHandling && this.options.errorHandling.showIncompleteBlockPlaceholder) {
                processedHtml = processedHtml.replace(/<div class="incomplete-block-marker" data-type="(\w+)">INCOMPLETE:(\w+)<\/div>/g, function (match, type1, type2) {
                  return _this10._renderIncompletePlaceholder(type1);
                });
              }
              this.output.innerHTML = "<div contenteditable='true'>" + processedHtml + "</div>";

              // Convert all images to data URLs immediately after rendering
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              images = contentDiv.querySelectorAll('img'); // render images to data urls
              _iterator2 = _createForOfIteratorHelper(images);
              _context8.prev = 29;
              _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                var img, originalSrc, canvas, ctx, tempImg;
                return _regeneratorRuntime().wrap(function _loop2$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      img = _step2.value;
                      _context7.prev = 1;
                      // Store original src if we need to preserve it
                      originalSrc = img.src; // Only convert to data URL if not preserving tags
                      if (_this10.options.preserveImageTags) {
                        _context7.next = 10;
                        break;
                      }
                      canvas = document.createElement('canvas');
                      ctx = canvas.getContext('2d'); // Create new image and wait for it to load
                      tempImg = new Image();
                      tempImg.crossOrigin = 'anonymous';
                      _context7.next = 10;
                      return new Promise(function (resolve, reject) {
                        tempImg.onload = function () {
                          // Set canvas size to match image
                          canvas.width = tempImg.naturalWidth;
                          canvas.height = tempImg.naturalHeight;

                          // Draw image to canvas
                          ctx.drawImage(tempImg, 0, 0);

                          // Convert to data URL
                          var dataUrl = canvas.toDataURL('image/png', 1.0);

                          // Update original image
                          img.src = dataUrl;
                          resolve();
                        };
                        tempImg.onerror = reject;
                        tempImg.src = originalSrc;
                      });
                    case 10:
                      _context7.next = 15;
                      break;
                    case 12:
                      _context7.prev = 12;
                      _context7.t0 = _context7["catch"](1);
                      console.error('Failed to convert image:', _context7.t0);
                    case 15:
                    case "end":
                      return _context7.stop();
                  }
                }, _loop2, null, [[1, 12]]);
              });
              _iterator2.s();
            case 32:
              if ((_step2 = _iterator2.n()).done) {
                _context8.next = 36;
                break;
              }
              return _context8.delegateYield(_loop2(), "t1", 34);
            case 34:
              _context8.next = 32;
              break;
            case 36:
              _context8.next = 41;
              break;
            case 38:
              _context8.prev = 38;
              _context8.t2 = _context8["catch"](29);
              _iterator2.e(_context8.t2);
            case 41:
              _context8.prev = 41;
              _iterator2.f();
              return _context8.finish(41);
            case 44:
              // Initialize mermaid diagrams after all images are processed
              if (typeof window !== 'undefined' && window.mermaid) {
                mermaidElements = this.output.querySelectorAll('.mermaid');
                _iterator3 = _createForOfIteratorHelper(mermaidElements);
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    element = _step3.value;
                    originalContent = element.textContent || element.innerHTML; // In streaming mode or with error suppression, validate the mermaid syntax before rendering
                    if (this.options.streamingMode || this._shouldSuppressErrors('mermaid')) {
                      // Create a flag to track if an error occurred
                      hasError = false; // Temporarily override console.error to catch mermaid errors
                      originalConsoleError = console.error;
                      originalConsoleWarn = console.warn;
                      if (this._shouldSuppressErrors('mermaid')) {
                        console.error = function () {};
                        console.warn = function () {};
                      }
                      try {
                        // Try to parse using mermaid.parse if available (newer versions)
                        if (window.mermaid.parse) {
                          try {
                            window.mermaid.parse(originalContent);
                          } catch (parseError) {
                            hasError = true;
                          }
                        }

                        // If no parse error or parse not available, try to render
                        if (!hasError) {
                          // Store current innerHTML to check if it changes
                          beforeHtml = element.innerHTML; // Try to init the mermaid diagram
                          window.mermaid.init(undefined, element);

                          // Check if mermaid actually rendered something
                          // If it failed silently, the content won't change
                          if (element.innerHTML === beforeHtml || element.querySelector('.error')) {
                            hasError = true;
                          }
                        }
                        if (hasError) {
                          // Rendering failed - show error placeholder
                          element.innerHTML = this._renderErrorPlaceholder('mermaid');
                          element.classList.remove('mermaid');
                          element.classList.add('render-error');
                        }
                      } catch (error) {
                        // Error occurred - show error placeholder
                        if (!this._shouldSuppressErrors('mermaid')) {
                          originalConsoleError('Mermaid rendering error:', error);
                        }
                        element.innerHTML = this._renderErrorPlaceholder('mermaid');
                        element.classList.remove('mermaid');
                        element.classList.add('render-error');
                      } finally {
                        // Restore original console methods
                        console.error = originalConsoleError;
                        console.warn = originalConsoleWarn;
                      }
                    } else {
                      // Normal mode - use regular init and let errors show
                      try {
                        window.mermaid.init(undefined, element);
                      } catch (error) {
                        console.error('Mermaid rendering error:', error);
                      }
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }

              // Initialize GeoJSON/TopoJSON maps after content is rendered
              this.initializeGeoRenderers();

              // Initialize STL 3D models after content is rendered
              this.initializeSTLRenderers();

              // Ensure MathJax is loaded and typeset all math blocks
              _context8.next = 49;
              return this.ensureMathJaxAndTypeset();
            case 49:
              // Emit markdown:rendered event
              this.events.emit('markdown:rendered', markdown, html);
            case 50:
            case "end":
              return _context8.stop();
          }
        }, _callee6, this, [[29, 38, 41, 44]]);
      }));
      function renderMarkdown(_x5) {
        return _renderMarkdown.apply(this, arguments);
      }
      return renderMarkdown;
    }()
    /**
     * Ensures MathJax is loaded and typesets all math blocks in the output.
     * @private
     */
    )
  }, {
    key: "ensureMathJaxAndTypeset",
    value: (function () {
      var _ensureMathJaxAndTypeset = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var _this11 = this;
        var mathBlocks, config, loaded, typesetAll;
        return _regeneratorRuntime().wrap(function _callee8$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              mathBlocks = this.output.querySelectorAll('div.math-display');
              if (mathBlocks.length) {
                _context10.next = 3;
                break;
              }
              return _context10.abrupt("return");
            case 3:
              if (!(this.autoloadConfig && this.autoloadConfig.enabled)) {
                _context10.next = 21;
                break;
              }
              config = this.autoloadConfig.libraries.mathjax;
              if (!(config && config.strategy === 'ondemand')) {
                _context10.next = 21;
                break;
              }
              _context10.next = 8;
              return this._autoloadLibrary('mathjax');
            case 8:
              loaded = _context10.sent;
              if (!(loaded && typeof MathJax !== 'undefined' && MathJax.typesetPromise)) {
                _context10.next = 21;
                break;
              }
              _context10.prev = 10;
              _context10.next = 13;
              return MathJax.typesetPromise(Array.from(mathBlocks));
            case 13:
              return _context10.abrupt("return", _context10.sent);
            case 16:
              _context10.prev = 16;
              _context10.t0 = _context10["catch"](10);
              if (!this._shouldSuppressErrors('math')) {
                console.error('MathJax rendering error:', _context10.t0);
              }
              // Mark failed math blocks
              mathBlocks.forEach(function (block) {
                block.innerHTML = _this11._renderErrorPlaceholder('math');
                block.classList.add('render-error');
                block.classList.remove('math-display');
              });
              return _context10.abrupt("return");
            case 21:
              typesetAll = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                  return _regeneratorRuntime().wrap(function _callee7$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!(typeof MathJax !== 'undefined' && MathJax.typesetPromise)) {
                          _context9.next = 11;
                          break;
                        }
                        _context9.prev = 1;
                        _context9.next = 4;
                        return MathJax.typesetPromise(Array.from(mathBlocks));
                      case 4:
                        return _context9.abrupt("return", _context9.sent);
                      case 7:
                        _context9.prev = 7;
                        _context9.t0 = _context9["catch"](1);
                        if (!_this11._shouldSuppressErrors('math')) {
                          console.error('MathJax rendering error:', _context9.t0);
                        }
                        // Mark failed math blocks
                        mathBlocks.forEach(function (block) {
                          block.innerHTML = _this11._renderErrorPlaceholder('math');
                          block.classList.add('render-error');
                          block.classList.remove('math-display');
                        });
                      case 11:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee7, null, [[1, 7]]);
                }));
                return function typesetAll() {
                  return _ref.apply(this, arguments);
                };
              }();
              if (!(typeof MathJax === 'undefined')) {
                _context10.next = 29;
                break;
              }
              if (!window.mathJaxLoading) {
                _context10.next = 25;
                break;
              }
              return _context10.abrupt("return");
            case 25:
              window.mathJaxLoading = true;
              return _context10.abrupt("return", new Promise(function (resolve, reject) {
                // Configure MathJax before loading script to ensure SVG output
                if (!window.MathJax) {
                  window.MathJax = {
                    loader: {
                      load: ['input/tex', 'output/svg']
                    },
                    tex: {
                      packages: {
                        '[+]': ['ams']
                      },
                      inlineMath: [['$', '$'], ['\\(', '\\)']],
                      displayMath: [['$$', '$$'], ['\\[', '\\]']],
                      processEscapes: true,
                      processEnvironments: true
                    },
                    options: {
                      renderActions: {
                        addMenu: []
                      },
                      ignoreHtmlClass: 'tex2jax_ignore',
                      processHtmlClass: 'tex2jax_process'
                    },
                    svg: {
                      fontCache: 'none'
                    },
                    startup: {
                      typeset: false
                    }
                  };
                }
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
                script.async = true;
                script.onload = function () {
                  var _typesetAll;
                  window.mathJaxLoading = false;
                  (_typesetAll = typesetAll()) === null || _typesetAll === void 0 || _typesetAll.then(resolve)["catch"](reject);
                };
                script.onerror = function () {
                  window.mathJaxLoading = false;
                  reject(new Error('Failed to load MathJax'));
                };
                document.head.appendChild(script);
              }));
            case 29:
              return _context10.abrupt("return", typesetAll());
            case 30:
            case "end":
              return _context10.stop();
          }
        }, _callee8, this, [[10, 16]]);
      }));
      function ensureMathJaxAndTypeset() {
        return _ensureMathJaxAndTypeset.apply(this, arguments);
      }
      return ensureMathJaxAndTypeset;
    }()
    /**
     * Initializes GeoJSON and TopoJSON map renderers.
     * @private
     */
    )
  }, {
    key: "initializeGeoRenderers",
    value: (function () {
      var _initializeGeoRenderers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var _this12 = this;
        var geojsonContainers, topojsonContainers, config, loaded;
        return _regeneratorRuntime().wrap(function _callee9$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              if (this.output) {
                _context11.next = 2;
                break;
              }
              return _context11.abrupt("return");
            case 2:
              // Check if we have geo content
              geojsonContainers = this.output.querySelectorAll('.geojson-container');
              topojsonContainers = this.output.querySelectorAll('.topojson-container');
              if (!(geojsonContainers.length === 0 && topojsonContainers.length === 0)) {
                _context11.next = 6;
                break;
              }
              return _context11.abrupt("return");
            case 6:
              if (!(this.autoloadConfig && this.autoloadConfig.enabled)) {
                _context11.next = 14;
                break;
              }
              config = this.autoloadConfig.libraries.leaflet;
              if (!(config && config.strategy === 'ondemand')) {
                _context11.next = 14;
                break;
              }
              _context11.next = 11;
              return this._autoloadLibrary('leaflet');
            case 11:
              loaded = _context11.sent;
              if (loaded) {
                _context11.next = 14;
                break;
              }
              return _context11.abrupt("return");
            case 14:
              if (!(typeof window === 'undefined' || !window.L)) {
                _context11.next = 16;
                break;
              }
              return _context11.abrupt("return");
            case 16:
              // Initialize GeoJSON containers
              geojsonContainers.forEach(function (container) {
                if (!container.dataset.initialized) {
                  _this12.renderGeoJSON(container);
                }
              });

              // Initialize TopoJSON containers
              topojsonContainers.forEach(function (container) {
                if (!container.dataset.initialized) {
                  _this12.renderTopoJSON(container);
                }
              });
            case 18:
            case "end":
              return _context11.stop();
          }
        }, _callee9, this);
      }));
      function initializeGeoRenderers() {
        return _initializeGeoRenderers.apply(this, arguments);
      }
      return initializeGeoRenderers;
    }()
    /**
     * Initializes STL 3D model renderers.
     * @private
     */
    )
  }, {
    key: "initializeSTLRenderers",
    value: (function () {
      var _initializeSTLRenderers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var _this13 = this;
        var stlContainers, config, loaded;
        return _regeneratorRuntime().wrap(function _callee10$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (this.output) {
                _context12.next = 2;
                break;
              }
              return _context12.abrupt("return");
            case 2:
              stlContainers = this.output.querySelectorAll('.stl-container');
              if (!(stlContainers.length === 0)) {
                _context12.next = 5;
                break;
              }
              return _context12.abrupt("return");
            case 5:
              if (!(this.autoloadConfig && this.autoloadConfig.enabled)) {
                _context12.next = 13;
                break;
              }
              config = this.autoloadConfig.libraries.three;
              if (!(config && config.strategy === 'ondemand')) {
                _context12.next = 13;
                break;
              }
              _context12.next = 10;
              return this._autoloadLibrary('three');
            case 10:
              loaded = _context12.sent;
              if (loaded) {
                _context12.next = 13;
                break;
              }
              return _context12.abrupt("return");
            case 13:
              if (!(typeof window === 'undefined' || !window.THREE)) {
                _context12.next = 15;
                break;
              }
              return _context12.abrupt("return");
            case 15:
              stlContainers.forEach(function (container) {
                if (!container.dataset.initialized) {
                  _this13.renderSTL(container);
                }
              });
            case 16:
            case "end":
              return _context12.stop();
          }
        }, _callee10, this);
      }));
      function initializeSTLRenderers() {
        return _initializeSTLRenderers.apply(this, arguments);
      }
      return initializeSTLRenderers;
    }()
    /**
     * Renders a GeoJSON map in the given container.
     * @param {HTMLElement} container - The container element
     * @private
     */
    )
  }, {
    key: "renderGeoJSON",
    value: function renderGeoJSON(container) {
      try {
        var originalData = container.textContent;

        // Store original data for HtmlToMarkdown conversion FIRST
        container.setAttribute('data-original-source', originalData);
        if (typeof window.L === 'undefined') {
          // No console warning - placeholder message is sufficient
          container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Leaflet library not loaded</p>';
          return;
        }
        var jsonData = JSON.parse(originalData);

        // Clear container and set up for map
        container.innerHTML = '';
        container.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px;';

        // Create unique ID for this map
        var mapId = 'map-' + Math.random().toString(36).substring(2, 15);
        container.id = mapId;

        // Initialize Leaflet map
        var map = window.L.map(mapId).setView([0, 0], 2);

        // Store map reference for copy functionality
        window[mapId + '_map'] = map;

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add GeoJSON layer
        var geojsonLayer = window.L.geoJSON(jsonData).addTo(map);

        // Fit map to data bounds
        if (geojsonLayer.getBounds().isValid()) {
          map.fitBounds(geojsonLayer.getBounds(), {
            padding: [20, 20]
          });
        }
        container.dataset.initialized = 'true';
      } catch (error) {
        console.error('Error rendering GeoJSON:', error);
        container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error rendering GeoJSON map</p>';
        container.dataset.initialized = 'error';
      }
    }

    /**
     * Renders a TopoJSON map in the given container.
     * @param {HTMLElement} container - The container element
     * @private
     */
  }, {
    key: "renderTopoJSON",
    value: function renderTopoJSON(container) {
      try {
        var originalData = container.textContent;

        // Store original data for HtmlToMarkdown conversion FIRST
        container.setAttribute('data-original-source', originalData);
        if (typeof window.L === 'undefined') {
          // No console warning - placeholder message is sufficient
          container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Leaflet library not loaded</p>';
          return;
        }
        if (typeof topojson === 'undefined') {
          // No console warning - placeholder message is sufficient
          container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">TopoJSON client library not loaded</p>';
          return;
        }
        var topoData = JSON.parse(originalData);

        // Convert TopoJSON to GeoJSON
        var geojsonData = topojson.feature(topoData, Object.keys(topoData.objects)[0]);

        // Clear container and set up for map
        container.innerHTML = '';
        container.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px;';

        // Create unique ID for this map
        var mapId = 'map-' + Math.random().toString(36).substring(2, 15);
        container.id = mapId;

        // Initialize Leaflet map
        var map = window.L.map(mapId).setView([0, 0], 2);

        // Add tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add GeoJSON layer
        var geojsonLayer = L.geoJSON(geojsonData).addTo(map);

        // Fit map to data bounds
        if (geojsonLayer.getBounds().isValid()) {
          map.fitBounds(geojsonLayer.getBounds(), {
            padding: [20, 20]
          });
        }
        container.dataset.initialized = 'true';
      } catch (error) {
        console.error('Error rendering TopoJSON:', error);
        container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error rendering TopoJSON map</p>';
        container.dataset.initialized = 'error';
      }
    }

    /**
     * Renders an STL 3D model in the given container.
     * @param {HTMLElement} container - The container element
     * @private
     */
  }, {
    key: "renderSTL",
    value: function renderSTL(container) {
      try {
        var originalData = container.textContent;

        // Store original data for HtmlToMarkdown conversion FIRST
        container.setAttribute('data-original-source', originalData);
        if (typeof THREE === 'undefined') {
          // No console warning - placeholder message is sufficient
          container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Three.js library not loaded</p>';
          return;
        }
        var stlData = originalData;

        // Clear container and set up for 3D rendering
        container.innerHTML = '';
        container.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; position: relative;';

        // Create Three.js scene
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({
          antialias: true
        });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0xf0f0f0);
        container.appendChild(renderer.domElement);

        // Store references for copy functionality
        container._threeScene = scene;
        container._threeCamera = camera;
        container._threeRenderer = renderer;

        // Parse STL data (basic ASCII STL parser)
        var geometry = this.parseSTL(stlData);
        var material = new THREE.MeshLambertMaterial({
          color: 0x606060
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add lighting
        var ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Position camera
        var box = new THREE.Box3().setFromObject(mesh);
        var center = box.getCenter(new THREE.Vector3());
        var size = box.getSize(new THREE.Vector3());
        var maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(center.x + maxDim, center.y + maxDim, center.z + maxDim);
        camera.lookAt(center);

        // Animation loop
        var _animate = function animate() {
          requestAnimationFrame(_animate);
          mesh.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
        _animate();
        container.dataset.initialized = 'true';
      } catch (error) {
        console.error('Error rendering STL:', error);
        container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error rendering STL model</p>';
        container.dataset.initialized = 'error';
      }
    }

    /**
     * Basic ASCII STL parser.
     * @param {string} stlData - The STL file content
     * @returns {THREE.BufferGeometry} - The parsed geometry
     * @private
     */
  }, {
    key: "parseSTL",
    value: function parseSTL(stlData) {
      var geometry = new THREE.BufferGeometry();
      var vertices = [];
      var normals = [];
      var lines = stlData.split('\n');
      var currentNormal = null;
      var vertexCount = 0;
      var _iterator4 = _createForOfIteratorHelper(lines),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var line = _step4.value;
          line = line.trim();
          if (line.startsWith('facet normal')) {
            var parts = line.split(/\s+/);
            currentNormal = [parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4])];
          } else if (line.startsWith('vertex')) {
            var _parts = line.split(/\s+/);
            vertices.push(parseFloat(_parts[1]), parseFloat(_parts[2]), parseFloat(_parts[3]));
            if (currentNormal) {
              normals.push(currentNormal[0], currentNormal[1], currentNormal[2]);
            }
            vertexCount++;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      return geometry;
    }

    /**
     * Converts HTML content to Markdown format using our HtmlToMarkdown converter.
     * 
     * @param {string} html - The HTML content to convert to Markdown
     * @param {Object} options - Additional options for conversion
     * @returns {string} The converted Markdown content
     */
  }, {
    key: "htmlToMarkdown",
    value: function htmlToMarkdown(html) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Use our HtmlToMarkdown converter which uses Turndown internally
      // with SquibView-specific customizations
      if (!this._htmlToMarkdownConverter) {
        // Return simple conversion if converter isn't loaded yet
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent;
      }

      // Use the converter with the original source as context to preserve special blocks
      return this._htmlToMarkdownConverter.convert(html, {
        originalSource: options.originalSource || this.input.value
      });
    }

    /**
     * Converts a table in the DOM to CSV format
     * 
     * @param {string} html - The HTML content containing a table
     * @param {string} [delimiter=','] - The delimiter to use
     * @returns {string} The CSV content
     */
  }, {
    key: "tableToCSV",
    value: function tableToCSV(html) {
      var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      var table = tempDiv.querySelector('table');
      if (!table) {
        return '';
      }
      var rows = Array.from(table.querySelectorAll('tr'));
      var csvRows = rows.map(function (row) {
        var cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(function (cell) {
          // Escape quotes and wrap in quotes if needed
          var text = cell.textContent.trim();
          if (text.includes(delimiter) || text.includes('"') || text.includes('\n')) {
            return "\"".concat(text.replace(/"/g, '""'), "\"");
          }
          return text;
        }).join(delimiter);
      });
      return csvRows.join('\n');
    }

    /**
     * Removes all horizontal rules (---) from the Markdown content.
     * Only works when the current content type is Markdown.
     */
  }, {
    key: "markdownRemoveAllHR",
    value: function markdownRemoveAllHR() {
      if (this.inputContentType === 'md') {
        var markdown = this.getMarkdownSource();
        var newMarkdown = markdown.replace(/---/g, '');
        this.setContent(newMarkdown, this.inputContentType);
      }
    }

    /**
     * Adjusts the heading levels in Markdown text by a specified offset.
     * 
     * @param {string} markdown - The Markdown text to process
     * @param {number} offset - The amount to adjust heading levels by (positive to increase, negative to decrease)
     * @returns {string} - The Markdown text with adjusted heading levels
     */
  }, {
    key: "markdownAdjustHeadings",
    value: function markdownAdjustHeadings(markdown, offset) {
      // Early exit if offset is 0 or invalid input
      if (offset === 0 || typeof markdown !== 'string') {
        return markdown;
      }

      // Split the input into lines
      var lines = markdown.split('\n');

      // Process each line
      var modifiedLines = lines.map(function (line) {
        // Regex to match heading lines: starts with 1-6 hash symbols followed by a space
        var headingMatch = line.match(/^(#{1,6})\s/);
        if (!headingMatch) {
          // Not a heading, return unchanged
          return line;
        }
        var currentHeadingLevel = headingMatch[1].length;
        // Calculate new heading level with bounds checking (min 1, max 6)
        var newHeadingLevel = Math.min(Math.max(currentHeadingLevel + offset, 1), 6);

        // Replace the heading prefix with the new level
        return '#'.repeat(newHeadingLevel) + line.substring(currentHeadingLevel);
      });

      // Join the lines back together
      return modifiedLines.join('\n');
    }

    /**
     * Adjusts heading levels in the current Markdown content.
     * 
     * @param {number} offset - The amount to adjust heading levels by (positive to increase, negative to decrease)
     */
  }, {
    key: "markdownEditorAdjustHeadings",
    value: function markdownEditorAdjustHeadings(offset) {
      var markdown = this.getMarkdownSource();
      var newMarkdown = this.markdownAdjustHeadings(markdown, offset);
      this.setContent(newMarkdown, this.inputContentType);
    }

    /**
     * Sets the current view mode of the editor.
     * 
     * @param {string} view - The view mode to set: 'src' (source only), 'html' (rendered only), or 'split' (both)
     */
  }, {
    key: "setView",
    value: function setView(view) {
      this.currentView = view;

      // Set data-view attribute on editor for CSS styling
      this.editor.setAttribute('data-view', view);
      this.controls.querySelectorAll('button[data-view]').forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.view === view);
      });
      var copyMDButton = this.controls.querySelector('.copy-src-button');
      var copyHTMLButton = this.controls.querySelector('.copy-html-button');
      if (view === 'src') {
        if (this.sourcePanel) {
          this.sourcePanel.classList.remove('squibview-hidden');
          this.sourcePanel.style.width = '100%';
        } else {
          this.input.classList.remove('squibview-hidden');
          this.input.style.width = '100%';
        }
        this.output.classList.add('squibview-hidden');
        copyMDButton.classList.remove('squibview-hidden');
        copyHTMLButton.classList.add('squibview-hidden');
      } else if (view === 'html') {
        if (this.sourcePanel) {
          this.sourcePanel.classList.add('squibview-hidden');
        } else {
          this.input.classList.add('squibview-hidden');
        }
        this.output.classList.remove('squibview-hidden');
        this.output.style.width = '100%';
        copyMDButton.classList.add('squibview-hidden');
        copyHTMLButton.classList.remove('squibview-hidden');
      } else {
        // view == 'split'
        if (this.sourcePanel) {
          this.sourcePanel.classList.remove('squibview-hidden');
          this.sourcePanel.style.width = '50%';
        } else {
          this.input.classList.remove('squibview-hidden');
          this.input.style.width = '50%';
        }
        this.output.classList.remove('squibview-hidden');
        this.output.style.width = '50%';
        copyMDButton.classList.remove('squibview-hidden');
        copyHTMLButton.classList.remove('squibview-hidden');
      }
      this.adjustLayout();

      // Emit view:change event
      this.events.emit('view:change', view);
    }

    /**
     * Renders HTML content in an iframe within the output div.
     * 
     * @param {string} src - The HTML source content to render
     */
  }, {
    key: "renderHTML",
    value: function renderHTML(src) {
      var htmlContent = src;
      var outputDiv = this.output;
      this.insertContentInIframe(outputDiv, htmlContent);

      // Emit html:rendered event
      this.events.emit('html:rendered', htmlContent);
    }

    /**
     * Creates an iframe that fills the entire parent element and injects provided HTML content.
     * @param {HTMLElement} parentElement - The parent element to contain the iframe.
     * @param {string} htmlContent - The HTML content to inject into the iframe.
     */
  }, {
    key: "insertContentInIframe",
    value: function insertContentInIframe(parentElement, htmlContent) {
      // Create an iframe element
      var iframe = document.createElement('iframe');

      // Style the iframe to fill the parent completely
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.display = 'block';

      // Append the iframe to the parent element
      parentElement.innerHTML = '';
      parentElement.appendChild(iframe);

      // Access the iframe's document and write the HTML content into it
      var iframeDoc = iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
      this.output_iframe = iframe;
      this.output_ifraome_content = htmlContent;
    }

    /**
     * Renders the current content based on its type using the registered renderer.
     */
  }, {
    key: "renderOutput",
    value: function renderOutput() {
      var renderer = this.renderers[this.inputContentType];
      if (renderer && renderer.render) {
        renderer.render(this.getContent());
        this.events.emit('content:rendered', this.inputContentType);
      } else {
        console.warn("No renderer for content type: ".concat(this.inputContentType));
        // Fall back to Markdown rendering
        this.renderMarkdown();
      }
    }

    /**
     * Copies the source content to the clipboard.
     * Attempts to use the modern Clipboard API with fallbacks for older browsers.
     * 
     * @returns {Promise<void>} A promise that resolves when copying is complete
     */
  }, {
    key: "copySource",
    value: (function () {
      var _copySource = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var copyButton, markdownText, textarea;
        return _regeneratorRuntime().wrap(function _callee11$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-src-button');
              copyButton.textContent = 'Copying...';
              _context13.prev = 2;
              markdownText = this.getMarkdownSource();
              _context13.prev = 4;
              _context13.next = 7;
              return navigator.clipboard.writeText(markdownText);
            case 7:
              _context13.next = 18;
              break;
            case 9:
              _context13.prev = 9;
              _context13.t0 = _context13["catch"](4);
              textarea = document.createElement('textarea');
              textarea.value = markdownText;
              textarea.style.position = 'fixed';
              textarea.style.opacity = '0';
              document.body.appendChild(textarea);
              textarea.select();
              document.body.removeChild(textarea);
            case 18:
              copyButton.textContent = 'Copied!';
              _context13.next = 25;
              break;
            case 21:
              _context13.prev = 21;
              _context13.t1 = _context13["catch"](2);
              console.error('Copy Markdown failed:', _context13.t1);
              copyButton.textContent = 'Copy failed';
            case 25:
              setTimeout(function () {
                copyButton.textContent = 'Copy Source';
              }, 2000);
            case 26:
            case "end":
              return _context13.stop();
          }
        }, _callee11, this, [[2, 21], [4, 9]]);
      }));
      function copySource() {
        return _copySource.apply(this, arguments);
      }
      return copySource;
    }()
    /**
     * Gets the current markdown source from the input textarea.
     * 
     * @returns {string} The markdown source
     */
    )
  }, {
    key: "getMarkdownSource",
    value: function getMarkdownSource() {
      return this.input.value;
    }

    /**
     * Gets the HTML source from the rendered output.
     * 
     * @returns {string} The HTML content
     */
  }, {
    key: "getHTMLSource",
    value: function getHTMLSource() {
      var contentEditable = this.output.querySelector('div[contenteditable="true"]');
      if (contentEditable) {
        return contentEditable.innerHTML;
      }

      // If we have an iframe (HTML view)
      if (this.output_iframe) {
        return this.output_ifraome_content;
      }
      return '';
    }

    /**
     * Gets source diff as a programmatic object
     * 
     * @param {Object} options - Diff options
     * @param {number} options.fromIndex - Starting revision index (defaults to current - 1)
     * @param {number} options.toIndex - Ending revision index (defaults to current)
     * @returns {Object} Diff data object with metadata and line diffs
     */
  }, {
    key: "getSourceDiff",
    value: function getSourceDiff() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$fromIndex = options.fromIndex,
        fromIndex = _options$fromIndex === void 0 ? null : _options$fromIndex,
        _options$toIndex = options.toIndex,
        toIndex = _options$toIndex === void 0 ? null : _options$toIndex;

      // Get metadata about the revisions being compared
      var currentIndex = this.revisionManager.getCurrentIndex();
      var actualFromIndex = fromIndex === null ? Math.max(-1, currentIndex - 1) : fromIndex;
      var actualToIndex = toIndex === null ? currentIndex : toIndex;

      // Get the line diff
      var lineDiff = this.revisionManager.computeLineDiff(actualFromIndex, actualToIndex);

      // Build the diff object
      var diffData = {
        fromIndex: actualFromIndex,
        toIndex: actualToIndex,
        lineDiff: lineDiff,
        stats: this.revisionManager.getDiffStats(actualFromIndex, actualToIndex)
      };

      // Add revision info if indices are valid
      try {
        diffData.fromRevision = this.revisionManager.getRevisionInfo(actualFromIndex);
        diffData.toRevision = this.revisionManager.getRevisionInfo(actualToIndex);
      } catch (e) {
        // Invalid indices, return partial data
        diffData.error = e.message;
      }

      // Emit diff computed event
      this.events.emit('diff:computed', {
        fromIndex: diffData.fromIndex,
        toIndex: diffData.toIndex,
        stats: diffData.stats,
        hasChanges: diffData.stats.totalChanges > 0
      });
      return diffData;
    }

    /**
     * Gets source diff as display-ready HTML
     * 
     * @param {Object} options - Diff and styling options
     * @param {number} options.fromIndex - Starting revision index (defaults to current - 1)
     * @param {number} options.toIndex - Ending revision index (defaults to current)
     * @param {boolean} options.showLineNumbers - Whether to show line numbers (default: true)
     * @param {Object} options.cssClasses - Custom CSS classes for styling
     * @returns {string} HTML string
     */
  }, {
    key: "getSourceDiffHTML",
    value: function getSourceDiffHTML() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$fromIndex2 = options.fromIndex,
        fromIndex = _options$fromIndex2 === void 0 ? null : _options$fromIndex2,
        _options$toIndex2 = options.toIndex,
        toIndex = _options$toIndex2 === void 0 ? null : _options$toIndex2,
        _options$showLineNumb = options.showLineNumbers,
        showLineNumbers = _options$showLineNumb === void 0 ? true : _options$showLineNumb,
        _options$cssClasses = options.cssClasses,
        cssClasses = _options$cssClasses === void 0 ? {} : _options$cssClasses;

      // Get the diff data
      var diffData = this.getSourceDiff({
        fromIndex: fromIndex,
        toIndex: toIndex
      });

      // Default CSS classes
      var classes = {
        container: cssClasses.container || 'squibview-diff',
        line: cssClasses.line || 'diff-line',
        added: cssClasses.added || 'diff-added',
        removed: cssClasses.removed || 'diff-removed',
        unchanged: cssClasses.unchanged || 'diff-unchanged',
        lineNumber: cssClasses.lineNumber || 'diff-line-number',
        content: cssClasses.content || 'diff-content'
      };

      // Build HTML
      var html = "<div class=\"".concat(classes.container, "\" contenteditable=\"false\">");

      // Add header with revision info and stats
      html += "<div class=\"diff-header\">";
      html += "<div>Comparing revision ".concat(diffData.fromIndex, " to ").concat(diffData.toIndex, "</div>");

      // Add statistics
      if (diffData.stats && diffData.stats.totalChanges > 0) {
        html += "<div class=\"diff-stats\">";
        if (diffData.stats.additions > 0) {
          html += "<span class=\"stat additions\">+".concat(diffData.stats.additions, " additions</span>");
        }
        if (diffData.stats.deletions > 0) {
          html += "<span class=\"stat deletions\">-".concat(diffData.stats.deletions, " deletions</span>");
        }
        if (diffData.stats.modifications > 0) {
          html += "<span class=\"stat modifications\">~".concat(diffData.stats.modifications, " modifications</span>");
        }
        html += "<span class=\"stat\">".concat(diffData.stats.totalChanges, " total changes</span>");
        html += "</div>";
      } else {
        html += "<div class=\"diff-stats\"><span class=\"stat\">No changes</span></div>";
      }
      html += "</div>";

      // Add diff content
      html += "<div class=\"diff-content\">";
      var _iterator5 = _createForOfIteratorHelper(diffData.lineDiff),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var line = _step5.value;
          var lineClass = "".concat(classes.line, " ").concat(classes[line.type]);
          html += "<div class=\"".concat(lineClass, "\">");
          if (showLineNumbers) {
            var displayNum = line.type === 'removed' ? line.oldLineNum || '' : line.newLineNum || '';
            html += "<span class=\"".concat(classes.lineNumber, "\">").concat(displayNum, "</span>");
          }

          // Escape HTML in content
          var escapedContent = this._escapeHtml(line.content);
          html += "<span class=\"".concat(classes.content, "\">").concat(escapedContent, "</span>");
          html += "</div>";
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      html += "</div>"; // diff-content
      html += "</div>"; // container

      // Emit diff displayed event
      this.events.emit('diff:displayed', {
        fromIndex: diffData.fromIndex,
        toIndex: diffData.toIndex,
        stats: diffData.stats,
        htmlLength: html.length,
        showLineNumbers: showLineNumbers
      });
      return html;
    }

    /**
     * Gets source diff as inline HTML with additions and deletions marked within the text
     * 
     * @param {Object} options - Diff and styling options
     * @param {number} options.fromIndex - Starting revision index (defaults to current - 1)
     * @param {number} options.toIndex - Ending revision index (defaults to current)
     * @param {Object} options.cssClasses - Custom CSS classes for styling
     * @returns {string} HTML string with inline diff markup
     */
  }, {
    key: "getSourceDiffInline",
    value: function getSourceDiffInline() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$fromIndex3 = options.fromIndex,
        fromIndex = _options$fromIndex3 === void 0 ? null : _options$fromIndex3,
        _options$toIndex3 = options.toIndex,
        toIndex = _options$toIndex3 === void 0 ? null : _options$toIndex3,
        _options$cssClasses2 = options.cssClasses,
        cssClasses = _options$cssClasses2 === void 0 ? {} : _options$cssClasses2;

      // Get the raw diff data
      var diffData = this.getSourceDiff({
        fromIndex: fromIndex,
        toIndex: toIndex
      });

      // Default CSS classes for inline diff
      var classes = {
        container: cssClasses.container || 'squibview-diff-inline',
        added: cssClasses.added || 'diff-inline-added',
        removed: cssClasses.removed || 'diff-inline-removed'
      };

      // Get the actual content from the revisions
      var currentIndex = this.revisionManager.getCurrentIndex();
      var actualFromIndex = fromIndex === null ? Math.max(-1, currentIndex - 1) : fromIndex;
      var actualToIndex = toIndex === null ? currentIndex : toIndex;
      var fromContent, toContent;
      try {
        fromContent = this.revisionManager.getContentAtRevision(actualFromIndex).content;
        toContent = this.revisionManager.getContentAtRevision(actualToIndex).content;
      } catch (e) {
        return "<div class=\"".concat(classes.container, "\"><p>Error: ").concat(e.message, "</p></div>");
      }

      // Get character-level diff
      var diff = this.revisionManager.diffEngine.diff_main(fromContent, toContent);
      this.revisionManager.diffEngine.diff_cleanupSemantic(diff);

      // Convert diff to inline HTML
      var html = "<div class=\"".concat(classes.container, "\" contenteditable=\"false\">");

      // Add header
      html += "<div class=\"diff-inline-header\">";
      html += "<div>Comparing revision ".concat(actualFromIndex, " to ").concat(actualToIndex, "</div>");
      if (diffData.stats && diffData.stats.totalChanges > 0) {
        html += "<div class=\"diff-inline-stats\">";
        html += "<span style=\"color: #007bff;\">+".concat(diffData.stats.additions, "</span> ");
        html += "<span style=\"color: #dc3545;\">-".concat(diffData.stats.deletions, "</span>");
        if (diffData.stats.modifications > 0) {
          html += " <span style=\"color: #ffc107;\">~".concat(diffData.stats.modifications, "</span>");
        }
        html += "</div>";
      }
      html += "</div>";

      // Add content with inline diffs
      html += "<div class=\"diff-inline-content\">";
      var _iterator6 = _createForOfIteratorHelper(diff),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _step6$value = _slicedToArray(_step6.value, 2),
            op = _step6$value[0],
            text = _step6$value[1];
          var escapedText = this._escapeHtml(text);
          if (op === 1) {
            // Addition
            html += "<span class=\"".concat(classes.added, "\">").concat(escapedText, "</span>");
          } else if (op === -1) {
            // Deletion
            html += "<span class=\"".concat(classes.removed, "\">").concat(escapedText, "</span>");
          } else {
            // Unchanged
            html += escapedText;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      html += "</div></div>";

      // Emit diff displayed event
      this.events.emit('diff:displayed', {
        fromIndex: actualFromIndex,
        toIndex: actualToIndex,
        stats: diffData.stats,
        htmlLength: html.length,
        type: 'inline'
      });
      return html;
    }

    /**
     * Escapes HTML special characters
     * @private
     */
  }, {
    key: "_escapeHtml",
    value: function _escapeHtml(text) {
      var div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    /**
     * Registers a callback function to be called when text is selected
     * 
     * @param {Function} callback - Function to call when text is selected
     * @returns {Function} Unsubscribe function to remove the callback
     */
  }, {
    key: "onTextSelected",
    value: function onTextSelected(callback) {
      var _this14 = this;
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
      }
      this.events.on('text:selected', callback);

      // Return unsubscribe function
      return function () {
        _this14.events.off('text:selected', callback);
      };
    }

    /**
     * Replaces the currently selected text in either panel
     * 
     * @param {string} replacement - The text to replace the selection with
     * @param {Object} selectionData - The selection data from the text:selected event
     * @returns {boolean} Whether the replacement was successful
     */
  }, {
    key: "replaceSelectedText",
    value: function replaceSelectedText(replacement, selectionData) {
      if (!selectionData) {
        return false;
      }
      if (selectionData.panel === 'source') {
        // Replace in source panel (textarea)
        var _selectionData$range = selectionData.range,
          start = _selectionData$range.start,
          end = _selectionData$range.end;
        var currentContent = this.input.value;
        var newContent = currentContent.substring(0, start) + replacement + currentContent.substring(end);

        // Update content
        this.setContent(newContent, this.inputContentType);

        // Return cursor focus to textarea
        this.input.focus();
        this.input.setSelectionRange(start + replacement.length, start + replacement.length);
        return true;
      } else if (selectionData.panel === 'rendered') {
        // Replace in rendered panel (contenteditable div)
        var range = selectionData.range;
        range.deleteContents();

        // Create a text node with the replacement text
        var textNode = document.createTextNode(replacement);
        range.insertNode(textNode);

        // Set the cursor at the end of the replaced text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);

        // Collapse the range to a cursor position
        range.collapse(true);

        // Select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Update the source content to match the HTML changes
        var editableContent = this.output.querySelector('[contenteditable="true"]');
        if (editableContent) {
          var renderedContent = editableContent.innerHTML;
          var renderer = this.renderers[this.inputContentType];
          if (renderer && renderer.outputToSource) {
            var originalSource = this.input.value;
            var newSource = renderer.outputToSource(renderedContent, {
              originalSource: originalSource
            });

            // Update source content
            this.input.value = newSource;

            // Add to revision history
            this.revisionManager.addRevision(newSource, this.inputContentType);

            // Emit content change event
            this.events.emit('content:change', newSource, this.inputContentType);
          }
        }
        return true;
      }
      return false;
    }

    /**
     * Sets the contenteditable attribute for the selected text
     * 
     * @param {boolean} editable - Whether the selection should be editable
     * @param {Object} selectionData - The selection data from the text:selected event
     * @returns {boolean} Whether the operation was successful
     */
  }, {
    key: "setSelectionEditable",
    value: function setSelectionEditable(editable, selectionData) {
      if (!selectionData || selectionData.panel !== 'rendered') {
        return false;
      }
      var range = selectionData.range;
      if (range) {
        // Create a wrapper span to control editability
        var span = document.createElement('span');
        span.contentEditable = editable.toString(); // 'true' or 'false'

        // Add a class to visually indicate locked content
        if (!editable) {
          span.className = 'squibview-locked-content';
          span.title = 'This content is locked (not editable)';
          // Add a small lock icon using CSS ::before
          span.style.position = 'relative';
          span.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
          span.style.border = '1px dashed #999';
          span.style.borderRadius = '3px';
          span.style.padding = '0 2px';
        } else {
          span.className = 'squibview-editable-content';
        }

        // Clone the range contents into the span
        span.appendChild(range.cloneContents());

        // Clear the selected content and insert the wrapped content
        range.deleteContents();
        range.insertNode(span);

        // Update the source content to match the HTML changes
        var editableContent = this.output.querySelector('[contenteditable="true"]');
        if (editableContent) {
          var renderedContent = editableContent.innerHTML;
          var renderer = this.renderers[this.inputContentType];
          if (renderer && renderer.outputToSource) {
            var originalSource = this.input.value;
            var newSource = renderer.outputToSource(renderedContent, {
              originalSource: originalSource
            });

            // Update source content
            this.input.value = newSource;

            // Add to revision history
            this.revisionManager.addRevision(newSource, this.inputContentType);

            // Emit content change event
            this.events.emit('content:change', newSource, this.inputContentType);
          }
        }
        return true;
      }
      return false;
    }

    /**
     * Toggles the editability of the selected text
     * 
     * @param {Object} selectionData - The selection data from the text:selected event
     * @returns {boolean} Whether the operation was successful and the new state (true=editable, false=locked)
     */
  }, {
    key: "toggleSelectionLock",
    value: function toggleSelectionLock(selectionData) {
      if (!selectionData || selectionData.panel !== 'rendered') {
        return null;
      }

      // Detect if selection is inside an already locked/unlocked span
      var targetNode = selectionData.range.commonAncestorContainer;
      var isLocked = false;

      // Navigate up to find if selection is within a contenteditable span
      while (targetNode && targetNode.nodeType === Node.ELEMENT_NODE) {
        if (targetNode.hasAttribute('contenteditable')) {
          // Found a contenteditable attribute, check its value
          isLocked = targetNode.getAttribute('contenteditable') === 'false';
          break;
        }
        targetNode = targetNode.parentNode;
      }

      // Toggle the state - if locked, unlock it; if unlocked or not in a contenteditable span, lock it
      var newEditableState = isLocked;
      var result = this.setSelectionEditable(newEditableState, selectionData);

      // Return both success status and the new state
      return result ? newEditableState : null;
    }

    /**
     * Gets the current text selection data from either panel
     * 
     * @returns {Object|null} The selection data object or null if no text is selected
     */
  }, {
    key: "getCurrentSelection",
    value: function getCurrentSelection() {
      // First, check if we have a cached selection
      if (this.lastSelectionData) {
        return this.lastSelectionData;
      }
      var selection = document.getSelection();

      // Check if we have an active selection
      if (!selection || selection.toString().trim() === '') {
        return null;
      }

      // Determine which panel contains the selection
      if (this.input === document.activeElement) {
        // Source panel selection
        var selectionData = {
          panel: 'source',
          text: selection.toString(),
          range: {
            start: this.input.selectionStart,
            end: this.input.selectionEnd
          }
        };
        this.lastSelectionData = selectionData;
        return selectionData;
      } else {
        // Try to find if selection is within the rendered panel
        var node = selection.anchorNode;
        var isInOutput = false;

        // Walk up the DOM tree to check if selection is within output panel
        while (node && node !== document.body) {
          if (node === this.output) {
            isInOutput = true;
            break;
          }
          node = node.parentNode;
        }
        if (isInOutput) {
          var _selectionData = {
            panel: 'rendered',
            text: selection.toString(),
            range: selection.getRangeAt(0),
            element: this.output.querySelector('[contenteditable="true"]')
          };
          this.lastSelectionData = _selectionData;
          return _selectionData;
        }
      }
      return null;
    }

    /**
     * Clears the current text selection
     */
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.lastSelectionData = null;
      var selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    }

    /**
     * Sets a handler function for text replacement on selection
     * 
     * @param {Function|null} handler - Function to call when text is selected, or null to remove handler
     * @throws {Error} If handler is not a function or null
     */
  }, {
    key: "onReplaceSelectedText",
    get:
    /**
     * Gets the current text replacement handler
     * 
     * @returns {Function|null} The current handler function or null if none is set
     */
    function get() {
      var _this15 = this;
      return this._onTextReplacementHandler ? function (selectionData) {
        var result = _this15._onTextReplacementHandler(selectionData);
        return result;
      } : null;
    }

    /**
     * Copies the rendered content to the clipboard with formatting.
     * Processes code blocks, SVG elements, and images to ensure they copy correctly.
     */,
    set: function set(handler) {
      var _this16 = this;
      if (handler !== null && typeof handler !== 'function') {
        throw new Error('onReplaceSelectedText handler must be a function or null');
      }

      // Remove previous handler if it exists
      if (this._onTextReplacementHandler) {
        this.events.off('text:selected', this._onTextReplacementHandler);
        this._onTextReplacementHandler = null;
      }

      // Set new handler if provided
      if (handler) {
        this._onTextReplacementHandler = function (selectionData) {
          var result = handler(selectionData);

          // If the handler returns a string, use it to replace the selected text
          if (typeof result === 'string') {
            _this16.replaceSelectedText(result, selectionData);
          }
        };

        // Register the handler
        this.events.on('text:selected', this._onTextReplacementHandler);
      }
    }
  }, {
    key: "copyHTML",
    value: (function () {
      var _copyHTML = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var _this17 = this;
        var copyButton, contentDiv, clone, images, _iterator7, _step7, _loop4, svgElements, _iterator8, _step8, _loop5, mathElements, _iterator9, _step9, _loop3, geojsonContainers, _iterator10, _step10, container, originalSource, originalContainer, allOriginalContainers, _iterator12, _step12, candidate, dataUrl, img, placeholder, _placeholder, stlContainers, _iterator11, _step11, _container, _originalSource, _originalContainer, _allOriginalContainers, _iterator13, _step13, _candidate, canvas, renderer, scene, camera, _dataUrl, _img, _placeholder2, _placeholder3, htmlContent, platform, tempDiv, selection, range, successful;
        return _regeneratorRuntime().wrap(function _callee12$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-html-button');
              copyButton.textContent = 'Copying...';
              _context17.prev = 2;
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              if (contentDiv) {
                _context17.next = 6;
                break;
              }
              throw new Error('Content div not found');
            case 6:
              clone = contentDiv.cloneNode(true); // Process code blocks
              clone.querySelectorAll('pre code').forEach(function (block) {
                var formattedCode = block.innerHTML;
                var table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                table.style.border = 'none';
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.style.backgroundColor = '#f7f7f7';
                td.style.padding = '12px';
                td.style.fontFamily = 'Consolas, Monaco, "Courier New", monospace';
                td.style.whiteSpace = 'pre';
                td.style.border = 'none';
                td.innerHTML = formattedCode.trim();
                tr.appendChild(td);
                table.appendChild(tr);
                block.parentNode.replaceWith(table);
              });

              // Convert all images to data URLs for copying
              images = clone.querySelectorAll('img');
              _iterator7 = _createForOfIteratorHelper(images);
              _context17.prev = 10;
              _loop4 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop4() {
                var img, canvas, ctx, tempImg, width, height;
                return _regeneratorRuntime().wrap(function _loop4$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      img = _step7.value;
                      _context15.prev = 1;
                      canvas = document.createElement('canvas');
                      ctx = canvas.getContext('2d'); // Create new image and wait for it to load
                      tempImg = new Image();
                      tempImg.crossOrigin = 'anonymous';
                      _context15.next = 8;
                      return new Promise(function (resolve, reject) {
                        tempImg.onload = function () {
                          // Get intended display dimensions from HTML attributes or CSS
                          var hasWidthAttr = img.getAttribute('width');
                          var hasHeightAttr = img.getAttribute('height');
                          var displayWidth, displayHeight;
                          if (hasWidthAttr && hasHeightAttr) {
                            // Both dimensions specified
                            displayWidth = parseInt(hasWidthAttr);
                            displayHeight = parseInt(hasHeightAttr);
                          } else if (hasWidthAttr && !hasHeightAttr) {
                            // Only width specified - maintain aspect ratio
                            displayWidth = parseInt(hasWidthAttr);
                            displayHeight = Math.round(displayWidth / tempImg.naturalWidth * tempImg.naturalHeight);
                          } else if (!hasWidthAttr && hasHeightAttr) {
                            // Only height specified - maintain aspect ratio
                            displayHeight = parseInt(hasHeightAttr);
                            displayWidth = Math.round(displayHeight / tempImg.naturalHeight * tempImg.naturalWidth);
                          } else {
                            // No dimensions specified - use natural size
                            displayWidth = tempImg.naturalWidth;
                            displayHeight = tempImg.naturalHeight;
                          }

                          // Set canvas size to intended display size (not natural size)
                          canvas.width = displayWidth;
                          canvas.height = displayHeight;

                          // Draw image scaled to intended size
                          ctx.drawImage(tempImg, 0, 0, displayWidth, displayHeight);

                          // Convert to data URL
                          var dataUrl = canvas.toDataURL('image/png', 1.0);

                          // Update original image with proper sizing
                          img.src = dataUrl;
                          img.setAttribute('width', displayWidth.toString());
                          img.setAttribute('height', displayHeight.toString());
                          img.style.width = displayWidth + 'px';
                          img.style.height = displayHeight + 'px';
                          resolve();
                        };
                        tempImg.onerror = reject;
                        tempImg.src = img.src;
                      });
                    case 8:
                      _context15.next = 14;
                      break;
                    case 10:
                      _context15.prev = 10;
                      _context15.t0 = _context15["catch"](1);
                      console.error('Failed to convert image for copying:', _context15.t0);
                      // Preserve the original image source if conversion fails (e.g., for external badges)
                      // This ensures badges from services like shields.io still work when copied
                      if (img.src) {
                        // Keep the original src and any existing dimensions
                        width = img.getAttribute('width');
                        height = img.getAttribute('height');
                        if (width) img.style.width = width + (width.match(/\d+$/) ? 'px' : '');
                        if (height) img.style.height = height + (height.match(/\d+$/) ? 'px' : '');
                      }
                    case 14:
                    case "end":
                      return _context15.stop();
                  }
                }, _loop4, null, [[1, 10]]);
              });
              _iterator7.s();
            case 13:
              if ((_step7 = _iterator7.n()).done) {
                _context17.next = 17;
                break;
              }
              return _context17.delegateYield(_loop4(), "t0", 15);
            case 15:
              _context17.next = 13;
              break;
            case 17:
              _context17.next = 22;
              break;
            case 19:
              _context17.prev = 19;
              _context17.t1 = _context17["catch"](10);
              _iterator7.e(_context17.t1);
            case 22:
              _context17.prev = 22;
              _iterator7.f();
              return _context17.finish(22);
            case 25:
              // Convert SVG elements to PNG (excluding math SVGs which are handled separately)
              svgElements = clone.querySelectorAll('svg');
              _iterator8 = _createForOfIteratorHelper(svgElements);
              _context17.prev = 27;
              _loop5 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop5() {
                var svg, pngBlob, dataUrl, img, isMermaidSvg, hasExplicitDimensions, imgWidth, imgHeight;
                return _regeneratorRuntime().wrap(function _loop5$(_context16) {
                  while (1) switch (_context16.prev = _context16.next) {
                    case 0:
                      svg = _step8.value;
                      if (!svg.closest('.math-display')) {
                        _context16.next = 3;
                        break;
                      }
                      return _context16.abrupt("return", 1);
                    case 3:
                      _context16.prev = 3;
                      _context16.next = 6;
                      return _this17.svgToPng(svg);
                    case 6:
                      pngBlob = _context16.sent;
                      _context16.next = 9;
                      return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                          return resolve(reader.result);
                        };
                        reader.readAsDataURL(pngBlob);
                      });
                    case 9:
                      dataUrl = _context16.sent;
                      img = document.createElement('img');
                      img.src = dataUrl;

                      // Use the exact same dimension calculation logic as svgToPng
                      isMermaidSvg = svg.closest('.mermaid') || svg.classList.contains('mermaid');
                      hasExplicitDimensions = svg.getAttribute('width') && svg.getAttribute('height');
                      if (isMermaidSvg || !hasExplicitDimensions) {
                        // For Mermaid or other generated SVGs, prioritize computed dimensions
                        imgWidth = svg.clientWidth || svg.viewBox && svg.viewBox.baseVal.width || parseFloat(svg.getAttribute('width')) || 400;
                        imgHeight = svg.clientHeight || svg.viewBox && svg.viewBox.baseVal.height || parseFloat(svg.getAttribute('height')) || 300;
                      } else {
                        // For explicit SVGs (like fenced SVG blocks), prioritize explicit attributes
                        imgWidth = parseFloat(svg.getAttribute('width')) || svg.viewBox && svg.viewBox.baseVal.width || svg.clientWidth || 400;
                        imgHeight = parseFloat(svg.getAttribute('height')) || svg.viewBox && svg.viewBox.baseVal.height || svg.clientHeight || 300;
                      }

                      // Set both HTML attributes and CSS properties for maximum compatibility
                      img.width = imgWidth;
                      img.height = imgHeight;
                      img.setAttribute('width', imgWidth.toString());
                      img.setAttribute('height', imgHeight.toString());
                      img.style.width = imgWidth + 'px';
                      img.style.height = imgHeight + 'px';
                      img.style.maxWidth = 'none'; // Prevent CSS from constraining the image
                      img.style.maxHeight = 'none';
                      img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
                      img.alt = "Converted diagram";
                      svg.parentNode.replaceChild(img, svg);
                      _context16.next = 31;
                      break;
                    case 28:
                      _context16.prev = 28;
                      _context16.t0 = _context16["catch"](3);
                      console.error('Failed to convert SVG:', _context16.t0);
                    case 31:
                    case "end":
                      return _context16.stop();
                  }
                }, _loop5, null, [[3, 28]]);
              });
              _iterator8.s();
            case 30:
              if ((_step8 = _iterator8.n()).done) {
                _context17.next = 36;
                break;
              }
              return _context17.delegateYield(_loop5(), "t2", 32);
            case 32:
              if (!_context17.t2) {
                _context17.next = 34;
                break;
              }
              return _context17.abrupt("continue", 34);
            case 34:
              _context17.next = 30;
              break;
            case 36:
              _context17.next = 41;
              break;
            case 38:
              _context17.prev = 38;
              _context17.t3 = _context17["catch"](27);
              _iterator8.e(_context17.t3);
            case 41:
              _context17.prev = 41;
              _iterator8.f();
              return _context17.finish(41);
            case 44:
              // Convert Math elements to PNG images using the copy-as-image approach from math-test.html
              mathElements = Array.from(clone.querySelectorAll('.math-display'));
              if (!(mathElements.length > 0)) {
                _context17.next = 64;
                break;
              }
              _iterator9 = _createForOfIteratorHelper(mathElements);
              _context17.prev = 47;
              _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
                var mathEl, svg, serializer, svgStr, svgBlob, url, img, dataUrl, imgElement;
                return _regeneratorRuntime().wrap(function _loop3$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      mathEl = _step9.value;
                      _context14.prev = 1;
                      svg = mathEl.querySelector('svg');
                      if (svg) {
                        _context14.next = 6;
                        break;
                      }
                      console.warn('No SVG found in math element, skipping');
                      return _context14.abrupt("return", 1);
                    case 6:
                      // Convert SVG to PNG data URL using the exact approach from math-test.html
                      serializer = new XMLSerializer();
                      svgStr = serializer.serializeToString(svg);
                      svgBlob = new Blob([svgStr], {
                        type: "image/svg+xml;charset=utf-8"
                      });
                      url = URL.createObjectURL(svgBlob);
                      img = new Image();
                      _context14.next = 13;
                      return new Promise(function (resolve, reject) {
                        img.onload = function () {
                          var canvas = document.createElement('canvas');

                          // Try different approaches to get SVG dimensions
                          var width, height;
                          try {
                            // First try baseVal.value (works for absolute units)
                            width = svg.width.baseVal.value;
                            height = svg.height.baseVal.value;
                          } catch (e) {
                            // Fallback for relative units - use viewBox or rendered size
                            if (svg.viewBox && svg.viewBox.baseVal) {
                              width = svg.viewBox.baseVal.width;
                              height = svg.viewBox.baseVal.height;
                            } else {
                              // Use the natural size of the loaded image
                              width = img.naturalWidth || img.width || 200;
                              height = img.naturalHeight || img.height || 50;
                            }
                          }

                          // Scale down math images to reasonable size for documents
                          // MathJax SVGs often have large coordinate systems, scale them down aggressively
                          var targetMaxWidth = 100; // Even smaller target max width for truly compact math
                          var targetMaxHeight = 30; // Even smaller target max height for inline-like appearance

                          // Apply an even smaller base scale factor for very compact output
                          var scaleFactor = 0.025; // Even smaller base scale for very compact math

                          // Calculate scaled dimensions
                          var scaledWidth = width * scaleFactor;
                          var scaledHeight = height * scaleFactor;

                          // If still too large after base scaling, scale down further
                          if (scaledWidth > targetMaxWidth || scaledHeight > targetMaxHeight) {
                            var scaleX = targetMaxWidth / scaledWidth;
                            var scaleY = targetMaxHeight / scaledHeight;
                            var additionalScale = Math.min(scaleX, scaleY);
                            scaleFactor *= additionalScale;
                            scaledWidth *= additionalScale;
                            scaledHeight *= additionalScale;
                          }
                          width = scaledWidth;
                          height = scaledHeight;

                          // Use a fixed DPR of 2 for crisp rendering on all displays
                          var dpr = 2;

                          // Set canvas size with device pixel ratio for crisp rendering
                          canvas.width = width * dpr;
                          canvas.height = height * dpr;
                          canvas.style.width = width + 'px';
                          canvas.style.height = height + 'px';
                          var ctx = canvas.getContext('2d');
                          ctx.scale(dpr, dpr);

                          // White background
                          ctx.fillStyle = "#FFFFFF";
                          ctx.fillRect(0, 0, width, height);

                          // Draw the SVG image with proper scaling
                          ctx.drawImage(img, 0, 0, width, height);

                          // Clean up URL
                          URL.revokeObjectURL(url);

                          // Return data URL
                          resolve(canvas.toDataURL('image/png'));
                        };
                        img.onerror = function () {
                          URL.revokeObjectURL(url);
                          reject(new Error('Failed to load SVG image'));
                        };
                        img.src = url;
                      });
                    case 13:
                      dataUrl = _context14.sent;
                      // Replace math element with img tag containing the PNG data URL
                      imgElement = document.createElement('img');
                      imgElement.src = dataUrl;
                      imgElement.style.cssText = 'display:block;margin:0.5em 0;max-width:100%;height:auto;';
                      imgElement.alt = 'Math equation';
                      mathEl.parentNode.replaceChild(imgElement, mathEl);
                      _context14.next = 24;
                      break;
                    case 21:
                      _context14.prev = 21;
                      _context14.t0 = _context14["catch"](1);
                      console.error('Failed to convert math element to image:', _context14.t0);
                      // Keep the original element if conversion fails
                    case 24:
                    case "end":
                      return _context14.stop();
                  }
                }, _loop3, null, [[1, 21]]);
              });
              _iterator9.s();
            case 50:
              if ((_step9 = _iterator9.n()).done) {
                _context17.next = 56;
                break;
              }
              return _context17.delegateYield(_loop3(), "t4", 52);
            case 52:
              if (!_context17.t4) {
                _context17.next = 54;
                break;
              }
              return _context17.abrupt("continue", 54);
            case 54:
              _context17.next = 50;
              break;
            case 56:
              _context17.next = 61;
              break;
            case 58:
              _context17.prev = 58;
              _context17.t5 = _context17["catch"](47);
              _iterator9.e(_context17.t5);
            case 61:
              _context17.prev = 61;
              _iterator9.f();
              return _context17.finish(61);
            case 64:
              // Handle GeoJSON containers - convert canvas to image
              geojsonContainers = clone.querySelectorAll('.geojson-container');
              _iterator10 = _createForOfIteratorHelper(geojsonContainers);
              _context17.prev = 66;
              _iterator10.s();
            case 68:
              if ((_step10 = _iterator10.n()).done) {
                _context17.next = 130;
                break;
              }
              container = _step10.value;
              _context17.prev = 70;
              // Find the corresponding GeoJSON container in the original DOM by searching with proper escaping
              originalSource = container.getAttribute('data-original-source');
              if (originalSource) {
                _context17.next = 75;
                break;
              }
              console.warn('No original source found for GeoJSON container');
              throw new Error('No original source');
            case 75:
              // Find original container more reliably
              originalContainer = null;
              allOriginalContainers = this.output.querySelectorAll('.geojson-container');
              _iterator12 = _createForOfIteratorHelper(allOriginalContainers);
              _context17.prev = 78;
              _iterator12.s();
            case 80:
              if ((_step12 = _iterator12.n()).done) {
                _context17.next = 87;
                break;
              }
              candidate = _step12.value;
              if (!(candidate.getAttribute('data-original-source') === originalSource)) {
                _context17.next = 85;
                break;
              }
              originalContainer = candidate;
              return _context17.abrupt("break", 87);
            case 85:
              _context17.next = 80;
              break;
            case 87:
              _context17.next = 92;
              break;
            case 89:
              _context17.prev = 89;
              _context17.t6 = _context17["catch"](78);
              _iterator12.e(_context17.t6);
            case 92:
              _context17.prev = 92;
              _iterator12.f();
              return _context17.finish(92);
            case 95:
              if (!originalContainer) {
                _context17.next = 114;
                break;
              }
              _context17.prev = 96;
              _context17.next = 99;
              return this.divToDataUrl(originalContainer);
            case 99:
              dataUrl = _context17.sent;
              if (!dataUrl) {
                _context17.next = 107;
                break;
              }
              img = document.createElement('img');
              img.src = dataUrl;
              img.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; margin: 0.5em 0;';
              img.alt = 'GeoJSON Map';

              // Replace the container with the image
              container.parentNode.replaceChild(img, container);
              return _context17.abrupt("continue", 128);
            case 107:
              _context17.next = 112;
              break;
            case 109:
              _context17.prev = 109;
              _context17.t7 = _context17["catch"](96);
              console.warn('Failed to convert GeoJSON container to image:', _context17.t7);
            case 112:
              _context17.next = 115;
              break;
            case 114:
              console.warn('Could not find original GeoJSON container');
            case 115:
              // Fallback to placeholder if canvas conversion fails
              placeholder = document.createElement('div');
              placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              placeholder.textContent = '[GeoJSON Map - Interactive content not available in copy]';
              container.parentNode.replaceChild(placeholder, container);
              _context17.next = 128;
              break;
            case 121:
              _context17.prev = 121;
              _context17.t8 = _context17["catch"](70);
              console.error('Error processing GeoJSON container for copy:', _context17.t8);
              // Fallback to placeholder
              _placeholder = document.createElement('div');
              _placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              _placeholder.textContent = '[GeoJSON Map - Interactive content not available in copy]';
              container.parentNode.replaceChild(_placeholder, container);
            case 128:
              _context17.next = 68;
              break;
            case 130:
              _context17.next = 135;
              break;
            case 132:
              _context17.prev = 132;
              _context17.t9 = _context17["catch"](66);
              _iterator10.e(_context17.t9);
            case 135:
              _context17.prev = 135;
              _iterator10.f();
              return _context17.finish(135);
            case 138:
              // Handle TopoJSON containers - convert to structured data tables
              clone.querySelectorAll('.topojson-container').forEach(function (container) {
                var originalSource = container.getAttribute('data-original-source');
                if (originalSource) {
                  try {
                    var topoData = JSON.parse(originalSource);

                    // Create a simple table showing TopoJSON data
                    var table = document.createElement('table');
                    table.style.cssText = 'width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin: 0.5em 0;';
                    var headerRow = document.createElement('tr');
                    headerRow.innerHTML = '<td colspan="2" style="background-color: #f5f5f5; padding: 8px; border: 1px solid #ddd; font-weight: bold;">TopoJSON Data</td>';
                    table.appendChild(headerRow);
                    var typeRow = document.createElement('tr');
                    typeRow.innerHTML = "<td style=\"padding: 8px; border: 1px solid #ddd; font-weight: bold;\">Type:</td><td style=\"padding: 8px; border: 1px solid #ddd;\">".concat(topoData.type || 'Unknown', "</td>");
                    table.appendChild(typeRow);
                    if (topoData.objects) {
                      var objectsRow = document.createElement('tr');
                      var objectNames = Object.keys(topoData.objects).join(', ');
                      objectsRow.innerHTML = "<td style=\"padding: 8px; border: 1px solid #ddd; font-weight: bold;\">Objects:</td><td style=\"padding: 8px; border: 1px solid #ddd;\">".concat(objectNames, "</td>");
                      table.appendChild(objectsRow);
                    }
                    container.parentNode.replaceChild(table, container);
                  } catch (error) {
                    // If JSON parsing fails, create a simple text block
                    var textBlock = document.createElement('div');
                    textBlock.style.cssText = 'padding: 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-family: monospace; white-space: pre-wrap; margin: 0.5em 0;';
                    textBlock.textContent = "TopoJSON Data:\n".concat(originalSource);
                    container.parentNode.replaceChild(textBlock, container);
                  }
                } else {
                  // No original source, replace with placeholder
                  var placeholder = document.createElement('div');
                  placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
                  placeholder.textContent = '[TopoJSON Map - Interactive content not available in copy]';
                  container.parentNode.replaceChild(placeholder, container);
                }
              });

              // Handle STL containers - convert canvas to image
              stlContainers = clone.querySelectorAll('.stl-container');
              _iterator11 = _createForOfIteratorHelper(stlContainers);
              _context17.prev = 141;
              _iterator11.s();
            case 143:
              if ((_step11 = _iterator11.n()).done) {
                _context17.next = 211;
                break;
              }
              _container = _step11.value;
              _context17.prev = 145;
              // Find the corresponding STL container in the original DOM by searching with proper escaping
              _originalSource = _container.getAttribute('data-original-source');
              if (_originalSource) {
                _context17.next = 150;
                break;
              }
              console.warn('No original source found for STL container');
              throw new Error('No original source');
            case 150:
              // Find original container more reliably
              _originalContainer = null;
              _allOriginalContainers = this.output.querySelectorAll('.stl-container');
              _iterator13 = _createForOfIteratorHelper(_allOriginalContainers);
              _context17.prev = 153;
              _iterator13.s();
            case 155:
              if ((_step13 = _iterator13.n()).done) {
                _context17.next = 162;
                break;
              }
              _candidate = _step13.value;
              if (!(_candidate.getAttribute('data-original-source') === _originalSource)) {
                _context17.next = 160;
                break;
              }
              _originalContainer = _candidate;
              return _context17.abrupt("break", 162);
            case 160:
              _context17.next = 155;
              break;
            case 162:
              _context17.next = 167;
              break;
            case 164:
              _context17.prev = 164;
              _context17.t10 = _context17["catch"](153);
              _iterator13.e(_context17.t10);
            case 167:
              _context17.prev = 167;
              _iterator13.f();
              return _context17.finish(167);
            case 170:
              if (!_originalContainer) {
                _context17.next = 195;
                break;
              }
              // Look for canvas element in the original container (Three.js WebGL canvas)
              canvas = _originalContainer.querySelector('canvas');
              if (!(canvas && canvas.width > 0 && canvas.height > 0)) {
                _context17.next = 192;
                break;
              }
              _context17.prev = 173;
              // Ensure the Three.js scene is rendered before capturing
              // The renderer should be accessible through the canvas or container
              renderer = canvas._threeRenderer || _originalContainer._threeRenderer;
              scene = _originalContainer._threeScene;
              camera = _originalContainer._threeCamera; // If we have access to the Three.js objects, render the scene
              if (renderer && scene && camera) {
                renderer.render(scene, camera);
              }

              // Create image from canvas with error handling for WebGL context
              _dataUrl = canvas.toDataURL('image/png', 1.0);
              _img = document.createElement('img');
              _img.src = _dataUrl;
              _img.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; margin: 0.5em 0;';
              _img.alt = 'STL 3D Model';

              // Replace the container with the image
              _container.parentNode.replaceChild(_img, _container);
              return _context17.abrupt("continue", 209);
            case 187:
              _context17.prev = 187;
              _context17.t11 = _context17["catch"](173);
              console.warn('Failed to convert STL canvas to image (likely WebGL context issue):', _context17.t11);
            case 190:
              _context17.next = 193;
              break;
            case 192:
              console.warn('No valid canvas found in STL container');
            case 193:
              _context17.next = 196;
              break;
            case 195:
              console.warn('Could not find original STL container');
            case 196:
              // Fallback to placeholder if canvas conversion fails
              _placeholder2 = document.createElement('div');
              _placeholder2.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              _placeholder2.textContent = '[STL 3D Model - Interactive content not available in copy]';
              _container.parentNode.replaceChild(_placeholder2, _container);
              _context17.next = 209;
              break;
            case 202:
              _context17.prev = 202;
              _context17.t12 = _context17["catch"](145);
              console.error('Error processing STL container for copy:', _context17.t12);
              // Fallback to placeholder
              _placeholder3 = document.createElement('div');
              _placeholder3.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              _placeholder3.textContent = '[STL 3D Model - Interactive content not available in copy]';
              _container.parentNode.replaceChild(_placeholder3, _container);
            case 209:
              _context17.next = 143;
              break;
            case 211:
              _context17.next = 216;
              break;
            case 213:
              _context17.prev = 213;
              _context17.t13 = _context17["catch"](141);
              _iterator11.e(_context17.t13);
            case 216:
              _context17.prev = 216;
              _iterator11.f();
              return _context17.finish(216);
            case 219:
              htmlContent = "\n          <html xmlns:v=\"urn:schemas-microsoft-com:vml\"\n                xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                xmlns:w=\"urn:schemas-microsoft-com:office:word\">\n            <head>\n              <meta charset=\"utf-8\">\n              <style>\n                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }\n                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }\n                th { background-color: #f0f0f0; font-weight: bold; }\n\n                /* Code block styling */\n                .hljs { display: block; overflow-x: auto; padding: 1em; }\n                .hljs-keyword { color: #0033B3; }\n                .hljs-string { color: #067D17; }\n                .hljs-comment { color: #8C8C8C; }\n                .hljs-function { color: #00627A; }\n                .hljs-number { color: #1750EB; }\n                .hljs-operator { color: #687687; }\n                .hljs-punctuation { color: #000000; }\n\n                /* Word-specific image handling */\n                img { display: block; max-width: none; }\n              </style>\n            </head>\n            <body>\n              ".concat(clone.innerHTML, "\n            </body>\n          </html>");
              platform = this.getPlatform();
              if (!(platform === 'macos')) {
                _context17.next = 233;
                break;
              }
              _context17.prev = 222;
              _context17.next = 225;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 225:
              _context17.next = 231;
              break;
            case 227:
              _context17.prev = 227;
              _context17.t14 = _context17["catch"](222);
              if (this.copyToClipboard(htmlContent)) {
                _context17.next = 231;
                break;
              }
              throw new Error('Fallback copy failed');
            case 231:
              _context17.next = 257;
              break;
            case 233:
              // Windows/Linux approach
              tempDiv = document.createElement('div');
              tempDiv.style.position = 'fixed';
              tempDiv.style.left = '-9999px';
              tempDiv.style.top = '0';
              tempDiv.innerHTML = htmlContent;
              document.body.appendChild(tempDiv);
              _context17.prev = 239;
              _context17.next = 242;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 242:
              _context17.next = 254;
              break;
            case 244:
              _context17.prev = 244;
              _context17.t15 = _context17["catch"](239);
              selection = window.getSelection();
              range = document.createRange();
              range.selectNodeContents(tempDiv);
              selection.removeAllRanges();
              selection.addRange(range);
              successful = document.execCommand('copy');
              if (successful) {
                _context17.next = 254;
                break;
              }
              throw new Error('Fallback copy failed');
            case 254:
              _context17.prev = 254;
              if (tempDiv && tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }
              return _context17.finish(254);
            case 257:
              copyButton.textContent = 'Copied!';
              _context17.next = 264;
              break;
            case 260:
              _context17.prev = 260;
              _context17.t16 = _context17["catch"](2);
              console.error('Copy HTML failed:', _context17.t16);
              copyButton.textContent = 'Copy failed';
            case 264:
              setTimeout(function () {
                copyButton.textContent = 'Copy Rendered';
              }, 2000);
            case 265:
            case "end":
              return _context17.stop();
          }
        }, _callee12, this, [[2, 260], [10, 19, 22, 25], [27, 38, 41, 44], [47, 58, 61, 64], [66, 132, 135, 138], [70, 121], [78, 89, 92, 95], [96, 109], [141, 213, 216, 219], [145, 202], [153, 164, 167, 170], [173, 187], [222, 227], [239, 244, 254, 257]]);
      }));
      function copyHTML() {
        return _copyHTML.apply(this, arguments);
      }
      return copyHTML;
    }()
    /**
     * Converts an SVG element to a PNG blob.
     * 
     * @param {SVGElement} svgElement - The SVG element to convert
     * @returns {Promise<Blob>} A promise that resolves with the PNG blob
     */
    )
  }, {
    key: "svgToPng",
    value: function svgToPng(svgElement) {
      return new Promise(function (resolve, reject) {
        var svgString = new XMLSerializer().serializeToString(svgElement);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        var scale = 2;

        // Check if this is a Mermaid-generated SVG (they don't have explicit width/height attributes)
        var isMermaidSvg = svgElement.closest('.mermaid') || svgElement.classList.contains('mermaid');
        var hasExplicitDimensions = svgElement.getAttribute('width') && svgElement.getAttribute('height');
        var svgWidth, svgHeight;
        if (isMermaidSvg || !hasExplicitDimensions) {
          // For Mermaid or other generated SVGs, prioritize computed dimensions
          svgWidth = svgElement.clientWidth || svgElement.viewBox && svgElement.viewBox.baseVal.width || parseFloat(svgElement.getAttribute('width')) || 400;
          svgHeight = svgElement.clientHeight || svgElement.viewBox && svgElement.viewBox.baseVal.height || parseFloat(svgElement.getAttribute('height')) || 300;
        } else {
          // For explicit SVGs (like fenced SVG blocks), prioritize explicit attributes
          svgWidth = parseFloat(svgElement.getAttribute('width')) || svgElement.viewBox && svgElement.viewBox.baseVal.width || svgElement.clientWidth || 400;
          svgHeight = parseFloat(svgElement.getAttribute('height')) || svgElement.viewBox && svgElement.viewBox.baseVal.height || svgElement.clientHeight || 300;
        }

        // Ensure the SVG string has explicit dimensions by modifying it if necessary
        var modifiedSvgString = svgString;
        if (svgWidth && svgHeight) {
          // Create a temporary SVG element to modify the serialized string
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = svgString;
          var tempSvg = tempDiv.querySelector('svg');
          if (tempSvg) {
            tempSvg.setAttribute('width', svgWidth.toString());
            tempSvg.setAttribute('height', svgHeight.toString());
            modifiedSvgString = new XMLSerializer().serializeToString(tempSvg);
          }
        }
        canvas.width = svgWidth * scale;
        canvas.height = svgHeight * scale;
        ctx.scale(scale, scale);
        img.onload = function () {
          try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
            canvas.toBlob(function (blob) {
              resolve(blob);
            }, 'image/png', 1.0);
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = reject;
        var svgDataUrl = "data:image/svg+xml;charset=utf-8,".concat(encodeURIComponent(modifiedSvgString));
        img.src = svgDataUrl;
      });
    }

    /**
     * Shows or hides the control buttons.
     * 
     * @param {boolean} show - Whether to show the controls
     */
  }, {
    key: "controlsShow",
    value: function controlsShow(show) {
      this.controls.style.display = show ? '' : 'none';
      this.options.showControls = show;
      this.adjustLayout();

      // Emit controls visibility change event
      this.events.emit('controls:visibility', show);
    }

    /**
     * Shows or hides the title section.
     * 
     * @param {boolean} show - Whether to show the title
     */
  }, {
    key: "titleShow",
    value: function titleShow(show) {
      this.title.style.display = show ? '' : 'none';
      this.options.titleShow = show;
      this.adjustLayout();

      // Emit title visibility change event
      this.events.emit('title:visibility', show);
    }

    /**
     * Sets the content of the title section.
     * 
     * @param {string} content - The HTML content for the title
     */
  }, {
    key: "titleSetContent",
    value: function titleSetContent(content) {
      this.title.innerHTML = content;
      this.options.titleContent = content;

      // Emit title content change event
      this.events.emit('title:content', content);
    }

    /**
     * Gets the content of the title section.
     * 
     * @returns {string} The HTML content of the title
     */
  }, {
    key: "titleGetContent",
    value: function titleGetContent() {
      return this.title.innerHTML;
    }

    /**
     * Toggles between the different view modes (source, rendered, split).
     * Cycles through: source -> split -> rendered -> source.
     */
  }, {
    key: "toggleView",
    value: function toggleView() {
      if (this.currentView === 'src') {
        this.setView('split');
      } else if (this.currentView === 'split') {
        this.setView('html');
      } else {
        this.setView('src');
      }
    }

    /**
     * Copies text to clipboard using various fallback methods.
     * 
     * @param {string} string - The text to copy to the clipboard
     * @returns {boolean} Whether the copy operation was successful
     */
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(string) {
      var textarea;
      var result;
      try {
        textarea = document.createElement('textarea');
        textarea.setAttribute('readonly', true);
        textarea.setAttribute('contenteditable', true);
        textarea.style.position = 'fixed';
        textarea.style.left = '0';
        textarea.style.top = '0';
        textarea.style.opacity = '0';
        textarea.value = string;
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        var range = document.createRange();
        range.selectNodeContents(textarea);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        textarea.setSelectionRange(0, textarea.value.length);
        result = document.execCommand('copy');
      } catch (err) {
        console.error(err);
        result = null;
      } finally {
        if (textarea && textarea.parentNode) {
          document.body.removeChild(textarea);
        }
      }

      // manual copy fallback using prompt
      if (!result) {
        var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        var copyHotkey = isMac ? '⌘C' : 'CTRL+C';
        result = prompt("Press ".concat(copyHotkey), string);
        if (!result) {
          return false;
        }
      }
      return true;
    }

    /**
     * Converts a math element to a PNG blob using simple SVG-to-PNG conversion.
     * Based on the working approach from math-test.html
     * 
     * @param {HTMLElement} mathElement - The math element to convert
     * @returns {Promise<Blob>} A promise that resolves with the PNG blob
     */
  }, {
    key: "mathToPng",
    value: (function () {
      var _mathToPng = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(mathElement) {
        return _regeneratorRuntime().wrap(function _callee13$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  var svg = mathElement.querySelector('svg');
                  if (!svg) {
                    reject(new Error('No SVG found in math element'));
                    return;
                  }

                  // Serialize SVG to string
                  var serializer = new XMLSerializer();
                  var svgStr = serializer.serializeToString(svg);
                  var svgBlob = new Blob([svgStr], {
                    type: "image/svg+xml;charset=utf-8"
                  });
                  var url = URL.createObjectURL(svgBlob);
                  var img = new Image();
                  img.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = svg.width.baseVal.value;
                    canvas.height = svg.height.baseVal.value;
                    var ctx = canvas.getContext('2d');

                    // White background
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw the SVG image
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Clean up URL
                    URL.revokeObjectURL(url);

                    // Convert canvas to blob
                    canvas.toBlob(resolve, 'image/png');
                  };
                  img.onerror = function () {
                    URL.revokeObjectURL(url);
                    reject(new Error('Failed to load SVG image'));
                  };
                  img.src = url;
                } catch (error) {
                  reject(error);
                }
              }));
            case 1:
            case "end":
              return _context18.stop();
          }
        }, _callee13);
      }));
      function mathToPng(_x6) {
        return _mathToPng.apply(this, arguments);
      }
      return mathToPng;
    }()
    /**
     * Checks if MathJax 3 is available with the necessary APIs.
     * 
     * @returns {boolean} True if MathJax 3 is properly loaded
     * @private
     */
    )
  }, {
    key: "isMathJax3Available",
    value: function isMathJax3Available() {
      return typeof MathJax !== 'undefined' && typeof MathJax.typesetPromise === 'function' && (typeof MathJax.tex2svgPromise === 'function' ||
      // Allow test environment with basic MathJax mock
      typeof jest !== 'undefined' && MathJax.version);
    }

    /**
     * Converts CHTML MathJax output to PNG using html2canvas-like approach.
     * 
     * @param {HTMLElement} chtmlContainer - The CHTML MathJax container
     * @returns {Promise<Blob|null>} PNG blob if successful, null otherwise
     * @private
     */
  }, {
    key: "mathCHTMLToPng",
    value: (function () {
      var _mathCHTMLToPng = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(chtmlContainer) {
        var rect, padding, canvas, ctx, scale, canvasWidth, canvasHeight, foreignObject, svgBlob, url;
        return _regeneratorRuntime().wrap(function _callee14$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              // Get container bounds
              rect = chtmlContainer.getBoundingClientRect();
              if (!(rect.width === 0 || rect.height === 0)) {
                _context19.next = 5;
                break;
              }
              console.warn('CHTML container has zero dimensions');
              return _context19.abrupt("return", null);
            case 5:
              // Create canvas
              padding = 8;
              canvas = document.createElement('canvas');
              ctx = canvas.getContext('2d');
              scale = 2; // High DPI
              canvasWidth = rect.width + padding * 2;
              canvasHeight = rect.height + padding * 2;
              canvas.width = canvasWidth * scale;
              canvas.height = canvasHeight * scale;
              canvas.style.width = canvasWidth + 'px';
              canvas.style.height = canvasHeight + 'px';
              ctx.scale(scale, scale);

              // White background
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, canvasWidth, canvasHeight);

              // Convert CHTML to SVG for rendering
              foreignObject = "\n        <svg width=\"".concat(canvasWidth, "\" height=\"").concat(canvasHeight, "\" xmlns=\"http://www.w3.org/2000/svg\">\n          <foreignObject x=\"").concat(padding, "\" y=\"").concat(padding, "\" width=\"").concat(rect.width, "\" height=\"").concat(rect.height, "\">\n            <div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-size: 16px; font-family: 'Times New Roman', serif;\">\n              ").concat(chtmlContainer.outerHTML, "\n            </div>\n          </foreignObject>\n        </svg>\n      ");
              svgBlob = new Blob([foreignObject], {
                type: 'image/svg+xml;charset=utf-8'
              });
              url = URL.createObjectURL(svgBlob);
              return _context19.abrupt("return", new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = function () {
                  try {
                    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                    URL.revokeObjectURL(url);
                    canvas.toBlob(resolve, 'image/png');
                  } catch (error) {
                    URL.revokeObjectURL(url);
                    reject(error);
                  }
                };
                img.onerror = function () {
                  URL.revokeObjectURL(url);
                  reject(new Error('Failed to load CHTML as image'));
                };
                img.src = url;
              }));
            case 24:
              _context19.prev = 24;
              _context19.t0 = _context19["catch"](0);
              console.error('CHTML to PNG conversion failed:', _context19.t0);
              return _context19.abrupt("return", null);
            case 28:
            case "end":
              return _context19.stop();
          }
        }, _callee14, null, [[0, 24]]);
      }));
      function mathCHTMLToPng(_x7) {
        return _mathCHTMLToPng.apply(this, arguments);
      }
      return mathCHTMLToPng;
    }()
    /**
     * Detects the user's operating system platform.
     * 
     * @returns {string} The detected platform: 'macos', 'windows', 'linux', or 'unknown'
     */
    )
  }, {
    key: "getPlatform",
    value: function getPlatform() {
      var platform = navigator.platform.toLowerCase();
      var userAgent = navigator.userAgent.toLowerCase();
      if (platform.includes('mac') || userAgent.includes('mac')) {
        return 'macos';
      } else if (userAgent.includes('windows')) {
        return 'windows';
      } else if (userAgent.includes('linux')) {
        return 'linux';
      }
      return 'unknown';
    }

    /**
     * Example of how to use text selection features
     * This method demonstrates registering selection callbacks and manipulating selected text
     * 
     * @example
     * // Register a selection callback
     * const editor = new SquibView('#editor');
     * const unsubscribe = editor.onTextSelected(selectionData => {
     *   console.log(`Selected text: ${selectionData.text} in ${selectionData.panel} panel`);
     *   
     *   // Replace selection with bold text if in source panel
     *   if (selectionData.panel === 'source') {
     *     editor.replaceSelectedText(`**${selectionData.text}**`, selectionData);
     *   }
     *   
     *   // Make selection non-editable if in rendered panel
     *   if (selectionData.panel === 'rendered') {
     *     editor.setSelectionEditable(false, selectionData);
     *   }
     * });
     * 
     * // Later, to stop listening for selections:
     * unsubscribe();
     * 
     * // Get current selection manually (without callback)
     * const selection = editor.getCurrentSelection();
     * if (selection) {
     *   editor.replaceSelectedText('replacement text', selection);
     * }
     */
  }, {
    key: "demonstrateSelectionFeatures",
    value: function demonstrateSelectionFeatures() {
      // This is a documentation method only and doesn't need implementation
      console.log('See method documentation for usage examples');
    }

    /**
     * Creates a complete HTML page from a HTML snippet/div content.
     * 
     * @param {string} inputDivHTML - The HTML content to include in the page
     * @param {boolean} [editable=false] - Whether the content should be editable
     * @returns {string} A complete HTML page as a string
     */
  }, {
    key: "makeHTMLPageFromDiv",
    value: function makeHTMLPageFromDiv(inputDivHTML) {
      var editable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var editableAttr = editable ? 'contenteditable="true"' : '';
      var s = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Markdown Viewer with Graphics Support</title>\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css\">\n  <xscripx src=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js\"></xscripx>\n  <xscripx src=\"https://unpkg.com/mermaid/dist/mermaid.min.js\"></xscripx>\n  <style>\n      body {\n          font-family: Arial, sans-serif;\n          box-sizing: border-box;\n          padding: 20px;\n      }\n      .squibview-output {\n          width: 50%;\n          margin: auto;\n      }\n      pre {\n          background-color: #f4f4f4;\n          padding: 10px;\n          border-radius: 5px;\n          overflow-x: auto;\n      }\n      table {\n          width: 100%;\n          border-collapse: collapse;\n          margin: 20px 0;\n      }\n      table, th, td {\n          border: 1px solid black;\n      }\n      th, td {\n          padding: 8px;\n          text-align: left;\n      }\n  </style>\n</head>\n<body ".concat(editableAttr, ">\n  ").concat(inputDivHTML, "\n</body>\n</html>");
      // Replace the xscript placeholders with real script tags
      s = s.replaceAll("xscripx", "script");
      return s;
    }

    /**
     * Creates a RevealJS presentation page from markdown content.
     * Splits the markdown on '---' delimiters to create slides.
     * 
     * @param {string} markdown - The markdown content to convert to slides
     * @param {string} [title="Slide Presentation"] - The title for the presentation
     * @returns {string} A complete HTML page with RevealJS for presenting slides
     */
  }, {
    key: "makeRevealJSFullPage",
    value: function makeRevealJSFullPage(markdown) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Slide Presentation";
      return "<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n      <meta charset=\"utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>".concat(title, "</title>\n      <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css\">\n      <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css\">\n      <script src=\"https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js\"></script>\n  </head>\n  <body>\n      <div class=\"reveal\" contenteditable=\"true\">\n          <div class=\"slides\">\n              ").concat(markdown.split('---').map(function (slide) {
        return "<section data-markdown><script type=\"text/template\">".concat(slide.trim(), "</script></section>");
      }).join('\n'), "\n          </div>\n      </div>\n      <script src=\"https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js\"></script>\n      <script>\n          Reveal.initialize({\n              plugins: [ RevealMarkdown ]\n          });\n          \n          // Ensure Mermaid diagrams initialize correctly\n          document.addEventListener('DOMContentLoaded', () => {\n              mermaid.initialize({ startOnLoad: true , securityLevel: 'loose', theme: 'dark' });\n              document.querySelectorAll('.mermaid').forEach(el => {\n                  el.innerHTML = el.textContent;\n                  mermaid.init(undefined, el);\n              });\n          });\n      </script>\n  </body>\n  </html>");
    }

    /**
     * Converts CSV/TSV content to a markdown table.
     * 
     * @param {string} input - The CSV/TSV string to convert
     * @param {string} [delimiter=','] - The delimiter used in the input (comma, tab, etc.)
     * @returns {string} A markdown formatted table
     */
  }, {
    key: "csvOrTsvToMarkdownTable",
    value: function csvOrTsvToMarkdownTable(input) {
      var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
      // Parse CSV/TSV content
      var parsedData = Papa.parse(input, {
        delimiter: delimiter,
        skipEmptyLines: true
      });
      var rows = parsedData.data;
      if (rows.length === 0) return 'No data found.';

      // Markdown table header
      var header = "| ".concat(rows[0].join(' | '), " |");
      var separator = "| ".concat(rows[0].map(function () {
        return '---';
      }).join(' | '), " |");
      var tableRows = rows.slice(1).map(function (row) {
        return "| ".concat(row.join(' | '), " |");
      }).join('\n');
      return "".concat(header, "\n").concat(separator, "\n").concat(tableRows);
    }

    /**
     * Gets whether image tags are preserved in source view
     * @returns {boolean} Whether image tags are preserved
     */
  }, {
    key: "preserveImageTags",
    get: function get() {
      return this.options.preserveImageTags;
    }

    /**
     * Sets whether image tags should be preserved in source view
     * @param {boolean} value - Whether to preserve image tags
     */,
    set: function set(value) {
      this.options.preserveImageTags = value;
      // Re-render content to apply the new setting
      this.renderMarkdown();
    }

    /**
     * Fixes linefeeds in markdown by adding two spaces at the end of lines that are not already hard breaks, not empty, and not part of a list, heading, or code block.
     * @param {string} markdown - The markdown text to process
     * @returns {string} - The markdown text with fixed linefeeds
     */
  }, {
    key: "fixLinefeedsInMarkdown",
    value: function fixLinefeedsInMarkdown(markdown) {
      if (typeof markdown !== 'string') return markdown;
      var lines = markdown.split('\n');
      var inCodeBlock = false;
      return lines.map(function (line) {
        // Toggle code block state
        if (/^```/.test(line)) {
          inCodeBlock = !inCodeBlock;
          return line;
        }
        if (inCodeBlock) return line;
        // Skip headings, lists, blockquotes, tables, and empty lines
        if (/^\s*([#\-*>]|\d+\.|\|)/.test(line) || line.trim() === '') return line;
        // If line already ends with two or more spaces, or is just whitespace, skip
        if (/\s{2,}$/.test(line)) return line;
        // Otherwise, add two spaces
        return line + '  ';
      }).join('\n');
    }

    /**
     * Toggles the linefeed view state. When enabled, rendered HTML will have <br> at the end of lines that would otherwise be collapsed.
     */
  }, {
    key: "toggleLinefeedView",
    value: function toggleLinefeedView() {
      this.linefeedViewEnabled = !this.linefeedViewEnabled;
      this.renderOutput();
    }

    /**
     * Converts a DOM element to a data URL image.
     * @param {HTMLElement} element - The DOM element to convert
     * @returns {Promise<string>} A promise that resolves with the data URL
     */
  }, {
    key: "divToDataUrl",
    value: (function () {
      var _divToDataUrl = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(element) {
        var _this18 = this;
        return _regeneratorRuntime().wrap(function _callee15$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  // Get the element's dimensions
                  var rect = element.getBoundingClientRect();
                  var width = rect.width || 400;
                  var height = rect.height || 300;

                  // Special handling for Leaflet maps (GeoJSON containers)
                  if (element.classList.contains('geojson-container') || element.id && element.id.startsWith('map-')) {
                    // Try to access the Leaflet map instance
                    var mapId = element.id;
                    if (typeof window.L !== 'undefined' && mapId && window[mapId + '_map']) {
                      var map = window[mapId + '_map'];

                      // Use Leaflet's built-in screenshot functionality if available
                      if (map.getContainer) {
                        try {
                          // Create a canvas from the map container using html2canvas-like approach
                          var mapContainer = map.getContainer();
                          var mapRect = mapContainer.getBoundingClientRect();

                          // Create canvas and draw the map tiles
                          var _canvas = document.createElement('canvas');
                          _canvas.width = mapRect.width;
                          _canvas.height = mapRect.height;
                          var _ctx = _canvas.getContext('2d');

                          // White background
                          _ctx.fillStyle = 'white';
                          _ctx.fillRect(0, 0, _canvas.width, _canvas.height);

                          // Try to capture tile layers
                          var tileLayers = mapContainer.querySelectorAll('.leaflet-tile');
                          var tilesLoaded = 0;
                          var totalTiles = tileLayers.length;
                          if (totalTiles === 0) {
                            // No tiles, just return white canvas
                            var _dataUrl2 = _canvas.toDataURL('image/png', 1.0);
                            resolve(_dataUrl2);
                            return;
                          }

                          // Load and draw each tile
                          var _iterator14 = _createForOfIteratorHelper(tileLayers),
                            _step14;
                          try {
                            var _loop6 = function _loop6() {
                              var tile = _step14.value;
                              var img = new Image();
                              img.crossOrigin = 'anonymous';
                              img.onload = function () {
                                try {
                                  var tileRect = tile.getBoundingClientRect();
                                  var offsetX = tileRect.left - mapRect.left;
                                  var offsetY = tileRect.top - mapRect.top;
                                  _ctx.drawImage(img, offsetX, offsetY, tileRect.width, tileRect.height);
                                } catch (e) {
                                  console.warn('Failed to draw tile:', e);
                                }
                                tilesLoaded++;
                                if (tilesLoaded === totalTiles) {
                                  // All tiles loaded, now draw SVG overlays
                                  var svgElements = mapContainer.querySelectorAll('svg');
                                  var _iterator15 = _createForOfIteratorHelper(svgElements),
                                    _step15;
                                  try {
                                    var _loop7 = function _loop7() {
                                      var svg = _step15.value;
                                      if (svg.classList.contains('leaflet-attribution-flag')) return 1; // continue
                                      try {
                                        var svgRect = svg.getBoundingClientRect();
                                        var svgOffsetX = svgRect.left - mapRect.left;
                                        var svgOffsetY = svgRect.top - mapRect.top;

                                        // Convert SVG to image and draw it
                                        var svgData = new XMLSerializer().serializeToString(svg);
                                        var svgBlob = new Blob([svgData], {
                                          type: 'image/svg+xml;charset=utf-8'
                                        });
                                        var svgUrl = URL.createObjectURL(svgBlob);
                                        var svgImg = new Image();
                                        svgImg.onload = function () {
                                          _ctx.drawImage(svgImg, svgOffsetX, svgOffsetY);
                                          URL.revokeObjectURL(svgUrl);
                                        };
                                        svgImg.src = svgUrl;
                                      } catch (e) {
                                        console.warn('Failed to draw SVG overlay:', e);
                                      }
                                    };
                                    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                                      if (_loop7()) continue;
                                    }
                                  } catch (err) {
                                    _iterator15.e(err);
                                  } finally {
                                    _iterator15.f();
                                  }
                                  var _dataUrl3 = _canvas.toDataURL('image/png', 1.0);
                                  resolve(_dataUrl3);
                                }
                              };
                              img.onerror = function () {
                                tilesLoaded++;
                                if (tilesLoaded === totalTiles) {
                                  var _dataUrl4 = _canvas.toDataURL('image/png', 1.0);
                                  resolve(_dataUrl4);
                                }
                              };
                              img.src = tile.src;
                            };
                            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                              _loop6();
                            }
                          } catch (err) {
                            _iterator14.e(err);
                          } finally {
                            _iterator14.f();
                          }
                          return;
                        } catch (error) {
                          console.warn('Leaflet-specific approach failed:', error);
                        }
                      }
                    }
                  }

                  // First try to find existing canvas or SVG elements
                  var canvas = element.querySelector('canvas');
                  if (canvas && canvas.width > 0 && canvas.height > 0) {
                    try {
                      var _dataUrl5 = canvas.toDataURL('image/png', 1.0);
                      resolve(_dataUrl5);
                      return;
                    } catch (error) {
                      console.warn('Canvas toDataURL failed, trying SVG approach:', error);
                    }
                  }

                  // Try to find SVG elements
                  var svgs = element.querySelectorAll('svg');
                  if (svgs.length > 0) {
                    // Find the largest SVG (excluding small attribution icons)
                    var bestSvg = null;
                    var maxArea = 0;
                    var _iterator16 = _createForOfIteratorHelper(svgs),
                      _step16;
                    try {
                      for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                        var svg = _step16.value;
                        if (svg.classList.contains('leaflet-attribution-flag')) continue;
                        var svgWidth = svg.clientWidth || parseFloat(svg.getAttribute('width')) || 0;
                        var svgHeight = svg.clientHeight || parseFloat(svg.getAttribute('height')) || 0;
                        var area = svgWidth * svgHeight;
                        if (area > maxArea && area > 100) {
                          maxArea = area;
                          bestSvg = svg;
                        }
                      }
                    } catch (err) {
                      _iterator16.e(err);
                    } finally {
                      _iterator16.f();
                    }
                    if (bestSvg) {
                      try {
                        _this18.svgToPng(bestSvg).then(function (pngBlob) {
                          var reader = new FileReader();
                          reader.onloadend = function () {
                            return resolve(reader.result);
                          };
                          reader.readAsDataURL(pngBlob);
                        })["catch"](reject);
                        return;
                      } catch (error) {
                        console.warn('SVG conversion failed, trying simple approach:', error);
                      }
                    }
                  }

                  // Simple fallback: create a placeholder image
                  var fallbackCanvas = document.createElement('canvas');
                  fallbackCanvas.width = width;
                  fallbackCanvas.height = height;
                  var ctx = fallbackCanvas.getContext('2d');

                  // White background
                  ctx.fillStyle = 'white';
                  ctx.fillRect(0, 0, width, height);

                  // Draw simple text indicating content type
                  ctx.fillStyle = '#666';
                  ctx.font = '16px Arial';
                  ctx.textAlign = 'center';
                  ctx.fillText('GeoJSON Map', width / 2, height / 2);
                  ctx.fillText('(Interactive content)', width / 2, height / 2 + 20);
                  var dataUrl = fallbackCanvas.toDataURL('image/png', 1.0);
                  resolve(dataUrl);
                } catch (error) {
                  reject(error);
                }
              }));
            case 1:
            case "end":
              return _context20.stop();
          }
        }, _callee15);
      }));
      function divToDataUrl(_x8) {
        return _divToDataUrl.apply(this, arguments);
      }
      return divToDataUrl;
    }()
    /**
     * Initialize line numbers functionality
     * @private
     */
    )
  }, {
    key: "initializeLineNumbers",
    value: function initializeLineNumbers() {
      var _this19 = this;
      // Create line mirror for measuring line heights
      this.lineMirror = document.createElement('div');
      this.lineMirror.className = "".concat(this.options.baseClass, "-line-mirror");
      this.lineMirror.setAttribute('aria-hidden', 'true');
      this.container.appendChild(this.lineMirror);

      // Track last line count for optimization
      this.lastLineCount = 0;

      // Set up scroll synchronization
      this.setupLineNumberScrollSync();

      // Store bound handler for cleanup
      this._lineNumberInputHandler = function () {
        _this19.updateLineNumbersIfNeeded();
      };

      // Update line numbers on input
      this.input.addEventListener('input', this._lineNumberInputHandler);

      // Store bound resize handler for cleanup
      this._lineNumberResizeHandler = this.updateLineNumbersDebounced.bind(this);

      // Update on window resize
      window.addEventListener('resize', this._lineNumberResizeHandler);

      // Initial update
      this.updateLineNumbers();
    }

    /**
     * Cleanup line numbers functionality
     * @private
     */
  }, {
    key: "cleanupLineNumbers",
    value: function cleanupLineNumbers() {
      // Remove event listeners
      if (this._lineNumberInputHandler) {
        this.input.removeEventListener('input', this._lineNumberInputHandler);
        this._lineNumberInputHandler = null;
      }
      if (this._lineNumberResizeHandler) {
        window.removeEventListener('resize', this._lineNumberResizeHandler);
        this._lineNumberResizeHandler = null;
      }

      // Remove line mirror
      if (this.lineMirror && this.lineMirror.parentNode) {
        this.lineMirror.parentNode.removeChild(this.lineMirror);
      }

      // Clear references
      this.lineMirror = undefined;
      this.lineGutter = undefined;
      this.sourcePanel = undefined;
    }

    /**
     * Set up scroll synchronization between textarea and line gutter
     * @private
     */
  }, {
    key: "setupLineNumberScrollSync",
    value: function setupLineNumberScrollSync() {
      var _this20 = this;
      if (!this.lineGutter) return;
      this.input.addEventListener('scroll', function () {
        if (_this20.lineGutter) {
          _this20.lineGutter.scrollTop = _this20.input.scrollTop;
        }
      });
    }

    /**
     * Update line numbers if the line count has changed
     * @private
     */
  }, {
    key: "updateLineNumbersIfNeeded",
    value: function updateLineNumbersIfNeeded() {
      var newLineCount = (this.input.value.match(/\n/g) || []).length + 1;
      if (newLineCount !== this.lastLineCount) {
        this.lastLineCount = newLineCount;
        this.updateLineNumbersDebounced();
      }
    }
  }, {
    key: "updateLineNumbers",
    value:
    /**
     * Update the line numbers in the gutter
     * @private
     */
    function updateLineNumbers() {
      var _this21 = this;
      if (!this.options.showLineNumbers || !this.lineGutter) return;
      var lines = this.input.value.split('\n');
      var totalLines = lines.length;
      var minDigits = Math.max(this.options.lineNumberMinDigits, String(totalLines + this.options.lineNumberStart - 1).length);

      // Clear gutter
      this.lineGutter.innerHTML = '';

      // Sync mirror styles with textarea
      this.syncMirrorStyles();

      // Create line number elements
      lines.forEach(function (line, index) {
        var lineNum = _this21.options.lineNumberStart + index;
        var lineNumStr = String(lineNum).padStart(minDigits, '0');

        // Measure line height
        var lineHeight = _this21.measureLineHeight(line);

        // Create line number element
        var gutterLine = document.createElement('div');
        gutterLine.className = "".concat(_this21.options.baseClass, "-gutter-line");
        gutterLine.textContent = lineNumStr;
        gutterLine.style.height = lineHeight + 'px';
        gutterLine.style.lineHeight = lineHeight + 'px';
        _this21.lineGutter.appendChild(gutterLine);
      });
    }

    /**
     * Measure the height of a single line of text
     * @private
     * @param {string} lineContent - The content of the line
     * @returns {number} The height in pixels
     */
  }, {
    key: "measureLineHeight",
    value: function measureLineHeight(lineContent) {
      // Create temporary element in mirror
      var tempLine = document.createElement('div');
      tempLine.textContent = lineContent || "\xA0"; // nbsp for empty lines
      tempLine.style.wordBreak = 'break-all';
      tempLine.style.whiteSpace = 'pre-wrap';
      tempLine.style.overflow = 'hidden';
      this.lineMirror.appendChild(tempLine);
      var rect = tempLine.getBoundingClientRect();
      var height = Math.ceil(rect.height); // Round up to avoid sub-pixel issues
      this.lineMirror.removeChild(tempLine);
      return height;
    }

    /**
     * Sync the mirror div styles with the textarea
     * @private
     */
  }, {
    key: "syncMirrorStyles",
    value: function syncMirrorStyles() {
      var _this22 = this;
      var computed = window.getComputedStyle(this.input);
      var stylesToCopy = ['fontFamily', 'fontSize', 'lineHeight', 'letterSpacing', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'boxSizing', 'whiteSpace', 'wordWrap', 'wordBreak', 'overflowWrap'];
      stylesToCopy.forEach(function (prop) {
        _this22.lineMirror.style[prop] = computed[prop];
      });

      // Match textarea content width exactly
      this.lineMirror.style.width = this.input.clientWidth + 'px';
    }

    /**
     * Toggle line numbers on/off
     * @param {boolean} show - Whether to show line numbers
     */
  }, {
    key: "setLineNumbers",
    value: function setLineNumbers(show) {
      if (this.options.showLineNumbers === show) return;
      this.options.showLineNumbers = show;

      // Store current state
      var currentContent = this.getContent();
      var currentType = this.inputContentType;
      var currentView = this.currentView;

      // Clean up existing line numbers if any
      if (!show && this.lineMirror) {
        this.cleanupLineNumbers();
      }

      // Re-create structure
      this.createStructure();
      this.initializeEventHandlers();
      this.initializeResizeObserver();
      if (show) {
        this.initializeLineNumbers();
      }

      // Restore content and view
      this.setContent(currentContent, currentType, false);
      this.setView(currentView);

      // Update type buttons
      this.updateTypeButtons();
    }

    /**
     * Get the current line numbers state
     * @returns {boolean} Whether line numbers are shown
     */
  }, {
    key: "getLineNumbers",
    value: function getLineNumbers() {
      return this.options.showLineNumbers;
    }

    /**
     * Set the starting line number
     * @param {number} start - The starting line number
     */
  }, {
    key: "setLineNumberStart",
    value: function setLineNumberStart(start) {
      this.options.lineNumberStart = start;
      if (this.options.showLineNumbers) {
        this.updateLineNumbers();
      }
    }

    /**
     * Utility function to debounce function calls
     * @private
     * @param {Function} func - The function to debounce
     * @param {number} wait - The debounce delay in milliseconds
     * @returns {Function} The debounced function
     */
  }, {
    key: "debounce",
    value: function debounce(func, wait) {
      var timeout;
      return function executedFunction() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var later = function later() {
          clearTimeout(timeout);
          func.apply(void 0, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }]);
}(); // The React component wrapper has been moved to a separate file
// to avoid dependency issues when React is not available
// Export the main class
_defineProperty(SquibView, "defaultOptions", {
  initialContent: '',
  inputContentType: 'md',
  // 'md', 'html', 'reveal', 'csv' or 'tsv'
  showControls: true,
  titleShow: false,
  titleContent: '',
  initialView: 'split',
  baseClass: 'squibview',
  onReplaceSelectedText: null,
  preserveImageTags: true,
  // Changed default to true
  showLineNumbers: false,
  // Enable/disable line numbers
  lineNumberStart: 1,
  // Starting line number
  lineNumberMinDigits: 2,
  // Minimum digits (e.g., 01, 02)
  autoload_deps: null,
  // Default off, can be { all: true } or fine-grained control
  streamingMode: false,
  // Enable streaming-friendly error handling
  incompleteBlockPlaceholder: '⏳ Rendering...',
  // Placeholder for incomplete blocks
  renderErrorPlaceholder: '❌ Render error',
  // Placeholder for render errors
  errorHandling: null // Fine-grained error control
});
// Default CDN URLs for autoloading dependencies
_defineProperty(SquibView, "DEFAULT_CDN_URLS", {
  mermaid: {
    script: 'https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js'
  },
  hljs: {
    script: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
    css: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
  },
  mathjax: {
    script: 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js'
  },
  leaflet: {
    script: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    css: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  },
  three: {
    script: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
  },
  stlLoader: {
    script: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js'
  },
  orbitControls: {
    script: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'
  }
});
_defineProperty(SquibView, "version", {
  version: VERSION,
  url: REPO_URL
});

export { SquibView as default };
//# sourceMappingURL=squibview.esm-lean.js.map
