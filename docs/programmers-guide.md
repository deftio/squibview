# SquibView Programmer's Guide

This guide provides detailed documentation for developers using SquibView in their applications.

## Table of Contents
- [Installation](#installation)
- [Build Formats](#build-formats)
- [Basic Usage](#basic-usage)
- [Configuration Options](#configuration-options)
- [Content Types](#content-types)
- [API Reference](#api-reference)
- [React Integration](#react-integration)
- [Plugin System](#plugin-system)
- [Event System](#event-system)
- [Examples](#examples)
- [Development and Testing](#development-and-testing)

## Installation

### NPM
```bash
npm install squibview
```

### CDN
```html
<!-- Latest version -->
<script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.css">
```

## Build Formats

SquibView is available in multiple formats:

### ESM (ES Modules) - Default Build (v1.0.15+)
```html
<!-- Optional dependencies for advanced features -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>

<!-- SquibView (markdown-it is now bundled!) -->
<link rel="stylesheet" href="../dist/squibview.css">
<script type="module">
  import SquibView from '../dist/squibview.esm.min.js';
  const editor = new SquibView('#editor');
</script>
```

### ESM-Lean (Advanced Users)
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

<!-- Optional dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>

<!-- SquibView lean build -->
<script type="module">
  import SquibView from '../dist/squibview.esm-lean.min.js';
  const editor = new SquibView('#editor');
</script>
```

### UMD (Universal Module Definition) - Default Build (v1.0.15+)
```html
<!-- Optional dependencies for advanced features -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>

<!-- SquibView (markdown-it is now bundled!) -->
<link rel="stylesheet" href="../dist/squibview.css">
<script src="../dist/squibview.umd.min.js"></script>
<script>
  const editor = new SquibView('#editor');
</script>
```

### UMD-Lean (Advanced Users)
```html
<!-- Required dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/14.1.0/markdown-it.min.js"></script>
<script src="https://unpkg.com/tiny-emitter@2.1.0/dist/tinyemitter.min.js"></script>
<script src="https://unpkg.com/diff-match-patch@1.0.5/index.js"></script>

<!-- Optional dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>

<!-- SquibView lean build -->
<script src="../dist/squibview.umd-lean.min.js"></script>
<script>
  const editor = new SquibView('#editor');
</script>
```

### Standalone (All Dependencies Bundled)
```html
<!-- SquibView -->
<link rel="stylesheet" href="../dist/squibview.css">
<script src="../dist/squibview.standalone.min.js"></script>
<script>
  const editor = new SquibView('#editor');
</script>
```

## Basic Usage

### Creating an Instance
```javascript
const editor = new SquibView('#editorContainer', {
  // Configuration options
});
```

### Setting Content
```javascript
// Set Markdown content
editor.setContent('# Hello World\n\nThis is a test.', 'md');

// Set HTML content
editor.setContent('<h1>Hello World</h1><p>This is a test.</p>', 'html');

// Set CSV content
editor.setContent('name,age\nJohn,30\nJane,25', 'csv');
```

### Changing Views
```javascript
// Switch to source view
editor.setView('src');

// Switch to rendered view
editor.setView('html');

// Switch to split view
editor.setView('split');
```

## Configuration Options

### Basic Options
```javascript
const editor = new SquibView('#editorContainer', {
  initialContent: '',           // Initial content to load
  inputContentType: 'md',       // Type of content ('md', 'html', 'reveal', 'csv', 'tsv')
  showControls: true,          // Whether to show control buttons
  titleShow: false,            // Whether to show the title section
  titleContent: '',            // Content for the title section
  initialView: 'split',        // Initial view mode ('src', 'html', 'split')
  baseClass: 'squibview',      // Base CSS class for styling
});
```

### Image Handling
```javascript
const editor = new SquibView('#editorContainer', {
  preserveImageTags: true,     // Whether to keep original image URLs in source view
                               // When true: images remain as <img> tags with original URLs
                               // When false: images are converted to data URLs
                               // Note: Images are always converted to data URLs when copying
});
```

**Detailed Explanation of `preserveImageTags`:**

The `preserveImageTags` option (boolean, defaults to `true`) controls how SquibView handles `<img>` tags when processing and displaying Markdown content, particularly in the source view and during copy operations.

*   **`preserveImageTags: true` (Default Behavior):**
    *   **Source View:** When SquibView renders Markdown, `<img>` tags will retain their original `src` attributes (e.g., `https://example.com/image.png` or `../images/local.jpg`). This is generally preferred for maintaining a clean and readable Markdown source, as it keeps image references as links rather than embedding large data strings.
    *   **Rendered View:** Images are displayed as usual by the browser fetching them from their `src` URLs.
    *   **Implications:** Requires the image URLs to be accessible by the browser. If images are on a local filesystem or a private network not accessible to the user viewing the rendered output, they may appear broken.

*   **`preserveImageTags: false`:**
    *   **Source View & Rendered View:** When SquibView renders Markdown, it will attempt to fetch each image, convert it to a base64 data URL, and embed this data URL directly into the `src` attribute of the `<img>` tag. Both the source view (if you were to inspect the HTML generated by `renderMarkdown` before it's placed in the DOM) and the live rendered view will use these data URLs.
    *   **Implications:**
        *   **Portability:** Makes the HTML output more self-contained, as images are embedded. This is useful if the HTML needs to be displayed in environments where the original image URLs might not be accessible.
        *   **Performance:** Can increase the initial size of the HTML content significantly if there are many or large images. Fetching and converting images to data URLs can also add a small delay to the rendering process.
        *   **Security:** Images are fetched by the SquibView instance. Ensure that the environment running SquibView has access to the image URLs. Cross-origin restrictions might apply if images are on different domains and the server doesn't set appropriate CORS headers (though SquibView attempts to use `crossOrigin = 'anonymous'` for images, which helps for CORS-enabled servers).

*   **Behavior during `copyHTML()` (Copy Rendered):**
    *   Regardless of the `preserveImageTags` setting, when the user clicks the "Copy Rendered" button (which calls the `copyHTML()` method), SquibView will *always* attempt to convert all images within the copied content to data URLs.
    *   **Rationale:** This ensures maximum portability of the copied HTML. If the user pastes this HTML into an email client, another document, or a different web page, the images will be embedded and should display correctly without relying on external links that might break or be inaccessible in the new context.

**When to Use Which Setting:**

*   Use `preserveImageTags: true` (default) if:
    *   You prefer your Markdown source to remain clean with linked images.
    *   All image URLs are expected to be accessible by the end-user's browser.
    *   You are primarily concerned with the live view and not necessarily with generating fully self-contained HTML snippets directly from the source view rendering.
*   Use `preserveImageTags: false` if:
    *   You need the rendered output in the SquibView panel to use embedded data URLs by default (e.g., for immediate display in a restricted environment or for a specific type of export where data URLs are preferred from the live view itself).
    *   You understand the potential performance and size implications.

### Text Selection
```javascript
const editor = new SquibView('#editorContainer', {
  onReplaceSelectedText: (selectionData) => {
    // Handle text selection
    return 'replacement text';  // Return string to replace selection
  }
});
```

## Content Types

### Markdown (md)
- Supports GitHub-flavored Markdown
- Renders Mermaid diagrams
- Syntax highlighting for code blocks
- Table formatting
- Inline SVG graphics

### HTML (html)
- Renders complete HTML pages
- Supports embedded iframes
- Preserves HTML structure

### RevealJS (reveal)
- Converts markdown to RevealJS slides
- Splits content on '---' delimiters
- Supports Mermaid diagrams in slides

### CSV/TSV (csv, tsv)
- Renders tabular data
- Converts to markdown tables
- Supports different delimiters (comma, tab, semicolon, space)

## API Reference

### Core Methods
```javascript
// Content Management
editor.setContent(content, contentType)  // Set content
editor.getContent()                      // Get current content
editor.getMarkdownSource()               // Get markdown source
editor.getHTMLSource()                   // Get HTML source

// View Management
editor.setView(view)                     // Set view mode
editor.toggleView()                      // Toggle between views
editor.controlsShow(show)                // Show/hide controls
editor.titleShow(show)                   // Show/hide title
editor.titleSetContent(content)          // Set title content
editor.titleGetContent()                 // Get title content

// Copy Operations
editor.copySource()                      // Copy source content
editor.copyHTML()                        // Copy rendered HTML

// Revision History
editor.revisionUndo()                    // Undo last change
editor.revisionRedo()                    // Redo last change
editor.revisionSet(index)                // Set to specific revision
editor.revisionNumRevsions()             // Get number of revisions
editor.revisionGetCurrentIndex()         // Get current revision index

// Diff Viewing (New in v1.0.13)
editor.getSourceDiff(options)            // Get diff data between revisions
editor.getSourceDiffHTML(options)        // Get side-by-side diff HTML
editor.getSourceDiffInline(options)      // Get inline diff HTML (blue/red)
```

### Diff Viewing API

Compare different revisions of your content with visual diff displays.

#### getSourceDiff(options)
Returns raw diff data between two revisions.

```javascript
// Get diff between current and previous revision
const diffData = editor.getSourceDiff();

// Get diff between specific revisions
const diffData = editor.getSourceDiff({ 
  fromIndex: 0,    // Starting revision (-1 for initial state)
  toIndex: 3       // Ending revision
});

// Returns: { added, removed, changed, stats, patches }
```

#### getSourceDiffHTML(options)
Returns side-by-side diff visualization as HTML.

```javascript
// Compare current vs previous
const diffHTML = editor.getSourceDiffHTML();

// Compare specific revisions
const diffHTML = editor.getSourceDiffHTML({ 
  fromIndex: 1, 
  toIndex: 5,
  showLineNumbers: true  // Optional
});

// Insert into page
document.getElementById('diff-view').innerHTML = diffHTML;
```

#### getSourceDiffInline(options)
Returns inline diff with blue additions and red strikethrough deletions.

```javascript
// Get inline diff
const inlineHTML = editor.getSourceDiffInline({ 
  fromIndex: 0, 
  toIndex: -1  // Compare against current
});

// Styling: additions in blue, deletions in red with strikethrough
```

### Text Selection API
```javascript
// Get current selection
const selection = editor.getCurrentSelection();

// Replace selected text
editor.replaceSelectedText('new text', selection);

// Make selection editable/non-editable
editor.setSelectionEditable(true, selection);

// Toggle selection lock
editor.toggleSelectionLock(selection);

// Register selection callback
const unsubscribe = editor.onTextSelected((selectionData) => {
  console.log('Selected:', selectionData.text);
});
```

## React Integration

### Basic Usage
```jsx
import { SquibViewReact } from 'squibview/react';

function App() {
  return (
    <SquibViewReact
      initialContent="# Hello World"
      inputContentType="md"
      showControls={true}
    />
  );
}
```

### Props
```jsx
<SquibViewReact
  // Basic props
  initialContent=""
  inputContentType="md"
  showControls={true}
  titleShow={false}
  titleContent=""
  initialView="split"
  
  // Image handling
  preserveImageTags={true}
  
  // Event handlers
  onContentChange={(content, type) => {}}
  onViewChange={(view) => {}}
  onTextSelected={(selectionData) => {}}
/>
```

## Plugin System

### Creating a Plugin
```javascript
const myPlugin = {
  name: 'myPlugin',
  init: (editor) => {
    // Plugin initialization
  },
  destroy: () => {
    // Cleanup
  }
};

// Register plugin
editor.registerPlugin(myPlugin);
```

### Custom Renderers
```javascript
editor.registerRenderer('custom', {
  render: (source) => {
    // Render source to HTML
    return html;
  },
  sourceToOutput: (source) => {
    // Convert source to output format
    return output;
  },
  outputToSource: (output) => {
    // Convert output back to source
    return source;
  },
  operations: {
    customOp: (source) => {
      // Custom operation
      return modifiedSource;
    }
  },
  buttons: [
    {
      label: 'Custom',
      action: 'customOp',
      title: 'Custom operation'
    }
  ]
});
```

## Event System

### Available Events
```javascript
editor.events.on('content:change', (content, type) => {});
editor.events.on('view:change', (view) => {});
editor.events.on('text:selected', (selectionData) => {});
editor.events.on('markdown:rendered', (markdown, html) => {});
editor.events.on('html:rendered', (html) => {});
editor.events.on('revision:undo', (content, type) => {});
editor.events.on('revision:redo', (content, type) => {});
editor.events.on('revision:set', (index, content, type) => {});
editor.events.on('controls:visibility', (show) => {});
editor.events.on('title:visibility', (show) => {});
editor.events.on('title:content', (content) => {});
editor.events.on('layout:change', (view, dimensions) => {});
editor.events.on('renderer:registered', (type, config) => {});
```

## Examples

### Basic Markdown Editor
```javascript
const editor = new SquibView('#editor', {
  initialContent: '# Hello World\n\nThis is a test.',
  inputContentType: 'md',
  showControls: true,
  initialView: 'split'
});
```

### CSV Viewer
```javascript
const editor = new SquibView('#editor', {
  initialContent: 'name,age\nJohn,30\nJane,25',
  inputContentType: 'csv',
  showControls: true,
  initialView: 'html'
});
```

### RevealJS Presentation
```javascript
const editor = new SquibView('#editor', {
  initialContent: '# Slide 1\n\nContent\n\n---\n\n# Slide 2\n\nMore content',
  inputContentType: 'reveal',
  showControls: true,
  initialView: 'html'
});
```

### React Component with Image Handling
```jsx
import { SquibViewReact } from 'squibview/react';

function App() {
  return (
    <SquibViewReact
      initialContent="# Image Example\n\n![Test](./test.png)"
      inputContentType="md"
      preserveImageTags={true}
      onContentChange={(content, type) => {
        console.log('Content changed:', content);
      }}
    />
  );
}
```

## Development and Testing

This section provides information for developers contributing to SquibView or setting up a local development environment.

### Version Bumping and Testing Script

For local development, a convenient script `dev-bump-build-test.sh` is provided in the root of the repository. This script automates several common tasks:

1.  **Bumps the Patch Version**: It increments the patch version number of the library (e.g., from `0.0.38` to `0.0.39`).
2.  **Sets a Prerelease Identifier**: It then sets a development prerelease identifier (e.g., `0.0.39-dev.0`). This uses `npm version prepatch --preid dev` internally.
3.  **Updates `src/version.js`**: The script runs `tools/updateVersion.js` to propagate the new version from `package.json` to `src/version.js`, ensuring the library reports the correct version at runtime.
4.  **Builds the Library**: It performs a full build of SquibView.
5.  **Runs Tests**: It executes all unit and integration tests.
6.  **Logs Output**: All output from the script (build and test logs) is displayed in the terminal and also saved to `tests/log.out` for easier debugging.

**Usage:**

To run the script, navigate to the root of the SquibView repository in your terminal and execute:

```bash
./dev-bump-build-test.sh
```

This script is particularly useful for quickly testing changes with an updated version number in a development context without creating git tags.

For more comprehensive information on the development workflow, versioning strategy, running tests, and debugging, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

For browser environments, you can use a `<script>` tag pointing to a CDN:

```html
<script src="https://unpkg.com/squibview/dist/squibview.standalone.umd.min.js"></script>
```

Or, if you have it locally:

```html
<script src="../dist/squibview.standalone.umd.min.js"></script>
```

### Basic Instantiation
```javascript
const editor = new SquibView('#editorContainer', {
  // Configuration options
});
```