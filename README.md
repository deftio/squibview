# SquibView

[![NPM Version](https://img.shields.io/npm/v/squibview.svg)](https://www.npmjs.com/package/squibview)
[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/deftio/squibview/ci.yml?branch=main&style=flat&logo=github&label=Build&color=blue)](https://github.com/deftio/squibview/actions/workflows/ci.yml)

[Live Demo](https://deftio.github.io/squibview/examples/example_ESM.html)

**SquibView is a headless JavaScript embeddable editor/viewer that renders GitHub-Flavored Markdown (or full HTML pages) on the fly.**

For Markdown inputs, it supports rendering Mermaid diagrams, GeoJSON/TopoJSON maps, STL 3D models, math equations, syntax-highlighted code blocks, tables, CSV data, and inline SVG graphics. This provides a powerful and interactive way to view and export Markdown content as HTML.  Squibview live-updates bidirectionally when possible (source a rendered views).

SquibView supports full cut-and-paste functionality and allows edits made in the rendered view to be reflected back in the source.

<img src="./squibview-demo.gif" alt="SquibView Live Demo - Progressive markdown rendering showing headings, bullets, tables, diagrams, math, and maps" width="100%">

## Quick Start
Squibview also has a command line cli (also aliased as squibv) that can be used to turn markdown / texts / csv / tsv / psv or  html snippets in to full web pages.

### CLI Usage (Fastest Way)
```bash
npx squibv document.md
```

### Component Usage (Easiest for Web)
```html
<script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">

<div id="editor"></div>
<script>
    const editor = new SquibView({
        element: document.getElementById('editor'),
        content: '# Hello World\n\nThis is **SquibView** in action!'
    });
</script>
```

## Key Features

- 🚀 **Live Preview** - Real-time rendering as you edit
- 📊 **Rich Content** - Mermaid diagrams, GeoJSON maps, STL 3D models, math equations
- 📝 **GitHub-Flavored Markdown** - Full GFM support with tables and syntax highlighting  
- 🔄 **Bidirectional Editing** - Edit in source or rendered view
- 🔍 **Diff View** - Compare revisions with inline or side-by-side diffs
- ↩️ **Revision History** - Full undo/redo with diff visualization
- 📋 **Easy Export** - Copy HTML or export to files
- ⚡ **Multiple Views** - Source, HTML, or split view
- 🎨 **Customizable** - Plugin system and custom CSS support
- 📱 **Responsive** - Works on desktop and mobile

## Documentation & Resources

### 📚 **Complete Documentation**
- [📖 **Documentation Home**](./docs/home.html) - Start here for comprehensive guides
- [⚡ **Quick Start Guide**](./docs/guides/01-quick-start.html) - Get running in minutes
- [🔧 **Installation Options**](./docs/guides/02-installation.html) - Choose the right build
- [💻 **CLI Reference**](./docs/guides/04-cli-usage.html) - Master the command line

### 🎯 **By Use Case**
- [🧩 **Component Integration**](./docs/guides/03-basic-usage.html) - Embed in your app
- [📄 **Documentation Generation**](./docs/guides/04-cli-usage.html) - Build docs with CLI
- [➡️ **Want to Contribute?**](./CONTRIBUTING.md) - Help improve SquibView

### 🌟 **Examples & Demos**
- [🚀 **Live Demo**](https://deftio.github.io/squibview/examples/example_ESM.html) - Try all features
- [📁 **ESM Example**](./examples/example_ESM.html) - Modern ES modules usage
- [📄 **Standalone Example**](./examples/example_standalone.html) - Simple CDN usage
- [🔍 **Diff Comparison**](./examples/diff_view_inline.html) - Compare any two revisions
- [📈 **Live Diff**](./examples/diff_view_live.html) - Real-time change tracking

## License

BSD-2-Clause License. See [LICENSE](LICENSE) for details.