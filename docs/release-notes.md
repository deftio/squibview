# SquibView Release Notes

Complete changelog and release history for SquibView.

---

## v1.0.20 

### 🐛 Bug Fixes
- **Fixed list bullet positioning** - List bullets (ul/ol) now properly display within the content area instead of appearing in the left margin/gutter. Added explicit CSS rules for list padding and margins in `.squibview-output`.
- **Fixed CSS bundling issue** - Removed external CSS imports (highlight.js, leaflet) from standalone build. These styles are now loaded dynamically via the autoload feature, reducing dist/squibview.css from 1400 to 645 lines.
- **Fixed release tools** - Updated `make-release.sh` and `update-release-notes.sh` to use `docs/release-notes.md` instead of root directory

### ✨ Improvements
- **Cleaner CSS distribution** - Core squibview.css now contains only SquibView styles. External library styles load on-demand.
- **Better theme flexibility** - Users can now provide custom highlight.js themes without conflicts

### 🧪 Testing
- Added unit test for list rendering structure validation

---
## v1.0.20 (September 22, 2025)
*Release Date: September 22, 2025*

### ✨ Improvements
- **Added release notes update
- **Update rel notes
- **1.0.20 fixed bulletted list and css including extra overhead issues
- **Fixed bulleted list css
- **Updated release-notes

---


## v1.0.19 (September 19, 2025)

### 🎯 Headless Mode & Documentation Improvements

#### Features
- **Enhanced Headless Mode Example** - Complete working example demonstrating all API methods with custom UI controls (`examples/example_headless.html`)
- **Comprehensive API Documentation** - Corrected and updated all API method documentation to reflect actual implementation

#### Bug Fixes
- Fixed headless mode Options toggles (Controls, Title, Lines) to actually recreate editor instance with new settings
- Fixed Copy functionality to use correct `copySource()` and `copyHTML()` methods
- Fixed event system documentation to use `editor.events.on()` instead of `editor.on()`
- Fixed revision methods documentation (`revisionUndo()`, `revisionRedo()`, `revisionNumRevsions()`)
- Added JSDoc comments to all functions and key attributes in headless example

#### Documentation Updates
- **API Methods Reference** - Corrected method names and signatures in `docs/api/methods.md`
- **Events Reference** - Updated event names to use colons (e.g., `content:change`, `view:change`) in `docs/api/events.md`
- **Headless Mode Guide** - Updated all code examples with correct API usage in `docs/guides/headless-mode.md`
- Added standard favicon to headless example

#### API Corrections
- `undo()`/`redo()` → `revisionUndo()`/`revisionRedo()`
- `getRevisionCount()` → `revisionNumRevsions()`
- `getRenderedHTML()` → `getHTMLSource()`
- `copyToClipboard(format)` → `copySource()` or `copyHTML()`
- Event access via `editor.events.on()` not `editor.on()`
- Event names use colons: `content:change`, `text:selected`, `revision:undo`

---


## v1.0.18 (September 17, 2025)

### Major Features

**Integrated Autoload Functionality** - Autoload is now built into all SquibView builds
- No separate autoload builds needed - use `autoload_deps` option with any build
- Configure with `autoload_deps: { all: true }` for automatic loading
- Fine-grained control per library available
- Libraries load automatically from CDN when content requires them
- Zero configuration required for standard use cases

**Autoloaded Libraries**
- Mermaid (377KB) - Loaded when mermaid fence blocks are detected
- Highlight.js (45KB) - Loaded when code blocks are present
- MathJax (1.3MB) - Loaded when math expressions or math fence blocks are found
- Leaflet (142KB) - Loaded when GeoJSON/TopoJSON content is rendered
- Three.js (1.1MB) - Loaded when STL 3D models are displayed

### Improvements

**Math Rendering**
- Reduced math formula size when copying to clipboard (scale factor 0.025)
- Math formulas now paste at appropriate inline size in external applications
- Fixed math rendering detection for both inline and display math
- Support for fenced math blocks using ` ```math ` syntax

**Developer Experience**
- Consolidated example CSS files into single `examples.css` for easier maintenance
- Optimized example layouts to fit content above the fold (80vh total height)
- Added favicon to all example HTML files
- Improved responsive design with proper horizontal margins
- Updated all examples to use consistent styling

### Bug Fixes
- Fixed copy-rendered functionality in editors with contenteditable wrapper
- Fixed MathJax rendering with proper selector detection
- Fixed library reference errors by checking existence before use
- Fixed build size table detection in README updates
- Fixed STL loader dependency on global THREE object
- Resolved mermaid initialization errors in rollup builds

### Documentation
- Reorganized examples with autoload as the recommended starting point
- Added clear descriptions for all build configurations
- Updated build size tables with accurate measurements
- Improved responsive design for mobile devices
- Simplified build options to 3 main configurations

---

## v1.0.17 (July 22, 2025)

### Features
- Added line number support to source view
- Added examples for using themes with line numbers
- Dark theme styling improvements
- Improved CLI build system

### Improvements
- Resolved line number bugs and improved example
- Updated line numbers example with proper dependencies and formatting
- Removed container borders for cleaner appearance
- Updated bin path format to match npm requirements

### Documentation
- Added comprehensive documentation for line numbers feature
- Added theme usage examples

---

## v1.0.16 (July 16, 2025)

### Improvements
- Performance optimizations for large documents
- Better memory management for revision history
- Improved scrolling synchronization between panes
- Enhanced bidirectional editing reliability

### Documentation
- Updated API documentation with performance tips
- Added large document handling guide

---

## v1.0.15 (June 2025)

### Build System Changes

**Default Builds Now Include Dependencies**
- ESM/UMD builds now bundle markdown-it, diff-match-patch, and tiny-emitter (~240KB)
- Eliminates import map configuration requirements for new users
- Existing applications continue to work without changes

**New Lean Builds**
- Added `-lean` variants for users who manage their own dependencies
- Lean builds exclude bundled libraries for smaller size (126KB minified)

**Standalone Builds**
- Fixed ESM standalone build generation
- Resolved Leaflet icon side effects in standalone builds
- Fixed GeoJSON rendering without prototype pollution
- Standalone builds no longer modify global Leaflet prototype

### Build Sizes
| Build | Size | Description |
|-------|------|-------------|
| squibview.esm.min.js | 245KB | Standard ESM with bundled dependencies |
| squibview.esm-lean.min.js | 126KB | Minimal ESM without dependencies |
| squibview.umd.min.js | 246KB | Standard UMD with bundled dependencies |
| squibview.umd-lean.min.js | 128KB | Minimal UMD without dependencies |
| squibview.standalone.*.min.js | 3.6-3.8MB | All features bundled |

### Documentation
- Updated all docs to reflect bundled dependencies in default builds
- Cleaned up examples to use best practices
- Removed duplicate Leaflet icon configuration from examples

---

## v1.0.13 - v1.0.14 (May 2025)

### Diff View Support
- **NEW**: `getSourceDiff()` method to get diff data between any two revisions
- **NEW**: `getSourceDiffHTML()` method for side-by-side diff visualization
- **NEW**: `getSourceDiffInline()` method for inline diff with blue additions/red deletions
- **NEW**: CSS styling for diff views with proper colors and formatting
- **NEW**: Support for comparing any revision against any other (including initial state)
- **NEW**: Working example demos: `diff_view_inline.html` and `diff_view_live.html`

### RevisionHistory Enhancements
- **NEW**: `getContentAtRevision()` method to retrieve content at any revision
- **NEW**: `computeDiff()` method for character-level diffs
- **NEW**: `computeLineDiff()` method for line-by-line comparisons
- **NEW**: `getDiffStats()` method to get additions/deletions/changes count
- **NEW**: `getRevisionInfo()` method for revision metadata

### Examples & Documentation
- **NEW**: Inline diff demo showing manual revision comparison
- **NEW**: Live diff demo showing real-time cumulative changes
- **IMPROVED**: ESM module loading in diff examples
- **FIXED**: Revision dropdown population and event handling
- **FIXED**: Baseline revision persistence in live diff mode

---

## v1.0.11 - v1.0.12 (July 2025)

### Documentation & Build Improvements
- Enhanced documentation structure
- Fixed badge copy errors for README.md generation
- Improved regex patterns in build scripts
- Fixed release script issues
- Updated demo GIF maker tool
- Fixed CORS errors on markdown badges rendering
- Incremental build improvements

---

## v1.0.10 (June 24, 2025)

### Geographic & 3D Content Support
- **NEW**: GeoJSON rendering with interactive Leaflet maps
- **NEW**: TopoJSON support for geographic visualizations
- **NEW**: ASCII STL support for 3D model rendering
- **IMPROVED**: Enhanced content type detection and rendering

---

## v1.0.7 (June 19, 2025)

### Math & Content Copy Improvements
- **FIXED**: Math equation copy-paste functionality with proper sizing
- **FIXED**: Image copy-paste sizing issues in rendered content
- **IMPROVED**: Content copying reliability across different content types
- **IMPROVED**: SVG content width handling during copy operations

---

## v1.0.5 (June 17, 2025)

### CLI Introduction & Syntax Highlighting Fixes
- **NEW**: SquibV CLI tool for command-line Markdown to HTML conversion
- **NEW**: Standalone build support for CLI distribution
- **FIXED**: Syntax highlighting bugs in code blocks
- **IMPROVED**: Release tooling and version management
- **IMPROVED**: Integration testing for CLI functionality

### CLI Features
- Convert Markdown files to HTML from command line
- Support for offline bundling with `--bundle-offline` option
- Watch mode for automatic rebuilding
- Comprehensive help and documentation

---

## v1.0.4 (June 16, 2025)

### Build System & Release Management
- **IMPROVED**: Release management tools for both library and CLI versions
- **IMPROVED**: Build tools and automation scripts
- **UPDATED**: Documentation for CLI usage and installation

---

## v1.0.3 (June 16, 2025)

### Math Rendering Improvements
- **FIXED**: Math rendering issues in various contexts
- **IMPROVED**: MathJax integration and reliability
- **UPDATED**: Documentation and examples for math support

---

## v1.0.1 (June 3, 2025)

### Bidirectional Editing Fixes & Runtime Identification
- **FIXED**: Runtime version identification issues
- **FIXED**: Bidirectional rendering problems with SVG content
- **FIXED**: SVG roundtrip editing in rendered → source updates
- **IMPROVED**: Bidirectional editing reliability and accuracy
- **UPDATED**: Release instructions and documentation

---

## v1.0.0 (June 3, 2025)

### Major Release - Production Ready
- **MILESTONE**: First stable 1.0 release
- **STABLE**: All core features tested and production-ready
- **COMPLETE**: Bidirectional editing (source ↔ rendered) fully functional
- **COMPLETE**: Comprehensive content type support

---

## v0.0.36 (May 20, 2025)

### Data Format Support & CI Improvements
- **NEW**: CSV, TSV, and PSV inline block support with table rendering
- **NEW**: Smart line feed handling for better text flow
- **IMPROVED**: GitHub Actions CI workflow optimization
- **IMPROVED**: Build performance and testing speed
- **UPDATED**: Examples and documentation content

---

## v0.0.35 (May 14, 2025)

### Image Handling & React Integration
- **IMPROVED**: Image handling to preserve URLs in source view by default
- **FIXED**: React example import issues
- **UPDATED**: Example content and documentation
- **ENHANCED**: Image workflow for better user experience

---

## v0.0.33 (May 14, 2025)

### Build System Enhancements
- **NEW**: Standalone ESM build for modern module systems
- **IMPROVED**: React build configuration and compatibility
- **FIXED**: All build targets (ESM, UMD, Standalone) working correctly
- **ENHANCED**: Build reliability across different environments

---

## v0.0.32 (May 11, 2025)

### React Support & Build Fixes
- **NEW**: Full React build support with standalone ESM
- **FIXED**: React build configuration issues
- **IMPROVED**: Build system reliability
- **ADDED**: React-specific examples and documentation

---

## v0.0.30 (March 28, 2025)

### Text Selection API
- Text selection API with events for detecting when text is selected in either panel
- `onTextSelected()` method to register callbacks for text selection events
- `getCurrentSelection()` method to get current text selection data
- `replaceSelectedText()` method for replacing selected text
- `setSelectionEditable()` method to make selected text non-editable
- `toggleSelectionLock()` method to smartly toggle between locked/unlocked states
- Visual indicators for locked content (lock icon, styling)
- `clearSelection()` method to clear current selection
- `onReplaceSelectedText` getter/setter for handling selections and automatic replacement
- Comprehensive documentation in `/docs` directory
- New examples for text selection features
- Selection data caching for improved performance
- Updated version in package.json and static version property
- Improved event handling for text selections

---

## v0.0.29a (March 22, 2025)

### Undo/Redo System
- Support for undo/redo in both source and rendered panels
- RevisionManager with memory-efficient diff storage
- Bidirectional editing enhancements
- Various bug fixes related to content type handling

---

## v0.0.29 (March 15, 2025)

### Core Features
- Bidirectional editing support
- Enhanced content type handling
- Support for CSV, TSV, and other separator formats

---

## v0.0.28 (March 1, 2025)

### Plugin System
- Plugin system for extending functionality
- Support for RevealJS presentations
- Custom renderer registration
- Enhanced clipboard operations

---

## v0.0.27 (February 15, 2025)

### Initial Release
- Initial release with core features
- Markdown and HTML rendering
- Split view editing
- Basic clipboard support

---

## Release Process

### Current Process
✅ **Automated tooling**: `tools/make-release.sh` script handles git tagging and GitHub releases
✅ **Version synchronization**: Automatic sync between package.json and src/version.js
✅ **Pre-flight checks**: Validates git status, authentication, and branch
✅ **Manual npm publish**: Prevents accidental publishes with dry-run preview

### Release Checklist
1. Update package.json version
2. Run `npm run prerelease` (runs tests and builds)
3. Add release notes entry to this file
4. Run `./tools/make-release.sh "release notes"`
5. Test npm package locally
6. Publish to npm with `npm publish`
7. Update documentation if needed

### Version History Summary
- **v1.0.19**: Added streaming mode for LLMs to stream docs in w/o partial fence rendering errors
- **v1.0.18**: Integrated autoload, improved math rendering, consolidated examples
- **v1.0.17**: Line numbers support, theme improvements
- **v1.0.16**: Performance optimizations for large documents
- **v1.0.15**: Bundled dependencies in default builds, lean build options
- **v1.0.13-14**: Comprehensive diff view support
- **v1.0.10**: GeoJSON and 3D model support
- **v1.0.5**: CLI tool introduction
- **v1.0.0**: First stable release
- **v0.0.27-30**: Foundation releases with core features