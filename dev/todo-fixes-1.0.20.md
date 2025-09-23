# Todo Fixes for v1.0.20 ✅ COMPLETED

## Issue 1: List Bullets Appearing in Left Margin

### Problem
List bullets (ul/ol) are appearing in the left margin/gutter area outside the content area when rendered in the `.squibview-output` panel.

### Root Cause
The `.squibview-output` panel has `padding: var(--squibview-padding-base)` (1em) but no explicit styling for lists. By default, browsers render list items with bullets positioned outside the content box (`list-style-position: outside`). Combined with default browser margins/padding on ul/ol elements, the bullets end up in the padding area.

### Fix Implemented ✅
**Solution 2 was chosen for its clarity and maintainability.**

The following CSS rules were added to `src/squibview.css` (lines 118-140):
```css
/* Fix for list bullets appearing in margin/gutter (Issue #1 v1.0.20)
   Problem: Default browser list styling places bullets outside the content box.
   Solution: Explicitly set padding for lists to ensure bullets remain within
   the content area while maintaining proper alignment and readability. */
.squibview-output ul,
.squibview-output ol {
    padding-left: 2em;      /* Space for bullets + indent */
    margin-left: 0;         /* Reset browser default margin */
    margin-top: 0.5em;      /* Consistent vertical spacing */
    margin-bottom: 0.5em;
}

/* Nested lists need only their natural indent, not additional margin */
.squibview-output li > ul,
.squibview-output li > ol {
    margin-top: 0.25em;     /* Tighter spacing for nested lists */
    margin-bottom: 0.25em;
}

/* Ensure consistent spacing for list items */
.squibview-output li {
    padding-left: 0.25em;   /* Small gap after bullet for readability */
}
```

**Why this solution:**
- Preserves standard list appearance (bullets outside, clean indent)
- Explicit and easy to understand
- No negative margins or complex selectors
- Works with all nesting levels
- Maintains readability for multi-line items

### Testing Required
- Test with nested lists (multiple levels)
- Test with both ordered and unordered lists
- Verify appearance doesn't break existing content
- Test with different content types (Markdown, HTML)

---

## Issue 2: CSS Bundling - External Dependencies Being Included ✅ FIXED

### Problem
The `dist/squibview.css` file has grown from 621 lines (source) to 1400 lines because external CSS files (highlight.js, leaflet) are being bundled into it during the build process.

### Root Cause
1. In `src/standalone.squibview.js`, lines 28-29 import CSS files directly:
   ```javascript
   import 'highlight.js/styles/default.css';
   import 'leaflet/dist/leaflet.css';
   ```

2. The rollup postcss plugin (configured in `rollup.config.js`) with `extract: 'squibview.css'` extracts ALL imported CSS into the single output file

3. This prevents users from:
   - Using their own versions of highlight.js themes
   - Customizing leaflet styles
   - Keeping bundle size minimal when not using these features

### Fix Implemented ✅
**Solution:** Removed CSS imports from `src/standalone.squibview.js` (lines 28-29). The autoload system already had CSS URLs configured and loads them dynamically when needed.

**Results:**
- dist/squibview.css reduced from 1400 to 645 lines (55% reduction)
- External CSS loads on-demand via CDN
- Users can now override themes without conflicts

### Original Fix Plan

#### Option 1: Dynamic CSS Loading (Recommended)
1. Remove the CSS imports from `standalone.squibview.js`
2. Modify the autoload feature to dynamically inject CSS when libraries are loaded:
   ```javascript
   // In _loadLibraryAssets or similar
   if (libName === 'hljs' && cdnConfig.css) {
     await this._loadCSS(cdnConfig.css);
   }
   ```
3. This keeps the core squibview.css clean and allows users to provide their own themes

#### Option 2: Separate CSS Files
1. Configure rollup to output separate CSS files for each build target:
   - `squibview.css` - core styles only
   - `squibview.standalone.css` - includes all dependencies
2. Modify postcss configuration to conditionally extract based on build type

#### Option 3: CSS Modules with Scoping
1. Use postcss modules to scope external CSS to specific builds
2. Prevent external CSS from polluting the main distribution

### Implementation Steps
1. Update `rollup.config.js` to handle CSS extraction differently per build type
2. Modify `src/standalone.squibview.js` to conditionally import CSS or load dynamically
3. Update CDN configuration to include CSS URLs for dynamic loading
4. Test that autoload still works correctly with dynamic CSS injection

### Testing Required
- Verify highlight.js still works with autoloaded CSS
- Test leaflet maps render correctly with dynamic CSS
- Ensure standalone build includes necessary styles
- Verify regular build has minimal CSS footprint
- Test custom theme override capabilities

---

## Additional Considerations

### Build Process Improvements
1. Consider using separate entry points for CSS:
   - `src/squibview.css` - core styles
   - `src/standalone.css` - imports core + dependencies

2. Add build flags to control CSS bundling behavior

3. Document the CSS architecture for users:
   - Which styles are included in which build
   - How to override default themes
   - How to use custom highlight.js themes

### Documentation Updates Needed
1. Add section about CSS customization
2. Document the autoload CSS behavior
3. Provide examples of theme overrides

### Version Notes
These fixes target v1.0.20 and should be backward compatible. The list bullet fix is a bug fix, while the CSS bundling change improves flexibility without breaking existing usage.