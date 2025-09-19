# SquibView Events Reference

Complete reference for all events emitted by SquibView and how to handle them.

## Event System Overview

SquibView uses an event-driven architecture for communication between components and plugins. Events are accessed through the `editor.events` object.

```javascript
// Subscribe to an event
editor.events.on('content:change', (content, contentType) => {
  console.log('Content changed:', content);
});

// Unsubscribe from an event
editor.events.off('content:change', handler);

// Note: Event names use colons (:) not hyphens (-)
```

## Core Events

### content:change

Fired when the editor content changes.

**Event Parameters:**
- `content` (string) - New content
- `contentType` (string) - Current content type

**Example:**
```javascript
editor.events.on('content:change', (content, contentType) => {
  console.log('New content:', content);
  console.log('Type:', contentType);
  saveToServer(content);
});
```

---

### view:change

Fired when the view mode changes.

**Event Parameters:**
- `view` (string) - New view mode ('src', 'html', 'split')

**Example:**
```javascript
editor.events.on('view:change', (view) => {
  console.log(`View changed to ${view}`);
  updateUIButtons(view);
});
```

---

### text:selected

Fired when text is selected in either the source or rendered view.

**Event Data:**
```javascript
{
  text: string,     // Selected text
  source: string,   // Selection source ('input' or 'output')
  range: {          // Selection range (for input only)
    start: number,
    end: number
  }
}
```

**Example:**
```javascript
editor.events.on('text:selected', (data) => {
  console.log('Selected text:', data.text);
  console.log('From:', data.source);

  // Enable formatting buttons
  if (data.text) {
    enableFormatButtons();
  }
});
```

---

### render

Fired after content is rendered.

**Event Data:**
```javascript
{
  content: string,      // Source content
  rendered: string,     // Rendered HTML
  contentType: string,  // Content type
  duration: number      // Render time in milliseconds
}
```

**Example:**
```javascript
editor.on('render', (data) => {
  console.log(`Rendered in ${data.duration}ms`);
  processRenderedContent(data.rendered);
});
```

## Selection Events

### selection-change

Fired when text selection changes.

**Event Data:**
```javascript
{
  text: string,         // Selected text
  html: string,         // Selected HTML (if from output)
  markdown: string,     // Converted markdown
  start: number,        // Start position
  end: number,          // End position
  source: string,       // 'input' or 'output'
  hasSelection: boolean // Whether text is selected
}
```

**Example:**
```javascript
editor.on('selection-change', (data) => {
  if (data.hasSelection) {
    console.log('Selected:', data.text);
    showContextMenu(data);
  } else {
    hideContextMenu();
  }
});
```

---

### copy

Fired when content is copied to clipboard.

**Event Data:**
```javascript
{
  content: string,     // Copied content
  format: string,      // Format ('plain', 'html', 'markdown', 'formatted')
  source: string,      // Source of copy ('input' or 'output')
  success: boolean     // Whether copy succeeded
}
```

**Example:**
```javascript
editor.on('copy', (data) => {
  if (data.success) {
    showNotification(`Copied as ${data.format}`);
  }
});
```

## Revision Events

### revision-added

Fired when a new revision is saved.

**Event Data:**
```javascript
{
  revision: number,    // Revision number
  content: string,     // Content snapshot
  contentType: string, // Content type
  timestamp: number    // Unix timestamp
}
```

**Example:**
```javascript
editor.on('revision-added', (data) => {
  console.log(`Revision ${data.revision} saved`);
  updateRevisionIndicator(data.revision);
});
```

---

### undo

Fired when undo is performed.

**Event Data:**
```javascript
{
  revision: number,    // Current revision after undo
  content: string,     // Restored content
  contentType: string  // Restored content type
}
```

**Example:**
```javascript
editor.on('undo', (data) => {
  console.log('Undone to revision:', data.revision);
  updateUndoRedoButtons();
});
```

---

### redo

Fired when redo is performed.

**Event Data:**
```javascript
{
  revision: number,    // Current revision after redo
  content: string,     // Restored content
  contentType: string  // Restored content type
}
```

**Example:**
```javascript
editor.on('redo', (data) => {
  console.log('Redone to revision:', data.revision);
  updateUndoRedoButtons();
});
```

## Lifecycle Events

### ready

Fired when the editor is fully initialized and ready.

**Event Data:**
```javascript
{
  version: string,     // SquibView version
  contentType: string, // Initial content type
  view: string        // Initial view mode
}
```

**Example:**
```javascript
editor.on('ready', (data) => {
  console.log('Editor ready:', data);
  loadInitialContent();
});
```

---

### destroy

Fired when the editor is being destroyed.

**Event Data:** None

**Example:**
```javascript
editor.events.on('destroy', () => {
  console.log('Editor destroyed');
  cleanupResources();
});
```

## Plugin Events

### plugin-register

Fired when a plugin (renderer) is registered.

**Event Data:**
```javascript
{
  type: string,       // Content type
  name: string,       // Plugin name
  hasButtons: boolean // Whether plugin adds buttons
}
```

**Example:**
```javascript
editor.on('plugin-register', (data) => {
  console.log(`Plugin registered: ${data.name} for ${data.type}`);
});
```

---

### plugin-render

Fired when a plugin renders content.

**Event Data:**
```javascript
{
  type: string,        // Content type
  input: string,       // Source content
  output: string,      // Rendered output
  pluginName: string   // Plugin that rendered
}
```

**Example:**
```javascript
editor.on('plugin-render', (data) => {
  console.log(`${data.pluginName} rendered ${data.type} content`);
});
```

## Custom Events

You can emit and listen to custom events for plugin communication:

```javascript
// Emit a custom event
editor.emit('my-plugin:action', {
  action: 'process',
  data: { /* ... */ }
});

// Listen to custom events
editor.on('my-plugin:action', (data) => {
  if (data.action === 'process') {
    processPluginData(data.data);
  }
});
```

## Event Patterns

### Global Event Handlers

```javascript
// Log all events
const events = [
  'content-change', 'view-change', 'type-change',
  'render', 'selection-change', 'copy',
  'revision-added', 'undo', 'redo'
];

events.forEach(event => {
  editor.on(event, (data) => {
    console.log(`Event: ${event}`, data);
  });
});
```

### Debounced Event Handling

```javascript
let saveTimer;

editor.on('content-change', (data) => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveContent(data.content);
  }, 1000); // Save after 1 second of inactivity
});
```

### Event Chaining

```javascript
editor.on('content-change', (data) => {
  // Trigger custom analysis
  editor.emit('analyze:content', {
    content: data.content,
    type: data.contentType
  });
});

editor.on('analyze:content', (data) => {
  // Perform analysis
  const stats = analyzeContent(data);
  editor.emit('analyze:complete', stats);
});
```

## Removing Event Listeners

```javascript
// Named function handler
const handler = (data) => {
  console.log(data);
};

// Add listener
editor.on('content-change', handler);

// Remove specific listener
editor.off('content-change', handler);

// Remove all listeners for an event
editor.off('content-change');
```

## Best Practices

1. **Always remove listeners** when components are destroyed
2. **Debounce frequent events** like content-change for performance
3. **Use namespaced custom events** to avoid conflicts (e.g., 'myplugin:action')
4. **Check event data** before using it in handlers
5. **Handle errors** in event handlers to prevent breaking the editor

## See Also

- [SquibView Class](./SquibView.md)
- [Methods Reference](./methods.md)
- [Options Reference](./options.md)
- [Plugin Development](./plugins.md)