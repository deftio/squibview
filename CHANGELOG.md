# SquibView Changelog

All notable changes to this project will be documented in this file.

## [1.0.15] - 2025-07-13
### Changed
- **BREAKING**: Default ESM/UMD builds now include bundled markdown-it (~240KB)
  - Eliminates import map complexity for new users
  - Existing apps continue to work - same filenames maintained
- Standalone builds no longer modify global Leaflet prototype (fixes side effects)

### Added
- New lean builds (`-lean` suffix) for advanced users who manage their own dependencies
- ESM standalone builds now properly generated
- Clean, modern examples without module mixing

### Fixed
- GeoJSON rendering in standalone builds works without prototype pollution
- ESM standalone build was missing - now properly generated
- Library warnings only show when actually needed

### Documentation
- Updated all docs to reflect bundled dependencies in default builds
- Cleaned up examples to use best practices

## [1.0.13] - 2025-07-13
### Added
- Comprehensive diff view support
  - `getSourceDiff()` method for diff data between revisions
  - `getSourceDiffHTML()` for side-by-side visualization
  - `getSourceDiffInline()` for inline diff with color coding
- Support for comparing any revision against any other

### Changed
- Enhanced revision history API
- Improved CSS for diff visualization

## [0.0.30] - 2024-03-28
### Added
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

### Changed
- Updated version in package.json and static version property
- Improved event handling for text selections

## [0.0.29a] - 2024-03-22
### Added
- Support for undo/redo in both source and rendered panels
- RevisionManager with memory-efficient diff storage
- Bidirectional editing enhancements

### Fixed
- Various bug fixes related to content type handling

## [0.0.29] - 2024-03-15
### Added
- Bidirectional editing support 
- Enhanced content type handling
- Support for CSV, TSV, and other separator formats

## [0.0.28] - 2024-03-01
### Added
- Plugin system for extending functionality
- Support for RevealJS presentations
- Custom renderer registration
- Enhanced clipboard operations

## [0.0.27] - 2024-02-15
### Added
- Initial release with core features
- Markdown and HTML rendering
- Split view editing
- Basic clipboard support