# SquibView Completed Tasks

## Recent Completions

### Documentation System Overhaul
- ✅ **Fixed CLI dependency issues** - Resolved squibv offline bundling path problems
- ✅ **Implemented documentation restructure** - Created comprehensive docs/ structure  
- ✅ **Created configurable HTML output system** - JSON config + CLI parameter overrides
- ✅ **Removed heading borders** - Set borders.h1.enabled: false in default config
- ✅ **Added .md to .html link conversion** - Systematic documentation generation support
- ✅ **Created rebuild-docs script** - Replaced docbat with squibv for all docs
- ✅ **Integrated rebuild-docs into build process** - Updated npm scripts and removed docbat
- ✅ **Fixed overly wide margins** - Updated default maxWidth from 1400px to 900px
- ✅ **Added links to docs from homepage** - Comprehensive navigation section in README.md

### Release Process Automation
- ✅ **Created automated release notes script** - tools/update-release-notes.sh with git commit parsing and conventional commit support
- ✅ **Integrated release notes into release process** - make-release.sh now automatically updates release_notes.md before creating releases

### Visual Content & Marketing
- ✅ **Created animated GIF demo** - Automated Puppeteer-based GIF creation (tools/create-animated-gif.js) showing live editing, Mermaid diagrams, math equations, and GeoJSON maps. Generates squibview-demo.gif (362KB, 9 seconds, 1280x720)

## Historical Completions

### Core Features
- ✅ Add support for undo/redo in source editor with revision history
- ✅ Live sync from source to rendered view
- ✅ **Implement bidirectional editing** - Full rendered ↔ source updates implemented with HtmlToMarkdown conversion
- ✅ Add test suite (started)
- ✅ Add markdown-specific buttons (headings up/down, remove HR)

### Framework Integration (v0.0.31-0.0.32)
- ✅ **Create React component wrapper** - React-specific SquibView component (SquibViewReact.js)
- ✅ **Create Vue component wrapper** - Vue-specific SquibView component (SquibViewVue.js)
- ✅ **React build system** - Standalone React builds with proper module resolution

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
- ✅ Add example pages with CDN-based imports (both UMD and ESM)
- ✅ Add example pages for REACT (ESM)

### Build System & CLI
- ✅ Fix math rendering
- ✅ Fix geojson / map support
- ✅ Fix svg roundtrip functionality
- ✅ Comprehensive CLI testing and validation
- ✅ HTML generation with proper image handling
- ✅ Configurable CSS system with JSON configuration
- ✅ Parameter override system for CLI