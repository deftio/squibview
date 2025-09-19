# SquibView Refactoring Plan

## 1. Intent and Purpose of SquibView

SquibView is designed as a **headless, embeddable JavaScript component** for 2-way editing and live rendering of various content types. Its core functionality allows users to edit content in either a source view or a rendered WYSIWYG-like view, with changes in one view instantly reflected in the other.

**Key Capabilities:**

*   **Multi-Format Handling:** Natively supports GitHub-Flavored Markdown, HTML, and provides a plugin architecture for additional formats (e.g., CSV, TSV).
*   **Rich Content Rendering:**
    *   Mermaid diagrams for complex visualizations.
    *   Inline SVG graphics.
    *   Syntax-highlighted code blocks.
    *   Mathematical expressions (e.g., via MathJax or KaTeX if integrated).
    *   Well-formatted tables.
*   **Headless by Design:** Offers a rich programmatic API for all its functionalities, allowing deep integration into various applications.
*   **Optional Basic Controls:** Provides a simple, activatable set of UI controls for users needing a quick start or basic editing interface.
*   **Robust Editing Features:**
    *   Comprehensive Undo/Redo functionality via a `RevisionManager`.
    *   Cross-platform copy-paste support, intelligently handling rich content.
*   **Versatile Environment Support:**
    *   Works seamlessly in pure JavaScript (via script tags), ESM (ES Modules), and UMD (Universal Module Definition) environments.
    *   Provides wrappers/examples for popular frameworks like React (with potential for Vue, Svelte, etc.).
*   **Standalone Builds:** Offers builds with all dependencies bundled, enabling usage in non-web-centric environments (e.g., Python applications needing a UI component for rendering/editing) via web view wrappers.
*   **Customization:**
    *   Resizable to fit various container dimensions.
    *   CSS themable for full visual customization.

The primary goal is to provide a flexible, powerful, and easy-to-integrate solution for live content editing and rendering across diverse web development scenarios and even beyond traditional web pages.

## 2. Refactoring Goals for Enhanced Maintainability

The following areas are targeted for review and potential refactoring to improve long-term maintainability, code clarity, testability, and reduce coupling.

---

### 2.1. Code Structure & Modularity (Within `src/squibview.js` and Project)

**A. `SquibView` Class Responsibilities & Potential Extractions:**

*   **Current State:** The `SquibView` class orchestrates most of the editor's functionality.
*   **Potential Improvement:** Identify cohesive sets of functionality within `SquibView` that could be extracted into smaller, more focused helper classes or modules.
    *   **DOM Management (`DOMManager`/`UIManager`):**
        *   **Responsibility:** `createStructure`, `adjustLayout`, direct DOM manipulations for main editor panels.
        *   **Benefit:** Decouples core logic from specific DOM construction details, improves testability of DOM logic.
    *   **Renderer Management (`RendererRegistry`/`ContentTypeManager`):**
        *   **Responsibility:** `registerRenderer`, `registerDefaultRenderers`, `renderOutput`, logic for switching between and invoking renderers.
        *   **Benefit:** Centralizes content type handling, makes adding new renderers cleaner.
    *   **Clipboard Operations (`ClipboardManager`):**
        *   **Responsibility:** `copySource`, `copyHTML`, `copyToClipboard`, SVG to PNG conversion, image to data URL for clipboard.
        *   **Benefit:** Isolates complex clipboard logic, easier to manage platform quirks.
    *   **Selection API (`SelectionManager`):**
        *   **Responsibility:** `onTextSelected`, `replaceSelectedText`, `getCurrentSelection`, `clearSelection`, `setSelectionEditable`, `toggleSelectionLock`.
        *   **Benefit:** Consolidates selection-related logic, potentially simplifying interaction with both source and output views.
    *   **Core Layout CSS Injection (if adopted):**
        *   **Responsibility:** Logic to inject a minimal set of CSS rules for fundamental panel layout and visibility into the document head on first instantiation. This ensures structural integrity even if the main `squibview.css` is missing or altered.
        *   **Benefit:** Guarantees "works out of the box" structural behavior. Reduces reliance on external CSS for core layout.
*   **Benefit:** Smaller, more focused classes are easier to understand, test, and maintain. Reduces the cognitive load of the main `SquibView` class.
*   **Effort/Priority:** Medium-High (significant structural change but high impact).

**B. File Granularity:**

*   **Current State:** Most core logic is in `src/squibview.js`.
*   **Potential Improvement:**
    *   Move pure utility functions to `src/utils.js`.
    *   Consider moving default renderer logic (if complex) to separate files (e.g., `src/renderers/markdown_renderer.js`).
    *   If JS-injecting core CSS, the CSS string could be in `src/core-layout.css.js`.
*   **Benefit:** Better organization, `squibview.js` becomes more of an orchestrator.
*   **Effort/Priority:** Low-Medium.

---

### 2.2. State Management

*   **Current State:** State is managed via class properties and options.
*   **Potential Improvement:** Formally document all key state variables, their purpose, and how they are updated. Ensure a clear distinction between initial options and internal dynamic state.
*   **Benefit:** Improved clarity and predictability of component behavior.
*   **Effort/Priority:** Low (primarily documentation and review).

---

### 2.3. Configuration and Options (`defaultOptions`)

*   **Current State:** `defaultOptions` are defined.
*   **Potential Improvement:** Add basic validation or warnings for invalid option values/types during `SquibView` instantiation to aid developer integration.
*   **Benefit:** Better developer experience, quicker debugging of integration issues.
*   **Effort/Priority:** Low-Medium.

---

### 2.4. API Design (Public Methods & Events)

*   **Current State:** A rich API exists. `TinyEmitter` is used for events.
*   **Potential Improvement:** Review API for consistency in naming and parameters. Identify if more events would be beneficial for extensibility (e.g., before/after view change, before/after content set).
*   **Benefit:** Enhanced developer experience and greater flexibility for plugin development.
*   **Effort/Priority:** Medium.

---

### 2.5. Asynchronous Operations

*   **Current State:** `async/await` is used for operations like rendering and copying.
*   **Potential Improvement:** Ensure UI clearly reflects busy/loading states for any longer async operations. Double-check error handling in all async call chains.
*   **Benefit:** Improved user experience and robustness.
*   **Effort/Priority:** Low-Medium.

---

### 2.6. Error Handling

*   **Current State:** Some specific error handling exists (e.g., Mermaid).
*   **Potential Improvement:** Systematically review error handling for:
    *   Graceful error catching in event handlers, rendering, API calls.
    *   Consistent reporting (`console.warn` or custom error events).
    *   Ensuring internal errors don't break the entire editor.
*   **Benefit:** Increased stability and easier debugging.
*   **Effort/Priority:** Medium.

---

### 2.7. Build Process & Environment-Specific Builds

*   **Current State:** Rollup config manages multiple build outputs (ESM, UMD, Standalone, React).
*   **Potential Improvement:**
    *   Thoroughly comment `rollup.config.js` sections.
    *   Review `external` and `globals` settings for each build to ensure correctness and minimize bundle sizes where appropriate.
    *   Ensure React wrapper (`SquibViewReact.js`) follows best practices for props, state, effects, and synchronization with the `SquibView` instance. Look for potential race conditions or inefficient re-renders.
*   **Benefit:** More reliable builds, easier maintenance of the build process, robust framework integration.
*   **Effort/Priority:** Medium.

---

### 2.8. Testing Strategy

*   **Current State:** Jest for unit/integration, Puppeteer for E2E.
*   **Potential Improvement:**
    *   Increase unit test coverage, especially for newly extracted modules/classes.
    *   Add more integration tests for complex interactions (e.g., renderer plugins, advanced clipboard scenarios).
    *   Expand E2E tests to cover all example pages and build types systematically.
    *   Focus on making tests less brittle and easier to maintain.
*   **Benefit:** Higher confidence in code quality, easier to catch regressions.
*   **Effort/Priority:** Ongoing, Medium-High.

---

### 2.9. Documentation (Code, User-Facing, Examples)

*   **Current State:** JSDoc, `README.md`, Programmer's Guide, examples exist.
*   **Potential Improvement:**
    *   Ensure JSDoc is comprehensive for all public APIs and complex internal functions.
    *   Update Programmer's Guide with any architectural changes from refactoring.
    *   Add more examples for specific advanced use cases or plugin development.
*   **Benefit:** Easier for developers to use and contribute to SquibView.
*   **Effort/Priority:** Ongoing, Medium.

---

### 2.10. CSS Strategy: Core Layout vs. Theming

*   **Current State:** `squibview.css` handles both layout and theming, recently refactored to use CSS custom properties.
*   **Decision Point from Discussion:**
    *   **Option 1 (JS-driven core layout - Inline Styles):** Fundamental layout styles (flex containers, panel visibility) are applied directly by JavaScript as inline styles. `squibview.css` focuses on theming these elements and styling their content.
    *   **Option 2 (JS-driven core layout - Injected Classes):** JavaScript injects a `<style>` block with minimal core layout CSS classes on first instantiation. JS then adds/removes these classes. `squibview.css` themes using these classes and CSS variables.
*   **Chosen Direction (To be confirmed, leaning towards Option 2):** Define a minimal set of CSS classes for core panel structure (flex properties, visibility) and have JS ensure these classes and their definitions are present (e.g., by injecting a style tag if necessary on first load). The main `squibview.css` file would then primarily provide the theming (colors, padding, borders, fonts using CSS variables) and styles for non-structural elements.
*   **Benefit:** Ensures SquibView is structurally sound "out of the box" even if `squibview.css` is not loaded or is modified incorrectly. Clearer separation of concerns for CSS.
*   **Effort/Priority:** Medium. 