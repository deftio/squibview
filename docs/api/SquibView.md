# Class: SquibView

The main editor class that provides a live-rendering editor for various content types.

## Constructor

```javascript
new SquibView(element, options)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `HTMLElement \| string` | The DOM element or CSS selector where the editor will be mounted |
| `options` | `Object` | Configuration options for the editor (see [Options](./options.md)) |

### Example

```javascript
// Create editor with default options
const editor = new SquibView('#editor');

// Create editor with custom options
const editor = new SquibView('#editor', {
  initialContent: '# Hello World',
  inputContentType: 'md',
  initialView: 'split',
  showControls: true,
  showLineNumbers: true
});
```

## Static Properties

### `SquibView.version`

Returns version information for the library.

```javascript
console.log(SquibView.version);
// { version: '1.0.18', url: 'https://github.com/...' }
```

### `SquibView.defaultOptions`

Default configuration options for new instances.

```javascript
{
  initialContent: '',
  inputContentType: 'md',
  showControls: true,
  titleShow: false,
  titleContent: '',
  initialView: 'split',
  baseClass: 'squibview',
  preserveImageTags: true,
  showLineNumbers: false,
  lineNumberStart: 1,
  lineNumberMinDigits: 2,
  autoload_deps: null
}
```

### `SquibView.DEFAULT_CDN_URLS`

Default CDN URLs for autoloading external dependencies.

## Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `container` | `HTMLElement` | The container element |
| `input` | `HTMLTextAreaElement` | The source input textarea |
| `output` | `HTMLElement` | The rendered output element |
| `currentView` | `string` | Current view mode ('src', 'html', 'split') |
| `inputContentType` | `string` | Current content type ('md', 'html', 'reveal', 'csv', 'tsv') |
| `revisionManager` | `RevisionHistory` | Revision history manager |
| `events` | `TinyEmitter` | Event emitter for plugin communication |

## Core Methods

### Content Management

- [`setContent(content, contentType, saveRevision)`](./methods.md#setcontent) - Set editor content
- [`getContent()`](./methods.md#getcontent) - Get current source content
- [`getRenderedHTML()`](./methods.md#getrenderedhtml) - Get rendered HTML output
- [`clearContent()`](./methods.md#clearcontent) - Clear all content

### View Control

- [`setView(view)`](./methods.md#setview) - Change view mode
- [`toggleView()`](./methods.md#toggleview) - Cycle through view modes
- [`showSource()`](./methods.md#showsource) - Show source view only
- [`showHTML()`](./methods.md#showhtml) - Show rendered view only
- [`showSplit()`](./methods.md#showsplit) - Show split view

### Content Type

- [`setContentType(type)`](./methods.md#setcontenttype) - Change content type
- [`getContentType()`](./methods.md#getcontenttype) - Get current content type

### Revision Management

- [`undo()`](./methods.md#undo) - Undo last change
- [`redo()`](./methods.md#redo) - Redo previously undone change
- [`canUndo()`](./methods.md#canundo) - Check if undo is available
- [`canRedo()`](./methods.md#canredo) - Check if redo is available
- [`getRevisionCount()`](./methods.md#getrevisioncount) - Get number of saved revisions

### Selection & Copy

- [`copyToClipboard(copyMode)`](./methods.md#copytoclipboard) - Copy content to clipboard
- [`getSelectedText()`](./methods.md#getselectedtext) - Get currently selected text
- [`getSelectionData()`](./methods.md#getselectiondata) - Get detailed selection information
- [`setOnReplaceSelectedText(handler)`](./methods.md#setonreplaceselectedtext) - Set text replacement handler

### Renderer System

- [`registerRenderer(type, config)`](./methods.md#registerrenderer) - Register custom renderer
- [`render()`](./methods.md#render) - Manually trigger rendering

### Events

- [`on(event, handler)`](./methods.md#on) - Subscribe to event
- [`off(event, handler)`](./methods.md#off) - Unsubscribe from event
- [`emit(event, data)`](./methods.md#emit) - Emit custom event

## Events

See [Events Documentation](./events.md) for complete event reference.

### Core Events

- `content-change` - Content has changed
- `view-change` - View mode has changed
- `type-change` - Content type has changed
- `render` - Content has been rendered
- `selection-change` - Text selection has changed
- `revision-added` - New revision saved
- `undo` - Undo performed
- `redo` - Redo performed

## See Also

- [Methods Reference](./methods.md)
- [Options Reference](./options.md)
- [Events Reference](./events.md)
- [Examples](../examples/)