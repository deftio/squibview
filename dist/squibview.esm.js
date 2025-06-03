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
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
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
var VERSION = "0.0.39-dev.9";
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

        // Store the information for later processing
        var content;
        if (sourceType === 'svg' && div.hasAttribute('data-original-source')) {
          // Use the original source for perfect fidelity
          content = div.getAttribute('data-original-source');
        } else if (sourceType === 'csv' || sourceType === 'tsv' || sourceType === 'psv') {
          // For delimited data, extract from the table and convert back to delimited format
          var tableElement = div.querySelector('table');
          if (tableElement) {
            content = _this2._htmlTableToDelimitedText(tableElement, sourceType);
          } else {
            content = 'Error: Table not found for ' + sourceType;
          }
        } else {
          // For other types (code, mermaid, etc.), extract text content from pre/code elements
          var preElement = div.querySelector('pre');
          if (preElement) {
            var codeElement = preElement.querySelector('code');
            content = (codeElement || preElement).textContent.trim();
          } else {
            // Fallback to text content
            content = div.textContent.trim();
          }
        }
        placeholders.push({
          placeholder: placeholder,
          type: sourceType,
          content: content
        });

        // Replace the div with a simple paragraph containing the placeholder
        var placeholderElement = tempDiv.ownerDocument.createElement('p');
        placeholderElement.textContent = placeholder;
        div.parentNode.replaceChild(placeholderElement, div);
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
          var fencedBlock = "\n```".concat(type, "\n").concat(content, "\n```\n");
          // The placeholder might be escaped by Markdown, so try both versions
          var escapedPlaceholder = placeholder.replace(/_/g, '\\_');

          // For regex, need to escape the backslashes in the escaped placeholder
          var regexSafeEscaped = escapedPlaceholder.replace(/\\/g, '\\\\');
          markdown = markdown.replace(new RegExp(regexSafeEscaped, 'g'), fencedBlock);
          markdown = markdown.replace(new RegExp(placeholder, 'g'), fencedBlock);
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
          if (type === 'mermaid' || type === 'svg' || type === 'geojson' || type === 'math') {
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
      var rows = tableElement.querySelectorAll('tr');
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
     * Regex-based fallback for pre-processing when DOM methods aren't available
     * 
     * @private
     * @param {string} html - The HTML to process
     * @returns {string} - The processed HTML with placeholders
     */
  }, {
    key: "_regexFallbackPreProcess",
    value: function _regexFallbackPreProcess(html) {
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
          // For delimited data, we need to extract from table - this is complex with regex
          // For now, just return the content as-is and let the main Turndown rules handle it
          extractedContent = 'TABLE_PLACEHOLDER';
        } else {
          // For code blocks, extract from pre/code elements
          var preMatch = content.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/);
          if (preMatch) {
            extractedContent = preMatch[1].replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
          } else {
            extractedContent = content;
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
    this.contentType = '';
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
      this.contentType = contentType;
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
      if (this.currentIndex < 0) return this.contentType;

      // Find the last content type change up to the current index
      var currentType = this.contentType;
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
  }]);
}();

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
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SquibView);
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
      var _this = this;
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
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, {
                language: lang
              }).value;
            } catch (__) {}
          }
          return '';
        }
      });

      // Configure custom fence rendering for markdown-it
      var defaultFence = this.md.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      this.md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var info = token.info.trim().toLowerCase(); // Normalize to lowercase
        var content = token.content;
        var escapedContent = _this.md.utils.escapeHtml(content);
        var langAttr = token.info.trim() ? token.info.trim().toLowerCase().split(/\s+/)[0] : 'code';
        var escapedLangAttr = _this.md.utils.escapeHtml(langAttr);

        // Handle Mermaid diagrams
        if (info === 'mermaid') {
          return "<div class=\"mermaid\" data-source-type=\"mermaid\">".concat(escapedContent, "</div>");
        }

        // Handle SVG directly (wrapped for data attribute)
        if (info === 'svg') {
          // Escape the original SVG content for safe storage in HTML attribute
          var escapeForAttribute = function escapeForAttribute(str) {
            return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          };
          var escapedSource = escapeForAttribute(content);
          // Store original source for round-trip conversion and render the SVG
          return "<div class=\"svg-container\" data-source-type=\"svg\" data-original-source=\"".concat(escapedSource, "\">").concat(content, "</div>");
        }

        // Handle GeoJSON maps
        if (info === 'geojson') {
          var geojsonId = 'geojson-' + Math.random().toString(36).substring(2, 15);
          // Content for GeoJSON is expected to be JSON, so it should be directly embeddable in <script>
          // No need for escaping here as it's part of a JS template literal for script content.
          return "<div id=\"".concat(geojsonId, "\" class=\"geojson-map\" data-source-type=\"geojson\" style=\"width: 100%; height: 300px;\"></div>\n                <script>\n                  (function() {\n                    const initMap = function() {\n                      if (typeof L !== 'undefined') {\n                        const mapContainer = document.getElementById('").concat(geojsonId, "');\n                        if (mapContainer && !mapContainer.dataset.initialized) {\n                          const map = L.map('").concat(geojsonId, "').setView([0, 0], 2);\n                          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n                            attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n                          }).addTo(map);\n                          \n                          try {\n                            const geojsonData = ").concat(content, ";\n                            const geojsonLayer = L.geoJSON(geojsonData).addTo(map);\n                            map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });\n                            mapContainer.dataset.initialized = 'true';\n                          } catch (e) {\n                            console.error('Error parsing GeoJSON:', e);\n                            mapContainer.innerHTML = '<div class=\"error\">Error parsing GeoJSON: ' + e.message + '</div>';\n                          }\n                        }\n                      } else {\n                        const link = document.createElement('link');\n                        link.rel = 'stylesheet';\n                        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';\n                        document.head.appendChild(link);\n                        \n                        const script = document.createElement('script');\n                        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';\n                        script.onload = initMap;\n                        document.head.appendChild(script);\n                      }\n                    };\n                    if (document.readyState === 'complete') {\n                      initMap();\n                    } else {\n                      window.addEventListener('load', initMap);\n                    }\n                  })();\n                </script>");
        }

        // Handle mathematical expressions
        if (info === 'math') {
          var mathId = 'math-' + Math.random().toString(36).substring(2, 15);
          // Content for math is LaTeX, escape it for HTML display before MathJax processes it.
          return "<div id=\"".concat(mathId, "\" class=\"math-display\" data-source-type=\"math\">$$").concat(escapedContent, "$$</div>\n                <script>\n                  (function() {\n                    function initMathJax() {\n                      if (typeof MathJax === 'undefined') {\n                        var script = document.createElement('script');\n                        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';\n                        script.async = true;\n                        script.onload = function() {\n                          window.MathJax = {\n                            tex: {\n                              inlineMath: [['$', '$']],\n                              displayMath: [['$$', '$$']]\n                            },\n                            svg: { fontCache: 'global' }\n                          };\n                          MathJax.typeset();\n                        };\n                        document.head.appendChild(script);\n                      } else {\n                        MathJax.typeset();\n                      }\n                    }\n                    if (document.readyState === 'complete') {\n                      initMathJax();\n                    } else {\n                      window.addEventListener('load', initMathJax);\n                    }\n                  })();\n                </script>");
        }
        var supportedTableFormats = {
          'csv': ',',
          'tsv': '\t',
          'psv': '|'
        };
        if (supportedTableFormats.hasOwnProperty(info)) {
          try {
            if (typeof Papa === 'undefined' || typeof Papa.parse !== 'function') {
              console.error('PapaParse library is not available. Please include it on the page.');
              return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangAttr, "\">Error: PapaParse library not loaded.</pre>");
            }
            var parseConfig = {
              skipEmptyLines: true
            };
            if (info !== 'tsv') {
              // TSV auto-detects delimiter
              parseConfig.delimiter = supportedTableFormats[info];
            }
            var parsedData = Papa.parse(content, parseConfig);
            if (parsedData.errors && parsedData.errors.length > 0) {
              var errorMessages = parsedData.errors.map(function (err) {
                return "".concat(err.type, ": ").concat(err.message, " (Row: ").concat(err.row, ")");
              }).join('\n');
              console.warn("PapaParse errors for ".concat(info, ":"), parsedData.errors);
              return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangAttr, "\">Error parsing ").concat(info, " data:\n").concat(_this.md.utils.escapeHtml(errorMessages), "</pre>");
            }
            // Wrap the generated table with a div carrying the data-source-type
            return "<div data-source-type=\"".concat(escapedLangAttr, "\">").concat(_this._dataToHtmlTable(parsedData.data), "</div>");
          } catch (e) {
            console.error("Error rendering ".concat(info, " table:"), e);
            return "<pre class=\"squibview-error\" data-source-type=\"".concat(escapedLangAttr, "\">Could not render ").concat(_this.md.utils.escapeHtml(info), " table.</pre>");
          }
        }

        // Default rendering for other code blocks, wrapped with data-source-type
        var renderedByDefault = defaultFence(tokens, idx, options, env, self);
        return "<div data-source-type=\"".concat(escapedLangAttr, "\">").concat(renderedByDefault, "</div>");
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
      var _this2 = this;
      if (!rows || rows.length === 0) {
        return '<p class="squibview-info">No data to display.</p>';
      }
      var html = '<table class="squibview-data-table">';

      // Header
      var headerCells = rows[0];
      html += '<thead><tr>';
      headerCells.forEach(function (cell) {
        html += "<th>".concat(_this2.md.utils.escapeHtml(String(cell)), "</th>");
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
      var _this3 = this;
      // Markdown renderer
      this.registerRenderer('md', {
        render: function render(source) {
          return _this3.renderMarkdown(source);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this3.md.render(source);
        },
        outputToSource: function outputToSource(output) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return _this3.htmlToMarkdown(output, options);
        },
        operations: {
          increaseHeadings: function increaseHeadings(src) {
            return _this3.markdownAdjustHeadings(src, 1);
          },
          decreaseHeadings: function decreaseHeadings(src) {
            return _this3.markdownAdjustHeadings(src, -1);
          },
          removeHR: function removeHR(src) {
            return src.replace(/---/g, '');
          },
          fixLinefeeds: function fixLinefeeds(src) {
            return _this3.fixLinefeedsInMarkdown(src);
          },
          toggleLinefeedView: function toggleLinefeedView() {
            _this3.toggleLinefeedView();
            return _this3.getContent();
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
          return _this3.renderHTML(source);
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
          return _this3.renderHTML(_this3.makeRevealJSFullPage(source));
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this3.makeRevealJSFullPage(source);
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
          var markdownTable = _this3.csvOrTsvToMarkdownTable(source, ',');
          _this3.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this3.csvOrTsvToMarkdownTable(source, ',');
        },
        outputToSource: function outputToSource(output) {
          return _this3.tableToCSV(output);
        },
        operations: {},
        buttons: []
      });

      // TSV renderer
      this.registerRenderer('tsv', {
        render: function render(source) {
          var markdownTable = _this3.csvOrTsvToMarkdownTable(source, '\t');
          _this3.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this3.csvOrTsvToMarkdownTable(source, '\t');
        },
        outputToSource: function outputToSource(output) {
          return _this3.tableToCSV(output, '\t');
        },
        operations: {},
        buttons: []
      });

      // Semicolon separated values renderer
      this.registerRenderer('semisv', {
        render: function render(source) {
          var markdownTable = _this3.csvOrTsvToMarkdownTable(source, ';');
          _this3.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this3.csvOrTsvToMarkdownTable(source, ';');
        },
        outputToSource: function outputToSource(output) {
          return _this3.tableToCSV(output, ';');
        },
        operations: {},
        buttons: []
      });

      // Space separated values renderer
      this.registerRenderer('ssv', {
        render: function render(source) {
          var markdownTable = _this3.csvOrTsvToMarkdownTable(source, ' ');
          _this3.renderMarkdown(markdownTable);
        },
        sourceToOutput: function sourceToOutput(source) {
          return _this3.csvOrTsvToMarkdownTable(source, ' ');
        },
        outputToSource: function outputToSource(output) {
          return _this3.tableToCSV(output, ' ');
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
      this.container.innerHTML = "\n      <div class=\"".concat(this.options.baseClass, "-title\" ").concat(!this.options.titleShow ? 'style="display:none"' : '', ">\n        ").concat(this.options.titleContent, "\n      </div>\n      <div class=\"").concat(this.options.baseClass, "-controls\" ").concat(!this.options.showControls ? 'style="display:none"' : '', ">\n        <button data-view='src'>Source</button>\n        <button data-view=\"html\">Rendered</button>\n        <button data-view=\"split\">Split</button>\n        <button class=\"copy-src-button\">Copy Source</button>\n        <button class=\"copy-html-button\">Copy Rendered</button>\n        <button class=\"revision-undo\" title=\"Undo\">&#x21A9;</button>\n        <button class=\"revision-redo\" title=\"Redo\">&#x21AA;</button>\n        <span class=\"").concat(this.options.baseClass, "-type-buttons\"></span>\n      </div>\n      <div class=\"").concat(this.options.baseClass, "-editor\">\n        <textarea class=\"").concat(this.options.baseClass, "-input\"></textarea>\n        <div class=\"").concat(this.options.baseClass, "-output\"></div>\n      </div>\n    ");
      this.title = this.container.querySelector(".".concat(this.options.baseClass, "-title"));
      this.controls = this.container.querySelector(".".concat(this.options.baseClass, "-controls"));
      this.editor = this.container.querySelector(".".concat(this.options.baseClass, "-editor"));
      this.input = this.container.querySelector(".".concat(this.options.baseClass, "-input"));
      this.output = this.container.querySelector(".".concat(this.options.baseClass, "-output"));
      this.typeButtonsContainer = this.container.querySelector(".".concat(this.options.baseClass, "-type-buttons"));
      this.universalButtonsContainer = this.container.querySelector(".".concat(this.options.baseClass, "-universal-buttons"));
    }

    /**
     * Updates the type-specific buttons based on the current content type
     * 
     * @private
     */
  }, {
    key: "updateTypeButtons",
    value: function updateTypeButtons() {
      var _this4 = this;
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
              var newContent = renderer.operations[button.action](_this4.getContent());
              _this4.setContent(newContent, _this4.inputContentType);
            }
          });
          _this4.typeButtonsContainer.appendChild(btn);
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
      var _this5 = this;
      // View buttons
      this.controls.querySelectorAll('button[data-view]').forEach(function (button) {
        button.addEventListener('click', function () {
          return _this5.setView(button.dataset.view);
        });
      });

      // Copy buttons
      this.controls.querySelector('.copy-src-button').addEventListener('click', function () {
        return _this5.copySource();
      });
      this.controls.querySelector('.copy-html-button').addEventListener('click', function () {
        return _this5.copyHTML();
      });

      // Undo/redo buttons
      this.controls.querySelector('.revision-undo').addEventListener('click', function () {
        return _this5.revisionUndo();
      });
      this.controls.querySelector('.revision-redo').addEventListener('click', function () {
        return _this5.revisionRedo();
      });

      // Input source change event
      this.input.addEventListener('input', function () {
        _this5.setContent();
      });

      // Text selection event in source panel
      this.input.addEventListener('mouseup', function () {
        var selection = document.getSelection();
        if (selection && selection.toString().trim() !== '') {
          var selectionData = {
            panel: 'source',
            text: selection.toString(),
            range: {
              start: _this5.input.selectionStart,
              end: _this5.input.selectionEnd
            }
          };
          _this5.lastSelectionData = selectionData;
          _this5.events.emit('text:selected', selectionData);
        }
      });

      // Listen for changes in rendered content to support bidirectional editing
      // Use a debounce pattern to prevent processing every keystroke
      var editDebounceTimer = null;

      // Create a map to store special content blocks
      this.specialContentBlocks = new Map();
      this.output.addEventListener('input', function () {
        if (_this5.currentView === 'html' || _this5.currentView === 'split') {
          var editableContent = _this5.output.querySelector('[contenteditable="true"]');
          if (editableContent) {
            // Clear any existing timer
            if (editDebounceTimer) {
              clearTimeout(editDebounceTimer);
            }

            // Set a new timer to process the edit after a short delay (300ms)
            editDebounceTimer = setTimeout(function () {
              var renderedContent = editableContent.innerHTML;
              var renderer = _this5.renderers[_this5.inputContentType];
              if (renderer && renderer.outputToSource) {
                // Get the original source markdown
                var originalSource = _this5.input.value;

                // Process the HTML back to markdown, passing original source for context
                var newSource = renderer.outputToSource(renderedContent, {
                  originalSource: originalSource
                });

                // Update source without triggering render cycle
                _this5.input.value = newSource;

                // Only save revision after editing stops for a moment
                _this5.revisionManager.addRevision(newSource, _this5.inputContentType);

                // Emit content change event
                _this5.events.emit('content:change', newSource, _this5.inputContentType);
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
            element: _this5.output.querySelector('[contenteditable="true"]')
          };
          _this5.lastSelectionData = selectionData;
          _this5.events.emit('text:selected', selectionData);
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
      var _this6 = this;
      var resizeObserver = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (entry.target === _this6.container) {
              _this6.adjustLayout();
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
        var _this7 = this;
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
                      if (_this7.options.preserveImageTags) {
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

              // Emit markdown:rendered event
              this.events.emit('markdown:rendered', markdown, html);
            case 25:
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
     * Converts HTML content to Markdown format using our HtmlToMarkdown converter.
     * 
     * @param {string} html - The HTML content to convert to Markdown
     * @param {Object} options - Additional options for conversion
     * @returns {string} The converted Markdown content
     */
    )
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
        this.input.classList.remove('squibview-hidden');
        this.output.classList.add('squibview-hidden');
        this.input.style.width = '100%';
        copyMDButton.classList.remove('squibview-hidden');
        copyHTMLButton.classList.add('squibview-hidden');
      } else if (view === 'html') {
        this.input.classList.add('squibview-hidden');
        this.output.classList.remove('squibview-hidden');
        this.output.style.width = '100%';
        copyMDButton.classList.add('squibview-hidden');
        copyHTMLButton.classList.remove('squibview-hidden');
      } else {
        // view == 'split'
        this.input.classList.remove('squibview-hidden');
        this.output.classList.remove('squibview-hidden');
        this.input.style.width = '50%';
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
      var _copySource = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var copyButton, markdownText, textarea;
        return _regeneratorRuntime().wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-src-button');
              copyButton.textContent = 'Copying...';
              _context4.prev = 2;
              markdownText = this.getMarkdownSource();
              _context4.prev = 4;
              _context4.next = 7;
              return navigator.clipboard.writeText(markdownText);
            case 7:
              _context4.next = 18;
              break;
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](4);
              textarea = document.createElement('textarea');
              textarea.value = markdownText;
              textarea.style.position = 'fixed';
              textarea.style.opacity = '0';
              document.body.appendChild(textarea);
              textarea.select();
              document.body.removeChild(textarea);
            case 18:
              copyButton.textContent = 'Copied!';
              _context4.next = 25;
              break;
            case 21:
              _context4.prev = 21;
              _context4.t1 = _context4["catch"](2);
              console.error('Copy Markdown failed:', _context4.t1);
              copyButton.textContent = 'Copy failed';
            case 25:
              setTimeout(function () {
                copyButton.textContent = 'Copy Source';
              }, 2000);
            case 26:
            case "end":
              return _context4.stop();
          }
        }, _callee3, this, [[2, 21], [4, 9]]);
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
     * Registers a callback function to be called when text is selected
     * 
     * @param {Function} callback - Function to call when text is selected
     * @returns {Function} Unsubscribe function to remove the callback
     */
  }, {
    key: "onTextSelected",
    value: function onTextSelected(callback) {
      var _this8 = this;
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
      }
      this.events.on('text:selected', callback);

      // Return unsubscribe function
      return function () {
        _this8.events.off('text:selected', callback);
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
      var _this9 = this;
      return this._onTextReplacementHandler ? function (selectionData) {
        var result = _this9._onTextReplacementHandler(selectionData);
        return result;
      } : null;
    }

    /**
     * Copies the rendered content to the clipboard with formatting.
     * Processes code blocks, SVG elements, and images to ensure they copy correctly.
     */,
    set: function set(handler) {
      var _this10 = this;
      console.log('[SquibView] onReplaceSelectedText setter called. Handler:', handler);
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
            _this10.replaceSelectedText(result, selectionData);
          }
        };

        // Register the handler
        this.events.on('text:selected', this._onTextReplacementHandler);
      }
    }
  }, {
    key: "copyHTML",
    value: (function () {
      var _copyHTML = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this11 = this;
        var copyButton, contentDiv, clone, images, _iterator3, _step3, _loop2, svgElements, _iterator4, _step4, _loop3, htmlContent, platform, tempDiv, selection, range, successful;
        return _regeneratorRuntime().wrap(function _callee4$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-html-button');
              copyButton.textContent = 'Copying...';
              _context7.prev = 2;
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              if (contentDiv) {
                _context7.next = 6;
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
              _iterator3 = _createForOfIteratorHelper(images);
              _context7.prev = 10;
              _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                var img, canvas, ctx, tempImg;
                return _regeneratorRuntime().wrap(function _loop2$(_context5) {
                  while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                      img = _step3.value;
                      _context5.prev = 1;
                      canvas = document.createElement('canvas');
                      ctx = canvas.getContext('2d'); // Create new image and wait for it to load
                      tempImg = new Image();
                      tempImg.crossOrigin = 'anonymous';
                      _context5.next = 8;
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
                        tempImg.src = img.src;
                      });
                    case 8:
                      _context5.next = 13;
                      break;
                    case 10:
                      _context5.prev = 10;
                      _context5.t0 = _context5["catch"](1);
                      console.error('Failed to convert image for copying:', _context5.t0);
                    case 13:
                    case "end":
                      return _context5.stop();
                  }
                }, _loop2, null, [[1, 10]]);
              });
              _iterator3.s();
            case 13:
              if ((_step3 = _iterator3.n()).done) {
                _context7.next = 17;
                break;
              }
              return _context7.delegateYield(_loop2(), "t0", 15);
            case 15:
              _context7.next = 13;
              break;
            case 17:
              _context7.next = 22;
              break;
            case 19:
              _context7.prev = 19;
              _context7.t1 = _context7["catch"](10);
              _iterator3.e(_context7.t1);
            case 22:
              _context7.prev = 22;
              _iterator3.f();
              return _context7.finish(22);
            case 25:
              // Convert SVG elements to PNG
              svgElements = clone.querySelectorAll('svg');
              _iterator4 = _createForOfIteratorHelper(svgElements);
              _context7.prev = 27;
              _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
                var svg, pngBlob, dataUrl, img;
                return _regeneratorRuntime().wrap(function _loop3$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      svg = _step4.value;
                      _context6.prev = 1;
                      _context6.next = 4;
                      return _this11.svgToPng(svg);
                    case 4:
                      pngBlob = _context6.sent;
                      _context6.next = 7;
                      return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                          return resolve(reader.result);
                        };
                        reader.readAsDataURL(pngBlob);
                      });
                    case 7:
                      dataUrl = _context6.sent;
                      img = document.createElement('img');
                      img.src = dataUrl;
                      img.width = svg.clientWidth || svg.viewBox.baseVal.width || 100;
                      img.height = svg.clientHeight || svg.viewBox.baseVal.height || 100;
                      img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
                      img.style.width = img.width + 'px';
                      img.style.height = img.height + 'px';
                      img.alt = "Converted diagram";
                      svg.parentNode.replaceChild(img, svg);
                      _context6.next = 22;
                      break;
                    case 19:
                      _context6.prev = 19;
                      _context6.t0 = _context6["catch"](1);
                      console.error('Failed to convert SVG:', _context6.t0);
                    case 22:
                    case "end":
                      return _context6.stop();
                  }
                }, _loop3, null, [[1, 19]]);
              });
              _iterator4.s();
            case 30:
              if ((_step4 = _iterator4.n()).done) {
                _context7.next = 34;
                break;
              }
              return _context7.delegateYield(_loop3(), "t2", 32);
            case 32:
              _context7.next = 30;
              break;
            case 34:
              _context7.next = 39;
              break;
            case 36:
              _context7.prev = 36;
              _context7.t3 = _context7["catch"](27);
              _iterator4.e(_context7.t3);
            case 39:
              _context7.prev = 39;
              _iterator4.f();
              return _context7.finish(39);
            case 42:
              htmlContent = "\n          <html xmlns:v=\"urn:schemas-microsoft-com:vml\"\n                xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                xmlns:w=\"urn:schemas-microsoft-com:office:word\">\n            <head>\n              <meta charset=\"utf-8\">\n              <style>\n                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }\n                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }\n                th { background-color: #f0f0f0; font-weight: bold; }\n\n                /* Code block styling */\n                .hljs { display: block; overflow-x: auto; padding: 1em; }\n                .hljs-keyword { color: #0033B3; }\n                .hljs-string { color: #067D17; }\n                .hljs-comment { color: #8C8C8C; }\n                .hljs-function { color: #00627A; }\n                .hljs-number { color: #1750EB; }\n                .hljs-operator { color: #687687; }\n                .hljs-punctuation { color: #000000; }\n\n                /* Word-specific image handling */\n                img { display: block; max-width: none; }\n              </style>\n            </head>\n            <body>\n              ".concat(clone.innerHTML, "\n            </body>\n          </html>");
              platform = this.getPlatform();
              if (!(platform === 'macos')) {
                _context7.next = 56;
                break;
              }
              _context7.prev = 45;
              _context7.next = 48;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 48:
              _context7.next = 54;
              break;
            case 50:
              _context7.prev = 50;
              _context7.t4 = _context7["catch"](45);
              if (this.copyToClipboard(htmlContent)) {
                _context7.next = 54;
                break;
              }
              throw new Error('Fallback copy failed');
            case 54:
              _context7.next = 80;
              break;
            case 56:
              // Windows/Linux approach
              tempDiv = document.createElement('div');
              tempDiv.style.position = 'fixed';
              tempDiv.style.left = '-9999px';
              tempDiv.style.top = '0';
              tempDiv.innerHTML = htmlContent;
              document.body.appendChild(tempDiv);
              _context7.prev = 62;
              _context7.next = 65;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 65:
              _context7.next = 77;
              break;
            case 67:
              _context7.prev = 67;
              _context7.t5 = _context7["catch"](62);
              selection = window.getSelection();
              range = document.createRange();
              range.selectNodeContents(tempDiv);
              selection.removeAllRanges();
              selection.addRange(range);
              successful = document.execCommand('copy');
              if (successful) {
                _context7.next = 77;
                break;
              }
              throw new Error('Fallback copy failed');
            case 77:
              _context7.prev = 77;
              if (tempDiv && tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }
              return _context7.finish(77);
            case 80:
              copyButton.textContent = 'Copied!';
              _context7.next = 87;
              break;
            case 83:
              _context7.prev = 83;
              _context7.t6 = _context7["catch"](2);
              console.error('Copy HTML failed:', _context7.t6);
              copyButton.textContent = 'Copy failed';
            case 87:
              setTimeout(function () {
                copyButton.textContent = 'Copy Rendered';
              }, 2000);
            case 88:
            case "end":
              return _context7.stop();
          }
        }, _callee4, this, [[2, 83], [10, 19, 22, 25], [27, 36, 39, 42], [45, 50], [62, 67, 77, 80]]);
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
        var svgWidth = svgElement.clientWidth || svgElement.viewBox.baseVal.width || 100;
        var svgHeight = svgElement.clientHeight || svgElement.viewBox.baseVal.height || 100;
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
        var svgDataUrl = "data:image/svg+xml;charset=utf-8,".concat(encodeURIComponent(svgString));
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
     * Detects the user's operating system platform.
     * 
     * @returns {string} The detected platform: 'macos', 'windows', 'linux', or 'unknown'
     */
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
  preserveImageTags: true // Changed default to true
});
_defineProperty(SquibView, "version", {
  version: VERSION,
  url: REPO_URL
});

export { SquibView as default };
//# sourceMappingURL=squibview.esm.js.map
