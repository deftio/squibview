# SquibView Headless Mode Guide

This guide explains how to use SquibView in headless mode to build custom UIs while leveraging SquibView's powerful rendering and copy/paste capabilities.

## What is Headless Mode?

Headless mode allows you to use SquibView's core rendering engine without its built-in UI controls. This lets you:

- **Build custom UIs** with your own buttons, toolbars, and controls
- **Integrate seamlessly** into existing applications
- **Maintain consistent design** with your app's look and feel
- **Keep all the power** of SquibView's rendering, bidirectional editing, and smart copy/paste

## Why Use Headless Mode?

### You Want SquibView's Power
- Rich markdown → HTML rendering
- Bidirectional editing capabilities
- Smart copy/paste with image handling
- Support for diagrams, math, tables, code highlighting
- Revision history and undo/redo

### But With Your Own UI
- Custom buttons matching your design system
- Specialized toolbars for your use case
- Integrated controls within your app
- Branded experience for your users

## Basic Headless Setup

```javascript
import SquibView from 'squibview';

// Create headless instance - no controls, just rendering
const editor = new SquibView('#editor-container', {
  showControls: false,      // Hide built-in controls
  titleShow: false,         // Hide title bar
  initialView: 'split',     // Can still use any view mode
  baseClass: 'my-editor'    // Custom CSS class for styling
});

// Now you have full API access without any UI
editor.setContent('# Hello World');
const html = editor.getHTMLSource();  // Get rendered HTML
```

## Building Custom Controls

### Example: Custom Toolbar

```html
<!-- Your custom UI -->
<div class="my-toolbar">
  <button onclick="customBold()">Bold</button>
  <button onclick="customItalic()">Italic</button>
  <button onclick="customLink()">Insert Link</button>
  <button onclick="switchView()">Toggle View</button>
  <button onclick="copyFormatted()">Copy</button>
  <button onclick="undoChange()">Undo</button>
</div>

<!-- Headless SquibView container -->
<div id="editor"></div>
```

```javascript
// Initialize headless SquibView
const editor = new SquibView('#editor', {
  showControls: false,
  initialContent: '# My Document'
});

// Custom control functions
function customBold() {
  const selection = window.getSelection();
  const selected = selection ? selection.toString() : '';
  if (selected && editor.lastSelectionData) {
    editor.replaceSelectedText(`**${selected}**`, editor.lastSelectionData);
  }
}

function customItalic() {
  const selection = window.getSelection();
  const selected = selection ? selection.toString() : '';
  if (selected && editor.lastSelectionData) {
    editor.replaceSelectedText(`*${selected}*`, editor.lastSelectionData);
  }
}

function customLink() {
  const url = prompt('Enter URL:');
  const selection = window.getSelection();
  const text = selection ? selection.toString() : 'link text';
  if (editor.lastSelectionData) {
    editor.replaceSelectedText(`[${text}](${url})`, editor.lastSelectionData);
  }
}

function switchView() {
  editor.toggleView(); // Still works without controls!
}

function copyFormatted() {
  editor.copyHTML();  // Copy as rich HTML
}

function undoChange() {
  editor.revisionUndo();  // Undo last change
}
```

## Advanced Custom UI Integration

### Material Design Integration

```javascript
// Use with Material Design components
import { MDCRipple } from '@material/ripple';

const editor = new SquibView('#editor', {
  showControls: false,
  baseClass: 'mdc-editor'
});

// Create Material Design toolbar
const toolbar = document.createElement('div');
toolbar.className = 'mdc-toolbar';
toolbar.innerHTML = `
  <button class="mdc-icon-button material-icons">format_bold</button>
  <button class="mdc-icon-button material-icons">format_italic</button>
  <button class="mdc-icon-button material-icons">link</button>
`;

// Attach handlers
toolbar.querySelectorAll('button').forEach(btn => {
  new MDCRipple(btn);
  btn.addEventListener('click', handleToolbarClick);
});
```

### React Component Wrapper

```jsx
import React, { useRef, useEffect, useState } from 'react';
import SquibView from 'squibview';

function CustomMarkdownEditor({ initialContent, onChange }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [view, setView] = useState('split');

  useEffect(() => {
    // Initialize headless editor
    editorRef.current = new SquibView(containerRef.current, {
      showControls: false,
      initialContent,
      initialView: view
    });

    // Listen for changes
    editorRef.current.on('content-change', (data) => {
      onChange?.(data.content);
    });

    return () => editorRef.current.destroy();
  }, []);

  return (
    <div className="custom-editor">
      {/* Custom toolbar */}
      <div className="toolbar">
        <button onClick={() => editorRef.current.undo()}>
          Undo
        </button>
        <button onClick={() => editorRef.current.redo()}>
          Redo
        </button>
        <button onClick={() => {
          setView(v => v === 'split' ? 'src' : v === 'src' ? 'html' : 'split');
          editorRef.current.setView(view);
        }}>
          View: {view}
        </button>
        <button onClick={() => editorRef.current.copyToClipboard()}>
          Copy
        </button>
      </div>

      {/* Headless SquibView */}
      <div ref={containerRef} />
    </div>
  );
}
```

### Vue Integration

```vue
<template>
  <div class="vue-markdown-editor">
    <!-- Custom controls -->
    <div class="editor-toolbar">
      <button @click="bold">B</button>
      <button @click="italic">I</button>
      <button @click="insertHeading">H1</button>
      <button @click="toggleView">{{ viewMode }}</button>
      <button @click="copyContent">Copy</button>
    </div>

    <!-- Headless editor -->
    <div ref="editorContainer"></div>
  </div>
</template>

<script>
import SquibView from 'squibview';

export default {
  data() {
    return {
      editor: null,
      viewMode: 'split'
    };
  },

  mounted() {
    // Initialize headless
    this.editor = new SquibView(this.$refs.editorContainer, {
      showControls: false,
      initialContent: this.content
    });
  },

  methods: {
    bold() {
      const selected = this.editor.getSelectedText();
      this.editor.replaceSelectedText(`**${selected}**`);
    },

    italic() {
      const selected = this.editor.getSelectedText();
      this.editor.replaceSelectedText(`*${selected}*`);
    },

    insertHeading() {
      this.editor.setContent('# ' + this.editor.getContent());
    },

    toggleView() {
      this.editor.toggleView();
      this.viewMode = this.editor.currentView;
    },

    copyContent() {
      this.editor.copyToClipboard('formatted');
    }
  }
};
</script>
```

## Leveraging Core Features

### Smart Copy/Paste

Even in headless mode, you get SquibView's intelligent copy/paste:

```javascript
const editor = new SquibView('#editor', {
  showControls: false,
  preserveImageTags: false  // Convert images to data URLs for portability
});

// Custom copy button with format selection
function customCopy(format) {
  // Use different methods based on format
  switch(format) {
    case 'markdown':
    case 'plain':
      editor.copySource();  // Copy source markdown
      break;
    case 'html':
    case 'formatted':
      editor.copyHTML();    // Copy rendered HTML
      break;
  }
  showNotification(`Copied as ${format}`);
}

// Handle paste with custom processing
editor.events.on('content:change', (content, contentType) => {
  console.log('Content changed:', content);
});
```

### Revision History

Build custom undo/redo UI:

```javascript
// Custom revision control UI
function updateRevisionButtons() {
  const currentIndex = editor.revisionGetCurrentIndex();
  const totalRevisions = editor.revisionNumRevsions();
  const canUndo = currentIndex > 0;
  const canRedo = totalRevisions > 0 && currentIndex < totalRevisions - 1;

  document.getElementById('undo-btn').disabled = !canUndo;
  document.getElementById('redo-btn').disabled = !canRedo;
  document.getElementById('revision-count').textContent =
    `Revision ${totalRevisions}`;
}

editor.events.on('revision:undo', updateRevisionButtons);
editor.events.on('revision:redo', updateRevisionButtons);
```

### Selection Handling

Create context menus and formatting tools:

```javascript
editor.events.on('text:selected', (data) => {
  if (data && data.text) {
    // Show custom context menu
    showContextMenu({
      text: data.text,
      position: getMousePosition(),
      actions: [
        { label: 'Bold', action: () => wrapSelection('**', data) },
        { label: 'Italic', action: () => wrapSelection('*', data) },
        { label: 'Code', action: () => wrapSelection('`', data) }
      ]
    });
  }
});

function wrapSelection(wrapper, selectionData) {
  const text = selectionData.text;
  editor.replaceSelectedText(`${wrapper}${text}${wrapper}`, selectionData);
}
```

## Common Patterns

### Floating Toolbar

```javascript
// Show toolbar near selection
editor.events.on('text:selected', (data) => {
  const toolbar = document.getElementById('floating-toolbar');

  if (data && data.text) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      toolbar.style.display = 'block';
      toolbar.style.left = `${rect.left}px`;
      toolbar.style.top = `${rect.top - 40}px`;
    }
  } else {
    toolbar.style.display = 'none';
  }
});
```

### Command Palette

```javascript
// Keyboard shortcut system
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'b':
        e.preventDefault();
        makeSelectionBold();
        break;
      case 'i':
        e.preventDefault();
        makeSelectionItalic();
        break;
      case 'k':
        e.preventDefault();
        insertLink();
        break;
      case 's':
        e.preventDefault();
        saveDocument();
        break;
    }
  }
});
```

### Status Bar

```javascript
// Custom status bar
function updateStatusBar() {
  const content = editor.getContent();
  const wordCount = content.split(/\s+/).length;
  const charCount = content.length;

  document.getElementById('status').innerHTML = `
    Words: ${wordCount} |
    Characters: ${charCount} |
    View: ${editor.currentView} |
    Type: ${editor.inputContentType}
  `;
}

editor.events.on('content:change', updateStatusBar);
editor.events.on('view:change', updateStatusBar);
```

## Styling Headless Mode

### Remove All Default Styling

```css
/* Hide any remaining controls */
.my-editor .squibview-controls {
  display: none !important;
}

/* Custom editor styling */
.my-editor .squibview-input {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
}

.my-editor .squibview-output {
  background: #f8f9fa;
  padding: 20px;
}
```

### Match Your Design System

```javascript
const editor = new SquibView('#editor', {
  showControls: false,
  baseClass: 'custom-editor' // Your CSS namespace
});

// Apply your theme
document.querySelector('.custom-editor').classList.add('dark-theme');
```

## Best Practices

### 1. Keep the Editor Instance

```javascript
// Good: Create once, reuse
class CustomEditor {
  constructor(container) {
    this.editor = new SquibView(container, {
      showControls: false
    });
  }

  // Methods use this.editor
  bold() { /* ... */ }
  italic() { /* ... */ }
}
```

### 2. Listen to Events

```javascript
// Stay in sync with editor state
editor.events.on('content:change', updateUI);
editor.events.on('view:change', updateViewButton);
editor.events.on('text:selected', updateFormatButtons);
```

### 3. Preserve Features

Don't disable features unnecessarily:

```javascript
// Good: Keep all features, just hide UI
const editor = new SquibView('#editor', {
  showControls: false,
  // Keep these enabled:
  autoload_deps: { all: true },  // Keep diagram, math support
  preserveImageTags: false       // Keep smart image handling
});
```

## Example: Complete Custom UI

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="squibview.min.css">
  <style>
    .editor-wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .custom-toolbar {
      display: flex;
      gap: 8px;
      padding: 12px;
      background: #2c3e50;
    }

    .toolbar-btn {
      padding: 8px 16px;
      background: #34495e;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .toolbar-btn:hover {
      background: #4a5f7f;
    }

    .toolbar-btn.active {
      background: #3498db;
    }

    #editor {
      flex: 1;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div class="editor-wrapper">
    <!-- Custom Toolbar -->
    <div class="custom-toolbar">
      <button class="toolbar-btn" onclick="app.format('bold')">Bold</button>
      <button class="toolbar-btn" onclick="app.format('italic')">Italic</button>
      <button class="toolbar-btn" onclick="app.format('code')">Code</button>
      <div style="flex: 1"></div>
      <button class="toolbar-btn" onclick="app.changeView()">View</button>
      <button class="toolbar-btn" onclick="app.copy()">Copy</button>
      <button class="toolbar-btn" onclick="app.undo()">Undo</button>
      <button class="toolbar-btn" onclick="app.redo()">Redo</button>
    </div>

    <!-- Headless Editor -->
    <div id="editor"></div>
  </div>

  <script type="module">
    import SquibView from './squibview.esm.min.js';

    class CustomMarkdownApp {
      constructor() {
        this.editor = new SquibView('#editor', {
          showControls: false,
          initialContent: '# Welcome\n\nStart writing...',
          initialView: 'split'
        });

        this.setupEventListeners();
      }

      format(type) {
        const selected = this.editor.getSelectedText();
        if (!selected) return;

        const formats = {
          bold: `**${selected}**`,
          italic: `*${selected}*`,
          code: `\`${selected}\``
        };

        this.editor.replaceSelectedText(formats[type]);
      }

      changeView() {
        this.editor.toggleView();
        this.updateViewButton();
      }

      copy() {
        this.editor.copyToClipboard('formatted');
        this.showNotification('Copied!');
      }

      undo() {
        this.editor.undo();
      }

      redo() {
        this.editor.redo();
      }

      setupEventListeners() {
        this.editor.on('content-change', () => {
          console.log('Content updated');
        });

        this.editor.on('view-change', (data) => {
          console.log('View changed to:', data.newView);
        });
      }

      showNotification(message) {
        // Your notification system
        console.log(message);
      }

      updateViewButton() {
        // Update button state based on current view
      }
    }

    // Initialize app
    window.app = new CustomMarkdownApp();
  </script>
</body>
</html>
```

## Summary

Headless mode lets you use SquibView as a powerful rendering engine while building your own UI. You get:

- Full markdown rendering capabilities
- Bidirectional editing
- Smart copy/paste
- All rich content support (diagrams, math, etc.)
- Complete API access

Without:
- Default buttons and controls
- Built-in toolbar
- Standard UI elements

This makes SquibView perfect for integrating into existing applications, building custom editors, or creating branded experiences while keeping all the powerful rendering and editing capabilities.

## Related Documentation

- [API Methods](../api/methods.md) - All available methods for custom controls
- [Events Reference](../api/events.md) - Events to listen for in your custom UI
- [Options Reference](../api/options.md) - Configuration options
- [Examples](../../examples/example_headless.html) - Live headless mode example