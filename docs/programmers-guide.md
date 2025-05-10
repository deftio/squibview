# SquibView Programmer's Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Core Concepts](#core-concepts)
5. [API Reference](#api-reference)
   - [Constructor](#constructor)
   - [Content Management](#content-management)
   - [View Management](#view-management)
   - [Selection API](#selection-api)
   - [Clipboard Operations](#clipboard-operations)
   - [Revisions and History](#revisions-and-history)
   - [Renderers and Content Types](#renderers-and-content-types)
   - [Event System](#event-system)
   - [Title and Controls](#title-and-controls)
6. [Advanced Usage](#advanced-usage)
   - [Custom Renderers](#custom-renderers)
   - [Plugins](#plugins)
   - [Bidirectional Editing](#bidirectional-editing)
7. [Examples](#examples)
8. [FAQ](#faq)

## Introduction

SquibView is a lightweight, flexible live editor and renderer for various content types including Markdown, HTML, CSV, and RevealJS presentations. It supports bidirectional editing, syntax highlighting, diagrams, and a rich plugin system.

Key features include:
- Split view editing (source and rendered panels)
- Automatic rendering of content as you type
- Support for multiple content types (Markdown, HTML, CSV, RevealJS)
- Bidirectional editing (changes in rendered view are reflected in source)
- Copy support for formatted HTML and images
- Revision history with undo/redo functionality
- Custom renderer and plugin system
- Text selection API for manipulating selected content

## Installation

### NPM
```bash
npm install squibview
```

### CDN (UMD build)
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/squibview/dist/squibview.min.css">

<!-- JavaScript dependencies -->
<script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlight.js/lib/core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/papaparse/papaparse.min.js"></script>

<!-- SquibView -->
<script src="https://cdn.jsdelivr.net/npm/squibview/dist/squibview.umd.min.js"></script>
```

### ES Module
```html
<link rel="stylesheet" href="path/to/squibview.min.css">
<script type="module">
  import SquibView from 'path/to/squibview.esm.min.js';
  
  const editor = new SquibView('#editor');
</script>
```

## Getting Started

### Basic Usage

```html
<div id="editor"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const editor = new SquibView('#editor', {
      initialContent: '# Hello, world!\n\nThis is a **Markdown** editor.',
      inputContentType: 'md',
      initialView: 'split'
    });
  });
</script>
```

### Configuration Options

```javascript
const editor = new SquibView('#editor', {
  // Content
  initialContent: '# My Document',    // Initial content to load
  inputContentType: 'md',             // 'md', 'html', 'reveal', 'csv', 'tsv', 'semisv', 'ssv'
  
  // UI
  showControls: true,                 // Show control buttons
  titleShow: false,                   // Show title section
  titleContent: '',                   // Content for title section
  initialView: 'split',               // 'src', 'html', or 'split'
  baseClass: 'squibview',             // Base CSS class
  
  // Text selection
  onReplaceSelectedText: function(selectionData) {
    // Process selection and optionally return replacement text
    if (selectionData.text === 'hello') {
      return 'hello world';  // This will replace the selected text
    }
    // Returning nothing means no replacement
  }
});
```

## Core Concepts

### View Modes

SquibView provides three view modes:
- **Source**: Shows only the raw source editor
- **Rendered**: Shows only the rendered output
- **Split**: Shows both source and rendered views side by side

```javascript
// Change view programmatically
editor.setView('src');    // Source only
editor.setView('html');   // Rendered only
editor.setView('split');  // Both
```

### Content Types

SquibView supports multiple content types:
- **md**: Markdown
- **html**: HTML
- **reveal**: RevealJS presentation slides
- **csv**: Comma-separated values
- **tsv**: Tab-separated values
- **semisv**: Semicolon-separated values
- **ssv**: Space-separated values

```javascript
// Change content type and content
editor.setContent('# New content', 'md');
```

## API Reference

### Constructor

```javascript
/**
 * Creates a new SquibView instance
 *
 * @param {HTMLElement|string} element - DOM element or selector where editor will be mounted
 * @param {Object} options - Configuration options
 */
const editor = new SquibView('#editor', options);
```

### Content Management

```javascript
// Get current content
const content = editor.getContent();

// Get HTML source from rendered panel
const html = editor.getHTMLSource();

// Get Markdown source
const md = editor.getMarkdownSource();

// Set new content
editor.setContent('# New content', 'md', true); // content, contentType, saveRevision
```

### View Management

```javascript
// Set view mode
editor.setView('src');    // Source only
editor.setView('html');   // Rendered only
editor.setView('split');  // Both

// Toggle between view modes
editor.toggleView();  // Cycles: src -> split -> html -> src
```

### Selection API

```javascript
// Register a selection callback
const unsubscribe = editor.onTextSelected(selectionData => {
  console.log(`Selected: ${selectionData.text} in ${selectionData.panel} panel`);
  
  // Example: Process selection
  if (selectionData.text.includes('TODO')) {
    // Do something with the TODO item
  }
});

// Later, to unsubscribe
unsubscribe();

// Get current selection
const selection = editor.getCurrentSelection();
if (selection) {
  console.log(`Current selection: ${selection.text}`);
}

// Replace selected text
editor.replaceSelectedText('New text', selection);

// Lock selected text (make non-editable)
editor.setSelectionEditable(false, selection);

// Unlock selected text (make editable)
editor.setSelectionEditable(true, selection);

// Smart toggle between locked and unlocked states
const newState = editor.toggleSelectionLock(selection);
console.log(newState ? "Now editable" : "Now locked");

// Clear selection
editor.clearSelection();

// Set a handler to process selections and optionally replace them
editor.onReplaceSelectedText = function(selectionData) {
  // Process selection
  if (selectionData.text === 'TODO') {
    return '✅ DONE';  // Replace with this text
  }
  // Return undefined or null to not replace anything
};

// Remove the handler
editor.onReplaceSelectedText = null;
```

Selection data structure:
```javascript
// Source panel selection
{
  panel: 'source',
  text: 'selected text',
  range: {
    start: 10,  // Character position
    end: 22     // Character position
  }
}

// Rendered panel selection
{
  panel: 'rendered',
  text: 'selected text',
  range: DOMRange,  // DOM Range object
  element: HTMLElement  // The contenteditable element
}
```

### Clipboard Operations

```javascript
// Copy source to clipboard
await editor.copySource();

// Copy rendered HTML to clipboard (preserves formatting)
await editor.copyHTML();
```

### Revisions and History

```javascript
// Undo last change
editor.revisionUndo();

// Redo previously undone change
editor.revisionRedo();

// Get number of revisions
const count = editor.revisionNumRevsions();

// Get current revision index
const index = editor.revisionGetCurrentIndex();

// Set to specific revision
editor.revisionSet(index);
```

### Renderers and Content Types

```javascript
// Register a custom renderer
editor.registerRenderer('custom', {
  render: (source) => {
    // Custom rendering logic
    return customRenderFunction(source);
  },
  sourceToOutput: (source) => {
    // Transform source to output format
    return transformSourceToOutput(source);
  },
  outputToSource: (output, options) => {
    // Transform output back to source format
    return transformOutputToSource(output, options);
  },
  operations: {
    customOperation: (src) => {
      // Custom operation on source content
      return modifiedSource;
    }
  },
  buttons: [
    { 
      label: 'Custom Action', 
      action: 'customOperation', 
      title: 'Tooltip text' 
    }
  ]
});
```

### Event System

```javascript
// Listen for content changes
editor.events.on('content:change', (content, contentType) => {
  console.log(`Content changed to type: ${contentType}`);
});

// Listen for view changes
editor.events.on('view:change', (view) => {
  console.log(`View changed to: ${view}`);
});

// Listen for rendering completion
editor.events.on('markdown:rendered', (markdown, html) => {
  console.log('Markdown rendered to HTML');
});

// Other events
// - 'content:rendered' - After content is rendered
// - 'html:rendered' - After HTML is rendered
// - 'layout:change' - After layout is adjusted
// - 'renderer:registered' - After a renderer is registered
// - 'controls:visibility' - After controls visibility changes
// - 'title:visibility' - After title visibility changes
// - 'title:content' - After title content changes
// - 'revision:undo' - After undoing a revision
// - 'revision:redo' - After redoing a revision
// - 'revision:set' - After setting to a specific revision
```

### Title and Controls

```javascript
// Show/hide controls
editor.controlsShow(true);  // Show
editor.controlsShow(false); // Hide

// Show/hide title
editor.titleShow(true);  // Show
editor.titleShow(false); // Hide

// Set title content
editor.titleSetContent('<h2>My Document</h2>');

// Get title content
const title = editor.titleGetContent();
```

## Advanced Usage

### Custom Renderers

Custom renderers allow you to extend SquibView with support for additional content types or customize the rendering of existing types.

```javascript
editor.registerRenderer('yaml', {
  render: (source) => {
    const parsed = jsyaml.load(source);
    const html = convertYamlToHtml(parsed);
    editor.output.innerHTML = html;
  },
  sourceToOutput: (source) => {
    return convertYamlToHtml(jsyaml.load(source));
  },
  outputToSource: (output, options) => {
    return convertHtmlToYaml(output);
  },
  operations: {
    formatYaml: (src) => {
      return formatYamlString(src);
    }
  },
  buttons: [
    { label: 'Format', action: 'formatYaml', title: 'Format YAML' }
  ]
});
```

### Plugins

You can build plugins for SquibView by listening to events and extending functionality:

```javascript
function wordCountPlugin(editor) {
  // Create UI elements
  const counterDiv = document.createElement('div');
  counterDiv.className = 'word-counter';
  editor.controls.appendChild(counterDiv);
  
  // Update counter whenever content changes
  editor.events.on('content:change', (content) => {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    counterDiv.textContent = `Words: ${wordCount}`;
  });
  
  // Return an API for the plugin
  return {
    getWordCount: () => {
      const content = editor.getContent();
      return content.split(/\s+/).filter(Boolean).length;
    }
  };
}

// Use the plugin
const wordCounter = wordCountPlugin(editor);
console.log(`Word count: ${wordCounter.getWordCount()}`);
```

### Bidirectional Editing

SquibView supports bidirectional editing, allowing you to make changes in either the source or rendered panel.

```javascript
// Enable bidirectional editing on a specific element in the rendered view
const element = document.querySelector('.my-element');
element.contentEditable = 'true';

// Listen for changes
editor.events.on('content:change', (content, contentType) => {
  // Save content to server when it changes
  saveToServer(content, contentType);
});
```

## Examples

### Basic Markdown Editor

```html
<div id="editor"></div>

<script>
  const editor = new SquibView('#editor', {
    initialContent: '# Hello world\n\nThis is a simple markdown editor.',
    inputContentType: 'md'
  });
</script>
```

### CSV Table Editor

```html
<div id="editor"></div>

<script>
  const csvData = 'Name,Age,City\nJohn,30,New York\nJane,25,San Francisco';
  
  const editor = new SquibView('#editor', {
    initialContent: csvData,
    inputContentType: 'csv',
    initialView: 'split'
  });
</script>
```

### Presentation Slides

```html
<div id="editor"></div>

<script>
  const slides = `# My Presentation

First slide content

---

## Second Slide

- Bullet point 1
- Bullet point 2

---

## Final Slide

Thank you!`;
  
  const editor = new SquibView('#editor', {
    initialContent: slides,
    inputContentType: 'reveal',
    initialView: 'html'
  });
</script>
```

### Text Selection and Replacement

```html
<div id="editor"></div>

<script>
  const editor = new SquibView('#editor', {
    initialContent: '# Text Selection\n\nSelect some text to see it processed.',
    inputContentType: 'md',
    onReplaceSelectedText: function(selectionData) {
      // Simple text formatter
      if (selectionData.panel === 'source') {
        if (selectionData.text.match(/^[a-z]/)) {
          // Capitalize first letter of sentences
          return selectionData.text.charAt(0).toUpperCase() + 
                 selectionData.text.slice(1);
        }
      }
      // Return undefined to not replace anything
    }
  });
  
  // Add a button to make selected text bold
  const boldButton = document.createElement('button');
  boldButton.textContent = 'Bold';
  document.body.appendChild(boldButton);
  
  boldButton.addEventListener('click', () => {
    const selection = editor.getCurrentSelection();
    if (selection) {
      if (selection.panel === 'source') {
        editor.replaceSelectedText(`**${selection.text}**`, selection);
      } else {
        editor.replaceSelectedText(`<strong>${selection.text}</strong>`, selection);
      }
    }
  });
</script>
```

## FAQ

### How do I change from Markdown to HTML?

```javascript
// Get current content as Markdown
const mdContent = editor.getContent();

// Convert to HTML (if needed)
const htmlContent = editor.md.render(mdContent);

// Set content type to HTML
editor.setContent(htmlContent, 'html');
```

### How do I save content to a server?

```javascript
editor.events.on('content:change', (content, contentType) => {
  // Debounce to avoid too many requests
  clearTimeout(window.saveTimeout);
  window.saveTimeout = setTimeout(() => {
    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, contentType })
    });
  }, 1000);
});
```

### How do I extend SquibView with custom functionality?

```javascript
// Example: Add custom button to controls
const customButton = document.createElement('button');
customButton.textContent = 'Custom Action';
customButton.addEventListener('click', () => {
  const content = editor.getContent();
  // Do something with content
  editor.setContent(processedContent, editor.inputContentType);
});
editor.controls.appendChild(customButton);
```

### How do I handle large documents?

```javascript
// Set a warning threshold (characters)
const LARGE_DOC_THRESHOLD = 50000;

editor.events.on('content:change', (content) => {
  if (content.length > LARGE_DOC_THRESHOLD) {
    console.warn('Large document detected. Performance may be affected.');
    
    // Optionally defer rendering
    if (editor.currentView === 'split') {
      editor.setView('src');
      alert('Switched to source view due to large document size.');
    }
  }
});
```