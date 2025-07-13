# SquibView

[![NPM Version](https://img.shields.io/npm/v/squibview.svg)](https://www.npmjs.com/package/squibview)
[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/deftio/squibview/ci.yml?branch=main&style=flat&logo=github&label=Build&color=blue)](https://github.com/deftio/squibview/actions/workflows/ci.yml)

JavaScript editor/viewer for Markdown and HTML with live preview, bidirectional editing, and rich content support.

[**Live Demo**](https://deftio.github.io/squibview/examples/example_ESM.html) | [**Documentation**](https://deftio.github.io/squibview/docs/home.html) | [**API Reference**](https://deftio.github.io/squibview/docs/programmers-guide.html) | [**Local Demo**](./examples/index.html)

<img src="./squibview-demo.gif" alt="SquibView Live Demo - Progressive markdown rendering showing headings, bullets, tables, diagrams, math, and maps" width="100%">

## What It Does

SquibView renders Markdown (or HTML) with live preview and allows editing in both source and rendered views. Changes sync automatically between views.

**Key Capabilities:**
- Edit markdown and see live HTML preview
- Edit in the rendered view - changes reflect back to markdown
- Full revision history with undo/redo
- Visual diff comparison between any revisions
- Export/copy as HTML with embedded images
- Works as CLI tool or JavaScript component

**Supported Content:**
- 📊 Mermaid diagrams, flowcharts, sequence diagrams
- 🗺️ GeoJSON/TopoJSON interactive maps
- 🧮 LaTeX math equations
- 📐 STL 3D models
- 📈 CSV/TSV tables
- 🎨 SVG graphics
- 🖼️ Images with base64 conversion
- 💻 Syntax-highlighted code

## Quick Start

### Browser (ESM) - Now with Bundled Dependencies! 🎉
```html
<!-- SquibView CSS -->
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">

<!-- Optional: Only needed for syntax highlighting and diagrams -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>

<script type="module">
  // SquibView ESM build - markdown-it is now bundled! No import maps needed!
  import SquibView from 'https://unpkg.com/squibview/dist/squibview.esm.min.js';
  
  const editor = new SquibView('#editor', {
    initialContent: '# Hello\nStart typing **markdown**...'
  });
</script>

<div id="editor"></div>
```

> **New in v1.0.15**: Default builds now include markdown-it bundled. No more import map errors! For advanced users who want to manage dependencies, use the `-lean` builds.

### NPM Install
```bash
npm install squibview
```

```javascript
import SquibView from 'squibview';
const editor = new SquibView('#editor');
```

### CLI Tool

SquibView includes a command line tool (`squibv`) for converting markdown/HTML files to standalone HTML pages.

```bash
# Convert markdown to HTML page
npx squibv document.md

# Watch mode - rebuilds on file changes
npx squibv document.md --watch

# Bundle for offline use (embeds all assets)
npx squibv document.md --bundle-offline
```

## Core Features

### View Modes
```javascript
editor.setView('split');  // Side-by-side editing (default)
editor.setView('src');    // Source only
editor.setView('html');   // Rendered only
```

### Working with Content
```javascript
// Set markdown content
editor.setContent('# My Document\n\nEdit this text...', 'md');

// Get current content
const markdown = editor.getContent();
const html = editor.getRenderedHTML();
```

### Revision History & Diffs
```javascript
editor.revisionUndo();
editor.revisionRedo();

// Compare revisions (v1.0.13+)
const diffHTML = editor.getSourceDiffHTML({ fromIndex: 0, toIndex: 2 });
const inlineDiff = editor.getSourceDiffInline(); // Blue additions, red deletions
```

### Export & Copy
```javascript
editor.copySource();   // Copy markdown to clipboard
editor.copyHTML();     // Copy rendered HTML
editor.exportHTML();   // Download as file
```

## Examples

**Live Examples** (GitHub Pages)
- [Basic Usage](https://deftio.github.io/squibview/examples/example_ESM.html) - Simple editor setup
- [Diff Viewer](https://deftio.github.io/squibview/examples/diff_view_inline.html) - Compare revisions
- [Live Diff](https://deftio.github.io/squibview/examples/diff_view_live.html) - Track changes in real-time
- [React Integration](https://deftio.github.io/squibview/examples/example_react.html) - Use with React

**Local Examples** (after cloning repo)
- [Basic Usage](./examples/example_ESM.html)
- [Diff Viewer](./examples/diff_view_inline.html) 
- [Live Diff](./examples/diff_view_live.html)
- [All Examples](./examples/index.html)

## Documentation

**Online Documentation**
- [Quick Start Guide](https://deftio.github.io/squibview/docs/guides/01-quick-start.html) - Get running in 5 minutes
- [API Reference](https://deftio.github.io/squibview/docs/programmers-guide.html) - Methods, options, events
- [CLI Documentation](https://deftio.github.io/squibview/docs/guides/04-cli-usage.html) - Command line usage

**Local Documentation** (after cloning)
- [Documentation Home](./docs/home.html)
- [API Reference](./docs/programmers-guide.html)

## Build Options

| Build | When to Use | Size | What's Included |
|-------|-------------|------|-----------------|
| `squibview.esm.min.js` | Modern bundlers (webpack, vite) | ~240KB | markdown-it bundled |
| `squibview.esm-lean.min.js` | When you manage markdown-it | ~140KB | No dependencies |
| `squibview.umd.min.js` | Script tags | ~250KB | markdown-it bundled |
| `squibview.umd-lean.min.js` | Legacy with own dependencies | ~140KB | No dependencies |
| `squibview.standalone.umd.min.js` | Zero setup needed | ~3.7MB | Everything bundled |

> **v1.0.15 Change**: Default builds now include markdown-it, diff-match-patch, and tiny-emitter bundled. Use `-lean` builds if you need the old behavior.

## License

BSD-2-Clause. See [LICENSE](LICENSE).