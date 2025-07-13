# SquibView Development Troubleshooting

## v1.0.15 Update: Import Maps No Longer Required!

As of v1.0.15, the default ESM and UMD builds now include markdown-it, tiny-emitter, and diff-match-patch bundled. This means **new users no longer need to deal with import maps**! Simply use the default builds:

```html
<!-- Just works! No import maps needed -->
<script type="module">
  import SquibView from 'https://unpkg.com/squibview/dist/squibview.esm.min.js';
  const editor = new SquibView('#editor');
</script>
```

## Module Resolution Issues (Development/Lean Builds)

When using the lean builds or running development files in the `/dev` directory, you might encounter these errors:

1. `Uncaught TypeError: Failed to resolve module specifier "tiny-emitter". Relative references must start with either "/", "./", or "../".`
2. `Uncaught SyntaxError: The requested module 'diff-match-patch' does not provide an export named 'default'`

### The Issue

The lean builds and development files use ES modules directly with import statements like:

```javascript
import TinyEmitter from 'tiny-emitter';
import DiffMatchPatch from 'diff-match-patch';
```

However, these modules are CommonJS modules, not ES modules, and they don't provide default exports.

### The Solution for Lean Builds

For lean builds, use import maps to resolve the module specifiers and esm.sh to convert CommonJS modules to ES modules:

```html
<script type="importmap">
{
  "imports": {
    "tiny-emitter": "https://esm.sh/tiny-emitter@2.1.0",
    "diff-match-patch": "https://esm.sh/diff-match-patch@1.0.5",
    "turndown": "https://esm.sh/turndown@7.1.2"
  }
}
</script>
```

This ensures that when the source file imports from `tiny-emitter` or `diff-match-patch`, it receives a proper ES module with default exports.

## UMD Build Issues

The UMD build of SquibView may have issues in browser environments with errors like:

1. `Uncaught ReferenceError: module is not defined`
2. `Cannot read properties of undefined (reading 'version')`
3. `Uncaught TypeError: e is not a constructor`

### The Solution

For UMD build issues, use the wrapper solution in `/examples/example_UMD_fixed.html`:

```html
<!-- Fix for UMD module issues -->
<script>
  // Define module if not already defined (browser environment)
  if (typeof module === 'undefined') {
    var module = { exports: {} };
  }
</script>

<!-- The UMD build -->
<script src="../dist/squibview.umd.min.js"></script>

<script>
  // Fix SquibView global if needed
  if (typeof SquibView === 'object' && SquibView.__esModule) {
    window.SquibView = SquibView.default || SquibView;
  }
</script>
```

## Development Tips

1. **Use Default Builds (v1.0.15+):** The default ESM and UMD builds now bundle markdown-it, eliminating import map complexity for most users
2. **Use ESM.sh for Lean Builds:** When using lean builds with external dependencies, esm.sh provides proper ES module versions of CommonJS libraries  
3. **Import Maps for Advanced Users:** Import maps are now only needed for lean builds or custom dependency management
4. **Prefer Standalone Build:** For testing, the standalone build includes all dependencies and is easier to work with
5. **Test Multiple Browsers:** Some browsers handle ES modules and import maps differently

## Examples

- `/examples/example_ESM.html` - ES modules example
- `/examples/example_UMD.html` - UMD example with fixes
- `/examples/example_UMD_fixed.html` - Simplified UMD example with fixes
- `/examples/standalone_umd.html` - Standalone UMD example (no external dependencies)