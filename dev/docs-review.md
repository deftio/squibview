# SquibView Documentation Review and Overhaul Plan

This document outlines a comprehensive plan to restructure, enhance, and beautify the entire documentation suite for SquibView. The goal is to create a clear, welcoming, and professional set of documents that makes it easy for users to get started and for developers to contribute.

## 1. Core Philosophy: Audience and Structure

The documentation will be restructured around two primary audiences: **Users** and **Contributors**. The `README.md` will serve as the main entry point, quickly directing each audience to the resources they need.

-   **For Users:** People who want to use SquibView in their projects or as a CLI tool. They need to know *what* it does and *how* to use it quickly.
-   **For Contributors:** People who want to fix bugs, add features, or improve the codebase. They need to know *how* the project is built, tested, and structured.

## 2. Proposed Documentation Structure

```
squibview/
├── README.md           # High-level overview, quick start, and main entry point
├── CONTRIBUTING.md     # Guide for developers who want to contribute code
├── examples/           # Self-contained, runnable examples (will be referenced heavily)
└── docs/
    ├── home.md             # (New) Landing page for detailed docs (can be a copy of README)
    ├── guides/
    │   ├── 01-quick-start.md # (New) Fast track for getting SquibView running
    │   ├── 02-installation.md  # (New) Detailed build/bundle guide (ESM, UMD, Standalone)
    │   ├── 03-basic-usage.md   # (New) Instantiation and core methods (setContent, etc.)
    │   └── 04-cli-usage.md     # (Expanded from squibv.md) CLI commands and examples
    ├── features/
    │   ├── 01-markdown-support.md # (New) Details on GFM, tables, etc.
    │   ├── 02-graphical-content.md# (New) Mermaid, MathJax, SVG, and GeoJSON support
    │   └── 03-exporting.md        # (New) How to use copy/export functions
    ├── api/
    │   ├── 01-options.md       # (New) Detailed breakdown of all constructor options
    │   └── 02-methods.md       # (New) Reference for public methods (.setContent, .getContent, etc.)
    │   └── 03-events.md        # (New) Documenting the event system
    └── development/
        ├── 01-build-system.md  # (From CONTRIBUTING.md) Explaining Rollup builds
        └── 02-testing.md       # (From CONTRIBUTING.md) How to run and debug tests
```

## 3. Detailed Plan for Each Document

### `README.md` (The "Front Door")

-   **Goal:** Grab attention, explain the "what" and "why" of SquibView, and provide an immediate "wow" factor.
-   **Structure:**
    1.  **Header:** Keep badges (NPM, License, Build).
    2.  **Elevator Pitch:** A concise, one-sentence description of SquibView.
    3.  **Visual Demo:** A high-quality animated GIF or a prominent link to a polished live demo showing off the best features (Mermaid, split view, etc.).
    4.  **Key Features:** A bulleted list of the most compelling features (use emojis for visual appeal).
    5.  **Quickest Start (CLI):** Show the single `npx squibv document.md` command.
    6.  **Quickest Start (Component):** Show the *easiest* way to get it in a browser (standalone UMD from CDN).
    7.  **"Where to Go Next":** Clear, large links:
        -   **"➡️ Get Started Using SquibView"** -> `docs/guides/01-quick-start.md`
        -   **"➡️ Want to Contribute?"** -> `CONTRIBUTING.md`
    8.  Remove the long installation, configuration, and testing sections. Move that content into the `docs/` folder.

### `CONTRIBUTING.md` (The "Contributor's Guide")

-   **Goal:** Make the process of contributing as frictionless as possible.
-   **Structure:**
    1.  **"How You Can Help":** Start with a welcoming section that lists ways to contribute (reporting bugs, submitting PRs, improving docs).
    2.  **Your First Contribution:** A step-by-step guide for first-timers (fork, clone, branch, install).
    3.  **Development Workflow:** A simplified day-to-day guide.
    4.  **Project Structure:** A brief overview of the `src/`, `cli/`, `dist/`, `tests/` directories.
    5.  **Links to Deeper Dives:**
        -   "Understanding the Build System" -> `docs/development/01-build-system.md`
        -   "How to Test Your Changes" -> `docs/development/02-testing.md`
    6.  **Code Style & PR Guidelines:** Keep this section clear and concise.

### `docs/` Folder (The "User Manual")

#### `guides/`

-   **`01-quick-start.md`**: The fastest way to see SquibView in action. Combine the CLI and component quick starts from the new README.
-   **`02-installation.md`**: Explain the different build types (ESM, UMD, Standalone) in detail.
    -   Provide clear code examples for each.
    -   Explain *when* to use each one (e.g., "Use ESM if you have a build step like Vite/Webpack," "Use Standalone for CodePen/prototypes").
    -   Clarify the difference between the "regular" and "standalone" builds.
-   **`03-basic-usage.md`**: Cover the fundamentals of creating a SquibView instance and using its main methods.
-   **`04-cli-usage.md`**: The dedicated, in-depth guide for the CLI tool.

#### `features/`

-   **`01-markdown-support.md`**: Detail the specific flavor of Markdown and what's supported.
-   **`02-graphical-content.md`**: Show off the "wow" features. One page dedicated to visual content with clear examples for each.
-   **`03-exporting.md`**: Explain how the `copyHTML`, `copySource`, and other export-related functions work, including the nuances of how images are handled.

#### `api/`

-   This will be the technical reference.
-   **`01-options.md`**: An exhaustive list of every constructor option, its type, default value, and what it does.
-   **`02-methods.md`**: A list of all public methods with their signatures, parameters, and return values.
-   **`03-events.md`**: Documentation on the event system (`.on()`, `.emit()`) if it's intended for public use.

#### `development/`

-   This section will contain the detailed information moved from `CONTRIBUTING.md`.
-   **`01-build-system.md`**: The deep dive on Rollup, build targets, and scripts.
-   **`02-testing.md`**: The deep dive on Jest, Puppeteer, and debugging strategies.

## 4. Visuals and Examples

-   **"Beautiful" Docs:** Use consistent formatting, code highlighting, and visual aids (screenshots, GIFs).
-   **Runnable Examples:** Every code block should be copy-paste-runnable.
-   **Link to `examples/`:** Actively link from the documentation pages to the corresponding files in the `examples/` directory so users can see the code in a full, working context. A table in `examples/README.md` could be created to describe what each example file demonstrates.

This plan provides a clear path to creating a high-quality, user-centric documentation suite. 