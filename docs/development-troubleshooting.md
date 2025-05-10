# SquibView Development Troubleshooting

## Module Resolution Issues

When running the development files in the `/dev` directory, you might encounter these errors:

1. `Uncaught TypeError: Failed to resolve module specifier "tiny-emitter". Relative references must start with either "/", "./", or "../".`
2. `Uncaught SyntaxError: The requested module 'diff-match-patch' does not provide an export named 'default'`

### The Issue

The development files in `/dev` use ES modules directly with import statements like:

```javascript
import TinyEmitter from 'tiny-emitter';
import DiffMatchPatch from 'diff-match-patch';
```

However, these modules are CommonJS modules, not ES modules, and they don't provide default exports.

### The Solution

We use import maps to resolve the module specifiers and esm.sh to convert CommonJS modules to ES modules:

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

1. **Use ESM.sh for Development:** When working with ES modules and CommonJS dependencies, esm.sh provides proper ES module versions of CommonJS libraries
2. **Use Import Maps:** Import maps help browsers resolve bare module specifiers like `import X from 'library'`
3. **Prefer Standalone Build:** For testing, the standalone build includes all dependencies and is easier to work with
4. **Test Multiple Browsers:** Some browsers handle ES modules and import maps differently

## Examples

- `/examples/example_ESM.html` - ES modules example
- `/examples/example_UMD.html` - UMD example with fixes
- `/examples/example_UMD_fixed.html` - Simplified UMD example with fixes
- `/examples/standalone_umd.html` - Standalone UMD example (no external dependencies)