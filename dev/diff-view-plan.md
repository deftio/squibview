# Diff View Implementation Plan

## Overview
This document outlines the step-by-step implementation plan for adding diff view functionality to SquibView. The diff view will show source-only differences between any two revisions with both programmatic API and HTML display options.

(implemented in 1.0.13)  
see examples/ for how to use the diff mechanism, including diffs from dirrent points etc.


## Core Principles
- **Incremental Development**: Each step must pass all existing tests before proceeding, new functions must get majority coverage
- **Documentation**: All new functions have full doc strings, describing their params, docs in the api and other documentation are updated for new features
- **Source-Only**: No rendered view diffs (too complex for now / could break bidirectional live-edit for now)
- **Read-Only**: Diff view is for viewing only, not editing
- **API-First**: Programmatic API before UI implementation

## Implementation Tasks

### Phase 1: RevisionHistory Foundation

#### Task 1.1: Add getContentAtRevision() method
**File**: `src/RevisionHistory.js`
**Description**: Get the complete content at any revision index
```javascript
/**
 * Gets the content at a specific revision index
 * @param {number} index - Revision index (-1 for initial, 0+ for revisions)
 * @returns {Object} Object with { content: string, contentType: string }
 */
getContentAtRevision(index)
```
**Tests**: 
- Test getting initial content (index = -1)
- Test getting content at various revision indexes
- Test invalid index handling
- Ensure all existing tests still pass

#### Task 1.2: Add computeDiff() method
**File**: `src/RevisionHistory.js`
**Description**: Compute raw diff between any two revisions
```javascript
/**
 * Computes diff between two revisions
 * @param {number} fromIndex - Starting revision index
 * @param {number} toIndex - Ending revision index
 * @returns {Array} DiffMatchPatch diff array
 */
computeDiff(fromIndex, toIndex)
```
**Tests**:
- Test diff between consecutive revisions
- Test diff between non-consecutive revisions
- Test diff with initial content (index = -1)
- Test invalid index handling
- Ensure all existing tests still pass

#### Task 1.3: Add computeLineDiff() method
**File**: `src/RevisionHistory.js`
**Description**: Convert raw diff to line-based diff structure
```javascript
/**
 * Computes line-based diff between revisions
 * @param {number} fromIndex - Starting revision index
 * @param {number} toIndex - Ending revision index
 * @returns {Array} Array of line diff objects
 */
computeLineDiff(fromIndex, toIndex)
```
**Tests**:
- Test line diff generation
- Test handling of multi-line changes
- Test empty content handling
- Ensure all existing tests still pass

#### Task 1.4: Add getDiffStats() method
**File**: `src/RevisionHistory.js`
**Description**: Calculate diff statistics
```javascript
/**
 * Gets statistics about changes between revisions
 * @param {number} fromIndex - Starting revision index
 * @param {number} toIndex - Ending revision index
 * @returns {Object} Stats object with additions, deletions, modifications
 */
getDiffStats(fromIndex, toIndex)
```
**Tests**:
- Test accurate counting of additions/deletions
- Test stats for no changes
- Test stats for complete replacement
- Ensure all existing tests still pass

#### Task 1.5: Add getRevisionInfo() method
**File**: `src/RevisionHistory.js`
**Description**: Get metadata about a specific revision
```javascript
/**
 * Gets metadata about a revision
 * @param {number} index - Revision index
 * @returns {Object} Revision metadata
 */
getRevisionInfo(index)
```
**Tests**:
- Test metadata retrieval
- Test content type tracking
- Ensure all existing tests still pass

### Phase 2: SquibView API Integration

#### Task 2.1: Add getSourceDiff() method
**File**: `src/squibview.js`
**Description**: Public API method for programmatic diff access
```javascript
/**
 * Gets source diff as a programmatic object
 * @param {Object} options - Diff options
 * @returns {Object} Diff data object
 */
getSourceDiff(options = {})
```
**Tests**:
- Test default behavior (current vs previous)
- Test specific revision comparison
- Test return object structure
- Test with no revisions available
- Ensure all existing tests still pass

#### Task 2.2: Add getSourceDiffHTML() method
**File**: `src/squibview.js`
**Description**: Generate HTML representation of diff
```javascript
/**
 * Gets source diff as display-ready HTML
 * @param {Object} options - Diff and styling options
 * @returns {string} HTML string
 */
getSourceDiffHTML(options = {})
```
**Tests**:
- Test HTML generation with default styling
- Test custom CSS classes
- Test different format options (line/inline)
- Test line number display
- Test contenteditable=false attribute
- Ensure all existing tests still pass

### Phase 3: CSS and Styling

#### Task 3.1: Add default diff CSS
**File**: `src/squibview.css`
**Description**: Add default styling for diff display
- `.squibview-diff` container styles
- `.diff-line`, `.diff-added`, `.diff-removed` styles
- `.diff-line-number` styles
- Responsive considerations

**Tests**:
- Visual verification in test HTML
- Ensure no CSS conflicts with existing styles

#### Task 3.2: Add CSS class customization
**Description**: Ensure custom CSS classes work properly
**Tests**:
- Test that custom classes override defaults correctly
- Test partial class customization
- Ensure all existing tests still pass

### Phase 4: Events and Integration

#### Task 4.1: Add diff-related events
**File**: `src/squibview.js`
**Description**: Emit events for diff operations
- `diff:computed` - When diff is calculated
- `diff:displayed` - When diff HTML is generated

**Tests**:
- Test event emission
- Test event data payload
- Ensure all existing tests still pass

### Phase 5: Demo and Documentation

#### Task 5.1: Create diff_view.html demo
**File**: `examples/diff_view.html`
**Description**: Comprehensive demo showing:
- Basic diff view usage
- Comparing specific revisions
- Custom styling examples
- API usage examples
- Integration patterns

**Structure**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>SquibView - Diff View Demo</title>
    <!-- Include SquibView -->
</head>
<body>
    <h1>Diff View Demo</h1>
    
    <!-- Basic Example -->
    <section>
        <h2>Basic Diff View</h2>
        <div id="editor1"></div>
        <button id="showDiff1">Show Diff</button>
        <div id="diffView1"></div>
    </section>
    
    <!-- Custom Styling Example -->
    <section>
        <h2>Custom Styled Diff</h2>
        <div id="editor2"></div>
        <button id="showDiff2">Show Custom Diff</button>
        <div id="diffView2"></div>
    </section>
    
    <!-- Revision Selection Example -->
    <section>
        <h2>Compare Specific Revisions</h2>
        <div id="editor3"></div>
        <select id="fromRevision"></select>
        <select id="toRevision"></select>
        <button id="compareDiff">Compare</button>
        <div id="diffView3"></div>
    </section>
    
    <!-- Programmatic API Example -->
    <section>
        <h2>Programmatic API</h2>
        <div id="editor4"></div>
        <pre id="diffData"></pre>
    </section>
</body>
</html>
```

#### Task 5.2: Update examples/index.html
**File**: `examples/index.html`
**Description**: Add link to diff view demo
```html
<li><a href="diff_view.html">Diff View - Compare revisions</a></li>
```

#### Task 5.3: Update README.md
**File**: `README.md`
**Description**: Add diff view documentation
- API reference for getSourceDiff() and getSourceDiffHTML()
- Basic usage examples
- Note about source-only diffs

#### Task 5.4: Update CLAUDE.md
**File**: `CLAUDE.md`
**Description**: Add notes about diff view architecture and testing requirements

## Testing Strategy

### Unit Tests
- Add new test file: `tests/diff.test.js`
- Test each RevisionHistory method individually
- Test SquibView API methods
- Test edge cases and error handling

### Integration Tests
- Test diff view with different content types (md, html, csv)
- Test diff view after multiple edits
- Test diff view with revision navigation

### E2E Tests
- Add E2E test for diff view demo page
- Test user interactions with diff view
- Test responsive behavior

## Success Criteria
1. All existing tests continue to pass after each task
2. New tests provide >90% coverage for new code
3. Demo page clearly shows all diff view capabilities
4. API is intuitive and well-documented
5. Performance remains good even with many revisions

## Future Enhancements (Out of Scope)
- Side-by-side diff view
- Diff view editing capabilities
- Rendered content diffs
- Diff navigation (jump to next/previous change)
- Diff merging capabilities

## Timeline Estimate
- Phase 1 (RevisionHistory): 2-3 hours
- Phase 2 (SquibView API): 2 hours
- Phase 3 (CSS): 1 hour
- Phase 4 (Events): 30 minutes
- Phase 5 (Demo/Docs): 1-2 hours

**Total: 6-8 hours of development**