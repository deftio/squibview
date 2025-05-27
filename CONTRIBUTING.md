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

SquibView uses a combination of `npm version` and custom shell scripts to manage versioning, builds, and testing in an integrated way.

### Source of Truth for Version

The canonical version number is stored in `package.json`. The `src/version.js` file, which makes the version available at runtime, is *generated* from `package.json`.

### Scripts

*   **`tools/updateVersion.js`**: This Node.js script reads the version from `package.json` and writes it into `src/version.js`. It's typically not run directly but is called by other scripts.

*   **`build-and-test.sh`**: This script is designed for more formal builds or when you want to test a specific version that you've manually set in `package.json`.
    *   **How to use it:**
        1.  Manually update the `version` in `package.json` (e.g., `npm version patch`, `npm version minor`, or edit directly).
        2.  Commit the `package.json` (and `package-lock.json`) changes.
        3.  Run `./build-and-test.sh`.
    *   **What it does:**
        1.  Runs `node tools/updateVersion.js` to update `src/version.js`.
        2.  Runs `npm run build` (full build).
        3.  Runs `npm test`.
    *   **Why use it:** Ensures `src/version.js` is synchronized with `package.json` before a build and that tests pass with the new version.

*   **`dev-bump-build-test.sh`**: This script is tailored for rapid development iterations. It automates bumping to a development version, building, and testing.
    *   **How to use it:** Simply run `./dev-bump-build-test.sh` from the project root.
    *   **What it does:**
        1.  Determines the current version from `package.json`.
        2.  If the current version is a pre-release (e.g., `0.0.39-dev.0`), it increments the pre-release part (e.g., to `0.0.39-dev.1`).
        3.  If the current version is a stable release (e.g., `0.0.39`), it first bumps the patch version (e.g., to `0.0.40`) and then creates an initial pre-release (e.g., `0.0.40-dev.0`). This is done using `npm version patch --no-git-tag-version` followed by `npm version prerelease --preid dev --no-git-tag-version`.
        4.  Runs `node tools/updateVersion.js` to update `src/version.js`.
        5.  Runs `npm run build` (full build).
        6.  Runs `npm test`.
    *   **Why use it:** Streamlines the process of creating new development versions. The `--no-git-tag-version` flag is used with `npm version` to prevent creating git tags automatically during these development bumps, keeping the commit history cleaner. Tags should be created manually for official releases.

*   **Full Build (ESM, UMD, Standalone):** `npm run build` - This is the standard build command defined in `package.json`, usually invoking Rollup.
*   **Lite Build (ESM & UMD only, faster for local development):** `npm run build:main && npm run build:esm`. You might need to create a specific `build:lite` script in `package.json` (e.g., `"build:lite": "rollup -c --environment BUILD:main && rollup -c --environment BUILD:esm"`) if one doesn't exist, as suggested in the development plan documents. This can speed up build times during active development by skipping the standalone bundle.

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