# SquibView CLI Documentation

The SquibView CLI (`squibv`) is a command-line tool that converts Markdown files into high-quality HTML documents using SquibView's powerful rendering engine. It supports all the advanced features that make SquibView special, including math expressions, Mermaid diagrams, CSV tables, SVG graphics, and syntax-highlighted code blocks.

## Why SquibView CLI?

### Beyond Standard Markdown

Unlike basic markdown converters, SquibView CLI provides:

- **Rich Content Support**: Math (MathJax), diagrams (Mermaid), SVG graphics, CSV/TSV tables
- **Advanced Code Highlighting**: Syntax highlighting for dozens of programming languages  
- **Self-Contained Output**: Generate fully portable HTML files that work offline
- **Professional Styling**: Clean, readable default styles with customization options
- **Government/Enterprise Ready**: Offline bundling for environments without internet access

### Use Cases

- **Documentation Generation**: Convert technical docs with math, diagrams, and code
- **Static Site Generation**: Create standalone HTML pages for websites
- **Report Generation**: Build professional reports with tables, charts, and formatting
- **Offline Environments**: Generate fully self-contained files for air-gapped systems
- **CI/CD Integration**: Automate document generation in build pipelines
- **Academic Publishing**: Convert research papers with mathematical notation

## Installation

### NPX (Recommended)
```bash
# No installation required - run directly
npx squibv document.md
```

### Global Installation
```bash
npm install -g squibview
squibv document.md
```

### Local Project Installation
```bash
npm install squibview
npx squibv document.md
```

## Basic Usage

### Simple Conversion
```bash
# Convert markdown to HTML
squibv document.md

# Specify output file
squibv document.md -o report.html

# Use alias command
squibv build document.md -o report.html
```

### Advanced Features
```bash
# Bundle all dependencies offline (4MB+ but fully self-contained)
squibv document.md --bundle-offline

# Custom CSS styling
squibv document.md --css custom-theme.css

# Watch for changes and rebuild automatically
squibv document.md --watch
```

## Command Reference

### Basic Commands
```bash
squibv <file.md>              # Convert markdown file
squibv build <file.md>        # Explicit build command
squibv --help                 # Show help
squibv --version              # Show version
```

### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--input <source>` | `-i` | Input source (file path or "-" for stdin) | Positional argument |
| `--output <dest>` | `-o` | Output destination (file path, "-" or "stdout" for stdout) | `input.html` |
| `--standalone` | `-s` | Create self-contained HTML | `true` |
| `--css <file>` | | Custom CSS file | Default styles |
| `--bundle-offline` | | Bundle all libraries locally | CDN links |
| `--log <file>` | | Log file for messages | stderr |
| `--quiet` | | Suppress progress messages | Off |
| `--watch` | `-w` | Watch file and rebuild on changes | Off |

### Examples

#### Document Conversion
```bash
# Basic conversion
squibv README.md

# Professional report with custom styling
squibv report.md --css corporate-theme.css -o quarterly-report.html

# Academic paper with offline bundling
squibv research-paper.md --bundle-offline -o paper.html
```

#### Development Workflow
```bash
# Live development with auto-rebuild
squibv documentation.md --watch

# Custom output location
squibv src/docs/api.md -o dist/api-docs.html
```

#### Pipeline Workflows
```bash
# Read from stdin, write to stdout
cat document.md | squibv -i - -o - > output.html

# Clean pipeline (no progress messages)
curl -s https://api.github.com/repos/user/repo/readme | \
  jq -r .content | base64 -d | \
  squibv -i - -o - --quiet > readme.html

# Chain with compression
cat report.md | squibv -i - -o - | gzip > report.html.gz

# Process with logging
squibv document.md --log conversion.log --quiet
```

#### CI/CD Integration
```bash
# Build all documentation
for file in docs/*.md; do
  squibv "$file" -o "dist/$(basename "$file" .md).html" --log build.log
done

# Generate offline documentation package
squibv documentation.md --bundle-offline -o standalone-docs.html

# Pipeline processing in CI
find docs/ -name "*.md" | \
  xargs -I {} squibv {} --log ci.log --quiet
```

## Advanced Markdown Features

SquibView CLI supports all the advanced features of the SquibView editor:

### Mathematical Expressions
```markdown
Inline math: $E = mc^2$

Display math:
$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

Fenced math blocks:
\`\`\`math
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\`\`\`
```

### Mermaid Diagrams
```markdown
\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B --> C[Option 1]
    B --> D[Option 2]
\`\`\`
```

### Data Tables
```markdown
\`\`\`csv
Name,Age,City
Alice,30,New York
Bob,25,Los Angeles
\`\`\`

\`\`\`tsv
Name	Age	City
Alice	30	New York
\`\`\`
```

### SVG Graphics
```markdown
\`\`\`svg
<svg width="200" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>
\`\`\`
```

### Code Highlighting
```markdown
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`
```

## Output Modes

### CDN Mode (Default)
- **Size**: Small (~7KB)
- **Dependencies**: Requires internet for MathJax/Mermaid
- **Use Case**: Online environments, smaller files
- **Command**: `squibv document.md`

### Offline Bundle Mode
- **Size**: Large (~5MB)
- **Dependencies**: Fully self-contained
- **Use Case**: Air-gapped systems, archival, reliability
- **Command**: `squibv document.md --bundle-offline`

## Styling and Customization

### Default Styles
SquibView CLI includes professional default styles:
- Clean typography with system fonts
- Responsive design for mobile/desktop
- Syntax highlighting for code blocks
- Professional table styling
- Print-optimized layouts

### Custom CSS
```bash
# Override with custom styles
squibv document.md --css my-theme.css
```

Example custom CSS:
```css
/* Override default styles */
body {
  font-family: 'Georgia', serif;
  background-color: #f8f9fa;
}

h1, h2, h3 {
  color: #2c3e50;
}

.mermaid {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
```

## Integration Examples

### GitHub Actions
```yaml
name: Generate Documentation
on: [push]
jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npx squibv README.md -o docs/index.html
      - run: npx squibv API.md --bundle-offline -o docs/api.html
```

### npm Scripts
```json
{
  "scripts": {
    "docs": "squibv README.md -o dist/documentation.html",
    "docs:watch": "squibv README.md --watch",
    "docs:offline": "squibv README.md --bundle-offline -o standalone.html"
  }
}
```

### Makefile
```makefile
docs: README.md
	squibv README.md -o docs/index.html

docs-offline: README.md
	squibv README.md --bundle-offline -o docs/offline.html

.PHONY: docs docs-offline
```

## Troubleshooting

### Common Issues

**File not found errors**
```bash
# Use absolute paths if needed
squibv /full/path/to/document.md
```

**Permission errors**
```bash
# Check file permissions
ls -la document.md
chmod 644 document.md
```

**Large file sizes with --bundle-offline**
- This is expected (~5MB) for full offline capability
- Use regular mode for smaller files with internet dependency

**Math not rendering**
- Ensure proper LaTeX syntax in math blocks
- Check browser console for MathJax errors

**Mermaid diagrams not showing**
- Verify mermaid syntax is correct
- Check browser console for rendering errors

### Performance Tips

- Use `--bundle-offline` for maximum reliability
- Use regular mode for faster builds and smaller files
- Custom CSS can significantly impact file size
- Watch mode is efficient for development workflows

## Technical Details

### Dependencies
- **Node.js**: >= 14.0.0
- **Core Libraries**: MathJax 3, Mermaid 11, Highlight.js 11
- **Build Tool**: Commander.js for CLI, jsdom for headless rendering

### File Processing
1. **Parse**: Markdown parsed with SquibView's enhanced markdown-it
2. **Render**: Headless browser simulation with jsdom
3. **Process**: Special content types (math, diagrams, tables) processed
4. **Bundle**: CSS and JavaScript embedded or linked
5. **Output**: Clean, standalone HTML generated

### Security
- No external network requests during build (except CDN mode)
- Sandboxed execution environment
- No arbitrary code execution from markdown
- Safe handling of SVG and HTML content

---

For more information about SquibView's web editor capabilities, see the [main README](../README.md).