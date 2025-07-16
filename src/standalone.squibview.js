// standalone.js
// this file helps build a complete standalone for squibiew

// Import the libraries from their proper entry points so Rollup bundles them
import hljs from 'highlight.js/lib/core';
import markdownit from 'markdown-it';
import mermaid from 'mermaid';
import Papa from 'papaparse';
import * as leaflet from 'leaflet';
import * as topojson from 'topojson-client';
import * as THREE from 'three';

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

// Optionally, import the necessary CSS (if you want them inlined or processed by your CSS plugin)
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
// Leaflet sets window.L itself when imported, but we ensure it's set
if (!window.L) {
  window.L = leaflet;
}
window.topojson = topojson;
window.THREE = THREE;

// Configure Leaflet marker icons for standalone build
if (window.L && window.L.Icon && window.L.Icon.Default) {
  // Delete the _getIconUrl function to prevent automatic URL generation
  delete window.L.Icon.Default.prototype._getIconUrl;
  
  // Use small inline SVG icons for true offline support
  window.L.Icon.Default.mergeOptions({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSI0MSIgdmlld0JveD0iMCAwIDI1IDQxIj48cGF0aCBmaWxsPSIjMzM4OGZmIiBzdHJva2U9IiMxMTQ0YWEiIGQ9Ik0xMi41IDAuNUMxOS40MDQgMC41IDI0LjUgNS41OTYgMjQuNSAxMi41YzAgOS41ODUtMTIgMjgtMTIgMjhzLTEyLTE4LjQxNS0xMi0yOEMwLjUgNS41OTYgNS41OTYgMC41IDEyLjUgMC41eiIvPjxjaXJjbGUgY3g9IjEyLjUiIGN5PSIxMi41IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
    shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDQwIDIwIj48ZWxsaXBzZSBjeD0iMjAiIGN5PSIxMCIgcng9IjIwIiByeT0iMTAiIGZpbGw9ImJsYWNrIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

// Now import SquibView itself
import SquibView from './squibview.js';
export default SquibView;