# SquibView Documentation

Welcome to the SquibView documentation! SquibView is a lightweight, flexible live editor and renderer for various content types including Markdown, HTML, CSV, and RevealJS presentations.

## Documentation Index

- [Programmer's Guide](programmers-guide.md) - Comprehensive guide to SquibView's API and features
- [API Reference](#api-reference) - Complete API reference
- [Examples](#examples) - Code examples for common use cases
- [Release Notes](./release-notes.md) - Version history and changes

## Quick Start

### Installation

```bash
npm install squibview
```

Or include directly in HTML:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/squibview/dist/squibview.min.css">

<!-- Dependencies -->
<script src="https://cdn.jsdelivr.net/npm/markdown-it/dist/markdown-it.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlight.js/lib/core.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/papaparse/papaparse.min.js"></script>

<!-- SquibView -->
<script src="https://cdn.jsdelivr.net/npm/squibview/dist/squibview.umd.min.js"></script>
```

### Basic Usage

```html
<div id="editor"></div>

<script>
  const editor = new SquibView('#editor', {
    initialContent: '# Hello, world!\n\nThis is a **Markdown** editor.',
    inputContentType: 'md',
    initialView: 'split'
  });
</script>
```

## API Reference

### Core Methods

```javascript
// Create a new editor
const editor = new SquibView('#editor', options);

// Set content
editor.setContent('# New content', 'md');

// Get content
const content = editor.getContent();

// Change view mode
editor.setView('split'); // 'src', 'html', or 'split'

// Working with selections
editor.onTextSelected(selectionData => {
  console.log(`Selected: ${selectionData.text}`);
});

// Replace selected text
editor.replaceSelectedText('replacement', selectionData);

// Set a text replacement handler
editor.onReplaceSelectedText = function(selectionData) {
  // Process and optionally return replacement text
};

// Undo/redo
editor.revisionUndo();
editor.revisionRedo();
```

See the [Programmer's Guide](programmers-guide.md) for complete API details.

## Examples

### Markdown Editor

```javascript
const editor = new SquibView('#editor', {
  initialContent: '# Hello world',
  inputContentType: 'md',
  initialView: 'split'
});
```

### Text Selection and Replacement

```javascript
// Option 1: Using callbacks
editor.onTextSelected(selectionData => {
  if (selectionData.text.toLowerCase() === 'todo') {
    editor.replaceSelectedText('DONE', selectionData);
  }
});

// Option 2: Using the replacement handler
editor.onReplaceSelectedText = function(selectionData) {
  if (selectionData.text.toLowerCase() === 'todo') {
    return 'DONE';
  }
  // Return undefined to not replace anything
};
```

### CSV Table Editor

```javascript
const csvData = 'Name,Age,City\nJohn,30,New York\nJane,25,San Francisco';

const editor = new SquibView('#editor', {
  initialContent: csvData,
  inputContentType: 'csv',
  initialView: 'split'
});
```

### Presentation Editor

```javascript
const slides = `# My Presentation

First slide content

---

## Second Slide

- Bullet points
- More points

---

## Thank You

Questions?`;

const editor = new SquibView('#editor', {
  initialContent: slides,
  inputContentType: 'reveal',
  initialView: 'html'
});
```

## Community and Support

- [GitHub Repository](https://github.com/deftio/squibview)
- [Issue Tracker](https://github.com/deftio/squibview/issues)
- [Examples Directory](../examples/)

## License

SquibView is released under the MIT License. See the [LICENSE](../LICENSE.txt) file for details.