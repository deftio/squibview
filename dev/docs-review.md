# SquibView Documentation Review and Overhaul Plan

This document outlines a comprehensive plan to restructure, enhance, and beautify the entire documentation suite for SquibView. The goal is to create a clear, welcoming, and professional set of documents that makes it easy for users to get started and for developers to contribute.

## 1. Core Philosophy: Audience and Structure

The documentation will be restructured around two primary audiences: **Users** and **Contributors**. The `README.md` will serve as the main entry point, quickly directing each audience to the resources they need.

-   **For Users:** People who want to use SquibView in their projects or as a CLI tool. They need to know *what* it does and *how* to use it quickly.
-   **For Contributors:** People who want to fix bugs, add features, or improve the codebase. They need to know *how* the project is built, tested, and structured.

### A Note on File Structure: Many Small vs. Few Long Files

The proposed structure uses multiple, focused Markdown files rather than a few long ones. This is a deliberate choice with the following advantages:

-   **Findability:** It's much easier for a user to find a specific topic (e.g., "CLI Usage") from a clear navigation menu than to scroll through a massive single page.
-   **Linkability:** We can easily link directly to a specific page or section (e.g., `.../api/02-methods.md#setContent`).
-   **Maintainability:** Smaller files are easier to update and manage.
-   **Less Overwhelming:** A new user isn't presented with a "wall of text." They can digest the information in smaller, more manageable chunks.

The key to making this work is excellent navigation. The final documentation site should have a persistent sidebar menu that clearly shows the structure and the user's current location.

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
    │   └── 02-methods.md       # (New) Ref for public methods (.setContent, .getContent, etc.)
    │   └── 03-events.md        # (New) Documenting the event system
    └── development/
        ├── 01-build-system.md  # (From CONTRIBUTING.md) Explaining the build process
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
-   **`01-build-system.md`**: The deep dive on the build process. It will cover:
    -   **Build Types:** Detailed explanations of the UMD, ESM, and CLI builds.
    -   **Dependency Handling:** A clear breakdown of the different build strategies and when to use them:
        -   **Library builds:** The standard, lean builds that require external dependencies.
        -   **Standalone builds:** The fully bundled versions that include all dependencies for easy, drop-in use.
    -   **How it Works:** An overview of the Rollup configuration and custom build scripts.
-   **`02-testing.md`**: A comprehensive guide to testing, including Jest, Puppeteer, and debugging strategies.

## 4. Visuals and Examples

-   **"Beautiful" Docs:** Use consistent formatting, code highlighting, and visual aids (screenshots, GIFs).
-   **Runnable Examples:** Every code block should be copy-paste-runnable.
-   **Link to `examples/`:** Actively link from the documentation pages to the corresponding files in the `examples/` directory so users can see the code in a full, working context. A table in `examples/README.md` could be created to describe what each example file demonstrates.

## 5. HTML Documentation Generation and Build Process

### Current State and Issues
- Currently using `docbat.js` (npm package) to convert README.md to index.html for local repo serving
- Should migrate to using `squibv` CLI tool for HTML generation (currently has dependency issues)
- Need automated HTML generation for all documentation files

### Proposed HTML Generation Workflow

#### Phase 1: Fix squibv CLI Dependencies
- **Task**: Investigate and resolve dependency issues in squibv CLI tool
- **Goal**: Ensure squibv can reliably generate clean HTML from Markdown with all SquibView features
- **Priority**: High - this is foundational for the rest of the workflow

#### Phase 2: Automated Documentation Build
- **Replace docbat.js**: Use `squibv` to generate `index.html` from `README.md`
- **Batch Convert docs/**: Create script to convert all `.md` files in `docs/` directory to `.html` files
- **Generate Navigation**: Create `docs/index.html` with navigation links to all documentation sections
- **Build Integration**: Add documentation HTML generation to the main build process

#### Phase 3: Documentation Site Structure
```
squibview/
├── index.html              # Generated from README.md using squibv
├── docs/
│   ├── index.html          # Generated navigation page
│   ├── home.html           # Generated from home.md
│   ├── guides/
│   │   ├── index.html      # Section navigation
│   │   ├── 01-quick-start.html
│   │   ├── 02-installation.html
│   │   ├── 03-basic-usage.html
│   │   └── 04-cli-usage.html
│   ├── features/
│   │   ├── index.html      # Section navigation
│   │   ├── 01-markdown-support.html
│   │   ├── 02-graphical-content.html
│   │   └── 03-exporting.html
│   ├── api/
│   │   ├── index.html      # Section navigation
│   │   ├── 01-options.html
│   │   ├── 02-methods.html
│   │   └── 03-events.html
│   └── development/
│       ├── index.html      # Section navigation
│       ├── 01-build-system.html
│       └── 02-testing.html
```

#### Phase 4: Build Scripts and Automation
- **`npm run build-docs`**: Generate all HTML documentation files
- **`npm run serve-docs`**: Start local server for documentation browsing
- **Watch Mode**: Auto-regenerate HTML when Markdown files change during development
- **CI Integration**: Ensure documentation HTML is built and up-to-date in releases

### Benefits of This Approach
1. **Self-Hosting**: Users can serve documentation locally without external dependencies
2. **Consistency**: All documentation uses SquibView's own rendering engine
3. **Feature Showcase**: Documentation demonstrates SquibView's capabilities (Mermaid, math, etc.)
4. **Offline Capable**: Documentation works in air-gapped environments
5. **Professional Appearance**: Clean, consistent styling across all documentation

### Implementation Priority
1. **Fix squibv CLI dependencies** (blocker for everything else)
2. **Create basic HTML generation script** for README.md and docs/
3. **Generate navigation index files** for easy browsing
4. **Integrate into build process** and npm scripts
5. **Add watch mode and development workflow** improvements

This plan provides a clear path to creating a high-quality, user-centric documentation suite with professional HTML output.

## README.md Content Strategy & Outline

### Current Issues with README.md
1. **Poor "above the fold" content** - doesn't immediately sell SquibView's value proposition
2. **Missing links to documentation** - no clear path from homepage to comprehensive docs
3. **Weak value proposition** - doesn't clearly explain why someone should choose SquibView
4. **No visual hierarchy** - all content feels equal weight, no prioritization for key messages

### Target Audience Analysis
- **Primary**: Web developers looking for markdown rendering solutions
- **Secondary**: Documentation writers, technical writers, educators
- **Use cases**: Component integration, CLI documentation generation, rapid prototyping

### Proposed README.md Structure

#### 1. Hero Section (Above the Fold)
**Goal**: Immediately communicate value and get users excited

```markdown
# SquibView
*The most powerful markdown renderer for modern web applications*

[![NPM Version](https://img.shields.io/npm/v/squibview.svg)](https://www.npmjs.com/package/squibview)
[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/deftio/squibview/ci.yml?branch=main&style=flat&logo=github&label=Build&color=blue)](https://github.com/deftio/squibview/actions/workflows/ci.yml)

**Transform markdown into rich, interactive content with zero configuration.**

SquibView renders GitHub-Flavored Markdown with live Mermaid diagrams, interactive maps, 3D models, math equations, and syntax-highlighted code—all in real-time.

[🚀 **Try the Live Demo**](https://deftio.github.io/squibview/examples/example_ESM.html) | [📖 **Read the Docs**](./docs/home.html) | [⚡ **Quick Start**](./docs/guides/01-quick-start.html)
```

#### 2. Visual Proof Section
**Goal**: Show, don't tell—immediate visual impact

```markdown
## See SquibView in Action

<img src="./squibview-example.png" alt="SquibView rendering Mermaid diagrams, math equations, and interactive content" width="100%">

**What you're seeing:**
- 📊 Live Mermaid diagrams that update as you type
- 🧮 LaTeX math equations rendered with MathJax  
- 🗺️ Interactive GeoJSON maps with Leaflet
- 🎯 Syntax-highlighted code blocks
- 📱 Responsive design that works everywhere
```

#### 3. Quick Win Section
**Goal**: Get users to success in under 30 seconds

```markdown
## Get Started in 30 Seconds

### Option 1: CLI (Perfect for Documentation)
```bash
npx squibv document.md
# Creates a beautiful, standalone HTML file instantly
```

### Option 2: Component (Perfect for Apps)
```html
<script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
<div id="editor"></div>
<script>
  new SquibView({
    element: document.getElementById('editor'),
    content: '# Hello **SquibView**! 🚀'
  });
</script>
```
**That's it!** Your markdown is now rendering with all advanced features enabled.
```

#### 4. Why Choose SquibView Section
**Goal**: Differentiate from competitors with unique selling points

```markdown
## Why Developers Choose SquibView

| Feature | SquibView | Other Solutions |
|---------|-----------|-----------------|
| **Zero Config** | ✅ Works out of the box | ❌ Complex setup required |
| **Rich Content** | ✅ Diagrams, maps, 3D, math | ❌ Basic markdown only |
| **Live Preview** | ✅ Real-time rendering | ❌ Static or slow updates |
| **Offline Ready** | ✅ Self-contained builds | ❌ CDN dependencies |
| **Bidirectional** | ✅ Edit in source or preview | ❌ One-way rendering |
| **Enterprise Ready** | ✅ Air-gapped environments | ❌ Internet required |

### 🎯 Perfect For:
- **Documentation sites** that need rich content
- **Technical blogs** with code and diagrams  
- **Educational platforms** with math and visualizations
- **Internal tools** requiring offline operation
- **Rapid prototyping** of content-rich applications
```

#### 5. Feature Showcase Section
**Goal**: Highlight unique capabilities that competitors can't match

```markdown
## Unique Capabilities

### 📊 Live Diagrams & Visualizations
- **Mermaid diagrams** - Flowcharts, sequence diagrams, Gantt charts
- **GeoJSON/TopoJSON maps** - Interactive geographic visualizations
- **STL 3D models** - Three.js powered 3D model viewer
- **Math equations** - LaTeX rendering with MathJax

### ⚡ Developer Experience
- **Multiple builds** - ESM, UMD, Standalone options
- **Framework agnostic** - Works with React, Vue, Angular, or vanilla JS
- **Plugin system** - Extend with custom renderers
- **TypeScript support** - Full type definitions included

### 🏢 Enterprise Features
- **Offline bundles** - Zero external dependencies
- **Custom styling** - Complete CSS control
- **Security focused** - No remote code execution
- **Professional support** - BSD-2 licensed
```

#### 6. Navigation & Next Steps Section
**Goal**: Guide users to appropriate resources based on their needs

```markdown
## Documentation & Resources

### 📚 **Complete Documentation**
- [📖 **Documentation Home**](./docs/home.html) - Start here for comprehensive guides
- [⚡ **Quick Start Guide**](./docs/guides/01-quick-start.html) - Get running in minutes
- [🔧 **Installation Options**](./docs/guides/02-installation.html) - Choose the right build
- [💻 **CLI Reference**](./docs/guides/04-cli-usage.html) - Master the command line

### 🎯 **By Use Case**
- [🧩 **Component Integration**](./docs/guides/03-basic-usage.html) - Embed in your app
- [📄 **Documentation Generation**](./docs/guides/04-cli-usage.html) - Build docs with CLI
- [🎨 **Custom Styling**](./docs/api/01-options.html) - Customize appearance
- [🔌 **Plugin Development**](./docs/development/) - Extend functionality

### 🌟 **Examples & Demos**
- [🚀 **Live Demo**](https://deftio.github.io/squibview/examples/example_ESM.html) - Try all features
- [📁 **Example Projects**](./examples/) - Copy-paste implementations
- [🎮 **Interactive Tutorial**](./docs/guides/01-quick-start.html) - Hands-on learning
```

### Key Messaging Principles
1. **Value-first**: Lead with benefits, not features
2. **Social proof**: Show the badge, mention adoption
3. **Urgency**: "30 seconds", "instantly", "zero config"
4. **Differentiation**: Clear comparison with alternatives
5. **Progressive disclosure**: Easy start → deep capabilities
6. **Multiple entry points**: Different paths for different users

### Success Metrics
- **Immediate value perception**: Users understand SquibView's benefits within 10 seconds
- **Quick success**: Users can generate their first output within 30 seconds
- **Clear navigation**: Users know exactly where to go next for their specific needs
- **Competitive advantage**: Users understand why SquibView vs alternatives 