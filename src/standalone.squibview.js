// standalone.js
// this file helps build a complete standalone for squibiew

// Import the libraries from their proper entry points so Rollup bundles them
import hljs from 'highlight.js/lib/core';
import markdownit from 'markdown-it';
import mermaid from 'mermaid';

// Optionally, import the necessary CSS (if you want them inlined or processed by your CSS plugin)
import 'highlight.js/styles/default.css';

// In the standalone build, assign them to window so that SquibView (which expects globals) finds them.
window.hljs = hljs;
window.markdownit = markdownit;
window.mermaid = mermaid;

// Now import SquibView itself
import SquibView from './squibview.js';
export default SquibView;
