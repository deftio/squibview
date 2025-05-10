# SquibView Improvement Recommendations

## Core Architecture Improvements

### Plugin System for Content Types

**Current State:**
- Rendering engines for different content types (Markdown, HTML, CSV) are hardcoded in the `renderOutput` method
- Special operations like heading adjustment are tightly coupled to Markdown mode

**Recommendation:**
- Implement a plugin architecture for content types:
  ```javascript
  class SquibView {
    constructor(element, options = {}) {
      // Initialize renderer registry
      this.renderers = {};
      
      // Register default renderers
      this.registerRenderer('md', {
        render: (source) => this.renderMarkdown(source),
        sourceToOutput: (source) => this.md.render(source),
        outputToSource: (output) => this.htmlToMarkdown(output),
        operations: {
          increaseHeadings: (src) => this.markdownAdjustHeadings(src, 1),
          decreaseHeadings: (src) => this.markdownAdjustHeadings(src, -1),
          removeHR: (src) => src.replace(/---/g, '')
        },
        buttons: [
          { label: 'H-', action: 'decreaseHeadings' },
          { label: 'H+', action: 'increaseHeadings' },
          { label: 'Remove HR', action: 'removeHR' }
        ]
      });
      
      // Similar for HTML, CSV, etc.
    }
    
    registerRenderer(type, config) {
      this.renderers[type] = config;
    }
    
    renderOutput() {
      const renderer = this.renderers[this.inputContentType];
      if (renderer) {
        renderer.render(this.getContent());
      } else {
        console.warn(`No renderer for content type: ${this.inputContentType}`);
      }
    }
  }
  ```

### Bidirectional Editing

**Current State:**
- Edits in source mode update rendered output
- No mechanism to edit rendered content and reflect changes back to source

**Recommendation:**
- Implement bidirectional transformation functions that each renderer must provide:
  - `sourceToOutput`: Transform source code to rendered output (already exists)
  - `outputToSource`: Transform edited rendered content back to source format
  - For Markdown: Use a library like Turndown to convert HTML back to Markdown
  - For CSV: Parse the edited table DOM structure back to CSV format
  - Add event listeners to the rendered content to detect changes:
  ```javascript
  initializeEventHandlers() {
    // Existing code...
    
    // Add listener for rendered content changes
    this.output.addEventListener('input', () => {
      if (this.currentView === 'html' || this.currentView === 'split') {
        const renderedContent = this.output.querySelector('[contenteditable="true"]').innerHTML;
        const renderer = this.renderers[this.inputContentType];
        if (renderer && renderer.outputToSource) {
          const newSource = renderer.outputToSource(renderedContent);
          // Update source without triggering render cycle
          this.input.value = newSource;
          // Save revision
          this.saveRevision(newSource, this.inputContentType);
        }
      }
    });
  }
  ```

## Memory-Efficient Undo/Redo System

**Current State:**
- Each revision stores a complete copy of the content
- Potentially memory-intensive for large documents or frequent changes

**Recommendation:**
- Implement a diff-based revision system using libraries like `diff-match-patch` or `jsdiff`:
  ```javascript
  class RevisionManager {
    constructor() {
      this.initialContent = '';
      this.diffs = [];
      this.currentIndex = -1;
    }
    
    initialize(content) {
      this.initialContent = content;
      this.diffs = [];
      this.currentIndex = -1;
    }
    
    addRevision(newContent) {
      // Calculate diff between current state and new state
      const currentContent = this.getCurrentContent();
      const diff = JsDiff.createPatch('content', currentContent, newContent);
      
      // Remove any forward history if we're branching
      if (this.currentIndex < this.diffs.length - 1) {
        this.diffs = this.diffs.slice(0, this.currentIndex + 1);
      }
      
      // Add new diff
      this.diffs.push(diff);
      this.currentIndex = this.diffs.length - 1;
    }
    
    undo() {
      if (this.currentIndex >= 0) {
        this.currentIndex--;
        return this.getCurrentContent();
      }
      return null;
    }
    
    redo() {
      if (this.currentIndex < this.diffs.length - 1) {
        this.currentIndex++;
        return this.getCurrentContent();
      }
      return null;
    }
    
    getCurrentContent() {
      if (this.currentIndex < 0) return this.initialContent;
      
      // Apply all diffs up to currentIndex
      let content = this.initialContent;
      for (let i = 0; i <= this.currentIndex; i++) {
        content = JsDiff.applyPatch(content, this.diffs[i]);
      }
      return content;
    }
  }
  ```

- Integrate with the SquibView class by replacing the current revision buffer system:
  ```javascript
  constructor(element, options = {}) {
    // Instead of the current revisions object:
    // this.revisions = {buffer : [], index : 0};
    
    // Use the new RevisionManager:
    this.revisionManager = new RevisionManager();
  }
  
  setContent(content = this.input.value, contentType = this.inputContentType, saveRevision = true) {
    if (saveRevision) {
      this.revisionManager.addRevision(content);
    }
    this.input.value = content;
    this.inputContentType = contentType;
    this.renderOutput();
  }
  
  revisionUndo() {
    const content = this.revisionManager.undo();
    if (content !== null) {
      this.input.value = content;
      this.renderOutput();
    }
  }
  
  revisionRedo() {
    const content = this.revisionManager.redo();
    if (content !== null) {
      this.input.value = content;
      this.renderOutput();
    }
  }
  ```

## Framework-Compatible Components

### React Component

```javascript
// SquibViewReact.jsx
import React, { useEffect, useRef, useState } from 'react';
import SquibView from './squibview';

const SquibViewReact = ({
  initialContent = '',
  inputContentType = 'md',
  showControls = true,
  initialView = 'split',
  onChange,
  onViewChange,
  className = '',
  ...props
}) => {
  const containerRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState(initialContent);
  
  useEffect(() => {
    if (containerRef.current && !editor) {
      // Initialize SquibView
      const instance = new SquibView(containerRef.current, {
        initialContent,
        inputContentType,
        showControls,
        initialView,
        ...props
      });
      
      // Override methods to communicate with React
      const originalSetContent = instance.setContent.bind(instance);
      instance.setContent = (newContent, type, saveRevision) => {
        originalSetContent(newContent, type, saveRevision);
        setContent(newContent);
        if (onChange) onChange(newContent, type);
      };
      
      const originalSetView = instance.setView.bind(instance);
      instance.setView = (view) => {
        originalSetView(view);
        if (onViewChange) onViewChange(view);
      };
      
      setEditor(instance);
    }
    
    // Cleanup on unmount
    return () => {
      // Add cleanup if necessary
    };
  }, [containerRef]);
  
  // Handle content updates from parent
  useEffect(() => {
    if (editor && initialContent !== content) {
      editor.setContent(initialContent, inputContentType, false);
      setContent(initialContent);
    }
  }, [initialContent, inputContentType]);
  
  return (
    <div 
      ref={containerRef} 
      className={`squibview-react-container ${className}`} 
    />
  );
};

export default SquibViewReact;
```

### Vue Component

```javascript
// SquibViewVue.vue
<template>
  <div ref="container" :class="['squibview-vue-container', className]"></div>
</template>

<script>
import SquibView from './squibview';

export default {
  name: 'SquibViewVue',
  props: {
    initialContent: {
      type: String,
      default: ''
    },
    inputContentType: {
      type: String,
      default: 'md'
    },
    showControls: {
      type: Boolean,
      default: true
    },
    initialView: {
      type: String,
      default: 'split'
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.initializeEditor();
  },
  methods: {
    initializeEditor() {
      this.editor = new SquibView(this.$refs.container, {
        initialContent: this.initialContent,
        inputContentType: this.inputContentType,
        showControls: this.showControls,
        initialView: this.initialView
      });
      
      // Override methods to emit events
      const originalSetContent = this.editor.setContent.bind(this.editor);
      this.editor.setContent = (content, type, saveRevision) => {
        originalSetContent(content, type, saveRevision);
        this.$emit('content-change', content, type);
      };
      
      const originalSetView = this.editor.setView.bind(this.editor);
      this.editor.setView = (view) => {
        originalSetView(view);
        this.$emit('view-change', view);
      };
    }
  },
  watch: {
    initialContent(newContent) {
      if (this.editor && newContent !== this.editor.getContent()) {
        this.editor.setContent(newContent, this.inputContentType, false);
      }
    },
    inputContentType(newType) {
      if (this.editor) {
        this.editor.setContent(this.editor.getContent(), newType, false);
      }
    }
  },
  beforeUnmount() {
    // Cleanup if necessary
  }
};
</script>
```

## Modular Button System

**Current State:**
- Buttons for Markdown-specific operations are hardcoded in the HTML template
- No way to add custom buttons for other content types

**Recommendation:**
- Create a modular button system that renders buttons based on active content type:

```javascript
createStructure() {
  // Create basic structure...
  
  // Instead of hardcoded buttons, create a button container
  this.container.innerHTML = `
    <div class="${this.options.baseClass}-title" ${!this.options.titleShow ? 'style="display:none"' : ''}>
      ${this.options.titleContent}
    </div>
    <div class="${this.options.baseClass}-controls" ${!this.options.showControls ? 'style="display:none"' : ''}>
      <button data-view='src'>Source</button>
      <button data-view="html">Rendered</button>
      <button data-view="split">Split</button>
      <button class="copy-src-button">Copy Source</button>
      <button class="copy-html-button">Copy Rendered</button>
      <div class="${this.options.baseClass}-type-buttons"></div>
      <div class="${this.options.baseClass}-universal-buttons">
        <button class="revision-undo">&#x21A9</button>
        <button class="revision-redo">&#x21AA</button>
      </div>
    </div>
    <div class="${this.options.baseClass}-editor">
      <textarea class="${this.options.baseClass}-input"></textarea>
      <div class="${this.options.baseClass}-output"></div>
    </div>
  `;
  
  // Other setup code...
  this.typeButtonsContainer = this.container.querySelector(`.${this.options.baseClass}-type-buttons`);
  this.universalButtonsContainer = this.container.querySelector(`.${this.options.baseClass}-universal-buttons`);
}

updateTypeButtons() {
  // Clear current buttons
  this.typeButtonsContainer.innerHTML = '';
  
  // Get buttons for current content type
  const renderer = this.renderers[this.inputContentType];
  if (renderer && renderer.buttons) {
    renderer.buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.textContent = button.label;
      btn.addEventListener('click', () => {
        if (renderer.operations[button.action]) {
          const newContent = renderer.operations[button.action](this.getContent());
          this.setContent(newContent, this.inputContentType);
        }
      });
      this.typeButtonsContainer.appendChild(btn);
    });
  }
}

setContent(content = this.input.value, contentType = this.inputContentType, saveRevision = true) {
  if (contentType !== this.inputContentType) {
    this.inputContentType = contentType;
    this.updateTypeButtons();
  }
  
  // Rest of setContent implementation...
}
```

## Additional Library Recommendations

1. **Diff/Patch for Revision History:**
   - [diff-match-patch](https://github.com/google/diff-match-patch)
   - [jsdiff](https://github.com/kpdecker/jsdiff)

2. **HTML-to-Markdown for Bidirectional Editing:**
   - [Turndown](https://github.com/mixmark-io/turndown)
   - [showdown](https://github.com/showdownjs/showdown) (can be modified for HTML-to-MD)

3. **Table-to-CSV Conversion:**
   - [Papa Parse](https://www.papaparse.com/) (already used, but can be extended for table-to-CSV)

4. **Plugin System Architecture:**
   - Consider [tiny-emitter](https://github.com/scottcorgan/tiny-emitter) for event-based communication
   - Or implement a simple pub/sub pattern for internal events

## Development Environment Improvements

### Module Resolution with Import Maps

**Current Issue:**
- Using Python's SimpleHTTPServer or http.server for development results in module resolution errors
- Error: `Uncaught TypeError: Failed to resolve module specifier "tiny-emitter". Relative references must start with either "/", "./", or "../".`

**Solution:**
- Add import maps to development HTML files:
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
- Import maps provide a way to map "bare" import specifiers to specific URLs
- Modern browsers support import maps natively
- This approach avoids the need for bundling during development

### Modern Development Server

**Recommendation:**
- Add Vite-based development server for hot module replacement
- Include npm scripts for different development approaches:
  ```json
  "scripts": {
    "dev": "vite",
    "dev:hmr": "node dev/live-dev-server.js"
  }
  ```
- Create a comprehensive development UI that supports testing various SquibView features

## Overall Architecture Recommendation

1. **Core Module:** Base SquibView functionality
   - Rendering container
   - View management
   - Universal undo/redo
   - Copy functions

2. **Plugin Registry:** Manage renderer plugins
   - Register/unregister content types
   - Load plugins dynamically

3. **Individual Renderer Plugins:**
   - Markdown renderer
   - HTML renderer
   - CSV renderer
   - RevealJS renderer
   - Custom renderers

4. **Framework Wrappers:**
   - React component
   - Vue component
   - Angular component (if needed)

This architecture would make SquibView more maintainable, extensible, and resource-efficient while preserving its current functionality.