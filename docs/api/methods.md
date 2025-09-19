# SquibView Methods Reference

Complete reference for all public methods of the SquibView class.

## Content Management

### setContent

Sets the editor content and optionally changes the content type.

```javascript
setContent(content, contentType, saveRevision = true)
```

**Parameters:**
- `content` (string) - The content to set
- `contentType` (string) - Optional. Content type ('md', 'html', 'reveal', 'csv', 'tsv')
- `saveRevision` (boolean) - Whether to save this change to revision history

**Returns:** `void`

**Example:**
```javascript
editor.setContent('# New Content', 'md');
editor.setContent('<h1>HTML Content</h1>', 'html', false);
```

---

### getContent

Returns the current source content.

```javascript
getContent()
```

**Returns:** `string` - The current source content

**Example:**
```javascript
const content = editor.getContent();
console.log(content);
```

---

### getHTMLSource

Returns the rendered HTML output.

```javascript
getHTMLSource()
```

**Returns:** `string` - The rendered HTML

**Example:**
```javascript
const html = editor.getHTMLSource();
document.getElementById('preview').innerHTML = html;
```

---

### clearContent

Clears all content from the editor.

```javascript
clearContent()
```

**Returns:** `void`

**Example:**
```javascript
editor.clearContent();
```

## View Control

### setView

Changes the editor view mode.

```javascript
setView(view)
```

**Parameters:**
- `view` (string) - View mode: 'src', 'html', or 'split'

**Returns:** `void`

**Example:**
```javascript
editor.setView('split');
editor.setView('html');
```

---

### toggleView

Cycles through the available view modes (src → html → split → src).

```javascript
toggleView()
```

**Returns:** `void`

**Example:**
```javascript
editor.toggleView();
```

---

### showSource

Shows only the source editor view.

```javascript
showSource()
```

**Returns:** `void`

**Example:**
```javascript
editor.showSource();
```

---

### showHTML

Shows only the rendered HTML view.

```javascript
showHTML()
```

**Returns:** `void`

**Example:**
```javascript
editor.showHTML();
```

---

### showSplit

Shows the split view with both source and rendered output.

```javascript
showSplit()
```

**Returns:** `void`

**Example:**
```javascript
editor.showSplit();
```

## Content Type

### setContentType

Changes the content type and re-renders the content.

```javascript
setContentType(type)
```

**Parameters:**
- `type` (string) - Content type: 'md', 'html', 'reveal', 'csv', or 'tsv'

**Returns:** `void`

**Example:**
```javascript
editor.setContentType('md');
editor.setContentType('csv');
```

---

### getContentType

Returns the current content type.

```javascript
getContentType()
```

**Returns:** `string` - Current content type

**Example:**
```javascript
const type = editor.getContentType();
console.log(type); // 'md'
```

## Revision Management

### revisionUndo

Undoes the last change and restores previous content.

```javascript
revisionUndo()
```

**Returns:** `boolean` - True if undo was performed, false if no history

**Example:**
```javascript
if (editor.revisionUndo()) {
  console.log('Undo performed');
}
```

---

### revisionRedo

Redoes a previously undone change.

```javascript
revisionRedo()
```

**Returns:** `boolean` - True if redo was performed, false if no redo history

**Example:**
```javascript
if (editor.revisionRedo()) {
  console.log('Redo performed');
}
```

---

### revisionGetCurrentIndex

Gets the current position in the revision history.

```javascript
revisionGetCurrentIndex()
```

**Returns:** `number` - Current revision index (0-based)

**Example:**
```javascript
const currentIndex = editor.revisionGetCurrentIndex();
const totalRevisions = editor.revisionNumRevsions();

// Check if undo/redo are available
const canUndo = currentIndex > 0;
const canRedo = totalRevisions > 0 && currentIndex < totalRevisions - 1;

if (canUndo) {
  document.getElementById('undoBtn').disabled = false;
}
if (canRedo) {
  document.getElementById('redoBtn').disabled = false;
}
```

---

### revisionNumRevsions

Returns the number of revisions in history.

```javascript
revisionNumRevsions()
```

**Returns:** `number` - Number of saved revisions

**Example:**
```javascript
const count = editor.revisionNumRevsions();
console.log(`${count} revisions saved`);
```

---

### revisionSet

Jumps to a specific revision by index.

```javascript
revisionSet(index)
```

**Parameters:**
- `index` (number) - The revision index to jump to

**Returns:** `boolean` - True if revision was set successfully

**Example:**
```javascript
editor.revisionSet(0); // Jump to first revision
editor.revisionSet(editor.revisionNumRevsions() - 1); // Jump to latest
```

## Selection & Clipboard

### copySource

Copies the source content (markdown) to the clipboard.

```javascript
copySource()
```

**Returns:** `Promise<boolean>` - True if copy succeeded

**Example:**
```javascript
await editor.copySource();
```

---

### copyHTML

Copies the rendered HTML to the clipboard.

```javascript
copyHTML()
```

**Returns:** `Promise<boolean>` - True if copy succeeded

**Example:**
```javascript
await editor.copyHTML();
```

---

### copyToClipboard

Low-level method to copy any text string to the clipboard.

```javascript
copyToClipboard(text)
```

**Parameters:**
- `text` (string) - The text to copy

**Returns:** `boolean` - True if copy succeeded

**Example:**
```javascript
const success = editor.copyToClipboard('Custom text');
```

---

### Getting Selected Text

SquibView doesn't expose a public method for getting selected text directly. Use the browser's selection API:

```javascript
// Get selected text from browser
const selection = window.getSelection();
const selectedText = selection ? selection.toString() : '';

// Or listen for selection events
editor.events.on('text:selected', (data) => {
  console.log('Selected text:', data.text);
  console.log('Source:', data.source); // 'input' or 'output'
});
```

---

### getSelectionData

Returns detailed information about the current selection.

```javascript
getSelectionData()
```

**Returns:** `Object` - Selection data with properties:
- `text` (string) - Selected text
- `html` (string) - Selected HTML (if from rendered view)
- `markdown` (string) - Converted markdown (if applicable)
- `start` (number) - Start position (source view)
- `end` (number) - End position (source view)
- `source` (string) - 'input' or 'output'

**Example:**
```javascript
const selection = editor.getSelectionData();
console.log('Selected text:', selection.text);
console.log('From:', selection.source);
```

---

### setOnReplaceSelectedText

Sets a handler for replacing selected text.

```javascript
setOnReplaceSelectedText(handler)
```

**Parameters:**
- `handler` (function) - Callback function that receives selection data

**Returns:** `void`

**Example:**
```javascript
editor.setOnReplaceSelectedText((data) => {
  const replacement = data.text.toUpperCase();
  editor.replaceSelectedText(replacement);
});
```

---

### replaceSelectedText

Replaces selected text with new text. Requires selection data from the text:selected event.

```javascript
replaceSelectedText(newText, selectionData)
```

**Parameters:**
- `newText` (string) - Text to replace selection with
- `selectionData` (object) - Selection data from text:selected event or lastSelectionData

**Returns:** `void`

**Example:**
```javascript
// Listen for text selection and wrap in bold
editor.events.on('text:selected', (data) => {
  editor.replaceSelectedText(`**${data.text}**`, data);
});

// Or use lastSelectionData if available
if (editor.lastSelectionData) {
  const text = editor.lastSelectionData.text;
  editor.replaceSelectedText(`**${text}**`, editor.lastSelectionData);
}
```

## Renderer System

### registerRenderer

Registers a custom content renderer.

```javascript
registerRenderer(type, config)
```

**Parameters:**
- `type` (string) - Content type identifier
- `config` (Object) - Renderer configuration with properties:
  - `name` (string) - Display name
  - `render` (function) - Render function
  - `outputToSource` (function) - Optional. Convert output to source
  - `buttons` (Array) - Optional. Custom toolbar buttons
  - `operations` (Object) - Optional. Button operations

**Returns:** `void`

**Example:**
```javascript
editor.registerRenderer('json', {
  name: 'JSON',
  render: (content) => {
    try {
      const parsed = JSON.parse(content);
      return `<pre>${JSON.stringify(parsed, null, 2)}</pre>`;
    } catch (e) {
      return `<pre class="error">${e.message}</pre>`;
    }
  }
});
```

---

### render

Manually triggers content rendering.

```javascript
render()
```

**Returns:** `void`

**Example:**
```javascript
// Force re-render after external changes
editor.render();
```

## Event System

### on

Subscribes to an editor event.

```javascript
on(event, handler)
```

**Parameters:**
- `event` (string) - Event name
- `handler` (function) - Event handler function

**Returns:** `void`

**Example:**
```javascript
editor.on('content-change', (data) => {
  console.log('Content changed:', data);
});

editor.on('view-change', (view) => {
  console.log('View changed to:', view);
});
```

---

### off

Unsubscribes from an editor event.

```javascript
off(event, handler)
```

**Parameters:**
- `event` (string) - Event name
- `handler` (function) - Handler to remove

**Returns:** `void`

**Example:**
```javascript
const handler = (data) => console.log(data);
editor.on('content-change', handler);
// Later...
editor.off('content-change', handler);
```

---

### emit

Emits a custom event.

```javascript
emit(event, data)
```

**Parameters:**
- `event` (string) - Event name
- `data` (any) - Event data

**Returns:** `void`

**Example:**
```javascript
editor.emit('custom-event', { message: 'Hello' });
```

## Utility Methods

### destroy

Cleans up the editor instance and removes event listeners.

```javascript
destroy()
```

**Returns:** `void`

**Example:**
```javascript
// Clean up before removing from DOM
editor.destroy();
```

---

### getVersion

Returns the library version information.

```javascript
getVersion()
```

**Returns:** `Object` - Version info with `version` and `url` properties

**Example:**
```javascript
const version = editor.getVersion();
console.log(`SquibView v${version.version}`);
```

## Line Numbers

### setLineNumbers

Enables or disables line numbers display.

```javascript
setLineNumbers(show, options)
```

**Parameters:**
- `show` (boolean) - Whether to show line numbers
- `options` (Object) - Optional. Line number configuration:
  - `start` (number) - Starting line number
  - `minDigits` (number) - Minimum digit width

**Returns:** `void`

**Example:**
```javascript
// Enable line numbers
editor.setLineNumbers(true);

// Enable with custom start
editor.setLineNumbers(true, { start: 100, minDigits: 3 });
```

## See Also

- [SquibView Class](./SquibView.md)
- [Events Reference](./events.md)
- [Options Reference](./options.md)
- [Examples](../examples/)