function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
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
      _next(undefined);
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
  return _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
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
    undefined === i && (i = Promise);
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
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (undefined !== e) {
    var i = e.call(t, r || "default");
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
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
  }
}

/* SquibView a live md/html/etc Editor/renderer with copy support
 supports markdown, html, and split view
 supports copying of formatted html and markdown
 supports copying of images as data urls
 supports copying of svg as png
 supports copying of tables as formatted tables
 supports copying of code blocks as formatted tables
 by deftio (c) 2024
*/
var SquibView = /*#__PURE__*/function () {
  function SquibView(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SquibView);
    this.options = _objectSpread2(_objectSpread2({}, SquibView.defaultOptions), options);
    this.container = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.container) {
      throw new Error('Container element not found');
    }
    this.initializeLibraries();
    this.createStructure();
    this.initializeEventHandlers();
    this.setContent(this.options.initialContent, this.options.inputContentType);
    this.setView(this.options.initialView);
    this.initializeResizeObserver();
  }
  return _createClass(SquibView, [{
    key: "initializeLibraries",
    value: function initializeLibraries() {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'default',
        errorCallback: function errorCallback(error) {
          console.warn("Mermaid error:", error);
          return "<div class='mermaid-error'></div>"; // Replace with custom message
        }
      });
      mermaid.init(undefined, ".mermaid");
      this.md = window.markdownit({
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
      var defaultFence = this.md.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      this.md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var info = token.info.trim();
        if (info === 'mermaid') {
          return '<div class="mermaid">' + token.content + '</div>';
        }
        if (info === 'svg') {
          return token.content;
        }
        return defaultFence(tokens, idx, options, env, self);
      };
    }
  }, {
    key: "createStructure",
    value: function createStructure() {
      this.container.classList.add(this.options.baseClass);
      this.container.innerHTML = "\n        <div class=\"".concat(this.options.baseClass, "-title\" ").concat(!this.options.titleShow ? 'style="display:none"' : '', ">\n          ").concat(this.options.titleContent, "\n        </div>\n        <div class=\"").concat(this.options.baseClass, "-controls\" ").concat(!this.options.showControls ? 'style="display:none"' : '', ">\n          <button data-view='src'>Markdown</button>\n          <button data-view=\"html\">Rendered</button>\n          <button data-view=\"split\">Split</button>\n          <button class=\"copy-src-button\">Copy MD</button>\n          <button class=\"copy-html-button\">Copy Formatted</button>\n        </div>\n        <div class=\"").concat(this.options.baseClass, "-editor\">\n          <textarea class=\"").concat(this.options.baseClass, "-input\"></textarea>\n          <div class=\"").concat(this.options.baseClass, "-output\"></div>\n        </div>\n      ");
      this.title = this.container.querySelector(".".concat(this.options.baseClass, "-title"));
      this.controls = this.container.querySelector(".".concat(this.options.baseClass, "-controls"));
      this.editor = this.container.querySelector(".".concat(this.options.baseClass, "-editor"));
      this.input = this.container.querySelector(".".concat(this.options.baseClass, "-input"));
      this.output = this.container.querySelector(".".concat(this.options.baseClass, "-output"));
    }
  }, {
    key: "initializeEventHandlers",
    value: function initializeEventHandlers() {
      var _this = this;
      this.controls.querySelectorAll('button[data-view]').forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.setView(button.dataset.view);
        });
      });
      this.controls.querySelector('.copy-src-button').addEventListener('click', function () {
        return _this.copySource();
      });
      this.controls.querySelector('.copy-html-button').addEventListener('click', function () {
        return _this.copyHTML();
      });

      //onchange() for input source
      this.input.addEventListener('input', function () {
        _this.renderOutput();
      });
    }
  }, {
    key: "initializeResizeObserver",
    value: function initializeResizeObserver() {
      var _this2 = this;
      var resizeObserver = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (entry.target === _this2.container) {
              _this2.adjustLayout();
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
    }
  }, {
    key: "setContent",
    value: function setContent(content, contentType) {
      this.input.value = content;
      // if the contentType isn't undefined then we'll set it:
      if (contentType) {
        this.inputContentType = contentType;
      }
      this.renderOutput();
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.input.value;
    }
  }, {
    key: "cleanMarkdown",
    value: function cleanMarkdown(md) {
      return md.replace(/^```markdown\s+/, '').replace(/```$/, '');
    }
  }, {
    key: "renderMarkdown",
    value: function () {
      var _renderMarkdown = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(md) {
        var markdown, html, contentDiv, images, _iterator2, _step2, _loop;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              markdown = md || this.input.value;
              html = this.md.render(markdown);
              this.output.innerHTML = "<div contenteditable='true'>" + html + "</div>";

              // Convert all images to data URLs immediately after rendering
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              images = contentDiv.querySelectorAll('img'); // render images to data urls
              _iterator2 = _createForOfIteratorHelper(images);
              _context2.prev = 6;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var img, canvas, ctx, tempImg;
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      img = _step2.value;
                      _context.prev = 1;
                      canvas = document.createElement('canvas');
                      ctx = canvas.getContext('2d'); // Create new image and wait for it to load
                      tempImg = new Image();
                      tempImg.crossOrigin = 'anonymous';
                      _context.next = 8;
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
                      _context.next = 13;
                      break;
                    case 10:
                      _context.prev = 10;
                      _context.t0 = _context["catch"](1);
                      console.error('Failed to convert image:', _context.t0);
                    case 13:
                    case "end":
                      return _context.stop();
                  }
                }, _loop, null, [[1, 10]]);
              });
              _iterator2.s();
            case 9:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 13;
                break;
              }
              return _context2.delegateYield(_loop(), "t0", 11);
            case 11:
              _context2.next = 9;
              break;
            case 13:
              _context2.next = 18;
              break;
            case 15:
              _context2.prev = 15;
              _context2.t1 = _context2["catch"](6);
              _iterator2.e(_context2.t1);
            case 18:
              _context2.prev = 18;
              _iterator2.f();
              return _context2.finish(18);
            case 21:
              // end of images to data urls

              // Initialize mermaid diagrams after all images are processed
              mermaid.init(undefined, this.output.querySelectorAll('.mermaid'));
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee, this, [[6, 15, 18, 21]]);
      }));
      function renderMarkdown(_x) {
        return _renderMarkdown.apply(this, arguments);
      }
      return renderMarkdown;
    }() // end of renderMarkdown
    // todo rename sourceRemoveAllHR ()  ==> handled markdown or html via replace (---) or (<hr>, <hr/>) respectively
  }, {
    key: "markdownRemoveAllHR",
    value: function markdownRemoveAllHR() {
      if (this.inputContentType === 'md') {
        var markdown = this.getMarkdownSource();
        var newMarkdown = markdown.replace(/---/g, '');
        this.setContent(newMarkdown, this.inputContentType);
      }
    }
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
    }
  }, {
    key: "copyContent",
    value: function () {
      var _copyContent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this3 = this;
        var copyButton, contentDiv, clone, svgElements, _iterator3, _step3, _loop2, imgElements, clipData;
        return _regeneratorRuntime().wrap(function _callee3$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-button');
              copyButton.textContent = 'Copying...';
              _context5.prev = 2;
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              if (contentDiv) {
                _context5.next = 6;
                break;
              }
              throw new Error('Content div not found');
            case 6:
              clone = contentDiv.cloneNode(true);
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
              svgElements = clone.querySelectorAll('svg');
              _iterator3 = _createForOfIteratorHelper(svgElements);
              _context5.prev = 10;
              _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
                var svg, pngBlob, dataUrl, img;
                return _regeneratorRuntime().wrap(function _loop2$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      svg = _step3.value;
                      _context4.prev = 1;
                      _context4.next = 4;
                      return _this3.svgToPng(svg);
                    case 4:
                      pngBlob = _context4.sent;
                      _context4.next = 7;
                      return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                          return resolve(reader.result);
                        };
                        reader.readAsDataURL(pngBlob);
                      });
                    case 7:
                      dataUrl = _context4.sent;
                      img = document.createElement('img');
                      img.src = dataUrl;
                      img.width = svg.clientWidth || svg.viewBox.baseVal.width || 100;
                      img.height = svg.clientHeight || svg.viewBox.baseVal.height || 100;
                      img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
                      img.style.width = img.width + 'px';
                      img.style.height = img.height + 'px';
                      img.alt = "Converted diagram";
                      svg.parentNode.replaceChild(img, svg);
                      _context4.next = 22;
                      break;
                    case 19:
                      _context4.prev = 19;
                      _context4.t0 = _context4["catch"](1);
                      console.error('Failed to convert SVG:', _context4.t0);
                    case 22:
                    case "end":
                      return _context4.stop();
                  }
                }, _loop2, null, [[1, 19]]);
              });
              _iterator3.s();
            case 13:
              if ((_step3 = _iterator3.n()).done) {
                _context5.next = 17;
                break;
              }
              return _context5.delegateYield(_loop2(), "t0", 15);
            case 15:
              _context5.next = 13;
              break;
            case 17:
              _context5.next = 22;
              break;
            case 19:
              _context5.prev = 19;
              _context5.t1 = _context5["catch"](10);
              _iterator3.e(_context5.t1);
            case 22:
              _context5.prev = 22;
              _iterator3.f();
              return _context5.finish(22);
            case 25:
              // Convert all images to data URLs
              imgElements = clone.querySelectorAll('img');
              _context5.next = 28;
              return Promise.all(imgElements.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(img) {
                  var canvas, ctx, tempImg, dataUrl, newImg;
                  return _regeneratorRuntime().wrap(function _callee2$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        console.log('Converting image:', img.src);

                        // Create canvas
                        canvas = document.createElement('canvas');
                        ctx = canvas.getContext('2d'); // Create new image and wait for it to load completely
                        tempImg = new Image();
                        tempImg.crossOrigin = 'anonymous';
                        _context3.prev = 5;
                        _context3.next = 8;
                        return new Promise(function (resolve, reject) {
                          tempImg.onload = resolve;
                          tempImg.onerror = reject;
                          tempImg.src = img.src;
                        });
                      case 8:
                        // Set dimensions
                        canvas.width = tempImg.offsetWidth || img.offsetWidth || 200;
                        canvas.height = tempImg.offsetHeight || img.offsetHeight || 200;

                        // Draw and convert
                        ctx.drawImage(tempImg, 0, 0);
                        dataUrl = canvas.toDataURL('image/png', 1.0); // Create and wait for new image with data URL
                        newImg = new Image();
                        _context3.next = 15;
                        return new Promise(function (resolve, reject) {
                          newImg.onload = function () {
                            newImg.alt = img.alt || 'Converted image';
                            newImg.width = canvas.width;
                            newImg.height = canvas.height;
                            newImg.style.cssText = img.style.cssText;
                            // Force image to be treated as embedded
                            newImg.setAttribute('data-embedded', 'true');
                            // Replace the old image
                            img.parentNode.replaceChild(newImg, img);
                            console.log('Successfully converted image to data URL');
                            resolve();
                          };
                          newImg.onerror = reject;
                          newImg.src = dataUrl;
                        });
                      case 15:
                        _context3.next = 20;
                        break;
                      case 17:
                        _context3.prev = 17;
                        _context3.t0 = _context3["catch"](5);
                        console.error('Error converting image:', _context3.t0, img.src);
                        // Don't rethrow - we want to continue with other images
                      case 20:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee2, null, [[5, 17]]);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 28:
              clipData = new ClipboardItem({
                'text/html': new Blob(["\n            <html xmlns:v=\"urn:schemas-microsoft-com:vml\"\n                  xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                  xmlns:w=\"urn:schemas-microsoft-com:office:word\">\n              <head>\n                <meta charset=\"utf-8\">\n                <style>\n                  table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }\n                  th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }\n                  th { background-color: #f0f0f0; font-weight: bold; }\n\n                  /* Code block styling */\n                  .hljs { display: block; overflow-x: auto; padding: 1em; }\n                  .hljs-keyword { color: #0033B3; }\n                  .hljs-string { color: #067D17; }\n                  .hljs-comment { color: #8C8C8C; }\n                  .hljs-function { color: #00627A; }\n                  .hljs-number { color: #1750EB; }\n                  .hljs-operator { color: #687687; }\n                  .hljs-punctuation { color: #000000; }\n\n                  /* Word-specific image handling */\n                  img { display: block; max-width: none; }\n                </style>\n              </head>\n              <body>\n                ".concat(clone.innerHTML, "\n              </body>\n            </html>\n          ")], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              });
              _context5.next = 31;
              return navigator.clipboard.write([clipData]);
            case 31:
              copyButton.textContent = 'Copied!';
              _context5.next = 38;
              break;
            case 34:
              _context5.prev = 34;
              _context5.t2 = _context5["catch"](2);
              console.error('Copy failed:', _context5.t2);
              copyButton.textContent = 'Copy failed';
            case 38:
              setTimeout(function () {
                copyButton.textContent = 'Copy';
              }, 2000);
            case 39:
            case "end":
              return _context5.stop();
          }
        }, _callee3, this, [[2, 34], [10, 19, 22, 25]]);
      }));
      function copyContent() {
        return _copyContent.apply(this, arguments);
      }
      return copyContent;
    }()
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
  }, {
    key: "controlsShow",
    value: function controlsShow(show) {
      this.controls.style.display = show ? '' : 'none';
      this.options.showControls = show;
      this.adjustLayout();
    }
  }, {
    key: "titleShow",
    value: function titleShow(show) {
      this.title.style.display = show ? '' : 'none';
      this.options.titleShow = show;
      this.adjustLayout();
    }
  }, {
    key: "titleSetContent",
    value: function titleSetContent(content) {
      this.title.innerHTML = content;
      this.options.titleContent = content;
    }
  }, {
    key: "titleGetContent",
    value: function titleGetContent() {
      return this.title.innerHTML;
    }
  }, {
    key: "getMarkdownSource",
    value: function getMarkdownSource() {
      return this.input.value;
    }
  }, {
    key: "getHTMLSource",
    value: function getHTMLSource() {
      return this.output.querySelector('div[contenteditable="true"]').innerHTML;
    }

    // Standalone function to toggle between Markdown preview and split view
  }, {
    key: "toggleView",
    value: function toggleView() {
      var editor = window.editor;
      if (editor.currentView === 'src') {
        editor.setView('split');
      } else if (editor.currentView === 'split') {
        editor.setView('html');
      } else editor.setView('src');
      console.log(editor.currentView);
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

      //iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
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
    // this function takes input as html and renders it in an iframe in the output div
    // it write to the outputDiv that is a member of this object
  }, {
    key: "renderHTML",
    value: function renderHTML(src) {
      var htmlContent = src;
      var outputDiv = this.output;
      this.insertContentInIframe(outputDiv, htmlContent);
    }
  }, {
    key: "renderOutput",
    value: function renderOutput() {
      switch (this.inputContentType) {
        case 'html':
          this.renderHTML(this.input.value);
          break;
        case 'reveal':
          this.renderHTML(this.makeRevealJSFullPage(this.input.value));
          break;
        case 'csv': // comma separated
        case 'tsv': // tab separated
        case 'semisv': // semicolon separated
        case 'ssv':
          //space separated
          // take the input and treat it as csv / tsv and convert it to markdown to render on the fly
          var data = this.getContent();
          // delimiter can be commma, tab, space, or semi-colon
          var delimiter = ",";
          var delims = {
            "tsv": ",",
            "semisv": ";",
            "ssv": " "
          };
          if (this.inputContentType in delims) delimiter = delims[this.inputContentType];
          var markdownTable = this.csvOrTsvToMarkdownTable(data, delimiter);
          this.renderMarkdown(markdownTable);
          break;
        case 'md':
          this.renderMarkdown();
          break;
        default:
          this.renderMarkdown();
          console.log("Unsupported content type: ", this.inputContentType);
      }
    }
  }, {
    key: "copySource",
    value: function () {
      var _copySource = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var copyButton, markdownText, textarea;
        return _regeneratorRuntime().wrap(function _callee4$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-src-button');
              copyButton.textContent = 'Copying...';
              _context6.prev = 2;
              markdownText = this.getMarkdownSource();
              _context6.prev = 4;
              _context6.next = 7;
              return navigator.clipboard.writeText(markdownText);
            case 7:
              _context6.next = 18;
              break;
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](4);
              textarea = document.createElement('textarea');
              textarea.value = markdownText;
              textarea.style.position = 'fixed';
              textarea.style.opacity = '0';
              document.body.appendChild(textarea);
              textarea.select();

              //const successful = document.execCommand('copy');
              document.body.removeChild(textarea);

              //if (!successful) throw new Error('Fallback copy failed');
            case 18:
              copyButton.textContent = 'Copied!';
              _context6.next = 25;
              break;
            case 21:
              _context6.prev = 21;
              _context6.t1 = _context6["catch"](2);
              console.error('Copy Markdown failed:', _context6.t1);
              copyButton.textContent = 'Copy failed';
            case 25:
              setTimeout(function () {
                copyButton.textContent = 'Copy MD';
              }, 2000);
            case 26:
            case "end":
              return _context6.stop();
          }
        }, _callee4, this, [[2, 21], [4, 9]]);
      }));
      function copySource() {
        return _copySource.apply(this, arguments);
      }
      return copySource;
    }()
  }, {
    key: "copyHTML",
    value: function () {
      var _copyHTML = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _this4 = this;
        var copyButton, contentDiv, clone, svgElements, _iterator4, _step4, _loop3, htmlContent, platform, tempDiv, selection, range, successful;
        return _regeneratorRuntime().wrap(function _callee5$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              copyButton = this.controls.querySelector('.copy-html-button');
              copyButton.textContent = 'Copying...';
              _context8.prev = 2;
              contentDiv = this.output.querySelector('div[contenteditable="true"]');
              if (contentDiv) {
                _context8.next = 6;
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

              // Convert SVG elements to PNG
              svgElements = clone.querySelectorAll('svg');
              _iterator4 = _createForOfIteratorHelper(svgElements);
              _context8.prev = 10;
              _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
                var svg, pngBlob, dataUrl, img;
                return _regeneratorRuntime().wrap(function _loop3$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      svg = _step4.value;
                      _context7.prev = 1;
                      _context7.next = 4;
                      return _this4.svgToPng(svg);
                    case 4:
                      pngBlob = _context7.sent;
                      _context7.next = 7;
                      return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onloadend = function () {
                          return resolve(reader.result);
                        };
                        reader.readAsDataURL(pngBlob);
                      });
                    case 7:
                      dataUrl = _context7.sent;
                      img = document.createElement('img');
                      img.src = dataUrl;
                      img.width = svg.clientWidth || svg.viewBox.baseVal.width || 100;
                      img.height = svg.clientHeight || svg.viewBox.baseVal.height || 100;
                      img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
                      img.style.width = img.width + 'px';
                      img.style.height = img.height + 'px';
                      img.alt = "Converted diagram";
                      svg.parentNode.replaceChild(img, svg);
                      _context7.next = 22;
                      break;
                    case 19:
                      _context7.prev = 19;
                      _context7.t0 = _context7["catch"](1);
                      console.error('Failed to convert SVG:', _context7.t0);
                    case 22:
                    case "end":
                      return _context7.stop();
                  }
                }, _loop3, null, [[1, 19]]);
              });
              _iterator4.s();
            case 13:
              if ((_step4 = _iterator4.n()).done) {
                _context8.next = 17;
                break;
              }
              return _context8.delegateYield(_loop3(), "t0", 15);
            case 15:
              _context8.next = 13;
              break;
            case 17:
              _context8.next = 22;
              break;
            case 19:
              _context8.prev = 19;
              _context8.t1 = _context8["catch"](10);
              _iterator4.e(_context8.t1);
            case 22:
              _context8.prev = 22;
              _iterator4.f();
              return _context8.finish(22);
            case 25:
              htmlContent = "\n          <html xmlns:v=\"urn:schemas-microsoft-com:vml\"\n                xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n                xmlns:w=\"urn:schemas-microsoft-com:office:word\">\n            <head>\n              <meta charset=\"utf-8\">\n              <style>\n                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }\n                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }\n                th { background-color: #f0f0f0; font-weight: bold; }\n\n                /* Code block styling */\n                .hljs { display: block; overflow-x: auto; padding: 1em; }\n                .hljs-keyword { color: #0033B3; }\n                .hljs-string { color: #067D17; }\n                .hljs-comment { color: #8C8C8C; }\n                .hljs-function { color: #00627A; }\n                .hljs-number { color: #1750EB; }\n                .hljs-operator { color: #687687; }\n                .hljs-punctuation { color: #000000; }\n\n                /* Word-specific image handling */\n                img { display: block; max-width: none; }\n              </style>\n            </head>\n            <body>\n              ".concat(clone.innerHTML, "\n            </body>\n          </html>");
              platform = this.getPlatform();
              if (!(platform === 'macos')) {
                _context8.next = 39;
                break;
              }
              _context8.prev = 28;
              _context8.next = 31;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 31:
              _context8.next = 37;
              break;
            case 33:
              _context8.prev = 33;
              _context8.t2 = _context8["catch"](28);
              if (this.copyToClipboard(htmlContent)) {
                _context8.next = 37;
                break;
              }
              throw new Error('Fallback copy failed');
            case 37:
              _context8.next = 63;
              break;
            case 39:
              // Windows/Linux approach
              tempDiv = document.createElement('div');
              tempDiv.style.position = 'fixed';
              tempDiv.style.left = '-9999px';
              tempDiv.style.top = '0';
              tempDiv.innerHTML = htmlContent;
              document.body.appendChild(tempDiv);
              _context8.prev = 45;
              _context8.next = 48;
              return navigator.clipboard.write([new ClipboardItem({
                'text/html': new Blob([htmlContent], {
                  type: 'text/html'
                }),
                'text/plain': new Blob([clone.innerText], {
                  type: 'text/plain'
                })
              })]);
            case 48:
              _context8.next = 60;
              break;
            case 50:
              _context8.prev = 50;
              _context8.t3 = _context8["catch"](45);
              selection = window.getSelection();
              range = document.createRange();
              range.selectNodeContents(tempDiv);
              selection.removeAllRanges();
              selection.addRange(range);
              successful = document.execCommand('copy');
              if (successful) {
                _context8.next = 60;
                break;
              }
              throw new Error('Fallback copy failed');
            case 60:
              _context8.prev = 60;
              if (tempDiv && tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
              }
              return _context8.finish(60);
            case 63:
              copyButton.textContent = 'Copied!';
              _context8.next = 70;
              break;
            case 66:
              _context8.prev = 66;
              _context8.t4 = _context8["catch"](2);
              console.error('Copy HTML failed:', _context8.t4);
              copyButton.textContent = 'Copy failed';
            case 70:
              setTimeout(function () {
                copyButton.textContent = 'Copy Formatted';
              }, 2000);
            case 71:
            case "end":
              return _context8.stop();
          }
        }, _callee5, this, [[2, 66], [10, 19, 22, 25], [28, 33], [45, 50, 60, 63]]);
      }));
      function copyHTML() {
        return _copyHTML.apply(this, arguments);
      }
      return copyHTML;
    }()
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

    // Make a complete HTML page from a div (or any html snippet) with optional editability
  }, {
    key: "makeHTMLPageFromDiv",
    value: function makeHTMLPageFromDiv(inputDivHTML) {
      var editable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var editableAttr = editable ? 'contenteditable="true"' : '';
      var s = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Markdown Viewer with Graphics Support</title>\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css\">\n  <xscripx src=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js\"></xscripx>\n  <xscripx src=\"https://unpkg.com/mermaid/dist/mermaid.min.js\"></xscripx>\n  <style>\n      body {\n          font-family: Arial, sans-serif;\n          box-sizing: border-box;\n          padding: 20px;\n      }\n      .squibview-output {\n          width: 50%;\n          margin: auto;\n      }\n      pre {\n          background-color: #f4f4f4;\n          padding: 10px;\n          border-radius: 5px;\n          overflow-x: auto;\n      }\n      table {\n          width: 100%;\n          border-collapse: collapse;\n          margin: 20px 0;\n      }\n      table, th, td {\n          border: 1px solid black;\n      }\n      th, td {\n          padding: 8px;\n          text-align: left;\n      }\n  </style>\n</head>\n<body ".concat(editableAttr, ">\n  ").concat(inputDivHTML, "\n</body>\n</html>");
      // now we need to remove the temp-script tag with the script in it.
      // we do this with a regex search/replace
      s = s.replaceAll("xscripx", "script");
      console.log(editableAttr);
      return s;
    }
  }, {
    key: "makeRevealJSFullPage",
    value: function makeRevealJSFullPage(markdown) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Slide Presentation";
      return "<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n      <meta charset=\"utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>".concat(title, "</title>\n      <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css\">\n      <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css\">\n      <script src=\"https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js\"></script>\n  </head>\n  <body>\n      <div class=\"reveal\" contenteditable=\"true\">\n          <div class=\"slides\">\n              ").concat(markdown.split('---').map(function (slide) {
        return "<section data-markdown><script type=\"text/template\">".concat(slide.trim(), "</script></section>");
      }).join('\n'), "\n          </div>\n      </div>\n      <script src=\"https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js\"></script>\n      <script src=\"https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js\"></script>\n      <script>\n          Reveal.initialize({\n              plugins: [ RevealMarkdown ]\n          });\n          \n          // Ensure Mermaid diagrams initialize correctly\n          document.addEventListener('DOMContentLoaded', () => {\n              mermaid.initialize({ startOnLoad: true , securityLevel: 'loose', theme: 'dark' });\n              document.querySelectorAll('.mermaid').forEach(el => {\n                  el.innerHTML = el.textContent;\n                  mermaid.init(undefined, el);\n              });\n          });\n      </script>\n  </body>\n  </html>");
    }
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
  }]);
}(); // end of class SquibView
_defineProperty(SquibView, "defaultOptions", {
  initialContent: '',
  inputContentType: 'md',
  // 'md', 'html', 'reveal', 'csv' or 'tsv'
  showControls: true,
  titleShow: false,
  titleContent: '',
  initialView: 'split',
  baseClass: 'squibview'
});
_defineProperty(SquibView, "version", {
  version: "0.0.26",
  url: "https://github.com/deftio/squibview"
});

export { SquibView as default };
//# sourceMappingURL=squibview.esm.js.map
