# SquibView Release Notes

## v1.0.18 (September 17, 2024)

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

## v1.0.17 (July 22, 2024)

### Features
- Added copy to clipboard functionality for markdown and HTML content
- Improved clipboard API integration with fallback for older browsers

### Documentation
- Added comprehensive documentation for copy operations
- Updated examples to demonstrate clipboard functionality

## v1.0.16 (July 2024)

### Improvements
- Performance optimizations for large documents
- Better memory management for revision history
- Improved scrolling synchronization between panes

## v1.0.15 (June 2024)

### Build System Changes

**Default Builds Now Include Dependencies**
- ESM/UMD builds now bundle markdown-it, diff-match-patch, and tiny-emitter
- Eliminates import map configuration requirements for new users
- Existing applications continue to work without changes

**New Lean Builds**
- Added `-lean` variants for users who manage their own dependencies
- Lean builds exclude bundled libraries for smaller size (126KB minified)

**Standalone Builds**
- Fixed ESM standalone build generation
- Resolved Leaflet icon side effects in standalone builds
- Fixed GeoJSON rendering without prototype pollution

### Build Sizes
| Build | Size | Description |
|-------|------|-------------|
| squibview.esm.min.js | 245KB | Standard ESM with bundled dependencies |
| squibview.esm-lean.min.js | 126KB | Minimal ESM without dependencies |
| squibview.umd.min.js | 246KB | Standard UMD with bundled dependencies |
| squibview.umd-lean.min.js | 128KB | Minimal UMD without dependencies |
| squibview.standalone.*.min.js | 3.6-3.8MB | All features bundled |

## v1.0.13 - v1.0.14 (May 2024)

### Diff View Support
- **NEW**: `getSourceDiff()` method to get diff data between any two revisions
- **NEW**: `getSourceDiffHTML()` method for side-by-side diff visualization
- **NEW**: `getSourceDiffInline()` method for inline diff with blue additions/red deletions
- **NEW**: CSS styling for diff views with proper colors and formatting
- **NEW**: Support for comparing any revision against any other (including initial state)
- **NEW**: Working example demos: `diff_view_inline.html` and `diff_view_live.html`

### 🔧 RevisionHistory Enhancements
- **NEW**: `getContentAtRevision()` method to retrieve content at any revision
- **NEW**: `computeDiff()` method for character-level diffs
- **NEW**: `computeLineDiff()` method for line-by-line comparisons
- **NEW**: `getDiffStats()` method to get additions/deletions/changes count
- **NEW**: `getRevisionInfo()` method for revision metadata

### 📝 Examples & Documentation
- **NEW**: Inline diff demo showing manual revision comparison
- **NEW**: Live diff demo showing real-time cumulative changes
- **IMPROVED**: ESM module loading in diff examples
- **FIXED**: Revision dropdown population and event handling
- **FIXED**: Baseline revision persistence in live diff mode
- **CLEANED**: Removed broken/debug example files

---
## v1.0.17 (July 22, 2025)
*Release Date: July 22, 2025*

### ✨ Improvements
- **Updated cli build
- **Added line number support, add examples for showing hhow to use themes.
- **Dark theme styling and remove container border
- **Resolve line numbers bugs and improve example
- **Update line numbers example with proper dependencies and formatting
- **Add line numbers support to source view
- **Update bin path format to match npm requirements

---
## v1.0.18 (September 17, 2025)
*Release Date: September 17, 2025*

### 📝 Release Highlights
v1.0.18 - Integrated autoload functionality, consolidated example CSS, improved layouts, and CLI fixes

### ✨ Improvements
- **Add release notes symlink and update build manifest for v1.0.18
- **Update build manifests and documentation for v1.0.18 release
- **V1.1.18 prerelease
- **Updated README.md
- **Simplified ci
- **Updated example styles, fixed ci
- **Updated docs
- **Added lazy load / autoload for fence deps (new build config)
- **Added doc on copy to clipboard
- **Added cdn esm example

---


## v1.0.16 (July 16, 2025)
*Release Date: July 16, 2025*

### ✨ Improvements
- **V1.0.16 release
- **V1.0.16 pre-release docs updated
- **V1.0.16 prelease

---

## v1.0.15 (July 13, 2025)
*Release Date: July 13, 2025*

### ✨ Improvements
- **Update documentation for v1.0.15 bundled dependencies
- **Remove duplicate Leaflet icon configuration from standalone_umd example
- **Remove console warnings for missing libraries
- **Update examples to use bundled builds
- **Implement bundled builds with markdown-it
- **V1.0.15 task list and version bump
- **Fix line diff algorithm and edge cases for v1.0.14

---

## v1.0.12 (July 01, 2025)
*Release Date: July 01, 2025*

### ✨ Improvements
- **V1.0.12 enhanced docs, fixed badge copy errors for README.md generation

---
## v1.0.14 (July 13, 2025)
*Release Date: July 13, 2025*

### 📝 Release Highlights
Fixed ci/cd builds for diffs

### ✨ Improvements
- **V1.0.14 docs update

---

## v1.0.13 (July 13, 2025)
*Release Date: July 13, 2025*

### ✨ Improvements
- **V1.0.14 upgraded diff support completed
- **Working diff view viewers
- **Updated diff example view
- **V1.0.13-dev.0 add diff view support as api

---


## v1.0.11 (July 01, 2025)
*Release Date: July 01, 2025*

### ✨ Improvements
- **Simplify regex patterns to avoid bash syntax errors
- **Regex syntax error in update-release-notes.sh
- **Fixed release script
- **Making release for enhanced docs
- **Enhanced docs
- **Updatd gif maker
- **Working updated frame generator
- **Fixing demo frame capture
- **Incremental build fixed CORS errors on markdown badges being rendered
- **Making more updates to docs

---


## v1.0.10 (June 24, 2025)
*Release Date: June 24, 2025*

### 🗺️ Enhanced Geographic & 3D Content Support
- **NEW**: GeoJSON rendering with interactive Leaflet maps
- **NEW**: TopoJSON support for geographic visualizations
- **NEW**: ASCII STL support for 3D model rendering
- **IMPROVED**: Enhanced content type detection and rendering

---

## v1.0.7 (June 19, 2025)
*Release Date: June 19, 2025*

### 🧮 Math & Content Copy Improvements
- **FIXED**: Math equation copy-paste functionality with proper sizing
- **FIXED**: Image copy-paste sizing issues in rendered content
- **IMPROVED**: Content copying reliability across different content types
- **IMPROVED**: SVG content width handling during copy operations

---

## v1.0.5 (June 17, 2025)
*Release Date: June 17, 2025*

### 💻 CLI Introduction & Syntax Highlighting Fixes
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
*Release Date: June 16, 2025*

### 🏗️ Build System & Release Management
- **IMPROVED**: Release management tools for both library and CLI versions
- **IMPROVED**: Build tools and automation scripts
- **UPDATED**: Documentation for CLI usage and installation

---

## v1.0.3 (June 16, 2025)
*Release Date: June 16, 2025*

### 🧮 Math Rendering Improvements
- **FIXED**: Math rendering issues in various contexts
- **IMPROVED**: MathJax integration and reliability
- **UPDATED**: Documentation and examples for math support

---

## v1.0.1 (June 3, 2025)
*Release Date: June 3, 2025*

### 🔄 Bidirectional Editing Fixes & Runtime Identification
- **FIXED**: Runtime version identification issues
- **FIXED**: Bidirectional rendering problems with SVG content
- **FIXED**: SVG roundtrip editing in rendered → source updates
- **IMPROVED**: Bidirectional editing reliability and accuracy
- **UPDATED**: Release instructions and documentation

---

## v1.0.0 (June 3, 2025)
*Release Date: June 3, 2025*

### 🎉 Major Release - Production Ready
- **MILESTONE**: First stable 1.0 release
- **STABLE**: All core features tested and production-ready
- **COMPLETE**: Bidirectional editing (source ↔ rendered) fully functional
- **COMPLETE**: Comprehensive content type support

---

## v0.0.36 (May 20, 2025)
*Release Date: May 20, 2025*

### 📊 Data Format Support & CI Improvements
- **NEW**: CSV, TSV, and PSV inline block support with table rendering
- **NEW**: Smart line feed handling for better text flow
- **IMPROVED**: GitHub Actions CI workflow optimization
- **IMPROVED**: Build performance and testing speed
- **UPDATED**: Examples and documentation content

---

## v0.0.35 (May 14, 2025)
*Release Date: May 14, 2025*

### 🖼️ Image Handling & React Integration
- **IMPROVED**: Image handling to preserve URLs in source view by default
- **FIXED**: React example import issues
- **UPDATED**: Example content and documentation
- **ENHANCED**: Image workflow for better user experience

---

## v0.0.33 (May 14, 2025)
*Release Date: May 14, 2025*

### 📦 Build System Enhancements
- **NEW**: Standalone ESM build for modern module systems
- **IMPROVED**: React build configuration and compatibility
- **FIXED**: All build targets (ESM, UMD, Standalone) working correctly
- **ENHANCED**: Build reliability across different environments

---

## v0.0.32 (May 11, 2025)
*Release Date: May 11, 2025*

### ⚛️ React Support & Build Fixes
- **NEW**: Full React build support with standalone ESM
- **FIXED**: React build configuration issues
- **IMPROVED**: Build system reliability
- **ADDED**: React-specific examples and documentation

---

## v0.0.29 (March 12, 2025)
*Release Date: March 12, 2025*

### ↶ Undo/Redo System Implementation
- **NEW**: Full undo/redo support for both source and rendered content
- **NEW**: Revision history system with efficient diff-based storage
- **IMPROVED**: Content editing workflow with history tracking
- **ENHANCED**: User experience with familiar undo/redo keyboard shortcuts

### Core Features Added
- Revision history management
- Memory-efficient diff system
- Cross-panel undo/redo synchronization

---

## v0.0.28 (March 9, 2025)
*Release Date: March 9, 2025*

### 🏗️ Foundation Release
- **NEW**: Initial stable build system
- **NEW**: Core SquibView functionality
- **NEW**: Basic Markdown rendering with live preview
- **NEW**: Multiple view modes (source, HTML, split)
- **ESTABLISHED**: Project structure and development workflow

### Core Architecture
- Bidirectional editing foundation
- Content type system
- Plugin-ready architecture
- Modern build system with Rollup

---

## Release Process Recommendations

### Current Process Strengths
✅ **Automated tooling**: `tools/make-release.sh` script handles git tagging and GitHub releases  
✅ **Version synchronization**: Automatic sync between package.json and src/version.js  
✅ **Pre-flight checks**: Validates git status, authentication, and branch  
✅ **Manual npm publish**: Prevents accidental publishes with dry-run preview  

### Recommended Improvements

#### 1. **Integrate Release Notes Updates**
```bash
# Add to tools/make-release.sh before creating GitHub release:
./tools/update-release-notes.sh "$VERSION" "$CUSTOM_NOTES"
```

#### 2. **Create Automated Release Notes Script**
Create `tools/update-release-notes.sh`:
- Parse git commits since last tag using conventional commit format
- Auto-categorize changes (NEW/IMPROVED/FIXED/BREAKING)
- Update release_notes.md with structured entry
- Validate release notes format

#### 3. **Enforce Conventional Commits**
- Add commit message validation via git hooks
- Use format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Enable automated changelog generation

#### 4. **Enhanced Pre-release Validation**
Add to prerelease process:
- ✅ Run full test suite (already included)
- ✅ Build all targets (already included)  
- ➕ Validate documentation links
- ➕ Check for breaking changes
- ➕ Validate release notes entry exists
- ➕ Run CLI integration tests

#### 5. **Release Checklist Integration**
Create `tools/release-checklist.md` with:
- [ ] Update package.json version
- [ ] Add release notes entry
- [ ] Run `npm run prerelease`
- [ ] Run `./tools/make-release.sh "notes"`
- [ ] Test npm package locally
- [ ] Publish to npm
- [ ] Update documentation deployment

#### 6. **Automated Documentation Deployment**
- Trigger docs rebuild on release
- Deploy documentation to GitHub Pages
- Update live demo links
- Validate all examples work with new version

### Implementation Priority
1. **HIGH**: Release notes automation (immediate impact)
2. **MEDIUM**: Conventional commits (improves changelog quality)
3. **LOW**: Enhanced validation (nice to have, already quite robust)