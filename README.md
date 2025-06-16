# SquibView - Live Bidirectional Markdown Editor

[![NPM Version](https://img.shields.io/npm/v/squibview.svg)](https://www.npmjs.com/package/squibview)
[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/deftio/squibview/ci.yml?branch=main&style=flat&logo=github&label=Build&color=blue)](https://github.com/deftio/squibview/actions/workflows/ci.yml)
[![Downloads](https://img.shields.io/npm/dm/squibview.svg)](https://www.npmjs.com/package/squibview)

> Live markdown editor with true bidirectional editing, rich content support, and headless architecture.

## Try It Now

| **Live Demo** | **Local Demo** | **Quick Start** |
|---------------|----------------|-----------------|
| [GitHub Pages](https://deftio.github.io/squibview/examples/example_ESM.html) | [Local Files](./examples/example_ESM.html) | [30-Second Setup](#quick-start) |

<img src="./squibview-example.png" alt="SquibView Live Bidirectional Editor" width="100%">

## Key Features

**Live Bidirectional Editing**  
Edit in source OR rendered view - changes sync instantly in both directions.

**Perfect for AI/LLM Content**  
Process complex output from ChatGPT, Claude, or any LLM with rich formatting, diagrams, and data tables.

**Headless & Embeddable**  
Use as a standalone component or embed anywhere. Framework-agnostic with React wrapper available.

**Rich Content Support**
- **Mermaid Diagrams** - Flowcharts, sequence diagrams, gitgraphs
- **Math Rendering** - LaTeX math via MathJax
- **SVG Graphics** - Inline vector graphics
- **Data Tables** - CSV/TSV with live editing
- **Code Highlighting** - 190+ languages via Highlight.js

**Developer Friendly**
- Multiple build formats: ESM, UMD, Standalone
- Plugin system for custom renderers
- Zero dependencies option available

## Use Cases

| **Content Creators** | **Developers** | **Data Scientists** |
|---------------------|----------------|-------------------|
| Live markdown editing | Documentation sites | Jupyter-style notebooks |
| Blog post previews | Component libraries | Data visualization |
| Technical writing | API documentation | Report generation |

| **Teams** | **AI/LLM Users** | **Educators** |
|-----------|------------------|---------------|
| Collaborative docs | Process AI output | Interactive lessons |
| Knowledge bases | Markdown formatting | Math/science content |
| Meeting notes | Rich content editing | Code examples |

## Quick Start

Get running in 30 seconds with the standalone build:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.css">
</head>
<body>
    <div id="editor"></div>
    
    <script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
    <script>
        const editor = new SquibView('#editor', {
            initialContent: `# Welcome to SquibView!

Edit me in **source** or **rendered** view → changes sync both ways!

\`\`\`mermaid
graph TD
    A[Markdown] --> B[Live Preview]
    B --> C[Bidirectional Editing]
    C --> A
\`\`\`

| Feature | Status |
|---------|--------|
| Live Preview | ✅ |
| Bidirectional | ✅ |
| Rich Content | ✅ |
`,
            titleShow: true,
            titleContent: "SquibView Demo"
        });
    </script>
</body>
</html>
```

**That's it!** Open in your browser and start editing.

## Installation Options

### Standalone (Recommended for Quick Start)
Everything bundled - no external dependencies required.

```html
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.css">
<script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
```

### ESM (Modern Applications)
For bundlers like Webpack, Vite, or Rollup.

```bash
npm install squibview
```

```javascript
import SquibView from 'squibview';
import 'squibview/dist/squibview.css';

const editor = new SquibView('#editor');
```

### UMD (Traditional Scripts)
For legacy applications or direct script inclusion.

```html
<!-- Dependencies -->
<script src="https://unpkg.com/markdown-it@14/dist/markdown-it.min.js"></script>
<script src="https://unpkg.com/highlight.js@11/lib/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid@11/dist/mermaid.min.js"></script>

<!-- SquibView -->
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.css">
<script src="https://unpkg.com/squibview/dist/squibview.umd.min.js"></script>
```

### Build Size Comparison

| Format | Minified | Dependencies | Best For |
|--------|----------|--------------|----------|
| **Standalone** | ~2.7MB | Included | Quick prototypes, demos |
| **ESM** | ~115KB | External | Modern apps with bundlers |
| **UMD** | ~118KB | External | Legacy apps, CDN usage |

## Configuration

```javascript
const editor = new SquibView('#container', {
    // Content settings
    initialContent: '# Hello World',
    inputContentType: 'md',           // 'md', 'html', 'csv', 'tsv'
    
    // UI settings
    initialView: 'split',             // 'src', 'html', 'split'
    showControls: true,
    titleShow: true,
    titleContent: 'My Editor',
    
    // Advanced settings
    preserveImageTags: true,          // Keep original URLs vs data URLs
    onReplaceSelectedText: callback,  // Custom text replacement
    baseClass: 'my-editor'           // Custom CSS class
});
```

### API Methods

```javascript
// Content management
editor.setContent(markdown, 'md');
editor.getContent();
editor.setView('split'); // 'src', 'html', 'split'

// Revision history
editor.revisionUndo();
editor.revisionRedo();

// Copy operations
editor.copySource();     // Copy markdown
editor.copyHTML();       // Copy formatted HTML

// Advanced features
editor.toggleLinefeedView();
editor.markdownAdjustHeadings(1); // Increase heading levels
```

## Framework Integration

### React
```jsx
import SquibView from 'squibview/dist/squibview-react';

function MyComponent() {
    return <SquibView 
        initialContent="# React + SquibView"
        titleShow={true}
    />;
}
```

### Vue (Experimental)
```vue
<template>
    <SquibView 
        :initialContent="content"
        :titleShow="true"
    />
</template>

<script>
import SquibView from 'squibview/dist/squibview-vue';
export default { components: { SquibView } };
</script>
```
*Note: Vue wrapper is experimental. Please report issues.*

## Examples & Demos

### Live Examples
- [**Basic Editor**](https://deftio.github.io/squibview/examples/example_ESM.html) - Simple markdown editing
- [**Advanced Features**](https://deftio.github.io/squibview/examples/plugin_system.html) - Diagrams, math, tables
- [**React Integration**](https://deftio.github.io/squibview/examples/example_react.html) - React component usage
- [**Selection API**](https://deftio.github.io/squibview/examples/selection_api_complete.html) - Text manipulation

### Local Development
```bash
git clone https://github.com/deftio/squibview.git
cd squibview
npm install
npm run dev           # Development server
npm run build         # Build all formats
npm run serve         # Serve examples locally
```

Open [http://localhost:8080](http://localhost:8080) to browse examples and documentation.

## Documentation

| Resource | Description |
|----------|-------------|
| [**Programmer's Guide**](./docs/programmers-guide.md) | Complete API reference and advanced usage |
| [**Plugin System**](./docs/programmers-guide.md#plugin-system) | Creating custom content renderers |
| [**Selection API**](./docs/selection-api.md) | Text selection and manipulation |
| [**Examples**](./examples/) | Working code examples for all features |

## Advanced Features

### Plugin System
Create custom renderers for any content type:

```javascript
editor.registerRenderer('custom', {
    render: (source) => `<div class="custom">${source}</div>`,
    sourceToOutput: (source) => processCustomContent(source),
    outputToSource: (html) => extractCustomContent(html),
    buttons: [
        { label: 'Transform', action: 'customTransform' }
    ]
});
```

### Text Selection API
Programmatically manipulate selected text:

```javascript
editor.onTextSelected((selectionData) => {
    if (selectionData.text.startsWith('TODO:')) {
        return selectionData.text.replace('TODO:', '✅ DONE:');
    }
});
```

### Bidirectional CSV/TSV Editing
Edit data tables in both source and visual modes:

```markdown
```csv
Name,Role,Status
Alice,Developer,Active
Bob,Designer,Active
```
```

## Testing

SquibView has comprehensive test coverage with both unit and E2E tests:

```bash
npm test              # Unit tests with coverage
npm run test:e2e      # End-to-end browser tests
npm run test:all      # Run all tests
```

Coverage reports are generated in `coverage/lcov-report/index.html`.

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/squibview.git
   cd squibview
   npm install
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Develop & Test**
   ```bash
   npm run dev          # Start development server
   npm test             # Run tests
   npm run build        # Test build process
   ```

4. **Submit PR**
   - Ensure tests pass
   - Follow existing code style
   - Update documentation if needed

## License

**BSD-2-Clause License** - See [LICENSE](LICENSE) file for details.

## Why SquibView?

| **Other Editors** | **SquibView** |
|-------------------|---------------|
| One-way preview | **True bidirectional editing** |
| Basic markdown only | **Rich content: diagrams, math, data** |
| Monolithic apps | **Headless & embeddable** |
| Limited extensibility | **Plugin system** |
| Framework-specific | **Framework-agnostic** |

**Ready to try it?** [View the demo](https://deftio.github.io/squibview/examples/example_ESM.html) or [get started](#quick-start) in 30 seconds!

<div align="center">

**Made with ❤️ by [deftio](https://github.com/deftio)**

[⭐ Star on GitHub](https://github.com/deftio/squibview) • [📦 npm Package](https://www.npmjs.com/package/squibview) • [🐛 Report Issues](https://github.com/deftio/squibview/issues)

</div>