# Installation Guide

SquibView provides multiple build types to fit different development environments and use cases.

## Build Types Overview

| Build Type | Best For | Dependencies | Size |
|------------|----------|--------------|------|
| **ESM** | Modern bundlers (Vite, Webpack) | External | Smallest |
| **UMD** | Legacy browsers, global scripts | External | Small |
| **Standalone** | Quick prototypes, CDN usage | Bundled | Largest |

## NPM Installation

```bash
npm install squibview
```

### ESM (Recommended for Modern Projects)

Use this with modern bundlers that handle dependencies:

```javascript
import { SquibView } from 'squibview';
import 'squibview/dist/squibview.min.css';

const editor = new SquibView({
    element: document.getElementById('editor'),
    content: '# Hello World'
});
```

**When to use:** You have a build step with Vite, Webpack, or similar bundlers.

### UMD (Legacy Browser Support)

For projects without modern bundling:

```html
<link rel="stylesheet" href="node_modules/squibview/dist/squibview.min.css">
<script src="node_modules/squibview/dist/squibview.umd.min.js"></script>

<script>
    const editor = new SquibView({
        element: document.getElementById('editor'),
        content: '# Hello World'
    });
</script>
```

**When to use:** Legacy projects or when you want to include SquibView as a simple script tag.

## CDN Usage

### Standalone Build (Easiest)

Everything bundled together - perfect for prototypes:

```html
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">
<script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
```

**When to use:** CodePen, quick prototypes, or when you want zero configuration.

### UMD with External Dependencies

More control over dependency versions:

```html
<!-- SquibView CSS -->
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">

<!-- External dependencies -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>

<!-- SquibView -->
<script src="https://unpkg.com/squibview/dist/squibview.umd.min.js"></script>
```

## CLI Installation

### Global Installation

```bash
npm install -g squibview
squibv document.md
```

### Local Usage (Recommended)

```bash
npx squibv document.md
```

### Project Installation

```bash
npm install --save-dev squibview
npx squibv document.md
```

## Dependency Requirements

SquibView uses these external libraries for enhanced functionality:

- **Highlight.js** - Syntax highlighting
- **MathJax** - Math equation rendering  
- **Mermaid** - Diagram rendering
- **Leaflet** - Map rendering (GeoJSON/TopoJSON)
- **Three.js** - 3D model rendering (STL files)

### Standalone vs Regular Builds

**Regular builds** (ESM/UMD) expect these dependencies to be loaded separately, giving you:
- Smaller bundle size
- Control over versions
- Ability to exclude unused features

**Standalone builds** include all dependencies, providing:
- Zero configuration
- Guaranteed compatibility
- Larger file size

## Next Steps

- **[Basic Usage](./03-basic-usage.md)** - Learn how to use SquibView
- **[CLI Usage](./04-cli-usage.md)** - Master the command-line interface