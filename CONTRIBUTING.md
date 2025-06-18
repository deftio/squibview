# Contributing to SquibView

We welcome contributions to SquibView! Here's how you can help.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally: `git clone https://github.com/YOUR_USERNAME/squibview.git`
3.  **Install dependencies**: `npm install`

## Development Workflow

1.  **Create a new branch** for your feature or bug fix: `git checkout -b my-feature-branch`
2.  **Make your changes**.
3.  **Build the project**: See the "Building and Versioning" section below.
4.  **Test your changes**: See the "Testing and Debugging" section below.
5.  **Commit your changes**: `git commit -am "Add some feature"`
6.  **Push to your branch**: `git push origin my-feature-branch`
7.  **Create a Pull Request** on GitHub.

## Building and Versioning

SquibView uses a combination of `npm version` and custom shell scripts to manage versioning, builds, and testing in an integrated way. **IMPORTANT**: SquibView supports multiple build targets (ESM, UMD, Standalone, React, Vue, CLI) - it's critical not to break any of these during development.

### Source of Truth for Version

The canonical version number is stored in `package.json`. The `src/version.js` file, which makes the version available at runtime via `SquibView.version`, is *automatically generated* from `package.json` by the build process.

### Development Scripts

*   **`dev-bump-build-test.sh`**: **Recommended for development iterations**. This script automates bumping to a development version, building, and testing.
    *   **How to use it:** Simply run `./dev-bump-build-test.sh` from the project root.
    *   **What it does:**
        1.  Determines the current version from `package.json`.
        2.  If the current version is a pre-release (e.g., `1.0.5-dev.0`), it increments the pre-release part (e.g., to `1.0.5-dev.1`).
        3.  If the current version is a stable release (e.g., `1.0.5`), it adds `-dev.0` to create the first development version (e.g., `1.0.5-dev.0`).
        4.  Runs `node tools/updateVersion.js` to update `src/version.js`.
        5.  Runs `npm run build:esm` (fast build for development).
        6.  Runs `npm test -- tests/SquibView.test.js` (core tests only).
    *   **Why use it:** Streamlines development by creating traceable dev versions and ensuring core functionality works.

*   **`build-and-test.sh`**: For formal builds when you want to test a specific version.
    *   **How to use it:**
        1.  Manually update the `version` in `package.json` (e.g., `npm version patch`, `npm version minor`, or edit directly).
        2.  Run `./build-and-test.sh`.
    *   **What it does:**
        1.  Runs `node tools/updateVersion.js` to update `src/version.js`.
        2.  Runs `npm run build` (full build of all targets).
        3.  Runs `npm test` (all tests).

### Build Targets and Commands

⚠️ **WARNING**: Full builds take significant time (several minutes), especially standalone builds. Use targeted builds during development.

#### Individual Build Commands

*   **`npm run build:esm`** - ES Module build (fastest, ~2 seconds)
    *   Outputs: `dist/squibview.esm.js`, `dist/squibview.esm.min.js`
    *   Use: Modern bundlers (Webpack, Vite, etc.)

*   **`npm run build:umd`** - Universal Module Definition build (~3 seconds)
    *   Outputs: `dist/squibview.umd.js`, `dist/squibview.umd.min.js`
    *   Use: Browser script tags, RequireJS, CommonJS

*   **`npm run build:standalone`** - Self-contained build with all dependencies (⚠️ ~30+ seconds)
    *   Outputs: `dist/squibview.standalone.min.js`, `dist/squibview.standalone.esm.js`
    *   Use: CDN deployment, no external dependencies needed

*   **`npm run build:react`** - React component wrapper
    *   Outputs: `dist/squibview-react.js`, `dist/squibview-react.min.js`

*   **`npm run build:cli`** - Command-line interface
    *   Outputs: `cli/` directory with CLI tools

#### Comprehensive Build Commands

*   **`npm run build`** - Builds all library targets (ESM, UMD, Standalone, React, Vue)
*   **`npm run build:all`** - Builds library + CLI (complete build)
*   **`npm run build:fast`** - ESM build only (for development)

#### Supporting Build Tools

*   **`npm run updateVersion`** - Updates `src/version.js` from `package.json`
*   **`npm run minifyCSS`** - Processes and minifies CSS files
*   **`npm run makeIndexHTML`** - Generates documentation HTML

### Build Architecture Details

1. **Version Management**: `tools/updateVersion.js` reads `package.json` and generates `src/version.js`
2. **Bundling**: Rollup.js with different configurations for each target
3. **CSS Processing**: Custom minification via `tools/minifyCSS.cjs`
4. **Distribution**: All builds output to `dist/` directory

### Version Runtime Access

SquibView reports its version at runtime via:
```javascript
console.log(SquibView.version); // e.g., "1.0.5-dev.2"
console.log(SquibView.version.version); // Version string
console.log(SquibView.version.url); // Repository URL
```

### Build Troubleshooting

- **Standalone builds fail**: Often due to dependency compatibility issues
- **UMD builds not working in browser**: Check `docs/umd-build-configuration.md`
- **Version mismatch**: Run `npm run updateVersion` manually
- **CSS issues**: Ensure `npm run minifyCSS` runs after code changes

## Testing and Debugging

### Running Tests

*   **Run all tests:** `npm test`
*   **Run tests for a specific file:** `npm test -- tests/SquibView.test.js` (or `npx jest tests/SquibView.test.js`)
*   **Run tests with verbose output for debugging:** `npm test -- --verbose`
*   **Run tests in watch mode:** `npm test -- --watch`

### Debugging Tests in VS Code (or similar IDEs with Jest integration)

Most modern IDEs offer excellent Jest integration for debugging.

1.  **Install the Jest extension** for your IDE if you haven't already (e.g., "Jest" by Orta for VS Code).
2.  **Set breakpoints** in your test files (`*.test.js`) or the source files (`src/*.js`).
3.  **Use the IDE's debugger UI** to run the specific test or test suite. You can usually click a "Debug" button or icon that appears next to `describe` or `it` blocks in your test files.

### Debugging in the Browser

For issues that are hard to reproduce in the JSDOM environment provided by Jest, or for visual/interaction debugging:

1.  **Use `debug.html` or `debug-dev.html`:** These files in the `dev/` directory are set up to load SquibView. You can open them in a browser.
2.  **Modify `debug-dev.html`:** This file is particularly useful as it often includes more complex setups or specific content to test features under development.
    *   You can change the `initialContent` or `inputContentType` directly in the script tag within `debug-dev.html` to load specific Markdown or HTML.
    *   Add `debugger;` statements in `src/squibview.js` or other relevant source files where you want the browser's debugger to pause.
3.  **Use Browser Developer Tools:** Open your browser's developer tools (usually F12 or right-click -> Inspect) to:
    *   Set breakpoints in the JavaScript source code.
    *   Inspect the DOM structure and CSS.
    *   Monitor console output (`console.log`, `console.warn`, etc.).
    *   Step through code execution.

### Tips for Debugging SquibView

*   **Isolate the Issue:** Try to create the simplest possible Markdown or HTML snippet that reproduces the bug. Use this in `debug-dev.html` or a new Jest test case.
*   **Check `console.log` output:** Add `console.log` statements strategically in `squibview.js` or `HtmlToMarkdown.js` to understand the state of variables or the flow of execution.
*   **Understand the Rendering Pipeline:**
    *   **Markdown to HTML:** `squibview.js` -> `markdown-it` (with custom fence renderers) -> HTML string -> DOM.
    *   **HTML to Markdown:** HTML string (from contenteditable or input) -> `HtmlToMarkdown.js` (which uses Turndown with custom rules) -> Markdown string.
*   **Review Test Logs:** Carefully examine the output from `npm test`, especially the diffs provided by Jest when assertions fail. This often points directly to the problem.
*   **Consider Mocks:** Be aware of how mocks (e.g., for `hljs`, `mermaid`, `Papa`) in `tests/SquibView.test.js` might affect test behavior. Sometimes, unmocking a module or using `jest.requireActual` is necessary for specific tests.

## Code Style

Please follow the existing code style. We generally adhere to common JavaScript best practices.

## Reporting Bugs

*   **Search existing issues** to see if the bug has already been reported.
*   **Provide a clear and descriptive title.**
*   **Include steps to reproduce the bug.**
*   **Provide a code example or a link to a live example if possible.**
*   **Describe the expected behavior and the actual behavior.**
*   **Include your browser and OS information.**

Thank you for contributing to SquibView! 