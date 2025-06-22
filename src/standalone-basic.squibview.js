// standalone-basic.js
// This file helps build a basic standalone version for SquibView
// Includes core functionality but excludes heavy dependencies like Three.js

// Import the libraries from their proper entry points so Rollup bundles them
import hljs from 'highlight.js/lib/core';
import markdownit from 'markdown-it';
import mermaid from 'mermaid';
import Papa from 'papaparse';
import leaflet from 'leaflet';

// Import highlight.js languages
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import c from 'highlight.js/lib/languages/c';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';

// Import CSS files
import 'highlight.js/styles/default.css';
import 'leaflet/dist/leaflet.css';

// Register languages with hljs
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c++', cpp);
hljs.registerLanguage('c', c);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('xml', html);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', shell);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);

// In the standalone build, assign them to window so that SquibView (which expects globals) finds them.
window.hljs = hljs;
window.markdownit = markdownit;
window.mermaid = mermaid;
window.Papa = Papa;
window.L = leaflet;

// Note: Three.js is NOT included in the basic build to keep size down
// STL rendering will show "Three.js library not loaded" message

// Now import SquibView itself
import SquibView from './squibview.js';
export default SquibView;