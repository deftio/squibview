# SquibView Development Guide

This guide provides information about different ways to develop and test SquibView.

## Development Environments

There are several ways to develop SquibView, depending on your preferences and needs:

### 1. Simple HTTP Server

You can use Python's built-in HTTP server for simple development:

```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

Run this command from the project root directory, then open your browser to http://localhost:8000/dev/debug.html (or any other debug file).

#### Import Maps

All debug HTML files now include import maps to properly resolve ES module dependencies:

```html
<script type="importmap">
{
  "imports": {
    "tiny-emitter": "https://unpkg.com/tiny-emitter@2.1.0/dist/tinyemitter.min.js",
    "diff-match-patch": "https://unpkg.com/diff-match-patch@1.0.5/index.js",
    "turndown": "https://unpkg.com/turndown@7.1.2/dist/turndown.js"
  }
}
</script>
```

These import maps allow browsers to resolve bare module specifiers like `import TinyEmitter from "tiny-emitter"` to the actual URL from which to fetch the module.

### 2. Vite Development Server

For a more modern development experience with hot module replacement (HMR):

```bash
npm run dev
```

This command starts a Vite development server with HMR enabled. When you make changes to the source files, they will be automatically reflected in the browser without a full page reload.

### 3. Advanced Development Environment

For the most comprehensive development experience:

```bash
npm run dev:hmr
```

This command starts a custom development server with additional features:

- Live-reload for all file changes
- Development UI with test runners
- Multiple content type testing

## Debug Files

The `/dev` directory contains several debug HTML files for different purposes:

- `debug.html` - Basic editor with Markdown content
- `debug-adv.html` - Advanced editor with additional controls
- `debug-csv.html` - Editor configured for CSV content
- `debug-slides.html` - Editor configured for Reveal.js presentations
- `debug-dev.html` - Modern development environment with HMR

## Testing During Development

To run tests during development:

```bash
npm test
```

For a specific test file or pattern:

```bash
jest tests/SquibView.test.js --testNamePattern="pattern"
```

## Building for Distribution

To build the distribution files:

```bash
npm run build
```

This command creates minified and non-minified versions of SquibView in the `/dist` directory, including ESM, UMD, and standalone versions.

## Module Resolution

SquibView uses ES modules with named exports. When developing locally, module resolution is handled in one of three ways:

1. Import maps (for simple HTTP servers)
2. Vite's built-in module resolution (for `npm run dev`)
3. Custom module resolution (for `npm run dev:hmr`)

## Development Tips

- Use the browser console to interact with the editor instance: `window.editor`
- Check the editor version with: `SquibView.version.version`
- Test different content types using the sample files in the `/dev` directory
- Use the Selection API for interactive features: `editor.onTextSelected(callback)`