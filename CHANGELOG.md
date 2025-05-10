# SquibView Changelog

All notable changes to this project will be documented in this file.

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