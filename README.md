# SquibView

[Live Demo (github)](https://deftio.github.io/squibview/examples/example_ESM.html)

[Live Demo (local)](./examples/example_ESM.html)

SquibView is a javascript embeddable for converting GitHub-flavored Markdown (or full HTML pages) into a rendered view on the fly. 

For markdown inputs, it supports rendering Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics, providing a powerful and interactive way to view and export your Markdown content as HTML.

For HTML inputs, it creates a complete embedded iframe to view the content.  

## Web Viewer

SquibView can be used as a standalone tool for taking complex markdown output (such as from OpenAI, Claude, Mistral, or Deepseek) or a simple live preview markdown editor.  

## As a Component

Squibview also can be used as an embedddable component in your app, where you can feed it complex markdown or other content and then render it on the fly.  Squibview can dynamically switch between showing a splitscreen of both the source and output or just the output so one can use it as renderer.  

### Using via CDN

Squibview is available on unpkg and npm.  

## Examples

See the [examples folder](./examples)

## Features

- **Live Preview**: See the rendered HTML output in real-time as you edit your Markdown.
- **Multiple Views**: Switch between Markdown editor, HTML preview, or split view using simple buttons.
- **Graphical Support**: Render Mermaid diagrams, inline SVG graphics, and other visual formats directly from Markdown.
- **Syntax Highlighting**: Code blocks are automatically highlighted using Highlight.js.
- **Table Styling**: Tables are rendered cleanly with improved readability.
- **Easy Export**: Export or copy the generated HTML for use in other projects or documentation.

## Getting Started

**Clone the Repository:**
```bash
git clone https://github.com/deftio/squibview.git
cd squibview
```

Open the Application: Since this is a static HTML project, simply open index.html in your preferred web browser:

Double-click index.html or
Right-click index.html and choose "Open with" your browser.
Use the Converter:

Select a view mode (md, html, split) using the buttons at the top.
Enter your GitHub-flavored Markdown into the editor on the left (in split or md view).
The right side will render the HTML output live, complete with diagrams, code highlighting, and more.

## Contributing

Contributions are welcome! Whether you're adding new features, fixing bugs, or improving documentation, please follow these guidelines:

Fork the Repository: Click the "Fork" button on GitHub to create your own copy.

**Create a Branch:**
```bash
git checkout -b feature/your-feature-name
```

**Commit Your Changes:** Make your changes and commit them with a clear message.

```bash
git commit -m "Add description of changes"
```

**Push to Your Fork:**

```bash
git push origin feature/your-feature-name
```

**Open a Pull Request:** Go to the original repository on GitHub and open a pull request from your fork's branch. Provide a clear description of your changes and why they’re useful.

Please make sure your contributions follow the project's coding style and that tests pass, if applicable.

## License

This project is licensed under the BSD-2 License. See the LICENSE file for details.
