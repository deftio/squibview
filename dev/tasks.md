# SquibView Active Tasks

When a task is completed it is marked as completed and moved to complete-tasks.md along with which version of squibview it was addressed in.  This is a loose roadmappping doc.

## High Priority Tasks

### Critical CLI Issues
- ⬜ **Fix squibv CLI runtime errors** - Resolve TypeError on external machines and npx scoping issues (GitHub Issue #4)

### Content & User Experience
- ⬜ **Improve README.md content** - Implement the "above the fold" strategy from docs-review.md to better sell SquibView (GitHub Issue #2)
- ⬜ **Add PDF export to SquibView core** - Built-in PDF generation with optional button in UI (even in headless mode)
- ⬜ **Add DOCX export to squibv CLI** - Command-line DOCX output support
- ⬜ **Add HTML Page export to SquibView core** - Complete HTML page export with HEAD elements, separate from copy/getHTML functions (GitHub Issue #1)

### Core Architecture
- ⬜ **Create plugin system for rendering engines** - Modular render callback system
- ⬜ **Explore rich content editor replacement** - Research whether to replace current HTML div (pure HTML management) with an open-source rich content editor (e.g., ProseMirror, TipTap, Quill). Evaluate benefits: better content editing, improved accessibility, standardized behaviors vs. costs: bundle size, complexity, loss of current bidirectional sync capabilities. Must remain open-source.
- ⬜ **Implement memory-efficient diff-based revision system** - Optimize current revision history
- ⬜ **Make the button system modular** - Based on content type and available features
- ⬜ **Change "md" terminology to "src"** - Throughout the codebase for consistency
- ⬜ **Consider renaming squibview package** - Evaluate renaming to "squipp" or "squibv" for consistency with CLI naming (GitHub Issue #3)

## Medium Priority Tasks

### Enhanced Export Features
- ⬜ **PDF export in squibv CLI** - Command-line PDF generation support
- ⬜ **Batch export options** - Multiple format exports in single command
- ⬜ **Custom export templates** - User-defined PDF/DOCX templates

### Enhanced Features
- ⬜ **Enable syntax highlighting in source editor** - Real-time code highlighting
- ⬜ **Explore line numbers support for source editor** - Add optional line numbers to improve debugging and navigation, especially for longer documents. Consider impact on layout, performance, and whether to make it toggleable.
- ⬜ **Add support for React as render type** - React component rendering in iframe
- ⬜ **Add ACE editor integration** - Advanced editing capabilities. PROS: Syntax highlighting, code folding, multiple cursors, vim/emacs modes, extensive language support, mature ecosystem. CONS: Large bundle size (~500KB), complexity integration with bidirectional editing, potential conflicts with current textarea-based approach, learning curve for users. Need to evaluate if benefits justify the overhead.
- ⬜ **Add print stylesheet optimization** - Better PDF generation from HTML

### Framework Integration
- ⬜ **Add component props for all configuration options** - Complete framework integration for React and Vue builds

## Low Priority / Future Tasks

### Performance & Optimization
- ⬜ **Optimize bundle sizes** - Tree shaking and code splitting
- ⬜ **Add lazy loading for heavy dependencies** - MathJax, Mermaid, etc.
- ⬜ **Implement virtualization for large documents** - Performance for huge files
- ⬜ **Resolve squibv CLI npx scoping issue** - Currently npx squibv may not work properly because npm/npx scoping expects @squibview/squibv or similar. Need to decide: 1) Publish separate squibv package, 2) Use @squibview/cli scoped package, 3) Document npx squibview and use bin alias, or 4) Other solution for global CLI access

### Advanced Features
- ⬜ **Add collaborative editing support** - Real-time multi-user editing
- ⬜ **Add document versioning** - Git-like document history
- ⬜ **Add custom themes system** - Beyond basic CSS configuration
- ⬜ **Add accessibility improvements** - WCAG compliance features

## Task Management Rules

### Adding New Tasks
- Use clear, actionable titles
- Include priority level (High/Medium/Low)
- Add context and acceptance criteria
- Link to related issues or documentation

### Completing Tasks  
- When a task is completed, move it to `tasks_completed.md`
- Mark with ✅ and completion date
- Add brief description of what was accomplished
- Remove from this file to keep it focused on active work

### Priority Guidelines
- **High**: Critical for current release, blocks other work, user-facing issues
- **Medium**: Important for next release, enhances existing features
- **Low**: Nice to have, future considerations, experimental features

## Plugin System Design (Draft)

```javascript
plugin: {
    input_type: "md",           // Called with setView("md")
    input_label: "Markdown",    // Appears on "view source", "copy source" buttons
    input_language_syntax: "markdown", // Source editor highlighting if enabled
    output_type: "html",
    output_label: "HTML",
    
    // Plugin functions
    render_cb: (input_buf) => {
        // Return: {"output": str, "err": "none", "err_msg": "str"}
        // If none, use default md renderer
    },
    copy_cb: (output_buf) => {
        // Return: {"output": str, "err": "none"}
        // If none, use default copy
    },
    export_cb: (output_buf, format) => {
        // Return: {"output": buffer, "mime": "application/pdf", "err": "none"}
        // For PDF, DOCX, etc. exports
    },
    help_str: "Plugin description and usage"
}
```

## Export Features Specification

### PDF Export Requirements
- **In SquibView Core**: Add PDF generation capability to the main library
- **UI Integration**: Optional PDF export button (configurable)
- **Headless Support**: Works without visible UI
- **Quality**: High-fidelity rendering of all content types
- **Dependencies**: Minimal additional bundle size impact

### DOCX Export Requirements  
- **CLI Only**: Initially just in squibv command-line tool
- **Format Support**: Tables, images, code blocks, headings
- **Styling**: Preserve basic formatting and structure
- **Compatibility**: Works with Microsoft Word and LibreOffice

### Implementation Approach
1. **Research libraries**: Puppeteer for PDF, docx.js for DOCX
2. **Create export plugins**: Modular system for different formats
3. **Add CLI options**: `--output-format pdf|docx|html`
4. **UI integration**: Optional export buttons in main component
5. **Testing**: Comprehensive export quality validation