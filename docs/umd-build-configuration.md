# UMD Build Configuration for SquibView

This document explains the UMD (Universal Module Definition) build configuration for SquibView, which ensures proper compatibility across different JavaScript environments.

## What is UMD?

UMD is a module pattern that aims to be compatible with the most popular script loaders (and if no module loader is found, it registers itself as a global variable).

The UMD build should work in all these contexts:
- As a script tag directly in the browser
- In AMD environments (like RequireJS)
- In CommonJS environments (like Node.js)

## Rollup Configuration for UMD

The key parts of our UMD configuration:

```javascript
{
  input: 'src/squibview.js',
  output: {
    file: 'dist/squibview.umd.js',
    format: 'umd',
    name: 'SquibView',
    sourcemap: true,
    inlineDynamicImports: true,
    // Explicitly export the default export as the main export
    exports: 'auto',
    // Override the generated UMD wrapper slightly to ensure it works in browsers
    banner: '/* SquibView UMD build */',
    footer: '/* Make SquibView directly available as a global */\ntypeof window !== "undefined" && (window.SquibView = typeof SquibView.default === "function" ? SquibView.default : SquibView);'
  },
  plugins: [
    resolve({
      extensions,
      browser: true, // Ensure browser-compatible modules are used
      preferBuiltins: false
    }),
    commonjs({
      // Better CommonJS conversion
      transformMixedEsModules: true,
      // Ensure default exports are properly handled
      namedExports: {
        'tiny-emitter': ['TinyEmitter'],
        'diff-match-patch': ['diff_match_patch']
      }
    }),
    babel({
      extensions,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-transform-modules-umd'
      ]
    }),
  ],
}
```

## Explanation of Key Settings

### Output Configuration

- **`format: 'umd'`** - Specifies the UMD format.
- **`name: 'SquibView'`** - The global variable name to use when no module system is found.
- **`exports: 'auto'`** - Automatically determines the export mode based on the input.
- **`footer`** - A small piece of code that ensures the class is properly assigned to `window.SquibView` in browser environments, handling both default and named exports.

### Plugins

- **`resolve({browser: true})`** - Ensures browser-compatible versions of dependencies are used.
- **`commonjs({namedExports})`** - Properly handles CommonJS dependencies, explicitly specifying exports for libraries that don't follow standard patterns.
- **`babel({plugins})`** - Uses Babel to transform ES6+ code to be compatible with older environments, with specific plugins to handle UMD transformations.

## Why This Approach?

ES modules use `export default` syntax, which can cause issues in UMD builds. When bundling ES modules as UMD, the default export sometimes gets wrapped in an object with `{default: actualExport}`. Our configuration ensures:

1. The appropriate export is exposed as the global variable
2. The library works across different module systems
3. No manual fixes are needed in HTML when using the UMD build as a script tag

## Testing UMD Builds

To verify the UMD build:

1. Test as a direct script tag:
   ```html
   <script src="../dist/squibview.umd.min.js"></script>
   <script>
     const editor = new SquibView('#editor');
   </script>
   ```

2. Check that `window.SquibView` is properly defined by inspecting the console:
   ```javascript
   console.log(typeof SquibView); // Should print "function"
   console.log(SquibView.version); // Should access version properly
   ```

## Troubleshooting

If the UMD build doesn't work properly:

1. Check the bundled output by examining the `dist/squibview.umd.js` file to verify exports are handled correctly
2. Ensure dependencies are compatible with UMD format
3. Try bundling dependencies inline rather than marking them as external