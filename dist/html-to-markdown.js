import TurndownService from 'turndown';

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
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (undefined !== e) {
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

      // Preserve SVG elements with special identifiers
      this.turndownService.addRule('svg', {
        filter: 'svg',
        replacement: function replacement(content, node) {
          // Generate a unique ID for this SVG block
          var blockId = 'svg_' + Math.random().toString(36).substring(2, 10);

          // Store the raw SVG for later use
          var serializer = new XMLSerializer();
          var svgString = serializer.serializeToString(node);
          if (_this._specialBlocks) {
            _this._specialBlocks.set(blockId, {
              type: 'svg',
              content: svgString
            });
          }

          // Return with special marker
          return "\n<div data-special-block=\"".concat(blockId, "\" class=\"svg-container\">\n") + svgString + "\n</div>\n";
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
          // If the table doesn't have a header row, we need to add the separator
          if (!node.querySelector('thead') && node.querySelector('tr')) {
            var firstRow = node.querySelector('tr');
            var cells = firstRow.querySelectorAll('th, td').length;
            var separator = '\n|' + ' --- |'.repeat(cells) + '\n';

            // Insert separator after the first row
            var rows = content.split('\n');
            if (rows.length > 0) {
              return rows[0] + separator + rows.slice(1).join('\n') + '\n\n';
            }
          }
          return content + '\n\n';
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

      // Use a hash of the HTML as the cache key
      var cacheKey = this._getStringHash(html);

      // Check if we have a cached version
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      // Convert the HTML to Markdown
      var markdown = this.turndownService.turndown(html);

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
      // First pass: Convert the special blocks markers back to proper markdown

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
          if (type === 'mermaid' || type === 'svg') {
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
      }
      return markdown;
    }
  }]);
}();

export { HtmlToMarkdown as default };
//# sourceMappingURL=html-to-markdown.js.map
