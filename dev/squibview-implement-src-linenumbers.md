# SquibView Source Line Numbers Implementation Plan

## Overview
This document outlines the implementation plan for adding line numbers to the source view in SquibView while maintaining all existing functionality, especially bidirectional editing.

## Branch & Version Strategy
- **Branch**: `squibview-add-src-linenumbers`
- **Version**: 1.0.17-dev.1 → 1.0.17-dev.2 → ... → 1.0.17
- **Target Release**: After thorough testing in Squipp extension

## Design Goals
1. **Preserve all existing functionality** - No regression in bidirectional editing
2. **Handle wrapped lines correctly** - Line numbers align with logical lines, not visual lines
3. **Theme-agnostic** - Use CSS variables for all styling
4. **Performance** - Efficient for documents with 10k+ lines
5. **Optional** - Feature can be toggled on/off via API

## Technical Implementation

### Approach: Hybrid Textarea + Line Gutter
Keep the existing textarea for editing while adding a synchronized line number gutter.

### HTML Structure
```html
<!-- When line numbers are disabled (current behavior) -->
<div class="squibview-editor">
  <textarea class="squibview-input"></textarea>
  <div class="squibview-output"></div>
</div>

<!-- When line numbers are enabled -->
<div class="squibview-editor">
  <div class="squibview-source-panel">
    <div class="squibview-line-gutter"></div>
    <textarea class="squibview-input"></textarea>
  </div>
  <div class="squibview-output"></div>
</div>
```

### Core Implementation

#### 1. New Options
```javascript
static defaultOptions = {
  // ...existing options
  showLineNumbers: false,        // Enable/disable line numbers
  lineNumberStart: 1,           // Starting line number
  lineNumberMinDigits: 2        // Minimum digits (e.g., 01, 02)
};
```

#### 2. Line Height Measurement
```javascript
class SquibView {
  initializeLineMirror() {
    // Create invisible div that exactly mirrors textarea styling
    this.lineMirror = document.createElement('div');
    this.lineMirror.className = 'squibview-line-mirror';
    this.lineMirror.setAttribute('aria-hidden', 'true');
    
    // Will copy computed styles from textarea
    this.container.appendChild(this.lineMirror);
  }

  updateLineNumbers() {
    if (!this.options.showLineNumbers || !this.lineGutter) return;
    
    const lines = this.input.value.split('\n');
    const totalLines = lines.length;
    const minDigits = Math.max(
      this.options.lineNumberMinDigits,
      String(totalLines).length
    );
    
    // Clear and rebuild
    this.lineGutter.innerHTML = '';
    
    // Copy textarea dimensions to mirror
    this.syncMirrorStyles();
    
    // Measure each line
    lines.forEach((line, index) => {
      const lineNum = this.options.lineNumberStart + index;
      const lineNumStr = String(lineNum).padStart(minDigits, '0');
      
      // Measure line height
      const lineHeight = this.measureLineHeight(line);
      
      // Create line number element
      const gutterLine = document.createElement('div');
      gutterLine.className = 'squibview-gutter-line';
      gutterLine.textContent = lineNumStr;
      gutterLine.style.height = lineHeight + 'px';
      
      this.lineGutter.appendChild(gutterLine);
    });
  }

  measureLineHeight(lineContent) {
    // Create temporary element in mirror
    const tempLine = document.createElement('div');
    tempLine.textContent = lineContent || '\u00A0'; // nbsp for empty lines
    tempLine.style.wordBreak = 'break-all';
    tempLine.style.whiteSpace = 'pre-wrap';
    
    this.lineMirror.appendChild(tempLine);
    const height = tempLine.getBoundingClientRect().height;
    this.lineMirror.removeChild(tempLine);
    
    return height;
  }

  syncMirrorStyles() {
    const computed = window.getComputedStyle(this.input);
    const stylesToCopy = [
      'fontFamily', 'fontSize', 'lineHeight', 'letterSpacing',
      'padding', 'border', 'boxSizing', 'whiteSpace', 'wordWrap',
      'wordBreak', 'overflowWrap'
    ];
    
    stylesToCopy.forEach(prop => {
      this.lineMirror.style[prop] = computed[prop];
    });
    
    // Match textarea width exactly
    this.lineMirror.style.width = this.input.clientWidth + 'px';
  }
}
```

#### 3. Scroll Synchronization
```javascript
setupScrollSync() {
  this.input.addEventListener('scroll', () => {
    if (this.lineGutter) {
      this.lineGutter.scrollTop = this.input.scrollTop;
    }
  });
}
```

#### 4. Performance Optimizations
```javascript
// Debounce updates
updateLineNumbersDebounced = debounce(() => {
  requestAnimationFrame(() => this.updateLineNumbers());
}, 100);

// Only update when content changes
handleInput() {
  const newLineCount = (this.input.value.match(/\n/g) || []).length + 1;
  if (newLineCount !== this.lastLineCount) {
    this.lastLineCount = newLineCount;
    this.updateLineNumbersDebounced();
  }
  // ...existing input handling
}
```

### CSS Implementation with Variables

```css
/* New CSS variables for line numbers */
:root {
  /* Extend existing variables */
  --squibview-gutter-bg: var(--squibview-background-color);
  --squibview-gutter-fg: #666;
  --squibview-gutter-border: var(--squibview-border-color);
  --squibview-gutter-width: 50px;
  --squibview-gutter-padding: 8px;
  --squibview-gutter-font-family: var(--squibview-font-family-monospace);
  --squibview-gutter-font-size: var(--squibview-font-size-input);
}

/* Source panel wrapper */
.squibview-source-panel {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

/* Line gutter styling */
.squibview-line-gutter {
  flex-shrink: 0;
  width: var(--squibview-gutter-width);
  background: var(--squibview-gutter-bg);
  color: var(--squibview-gutter-fg);
  border-right: 1px solid var(--squibview-gutter-border);
  overflow: hidden;
  user-select: none;
  font-family: var(--squibview-gutter-font-family);
  font-size: var(--squibview-gutter-font-size);
}

.squibview-gutter-line {
  text-align: right;
  padding: 0 var(--squibview-gutter-padding);
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

/* Adjust input when line numbers are shown */
.squibview-source-panel .squibview-input {
  flex: 1;
  border-left: none;
  margin: 0;
}

/* Mirror for line measurement (hidden) */
.squibview-line-mirror {
  position: absolute;
  top: -9999px;
  left: -9999px;
  visibility: hidden;
  pointer-events: none;
}

/* Ensure consistent line height between gutter and textarea */
.squibview-line-gutter,
.squibview-input {
  line-height: var(--squibview-line-height, 1.5);
}
```

### API Methods

```javascript
// Toggle line numbers
setLineNumbers(show) {
  this.options.showLineNumbers = show;
  this.initializeEditor(); // Rebuild with/without gutter
  this.updateLineNumbers();
}

// Get line number state
getLineNumbers() {
  return this.options.showLineNumbers;
}

// Update line number start
setLineNumberStart(start) {
  this.options.lineNumberStart = start;
  this.updateLineNumbers();
}
```

## Testing Strategy

### Unit Tests
1. **Line number accuracy**
   - Empty document shows line 1
   - Correct count for multi-line documents
   - Line number start option works

2. **Wrapped line handling**
   - Long lines maintain single line number
   - Height calculation matches textarea wrapping
   - Window resize updates heights

3. **Performance tests**
   - 10k lines renders in < 100ms
   - Scrolling remains smooth
   - Typing doesn't lag

4. **Integration tests**
   - Bidirectional editing still works
   - Revision history unaffected
   - Copy/paste preserves content
   - All view modes work correctly

### Manual Testing Checklist

#### Basic Functionality
- [ ] Line numbers appear when enabled
- [ ] Line numbers hidden when disabled
- [ ] Numbers align with textarea lines
- [ ] Wrapped lines share same number
- [ ] Empty lines show numbers

#### Edge Cases
- [ ] Very long lines (1000+ chars)
- [ ] Documents with 10k+ lines
- [ ] Mixed line endings (\r\n, \n)
- [ ] Unicode content
- [ ] RTL text
- [ ] Various fonts/sizes

#### Interactions
- [ ] Scroll sync works smoothly
- [ ] Resize window maintains alignment
- [ ] Zoom in/out maintains alignment
- [ ] Copy from gutter selects text only
- [ ] Tab key works normally

#### View Modes
- [ ] Source view: line numbers visible
- [ ] Split view: line numbers visible
- [ ] HTML view: line numbers hidden
- [ ] Switching views preserves setting

#### Performance
- [ ] No lag when typing
- [ ] Smooth scrolling
- [ ] Fast initial render
- [ ] Memory usage reasonable

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## Rollout Plan

### Phase 1: Development (Week 1-2)
1. Create feature branch
2. Implement core functionality
3. Add CSS with variables
4. Write unit tests

### Phase 2: Testing (Week 3)
1. Manual testing across browsers
2. Performance optimization
3. Fix edge cases
4. Update documentation

### Phase 3: Beta Testing (Week 4)
1. Release as 1.0.17-beta.1
2. Test in Squipp extension
3. Gather feedback
4. Fix issues

### Phase 4: Release
1. Merge to main
2. Release 1.0.17
3. Update Squipp to use new feature

## Future Enhancements
1. **Syntax highlighting** - Could overlay highlights on textarea
2. **Clickable line numbers** - Select entire line
3. **Relative line numbers** - Vim-style relative numbering
4. **Breakpoint indicators** - For debugging contexts
5. **Dark mode preset** - Ship with dark theme variables

## Potential Issues & Mitigations

### Issue: Performance with huge files
**Mitigation**: Virtual scrolling - only render visible line numbers

### Issue: Font loading changes heights
**Mitigation**: Re-measure on font load events

### Issue: Inconsistent line height calculations
**Mitigation**: Force consistent styles between textarea and mirror

### Issue: Memory leaks from mirror div
**Mitigation**: Proper cleanup in destroy method

## Success Criteria
1. No regression in existing functionality
2. Performance overhead < 5% for typical documents
3. Works across all supported browsers
4. Clean API for enabling/disabling
5. Positive feedback from Squipp beta testing

## Note on Theming

This implementation maintains SquibView's theme-agnostic approach by using CSS variables. However, this feature highlights the need for a comprehensive theming solution in SquibView:

### Current State
- All colors use CSS variables
- No built-in dark mode
- Users must override variables for custom themes

### Recommendation for Future Work
Create a companion PR for basic theme support:
```javascript
// Example API
squibView.setTheme('dark'); // Built-in themes
squibView.setTheme(customThemeObject); // Custom themes
```

This would include:
- Light theme (default)
- Dark theme
- High contrast theme
- Theme switcher in demo

The line numbers feature will automatically adapt to any theme via CSS variables.