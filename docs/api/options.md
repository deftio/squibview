# SquibView Options Reference

Complete reference for all configuration options available when creating a SquibView instance.

## Constructor Options

All options are passed as an object to the SquibView constructor:

```javascript
const editor = new SquibView('#editor', {
  // options here
});
```

## Content Options

### initialContent

Initial content to display in the editor.

- **Type:** `string`
- **Default:** `''`
- **Example:**
```javascript
initialContent: '# Welcome\n\nStart editing here...'
```

---

### inputContentType

Type of the initial content and default content type for the editor.

- **Type:** `string`
- **Default:** `'md'`
- **Values:** `'md'`, `'html'`, `'reveal'`, `'csv'`, `'tsv'`
- **Example:**
```javascript
inputContentType: 'html'
```

## Display Options

### initialView

Initial view mode for the editor.

- **Type:** `string`
- **Default:** `'split'`
- **Values:** `'src'`, `'html'`, `'split'`
- **Example:**
```javascript
initialView: 'src'  // Start with source view only
```

---

### showControls

Whether to display the control toolbar.

- **Type:** `boolean`
- **Default:** `true`
- **Example:**
```javascript
showControls: false  // Hide all controls
```

---

### titleShow

Whether to display the title section above the editor.

- **Type:** `boolean`
- **Default:** `false`
- **Example:**
```javascript
titleShow: true,
titleContent: 'My Editor'
```

---

### titleContent

Content for the title section (only used if `titleShow` is true).

- **Type:** `string`
- **Default:** `''`
- **Example:**
```javascript
titleShow: true,
titleContent: '<h2>Document Editor</h2>'
```

---

### baseClass

Base CSS class for styling the editor container.

- **Type:** `string`
- **Default:** `'squibview'`
- **Example:**
```javascript
baseClass: 'my-custom-editor'  // Use custom CSS class
```

## Line Numbers

### showLineNumbers

Whether to display line numbers in the source editor.

- **Type:** `boolean`
- **Default:** `false`
- **Example:**
```javascript
showLineNumbers: true
```

---

### lineNumberStart

Starting line number (when line numbers are shown).

- **Type:** `number`
- **Default:** `1`
- **Example:**
```javascript
showLineNumbers: true,
lineNumberStart: 100  // Start numbering from 100
```

---

### lineNumberMinDigits

Minimum number of digits for line numbers (adds leading zeros).

- **Type:** `number`
- **Default:** `2`
- **Example:**
```javascript
showLineNumbers: true,
lineNumberMinDigits: 3  // Shows 001, 002, etc.
```

## Content Processing

### preserveImageTags

Whether to preserve HTML image tags when converting HTML to Markdown.

- **Type:** `boolean`
- **Default:** `true`
- **Example:**
```javascript
preserveImageTags: false  // Convert <img> to ![alt](src)
```

## Event Handlers

### onReplaceSelectedText

Callback function for handling text replacement operations.

- **Type:** `function(selectionData)`
- **Default:** `null`
- **Example:**
```javascript
onReplaceSelectedText: (data) => {
  console.log('Selected:', data.text);
  // Return replacement text or handle replacement
  return data.text.toUpperCase();
}
```

## Dependency Autoloading

### autoload_deps

Configuration for automatically loading external dependencies.

- **Type:** `Object | null`
- **Default:** `null` (disabled)
- **Structure:**
```javascript
{
  all: boolean,           // Enable all autoloading
  strategy: string,       // 'auto', 'ondemand', or 'custom'
  libraries: {
    mermaid: boolean | 'auto' | 'ondemand' | 'none',
    hljs: boolean | 'auto' | 'ondemand' | 'none',
    mathjax: boolean | 'auto' | 'ondemand' | 'none',
    leaflet: boolean | 'auto' | 'ondemand' | 'none',
    three: boolean | 'auto' | 'ondemand' | 'none'
  },
  cdnUrls: {
    // Custom CDN URLs for each library
  },
  debug: boolean          // Enable debug logging
}
```

### Autoload Examples

#### Enable All Dependencies
```javascript
autoload_deps: {
  all: true  // Load all dependencies automatically
}
```

#### Selective Autoloading
```javascript
autoload_deps: {
  libraries: {
    mermaid: 'auto',      // Load at startup
    hljs: 'ondemand',     // Load when needed
    mathjax: false        // Never load
  }
}
```

#### Custom CDN URLs
```javascript
autoload_deps: {
  all: true,
  cdnUrls: {
    mermaid: {
      script: 'https://my-cdn.com/mermaid.min.js'
    },
    hljs: {
      script: 'https://my-cdn.com/highlight.min.js',
      css: 'https://my-cdn.com/highlight.css'
    }
  }
}
```

#### On-Demand Loading
```javascript
autoload_deps: {
  strategy: 'ondemand',  // Only load when content requires it
  debug: true            // Show loading messages
}
```

## Complete Example

```javascript
const editor = new SquibView('#editor', {
  // Content
  initialContent: '# Welcome\n\nStart typing...',
  inputContentType: 'md',

  // Display
  initialView: 'split',
  showControls: true,
  titleShow: true,
  titleContent: 'My Document',
  baseClass: 'my-editor',

  // Line numbers
  showLineNumbers: true,
  lineNumberStart: 1,
  lineNumberMinDigits: 2,

  // Processing
  preserveImageTags: true,

  // Events
  onReplaceSelectedText: (data) => {
    return processSelection(data);
  },

  // Dependencies
  autoload_deps: {
    strategy: 'ondemand',
    libraries: {
      mermaid: 'auto',
      hljs: 'auto',
      mathjax: 'ondemand'
    }
  }
});
```

## Default Values

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
  onReplaceSelectedText: null,
  autoload_deps: null
}
```

## See Also

- [SquibView Class](./SquibView.md)
- [Methods Reference](./methods.md)
- [Events Reference](./events.md)
- [Examples](../examples/)