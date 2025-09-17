# Installation Guide

SquibView provides multiple build types to fit different development environments and use cases.

## Build Types Overview

| Build Type | Best For | Dependencies | Size | Autoload Support |
|------------|----------|--------------|------|-----------------|
| **Standard (ESM/UMD)** | Most projects | markdown-it bundled | ~245KB | ✅ Yes |
| **Lean (ESM/UMD)** | Custom bundlers | External | ~126KB | ✅ Yes |
| **Standalone** | Offline/airgapped | Everything bundled | ~3.6MB | Not needed |

All builds support the `autoload_deps` option for automatic library loading from CDN.

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

### Standard Build with Autoload (Recommended)

Zero configuration with automatic library loading:

```html
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">

<script type="module">
  import SquibView from 'https://unpkg.com/squibview/dist/squibview.esm.min.js';

  const editor = new SquibView('#editor', {
    initialContent: '# Hello\n\n```mermaid\ngraph TD\n  A --> B\n```',
    autoload_deps: { all: true }  // Enable autoloading
  });
</script>
```

**When to use:** Most projects - libraries load from CDN only when content needs them.

### Standalone Build (Offline-Ready)

Everything bundled together - perfect for offline environments:

```html
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">
<script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
```

**When to use:** Offline apps, airgapped environments, or when CDN access is restricted.

### ESM Build (Default - v1.0.15+)

As of v1.0.15, markdown-it is bundled by default. No import maps needed!

```html
<!-- SquibView CSS -->
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">

<!-- Optional external dependencies for advanced features -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>

<script type="module">
  // Import SquibView - markdown-it is now bundled!
  import SquibView from 'https://unpkg.com/squibview/dist/squibview.esm.min.js';
  
  const editor = new SquibView('#editor');
</script>
```

### ESM-Lean Build (Advanced Users)

If you're managing your own dependencies:

```html
<!-- Import map for external dependencies -->
<script type="importmap">
{
  "imports": {
    "markdown-it": "https://esm.sh/markdown-it@14.1.0",
    "tiny-emitter": "https://esm.sh/tiny-emitter@2.1.0",
    "diff-match-patch": "https://esm.sh/diff-match-patch@1.0.5"
  }
}
</script>

<!-- SquibView ESM-lean build -->
<script type="module">
  import SquibView from 'https://unpkg.com/squibview/dist/squibview.esm-lean.min.js';
  const editor = new SquibView('#editor');
</script>
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

### Choosing the Right Build

**Autoload builds** (v1.0.18+) - Recommended for most users:
- Zero configuration - libraries load from CDN when needed
- Fast initial load (~258KB), features load on-demand
- Perfect balance of simplicity and performance

**Standard builds** (ESM/UMD) include core dependencies:
- Medium bundle size (~245KB)
- No CDN dependency after initial load
- Good for projects with custom bundling

**Lean builds** (ESM-lean/UMD-lean) for advanced users:
- Smallest bundle size (~126KB)
- Full control over dependency versions
- Requires managing external dependencies

**Standalone builds** include everything:
- Works completely offline
- No external dependencies ever
- Largest file size (~3.6MB)

## Next Steps

- **[Basic Usage](./03-basic-usage.md)** - Learn how to use SquibView
- **[CLI Usage](./04-cli-usage.md)** - Master the command-line interface