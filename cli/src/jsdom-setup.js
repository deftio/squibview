/**
 * jsdom-setup.js
 * Sets up jsdom environment with browser API mocks for SquibView
 * Based on the test suite configuration
 */

import { JSDOM } from 'jsdom';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';

export function createJSDOMEnvironment() {
  // Create JSDOM instance with basic HTML structure
  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="squibview-container"></div></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });

  const { window } = dom;
  const { document } = window;

  // Register highlight.js languages
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('js', javascript);
  hljs.registerLanguage('python', python);
  hljs.registerLanguage('py', python);
  hljs.registerLanguage('html', html);
  hljs.registerLanguage('xml', html);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('shell', bash);
  hljs.registerLanguage('sh', bash);
  hljs.registerLanguage('markdown', markdown);
  hljs.registerLanguage('md', markdown);

  // Make globals available
  global.window = window;
  global.document = document;
  
  // Make highlight.js globally available for SquibView
  window.hljs = hljs;
  global.hljs = hljs;
  
  // Handle navigator carefully - it might be read-only
  if (!global.navigator) {
    global.navigator = window.navigator;
  }

  // Mock ResizeObserver
  global.ResizeObserver = function ResizeObserver() {
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {}
    };
  };

  // Mock scrollIntoView
  window.Element.prototype.scrollIntoView = () => {};

  // Mock mermaid
  global.mermaid = {
    initialize: () => {},
    init: () => {},
    contentLoaded: () => {}
  };

  // Mock highlight.js
  global.hljs = {
    getLanguage: () => true,
    highlight: (str, langOptions) => ({ value: `<span class="hljs-code">${str}</span>` })
  };

  // Mock RevealJS
  global.Reveal = {
    initialize: () => {}
  };

  // Mock clipboard API
  Object.defineProperty(window.navigator, 'clipboard', {
    value: {
      writeText: async () => {},
      write: async () => {}
    },
    writable: true
  });

  // Mock ClipboardItem
  global.ClipboardItem = class ClipboardItem {
    constructor(data) {
      this.data = data;
    }
  };

  // Mock document selection methods
  document.createRange = () => ({
    selectNodeContents: () => {},
    cloneContents: () => document.createDocumentFragment(),
    deleteContents: () => {},
    insertNode: () => {},
    setStartAfter: () => {},
    setEndAfter: () => {},
    collapse: () => {}
  });

  global.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => ({
      cloneContents: () => document.createDocumentFragment(),
      deleteContents: () => {},
      insertNode: () => {},
      setStartAfter: () => {},
      setEndAfter: () => {},
      collapse: () => {},
      commonAncestorContainer: document.createElement('div')
    }),
    toString: () => 'Selected Text',
    anchorNode: document.createElement('div')
  });

  // Mock execCommand
  document.execCommand = () => true;

  // Mock MathJax (for math rendering support)
  global.MathJax = {
    tex: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] },
    svg: { fontCache: 'global' },
    startup: {
      ready: () => {
        document.dispatchEvent(new window.Event('mathjax-global-ready'));
      },
      promise: Promise.resolve(),
      defaultReady: () => {},
    },
    typesetPromise: () => Promise.resolve()
  };

  // Mock canvas for image processing
  const originalCreateElement = document.createElement.bind(document);
  document.createElement = function(tagName) {
    if (tagName === 'canvas') {
      const canvas = originalCreateElement('canvas');
      canvas.getContext = () => ({
        drawImage: () => {},
        getImageData: () => ({ data: new Uint8ClampedArray(4) }),
        putImageData: () => {},
        fillRect: () => {},
        clearRect: () => {},
        beginPath: () => {},
        closePath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        stroke: () => {},
        fill: () => {}
      });
      canvas.toDataURL = () => 'data:image/png;base64,mock';
      canvas.width = 100;
      canvas.height = 100;
      return canvas;
    }
    return originalCreateElement(tagName);
  };

  // Mock Image constructor
  global.Image = function Image() {
    const img = {
      onload: null,
      onerror: null,
      src: '',
      naturalWidth: 100,
      naturalHeight: 100,
      crossOrigin: ''
    };
    
    // Auto-trigger onload when src is set
    Object.defineProperty(img, 'src', {
      set: function(value) {
        this._src = value;
        // Simulate async loading
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 0);
      },
      get: function() { return this._src; }
    });
    
    return img;
  };

  // Return the window and document for use
  return { window, document };
}