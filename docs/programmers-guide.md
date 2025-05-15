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

SquibView is available in three formats:

### ESM (ES Modules)
```html
<!-- Required dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>

<!-- SquibView -->
<link rel="stylesheet" href="../dist/squibview.css">
<script type="module">
  import SquibView from '../dist/squibview.esm.min.js';
  const editor = new SquibView('#editor');
</script>
```

### UMD (Universal Module Definition)
```html
<!-- Required dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>
<script src="https://unpkg.com/tiny-emitter@2.1.0/dist/tinyemitter.min.js"></script>
<script src="https://unpkg.com/diff-match-patch@1.0.5/index.js"></script>
<script src="https://unpkg.com/turndown@7.1.2/dist/turndown.js"></script>

<!-- SquibView -->
<link rel="stylesheet" href="../dist/squibview.css">
<script src="../dist/squibview.umd.min.js"></script>
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