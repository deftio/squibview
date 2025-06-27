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

For web applications, use the standalone UMD build from CDN:

```html
<!DOCTYPE html>
<html>
<head>
    <title>SquibView Example</title>
    <script src="https://unpkg.com/squibview/dist/squibview.standalone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/squibview/dist/squibview.min.css">
</head>
<body>
    <div id="editor" style="height: 500px;"></div>
    
    <script>
        const editor = new SquibView({
            element: document.getElementById('editor'),
            content: '# Hello World\n\nThis is **SquibView** in action!'
        });
    </script>
</body>
</html>
```

## Next Steps

- **[Installation Guide](./02-installation.md)** - Choose the right build for your project
- **[Basic Usage](./03-basic-usage.md)** - Learn the core functionality
- **[Features Overview](../features/01-markdown-support.md)** - Explore what SquibView can do