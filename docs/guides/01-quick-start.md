# Quick Start

Get SquibView running in just a few minutes!

## CLI Quick Start

The fastest way to see SquibView in action is using the CLI tool:

```bash
npx squibv document.md
```

This will generate an HTML file from your Markdown document with all features enabled.

### Example

```bash
# Create a sample markdown file
echo "# Hello SquibView\n\nThis is **bold** text.\n\n\`\`\`mermaid\nflowchart TD\n    A[Start] --> B[Process]\n    B --> C[End]\n\`\`\`" > sample.md

# Convert to HTML
npx squibv sample.md

# Open sample.html in your browser
```

## Component Quick Start

For web applications, the easiest setup uses autoload:

```html
<!DOCTYPE html>
<html>
<head>
    <title>SquibView Example</title>
    <link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">
</head>
<body>
    <div id="editor" style="height: 500px;"></div>

    <script type="module">
        import SquibView from 'https://unpkg.com/squibview/dist/squibview.esm.min.js';

        const editor = new SquibView('#editor', {
            initialContent: '# Hello World\n\nThis is **SquibView** in action!\n\n```mermaid\ngraph TD\n  A --> B\n```',
            autoload_deps: { all: true }  // Enable autoloading
        });
    </script>
</body>
</html>
```

Libraries like Mermaid, MathJax, and syntax highlighting load automatically when needed!

## Next Steps

- **[Installation Guide](./02-installation.md)** - Choose the right build for your project
- **[Basic Usage](./03-basic-usage.md)** - Learn the core functionality
- **[Features Overview](../features/01-markdown-support.md)** - Explore what SquibView can do