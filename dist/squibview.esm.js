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
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var tinyEmitter = {exports: {}};

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

tinyEmitter.exports = E;
tinyEmitter.exports.TinyEmitter = E;

var tinyEmitterExports = tinyEmitter.exports;
var TinyEmitter = /*@__PURE__*/getDefaultExportFromCjs(tinyEmitterExports);

var diffMatchPatch = {exports: {}};

/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (module) {
	/**
	 * @fileoverview Computes the difference between two texts to create a patch.
	 * Applies the patch onto another text, allowing for errors.
	 * @author fraser@google.com (Neil Fraser)
	 */

	/**
	 * Class containing the diff, match and patch methods.
	 * @constructor
	 */
	var diff_match_patch = function() {

	  // Defaults.
	  // Redefine these in your program to override the defaults.

	  // Number of seconds to map a diff before giving up (0 for infinity).
	  this.Diff_Timeout = 1.0;
	  // Cost of an empty edit operation in terms of edit characters.
	  this.Diff_EditCost = 4;
	  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
	  this.Match_Threshold = 0.5;
	  // How far to search for a match (0 = exact location, 1000+ = broad match).
	  // A match this many characters away from the expected location will add
	  // 1.0 to the score (0.0 is a perfect match).
	  this.Match_Distance = 1000;
	  // When deleting a large block of text (over ~64 characters), how close do
	  // the contents have to be to match the expected contents. (0.0 = perfection,
	  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
	  // end points of a delete need to match.
	  this.Patch_DeleteThreshold = 0.5;
	  // Chunk size for context length.
	  this.Patch_Margin = 4;

	  // The number of bits in an int.
	  this.Match_MaxBits = 32;
	};


	//  DIFF FUNCTIONS


	/**
	 * The data structure representing a diff is an array of tuples:
	 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
	 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
	 */
	var DIFF_DELETE = -1;
	var DIFF_INSERT = 1;
	var DIFF_EQUAL = 0;

	/**
	 * Class representing one diff tuple.
	 * ~Attempts to look like a two-element array (which is what this used to be).~
	 * Constructor returns an actual two-element array, to allow destructing @JackuB
	 * See https://github.com/JackuB/diff-match-patch/issues/14 for details
	 * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
	 * @param {string} text Text to be deleted, inserted, or retained.
	 * @constructor
	 */
	diff_match_patch.Diff = function(op, text) {
	  return [op, text];
	};

	/**
	 * Find the differences between two texts.  Simplifies the problem by stripping
	 * any common prefix or suffix off the texts before diffing.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
	 *     then don't run a line-level diff first to identify the changed areas.
	 *     Defaults to true, which does a faster, slightly less optimal diff.
	 * @param {number=} opt_deadline Optional time when the diff should be complete
	 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
	 *     instead.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
	    opt_deadline) {
	  // Set a deadline by which time the diff must be complete.
	  if (typeof opt_deadline == 'undefined') {
	    if (this.Diff_Timeout <= 0) {
	      opt_deadline = Number.MAX_VALUE;
	    } else {
	      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
	    }
	  }
	  var deadline = opt_deadline;

	  // Check for null inputs.
	  if (text1 == null || text2 == null) {
	    throw new Error('Null input. (diff_main)');
	  }

	  // Check for equality (speedup).
	  if (text1 == text2) {
	    if (text1) {
	      return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
	    }
	    return [];
	  }

	  if (typeof opt_checklines == 'undefined') {
	    opt_checklines = true;
	  }
	  var checklines = opt_checklines;

	  // Trim off common prefix (speedup).
	  var commonlength = this.diff_commonPrefix(text1, text2);
	  var commonprefix = text1.substring(0, commonlength);
	  text1 = text1.substring(commonlength);
	  text2 = text2.substring(commonlength);

	  // Trim off common suffix (speedup).
	  commonlength = this.diff_commonSuffix(text1, text2);
	  var commonsuffix = text1.substring(text1.length - commonlength);
	  text1 = text1.substring(0, text1.length - commonlength);
	  text2 = text2.substring(0, text2.length - commonlength);

	  // Compute the diff on the middle block.
	  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

	  // Restore the prefix and suffix.
	  if (commonprefix) {
	    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
	  }
	  if (commonsuffix) {
	    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
	  }
	  this.diff_cleanupMerge(diffs);
	  return diffs;
	};


	/**
	 * Find the differences between two texts.  Assumes that the texts do not
	 * have any common prefix or suffix.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {boolean} checklines Speedup flag.  If false, then don't run a
	 *     line-level diff first to identify the changed areas.
	 *     If true, then run a faster, slightly less optimal diff.
	 * @param {number} deadline Time when the diff should be complete by.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
	    deadline) {
	  var diffs;

	  if (!text1) {
	    // Just add some text (speedup).
	    return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
	  }

	  if (!text2) {
	    // Just delete some text (speedup).
	    return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
	  }

	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  var i = longtext.indexOf(shorttext);
	  if (i != -1) {
	    // Shorter text is inside the longer text (speedup).
	    diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)),
	             new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
	             new diff_match_patch.Diff(DIFF_INSERT,
	                 longtext.substring(i + shorttext.length))];
	    // Swap insertions for deletions if diff is reversed.
	    if (text1.length > text2.length) {
	      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
	    }
	    return diffs;
	  }

	  if (shorttext.length == 1) {
	    // Single character string.
	    // After the previous speedup, the character can't be an equality.
	    return [new diff_match_patch.Diff(DIFF_DELETE, text1),
	            new diff_match_patch.Diff(DIFF_INSERT, text2)];
	  }

	  // Check to see if the problem can be split in two.
	  var hm = this.diff_halfMatch_(text1, text2);
	  if (hm) {
	    // A half-match was found, sort out the return data.
	    var text1_a = hm[0];
	    var text1_b = hm[1];
	    var text2_a = hm[2];
	    var text2_b = hm[3];
	    var mid_common = hm[4];
	    // Send both pairs off for separate processing.
	    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
	    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
	    // Merge the results.
	    return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)],
	                          diffs_b);
	  }

	  if (checklines && text1.length > 100 && text2.length > 100) {
	    return this.diff_lineMode_(text1, text2, deadline);
	  }

	  return this.diff_bisect_(text1, text2, deadline);
	};


	/**
	 * Do a quick line-level diff on both strings, then rediff the parts for
	 * greater accuracy.
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} deadline Time when the diff should be complete by.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
	  // Scan the text on a line-by-line basis first.
	  var a = this.diff_linesToChars_(text1, text2);
	  text1 = a.chars1;
	  text2 = a.chars2;
	  var linearray = a.lineArray;

	  var diffs = this.diff_main(text1, text2, false, deadline);

	  // Convert the diff back to original text.
	  this.diff_charsToLines_(diffs, linearray);
	  // Eliminate freak matches (e.g. blank lines)
	  this.diff_cleanupSemantic(diffs);

	  // Rediff any replacement blocks, this time character-by-character.
	  // Add a dummy entry at the end.
	  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete >= 1 && count_insert >= 1) {
	          // Delete the offending records and add the merged ones.
	          diffs.splice(pointer - count_delete - count_insert,
	                       count_delete + count_insert);
	          pointer = pointer - count_delete - count_insert;
	          var subDiff =
	              this.diff_main(text_delete, text_insert, false, deadline);
	          for (var j = subDiff.length - 1; j >= 0; j--) {
	            diffs.splice(pointer, 0, subDiff[j]);
	          }
	          pointer = pointer + subDiff.length;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	    pointer++;
	  }
	  diffs.pop();  // Remove the dummy entry at the end.

	  return diffs;
	};


	/**
	 * Find the 'middle snake' of a diff, split the problem in two
	 * and return the recursively constructed diff.
	 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} deadline Time at which to bail if not yet complete.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  var max_d = Math.ceil((text1_length + text2_length) / 2);
	  var v_offset = max_d;
	  var v_length = 2 * max_d;
	  var v1 = new Array(v_length);
	  var v2 = new Array(v_length);
	  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
	  // integers and undefined.
	  for (var x = 0; x < v_length; x++) {
	    v1[x] = -1;
	    v2[x] = -1;
	  }
	  v1[v_offset + 1] = 0;
	  v2[v_offset + 1] = 0;
	  var delta = text1_length - text2_length;
	  // If the total number of characters is odd, then the front path will collide
	  // with the reverse path.
	  var front = (delta % 2 != 0);
	  // Offsets for start and end of k loop.
	  // Prevents mapping of space beyond the grid.
	  var k1start = 0;
	  var k1end = 0;
	  var k2start = 0;
	  var k2end = 0;
	  for (var d = 0; d < max_d; d++) {
	    // Bail out if deadline is reached.
	    if ((new Date()).getTime() > deadline) {
	      break;
	    }

	    // Walk the front path one step.
	    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
	      var k1_offset = v_offset + k1;
	      var x1;
	      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
	        x1 = v1[k1_offset + 1];
	      } else {
	        x1 = v1[k1_offset - 1] + 1;
	      }
	      var y1 = x1 - k1;
	      while (x1 < text1_length && y1 < text2_length &&
	             text1.charAt(x1) == text2.charAt(y1)) {
	        x1++;
	        y1++;
	      }
	      v1[k1_offset] = x1;
	      if (x1 > text1_length) {
	        // Ran off the right of the graph.
	        k1end += 2;
	      } else if (y1 > text2_length) {
	        // Ran off the bottom of the graph.
	        k1start += 2;
	      } else if (front) {
	        var k2_offset = v_offset + delta - k1;
	        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
	          // Mirror x2 onto top-left coordinate system.
	          var x2 = text1_length - v2[k2_offset];
	          if (x1 >= x2) {
	            // Overlap detected.
	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
	          }
	        }
	      }
	    }

	    // Walk the reverse path one step.
	    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
	      var k2_offset = v_offset + k2;
	      var x2;
	      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
	        x2 = v2[k2_offset + 1];
	      } else {
	        x2 = v2[k2_offset - 1] + 1;
	      }
	      var y2 = x2 - k2;
	      while (x2 < text1_length && y2 < text2_length &&
	             text1.charAt(text1_length - x2 - 1) ==
	             text2.charAt(text2_length - y2 - 1)) {
	        x2++;
	        y2++;
	      }
	      v2[k2_offset] = x2;
	      if (x2 > text1_length) {
	        // Ran off the left of the graph.
	        k2end += 2;
	      } else if (y2 > text2_length) {
	        // Ran off the top of the graph.
	        k2start += 2;
	      } else if (!front) {
	        var k1_offset = v_offset + delta - k2;
	        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
	          var x1 = v1[k1_offset];
	          var y1 = v_offset + x1 - k1_offset;
	          // Mirror x2 onto top-left coordinate system.
	          x2 = text1_length - x2;
	          if (x1 >= x2) {
	            // Overlap detected.
	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
	          }
	        }
	      }
	    }
	  }
	  // Diff took too long and hit the deadline or
	  // number of diffs equals number of characters, no commonality at all.
	  return [new diff_match_patch.Diff(DIFF_DELETE, text1),
	          new diff_match_patch.Diff(DIFF_INSERT, text2)];
	};


	/**
	 * Given the location of the 'middle snake', split the diff in two parts
	 * and recurse.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} x Index of split point in text1.
	 * @param {number} y Index of split point in text2.
	 * @param {number} deadline Time at which to bail if not yet complete.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
	    deadline) {
	  var text1a = text1.substring(0, x);
	  var text2a = text2.substring(0, y);
	  var text1b = text1.substring(x);
	  var text2b = text2.substring(y);

	  // Compute both diffs serially.
	  var diffs = this.diff_main(text1a, text2a, false, deadline);
	  var diffsb = this.diff_main(text1b, text2b, false, deadline);

	  return diffs.concat(diffsb);
	};


	/**
	 * Split two texts into an array of strings.  Reduce the texts to a string of
	 * hashes where each Unicode character represents one line.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
	 *     An object containing the encoded text1, the encoded text2 and
	 *     the array of unique strings.
	 *     The zeroth element of the array of unique strings is intentionally blank.
	 * @private
	 */
	diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
	  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
	  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

	  // '\x00' is a valid character, but various debuggers don't like it.
	  // So we'll insert a junk entry to avoid generating a null character.
	  lineArray[0] = '';

	  /**
	   * Split a text into an array of strings.  Reduce the texts to a string of
	   * hashes where each Unicode character represents one line.
	   * Modifies linearray and linehash through being a closure.
	   * @param {string} text String to encode.
	   * @return {string} Encoded string.
	   * @private
	   */
	  function diff_linesToCharsMunge_(text) {
	    var chars = '';
	    // Walk the text, pulling out a substring for each line.
	    // text.split('\n') would would temporarily double our memory footprint.
	    // Modifying text would create many large strings to garbage collect.
	    var lineStart = 0;
	    var lineEnd = -1;
	    // Keeping our own length variable is faster than looking it up.
	    var lineArrayLength = lineArray.length;
	    while (lineEnd < text.length - 1) {
	      lineEnd = text.indexOf('\n', lineStart);
	      if (lineEnd == -1) {
	        lineEnd = text.length - 1;
	      }
	      var line = text.substring(lineStart, lineEnd + 1);

	      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
	          (lineHash[line] !== undefined)) {
	        chars += String.fromCharCode(lineHash[line]);
	      } else {
	        if (lineArrayLength == maxLines) {
	          // Bail out at 65535 because
	          // String.fromCharCode(65536) == String.fromCharCode(0)
	          line = text.substring(lineStart);
	          lineEnd = text.length;
	        }
	        chars += String.fromCharCode(lineArrayLength);
	        lineHash[line] = lineArrayLength;
	        lineArray[lineArrayLength++] = line;
	      }
	      lineStart = lineEnd + 1;
	    }
	    return chars;
	  }
	  // Allocate 2/3rds of the space for text1, the rest for text2.
	  var maxLines = 40000;
	  var chars1 = diff_linesToCharsMunge_(text1);
	  maxLines = 65535;
	  var chars2 = diff_linesToCharsMunge_(text2);
	  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
	};


	/**
	 * Rehydrate the text in a diff from a string of line hashes to real lines of
	 * text.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @param {!Array.<string>} lineArray Array of unique strings.
	 * @private
	 */
	diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
	  for (var i = 0; i < diffs.length; i++) {
	    var chars = diffs[i][1];
	    var text = [];
	    for (var j = 0; j < chars.length; j++) {
	      text[j] = lineArray[chars.charCodeAt(j)];
	    }
	    diffs[i][1] = text.join('');
	  }
	};


	/**
	 * Determine the common prefix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the start of each
	 *     string.
	 */
	diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerstart = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(pointerstart, pointermid) ==
	        text2.substring(pointerstart, pointermid)) {
	      pointermin = pointermid;
	      pointerstart = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};


	/**
	 * Determine the common suffix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of each string.
	 */
	diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 ||
	      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: https://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerend = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
	        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
	      pointermin = pointermid;
	      pointerend = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};


	/**
	 * Determine if the suffix of one string is the prefix of another.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of the first
	 *     string and the start of the second string.
	 * @private
	 */
	diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  // Eliminate the null case.
	  if (text1_length == 0 || text2_length == 0) {
	    return 0;
	  }
	  // Truncate the longer string.
	  if (text1_length > text2_length) {
	    text1 = text1.substring(text1_length - text2_length);
	  } else if (text1_length < text2_length) {
	    text2 = text2.substring(0, text1_length);
	  }
	  var text_length = Math.min(text1_length, text2_length);
	  // Quick check for the worst case.
	  if (text1 == text2) {
	    return text_length;
	  }

	  // Start by looking for a single character match
	  // and increase length until no match is found.
	  // Performance analysis: https://neil.fraser.name/news/2010/11/04/
	  var best = 0;
	  var length = 1;
	  while (true) {
	    var pattern = text1.substring(text_length - length);
	    var found = text2.indexOf(pattern);
	    if (found == -1) {
	      return best;
	    }
	    length += found;
	    if (found == 0 || text1.substring(text_length - length) ==
	        text2.substring(0, length)) {
	      best = length;
	      length++;
	    }
	  }
	};


	/**
	 * Do the two texts share a substring which is at least half the length of the
	 * longer text?
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {Array.<string>} Five element Array, containing the prefix of
	 *     text1, the suffix of text1, the prefix of text2, the suffix of
	 *     text2 and the common middle.  Or null if there was no match.
	 * @private
	 */
	diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
	  if (this.Diff_Timeout <= 0) {
	    // Don't risk returning a non-optimal diff if we have unlimited time.
	    return null;
	  }
	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
	    return null;  // Pointless.
	  }
	  var dmp = this;  // 'this' becomes 'window' in a closure.

	  /**
	   * Does a substring of shorttext exist within longtext such that the substring
	   * is at least half the length of longtext?
	   * Closure, but does not reference any external variables.
	   * @param {string} longtext Longer string.
	   * @param {string} shorttext Shorter string.
	   * @param {number} i Start index of quarter length substring within longtext.
	   * @return {Array.<string>} Five element Array, containing the prefix of
	   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
	   *     of shorttext and the common middle.  Or null if there was no match.
	   * @private
	   */
	  function diff_halfMatchI_(longtext, shorttext, i) {
	    // Start with a 1/4 length substring at position i as a seed.
	    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
	    var j = -1;
	    var best_common = '';
	    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
	    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
	      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
	                                               shorttext.substring(j));
	      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
	                                               shorttext.substring(0, j));
	      if (best_common.length < suffixLength + prefixLength) {
	        best_common = shorttext.substring(j - suffixLength, j) +
	            shorttext.substring(j, j + prefixLength);
	        best_longtext_a = longtext.substring(0, i - suffixLength);
	        best_longtext_b = longtext.substring(i + prefixLength);
	        best_shorttext_a = shorttext.substring(0, j - suffixLength);
	        best_shorttext_b = shorttext.substring(j + prefixLength);
	      }
	    }
	    if (best_common.length * 2 >= longtext.length) {
	      return [best_longtext_a, best_longtext_b,
	              best_shorttext_a, best_shorttext_b, best_common];
	    } else {
	      return null;
	    }
	  }

	  // First check if the second quarter is the seed for a half-match.
	  var hm1 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 4));
	  // Check again based on the third quarter.
	  var hm2 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 2));
	  var hm;
	  if (!hm1 && !hm2) {
	    return null;
	  } else if (!hm2) {
	    hm = hm1;
	  } else if (!hm1) {
	    hm = hm2;
	  } else {
	    // Both matched.  Select the longest.
	    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
	  }

	  // A half-match was found, sort out the return data.
	  var text1_a, text1_b, text2_a, text2_b;
	  if (text1.length > text2.length) {
	    text1_a = hm[0];
	    text1_b = hm[1];
	    text2_a = hm[2];
	    text2_b = hm[3];
	  } else {
	    text2_a = hm[0];
	    text2_b = hm[1];
	    text1_a = hm[2];
	    text1_b = hm[3];
	  }
	  var mid_common = hm[4];
	  return [text1_a, text1_b, text2_a, text2_b, mid_common];
	};


	/**
	 * Reduce the number of edits by eliminating semantically trivial equalities.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
	  var changes = false;
	  var equalities = [];  // Stack of indices where equalities are found.
	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
	  /** @type {?string} */
	  var lastEquality = null;
	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
	  var pointer = 0;  // Index of current position.
	  // Number of characters that changed prior to the equality.
	  var length_insertions1 = 0;
	  var length_deletions1 = 0;
	  // Number of characters that changed after the equality.
	  var length_insertions2 = 0;
	  var length_deletions2 = 0;
	  while (pointer < diffs.length) {
	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
	      equalities[equalitiesLength++] = pointer;
	      length_insertions1 = length_insertions2;
	      length_deletions1 = length_deletions2;
	      length_insertions2 = 0;
	      length_deletions2 = 0;
	      lastEquality = diffs[pointer][1];
	    } else {  // An insertion or deletion.
	      if (diffs[pointer][0] == DIFF_INSERT) {
	        length_insertions2 += diffs[pointer][1].length;
	      } else {
	        length_deletions2 += diffs[pointer][1].length;
	      }
	      // Eliminate an equality that is smaller or equal to the edits on both
	      // sides of it.
	      if (lastEquality && (lastEquality.length <=
	          Math.max(length_insertions1, length_deletions1)) &&
	          (lastEquality.length <= Math.max(length_insertions2,
	                                           length_deletions2))) {
	        // Duplicate record.
	        diffs.splice(equalities[equalitiesLength - 1], 0,
	                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
	        // Change second copy to insert.
	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
	        // Throw away the equality we just deleted.
	        equalitiesLength--;
	        // Throw away the previous equality (it needs to be reevaluated).
	        equalitiesLength--;
	        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
	        length_insertions1 = 0;  // Reset the counters.
	        length_deletions1 = 0;
	        length_insertions2 = 0;
	        length_deletions2 = 0;
	        lastEquality = null;
	        changes = true;
	      }
	    }
	    pointer++;
	  }

	  // Normalize the diff.
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	  this.diff_cleanupSemanticLossless(diffs);

	  // Find any overlaps between deletions and insertions.
	  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
	  //   -> <del>abc</del>xxx<ins>def</ins>
	  // e.g: <del>xxxabc</del><ins>defxxx</ins>
	  //   -> <ins>def</ins>xxx<del>abc</del>
	  // Only extract an overlap if it is as big as the edit ahead or behind it.
	  pointer = 1;
	  while (pointer < diffs.length) {
	    if (diffs[pointer - 1][0] == DIFF_DELETE &&
	        diffs[pointer][0] == DIFF_INSERT) {
	      var deletion = diffs[pointer - 1][1];
	      var insertion = diffs[pointer][1];
	      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
	      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
	      if (overlap_length1 >= overlap_length2) {
	        if (overlap_length1 >= deletion.length / 2 ||
	            overlap_length1 >= insertion.length / 2) {
	          // Overlap found.  Insert an equality and trim the surrounding edits.
	          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
	              insertion.substring(0, overlap_length1)));
	          diffs[pointer - 1][1] =
	              deletion.substring(0, deletion.length - overlap_length1);
	          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
	          pointer++;
	        }
	      } else {
	        if (overlap_length2 >= deletion.length / 2 ||
	            overlap_length2 >= insertion.length / 2) {
	          // Reverse overlap found.
	          // Insert an equality and swap and trim the surrounding edits.
	          diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL,
	              deletion.substring(0, overlap_length2)));
	          diffs[pointer - 1][0] = DIFF_INSERT;
	          diffs[pointer - 1][1] =
	              insertion.substring(0, insertion.length - overlap_length2);
	          diffs[pointer + 1][0] = DIFF_DELETE;
	          diffs[pointer + 1][1] =
	              deletion.substring(overlap_length2);
	          pointer++;
	        }
	      }
	      pointer++;
	    }
	    pointer++;
	  }
	};


	/**
	 * Look for single edits surrounded on both sides by equalities
	 * which can be shifted sideways to align the edit to a word boundary.
	 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
	  /**
	   * Given two strings, compute a score representing whether the internal
	   * boundary falls on logical boundaries.
	   * Scores range from 6 (best) to 0 (worst).
	   * Closure, but does not reference any external variables.
	   * @param {string} one First string.
	   * @param {string} two Second string.
	   * @return {number} The score.
	   * @private
	   */
	  function diff_cleanupSemanticScore_(one, two) {
	    if (!one || !two) {
	      // Edges are the best.
	      return 6;
	    }

	    // Each port of this function behaves slightly differently due to
	    // subtle differences in each language's definition of things like
	    // 'whitespace'.  Since this function's purpose is largely cosmetic,
	    // the choice has been made to use each language's native features
	    // rather than force total conformity.
	    var char1 = one.charAt(one.length - 1);
	    var char2 = two.charAt(0);
	    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
	    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
	    var whitespace1 = nonAlphaNumeric1 &&
	        char1.match(diff_match_patch.whitespaceRegex_);
	    var whitespace2 = nonAlphaNumeric2 &&
	        char2.match(diff_match_patch.whitespaceRegex_);
	    var lineBreak1 = whitespace1 &&
	        char1.match(diff_match_patch.linebreakRegex_);
	    var lineBreak2 = whitespace2 &&
	        char2.match(diff_match_patch.linebreakRegex_);
	    var blankLine1 = lineBreak1 &&
	        one.match(diff_match_patch.blanklineEndRegex_);
	    var blankLine2 = lineBreak2 &&
	        two.match(diff_match_patch.blanklineStartRegex_);

	    if (blankLine1 || blankLine2) {
	      // Five points for blank lines.
	      return 5;
	    } else if (lineBreak1 || lineBreak2) {
	      // Four points for line breaks.
	      return 4;
	    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
	      // Three points for end of sentences.
	      return 3;
	    } else if (whitespace1 || whitespace2) {
	      // Two points for whitespace.
	      return 2;
	    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
	      // One point for non-alphanumeric.
	      return 1;
	    }
	    return 0;
	  }

	  var pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      var equality1 = diffs[pointer - 1][1];
	      var edit = diffs[pointer][1];
	      var equality2 = diffs[pointer + 1][1];

	      // First, shift the edit as far left as possible.
	      var commonOffset = this.diff_commonSuffix(equality1, edit);
	      if (commonOffset) {
	        var commonString = edit.substring(edit.length - commonOffset);
	        equality1 = equality1.substring(0, equality1.length - commonOffset);
	        edit = commonString + edit.substring(0, edit.length - commonOffset);
	        equality2 = commonString + equality2;
	      }

	      // Second, step character by character right, looking for the best fit.
	      var bestEquality1 = equality1;
	      var bestEdit = edit;
	      var bestEquality2 = equality2;
	      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
	          diff_cleanupSemanticScore_(edit, equality2);
	      while (edit.charAt(0) === equality2.charAt(0)) {
	        equality1 += edit.charAt(0);
	        edit = edit.substring(1) + equality2.charAt(0);
	        equality2 = equality2.substring(1);
	        var score = diff_cleanupSemanticScore_(equality1, edit) +
	            diff_cleanupSemanticScore_(edit, equality2);
	        // The >= encourages trailing rather than leading whitespace on edits.
	        if (score >= bestScore) {
	          bestScore = score;
	          bestEquality1 = equality1;
	          bestEdit = edit;
	          bestEquality2 = equality2;
	        }
	      }

	      if (diffs[pointer - 1][1] != bestEquality1) {
	        // We have an improvement, save it back to the diff.
	        if (bestEquality1) {
	          diffs[pointer - 1][1] = bestEquality1;
	        } else {
	          diffs.splice(pointer - 1, 1);
	          pointer--;
	        }
	        diffs[pointer][1] = bestEdit;
	        if (bestEquality2) {
	          diffs[pointer + 1][1] = bestEquality2;
	        } else {
	          diffs.splice(pointer + 1, 1);
	          pointer--;
	        }
	      }
	    }
	    pointer++;
	  }
	};

	// Define some regex patterns for matching boundaries.
	diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
	diff_match_patch.whitespaceRegex_ = /\s/;
	diff_match_patch.linebreakRegex_ = /[\r\n]/;
	diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
	diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

	/**
	 * Reduce the number of edits by eliminating operationally trivial equalities.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
	  var changes = false;
	  var equalities = [];  // Stack of indices where equalities are found.
	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
	  /** @type {?string} */
	  var lastEquality = null;
	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
	  var pointer = 0;  // Index of current position.
	  // Is there an insertion operation before the last equality.
	  var pre_ins = false;
	  // Is there a deletion operation before the last equality.
	  var pre_del = false;
	  // Is there an insertion operation after the last equality.
	  var post_ins = false;
	  // Is there a deletion operation after the last equality.
	  var post_del = false;
	  while (pointer < diffs.length) {
	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
	      if (diffs[pointer][1].length < this.Diff_EditCost &&
	          (post_ins || post_del)) {
	        // Candidate found.
	        equalities[equalitiesLength++] = pointer;
	        pre_ins = post_ins;
	        pre_del = post_del;
	        lastEquality = diffs[pointer][1];
	      } else {
	        // Not a candidate, and can never become one.
	        equalitiesLength = 0;
	        lastEquality = null;
	      }
	      post_ins = post_del = false;
	    } else {  // An insertion or deletion.
	      if (diffs[pointer][0] == DIFF_DELETE) {
	        post_del = true;
	      } else {
	        post_ins = true;
	      }
	      /*
	       * Five types to be split:
	       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
	       * <ins>A</ins>X<ins>C</ins><del>D</del>
	       * <ins>A</ins><del>B</del>X<ins>C</ins>
	       * <ins>A</del>X<ins>C</ins><del>D</del>
	       * <ins>A</ins><del>B</del>X<del>C</del>
	       */
	      if (lastEquality && ((pre_ins && pre_del && post_ins && post_del) ||
	                           ((lastEquality.length < this.Diff_EditCost / 2) &&
	                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
	        // Duplicate record.
	        diffs.splice(equalities[equalitiesLength - 1], 0,
	                     new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
	        // Change second copy to insert.
	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
	        equalitiesLength--;  // Throw away the equality we just deleted;
	        lastEquality = null;
	        if (pre_ins && pre_del) {
	          // No changes made which could affect previous entry, keep going.
	          post_ins = post_del = true;
	          equalitiesLength = 0;
	        } else {
	          equalitiesLength--;  // Throw away the previous equality.
	          pointer = equalitiesLength > 0 ?
	              equalities[equalitiesLength - 1] : -1;
	          post_ins = post_del = false;
	        }
	        changes = true;
	      }
	    }
	    pointer++;
	  }

	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	};


	/**
	 * Reorder and merge like edit sections.  Merge equalities.
	 * Any edit section can move as long as it doesn't cross an equality.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
	  // Add a dummy entry at the end.
	  diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  var commonlength;
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete + count_insert > 1) {
	          if (count_delete !== 0 && count_insert !== 0) {
	            // Factor out any common prefixies.
	            commonlength = this.diff_commonPrefix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              if ((pointer - count_delete - count_insert) > 0 &&
	                  diffs[pointer - count_delete - count_insert - 1][0] ==
	                  DIFF_EQUAL) {
	                diffs[pointer - count_delete - count_insert - 1][1] +=
	                    text_insert.substring(0, commonlength);
	              } else {
	                diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL,
	                    text_insert.substring(0, commonlength)));
	                pointer++;
	              }
	              text_insert = text_insert.substring(commonlength);
	              text_delete = text_delete.substring(commonlength);
	            }
	            // Factor out any common suffixies.
	            commonlength = this.diff_commonSuffix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              diffs[pointer][1] = text_insert.substring(text_insert.length -
	                  commonlength) + diffs[pointer][1];
	              text_insert = text_insert.substring(0, text_insert.length -
	                  commonlength);
	              text_delete = text_delete.substring(0, text_delete.length -
	                  commonlength);
	            }
	          }
	          // Delete the offending records and add the merged ones.
	          pointer -= count_delete + count_insert;
	          diffs.splice(pointer, count_delete + count_insert);
	          if (text_delete.length) {
	            diffs.splice(pointer, 0,
	                new diff_match_patch.Diff(DIFF_DELETE, text_delete));
	            pointer++;
	          }
	          if (text_insert.length) {
	            diffs.splice(pointer, 0,
	                new diff_match_patch.Diff(DIFF_INSERT, text_insert));
	            pointer++;
	          }
	          pointer++;
	        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
	          // Merge this equality with the previous one.
	          diffs[pointer - 1][1] += diffs[pointer][1];
	          diffs.splice(pointer, 1);
	        } else {
	          pointer++;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	  }
	  if (diffs[diffs.length - 1][1] === '') {
	    diffs.pop();  // Remove the dummy entry at the end.
	  }

	  // Second pass: look for single edits surrounded on both sides by equalities
	  // which can be shifted sideways to eliminate an equality.
	  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
	  var changes = false;
	  pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      if (diffs[pointer][1].substring(diffs[pointer][1].length -
	          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
	        // Shift the edit over the previous equality.
	        diffs[pointer][1] = diffs[pointer - 1][1] +
	            diffs[pointer][1].substring(0, diffs[pointer][1].length -
	                                        diffs[pointer - 1][1].length);
	        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
	        diffs.splice(pointer - 1, 1);
	        changes = true;
	      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
	          diffs[pointer + 1][1]) {
	        // Shift the edit over the next equality.
	        diffs[pointer - 1][1] += diffs[pointer + 1][1];
	        diffs[pointer][1] =
	            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
	            diffs[pointer + 1][1];
	        diffs.splice(pointer + 1, 1);
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	  // If shifts were made, the diff needs reordering and another shift sweep.
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	};


	/**
	 * loc is a location in text1, compute and return the equivalent location in
	 * text2.
	 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @param {number} loc Location within text1.
	 * @return {number} Location within text2.
	 */
	diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
	  var chars1 = 0;
	  var chars2 = 0;
	  var last_chars1 = 0;
	  var last_chars2 = 0;
	  var x;
	  for (x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
	      chars1 += diffs[x][1].length;
	    }
	    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
	      chars2 += diffs[x][1].length;
	    }
	    if (chars1 > loc) {  // Overshot the location.
	      break;
	    }
	    last_chars1 = chars1;
	    last_chars2 = chars2;
	  }
	  // Was the location was deleted?
	  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
	    return last_chars2;
	  }
	  // Add the remaining character length.
	  return last_chars2 + (loc - last_chars1);
	};


	/**
	 * Convert a diff array into a pretty HTML report.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} HTML representation.
	 */
	diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
	  var html = [];
	  var pattern_amp = /&/g;
	  var pattern_lt = /</g;
	  var pattern_gt = />/g;
	  var pattern_para = /\n/g;
	  for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];    // Operation (insert, delete, equal)
	    var data = diffs[x][1];  // Text of change.
	    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
	        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
	    switch (op) {
	      case DIFF_INSERT:
	        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
	        break;
	      case DIFF_DELETE:
	        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
	        break;
	      case DIFF_EQUAL:
	        html[x] = '<span>' + text + '</span>';
	        break;
	    }
	  }
	  return html.join('');
	};


	/**
	 * Compute and return the source text (all equalities and deletions).
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Source text.
	 */
	diff_match_patch.prototype.diff_text1 = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_INSERT) {
	      text[x] = diffs[x][1];
	    }
	  }
	  return text.join('');
	};


	/**
	 * Compute and return the destination text (all equalities and insertions).
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Destination text.
	 */
	diff_match_patch.prototype.diff_text2 = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_DELETE) {
	      text[x] = diffs[x][1];
	    }
	  }
	  return text.join('');
	};


	/**
	 * Compute the Levenshtein distance; the number of inserted, deleted or
	 * substituted characters.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {number} Number of changes.
	 */
	diff_match_patch.prototype.diff_levenshtein = function(diffs) {
	  var levenshtein = 0;
	  var insertions = 0;
	  var deletions = 0;
	  for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];
	    var data = diffs[x][1];
	    switch (op) {
	      case DIFF_INSERT:
	        insertions += data.length;
	        break;
	      case DIFF_DELETE:
	        deletions += data.length;
	        break;
	      case DIFF_EQUAL:
	        // A deletion and an insertion is one substitution.
	        levenshtein += Math.max(insertions, deletions);
	        insertions = 0;
	        deletions = 0;
	        break;
	    }
	  }
	  levenshtein += Math.max(insertions, deletions);
	  return levenshtein;
	};


	/**
	 * Crush the diff into an encoded string which describes the operations
	 * required to transform text1 into text2.
	 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
	 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Delta text.
	 */
	diff_match_patch.prototype.diff_toDelta = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    switch (diffs[x][0]) {
	      case DIFF_INSERT:
	        text[x] = '+' + encodeURI(diffs[x][1]);
	        break;
	      case DIFF_DELETE:
	        text[x] = '-' + diffs[x][1].length;
	        break;
	      case DIFF_EQUAL:
	        text[x] = '=' + diffs[x][1].length;
	        break;
	    }
	  }
	  return text.join('\t').replace(/%20/g, ' ');
	};


	/**
	 * Given the original text1, and an encoded string which describes the
	 * operations required to transform text1 into text2, compute the full diff.
	 * @param {string} text1 Source string for the diff.
	 * @param {string} delta Delta text.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @throws {!Error} If invalid input.
	 */
	diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
	  var diffs = [];
	  var diffsLength = 0;  // Keeping our own length var is faster in JS.
	  var pointer = 0;  // Cursor in text1
	  var tokens = delta.split(/\t/g);
	  for (var x = 0; x < tokens.length; x++) {
	    // Each token begins with a one character parameter which specifies the
	    // operation of this token (delete, insert, equality).
	    var param = tokens[x].substring(1);
	    switch (tokens[x].charAt(0)) {
	      case '+':
	        try {
	          diffs[diffsLength++] =
	              new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
	        } catch (ex) {
	          // Malformed URI sequence.
	          throw new Error('Illegal escape in diff_fromDelta: ' + param);
	        }
	        break;
	      case '-':
	        // Fall through.
	      case '=':
	        var n = parseInt(param, 10);
	        if (isNaN(n) || n < 0) {
	          throw new Error('Invalid number in diff_fromDelta: ' + param);
	        }
	        var text = text1.substring(pointer, pointer += n);
	        if (tokens[x].charAt(0) == '=') {
	          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
	        } else {
	          diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
	        }
	        break;
	      default:
	        // Blank tokens are ok (from a trailing \t).
	        // Anything else is an error.
	        if (tokens[x]) {
	          throw new Error('Invalid diff operation in diff_fromDelta: ' +
	                          tokens[x]);
	        }
	    }
	  }
	  if (pointer != text1.length) {
	    throw new Error('Delta length (' + pointer +
	        ') does not equal source text length (' + text1.length + ').');
	  }
	  return diffs;
	};


	//  MATCH FUNCTIONS


	/**
	 * Locate the best instance of 'pattern' in 'text' near 'loc'.
	 * @param {string} text The text to search.
	 * @param {string} pattern The pattern to search for.
	 * @param {number} loc The location to search around.
	 * @return {number} Best match index or -1.
	 */
	diff_match_patch.prototype.match_main = function(text, pattern, loc) {
	  // Check for null inputs.
	  if (text == null || pattern == null || loc == null) {
	    throw new Error('Null input. (match_main)');
	  }

	  loc = Math.max(0, Math.min(loc, text.length));
	  if (text == pattern) {
	    // Shortcut (potentially not guaranteed by the algorithm)
	    return 0;
	  } else if (!text.length) {
	    // Nothing to match.
	    return -1;
	  } else if (text.substring(loc, loc + pattern.length) == pattern) {
	    // Perfect match at the perfect spot!  (Includes case of null pattern)
	    return loc;
	  } else {
	    // Do a fuzzy compare.
	    return this.match_bitap_(text, pattern, loc);
	  }
	};


	/**
	 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
	 * Bitap algorithm.
	 * @param {string} text The text to search.
	 * @param {string} pattern The pattern to search for.
	 * @param {number} loc The location to search around.
	 * @return {number} Best match index or -1.
	 * @private
	 */
	diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
	  if (pattern.length > this.Match_MaxBits) {
	    throw new Error('Pattern too long for this browser.');
	  }

	  // Initialise the alphabet.
	  var s = this.match_alphabet_(pattern);

	  var dmp = this;  // 'this' becomes 'window' in a closure.

	  /**
	   * Compute and return the score for a match with e errors and x location.
	   * Accesses loc and pattern through being a closure.
	   * @param {number} e Number of errors in match.
	   * @param {number} x Location of match.
	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
	   * @private
	   */
	  function match_bitapScore_(e, x) {
	    var accuracy = e / pattern.length;
	    var proximity = Math.abs(loc - x);
	    if (!dmp.Match_Distance) {
	      // Dodge divide by zero error.
	      return proximity ? 1.0 : accuracy;
	    }
	    return accuracy + (proximity / dmp.Match_Distance);
	  }

	  // Highest score beyond which we give up.
	  var score_threshold = this.Match_Threshold;
	  // Is there a nearby exact match? (speedup)
	  var best_loc = text.indexOf(pattern, loc);
	  if (best_loc != -1) {
	    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
	    // What about in the other direction? (speedup)
	    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
	    if (best_loc != -1) {
	      score_threshold =
	          Math.min(match_bitapScore_(0, best_loc), score_threshold);
	    }
	  }

	  // Initialise the bit arrays.
	  var matchmask = 1 << (pattern.length - 1);
	  best_loc = -1;

	  var bin_min, bin_mid;
	  var bin_max = pattern.length + text.length;
	  var last_rd;
	  for (var d = 0; d < pattern.length; d++) {
	    // Scan for the best match; each iteration allows for one more error.
	    // Run a binary search to determine how far from 'loc' we can stray at this
	    // error level.
	    bin_min = 0;
	    bin_mid = bin_max;
	    while (bin_min < bin_mid) {
	      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
	        bin_min = bin_mid;
	      } else {
	        bin_max = bin_mid;
	      }
	      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
	    }
	    // Use the result from this iteration as the maximum for the next.
	    bin_max = bin_mid;
	    var start = Math.max(1, loc - bin_mid + 1);
	    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

	    var rd = Array(finish + 2);
	    rd[finish + 1] = (1 << d) - 1;
	    for (var j = finish; j >= start; j--) {
	      // The alphabet (s) is a sparse hash, so the following line generates
	      // warnings.
	      var charMatch = s[text.charAt(j - 1)];
	      if (d === 0) {  // First pass: exact match.
	        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
	      } else {  // Subsequent passes: fuzzy match.
	        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
	                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
	                last_rd[j + 1];
	      }
	      if (rd[j] & matchmask) {
	        var score = match_bitapScore_(d, j - 1);
	        // This match will almost certainly be better than any existing match.
	        // But check anyway.
	        if (score <= score_threshold) {
	          // Told you so.
	          score_threshold = score;
	          best_loc = j - 1;
	          if (best_loc > loc) {
	            // When passing loc, don't exceed our current distance from loc.
	            start = Math.max(1, 2 * loc - best_loc);
	          } else {
	            // Already passed loc, downhill from here on in.
	            break;
	          }
	        }
	      }
	    }
	    // No hope for a (better) match at greater error levels.
	    if (match_bitapScore_(d + 1, loc) > score_threshold) {
	      break;
	    }
	    last_rd = rd;
	  }
	  return best_loc;
	};


	/**
	 * Initialise the alphabet for the Bitap algorithm.
	 * @param {string} pattern The text to encode.
	 * @return {!Object} Hash of character locations.
	 * @private
	 */
	diff_match_patch.prototype.match_alphabet_ = function(pattern) {
	  var s = {};
	  for (var i = 0; i < pattern.length; i++) {
	    s[pattern.charAt(i)] = 0;
	  }
	  for (var i = 0; i < pattern.length; i++) {
	    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
	  }
	  return s;
	};


	//  PATCH FUNCTIONS


	/**
	 * Increase the context until it is unique,
	 * but don't let the pattern expand beyond Match_MaxBits.
	 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
	 * @param {string} text Source text.
	 * @private
	 */
	diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
	  if (text.length == 0) {
	    return;
	  }
	  if (patch.start2 === null) {
	    throw Error('patch not initialized');
	  }
	  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
	  var padding = 0;

	  // Look for the first and last matches of pattern in text.  If two different
	  // matches are found, increase the pattern length.
	  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
	         pattern.length < this.Match_MaxBits - this.Patch_Margin -
	         this.Patch_Margin) {
	    padding += this.Patch_Margin;
	    pattern = text.substring(patch.start2 - padding,
	                             patch.start2 + patch.length1 + padding);
	  }
	  // Add one chunk for good luck.
	  padding += this.Patch_Margin;

	  // Add the prefix.
	  var prefix = text.substring(patch.start2 - padding, patch.start2);
	  if (prefix) {
	    patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
	  }
	  // Add the suffix.
	  var suffix = text.substring(patch.start2 + patch.length1,
	                              patch.start2 + patch.length1 + padding);
	  if (suffix) {
	    patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
	  }

	  // Roll back the start points.
	  patch.start1 -= prefix.length;
	  patch.start2 -= prefix.length;
	  // Extend the lengths.
	  patch.length1 += prefix.length + suffix.length;
	  patch.length2 += prefix.length + suffix.length;
	};


	/**
	 * Compute a list of patches to turn text1 into text2.
	 * Use diffs if provided, otherwise compute it ourselves.
	 * There are four ways to call this function, depending on what data is
	 * available to the caller:
	 * Method 1:
	 * a = text1, b = text2
	 * Method 2:
	 * a = diffs
	 * Method 3 (optimal):
	 * a = text1, b = diffs
	 * Method 4 (deprecated, use method 3):
	 * a = text1, b = text2, c = diffs
	 *
	 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
	 * Array of diff tuples for text1 to text2 (method 2).
	 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_b text2 (methods 1,4) or
	 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
	 * @param {string|!Array.<!diff_match_patch.Diff>=} opt_c Array of diff tuples
	 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
	  var text1, diffs;
	  if (typeof a == 'string' && typeof opt_b == 'string' &&
	      typeof opt_c == 'undefined') {
	    // Method 1: text1, text2
	    // Compute diffs from text1 and text2.
	    text1 = /** @type {string} */(a);
	    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
	    if (diffs.length > 2) {
	      this.diff_cleanupSemantic(diffs);
	      this.diff_cleanupEfficiency(diffs);
	    }
	  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
	      typeof opt_c == 'undefined') {
	    // Method 2: diffs
	    // Compute text1 from diffs.
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
	    text1 = this.diff_text1(diffs);
	  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
	      typeof opt_c == 'undefined') {
	    // Method 3: text1, diffs
	    text1 = /** @type {string} */(a);
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
	  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
	      opt_c && typeof opt_c == 'object') {
	    // Method 4: text1, text2, diffs
	    // text2 is not used.
	    text1 = /** @type {string} */(a);
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
	  } else {
	    throw new Error('Unknown call format to patch_make.');
	  }

	  if (diffs.length === 0) {
	    return [];  // Get rid of the null case.
	  }
	  var patches = [];
	  var patch = new diff_match_patch.patch_obj();
	  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
	  var char_count1 = 0;  // Number of characters into the text1 string.
	  var char_count2 = 0;  // Number of characters into the text2 string.
	  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
	  // text2 (postpatch_text).  We recreate the patches one by one to determine
	  // context info.
	  var prepatch_text = text1;
	  var postpatch_text = text1;
	  for (var x = 0; x < diffs.length; x++) {
	    var diff_type = diffs[x][0];
	    var diff_text = diffs[x][1];

	    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
	      // A new patch starts here.
	      patch.start1 = char_count1;
	      patch.start2 = char_count2;
	    }

	    switch (diff_type) {
	      case DIFF_INSERT:
	        patch.diffs[patchDiffLength++] = diffs[x];
	        patch.length2 += diff_text.length;
	        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
	                         postpatch_text.substring(char_count2);
	        break;
	      case DIFF_DELETE:
	        patch.length1 += diff_text.length;
	        patch.diffs[patchDiffLength++] = diffs[x];
	        postpatch_text = postpatch_text.substring(0, char_count2) +
	                         postpatch_text.substring(char_count2 +
	                             diff_text.length);
	        break;
	      case DIFF_EQUAL:
	        if (diff_text.length <= 2 * this.Patch_Margin &&
	            patchDiffLength && diffs.length != x + 1) {
	          // Small equality inside a patch.
	          patch.diffs[patchDiffLength++] = diffs[x];
	          patch.length1 += diff_text.length;
	          patch.length2 += diff_text.length;
	        } else if (diff_text.length >= 2 * this.Patch_Margin) {
	          // Time for a new patch.
	          if (patchDiffLength) {
	            this.patch_addContext_(patch, prepatch_text);
	            patches.push(patch);
	            patch = new diff_match_patch.patch_obj();
	            patchDiffLength = 0;
	            // Unlike Unidiff, our patch lists have a rolling context.
	            // https://github.com/google/diff-match-patch/wiki/Unidiff
	            // Update prepatch text & pos to reflect the application of the
	            // just completed patch.
	            prepatch_text = postpatch_text;
	            char_count1 = char_count2;
	          }
	        }
	        break;
	    }

	    // Update the current character count.
	    if (diff_type !== DIFF_INSERT) {
	      char_count1 += diff_text.length;
	    }
	    if (diff_type !== DIFF_DELETE) {
	      char_count2 += diff_text.length;
	    }
	  }
	  // Pick up the leftover patch if not empty.
	  if (patchDiffLength) {
	    this.patch_addContext_(patch, prepatch_text);
	    patches.push(patch);
	  }

	  return patches;
	};


	/**
	 * Given an array of patches, return another array that is identical.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_deepCopy = function(patches) {
	  // Making deep copies is hard in JavaScript.
	  var patchesCopy = [];
	  for (var x = 0; x < patches.length; x++) {
	    var patch = patches[x];
	    var patchCopy = new diff_match_patch.patch_obj();
	    patchCopy.diffs = [];
	    for (var y = 0; y < patch.diffs.length; y++) {
	      patchCopy.diffs[y] =
	          new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
	    }
	    patchCopy.start1 = patch.start1;
	    patchCopy.start2 = patch.start2;
	    patchCopy.length1 = patch.length1;
	    patchCopy.length2 = patch.length2;
	    patchesCopy[x] = patchCopy;
	  }
	  return patchesCopy;
	};


	/**
	 * Merge a set of patches onto the text.  Return a patched text, as well
	 * as a list of true/false values indicating which patches were applied.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @param {string} text Old text.
	 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
	 *      new text and an array of boolean values.
	 */
	diff_match_patch.prototype.patch_apply = function(patches, text) {
	  if (patches.length == 0) {
	    return [text, []];
	  }

	  // Deep copy the patches so that no changes are made to originals.
	  patches = this.patch_deepCopy(patches);

	  var nullPadding = this.patch_addPadding(patches);
	  text = nullPadding + text + nullPadding;

	  this.patch_splitMax(patches);
	  // delta keeps track of the offset between the expected and actual location
	  // of the previous patch.  If there are patches expected at positions 10 and
	  // 20, but the first patch was found at 12, delta is 2 and the second patch
	  // has an effective expected position of 22.
	  var delta = 0;
	  var results = [];
	  for (var x = 0; x < patches.length; x++) {
	    var expected_loc = patches[x].start2 + delta;
	    var text1 = this.diff_text1(patches[x].diffs);
	    var start_loc;
	    var end_loc = -1;
	    if (text1.length > this.Match_MaxBits) {
	      // patch_splitMax will only provide an oversized pattern in the case of
	      // a monster delete.
	      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
	                                  expected_loc);
	      if (start_loc != -1) {
	        end_loc = this.match_main(text,
	            text1.substring(text1.length - this.Match_MaxBits),
	            expected_loc + text1.length - this.Match_MaxBits);
	        if (end_loc == -1 || start_loc >= end_loc) {
	          // Can't find valid trailing context.  Drop this patch.
	          start_loc = -1;
	        }
	      }
	    } else {
	      start_loc = this.match_main(text, text1, expected_loc);
	    }
	    if (start_loc == -1) {
	      // No match found.  :(
	      results[x] = false;
	      // Subtract the delta for this failed patch from subsequent patches.
	      delta -= patches[x].length2 - patches[x].length1;
	    } else {
	      // Found a match.  :)
	      results[x] = true;
	      delta = start_loc - expected_loc;
	      var text2;
	      if (end_loc == -1) {
	        text2 = text.substring(start_loc, start_loc + text1.length);
	      } else {
	        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
	      }
	      if (text1 == text2) {
	        // Perfect match, just shove the replacement text in.
	        text = text.substring(0, start_loc) +
	               this.diff_text2(patches[x].diffs) +
	               text.substring(start_loc + text1.length);
	      } else {
	        // Imperfect match.  Run a diff to get a framework of equivalent
	        // indices.
	        var diffs = this.diff_main(text1, text2, false);
	        if (text1.length > this.Match_MaxBits &&
	            this.diff_levenshtein(diffs) / text1.length >
	            this.Patch_DeleteThreshold) {
	          // The end points match, but the content is unacceptably bad.
	          results[x] = false;
	        } else {
	          this.diff_cleanupSemanticLossless(diffs);
	          var index1 = 0;
	          var index2;
	          for (var y = 0; y < patches[x].diffs.length; y++) {
	            var mod = patches[x].diffs[y];
	            if (mod[0] !== DIFF_EQUAL) {
	              index2 = this.diff_xIndex(diffs, index1);
	            }
	            if (mod[0] === DIFF_INSERT) {  // Insertion
	              text = text.substring(0, start_loc + index2) + mod[1] +
	                     text.substring(start_loc + index2);
	            } else if (mod[0] === DIFF_DELETE) {  // Deletion
	              text = text.substring(0, start_loc + index2) +
	                     text.substring(start_loc + this.diff_xIndex(diffs,
	                         index1 + mod[1].length));
	            }
	            if (mod[0] !== DIFF_DELETE) {
	              index1 += mod[1].length;
	            }
	          }
	        }
	      }
	    }
	  }
	  // Strip the padding off.
	  text = text.substring(nullPadding.length, text.length - nullPadding.length);
	  return [text, results];
	};


	/**
	 * Add some padding on text start and end so that edges can match something.
	 * Intended to be called only from within patch_apply.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {string} The padding string added to each side.
	 */
	diff_match_patch.prototype.patch_addPadding = function(patches) {
	  var paddingLength = this.Patch_Margin;
	  var nullPadding = '';
	  for (var x = 1; x <= paddingLength; x++) {
	    nullPadding += String.fromCharCode(x);
	  }

	  // Bump all the patches forward.
	  for (var x = 0; x < patches.length; x++) {
	    patches[x].start1 += paddingLength;
	    patches[x].start2 += paddingLength;
	  }

	  // Add some padding on start of first diff.
	  var patch = patches[0];
	  var diffs = patch.diffs;
	  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
	    // Add nullPadding equality.
	    diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
	    patch.start1 -= paddingLength;  // Should be 0.
	    patch.start2 -= paddingLength;  // Should be 0.
	    patch.length1 += paddingLength;
	    patch.length2 += paddingLength;
	  } else if (paddingLength > diffs[0][1].length) {
	    // Grow first equality.
	    var extraLength = paddingLength - diffs[0][1].length;
	    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
	    patch.start1 -= extraLength;
	    patch.start2 -= extraLength;
	    patch.length1 += extraLength;
	    patch.length2 += extraLength;
	  }

	  // Add some padding on end of last diff.
	  patch = patches[patches.length - 1];
	  diffs = patch.diffs;
	  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
	    // Add nullPadding equality.
	    diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
	    patch.length1 += paddingLength;
	    patch.length2 += paddingLength;
	  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
	    // Grow last equality.
	    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
	    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
	    patch.length1 += extraLength;
	    patch.length2 += extraLength;
	  }

	  return nullPadding;
	};


	/**
	 * Look through the patches and break up any which are longer than the maximum
	 * limit of the match algorithm.
	 * Intended to be called only from within patch_apply.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_splitMax = function(patches) {
	  var patch_size = this.Match_MaxBits;
	  for (var x = 0; x < patches.length; x++) {
	    if (patches[x].length1 <= patch_size) {
	      continue;
	    }
	    var bigpatch = patches[x];
	    // Remove the big old patch.
	    patches.splice(x--, 1);
	    var start1 = bigpatch.start1;
	    var start2 = bigpatch.start2;
	    var precontext = '';
	    while (bigpatch.diffs.length !== 0) {
	      // Create one of several smaller patches.
	      var patch = new diff_match_patch.patch_obj();
	      var empty = true;
	      patch.start1 = start1 - precontext.length;
	      patch.start2 = start2 - precontext.length;
	      if (precontext !== '') {
	        patch.length1 = patch.length2 = precontext.length;
	        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
	      }
	      while (bigpatch.diffs.length !== 0 &&
	             patch.length1 < patch_size - this.Patch_Margin) {
	        var diff_type = bigpatch.diffs[0][0];
	        var diff_text = bigpatch.diffs[0][1];
	        if (diff_type === DIFF_INSERT) {
	          // Insertions are harmless.
	          patch.length2 += diff_text.length;
	          start2 += diff_text.length;
	          patch.diffs.push(bigpatch.diffs.shift());
	          empty = false;
	        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
	                   patch.diffs[0][0] == DIFF_EQUAL &&
	                   diff_text.length > 2 * patch_size) {
	          // This is a large deletion.  Let it pass in one chunk.
	          patch.length1 += diff_text.length;
	          start1 += diff_text.length;
	          empty = false;
	          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
	          bigpatch.diffs.shift();
	        } else {
	          // Deletion or equality.  Only take as much as we can stomach.
	          diff_text = diff_text.substring(0,
	              patch_size - patch.length1 - this.Patch_Margin);
	          patch.length1 += diff_text.length;
	          start1 += diff_text.length;
	          if (diff_type === DIFF_EQUAL) {
	            patch.length2 += diff_text.length;
	            start2 += diff_text.length;
	          } else {
	            empty = false;
	          }
	          patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
	          if (diff_text == bigpatch.diffs[0][1]) {
	            bigpatch.diffs.shift();
	          } else {
	            bigpatch.diffs[0][1] =
	                bigpatch.diffs[0][1].substring(diff_text.length);
	          }
	        }
	      }
	      // Compute the head context for the next patch.
	      precontext = this.diff_text2(patch.diffs);
	      precontext =
	          precontext.substring(precontext.length - this.Patch_Margin);
	      // Append the end context for this patch.
	      var postcontext = this.diff_text1(bigpatch.diffs)
	                            .substring(0, this.Patch_Margin);
	      if (postcontext !== '') {
	        patch.length1 += postcontext.length;
	        patch.length2 += postcontext.length;
	        if (patch.diffs.length !== 0 &&
	            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
	          patch.diffs[patch.diffs.length - 1][1] += postcontext;
	        } else {
	          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
	        }
	      }
	      if (!empty) {
	        patches.splice(++x, 0, patch);
	      }
	    }
	  }
	};


	/**
	 * Take a list of patches and return a textual representation.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {string} Text representation of patches.
	 */
	diff_match_patch.prototype.patch_toText = function(patches) {
	  var text = [];
	  for (var x = 0; x < patches.length; x++) {
	    text[x] = patches[x];
	  }
	  return text.join('');
	};


	/**
	 * Parse a textual representation of patches and return a list of Patch objects.
	 * @param {string} textline Text representation of patches.
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 * @throws {!Error} If invalid input.
	 */
	diff_match_patch.prototype.patch_fromText = function(textline) {
	  var patches = [];
	  if (!textline) {
	    return patches;
	  }
	  var text = textline.split('\n');
	  var textPointer = 0;
	  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
	  while (textPointer < text.length) {
	    var m = text[textPointer].match(patchHeader);
	    if (!m) {
	      throw new Error('Invalid patch string: ' + text[textPointer]);
	    }
	    var patch = new diff_match_patch.patch_obj();
	    patches.push(patch);
	    patch.start1 = parseInt(m[1], 10);
	    if (m[2] === '') {
	      patch.start1--;
	      patch.length1 = 1;
	    } else if (m[2] == '0') {
	      patch.length1 = 0;
	    } else {
	      patch.start1--;
	      patch.length1 = parseInt(m[2], 10);
	    }

	    patch.start2 = parseInt(m[3], 10);
	    if (m[4] === '') {
	      patch.start2--;
	      patch.length2 = 1;
	    } else if (m[4] == '0') {
	      patch.length2 = 0;
	    } else {
	      patch.start2--;
	      patch.length2 = parseInt(m[4], 10);
	    }
	    textPointer++;

	    while (textPointer < text.length) {
	      var sign = text[textPointer].charAt(0);
	      try {
	        var line = decodeURI(text[textPointer].substring(1));
	      } catch (ex) {
	        // Malformed URI sequence.
	        throw new Error('Illegal escape in patch_fromText: ' + line);
	      }
	      if (sign == '-') {
	        // Deletion.
	        patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
	      } else if (sign == '+') {
	        // Insertion.
	        patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
	      } else if (sign == ' ') {
	        // Minor equality.
	        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
	      } else if (sign == '@') {
	        // Start of next patch.
	        break;
	      } else if (sign === '') ; else {
	        // WTF?
	        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
	      }
	      textPointer++;
	    }
	  }
	  return patches;
	};


	/**
	 * Class representing one patch operation.
	 * @constructor
	 */
	diff_match_patch.patch_obj = function() {
	  /** @type {!Array.<!diff_match_patch.Diff>} */
	  this.diffs = [];
	  /** @type {?number} */
	  this.start1 = null;
	  /** @type {?number} */
	  this.start2 = null;
	  /** @type {number} */
	  this.length1 = 0;
	  /** @type {number} */
	  this.length2 = 0;
	};


	/**
	 * Emulate GNU diff's format.
	 * Header: @@ -382,8 +481,9 @@
	 * Indices are printed as 1-based, not 0-based.
	 * @return {string} The GNU diff string.
	 */
	diff_match_patch.patch_obj.prototype.toString = function() {
	  var coords1, coords2;
	  if (this.length1 === 0) {
	    coords1 = this.start1 + ',0';
	  } else if (this.length1 == 1) {
	    coords1 = this.start1 + 1;
	  } else {
	    coords1 = (this.start1 + 1) + ',' + this.length1;
	  }
	  if (this.length2 === 0) {
	    coords2 = this.start2 + ',0';
	  } else if (this.length2 == 1) {
	    coords2 = this.start2 + 1;
	  } else {
	    coords2 = (this.start2 + 1) + ',' + this.length2;
	  }
	  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
	  var op;
	  // Escape the body of the patch with %xx notation.
	  for (var x = 0; x < this.diffs.length; x++) {
	    switch (this.diffs[x][0]) {
	      case DIFF_INSERT:
	        op = '+';
	        break;
	      case DIFF_DELETE:
	        op = '-';
	        break;
	      case DIFF_EQUAL:
	        op = ' ';
	        break;
	    }
	    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
	  }
	  return text.join('').replace(/%20/g, ' ');
	};


	// The following export code was added by @ForbesLindesay
	module.exports = diff_match_patch;
	module.exports['diff_match_patch'] = diff_match_patch;
	module.exports['DIFF_DELETE'] = DIFF_DELETE;
	module.exports['DIFF_INSERT'] = DIFF_INSERT;
	module.exports['DIFF_EQUAL'] = DIFF_EQUAL; 
} (diffMatchPatch));

var diffMatchPatchExports = diffMatchPatch.exports;
var DiffMatchPatch = /*@__PURE__*/getDefaultExportFromCjs(diffMatchPatchExports);

// This file is auto-generated by tools/updateVersion.js. Do not edit directly.
var VERSION = "1.0.17-dev.1";
var REPO_URL = "https://github.com/deftio/squibview";

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

/* eslint-disable no-bitwise */

const decodeCache = {};

function getDecodeCache (exclude) {
  let cache = decodeCache[exclude];
  if (cache) { return cache }

  cache = decodeCache[exclude] = [];

  for (let i = 0; i < 128; i++) {
    const ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (let i = 0; i < exclude.length; i++) {
    const ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache
}

// Decode percent-encoded string.
//
function decode$1 (string, exclude) {
  if (typeof exclude !== 'string') {
    exclude = decode$1.defaultChars;
  }

  const cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function (seq) {
    let result = '';

    for (let i = 0, l = seq.length; i < l; i += 3) {
      const b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          const chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          const chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        const b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          let chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue
        }
      }

      result += '\ufffd';
    }

    return result
  })
}

decode$1.defaultChars = ';/?:@&=+$,#';
decode$1.componentChars = '';

const encodeCache = {};

// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache (exclude) {
  let cache = encodeCache[exclude];
  if (cache) { return cache }

  cache = encodeCache[exclude] = [];

  for (let i = 0; i < 128; i++) {
    const ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (let i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache
}

// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode$1 (string, exclude, keepEscaped) {
  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped = exclude;
    exclude = encode$1.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  const cache = getEncodeCache(exclude);
  let result = '';

  for (let i = 0, l = string.length; i < l; i++) {
    const code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue
      }
    }

    if (code < 128) {
      result += cache[code];
      continue
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        const nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue
        }
      }
      result += '%EF%BF%BD';
      continue
    }

    result += encodeURIComponent(string[i]);
  }

  return result
}

encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";

function format (url) {
  let result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//

function Url () {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
const protocolPattern = /^([a-z0-9.+-]+:)/i;
const portPattern = /:[0-9]*$/;

// Special case for a simple path URL
/* eslint-disable-next-line no-useless-escape */
const simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;

// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
const delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'];

// RFC 2396: characters not allowed for various reasons.
const unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims);

// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
const autoEscape = ['\''].concat(unwise);
// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
const nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape);
const hostEndingChars = ['/', '?', '#'];
const hostnameMaxLen = 255;
const hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
const hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
// protocols that can allow "unsafe" and "unwise" chars.
// protocols that never have a hostname.
const hostlessProtocol = {
  javascript: true,
  'javascript:': true
};
// protocols that always contain a // bit.
const slashedProtocol = {
  http: true,
  https: true,
  ftp: true,
  gopher: true,
  file: true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
};

function urlParse (url, slashesDenoteHost) {
  if (url && url instanceof Url) return url

  const u = new Url();
  u.parse(url, slashesDenoteHost);
  return u
}

Url.prototype.parse = function (url, slashesDenoteHost) {
  let lowerProto, hec, slashes;
  let rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    const simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this
    }
  }

  let proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  /* eslint-disable-next-line no-useless-escape */
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    let hostEnd = -1;
    for (let i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    let auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (let i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    const host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    const ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      const hostparts = this.hostname.split(/\./);
      for (let i = 0, l = hostparts.length; i < l; i++) {
        const part = hostparts[i];
        if (!part) { continue }
        if (!part.match(hostnamePartPattern)) {
          let newpart = '';
          for (let j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            const validParts = hostparts.slice(0, i);
            const notHost = hostparts.slice(i + 1);
            const bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  const hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  const qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this
};

Url.prototype.parseHost = function (host) {
  let port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

var mdurl = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decode: decode$1,
  encode: encode$1,
  format: format,
  parse: urlParse
});

var Any = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var Cc = /[\0-\x1F\x7F-\x9F]/;

var regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

var P = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var regex = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

var Z = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

var ucmicro = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Any: Any,
  Cc: Cc,
  Cf: regex$1,
  P: P,
  S: regex,
  Z: Z
});

// Generated using scripts/write-decode-map.ts
var htmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Generated using scripts/write-decode-map.ts
var xmlDecodeTree = new Uint16Array(
// prettier-ignore
"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map((c) => c.charCodeAt(0)));

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
const decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
const fromCodePoint$1 = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    let output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}

var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 0b100000;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
        isNumber(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
class EntityDecoder {
    constructor(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (str.charCodeAt(offset) === CharCodes.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(str, offset);
            }
        }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
        if (offset >= str.length) {
            return -1;
        }
        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base) {
        if (start !== end) {
            const digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 16);
        return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
        const startIdx = offset;
        while (offset < str.length) {
            const char = str.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 10);
        return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
        const { decodeTree } = this;
        let current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < str.length; offset++, this.excess++) {
            const char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
        var _a;
        const { result, decodeTree } = this;
        const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
        const { decodeTree } = this;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    }
}
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => (ret += fromCodePoint$1(str)));
    return function decodeWithTrie(str, decodeMode) {
        let lastIndex = 0;
        let offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            const len = decoder.write(str, 
            // Skip the "&"
            offset + 1);
            if (len < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + len;
            // If `len` is 0, skip the current `&` and continue.
            offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        const result = ret + str.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        ret = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        const value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
        const mid = (lo + hi) >>> 1;
        const midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
const htmlDecoder = getDecoder(htmlDecodeTree);
getDecoder(xmlDecodeTree);
/**
 * Decodes an HTML string.
 *
 * @param str The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */
function decodeHTML(str, mode = DecodingMode.Legacy) {
    return htmlDecoder(str, mode);
}

// Utilities
//


function _class$1 (obj) { return Object.prototype.toString.call(obj) }

function isString$1 (obj) { return _class$1(obj) === '[object String]' }

const _hasOwnProperty = Object.prototype.hasOwnProperty;

function has$1 (object, key) {
  return _hasOwnProperty.call(object, key)
}

// Merge objects
//
function assign$1 (obj /* from1, from2, from3, ... */) {
  const sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object')
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt (src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1))
}

function isValidEntityCode (c) {
  /* eslint no-bitwise:0 */
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false }
  if (c === 0x0B) { return false }
  if (c >= 0x0E && c <= 0x1F) { return false }
  if (c >= 0x7F && c <= 0x9F) { return false }
  // out of range
  if (c > 0x10FFFF) { return false }
  return true
}

function fromCodePoint (c) {
  /* eslint no-bitwise:0 */
  if (c > 0xffff) {
    c -= 0x10000;
    const surrogate1 = 0xd800 + (c >> 10);
    const surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2)
  }
  return String.fromCharCode(c)
}

const UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
const ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
const UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

const DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;

function replaceEntityPattern (match, name) {
  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    const code = name[1].toLowerCase() === 'x'
      ? parseInt(name.slice(2), 16)
      : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code)
    }

    return match
  }

  const decoded = decodeHTML(match);
  if (decoded !== match) {
    return decoded
  }

  return match
}

/* function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
} */

function unescapeMd (str) {
  if (str.indexOf('\\') < 0) { return str }
  return str.replace(UNESCAPE_MD_RE, '$1')
}

function unescapeAll (str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped }
    return replaceEntityPattern(match, entity)
  })
}

const HTML_ESCAPE_TEST_RE = /[&<>"]/;
const HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
const HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar (ch) {
  return HTML_REPLACEMENTS[ch]
}

function escapeHtml (str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar)
  }
  return str
}

const REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE$1 (str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&')
}

function isSpace (code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true
  }
  return false
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace (code) {
  if (code >= 0x2000 && code <= 0x200A) { return true }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true
  }
  return false
}

/* eslint-disable max-len */

// Currently without astral characters support.
function isPunctChar (ch) {
  return P.test(ch) || regex.test(ch)
}

// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct (ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true
    default:
      return false
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference (str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase()
}

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
const lib = { mdurl, ucmicro };

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  arrayReplaceAt: arrayReplaceAt,
  assign: assign$1,
  escapeHtml: escapeHtml,
  escapeRE: escapeRE$1,
  fromCodePoint: fromCodePoint,
  has: has$1,
  isMdAsciiPunct: isMdAsciiPunct,
  isPunctChar: isPunctChar,
  isSpace: isSpace,
  isString: isString$1,
  isValidEntityCode: isValidEntityCode,
  isWhiteSpace: isWhiteSpace,
  lib: lib,
  normalizeReference: normalizeReference,
  unescapeAll: unescapeAll,
  unescapeMd: unescapeMd
});

// Parse link label
//
// this function assumes that first character ("[") already matches;
// returns the end of the label
//

function parseLinkLabel (state, start, disableNested) {
  let level, found, marker, prevPos;

  const max = state.posMax;
  const oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1
      }
    }
  }

  let labelEnd = -1;

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd
}

// Parse link destination
//


function parseLinkDestination (str, start, max) {
  let code;
  let pos = start;

  const result = {
    ok: false,
    pos: 0,
    str: ''
  };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result }
      if (code === 0x3C /* < */) { return result }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll(str.slice(start + 1, pos));
        result.ok = true;
        return result
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue
      }

      pos++;
    }

    // no closing '>'
    return result
  }

  // this should be ... } else { ... branch

  let level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      if (str.charCodeAt(pos + 1) === 0x20) { break }
      pos += 2;
      continue
    }

    if (code === 0x28 /* ( */) {
      level++;
      if (level > 32) { return result }
    }

    if (code === 0x29 /* ) */) {
      if (level === 0) { break }
      level--;
    }

    pos++;
  }

  if (start === pos) { return result }
  if (level !== 0) { return result }

  result.str = unescapeAll(str.slice(start, pos));
  result.pos = pos;
  result.ok = true;
  return result
}

// Parse link title
//


// Parse link title within `str` in [start, max] range,
// or continue previous parsing if `prev_state` is defined (equal to result of last execution).
//
function parseLinkTitle (str, start, max, prev_state) {
  let code;
  let pos = start;

  const state = {
    // if `true`, this is a valid link title
    ok: false,
    // if `true`, this link can be continued on the next line
    can_continue: false,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: '',
    // expected closing marker character code
    marker: 0
  };

  if (prev_state) {
    // this is a continuation of a previous parseLinkTitle call on the next line,
    // used in reference links only
    state.str = prev_state.str;
    state.marker = prev_state.marker;
  } else {
    if (pos >= max) { return state }

    let marker = str.charCodeAt(pos);
    if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return state }

    start++;
    pos++;

    // if opening marker is "(", switch it to closing marker ")"
    if (marker === 0x28) { marker = 0x29; }

    state.marker = marker;
  }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === state.marker) {
      state.pos = pos + 1;
      state.str += unescapeAll(str.slice(start, pos));
      state.ok = true;
      return state
    } else if (code === 0x28 /* ( */ && state.marker === 0x29 /* ) */) {
      return state
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
    }

    pos++;
  }

  // no closing marker found, but this link title may continue on the next line (for references)
  state.can_continue = true;
  state.str += unescapeAll(str.slice(start, pos));
  return state
}

// Just a shortcut for bulk export

var helpers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  parseLinkDestination: parseLinkDestination,
  parseLinkLabel: parseLinkLabel,
  parseLinkTitle: parseLinkTitle
});

/**
 * class Renderer
 *
 * Generates HTML from parsed token stream. Each instance has independent
 * copy of rules. Those can be rewritten with ease. Also, you can add new
 * rules if you create plugin and adds new token types.
 **/


const default_rules = {};

default_rules.code_inline = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];

  return  '<code' + slf.renderAttrs(token) + '>' +
          escapeHtml(token.content) +
          '</code>'
};

default_rules.code_block = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];

  return  '<pre' + slf.renderAttrs(token) + '><code>' +
          escapeHtml(tokens[idx].content) +
          '</code></pre>\n'
};

default_rules.fence = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const info = token.info ? unescapeAll(token.info).trim() : '';
  let langName = '';
  let langAttrs = '';

  if (info) {
    const arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join('');
  }

  let highlighted;
  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n'
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .deepClone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    const i = token.attrIndex('class');
    const tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push(['class', options.langPrefix + langName]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    const tmpToken = {
      attrs: tmpAttrs
    };

    return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>\n`
  }

  return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>\n`
};

default_rules.image = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env);

  return slf.renderToken(tokens, idx, options)
};

default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n'
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n'
};

default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content)
};

default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content
};

/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer () {
  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs)
   * for more details and examples.
   **/
  this.rules = assign$1({}, default_rules);
}

/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs (token) {
  let i, l, result;

  if (!token.attrs) { return '' }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
  }

  return result
};

/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken (tokens, idx, options) {
  const token = tokens[idx];
  let result = '';

  // Tight list paragraphs
  if (token.hidden) {
    return ''
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  let needLf = false;
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        const nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;
        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result
};

/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  let result = '';
  const rules = this.rules;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result
};

/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  let result = '';

  for (let i = 0, len = tokens.length; i < len; i++) {
    switch (tokens[i].type) {
      case 'text':
        result += tokens[i].content;
        break
      case 'image':
        result += this.renderInlineAsText(tokens[i].children, options, env);
        break
      case 'html_inline':
      case 'html_block':
        result += tokens[i].content;
        break
      case 'softbreak':
      case 'hardbreak':
        result += '\n';
        break
        // all other tokens are skipped
    }
  }

  return result
};

/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to render
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  let result = '';
  const rules = this.rules;

  for (let i = 0, len = tokens.length; i < len; i++) {
    const type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result
};

/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/

/**
 * new Ruler()
 **/
function Ruler () {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

// Helper methods, should not be used directly

// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (let i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i
    }
  }
  return -1
};

// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  const self = this;
  const chains = [''];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return }

      if (chain && rule.alt.indexOf(chain) < 0) { return }

      self.__cache__[chain].push(rule.fn);
    });
  });
};

/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  const index = this.__find__(name);
  const opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name) }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};

/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  const index = this.__find__(beforeName);
  const opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName) }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  const index = this.__find__(afterName);
  const opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName) }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  const opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [list]; }

  const result = [];

  // Search by name and enable
  list.forEach(function (name) {
    const idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return }
      throw new Error('Rules manager: invalid rule name ' + name)
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result
};

/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [list]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};

/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [list]; }

  const result = [];

  // Search by name and disable
  list.forEach(function (name) {
    const idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return }
      throw new Error('Rules manager: invalid rule name ' + name)
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result
};

/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || []
};

// Token class

/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token (type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * Additional information:
   *
   * - Info string for "fence" tokens
   * - The value "auto" for autolink "link_open" and "link_close" tokens
   * - The string value of the item marker for ordered-list "list_item_open" tokens
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}

/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex (name) {
  if (!this.attrs) { return -1 }

  const attrs = this.attrs;

  for (let i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i }
  }
  return -1
};

/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush (attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [attrData];
  }
};

/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token.prototype.attrSet = function attrSet (name, value) {
  const idx = this.attrIndex(name);
  const attrData = [name, value];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};

/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token.prototype.attrGet = function attrGet (name) {
  const idx = this.attrIndex(name);
  let value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value
};

/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token.prototype.attrJoin = function attrJoin (name, value) {
  const idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([name, value]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};

// Core state object
//


function StateCore (src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = Token;

// Normalize input string

// https://spec.commonmark.org/0.29/#line-ending
const NEWLINES_RE  = /\r\n?|\n/g;
const NULL_RE      = /\0/g;

function normalize (state) {
  let str;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  state.src = str;
}

function block (state) {
  let token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [0, 1];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
}

function inline (state) {
  const tokens = state.tokens;

  // Parse inlines
  for (let i = 0, l = tokens.length; i < l; i++) {
    const tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
}

// Replace link-like texts with link nodes.
//
// Currently restricted by `md.validateLink()` to http/https/ftp
//


function isLinkOpen$1 (str) {
  return /^<a[>\s]/i.test(str)
}
function isLinkClose$1 (str) {
  return /^<\/a\s*>/i.test(str)
}

function linkify$1 (state) {
  const blockTokens = state.tokens;

  if (!state.md.options.linkify) { return }

  for (let j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue
    }

    let tokens = blockTokens[j].children;

    let htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (let i = tokens.length - 1; i >= 0; i--) {
      const currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose$1(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {
        const text = currentToken.content;
        let links = state.md.linkify.match(text);

        // Now split string to nodes
        const nodes = [];
        let level = currentToken.level;
        let lastPos = 0;

        // forbid escape sequence at the start of the string,
        // this avoids http\://example.com/ from being linkified as
        // http:<a href="//example.com/">//example.com/</a>
        if (links.length > 0 &&
            links[0].index === 0 &&
            i > 0 &&
            tokens[i - 1].type === 'text_special') {
          links = links.slice(1);
        }

        for (let ln = 0; ln < links.length; ln++) {
          const url = links[ln].url;
          const fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue }

          let urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          const pos = links[ln].index;

          if (pos > lastPos) {
            const token   = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          const token_o   = new state.Token('link_open', 'a', 1);
          token_o.attrs   = [['href', fullUrl]];
          token_o.level   = level++;
          token_o.markup  = 'linkify';
          token_o.info    = 'auto';
          nodes.push(token_o);

          const token_t   = new state.Token('text', '', 0);
          token_t.content = urlText;
          token_t.level   = level;
          nodes.push(token_t);

          const token_c   = new state.Token('link_close', 'a', -1);
          token_c.level   = --level;
          token_c.markup  = 'linkify';
          token_c.info    = 'auto';
          nodes.push(token_c);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          const token   = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
      }
    }
  }
}

// Simple typographic replacements
//
// (c) (C) → ©
// (tm) (TM) → ™
// (r) (R) → ®
// +- → ±
// ... → … (also ?.... → ?.., !.... → !..)
// ???????? → ???, !!!!! → !!!, `,,` → `,`
// -- → &ndash;, --- → &mdash;
//

// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - multiplications 2 x 4 -> 2 × 4

const RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
const SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;

const SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
const SCOPED_ABBR = {
  c: '©',
  r: '®',
  tm: '™'
};

function replaceFn (match, name) {
  return SCOPED_ABBR[name.toLowerCase()]
}

function replace_scoped (inlineTokens) {
  let inside_autolink = 0;

  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare (inlineTokens) {
  let inside_autolink = 0;

  for (let i = inlineTokens.length - 1; i >= 0; i--) {
    const token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
          .replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
          .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')
          // en-dash
          .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013')
          .replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace (state) {
  let blkIdx;

  if (!state.md.options.typographer) { return }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline') { continue }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }
  }
}

// Convert straight quotation marks to typographic ones
//


const QUOTE_TEST_RE = /['"]/;
const QUOTE_RE = /['"]/g;
const APOSTROPHE = '\u2019'; /* ’ */

function replaceAt (str, index, ch) {
  return str.slice(0, index) + ch + str.slice(index + 1)
}

function process_inlines (tokens, state) {
  let j;

  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    const thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue }

    let text = token.content;
    let pos = 0;
    let max = text.length;

    /* eslint no-labels:0,block-scoped-var:0 */
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      const t = QUOTE_RE.exec(text);
      if (!t) { break }

      let canOpen = true;
      let canClose = true;
      pos = t.index + 1;
      const isSingle = (t[0] === "'");

      // Find previous character,
      // default to space if it's the beginning of the line
      //
      let lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break // lastChar defaults to 0x20
          if (!tokens[j].content) continue // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break
        }
      }

      // Find next character,
      // default to space if it's the end of the line
      //
      let nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break // nextChar defaults to 0x20
          if (!tokens[j].content) continue // should skip all tokens except 'text', 'html_inline' or 'code_inline'

          nextChar = tokens[j].content.charCodeAt(0);
          break
        }
      }

      const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

      const isLastWhiteSpace = isWhiteSpace(lastChar);
      const isNextWhiteSpace = isWhiteSpace(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // Replace quotes in the middle of punctuation sequence, but not
        // in the middle of the words, i.e.:
        //
        // 1. foo " bar " baz - not replaced
        // 2. foo-"-bar-"-baz - replaced
        // 3. foo"bar"baz     - not replaced
        //
        canOpen = isLastPunctChar;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          let item = stack[j];
          if (stack[j].level < thisLevel) { break }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            let openQuote;
            let closeQuote;
            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            }

            // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1
            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(
              tokens[item.token].content, item.pos, openQuote);

            pos += closeQuote.length - 1;
            if (item.token === i) { pos += openQuote.length - 1; }

            text = token.content;
            max = text.length;

            stack.length = j;
            continue OUTER
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}

function smartquotes (state) {
  /* eslint max-depth:0 */
  if (!state.md.options.typographer) { return }

  for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
}

// Join raw text tokens with the rest of the text
//
// This is set as a separate rule to provide an opportunity for plugins
// to run text replacements after text join, but before escape join.
//
// For example, `\:)` shouldn't be replaced with an emoji.
//

function text_join (state) {
  let curr, last;
  const blockTokens = state.tokens;
  const l = blockTokens.length;

  for (let j = 0; j < l; j++) {
    if (blockTokens[j].type !== 'inline') continue

    const tokens = blockTokens[j].children;
    const max = tokens.length;

    for (curr = 0; curr < max; curr++) {
      if (tokens[curr].type === 'text_special') {
        tokens[curr].type = 'text';
      }
    }

    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].type === 'text' &&
          curr + 1 < max &&
          tokens[curr + 1].type === 'text') {
        // collapse two adjacent text nodes
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) { tokens[last] = tokens[curr]; }

        last++;
      }
    }

    if (curr !== last) {
      tokens.length = last;
    }
  }
}

/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/


const _rules$2 = [
  ['normalize',      normalize],
  ['block',          block],
  ['inline',         inline],
  ['linkify',        linkify$1],
  ['replacements',   replace],
  ['smartquotes',    smartquotes],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ['text_join',      text_join]
];

/**
 * new Core()
 **/
function Core () {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new Ruler();

  for (let i = 0; i < _rules$2.length; i++) {
    this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
  }
}

/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  const rules = this.ruler.getRules('');

  for (let i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = StateCore;

// Parser state class


function StateBlock (src, md, env, tokens) {
  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables

  // required block content indent (for example, if we are
  // inside a list, it would be positioned after list marker)
  this.blkIndent  = 0;
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // Create caches
  // Generate markers.
  const s = this.src;

  for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
    const ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  const token = new Token(type, tag, nesting);
  token.block = true;

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token
};

StateBlock.prototype.isEmpty = function isEmpty (line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line]
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines (from) {
  for (let max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break
    }
  }
  return from
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces (pos) {
  for (let max = this.src.length; pos < max; pos++) {
    const ch = this.src.charCodeAt(pos);
    if (!isSpace(ch)) { break }
  }
  return pos
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack (pos, min) {
  if (pos <= min) { return pos }

  while (pos > min) {
    if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1 }
  }
  return pos
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars (pos, code) {
  for (let max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break }
  }
  return pos
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack (pos, code, min) {
  if (pos <= min) { return pos }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1 }
  }
  return pos
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines (begin, end, indent, keepLastLF) {
  if (begin >= end) {
    return ''
  }

  const queue = new Array(end - begin);

  for (let i = 0, line = begin; line < end; line++, i++) {
    let lineIndent = 0;
    const lineStart = this.bMarks[line];
    let first = lineStart;
    let last;

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      const ch = this.src.charCodeAt(first);

      if (isSpace(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('')
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = Token;

// GFM table, https://github.github.com/gfm/#tables-extension-


// Limit the amount of empty autocompleted cells in a table,
// see https://github.com/markdown-it/markdown-it/issues/1000,
//
// Both pulldown-cmark and commonmark-hs limit the number of cells this way to ~200k.
// We set it to 65k, which can expand user input by a factor of x370
// (256x256 square is 1.8kB expanded into 650kB).
const MAX_AUTOCOMPLETED_CELLS = 0x10000;

function getLine (state, line) {
  const pos = state.bMarks[line] + state.tShift[line];
  const max = state.eMarks[line];

  return state.src.slice(pos, max)
}

function escapedSplit (str) {
  const result = [];
  const max = str.length;

  let pos = 0;
  let ch = str.charCodeAt(pos);
  let isEscaped = false;
  let lastPos = 0;
  let current = '';

  while (pos < max) {
    if (ch === 0x7c/* | */) {
      if (!isEscaped) {
        // pipe separating cells, '|'
        result.push(current + str.substring(lastPos, pos));
        current = '';
        lastPos = pos + 1;
      } else {
        // escaped pipe, '\|'
        current += str.substring(lastPos, pos - 1);
        lastPos = pos;
      }
    }

    isEscaped = (ch === 0x5c/* \ */);
    pos++;

    ch = str.charCodeAt(pos);
  }

  result.push(current + str.substring(lastPos));

  return result
}

function table (state, startLine, endLine, silent) {
  // should have at least two lines
  if (startLine + 2 > endLine) { return false }

  let nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  let pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false }

  const firstCh = state.src.charCodeAt(pos++);
  if (firstCh !== 0x7C/* | */ && firstCh !== 0x2D/* - */ && firstCh !== 0x3A/* : */) { return false }

  if (pos >= state.eMarks[nextLine]) { return false }

  const secondCh = state.src.charCodeAt(pos++);
  if (secondCh !== 0x7C/* | */ && secondCh !== 0x2D/* - */ && secondCh !== 0x3A/* : */ && !isSpace(secondCh)) {
    return false
  }

  // if first character is '-', then second character must not be a space
  // (due to parsing ambiguity with list)
  if (firstCh === 0x2D/* - */ && isSpace(secondCh)) { return false }

  while (pos < state.eMarks[nextLine]) {
    const ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false }

    pos++;
  }

  let lineText = getLine(state, startLine + 1);
  let columns = lineText.split('|');
  const aligns = [];
  for (let i = 0; i < columns.length; i++) {
    const t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue
      } else {
        return false
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }
  columns = escapedSplit(lineText);
  if (columns.length && columns[0] === '') columns.shift();
  if (columns.length && columns[columns.length - 1] === '') columns.pop();

  // header row will define an amount of columns in the entire table,
  // and align row should be exactly the same (the rest of the rows can differ)
  const columnCount = columns.length;
  if (columnCount === 0 || columnCount !== aligns.length) { return false }

  if (silent) { return true }

  const oldParentType = state.parentType;
  state.parentType = 'table';

  // use 'blockquote' lists for termination because it's
  // the most similar to tables
  const terminatorRules = state.md.block.ruler.getRules('blockquote');

  const token_to = state.push('table_open', 'table', 1);
  const tableLines = [startLine, 0];
  token_to.map = tableLines;

  const token_tho = state.push('thead_open', 'thead', 1);
  token_tho.map = [startLine, startLine + 1];

  const token_htro = state.push('tr_open', 'tr', 1);
  token_htro.map = [startLine, startLine + 1];

  for (let i = 0; i < columns.length; i++) {
    const token_ho = state.push('th_open', 'th', 1);
    if (aligns[i]) {
      token_ho.attrs  = [['style', 'text-align:' + aligns[i]]];
    }

    const token_il = state.push('inline', '', 0);
    token_il.content  = columns[i].trim();
    token_il.children = [];

    state.push('th_close', 'th', -1);
  }

  state.push('tr_close', 'tr', -1);
  state.push('thead_close', 'thead', -1);

  let tbodyLines;
  let autocompletedCells = 0;

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break }

    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }

    if (terminate) { break }
    lineText = getLine(state, nextLine).trim();
    if (!lineText) { break }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === '') columns.shift();
    if (columns.length && columns[columns.length - 1] === '') columns.pop();

    // note: autocomplete count can be negative if user specifies more columns than header,
    // but that does not affect intended use (which is limiting expansion)
    autocompletedCells += columnCount - columns.length;
    if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) { break }

    if (nextLine === startLine + 2) {
      const token_tbo = state.push('tbody_open', 'tbody', 1);
      token_tbo.map = tbodyLines = [startLine + 2, 0];
    }

    const token_tro = state.push('tr_open', 'tr', 1);
    token_tro.map = [nextLine, nextLine + 1];

    for (let i = 0; i < columnCount; i++) {
      const token_tdo = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token_tdo.attrs  = [['style', 'text-align:' + aligns[i]]];
      }

      const token_il = state.push('inline', '', 0);
      token_il.content  = columns[i] ? columns[i].trim() : '';
      token_il.children = [];

      state.push('td_close', 'td', -1);
    }
    state.push('tr_close', 'tr', -1);
  }

  if (tbodyLines) {
    state.push('tbody_close', 'tbody', -1);
    tbodyLines[1] = nextLine;
  }

  state.push('table_close', 'table', -1);
  tableLines[1] = nextLine;

  state.parentType = oldParentType;
  state.line = nextLine;
  return true
}

// Code block (4 spaces padded)

function code (state, startLine, endLine/*, silent */) {
  if (state.sCount[startLine] - state.blkIndent < 4) { return false }

  let nextLine = startLine + 1;
  let last = nextLine;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue
    }
    break
  }

  state.line = last;

  const token   = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + '\n';
  token.map     = [startLine, state.line];

  return true
}

// fences (``` lang, ~~~ lang)

function fence (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (pos + 3 > max) { return false }

  const marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false
  }

  // scan marker length
  let mem = pos;
  pos = state.skipChars(pos, marker);

  let len = pos - mem;

  if (len < 3) { return false }

  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);

  if (marker === 0x60 /* ` */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false
    }
  }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true }

  // search end of block
  let nextLine = startLine;
  let haveEndMarker = false;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break
    }

    if (state.src.charCodeAt(pos) !== marker) { continue }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue }

    haveEndMarker = true;
    // found!
    break
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.sCount[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  const token   = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [startLine, state.line];

  return true
}

// Block quotes


function blockquote (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  const oldLineMax = state.lineMax;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  // check the block quote marker
  if (state.src.charCodeAt(pos) !== 0x3E/* > */) { return false }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true }

  const oldBMarks  = [];
  const oldBSCount = [];
  const oldSCount  = [];
  const oldTShift  = [];

  const terminatorRules = state.md.block.ruler.getRules('blockquote');

  const oldParentType = state.parentType;
  state.parentType = 'blockquote';
  let lastLineEmpty = false;
  let nextLine;

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    const isOutdented = state.sCount[nextLine] < state.blkIndent;

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
      // This line is inside the blockquote.

      // set offset past spaces and ">"
      let initial = state.sCount[nextLine] + 1;
      let spaceAfterMarker;
      let adjustTab;

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      let offset = initial;
      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        const ch = state.src.charCodeAt(pos);

        if (isSpace(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break
        }

        pos++;
      }

      lastLineEmpty = pos >= max;

      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break }

    // Case 3: another tag found.
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);

    // A negative indentation means that this is a paragraph continuation
    //
    state.sCount[nextLine] = -1;
  }

  const oldIndent = state.blkIndent;
  state.blkIndent = 0;

  const token_o  = state.push('blockquote_open', 'blockquote', 1);
  token_o.markup = '>';
  const lines = [startLine, 0];
  token_o.map    = lines;

  state.md.block.tokenize(state, startLine, nextLine);

  const token_c  = state.push('blockquote_close', 'blockquote', -1);
  token_c.markup = '>';

  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (let i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;

  return true
}

// Horizontal rule


function hr (state, startLine, endLine, silent) {
  const max = state.eMarks[startLine];
  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  let pos = state.bMarks[startLine] + state.tShift[startLine];
  const marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false
  }

  // markers can be mixed with spaces, but there should be at least 3 of them

  let cnt = 1;
  while (pos < max) {
    const ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace(ch)) { return false }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false }

  if (silent) { return true }

  state.line = startLine + 1;

  const token  = state.push('hr', 'hr', 0);
  token.map    = [startLine, state.line];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true
}

// Lists


// Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipBulletListMarker (state, startLine) {
  const max = state.eMarks[startLine];
  let pos = state.bMarks[startLine] + state.tShift[startLine];

  const marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1
  }

  if (pos < max) {
    const ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " -test " - is not a list item
      return -1
    }
  }

  return pos
}

// Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipOrderedListMarker (state, startLine) {
  const start = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  let pos = start;

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1 }

  let ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1 }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1 }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {
      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) { return -1 }

      continue
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break
    }

    return -1
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace(ch)) {
      // " 1.test " - is not a list item
      return -1
    }
  }
  return pos
}

function markTightParagraphs (state, idx) {
  const level = state.level + 2;

  for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}

function list (state, startLine, endLine, silent) {
  let max, pos, start, token;
  let nextLine = startLine;
  let tight = true;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false }

  // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation
  if (state.listIndent >= 0 &&
      state.sCount[nextLine] - state.listIndent >= 4 &&
      state.sCount[nextLine] < state.blkIndent) {
    return false
  }

  let isTerminatingParagraph = false;

  // limit conditions when list can interrupt
  // a paragraph (validation mode only)
  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }

  // Detect list type and position after marker
  let isOrdered;
  let markerValue;
  let posAfterMarker;
  if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[nextLine] + state.tShift[nextLine];
    markerValue = Number(state.src.slice(start, posAfterMarker - 1));

    // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.
    if (isTerminatingParagraph && markerValue !== 1) return false
  } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
    isOrdered = false;
  } else {
    return false
  }

  // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false
  }

  // For validation mode we can terminate immediately
  if (silent) { return true }

  // We should terminate list on style change. Remember first one to compare.
  const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // Start list
  const listTokIdx = state.tokens.length;

  if (isOrdered) {
    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue !== 1) {
      token.attrs = [['start', markerValue]];
    }
  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  const listLines = [nextLine, 0];
  token.map    = listLines;
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  let prevEmptyEnd = false;
  const terminatorRules = state.md.block.ruler.getRules('list');

  const oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];

    const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
    let offset = initial;

    while (pos < max) {
      const ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break
      }

      pos++;
    }

    const contentStart = pos;
    let indentAfterMarker;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    const indent = initial + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    const itemLines = [nextLine, 0];
    token.map    = itemLines;
    if (isOrdered) {
      token.info = state.src.slice(start, posAfterMarker - 1);
    }

    // change current state, then restore it after parser subcall
    const oldTight = state.tight;
    const oldTShift = state.tShift[nextLine];
    const oldSCount = state.sCount[nextLine];

    //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //
    const oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;

    state.tight = true;
    state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
    state.sCount[nextLine] = offset;

    if (contentStart >= max && state.isEmpty(nextLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, nextLine, endLine, true);
    }

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - nextLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[nextLine] = oldTShift;
    state.sCount[nextLine] = oldSCount;
    state.tight = oldTight;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = state.line;
    itemLines[1] = nextLine;

    if (nextLine >= endLine) { break }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.sCount[nextLine] < state.blkIndent) { break }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break }

    // fail if terminating block found
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }
    if (terminate) { break }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break }
  }

  // Finalize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  state.parentType = oldParentType;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true
}

function reference (state, startLine, _endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  let nextLine = startLine + 1;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false }

  function getNextLine (nextLine) {
    const endLine = state.lineMax;

    if (nextLine >= endLine || state.isEmpty(nextLine)) {
      // empty line or end of input
      return null
    }

    let isContinuation = false;

    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { isContinuation = true; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { isContinuation = true; }

    if (!isContinuation) {
      const terminatorRules = state.md.block.ruler.getRules('reference');
      const oldParentType = state.parentType;
      state.parentType = 'reference';

      // Some tags can terminate paragraph without empty line.
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break
        }
      }

      state.parentType = oldParentType;
      if (terminate) {
        // terminated by another block
        return null
      }
    }

    const pos = state.bMarks[nextLine] + state.tShift[nextLine];
    const max = state.eMarks[nextLine];

    // max + 1 explicitly includes the newline
    return state.src.slice(pos, max + 1)
  }

  let str = state.src.slice(pos, max + 1);

  max = str.length;
  let labelEnd = -1;

  for (pos = 1; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break
    } else if (ch === 0x0A /* \n */) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (isSpace(ch)) ; else {
      break
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!destRes.ok) { return false }

  const href = state.md.normalizeLink(destRes.str);
  if (!state.md.validateLink(href)) { return false }

  pos = destRes.pos;

  // save cursor state, we could require to rollback later
  const destEndPos = pos;
  const destEndLineNo = nextLine;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  const start = pos;
  for (; pos < max; pos++) {
    const ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      const lineContent = getNextLine(nextLine);
      if (lineContent !== null) {
        str += lineContent;
        max = str.length;
        nextLine++;
      }
    } else if (isSpace(ch)) ; else {
      break
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
  while (titleRes.can_continue) {
    const lineContent = getNextLine(nextLine);
    if (lineContent === null) break
    str += lineContent;
    pos = max;
    max = str.length;
    nextLine++;
    titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
  }
  let title;

  if (pos < max && start !== pos && titleRes.ok) {
    title = titleRes.str;
    pos = titleRes.pos;
  } else {
    title = '';
    pos = destEndPos;
    nextLine = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max) {
    const ch = str.charCodeAt(pos);
    if (!isSpace(ch)) { break }
    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      nextLine = destEndLineNo;
      while (pos < max) {
        const ch = str.charCodeAt(pos);
        if (!isSpace(ch)) { break }
        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false
  }

  const label = normalizeReference(str.slice(1, labelEnd));
  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false
  }

  // Reference can not terminate anything. This check is for safety only.
  /* istanbul ignore if */
  if (silent) { return true }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title, href };
  }

  state.line = nextLine;
  return true
}

// List of valid html blocks names, according to commonmark spec
// https://spec.commonmark.org/0.30/#html-blocks

var block_names = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'search',
  'section',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

// Regexps to match html elements

const attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

const unquoted      = '[^"\'=<>`\\x00-\\x20]+';
const single_quoted = "'[^']*'";
const double_quoted = '"[^"]*"';

const attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

const attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

const open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

const close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
const comment     = '<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->';
const processing  = '<[?][\\s\\S]*?[?]>';
const declaration = '<![A-Za-z][^>]*>';
const cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

const HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');
const HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

// HTML block


// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//
const HTML_SEQUENCES = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
  [/^<!--/,        /-->/,   true],
  [/^<\?/,         /\?>/,   true],
  [/^<![A-Z]/,     />/,     true],
  [/^<!\[CDATA\[/, /\]\]>/, true],
  [new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true],
  [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false]
];

function html_block (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  if (!state.md.options.html) { return false }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false }

  let lineText = state.src.slice(pos, max);

  let i = 0;
  for (; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break }
  }
  if (i === HTML_SEQUENCES.length) { return false }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2]
  }

  let nextLine = startLine + 1;

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++; }
        break
      }
    }
  }

  state.line = nextLine;

  const token   = state.push('html_block', '', 0);
  token.map     = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true
}

// heading (#, ##, ...)


function heading (state, startLine, endLine, silent) {
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  let ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false }

  // count heading level
  let level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && !isSpace(ch))) { return false }

  if (silent) { return true }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipSpacesBack(max, pos);
  const tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  const token_o  = state.push('heading_open', 'h' + String(level), 1);
  token_o.markup = '########'.slice(0, level);
  token_o.map    = [startLine, state.line];

  const token_i    = state.push('inline', '', 0);
  token_i.content  = state.src.slice(pos, max).trim();
  token_i.map      = [startLine, state.line];
  token_i.children = [];

  const token_c  = state.push('heading_close', 'h' + String(level), -1);
  token_c.markup = '########'.slice(0, level);

  return true
}

// lheading (---, ===)

function lheading (state, startLine, endLine/*, silent */) {
  const terminatorRules = state.md.block.ruler.getRules('paragraph');

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false }

  const oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

  // jump line-by-line until empty one or EOF
  let level = 0;
  let marker;
  let nextLine = startLine + 1;

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue }

    //
    // Check for underline in setext header
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = (marker === 0x3D/* = */ ? 1 : 2);
            break
          }
        }
      }
    }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue }

    // Some tags can terminate paragraph without empty line.
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }
    if (terminate) { break }
  }

  if (!level) {
    // Didn't find valid underline
    return false
  }

  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine + 1;

  const token_o    = state.push('heading_open', 'h' + String(level), 1);
  token_o.markup   = String.fromCharCode(marker);
  token_o.map      = [startLine, state.line];

  const token_i    = state.push('inline', '', 0);
  token_i.content  = content;
  token_i.map      = [startLine, state.line - 1];
  token_i.children = [];

  const token_c    = state.push('heading_close', 'h' + String(level), -1);
  token_c.markup   = String.fromCharCode(marker);

  state.parentType = oldParentType;

  return true
}

// Paragraph

function paragraph (state, startLine, endLine) {
  const terminatorRules = state.md.block.ruler.getRules('paragraph');
  const oldParentType = state.parentType;
  let nextLine = startLine + 1;
  state.parentType = 'paragraph';

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue }

    // Some tags can terminate paragraph without empty line.
    let terminate = false;
    for (let i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break
      }
    }
    if (terminate) { break }
  }

  const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  const token_o    = state.push('paragraph_open', 'p', 1);
  token_o.map      = [startLine, state.line];

  const token_i    = state.push('inline', '', 0);
  token_i.content  = content;
  token_i.map      = [startLine, state.line];
  token_i.children = [];

  state.push('paragraph_close', 'p', -1);

  state.parentType = oldParentType;

  return true
}

/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/


const _rules$1 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ['table',      table,      ['paragraph', 'reference']],
  ['code',       code],
  ['fence',      fence,      ['paragraph', 'reference', 'blockquote', 'list']],
  ['blockquote', blockquote, ['paragraph', 'reference', 'blockquote', 'list']],
  ['hr',         hr,         ['paragraph', 'reference', 'blockquote', 'list']],
  ['list',       list,       ['paragraph', 'reference', 'blockquote']],
  ['reference',  reference],
  ['html_block', html_block, ['paragraph', 'reference', 'blockquote']],
  ['heading',    heading,    ['paragraph', 'reference', 'blockquote']],
  ['lheading',   lheading],
  ['paragraph',  paragraph]
];

/**
 * new ParserBlock()
 **/
function ParserBlock () {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new Ruler();

  for (let i = 0; i < _rules$1.length; i++) {
    this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
  }
}

// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  const rules = this.ruler.getRules('');
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  let line = startLine;
  let hasEmptyLines = false;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.sCount[line] < state.blkIndent) { break }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true
    const prevLine = state.line;
    let ok = false;

    for (let i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) {
        if (prevLine >= state.line) {
          throw new Error("block rule didn't increment state.line")
        }
        break
      }
    }

    // this can only happen if user disables paragraph rule
    if (!ok) throw new Error('none of the block rules matched')

    // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};

/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  if (!src) { return }

  const state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};

ParserBlock.prototype.State = StateBlock;

// Inline parser state


function StateInline (src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).
  this.cache = {};

  // List of emphasis-like delimiters for current tag
  this.delimiters = [];

  // Stack of delimiter lists for upper level tags
  this._prev_delimiters = [];

  // backtick length => last seen position
  this.backticks = {};
  this.backticksScanned = false;

  // Counter used to disable inline linkify-it execution
  // inside <a> and markdown links
  this.linkLevel = 0;
}

// Flush pending text
//
StateInline.prototype.pushPending = function () {
  const token = new Token('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token
};

// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  const token = new Token(type, tag, nesting);
  let token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token
};

// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline.prototype.scanDelims = function (start, canSplitWord) {
  const max = this.posMax;
  const marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  let pos = start;
  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  const count = pos - start;

  // treat end of the line as a whitespace
  const nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

  const isLastWhiteSpace = isWhiteSpace(lastChar);
  const isNextWhiteSpace = isWhiteSpace(nextChar);

  const left_flanking =
    !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
  const right_flanking =
    !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);

  const can_open  = left_flanking  && (canSplitWord || !right_flanking || isLastPunctChar);
  const can_close = right_flanking && (canSplitWord || !left_flanking  || isNextPunctChar);

  return { can_open, can_close, length: count }
};

// re-export Token class to use in block rules
StateInline.prototype.Token = Token;

// Skip text characters for text token, place those to pending buffer
// and increment current pos

// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar (ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true
    default:
      return false
  }
}

function text (state, silent) {
  let pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true
}

// Alternative implementation, for memory.
//
// It costs 10% of performance, but allows extend terminators list, if place it
// to `ParserInline` property. Probably, will switch to it sometime, such
// flexibility required.

/*
var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

module.exports = function text(state, silent) {
  var pos = state.pos,
      idx = state.src.slice(pos).search(TERMINATOR_RE);

  // first char is terminator -> empty text
  if (idx === 0) { return false; }

  // no terminator -> text till end of string
  if (idx < 0) {
    if (!silent) { state.pending += state.src.slice(pos); }
    state.pos = state.src.length;
    return true;
  }

  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

  state.pos += idx;

  return true;
}; */

// Process links like https://example.org/

// RFC3986: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
const SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;

function linkify (state, silent) {
  if (!state.md.options.linkify) return false
  if (state.linkLevel > 0) return false

  const pos = state.pos;
  const max = state.posMax;

  if (pos + 3 > max) return false
  if (state.src.charCodeAt(pos) !== 0x3A/* : */) return false
  if (state.src.charCodeAt(pos + 1) !== 0x2F/* / */) return false
  if (state.src.charCodeAt(pos + 2) !== 0x2F/* / */) return false

  const match = state.pending.match(SCHEME_RE);
  if (!match) return false

  const proto = match[1];

  const link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
  if (!link) return false

  let url = link.url;

  // invalid link, but still detected by linkify somehow;
  // need to check to prevent infinite loop below
  if (url.length <= proto.length) return false

  // disallow '*' at the end of the link (conflicts with emphasis)
  url = url.replace(/\*+$/, '');

  const fullUrl = state.md.normalizeLink(url);
  if (!state.md.validateLink(fullUrl)) return false

  if (!silent) {
    state.pending = state.pending.slice(0, -proto.length);

    const token_o = state.push('link_open', 'a', 1);
    token_o.attrs = [['href', fullUrl]];
    token_o.markup = 'linkify';
    token_o.info = 'auto';

    const token_t = state.push('text', '', 0);
    token_t.content = state.md.normalizeLinkText(url);

    const token_c = state.push('link_close', 'a', -1);
    token_c.markup = 'linkify';
    token_c.info = 'auto';
  }

  state.pos += url.length - proto.length;
  return true
}

// Proceess '\n'


function newline (state, silent) {
  let pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false }

  const pmax = state.pending.length - 1;
  const max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        // Find whitespaces tail of pending chars.
        let ws = pmax - 1;
        while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 0x20) ws--;

        state.pending = state.pending.slice(0, ws);
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }
    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && isSpace(state.src.charCodeAt(pos))) { pos++; }

  state.pos = pos;
  return true
}

// Process escaped chars and hardbreaks


const ESCAPED = [];

for (let i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });

function escape (state, silent) {
  let pos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) return false
  pos++;

  // '\' at the end of the inline block
  if (pos >= max) return false

  let ch1 = state.src.charCodeAt(pos);

  if (ch1 === 0x0A) {
    if (!silent) {
      state.push('hardbreak', 'br', 0);
    }

    pos++;
    // skip leading whitespaces from next line
    while (pos < max) {
      ch1 = state.src.charCodeAt(pos);
      if (!isSpace(ch1)) break
      pos++;
    }

    state.pos = pos;
    return true
  }

  let escapedStr = state.src[pos];

  if (ch1 >= 0xD800 && ch1 <= 0xDBFF && pos + 1 < max) {
    const ch2 = state.src.charCodeAt(pos + 1);

    if (ch2 >= 0xDC00 && ch2 <= 0xDFFF) {
      escapedStr += state.src[pos + 1];
      pos++;
    }
  }

  const origStr = '\\' + escapedStr;

  if (!silent) {
    const token = state.push('text_special', '', 0);

    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
      token.content = escapedStr;
    } else {
      token.content = origStr;
    }

    token.markup = origStr;
    token.info   = 'escape';
  }

  state.pos = pos + 1;
  return true
}

// Parse backticks

function backtick (state, silent) {
  let pos = state.pos;
  const ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false }

  const start = pos;
  pos++;
  const max = state.posMax;

  // scan marker length
  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  const marker = state.src.slice(start, pos);
  const openerLength = marker.length;

  if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true
  }

  let matchEnd = pos;
  let matchStart;

  // Nothing found in the cache, scan until the end of the line (or until marker is found)
  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    // scan marker length
    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    const closerLength = matchEnd - matchStart;

    if (closerLength === openerLength) {
      // Found matching closer length.
      if (!silent) {
        const token = state.push('code_inline', 'code', 0);
        token.markup = marker;
        token.content = state.src.slice(pos, matchStart)
          .replace(/\n/g, ' ')
          .replace(/^ (.+) $/, '$1');
      }
      state.pos = matchEnd;
      return true
    }

    // Some different length found, put it in cache as upper limit of where closer can be found
    state.backticks[closerLength] = matchStart;
  }

  // Scanned through the end, didn't find anything
  state.backticksScanned = true;

  if (!silent) state.pending += marker;
  state.pos += openerLength;
  return true
}

// ~~strike through~~
//

// Insert each marker as a separate text token, and add it to delimiter list
//
function strikethrough_tokenize (state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);

  if (silent) { return false }

  if (marker !== 0x7E/* ~ */) { return false }

  const scanned = state.scanDelims(state.pos, true);
  let len = scanned.length;
  const ch = String.fromCharCode(marker);

  if (len < 2) { return false }

  let token;

  if (len % 2) {
    token         = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (let i = 0; i < len; i += 2) {
    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker,
      length: 0,     // disable "rule of 3" length checks meant for emphasis
      token: state.tokens.length - 1,
      end: -1,
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true
}

function postProcess$2 (state, delimiters) {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;

  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E/* ~ */) {
      continue
    }

    if (startDelim.end === -1) {
      continue
    }

    const endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 's_open';
    token.tag     = 's';
    token.nesting = 1;
    token.markup  = '~~';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 's_close';
    token.tag     = 's';
    token.nesting = -1;
    token.markup  = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' &&
        state.tokens[endDelim.token - 1].content === '~') {
      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    const i = loneMarkers.pop();
    let j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}

// Walk through delimiter list and replace text tokens with tags
//
function strikethrough_postProcess (state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;

  postProcess$2(state, state.delimiters);

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess$2(state, tokens_meta[curr].delimiters);
    }
  }
}

var r_strikethrough = {
  tokenize: strikethrough_tokenize,
  postProcess: strikethrough_postProcess
};

// Process *this* and _that_
//

// Insert each marker as a separate text token, and add it to delimiter list
//
function emphasis_tokenize (state, silent) {
  const start = state.pos;
  const marker = state.src.charCodeAt(start);

  if (silent) { return false }

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false }

  const scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (let i = 0; i < scanned.length; i++) {
    const token = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // A position of the token this delimiter corresponds to.
      //
      token: state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: scanned.can_open,
      close: scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true
}

function postProcess$1 (state, delimiters) {
  const max = delimiters.length;

  for (let i = max - 1; i >= 0; i--) {
    const startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
      continue
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue
    }

    const endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    const isStrong = i > 0 &&
               delimiters[i - 1].end === startDelim.end + 1 &&
               // check that first two markers match and adjacent
               delimiters[i - 1].marker === startDelim.marker &&
               delimiters[i - 1].token === startDelim.token - 1 &&
               // check that last two markers are adjacent (we can safely assume they match)
               delimiters[startDelim.end + 1].token === endDelim.token + 1;

    const ch = String.fromCharCode(startDelim.marker);

    const token_o   = state.tokens[startDelim.token];
    token_o.type    = isStrong ? 'strong_open' : 'em_open';
    token_o.tag     = isStrong ? 'strong' : 'em';
    token_o.nesting = 1;
    token_o.markup  = isStrong ? ch + ch : ch;
    token_o.content = '';

    const token_c   = state.tokens[endDelim.token];
    token_c.type    = isStrong ? 'strong_close' : 'em_close';
    token_c.tag     = isStrong ? 'strong' : 'em';
    token_c.nesting = -1;
    token_c.markup  = isStrong ? ch + ch : ch;
    token_c.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
}

// Walk through delimiter list and replace text tokens with tags
//
function emphasis_post_process (state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;

  postProcess$1(state, state.delimiters);

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess$1(state, tokens_meta[curr].delimiters);
    }
  }
}

var r_emphasis = {
  tokenize: emphasis_tokenize,
  postProcess: emphasis_post_process
};

// Process [link](<to> "stuff")


function link (state, silent) {
  let code, label, res, ref;
  let href = '';
  let title = '';
  let start = state.pos;
  let parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false }

  const oldPos = state.pos;
  const max = state.posMax;
  const labelStart = state.pos + 1;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false }

  let pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break }
    }
    if (pos >= max) { return false }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 0x0A) { break }
        }
      }
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    const token_o = state.push('link_open', 'a', 1);
    const attrs = [['href', href]];
    token_o.attrs  = attrs;
    if (title) {
      attrs.push(['title', title]);
    }

    state.linkLevel++;
    state.md.inline.tokenize(state);
    state.linkLevel--;

    state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true
}

// Process ![image](<src> "title")


function image (state, silent) {
  let code, content, label, pos, ref, res, title, start;
  let href = '';
  const oldPos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false }

  const labelStart = state.pos + 2;
  const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break }
    }
    if (pos >= max) { return false }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace(code) && code !== 0x0A) { break }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace(code) && code !== 0x0A) { break }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);

    const tokens = [];
    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens
    );

    const token = state.push('image', 'img', 0);
    const attrs = [['src', href], ['alt', '']];
    token.attrs = attrs;
    token.children = tokens;
    token.content = content;

    if (title) {
      attrs.push(['title', title]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true
}

// Process autolinks '<protocol:...>'

/* eslint max-len:0 */
const EMAIL_RE    = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
/* eslint-disable-next-line no-control-regex */
const AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;

function autolink (state, silent) {
  let pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false }

  const start = state.pos;
  const max = state.posMax;

  for (;;) {
    if (++pos >= max) return false

    const ch = state.src.charCodeAt(pos);

    if (ch === 0x3C /* < */) return false
    if (ch === 0x3E /* > */) break
  }

  const url = state.src.slice(start + 1, pos);

  if (AUTOLINK_RE.test(url)) {
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false }

    if (!silent) {
      const token_o   = state.push('link_open', 'a', 1);
      token_o.attrs   = [['href', fullUrl]];
      token_o.markup  = 'autolink';
      token_o.info    = 'auto';

      const token_t   = state.push('text', '', 0);
      token_t.content = state.md.normalizeLinkText(url);

      const token_c   = state.push('link_close', 'a', -1);
      token_c.markup  = 'autolink';
      token_c.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true
  }

  if (EMAIL_RE.test(url)) {
    const fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false }

    if (!silent) {
      const token_o   = state.push('link_open', 'a', 1);
      token_o.attrs   = [['href', fullUrl]];
      token_o.markup  = 'autolink';
      token_o.info    = 'auto';

      const token_t   = state.push('text', '', 0);
      token_t.content = state.md.normalizeLinkText(url);

      const token_c   = state.push('link_close', 'a', -1);
      token_c.markup  = 'autolink';
      token_c.info    = 'auto';
    }

    state.pos += url.length + 2;
    return true
  }

  return false
}

// Process html tags


function isLinkOpen (str) {
  return /^<a[>\s]/i.test(str)
}
function isLinkClose (str) {
  return /^<\/a\s*>/i.test(str)
}

function isLetter (ch) {
  /* eslint no-bitwise:0 */
  const lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */)
}

function html_inline (state, silent) {
  if (!state.md.options.html) { return false }

  // Check start
  const max = state.posMax;
  const pos = state.pos;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false
  }

  // Quick fail on second char
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false
  }

  const match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) { return false }

  if (!silent) {
    const token = state.push('html_inline', '', 0);
    token.content = match[0];

    if (isLinkOpen(token.content))  state.linkLevel++;
    if (isLinkClose(token.content)) state.linkLevel--;
  }
  state.pos += match[0].length;
  return true
}

// Process html entity - &#123;, &#xAF;, &quot;, ...


const DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
const NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;

function entity (state, silent) {
  const pos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) return false

  if (pos + 1 >= max) return false

  const ch = state.src.charCodeAt(pos + 1);

  if (ch === 0x23 /* # */) {
    const match = state.src.slice(pos).match(DIGITAL_RE);
    if (match) {
      if (!silent) {
        const code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);

        const token   = state.push('text_special', '', 0);
        token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
        token.markup  = match[0];
        token.info    = 'entity';
      }
      state.pos += match[0].length;
      return true
    }
  } else {
    const match = state.src.slice(pos).match(NAMED_RE);
    if (match) {
      const decoded = decodeHTML(match[0]);
      if (decoded !== match[0]) {
        if (!silent) {
          const token   = state.push('text_special', '', 0);
          token.content = decoded;
          token.markup  = match[0];
          token.info    = 'entity';
        }
        state.pos += match[0].length;
        return true
      }
    }
  }

  return false
}

// For each opening emphasis-like marker find a matching closing one
//

function processDelimiters (delimiters) {
  const openersBottom = {};
  const max = delimiters.length;

  if (!max) return

  // headerIdx is the first delimiter of the current (where closer is) delimiter run
  let headerIdx = 0;
  let lastTokenIdx = -2; // needs any value lower than -1
  const jumps = [];

  for (let closerIdx = 0; closerIdx < max; closerIdx++) {
    const closer = delimiters[closerIdx];

    jumps.push(0);

    // markers belong to same delimiter run if:
    //  - they have adjacent tokens
    //  - AND markers are the same
    //
    if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
      headerIdx = closerIdx;
    }

    lastTokenIdx = closer.token;

    // Length is only used for emphasis-specific "rule of 3",
    // if it's not defined (in strikethrough or 3rd party plugins),
    // we can default it to 0 to disable those checks.
    //
    closer.length = closer.length || 0;

    if (!closer.close) continue

    // Previously calculated lower bounds (previous fails)
    // for each marker, each delimiter length modulo 3,
    // and for whether this closer can be an opener;
    // https://github.com/commonmark/cmark/commit/34250e12ccebdc6372b8b49c44fab57c72443460
    /* eslint-disable-next-line no-prototype-builtins */
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
    }

    const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length % 3)];

    let openerIdx = headerIdx - jumps[headerIdx] - 1;

    let newMinOpenerIdx = openerIdx;

    for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
      const opener = delimiters[openerIdx];

      if (opener.marker !== closer.marker) continue

      if (opener.open && opener.end < 0) {
        let isOddMatch = false;

        // from spec:
        //
        // If one of the delimiters can both open and close emphasis, then the
        // sum of the lengths of the delimiter runs containing the opening and
        // closing delimiters must not be a multiple of 3 unless both lengths
        // are multiples of 3.
        //
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }

        if (!isOddMatch) {
          // If previous delimiter cannot be an opener, we can safely skip
          // the entire sequence in future checks. This is required to make
          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
          //
          const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open
            ? jumps[openerIdx - 1] + 1
            : 0;

          jumps[closerIdx] = closerIdx - openerIdx + lastJump;
          jumps[openerIdx] = lastJump;

          closer.open  = false;
          opener.end   = closerIdx;
          opener.close = false;
          newMinOpenerIdx = -1;
          // treat next token as start of run,
          // it optimizes skips in **<...>**a**<...>** pathological case
          lastTokenIdx = -2;
          break
        }
      }
    }

    if (newMinOpenerIdx !== -1) {
      // If match for this delimiter run failed, we want to set lower bound for
      // future lookups. This is required to make sure algorithm has linear
      // complexity.
      //
      // See details here:
      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
      //
      openersBottom[closer.marker][(closer.open ? 3 : 0) + ((closer.length || 0) % 3)] = newMinOpenerIdx;
    }
  }
}

function link_pairs (state) {
  const tokens_meta = state.tokens_meta;
  const max = state.tokens_meta.length;

  processDelimiters(state.delimiters);

  for (let curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(tokens_meta[curr].delimiters);
    }
  }
}

// Clean up tokens after emphasis and strikethrough postprocessing:
// merge adjacent text nodes into one and re-calculate all token levels
//
// This is necessary because initially emphasis delimiter markers (*, _, ~)
// are treated as their own separate text tokens. Then emphasis rule either
// leaves them as text (needed to merge with adjacent text) or turns them
// into opening/closing tags (which messes up levels inside).
//

function fragments_join (state) {
  let curr, last;
  let level = 0;
  const tokens = state.tokens;
  const max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' &&
        curr + 1 < max &&
        tokens[curr + 1].type === 'text') {
      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) { tokens[last] = tokens[curr]; }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
}

/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/


// Parser rules

const _rules = [
  ['text',            text],
  ['linkify',         linkify],
  ['newline',         newline],
  ['escape',          escape],
  ['backticks',       backtick],
  ['strikethrough',   r_strikethrough.tokenize],
  ['emphasis',        r_emphasis.tokenize],
  ['link',            link],
  ['image',           image],
  ['autolink',        autolink],
  ['html_inline',     html_inline],
  ['entity',          entity]
];

// `rule2` ruleset was created specifically for emphasis/strikethrough
// post-processing and may be changed in the future.
//
// Don't use this for anything except pairs (plugins working with `balance_pairs`).
//
const _rules2 = [
  ['balance_pairs',   link_pairs],
  ['strikethrough',   r_strikethrough.postProcess],
  ['emphasis',        r_emphasis.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ['fragments_join',  fragments_join]
];

/**
 * new ParserInline()
 **/
function ParserInline () {
  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new Ruler();

  for (let i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/
  this.ruler2 = new Ruler();

  for (let i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}

// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  const pos = state.pos;
  const rules = this.ruler.getRules('');
  const len = rules.length;
  const maxNesting = state.md.options.maxNesting;
  const cache = state.cache;

  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return
  }

  let ok = false;

  if (state.level < maxNesting) {
    for (let i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) {
        if (pos >= state.pos) { throw new Error("inline rule didn't increment state.pos") }
        break
      }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) { state.pos++; }
  cache[pos] = state.pos;
};

// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  const rules = this.ruler.getRules('');
  const len = rules.length;
  const end = state.posMax;
  const maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true
    const prevPos = state.pos;
    let ok = false;

    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) {
          if (prevPos >= state.pos) { throw new Error("inline rule didn't increment state.pos") }
          break
        }
      }
    }

    if (ok) {
      if (state.pos >= end) { break }
      continue
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};

/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  const state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  const rules = this.ruler2.getRules('');
  const len = rules.length;

  for (let i = 0; i < len; i++) {
    rules[i](state);
  }
};

ParserInline.prototype.State = StateInline;

function reFactory (opts) {
  const re = {};
  opts = opts || {};

  re.src_Any = Any.source;
  re.src_Cc = Cc.source;
  re.src_Z = Z.source;
  re.src_P = P.source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [re.src_Z, re.src_Cc].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  const text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')' +
    '(?!' + (opts['---'] ? '-(?!--)|' : '-|') + '_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-;]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +

          // allow `I'm_king` if no pair found
          "\\'(?=" + re.src_pseudo_letter + '|[-])|' +

          // google has many dots in "google search" links (#66, #81).
          // github has ... in commit range links,
          // Restrict to
          // - english
          // - percent-encoded
          // - parts of file path
          // - params separator
          // until more examples found.
          '\\.{2,}[a-zA-Z0-9%/&]|' +

          '\\.(?!' + re.src_ZCc + '|[.]|$)|' +
          (opts['---']
            ? '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            : '\\-+|'
          ) +
          // allow `,,,` in paths
          ',(?!' + re.src_ZCc + '|$)|' +

          // allow `;` if not followed by space-like char
          ';(?!' + re.src_ZCc + '|$)|' +

          // allow `!!!` in paths, but not at the end
          '\\!+(?!' + re.src_ZCc + '|[!]|$)|' +

          '\\?(?!' + re.src_ZCc + '|[?]|$)' +
        ')+' +
      '|\\/' +
    ')?';

  // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common
  re.src_email_name =

    '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/* _root */ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;

  //
  // Main rules
  //

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
      '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re
}

//
// Helpers
//

// Merge objects
//
function assign (obj /* from1, from2, from3, ... */) {
  const sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj
}

function _class (obj) { return Object.prototype.toString.call(obj) }
function isString (obj) { return _class(obj) === '[object String]' }
function isObject (obj) { return _class(obj) === '[object Object]' }
function isRegExp (obj) { return _class(obj) === '[object RegExp]' }
function isFunction (obj) { return _class(obj) === '[object Function]' }

function escapeRE (str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&') }

//

const defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};

function isOptionsObj (obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    /* eslint-disable-next-line no-prototype-builtins */
    return acc || defaultOptions.hasOwnProperty(k)
  }, false)
}

const defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http = new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length
      }
      return 0
    }
  },
  'https:': 'http:',
  'ftp:': 'http:',
  '//': {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http = new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0 }
        if (pos >= 3 && text[pos - 3] === '/') { return 0 }
        return tail.match(self.re.no_http)[0].length
      }
      return 0
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      const tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto = new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length
      }
      return 0
    }
  }
};

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
/* eslint-disable-next-line max-len */
const tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
const tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

function resetScanCache (self) {
  self.__index__ = -1;
  self.__text_cache__ = '';
}

function createValidator (re) {
  return function (text, pos) {
    const tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length
    }
    return 0
  }
}

function createNormalizer () {
  return function (match, self) {
    self.normalize(match);
  }
}

// Schemas compiler. Build regexps.
//
function compile (self) {
  // Load & clone RE patterns.
  const re = self.re = reFactory(self.__opts__);

  // Define dynamic patterns
  const tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re.src_xn);

  re.src_tlds = tlds.join('|');

  function untpl (tpl) { return tpl.replace('%TLDS%', re.src_tlds) }

  re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), 'i');
  re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), 'i');
  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
  re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  const aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError (name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val)
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    const val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return }

    const compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return
    }

    if (isString(val)) {
      aliases.push(name);
      return
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  const slist = Object.keys(self.__compiled__)
    .filter(function (name) {
      // Filter disabled & fake schemas
      return name.length > 0 && self.__compiled__[name]
    })
    .map(escapeRE)
    .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');
  self.re.schema_at_start = RegExp('^' + self.re.schema_search.source, 'i');

  self.re.pretest = RegExp(
    '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
    'i'
  );

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match (self, shift) {
  const start = self.__index__;
  const end = self.__last_index__;
  const text = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url = text;
}

function createMatch (self, shift) {
  const match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match
}

/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt (schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options)
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__ = assign({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__ = -1;
  this.__last_index__ = -1; // Next scan position
  this.__schema__ = '';
  this.__text_cache__ = '';

  this.__schemas__ = assign({}, defaultSchemas, schemas);
  this.__compiled__ = {};

  this.__tlds__ = tlds_default;
  this.__tlds_replaced__ = false;

  this.re = {};

  compile(this);
}

/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add (schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this
};

/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set (options) {
  this.__opts__ = assign(this.__opts__, options);
  return this
};

/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test (text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__ = -1;

  if (!text.length) { return false }

  let m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__ = m[2];
        this.__index__ = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__ = '';
            this.__index__ = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {
        shift = me.index + me[1].length;
        next = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__ = 'mailto:';
          this.__index__ = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0
};

/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest (text) {
  return this.re.pretest.test(text)
};

/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt (text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this)
};

/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match (text) {
  const result = [];
  let shift = 0;

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  let tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result
  }

  return null
};

/**
 * LinkifyIt#matchAtStart(text) -> Match|null
 *
 * Returns fully-formed (not fuzzy) link if it starts at the beginning
 * of the string, and null otherwise.
 **/
LinkifyIt.prototype.matchAtStart = function matchAtStart (text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__ = -1;

  if (!text.length) return null

  const m = this.re.schema_at_start.exec(text);
  if (!m) return null

  const len = this.testSchemaAt(text, m[2], m[0].length);
  if (!len) return null

  this.__schema__ = m[2];
  this.__index__ = m.index + m[1].length;
  this.__last_index__ = m.index + m[0].length + len;

  return createMatch(this, 0)
};

/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds (list, keepOld) {
  list = Array.isArray(list) ? list : [list];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this
  }

  this.__tlds__ = this.__tlds__.concat(list)
    .sort()
    .filter(function (el, idx, arr) {
      return el !== arr[idx - 1]
    })
    .reverse();

  compile(this);
  return this
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize (match) {
  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};

/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile () {
};

/*! https://mths.be/punycode v1.4.1 by @mathias */


/** Highest positive signed 32-bit float value */
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
  'overflow': 'Overflow: input needs wider integers to process',
  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
  throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
  var length = array.length;
  var result = [];
  while (length--) {
    result[length] = fn(array[length]);
  }
  return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
  var parts = string.split('@');
  var result = '';
  if (parts.length > 1) {
    // In email addresses, only the domain name should be punycoded. Leave
    // the local part (i.e. everything up to `@`) intact.
    result = parts[0] + '@';
    string = parts[1];
  }
  // Avoid `split(regex)` for IE8 compatibility. See #17.
  string = string.replace(regexSeparators, '\x2E');
  var labels = string.split('.');
  var encoded = map(labels, fn).join('.');
  return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
  var output = [],
    counter = 0,
    length = string.length,
    value,
    extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // high surrogate, and there is a next character
      extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // unmatched surrogate; only append this code unit, in case the next
        // code unit is the high surrogate of a surrogate pair
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
function ucs2encode(array) {
  return map(array, function(value) {
    var output = '';
    if (value > 0xFFFF) {
      value -= 0x10000;
      output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
      value = 0xDC00 | value & 0x3FF;
    }
    output += stringFromCharCode(value);
    return output;
  }).join('');
}

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
function basicToDigit(codePoint) {
  if (codePoint - 48 < 10) {
    return codePoint - 22;
  }
  if (codePoint - 65 < 26) {
    return codePoint - 65;
  }
  if (codePoint - 97 < 26) {
    return codePoint - 97;
  }
  return base;
}

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
function digitToBasic(digit, flag) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
}

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
function adapt(delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
}

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
function decode(input) {
  // Don't use UCS-2
  var output = [],
    inputLength = input.length,
    out,
    i = 0,
    n = initialN,
    bias = initialBias,
    basic,
    j,
    index,
    oldi,
    w,
    k,
    digit,
    t,
    /** Cached calculation results */
    baseMinusT;

  // Handle the basic code points: let `basic` be the number of input code
  // points before the last delimiter, or `0` if there is none, then copy
  // the first basic code points to the output.

  basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }

  for (j = 0; j < basic; ++j) {
    // if it's not a basic code point
    if (input.charCodeAt(j) >= 0x80) {
      error('not-basic');
    }
    output.push(input.charCodeAt(j));
  }

  // Main decoding loop: start just after the last delimiter if any basic code
  // points were copied; start at the beginning otherwise.

  for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */ ) {

    // `index` is the index of the next character to be consumed.
    // Decode a generalized variable-length integer into `delta`,
    // which gets added to `i`. The overflow checking is easier
    // if we increase `i` as we go, then subtract off its starting
    // value at the end to obtain `delta`.
    for (oldi = i, w = 1, k = base; /* no condition */ ; k += base) {

      if (index >= inputLength) {
        error('invalid-input');
      }

      digit = basicToDigit(input.charCodeAt(index++));

      if (digit >= base || digit > floor((maxInt - i) / w)) {
        error('overflow');
      }

      i += digit * w;
      t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

      if (digit < t) {
        break;
      }

      baseMinusT = base - t;
      if (w > floor(maxInt / baseMinusT)) {
        error('overflow');
      }

      w *= baseMinusT;

    }

    out = output.length + 1;
    bias = adapt(i - oldi, out, oldi == 0);

    // `i` was supposed to wrap around from `out` to `0`,
    // incrementing `n` each time, so we'll fix that now:
    if (floor(i / out) > maxInt - n) {
      error('overflow');
    }

    n += floor(i / out);
    i %= out;

    // Insert `n` at position `i` of the output
    output.splice(i++, 0, n);

  }

  return ucs2encode(output);
}

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
function encode(input) {
  var n,
    delta,
    handledCPCount,
    basicLength,
    bias,
    j,
    m,
    q,
    k,
    t,
    currentValue,
    output = [],
    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,
    /** Cached calculation results */
    handledCPCountPlusOne,
    baseMinusT,
    qMinusT;

  // Convert the input in UCS-2 to Unicode
  input = ucs2decode(input);

  // Cache the length
  inputLength = input.length;

  // Initialize the state
  n = initialN;
  delta = 0;
  bias = initialBias;

  // Handle the basic code points
  for (j = 0; j < inputLength; ++j) {
    currentValue = input[j];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  handledCPCount = basicLength = output.length;

  // `handledCPCount` is the number of code points that have been handled;
  // `basicLength` is the number of basic code points.

  // Finish the basic string - if it is not empty - with a delimiter
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {

    // All non-basic code points < n have been handled already. Find the next
    // larger one:
    for (m = maxInt, j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    // but guard against overflow
    handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error('overflow');
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < n && ++delta > maxInt) {
        error('overflow');
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer
        for (q = delta, k = base; /* no condition */ ; k += base) {
          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) {
            break;
          }
          qMinusT = q - t;
          baseMinusT = base - t;
          output.push(
            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
          );
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;

  }
  return output.join('');
}

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
function toUnicode(input) {
  return mapDomain(input, function(string) {
    return regexPunycode.test(string) ?
      decode(string.slice(4).toLowerCase()) :
      string;
  });
}

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
function toASCII(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ?
      'xn--' + encode(string) :
      string;
  });
}
var version = '1.4.1';
/**
 * An object of methods to convert from JavaScript's internal character
 * representation (UCS-2) to Unicode code points, and back.
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode
 * @type Object
 */

var ucs2 = {
  decode: ucs2decode,
  encode: ucs2encode
};
var punycode = {
  version: version,
  ucs2: ucs2,
  toASCII: toASCII,
  toUnicode: toUnicode,
  encode: encode,
  decode: decode
};

// markdown-it default options

var cfg_default = {
  options: {
    // Enable HTML tags in source
    html: false,

    // Use '/' to close single tags (<br />)
    xhtmlOut: false,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks
    langPrefix: 'language-',

    // autoconvert URL-like texts to links
    linkify: false,

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    // Internal protection, recursion limit
    maxNesting: 100
  },

  components: {
    core: {},
    block: {},
    inline: {}
  }
};

// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
// modes. For example, to parse bold/italic only.

var cfg_zero = {
  options: {
    // Enable HTML tags in source
    html: false,

    // Use '/' to close single tags (<br />)
    xhtmlOut: false,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks
    langPrefix: 'language-',

    // autoconvert URL-like texts to links
    linkify: false,

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    // Internal protection, recursion limit
    maxNesting: 20
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline',
        'text_join'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ],
      rules2: [
        'balance_pairs',
        'fragments_join'
      ]
    }
  }
};

// Commonmark default options

var cfg_commonmark = {
  options: {
    // Enable HTML tags in source
    html: true,

    // Use '/' to close single tags (<br />)
    xhtmlOut: true,

    // Convert '\n' in paragraphs into <br>
    breaks: false,

    // CSS language prefix for fenced blocks
    langPrefix: 'language-',

    // autoconvert URL-like texts to links
    linkify: false,

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    // Internal protection, recursion limit
    maxNesting: 20
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline',
        'text_join'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ],
      rules2: [
        'balance_pairs',
        'emphasis',
        'fragments_join'
      ]
    }
  }
};

// Main parser class


const config = {
  default: cfg_default,
  zero: cfg_zero,
  commonmark: cfg_commonmark
};

//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

const BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink (url) {
  // url should be normalized at this point, and existing entities are decoded
  const str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true
}

const RECODE_HOSTNAME_FOR = ['http:', 'https:', 'mailto:'];

function normalizeLink (url) {
  const parsed = urlParse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return encode$1(format(parsed))
}

function normalizeLinkText (url) {
  const parsed = urlParse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
  return decode$1(format(parsed), decode$1.defaultChars + '%')
}

/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre><code class="hljs">' +
 *                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/
function MarkdownIt (presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options)
  }

  if (!options) {
    if (!isString$1(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new ParserInline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new ParserBlock();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new Core();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs).
   **/
  this.renderer = new Renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs)
   * rule.
   **/
  this.linkify = new LinkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;

  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.mjs).
   **/
  this.utils = utils;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = assign$1({}, helpers);

  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}

/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  assign$1(this.options, options);
  return this
};

/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you will - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  const self = this;

  if (isString$1(presets)) {
    const presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name') }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty') }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this
};

/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  let result = [];

  if (!Array.isArray(list)) { list = [list]; }

  ['core', 'block', 'inline'].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  const missed = list.filter(function (name) { return result.indexOf(name) < 0 });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed)
  }

  return this
};

/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  let result = [];

  if (!Array.isArray(list)) { list = [list]; }

  ['core', 'block', 'inline'].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  const missed = list.filter(function (name) { return result.indexOf(name) < 0 });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed)
  }
  return this
};

/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  const args = [this].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this
};

/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and return list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String')
  }

  const state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens
};

/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env)
};

/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  const state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens
};

/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env)
};

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
   * Initialize the HTML to Markdown converter
   * 
   * @private
   */
  return _createClass(SquibView, [{
    key: "_initializeHtmlToMarkdown",
    value: (function () {
      var _initializeHtmlToMarkdown2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var module, HtmlToMarkdownClass;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (!(typeof HtmlToMarkdown !== 'undefined')) {
                _context.next = 5;
                break;
              }
              // If HtmlToMarkdown is already available globally (e.g., in UMD build)
              this._htmlToMarkdownConverter = new HtmlToMarkdown({
                cacheSize: 20 // Cache up to 20 recent conversions for better performance
              });
              _context.next = 10;
              break;
            case 5:
              _context.next = 7;
              return Promise.resolve().then(function () { return HtmlToMarkdown$1; });
            case 7:
              module = _context.sent;
              HtmlToMarkdownClass = module["default"];
              this._htmlToMarkdownConverter = new HtmlToMarkdownClass({
                cacheSize: 20
              });
            case 10:
              _context.next = 16;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.error('Failed to load HtmlToMarkdown module:', _context.t0);
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
              return _context.stop();
          }
        }, _callee, this, [[0, 12]]);
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
      var _this2 = this;
      // Initialize Mermaid for diagram rendering
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'default',
        errorCallback: function errorCallback(error) {
          console.warn("Mermaid error:", error);
          return "<div class='mermaid-error'></div>";
        }
      });
      mermaid.init(undefined, ".mermaid");

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
          var escapedContent = _this2.md.utils.escapeHtml(content);
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
          var _escapedContent = _this2.md.utils.escapeHtml(content);
          var _escapedSource = _this2.md.utils.escapeHtml(content);
          return "<div class=\"geojson-container\" data-source-type=\"geojson\" data-original-source=\"".concat(_escapedSource, "\">").concat(_escapedContent, "</div>");
        }

        // Handle TopoJSON maps  
        if (info === 'topojson') {
          var _escapedContent2 = _this2.md.utils.escapeHtml(content);
          var _escapedSource2 = _this2.md.utils.escapeHtml(content);
          return "<div class=\"topojson-container\" data-source-type=\"topojson\" data-original-source=\"".concat(_escapedSource2, "\">").concat(_escapedContent2, "</div>");
        }

        // Handle STL 3D models
        if (info === 'stl') {
          var _escapedContent3 = _this2.md.utils.escapeHtml(content);
          var _escapedSource3 = _this2.md.utils.escapeHtml(content);
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
        var escapedLangName = _this2.md.utils.escapeHtml(langName);
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
              return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangName, "\">Error parsing ").concat(langName, " data:\n").concat(_this2.md.utils.escapeHtml(errorMessages), "</pre>");
            }
            return "<div data-source-type=\"".concat(escapedLangName, "\">").concat(_this2._dataToHtmlTable(parsedData.data), "</div>");
          } catch (e) {
            return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangName, "\">Could not render ").concat(_this2.md.utils.escapeHtml(langName), " table.</pre>");
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
          var _escapedContent4 = _this2.md.utils.escapeHtml(content);
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
      var _this3 = this;
      if (!rows || rows.length === 0) {
        return '<p class="squibview-info">No data to display.</p>';
      }
      var html = '<table class="squibview-data-table">';

      // Header
      var headerCells = rows[0];
      html += '<thead><tr>';
      headerCells.forEach(function (cell) {
        html += "<th>".concat(_this3.md.utils.escapeHtml(String(cell)), "</th>");
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
      var _this4 = this;
      // Markdown renderer
      this.registerRenderer('md', {
        render: function render(source) {
          return _this4.renderMarkdown(source);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this4.md.render(source);
        },
        outputToSource: function outputToSource(output) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return _this4.htmlToMarkdown(output, options);
        },
        operations: {
          increaseHeadings: function increaseHeadings(src) {
            return _this4.markdownAdjustHeadings(src, 1);
          },
          decreaseHeadings: function decreaseHeadings(src) {
            return _this4.markdownAdjustHeadings(src, -1);
          },
          removeHR: function removeHR(src) {
            return src.replace(/---/g, '');
          },
          fixLinefeeds: function fixLinefeeds(src) {
            return _this4.fixLinefeedsInMarkdown(src);
          },
          toggleLinefeedView: function toggleLinefeedView() {
            _this4.toggleLinefeedView();
            return _this4.getContent();
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
          return _this4.renderHTML(source);
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
          return _this4.renderHTML(_this4.makeRevealJSFullPage(source));
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this4.makeRevealJSFullPage(source);
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
          var markdownTable = _this4.csvOrTsvToMarkdownTable(source, ',');
          _this4.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this4.csvOrTsvToMarkdownTable(source, ',');
        },
        outputToSource: function outputToSource(output) {
          return _this4.tableToCSV(output);
        },
        operations: {},
        buttons: []
      });

      // TSV renderer
      this.registerRenderer('tsv', {
        render: function render(source) {
          var markdownTable = _this4.csvOrTsvToMarkdownTable(source, '\t');
          _this4.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this4.csvOrTsvToMarkdownTable(source, '\t');
        },
        outputToSource: function outputToSource(output) {
          return _this4.tableToCSV(output, '\t');
        },
        operations: {},
        buttons: []
      });

      // Semicolon separated values renderer
      this.registerRenderer('semisv', {
        render: function render(source) {
          var markdownTable = _this4.csvOrTsvToMarkdownTable(source, ';');
          _this4.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this4.csvOrTsvToMarkdownTable(source, ';');
        },
        outputToSource: function outputToSource(output) {
          return _this4.tableToCSV(output, ';');
        },
        operations: {},
        buttons: []
      });

      // Space separated values renderer
      this.registerRenderer('ssv', {
        render: function render(source) {
          var markdownTable = _this4.csvOrTsvToMarkdownTable(source, ' ');
          _this4.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this4.csvOrTsvToMarkdownTable(source, ' ');
        },
        outputToSource: function outputToSource(output) {
          return _this4.tableToCSV(output, ' ');
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
      var _this5 = this;
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
              var newContent = renderer.operations[button.action](_this5.getContent());
              _this5.setContent(newContent, _this5.inputContentType);
            }
          });
          _this5.typeButtonsContainer.appendChild(btn);
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
      var _this6 = this;
      // View buttons
      this.controls.querySelectorAll('button[data-view]').forEach(function (button) {
        button.addEventListener('click', function () {
          return _this6.setView(button.dataset.view);
        });
      });

      // Copy buttons
      this.controls.querySelector('.copy-src-button').addEventListener('click', function () {
        return _this6.copySource();
      });
      this.controls.querySelector('.copy-html-button').addEventListener('click', function () {
        return _this6.copyHTML();
      });

      // Undo/redo buttons
      this.controls.querySelector('.revision-undo').addEventListener('click', function () {
        return _this6.revisionUndo();
      });
      this.controls.querySelector('.revision-redo').addEventListener('click', function () {
        return _this6.revisionRedo();
      });

      // Input source change event
      this.input.addEventListener('input', function () {
        _this6.setContent();
      });

      // Text selection event in source panel
      this.input.addEventListener('mouseup', function () {
        var selection = document.getSelection();
        if (selection && selection.toString().trim() !== '') {
          var selectionData = {
            panel: 'source',
            text: selection.toString(),
            range: {
              start: _this6.input.selectionStart,
              end: _this6.input.selectionEnd
            }
          };
          _this6.lastSelectionData = selectionData;
          _this6.events.emit('text:selected', selectionData);
        }
      });

      // Listen for changes in rendered content to support bidirectional editing
      // Use a debounce pattern to prevent processing every keystroke
      var editDebounceTimer = null;

      // Create a map to store special content blocks
      this.specialContentBlocks = new Map();
      this.output.addEventListener('input', function () {
        if (_this6.currentView === 'html' || _this6.currentView === 'split') {
          var editableContent = _this6.output.querySelector('[contenteditable="true"]');
          if (editableContent) {
            // Clear any existing timer
            if (editDebounceTimer) {
              clearTimeout(editDebounceTimer);
            }

            // Set a new timer to process the edit after a short delay (300ms)
            editDebounceTimer = setTimeout(function () {
              var renderedContent = editableContent.innerHTML;
              var renderer = _this6.renderers[_this6.inputContentType];
              if (renderer && renderer.outputToSource) {
                // Get the original source markdown
                var originalSource = _this6.input.value;

                // Process the HTML back to markdown, passing original source for context
                var newSource = renderer.outputToSource(renderedContent, {
                  originalSource: originalSource
                });

                // Update source without triggering render cycle
                _this6.input.value = newSource;

                // Only save revision after editing stops for a moment
                _this6.revisionManager.addRevision(newSource, _this6.inputContentType);

                // Emit content change event
                _this6.events.emit('content:change', newSource, _this6.inputContentType);
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
            element: _this6.output.querySelector('[contenteditable="true"]')
          };
          _this6.lastSelectionData = selectionData;
          _this6.events.emit('text:selected', selectionData);
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
      var _this7 = this;
      var resizeObserver = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (entry.target === _this7.container) {
              _this7.adjustLayout();
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
     * Renders Markdown content to HTML and processes the result.
     * Converts images to data URLs and initializes Mermaid diagrams.
     * 
     * @param {string} [md] - The Markdown content to render, defaults to current input value
     * @returns {Promise<void>} A promise that resolves when rendering is complete
     */
  }, {
    key: "renderMarkdown",
    value: (function () {
      var _renderMarkdown = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(md) {
        var _this8 = this;
        var markdown, html, processedHtml, contentDiv, images, _iterator2, _step2, _loop;
        return _regeneratorRuntime().wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              markdown = md || this.input.value;
              html = this.md.render(markdown);
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
              this.output.innerHTML = "<div contenteditable='true'>" + processedHtml + "</div>";

              // Convert all images to data URLs immediately after rendering
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              images = contentDiv.querySelectorAll('img'); // render images to data urls
              _iterator2 = _createForOfIteratorHelper(images);
              _context3.prev = 8;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var img, originalSrc, canvas, ctx, tempImg;
                return _regeneratorRuntime().wrap(function _loop$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      img = _step2.value;
                      _context2.prev = 1;
                      // Store original src if we need to preserve it
                      originalSrc = img.src; // Only convert to data URL if not preserving tags
                      if (_this8.options.preserveImageTags) {
                        _context2.next = 10;
                        break;
                      }
                      canvas = document.createElement('canvas');
                      ctx = canvas.getContext('2d'); // Create new image and wait for it to load
                      tempImg = new Image();
                      tempImg.crossOrigin = 'anonymous';
                      _context2.next = 10;
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
                      _context2.next = 15;
                      break;
                    case 12:
                      _context2.prev = 12;
                      _context2.t0 = _context2["catch"](1);
                      console.error('Failed to convert image:', _context2.t0);
                    case 15:
                    case "end":
                      return _context2.stop();
                  }
                }, _loop, null, [[1, 12]]);
              });
              _iterator2.s();
            case 11:
              if ((_step2 = _iterator2.n()).done) {
                _context3.next = 15;
                break;
              }
              return _context3.delegateYield(_loop(), "t0", 13);
            case 13:
              _context3.next = 11;
              break;
            case 15:
              _context3.next = 20;
              break;
            case 17:
              _context3.prev = 17;
              _context3.t1 = _context3["catch"](8);
              _iterator2.e(_context3.t1);
            case 20:
              _context3.prev = 20;
              _iterator2.f();
              return _context3.finish(20);
            case 23:
              // Initialize mermaid diagrams after all images are processed
              mermaid.init(undefined, this.output.querySelectorAll('.mermaid'));

              // Initialize GeoJSON/TopoJSON maps after content is rendered
              this.initializeGeoRenderers();

              // Initialize STL 3D models after content is rendered
              this.initializeSTLRenderers();

              // Ensure MathJax is loaded and typeset all math blocks
              _context3.next = 28;
              return this.ensureMathJaxAndTypeset();
            case 28:
              // Emit markdown:rendered event
              this.events.emit('markdown:rendered', markdown, html);
            case 29:
            case "end":
              return _context3.stop();
          }
        }, _callee2, this, [[8, 17, 20, 23]]);
      }));
      function renderMarkdown(_x) {
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
      var _ensureMathJaxAndTypeset = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var mathBlocks, typesetAll;
        return _regeneratorRuntime().wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              typesetAll = function _typesetAll2() {
                if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                  return MathJax.typesetPromise(Array.from(mathBlocks));
                }
              };
              mathBlocks = this.output.querySelectorAll('div.math-display');
              if (mathBlocks.length) {
                _context4.next = 4;
                break;
              }
              return _context4.abrupt("return");
            case 4:
              if (!(typeof MathJax === 'undefined')) {
                _context4.next = 11;
                break;
              }
              if (!window.mathJaxLoading) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return");
            case 7:
              window.mathJaxLoading = true;
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
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
            case 11:
              return _context4.abrupt("return", typesetAll());
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee3, this);
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
    value: function initializeGeoRenderers() {
      var _this9 = this;
      // Skip if output element not yet available (during initial setup)
      if (!this.output) return;

      // Initialize GeoJSON containers
      var geojsonContainers = this.output.querySelectorAll('.geojson-container');
      geojsonContainers.forEach(function (container) {
        if (!container.dataset.initialized) {
          _this9.renderGeoJSON(container);
        }
      });

      // Initialize TopoJSON containers
      var topojsonContainers = this.output.querySelectorAll('.topojson-container');
      topojsonContainers.forEach(function (container) {
        if (!container.dataset.initialized) {
          _this9.renderTopoJSON(container);
        }
      });
    }

    /**
     * Initializes STL 3D model renderers.
     * @private
     */
  }, {
    key: "initializeSTLRenderers",
    value: function initializeSTLRenderers() {
      var _this10 = this;
      // Skip if output element not yet available (during initial setup)
      if (!this.output) return;
      var stlContainers = this.output.querySelectorAll('.stl-container');
      stlContainers.forEach(function (container) {
        if (!container.dataset.initialized) {
          _this10.renderSTL(container);
        }
      });
    }

    /**
     * Renders a GeoJSON map in the given container.
     * @param {HTMLElement} container - The container element
     * @private
     */
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
      var _iterator3 = _createForOfIteratorHelper(lines),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var line = _step3.value;
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
        _iterator3.e(err);
      } finally {
        _iterator3.f();
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
      var _copySource = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var copyButton, markdownText, textarea;
        return _regeneratorRuntime().wrap(function _callee4$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-src-button');
              copyButton.textContent = 'Copying...';
              _context5.prev = 2;
              markdownText = this.getMarkdownSource();
              _context5.prev = 4;
              _context5.next = 7;
              return navigator.clipboard.writeText(markdownText);
            case 7:
              _context5.next = 18;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](4);
              textarea = document.createElement('textarea');
              textarea.value = markdownText;
              textarea.style.position = 'fixed';
              textarea.style.opacity = '0';
              document.body.appendChild(textarea);
              textarea.select();
              document.body.removeChild(textarea);
            case 18:
              copyButton.textContent = 'Copied!';
              _context5.next = 25;
              break;
            case 21:
              _context5.prev = 21;
              _context5.t1 = _context5["catch"](2);
              console.error('Copy Markdown failed:', _context5.t1);
              copyButton.textContent = 'Copy failed';
            case 25:
              setTimeout(function () {
                copyButton.textContent = 'Copy Source';
              }, 2000);
            case 26:
            case "end":
              return _context5.stop();
          }
        }, _callee4, this, [[2, 21], [4, 9]]);
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
      var _iterator4 = _createForOfIteratorHelper(diffData.lineDiff),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var line = _step4.value;
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
        _iterator4.e(err);
      } finally {
        _iterator4.f();
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
      var _iterator5 = _createForOfIteratorHelper(diff),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _step5$value = _slicedToArray(_step5.value, 2),
            op = _step5$value[0],
            text = _step5$value[1];
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
        _iterator5.e(err);
      } finally {
        _iterator5.f();
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
      var _this11 = this;
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
      }
      this.events.on('text:selected', callback);

      // Return unsubscribe function
      return function () {
        _this11.events.off('text:selected', callback);
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
      var _this12 = this;
      return this._onTextReplacementHandler ? function (selectionData) {
        var result = _this12._onTextReplacementHandler(selectionData);
        return result;
      } : null;
    }

    /**
     * Copies the rendered content to the clipboard with formatting.
     * Processes code blocks, SVG elements, and images to ensure they copy correctly.
     */,
    set: function set(handler) {
      var _this13 = this;
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
            _this13.replaceSelectedText(result, selectionData);
          }
        };

        // Register the handler
        this.events.on('text:selected', this._onTextReplacementHandler);
      }
    }
  }, {
    key: "copyHTML",
    value: (function () {
      var _copyHTML = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _this14 = this;
        var copyButton, contentDiv, clone, images, _iterator6, _step6, _loop3, svgElements, _iterator7, _step7, _loop4, mathElements, _iterator8, _step8, _loop2, geojsonContainers, _iterator9, _step9, container, originalSource, originalContainer, allOriginalContainers, _iterator11, _step11, candidate, dataUrl, img, placeholder, _placeholder, stlContainers, _iterator10, _step10, _container, _originalSource, _originalContainer, _allOriginalContainers, _iterator12, _step12, _candidate, canvas, renderer, scene, camera, _dataUrl, _img, _placeholder2, _placeholder3, htmlContent, platform, tempDiv, selection, range, successful;
        return _regeneratorRuntime().wrap(function _callee5$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-html-button');
              copyButton.textContent = 'Copying...';
              _context9.prev = 2;
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              if (contentDiv) {
                _context9.next = 6;
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
              _iterator6 = _createForOfIteratorHelper(images);
              _context9.prev = 10;
              _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
                var img, canvas, ctx, tempImg, width, height;
                return _regeneratorRuntime().wrap(function _loop3$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      img = _step6.value;
                      _context7.prev = 1;
                      canvas = document.createElement('canvas');
                      ctx = canvas.getContext('2d'); // Create new image and wait for it to load
                      tempImg = new Image();
                      tempImg.crossOrigin = 'anonymous';
                      _context7.next = 8;
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
                      _context7.next = 14;
                      break;
                    case 10:
                      _context7.prev = 10;
                      _context7.t0 = _context7["catch"](1);
                      console.error('Failed to convert image for copying:', _context7.t0);
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
                      return _context7.stop();
                  }
                }, _loop3, null, [[1, 10]]);
              });
              _iterator6.s();
            case 13:
              if ((_step6 = _iterator6.n()).done) {
                _context9.next = 17;
                break;
              }
              return _context9.delegateYield(_loop3(), "t0", 15);
            case 15:
              _context9.next = 13;
              break;
            case 17:
              _context9.next = 22;
              break;
            case 19:
              _context9.prev = 19;
              _context9.t1 = _context9["catch"](10);
              _iterator6.e(_context9.t1);
            case 22:
              _context9.prev = 22;
              _iterator6.f();
              return _context9.finish(22);
            case 25:
              // Convert SVG elements to PNG (excluding math SVGs which are handled separately)
              svgElements = clone.querySelectorAll('svg');
              _iterator7 = _createForOfIteratorHelper(svgElements);
              _context9.prev = 27;
              _loop4 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop4() {
                var svg, pngBlob, dataUrl, img, isMermaidSvg, hasExplicitDimensions, imgWidth, imgHeight;
                return _regeneratorRuntime().wrap(function _loop4$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      svg = _step7.value;
                      if (!svg.closest('.math-display')) {
                        _context8.next = 3;
                        break;
                      }
                      return _context8.abrupt("return", 1);
                    case 3:
                      _context8.prev = 3;
                      _context8.next = 6;
                      return _this14.svgToPng(svg);
                    case 6:
                      pngBlob = _context8.sent;
                      _context8.next = 9;
                      return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                          return resolve(reader.result);
                        };
                        reader.readAsDataURL(pngBlob);
                      });
                    case 9:
                      dataUrl = _context8.sent;
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
                      _context8.next = 31;
                      break;
                    case 28:
                      _context8.prev = 28;
                      _context8.t0 = _context8["catch"](3);
                      console.error('Failed to convert SVG:', _context8.t0);
                    case 31:
                    case "end":
                      return _context8.stop();
                  }
                }, _loop4, null, [[3, 28]]);
              });
              _iterator7.s();
            case 30:
              if ((_step7 = _iterator7.n()).done) {
                _context9.next = 36;
                break;
              }
              return _context9.delegateYield(_loop4(), "t2", 32);
            case 32:
              if (!_context9.t2) {
                _context9.next = 34;
                break;
              }
              return _context9.abrupt("continue", 34);
            case 34:
              _context9.next = 30;
              break;
            case 36:
              _context9.next = 41;
              break;
            case 38:
              _context9.prev = 38;
              _context9.t3 = _context9["catch"](27);
              _iterator7.e(_context9.t3);
            case 41:
              _context9.prev = 41;
              _iterator7.f();
              return _context9.finish(41);
            case 44:
              // Convert Math elements to PNG images using the copy-as-image approach from math-test.html
              mathElements = Array.from(clone.querySelectorAll('.math-display'));
              if (!(mathElements.length > 0)) {
                _context9.next = 64;
                break;
              }
              _iterator8 = _createForOfIteratorHelper(mathElements);
              _context9.prev = 47;
              _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                var mathEl, svg, serializer, svgStr, svgBlob, url, img, dataUrl, imgElement;
                return _regeneratorRuntime().wrap(function _loop2$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      mathEl = _step8.value;
                      _context6.prev = 1;
                      svg = mathEl.querySelector('svg');
                      if (svg) {
                        _context6.next = 6;
                        break;
                      }
                      console.warn('No SVG found in math element, skipping');
                      return _context6.abrupt("return", 1);
                    case 6:
                      // Convert SVG to PNG data URL using the exact approach from math-test.html
                      serializer = new XMLSerializer();
                      svgStr = serializer.serializeToString(svg);
                      svgBlob = new Blob([svgStr], {
                        type: "image/svg+xml;charset=utf-8"
                      });
                      url = URL.createObjectURL(svgBlob);
                      img = new Image();
                      _context6.next = 13;
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
                          // MathJax SVGs often have large coordinate systems, scale them down
                          var targetMaxWidth = 300; // Target max width for math images  
                          var targetMaxHeight = 100; // Target max height for math images

                          // Apply a base scale factor for MathJax SVGs which tend to be oversized
                          var scaleFactor = 0.10; // Start with a smaller base scale

                          // If still too large after base scaling, scale down further
                          var scaledWidth = width * scaleFactor;
                          var scaledHeight = height * scaleFactor;
                          if (scaledWidth > targetMaxWidth || scaledHeight > targetMaxHeight) {
                            var scaleX = targetMaxWidth / scaledWidth;
                            var scaleY = targetMaxHeight / scaledHeight;
                            scaleFactor *= Math.min(scaleX, scaleY);
                          }
                          width *= scaleFactor;
                          height *= scaleFactor;
                          canvas.width = width;
                          canvas.height = height;
                          var ctx = canvas.getContext('2d');

                          // White background
                          ctx.fillStyle = "#FFFFFF";
                          ctx.fillRect(0, 0, canvas.width, canvas.height);

                          // Draw the SVG image
                          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
                      dataUrl = _context6.sent;
                      // Replace math element with img tag containing the PNG data URL
                      imgElement = document.createElement('img');
                      imgElement.src = dataUrl;
                      imgElement.style.cssText = 'display:block;margin:0.5em 0;max-width:100%;height:auto;';
                      imgElement.alt = 'Math equation';
                      mathEl.parentNode.replaceChild(imgElement, mathEl);
                      _context6.next = 24;
                      break;
                    case 21:
                      _context6.prev = 21;
                      _context6.t0 = _context6["catch"](1);
                      console.error('Failed to convert math element to image:', _context6.t0);
                      // Keep the original element if conversion fails
                    case 24:
                    case "end":
                      return _context6.stop();
                  }
                }, _loop2, null, [[1, 21]]);
              });
              _iterator8.s();
            case 50:
              if ((_step8 = _iterator8.n()).done) {
                _context9.next = 56;
                break;
              }
              return _context9.delegateYield(_loop2(), "t4", 52);
            case 52:
              if (!_context9.t4) {
                _context9.next = 54;
                break;
              }
              return _context9.abrupt("continue", 54);
            case 54:
              _context9.next = 50;
              break;
            case 56:
              _context9.next = 61;
              break;
            case 58:
              _context9.prev = 58;
              _context9.t5 = _context9["catch"](47);
              _iterator8.e(_context9.t5);
            case 61:
              _context9.prev = 61;
              _iterator8.f();
              return _context9.finish(61);
            case 64:
              // Handle GeoJSON containers - convert canvas to image
              geojsonContainers = clone.querySelectorAll('.geojson-container');
              _iterator9 = _createForOfIteratorHelper(geojsonContainers);
              _context9.prev = 66;
              _iterator9.s();
            case 68:
              if ((_step9 = _iterator9.n()).done) {
                _context9.next = 130;
                break;
              }
              container = _step9.value;
              _context9.prev = 70;
              // Find the corresponding GeoJSON container in the original DOM by searching with proper escaping
              originalSource = container.getAttribute('data-original-source');
              if (originalSource) {
                _context9.next = 75;
                break;
              }
              console.warn('No original source found for GeoJSON container');
              throw new Error('No original source');
            case 75:
              // Find original container more reliably
              originalContainer = null;
              allOriginalContainers = this.output.querySelectorAll('.geojson-container');
              _iterator11 = _createForOfIteratorHelper(allOriginalContainers);
              _context9.prev = 78;
              _iterator11.s();
            case 80:
              if ((_step11 = _iterator11.n()).done) {
                _context9.next = 87;
                break;
              }
              candidate = _step11.value;
              if (!(candidate.getAttribute('data-original-source') === originalSource)) {
                _context9.next = 85;
                break;
              }
              originalContainer = candidate;
              return _context9.abrupt("break", 87);
            case 85:
              _context9.next = 80;
              break;
            case 87:
              _context9.next = 92;
              break;
            case 89:
              _context9.prev = 89;
              _context9.t6 = _context9["catch"](78);
              _iterator11.e(_context9.t6);
            case 92:
              _context9.prev = 92;
              _iterator11.f();
              return _context9.finish(92);
            case 95:
              if (!originalContainer) {
                _context9.next = 114;
                break;
              }
              _context9.prev = 96;
              _context9.next = 99;
              return this.divToDataUrl(originalContainer);
            case 99:
              dataUrl = _context9.sent;
              if (!dataUrl) {
                _context9.next = 107;
                break;
              }
              img = document.createElement('img');
              img.src = dataUrl;
              img.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; margin: 0.5em 0;';
              img.alt = 'GeoJSON Map';

              // Replace the container with the image
              container.parentNode.replaceChild(img, container);
              return _context9.abrupt("continue", 128);
            case 107:
              _context9.next = 112;
              break;
            case 109:
              _context9.prev = 109;
              _context9.t7 = _context9["catch"](96);
              console.warn('Failed to convert GeoJSON container to image:', _context9.t7);
            case 112:
              _context9.next = 115;
              break;
            case 114:
              console.warn('Could not find original GeoJSON container');
            case 115:
              // Fallback to placeholder if canvas conversion fails
              placeholder = document.createElement('div');
              placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              placeholder.textContent = '[GeoJSON Map - Interactive content not available in copy]';
              container.parentNode.replaceChild(placeholder, container);
              _context9.next = 128;
              break;
            case 121:
              _context9.prev = 121;
              _context9.t8 = _context9["catch"](70);
              console.error('Error processing GeoJSON container for copy:', _context9.t8);
              // Fallback to placeholder
              _placeholder = document.createElement('div');
              _placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              _placeholder.textContent = '[GeoJSON Map - Interactive content not available in copy]';
              container.parentNode.replaceChild(_placeholder, container);
            case 128:
              _context9.next = 68;
              break;
            case 130:
              _context9.next = 135;
              break;
            case 132:
              _context9.prev = 132;
              _context9.t9 = _context9["catch"](66);
              _iterator9.e(_context9.t9);
            case 135:
              _context9.prev = 135;
              _iterator9.f();
              return _context9.finish(135);
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
              _iterator10 = _createForOfIteratorHelper(stlContainers);
              _context9.prev = 141;
              _iterator10.s();
            case 143:
              if ((_step10 = _iterator10.n()).done) {
                _context9.next = 211;
                break;
              }
              _container = _step10.value;
              _context9.prev = 145;
              // Find the corresponding STL container in the original DOM by searching with proper escaping
              _originalSource = _container.getAttribute('data-original-source');
              if (_originalSource) {
                _context9.next = 150;
                break;
              }
              console.warn('No original source found for STL container');
              throw new Error('No original source');
            case 150:
              // Find original container more reliably
              _originalContainer = null;
              _allOriginalContainers = this.output.querySelectorAll('.stl-container');
              _iterator12 = _createForOfIteratorHelper(_allOriginalContainers);
              _context9.prev = 153;
              _iterator12.s();
            case 155:
              if ((_step12 = _iterator12.n()).done) {
                _context9.next = 162;
                break;
              }
              _candidate = _step12.value;
              if (!(_candidate.getAttribute('data-original-source') === _originalSource)) {
                _context9.next = 160;
                break;
              }
              _originalContainer = _candidate;
              return _context9.abrupt("break", 162);
            case 160:
              _context9.next = 155;
              break;
            case 162:
              _context9.next = 167;
              break;
            case 164:
              _context9.prev = 164;
              _context9.t10 = _context9["catch"](153);
              _iterator12.e(_context9.t10);
            case 167:
              _context9.prev = 167;
              _iterator12.f();
              return _context9.finish(167);
            case 170:
              if (!_originalContainer) {
                _context9.next = 195;
                break;
              }
              // Look for canvas element in the original container (Three.js WebGL canvas)
              canvas = _originalContainer.querySelector('canvas');
              if (!(canvas && canvas.width > 0 && canvas.height > 0)) {
                _context9.next = 192;
                break;
              }
              _context9.prev = 173;
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
              return _context9.abrupt("continue", 209);
            case 187:
              _context9.prev = 187;
              _context9.t11 = _context9["catch"](173);
              console.warn('Failed to convert STL canvas to image (likely WebGL context issue):', _context9.t11);
            case 190:
              _context9.next = 193;
              break;
            case 192:
              console.warn('No valid canvas found in STL container');
            case 193:
              _context9.next = 196;
              break;
            case 195:
              console.warn('Could not find original STL container');
            case 196:
              // Fallback to placeholder if canvas conversion fails
              _placeholder2 = document.createElement('div');
              _placeholder2.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              _placeholder2.textContent = '[STL 3D Model - Interactive content not available in copy]';
              _container.parentNode.replaceChild(_placeholder2, _container);
              _context9.next = 209;
              break;
            case 202:
              _context9.prev = 202;
              _context9.t12 = _context9["catch"](145);
              console.error('Error processing STL container for copy:', _context9.t12);
              // Fallback to placeholder
              _placeholder3 = document.createElement('div');
              _placeholder3.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
              _placeholder3.textContent = '[STL 3D Model - Interactive content not available in copy]';
              _container.parentNode.replaceChild(_placeholder3, _container);
            case 209:
              _context9.next = 143;
              break;
            case 211:
              _context9.next = 216;
              break;
            case 213:
              _context9.prev = 213;
              _context9.t13 = _context9["catch"](141);
              _iterator10.e(_context9.t13);
            case 216:
              _context9.prev = 216;
              _iterator10.f();
              return _context9.finish(216);
            case 219:
              htmlContent = "\n          <html xmlns:v=\"urn:schemas-microsoft-com:vml\"\n                xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                xmlns:w=\"urn:schemas-microsoft-com:office:word\">\n            <head>\n              <meta charset=\"utf-8\">\n              <style>\n                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }\n                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }\n                th { background-color: #f0f0f0; font-weight: bold; }\n\n                /* Code block styling */\n                .hljs { display: block; overflow-x: auto; padding: 1em; }\n                .hljs-keyword { color: #0033B3; }\n                .hljs-string { color: #067D17; }\n                .hljs-comment { color: #8C8C8C; }\n                .hljs-function { color: #00627A; }\n                .hljs-number { color: #1750EB; }\n                .hljs-operator { color: #687687; }\n                .hljs-punctuation { color: #000000; }\n\n                /* Word-specific image handling */\n                img { display: block; max-width: none; }\n              </style>\n            </head>\n            <body>\n              ".concat(clone.innerHTML, "\n            </body>\n          </html>");
              platform = this.getPlatform();
              if (!(platform === 'macos')) {
                _context9.next = 233;
                break;
              }
              _context9.prev = 222;
              _context9.next = 225;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 225:
              _context9.next = 231;
              break;
            case 227:
              _context9.prev = 227;
              _context9.t14 = _context9["catch"](222);
              if (this.copyToClipboard(htmlContent)) {
                _context9.next = 231;
                break;
              }
              throw new Error('Fallback copy failed');
            case 231:
              _context9.next = 257;
              break;
            case 233:
              // Windows/Linux approach
              tempDiv = document.createElement('div');
              tempDiv.style.position = 'fixed';
              tempDiv.style.left = '-9999px';
              tempDiv.style.top = '0';
              tempDiv.innerHTML = htmlContent;
              document.body.appendChild(tempDiv);
              _context9.prev = 239;
              _context9.next = 242;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 242:
              _context9.next = 254;
              break;
            case 244:
              _context9.prev = 244;
              _context9.t15 = _context9["catch"](239);
              selection = window.getSelection();
              range = document.createRange();
              range.selectNodeContents(tempDiv);
              selection.removeAllRanges();
              selection.addRange(range);
              successful = document.execCommand('copy');
              if (successful) {
                _context9.next = 254;
                break;
              }
              throw new Error('Fallback copy failed');
            case 254:
              _context9.prev = 254;
              if (tempDiv && tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }
              return _context9.finish(254);
            case 257:
              copyButton.textContent = 'Copied!';
              _context9.next = 264;
              break;
            case 260:
              _context9.prev = 260;
              _context9.t16 = _context9["catch"](2);
              console.error('Copy HTML failed:', _context9.t16);
              copyButton.textContent = 'Copy failed';
            case 264:
              setTimeout(function () {
                copyButton.textContent = 'Copy Rendered';
              }, 2000);
            case 265:
            case "end":
              return _context9.stop();
          }
        }, _callee5, this, [[2, 260], [10, 19, 22, 25], [27, 38, 41, 44], [47, 58, 61, 64], [66, 132, 135, 138], [70, 121], [78, 89, 92, 95], [96, 109], [141, 213, 216, 219], [145, 202], [153, 164, 167, 170], [173, 187], [222, 227], [239, 244, 254, 257]]);
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
      var _mathToPng = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(mathElement) {
        return _regeneratorRuntime().wrap(function _callee6$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise(function (resolve, reject) {
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
              return _context10.stop();
          }
        }, _callee6);
      }));
      function mathToPng(_x2) {
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
      var _mathCHTMLToPng = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(chtmlContainer) {
        var rect, padding, canvas, ctx, scale, canvasWidth, canvasHeight, foreignObject, svgBlob, url;
        return _regeneratorRuntime().wrap(function _callee7$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              // Get container bounds
              rect = chtmlContainer.getBoundingClientRect();
              if (!(rect.width === 0 || rect.height === 0)) {
                _context11.next = 5;
                break;
              }
              console.warn('CHTML container has zero dimensions');
              return _context11.abrupt("return", null);
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
              return _context11.abrupt("return", new Promise(function (resolve, reject) {
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
              _context11.prev = 24;
              _context11.t0 = _context11["catch"](0);
              console.error('CHTML to PNG conversion failed:', _context11.t0);
              return _context11.abrupt("return", null);
            case 28:
            case "end":
              return _context11.stop();
          }
        }, _callee7, null, [[0, 24]]);
      }));
      function mathCHTMLToPng(_x3) {
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
      var _divToDataUrl = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(element) {
        var _this15 = this;
        return _regeneratorRuntime().wrap(function _callee8$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise(function (resolve, reject) {
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
                          var _iterator13 = _createForOfIteratorHelper(tileLayers),
                            _step13;
                          try {
                            var _loop5 = function _loop5() {
                              var tile = _step13.value;
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
                                  var _iterator14 = _createForOfIteratorHelper(svgElements),
                                    _step14;
                                  try {
                                    var _loop6 = function _loop6() {
                                      var svg = _step14.value;
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
                                    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                                      if (_loop6()) continue;
                                    }
                                  } catch (err) {
                                    _iterator14.e(err);
                                  } finally {
                                    _iterator14.f();
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
                            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                              _loop5();
                            }
                          } catch (err) {
                            _iterator13.e(err);
                          } finally {
                            _iterator13.f();
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
                    var _iterator15 = _createForOfIteratorHelper(svgs),
                      _step15;
                    try {
                      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                        var svg = _step15.value;
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
                      _iterator15.e(err);
                    } finally {
                      _iterator15.f();
                    }
                    if (bestSvg) {
                      try {
                        _this15.svgToPng(bestSvg).then(function (pngBlob) {
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
              return _context12.stop();
          }
        }, _callee8);
      }));
      function divToDataUrl(_x4) {
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
      var _this16 = this;
      // Create line mirror for measuring line heights
      this.lineMirror = document.createElement('div');
      this.lineMirror.className = "".concat(this.options.baseClass, "-line-mirror");
      this.lineMirror.setAttribute('aria-hidden', 'true');
      this.container.appendChild(this.lineMirror);

      // Track last line count for optimization
      this.lastLineCount = 0;

      // Set up scroll synchronization
      this.setupLineNumberScrollSync();

      // Update line numbers on input
      this.input.addEventListener('input', function () {
        _this16.updateLineNumbersIfNeeded();
      });

      // Update on window resize
      window.addEventListener('resize', this.updateLineNumbersDebounced);

      // Initial update
      this.updateLineNumbers();
    }

    /**
     * Set up scroll synchronization between textarea and line gutter
     * @private
     */
  }, {
    key: "setupLineNumberScrollSync",
    value: function setupLineNumberScrollSync() {
      var _this17 = this;
      if (!this.lineGutter) return;
      this.input.addEventListener('scroll', function () {
        if (_this17.lineGutter) {
          _this17.lineGutter.scrollTop = _this17.input.scrollTop;
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
      var _this18 = this;
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
        var lineNum = _this18.options.lineNumberStart + index;
        var lineNumStr = String(lineNum).padStart(minDigits, '0');

        // Measure line height
        var lineHeight = _this18.measureLineHeight(line);

        // Create line number element
        var gutterLine = document.createElement('div');
        gutterLine.className = "".concat(_this18.options.baseClass, "-gutter-line");
        gutterLine.textContent = lineNumStr;
        gutterLine.style.height = lineHeight + 'px';
        gutterLine.style.lineHeight = lineHeight + 'px';
        _this18.lineGutter.appendChild(gutterLine);
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
      var _this19 = this;
      var computed = window.getComputedStyle(this.input);
      var stylesToCopy = ['fontFamily', 'fontSize', 'lineHeight', 'letterSpacing', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'boxSizing', 'whiteSpace', 'wordWrap', 'wordBreak', 'overflowWrap'];
      stylesToCopy.forEach(function (prop) {
        _this19.lineMirror.style[prop] = computed[prop];
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

      // Rebuild the editor structure
      var currentContent = this.getContent();
      var currentType = this.currentContentType;
      var currentView = this.currentView;

      // Re-create structure
      this.createStructure();
      this.initializeEventHandlers();
      if (show) {
        this.initializeLineNumbers();
      }

      // Restore content and view
      this.setContent(currentContent, currentType, false);
      this.setView(currentView);
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
  lineNumberMinDigits: 2 // Minimum digits (e.g., 01, 02)
});
_defineProperty(SquibView, "version", {
  version: VERSION,
  url: REPO_URL
});

export { SquibView as default };
//# sourceMappingURL=squibview.esm.js.map
