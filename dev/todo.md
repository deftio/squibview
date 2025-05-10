# SquibView TODO List

## Completed Tasks

### Core Features
- ✅ Add support for undo/redo in source editor with revision history
- ✅ Live sync from source to rendered view
- ✅ Add test suite (started)
- ✅ Add markdown-specific buttons (headings up/down, remove HR)

### Selection API
- ✅ Add callback function for text selection in both source and rendered panels
- ✅ Implement text replacement API for selected text
- ✅ Add ability to mark text as non-editable (locked)
- ✅ Add visual indicators for locked content
- ✅ Add getter/setter for text selection handlers

### Development Environment
- ✅ Add import maps to development HTML files for module resolution
- ✅ Create modern development environment with Vite-based server
- ✅ Add HMR support for faster development
- ✅ Create comprehensive development documentation
- ✅ Add example pages with CDN-based imports

## Pending Tasks

### Core Architecture
- ⬜ Create plugin system for rendering engines
- ⬜ Implement bidirectional editing (rendered → source updates)
- ⬜ Implement memory-efficient diff-based revision system
- ⬜ Make the button system modular based on content type
- ⬜ Change "md" terminology to "src" throughout the codebase

### Enhanced Features
- ⬜ Enable syntax highlighting in source editor
- ⬜ Add support for React as render type (iframe)
- ⬜ Create CLI version for transformations (MD → HTML, slides → HTML)
- ⬜ Add ACE editor integration for advanced editing

### Framework Integration
- ⬜ Create React component wrapper
- ⬜ Create Vue component wrapper
- ⬜ Add component props for all configuration options

## Plugin System Design (Draft)

```javascript
plugin: 
{ 
    input_type : "md", // this is the what is called with setView("md")
    input_label : "markdown", // this is what appears on view source, copy source the button 
    input_langauge_syntax : "markdown", // how the source editor should highlight if enabled
    output_type : "html",
    output_label : "html",
    // ... add in plugin functions
    render_cb : (input_buf) => { .. return {"output" : str, "err" : "none", "err_msg" : "str" }} // if none than default md
    copy_cb : (buputbuf) => { .. return {"output" : str, "err": "none"}}  .. if none then default copy
    help_str :  { ..}
}
```

## Render Plugins Table

| Input | Input Label | Output | Output Label | Render Callback | Copy Callback |
|-------|-------------|--------|--------------|-----------------|---------------|
| md    | "Markdown"  | html   | "HTML"       | md → html       | Default       |
| html  | "HTML"      | iframe | "Rendered"   | html → iframe   | Default       |
| slides| "Slides"    | iframe | "Slides"     | slides → iframe | Default       |
| react | "React"     | html   | "HTML"       | react → html    | Default       |
| csv   | "CSV"       | html   | "HTML"       | csv → html      | Default       |

## References

### ACE Editor Integration
```html
<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.37.5/src-noconflict/snippets/python.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/ace-builds@1.37.5/css/ace.min.css" rel="stylesheet">
```

Documentation: https://ace.c9.io/#nav=embedding