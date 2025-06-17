# SquibView

[![NPM Version](https://img.shields.io/npm/v/squibview.svg)](https://www.npmjs.com/package/squibview)
[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/deftio/squibview/ci.yml?branch=main&style=flat&logo=github&label=Build&color=blue)](https://github.com/deftio/squibview/actions/workflows/ci.yml)

[Live Demo (github)](https://deftio.github.io/squibview/examples/example_ESM.html)

[Live Demo (local)](./examples/example_ESM.html)


SquibView is a headless JavaScript embeddable editor/viewer that renders GitHub-Flavored Markdown (or full HTML pages) on the fly.

For Markdown inputs, it supports rendering Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics. This provides a powerful and interactive way to view and export Markdown content as HTML.

For HTML inputs, it embeds the content within an iframe for viewing.

SquibView supports full cut-and-paste functionality and allows edits made in the rendered view to be reflected back in the source.

<img src="./squibview-example.png" alt="SquibView Example" width="100%">

## Documentation

- [Programmer's Guide](./docs/programmers-guide.md) - Comprehensive documentation for developers
- [CLI Documentation](./docs/squibv.md) - Complete command-line interface guide
- [Examples](./examples) - Example implementations and usage patterns

# Features

- **Live Preview**: See the rendered HTML output in real-time as you edit your Markdown.
- **Multiple Views**: Switch between Markdown editor, HTML preview, or split view using simple buttons.
- **Graphical Support**: Render Mermaid diagrams, inline SVG graphics, and other visual formats directly from Markdown.
- **CSV/TSV/PSV**: Render CSV/TSV/PSV tables directly 
- **Math**: Render Math equations from latex and MathJax directly
- **Syntax Highlighting**: Code blocks are automatically highlighted using Highlight.js.
- **Table Styling**: Tables are rendered cleanly with improved readability.
- **Easy Export**: Export or copy the generated HTML for use in other projects or documentation.
- **Text Selection API**: Detect and manipulate selected text in both source and rendered panels.
- **Bidirectional Editing**: Make changes in either the source or rendered view and see them reflected in both panels.
- **Revision History**: Track changes with undo/redo functionality.
- **Plugin System**: Extend functionality with custom plugins and renderers.
- **Image Handling**: Control how images are displayed in source view and when copying content.
- **Standard Markdown Line Breaks**: SquibView follows standard Markdown behavior for line breaks.
    - A single newline in your source Markdown is treated as a soft break and will typically render as a space, not a new line, if it's within the same paragraph.
    - To force a hard line break (inserting a `<br>` tag), end a line with two or more spaces.
    - To start a new paragraph (wrapping content in `<p>` tags), leave a blank line between blocks of text.
    - Example:
      ```markdown
      # Title
      This is line one.··
      This is line two (after two spaces, so it's a hard break).

      This is a new paragraph.
      This line is part of the new paragraph.
      ```
      (In the example, `··` represents two spaces.)

## Web Viewer

SquibView can be used as a standalone tool for processing complex Markdown output (e.g., from LLMs like OpenAI, Claude, Mistral, or Deepseek) or as a simple live preview Markdown editor.

## As a Component

As an embeddable component, SquibView allows your application to render complex Markdown or other content on the fly. It can dynamically switch between a split-screen view (source and output) or an output-only view, serving effectively as a renderer.

## Command Line Interface

SquibView includes a powerful CLI tool for converting Markdown files to high-quality HTML documents with all the advanced features (math, diagrams, code highlighting, tables).

```bash
# Quick start with npx
npx squibv document.md

# Advanced usage
npx squibv document.md --bundle-offline -o report.html
```

**Key Features:**
- 🚀 **Rich Content**: Math equations, Mermaid diagrams, CSV tables, SVG graphics
- 📦 **Offline Ready**: Bundle all dependencies for air-gapped environments  
- 🎨 **Professional**: Clean default styling with custom CSS support
- ⚡ **Fast**: Quick conversion with watch mode for development

➡️ **[Complete CLI Documentation](./docs/squibv.md)**

## Installation and Usage

### Using Build Files

SquibView offers multiple build formats for different use cases:

#### ESM (ES Modules)

```html
<!-- Required dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>

<!-- SquibView CSS -->
<link rel="stylesheet" href="../dist/squibview.css">

<!-- ESM Import -->
<script type="module">
  import SquibView from '../dist/squibview.esm.min.js';
  
  const editor = new SquibView('#editorContainer', {
    titleShow: true,
    titleContent: "SquibView Editor"
  });
  
  // Set content
  editor.setContent('# Hello SquibView\n\nThis is a test.', 'md');
</script>
```

#### UMD (Universal Module Definition)

```html
<!-- Required dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>
<script src="https://unpkg.com/tiny-emitter@2.1.0/dist/tinyemitter.min.js"></script>
<script src="https://unpkg.com/diff-match-patch@1.0.5/index.js"></script>
<script src="https://unpkg.com/turndown@7.1.2/dist/turndown.js"></script>

<!-- SquibView CSS -->
<link rel="stylesheet" href="../dist/squibview.css">

<!-- UMD Import -->
<script src="../dist/squibview.umd.min.js"></script>
<script>
  const editor = new SquibView('#editorContainer', {
    titleShow: true,
    titleContent: "SquibView Editor"
  });
  
  // Set content
  editor.setContent('# Hello SquibView\n\nThis is a test.', 'md');
</script>
```

#### Standalone (All Dependencies Bundled)

```html
<!-- SquibView CSS -->
<link rel="stylesheet" href="../dist/squibview.css">

<!-- Standalone Import (includes all dependencies) -->
<script src="../dist/squibview.standalone.min.js"></script>
<script>
  const editor = new SquibView('#editorContainer', {
    titleShow: true,
    titleContent: "SquibView Editor"
  });
  
  // Set content
  editor.setContent('# Hello SquibView\n\nThis is a test.', 'md');
</script>
```

### Build Formats Comparison

| Format | File Size | Dependencies | Use Case |
|--------|-----------|--------------|----------|
| ESM | Smaller | Required externally | Modern applications with bundlers |
| UMD | Medium | Required externally | Traditional script tags, CommonJS |
| Standalone | Larger | Included | Quick prototypes, no external dependencies |

### Using via CDN

SquibView is available via CDN (unpkg) and as an npm package.

## Examples

See the [examples folder](./examples)

#
## Configuration Options

SquibView can be configured with various options when initializing:

```javascript
const editor = new SquibView('#editorContainer', {
  // Basic options
  initialContent: '',           // Initial content to load
  inputContentType: 'md',       // Type of content ('md', 'html', 'reveal', 'csv', 'tsv')
  showControls: true,          // Whether to show control buttons
  titleShow: false,            // Whether to show the title section
  titleContent: '',            // Content for the title section
  initialView: 'split',        // Initial view mode ('src', 'html', 'split')
  baseClass: 'squibview',      // Base CSS class for styling
  
  // Image handling
  preserveImageTags: true,     // Default: true. Whether to keep original image URLs in source view.
                               // When true: images remain as <img> tags with original URLs in the source view.
                               // When false: images are converted to data URLs in the source view.
                               // Note: For clipboard operations (copy), images are always converted to data URLs
                               // to ensure portability, regardless of this setting.
  
  // Text replacement
  onReplaceSelectedText: null  // Callback for text replacement on selection
});
```

**Detailed Example: Image Handling with `preserveImageTags`**

The `preserveImageTags` option provides fine-grained control over how image `src` attributes are handled within the source view and during copy-to-clipboard actions. By default (`true`), SquibView keeps external image links as they are in your source Markdown, which is often preferred for readability and maintainability of the source. When set to `false`, images are converted to inline data URLs directly in the source view upon rendering. Regardless of this setting, when content is copied to the clipboard, images are always converted to data URLs to ensure maximum portability and that the images are embedded within the copied content.

```javascript
// Create editor with default image handling (preserves original URLs in source view)
const editor1 = new SquibView('#editor1'); // preserveImageTags defaults to true

// Create editor that converts images to data URLs in source view
const editor2 = new SquibView('#editor2', {
  preserveImageTags: false
});

// Set content with images
const markdown = `
# Image Example

![Local Image](./images/example.png)
![Remote Image](https://example.com/image.jpg)
`;

editor1.setContent(markdown, 'md');
// In editor1's source view, images will keep their original URLs (e.g., './images/example.png').
// If content from editor1 is copied, the images in the clipboard HTML will use data URLs.

editor2.setContent(markdown, 'md');
// In editor2's source view, images will be converted to data URLs (e.g., 'data:image/png;base64,...').
// If content from editor2 is copied, the images will also use data URLs.
```

## Getting Started

**Clone the Repository:**
```bash
git clone https://github.com/deftio/squibview.git
cd squibview
```

**Running the Examples:**
The `examples/` directory contains various HTML files demonstrating different SquibView features and build types.
To run them:
1. Navigate to the `examples/` directory.
2. Open any of the `*.html` files (e.g., `example_ESM.html`) in your web browser.

You can typically do this by double-clicking the file or using "Open with" from your file explorer.
Once an example is open:
- You can switch view modes (source, rendered, split) using the control buttons.
- For Markdown examples, enter your GitHub-Flavored Markdown into the editor on the left (in split or source view).
- The right side (in split or rendered view) will update live, showcasing diagrams, code highlighting, and other features.

## Testing

SquibView uses Jest for unit/integration tests and Puppeteer for End-to-End (E2E) tests.

*   **Unit/Integration Tests:**
    *   These tests check individual modules and their interactions. They provide code coverage reports.
    *   Run with: `npm run test`
    *   Coverage reports are generated in the `coverage/` directory. Open `coverage/lcov-report/index.html` to view detailed coverage.

*   **End-to-End (E2E) Tests:**
    *   These tests run against a live instance of the application, simulating user interaction in a browser (using Puppeteer).
    *   They verify that the built application works as expected.
    *   Run with: `npm run test:e2e`
    *   **Note:** This script starts its own `http-server` on port 8000. Ensure this port is free before running.

*   **Run All Tests (Recommended before releases):**
    *   To ensure all checks pass, run both test suites sequentially.
    *   Command: `npm run test:all` 

## Contributing

Contributions are welcome! Whether you're adding new features, fixing bugs, or improving documentation, please follow these guidelines:

Fork the Repository: Click the "Fork" button on GitHub to create your own copy.

**Create a Branch:**
```bash
git checkout -b feature/your-feature-name
```

**Commit Your Changes:** Make your changes and commit them with a clear message.

```bash
git commit -m "Add description of changes"
```

**Push to Your Fork:**

```bash
git push origin feature/your-feature-name
```

**Open a Pull Request:** Go to the original repository on GitHub and open a pull request from your fork's branch. Provide a clear description of your changes and why they're useful.

Please make sure your contributions follow the project's coding style and that tests pass, if applicable.

## License

This project is licensed under the BSD-2 License. See the LICENSE file for details.

