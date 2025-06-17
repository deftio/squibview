# Squibview CLI Plan

This document outlines the plan for a command-line interface (CLI) for Squibview, implemented in two phases.

## 1. Core Purpose

The primary goal of the Squibview CLI is to provide a versatile tool for converting Markdown files into high-quality HTML documents. The implementation will be split into two phases:

**Phase 1: Static HTML Generation**
- Generate standalone HTML files with embedded styles and scripts, suitable for hosting on any web server
- Focus on the core use case of documentation, articles, and reports
- Lightweight, fast implementation leveraging SquibView's existing markdown processing capabilities

**Phase 2: Interactive Editing** 
- Create HTML files that include the full Squibview editor, allowing for an interactive editing experience directly in the browser
- **Save/Export Functionality:** The interactive view will include controls for saving the current content. Due to browser security policies, this will trigger a file download, prompting the user to save the file as a new `.md` or standalone `.html` document. It will not overwrite the original file directly.

## 2. Features

### Phase 1 Features (Static HTML Generation):

*   **Markdown to HTML Conversion:** Leverage SquibView's complete markdown processing engine, including support for:
    - Standard markdown features
    - Fenced SVG rendering
    - CSV/TSV table generation
    - MathJax integration for math expressions
    - Mermaid diagram rendering
    - Syntax highlighting
*   **Theming/Styling:** Default "nice" CSS for margins, fonts (sans-serif), and overall readability.
    *   **Default Style:** A lightweight, clean, and modern default stylesheet will be bundled and embedded by default.
    *   **Custom Style:** Users can provide their own CSS file via a command-line option to override the default styles.
*   **Self-Contained HTML:** Produce a single HTML file with all CSS and minimal JavaScript bundled, making it portable and easy to share.
*   **Watch Mode:** A "watch" command that automatically recompiles the HTML when the source Markdown file changes.

### Phase 2 Features (Interactive Editing):

*   **Interactive Mode:** Generate an HTML file that includes the full Squibview editor for in-browser editing.
*   **Editor Controls:** In interactive mode, provide options to show editor controls.
*   **Custom Templates:** Allow users to provide their own HTML templates for greater control over the final output.
*   **Serve Mode:** A "serve" command that watches files, rebuilds on changes, and serves locally with live reloading.
*   **Directory Processing:** Support for processing an entire directory of Markdown files, generating a corresponding output directory of HTML files.
*   **Front Matter Support:** Parse YAML front matter in Markdown files to inject metadata (like title, author, date) into the HTML output.

## 3. Command-Line Interface (CLI) Structure

The proposed command structure will be `squibview <command> [options]`.

### Commands:

*   `squibview build <file.md>`: The primary command to generate an HTML file.
    *   **Alias:** `squibview <file.md>` could default to the `build` command.

### Phase 1 Options for `build` command:

*   `--output <file.html>` or `-o <file.html>`: Specify the output file name. If not provided, it will default to the input filename with an `.html` extension (e.g., `input.md` -> `input.html`).
*   `--standalone` or `-s`: Create a self-contained HTML file with all dependencies inlined. This is the default "pure HTML" output.
*   `--css <style.css>`: Specify a custom CSS file to override default styles.
*   `--watch` or `-w`: Watch the input file for changes and automatically rebuild.
*   `--help` or `-h`: Display help information.

### Phase 2 Additional Options:

*   `--interactive` or `-i`: Create an HTML file with the Squibview editor embedded.
*   `--show-controls`: Used with `--interactive` to make editor controls visible. When enabled, this will include controls for saving the content as Markdown or self-contained HTML.
*   `--serve`: (Potentially a separate command) Watch the file, rebuild on changes, and serve it on a local web server with live reloading.
*   `--template <template.html>`: Specify a custom HTML template file.

### Examples:

**Phase 1 Examples:**

1.  **Simple build to static HTML:**
    ```bash
    squibview build my-document.md
    ```

2.  **Build to a specific output file:**
    ```bash
    squibview build my-document.md -o my-masterpiece.html
    ```

3.  **Build with custom CSS:**
    ```bash
    squibview build my-document.md --css custom-theme.css
    ```

4.  **Watch a file for changes and rebuild:**
    ```bash
    squibview build my-document.md --watch
    ```

**Phase 2 Examples:**

5.  **Create an interactive document with the editor:**
    ```bash
    squibview build my-document.md --interactive
    ```

6.  **Create an interactive document with editor controls visible:**
    ```bash
    squibview build my-document.md --interactive --show-controls
    ```

## 4. Technical Implementation Details

### Phase 1 Implementation:

*   **Technology Stack:** The CLI will be built using Node.js to leverage the existing SquibView codebase. `commander` will be used for parsing command-line arguments.
*   **File I/O:** Use Node.js `fs` module for reading Markdown files and writing HTML files.
*   **Markdown Processing:** Utilize SquibView's complete markdown processing engine via headless rendering.
*   **Headless Rendering:** Create a simulated DOM environment using `jsdom` to run SquibView's processing in Node.js, then extract the rendered HTML.
*   **Standalone Output:** Generate self-contained HTML files with embedded CSS and minimal JavaScript for features like MathJax and Mermaid.
*   **Dependencies:** Minimal CLI-specific dependencies (`commander`, `jsdom`, `chokidar` for watch mode).

### Phase 2 Additional Implementation:

*   **Interactive Embedding:** Bundle the full SquibView editor and dependencies into the HTML output.
*   **Template System:** Support for custom HTML templates with variable injection.
*   **Development Server:** Local server with live reload functionality using `express` or similar.
*   **Advanced Bundling:** More sophisticated asset bundling for the interactive mode using Rollup or esbuild.

## 5. Project Structure Integration

*   A new directory `cli/` will be created to house the CLI-specific code.
*   It will be a separate package that depends on the main SquibView library.
*   A `bin` entry will be added to `package.json` to define the `squibview` command.
*   The package will be published to npm, making it easily runnable via `npx squibview` in any project.
    *   **Phase 1 Dependencies:** Minimal dependencies (`commander`, `jsdom`, `chokidar`, `squibview`) listed as `dependencies` for `npx` compatibility.
    *   **Phase 2 Dependencies:** Additional dependencies for interactive features and development server.

## 6. Implementation Phases

### Phase 1 Goals:
*   **Immediate Value:** Deliver a working static HTML generator quickly
*   **Core Functionality:** Leverage SquibView's markdown processing for rich content support
*   **Lightweight Implementation:** Minimal dependencies and fast execution
*   **Foundation:** Establish solid architecture for Phase 2 expansion

### Phase 2 Goals:
*   **Interactive Features:** Full SquibView editor embedding
*   **Advanced Tooling:** Development server, templates, directory processing
*   **Enhanced UX:** Live reload, better error handling, more customization options

## 7. Error Handling and User Feedback

A robust CLI must provide clear and helpful feedback. The following scenarios will be handled gracefully:

*   **File Not Found:** If the input Markdown file does not exist, the CLI will exit with a clear "File not found" error message.
*   **Permission Denied:** If the CLI cannot write to the specified output location, it will report a "Permission denied" error.
*   **Invalid Options:** If the user provides an unknown command or option, the CLI will display the help menu and an appropriate error message.
*   **Parsing Errors:** If the source Markdown or a custom template has syntax errors, the CLI will report the issue clearly. 