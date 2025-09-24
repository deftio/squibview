# SquibView Documentation

Welcome to the SquibView documentation! This directory contains comprehensive documentation for the SquibView library.

## Documentation Structure

### 📚 [API Reference](./api/)
Complete API documentation for SquibView classes and methods.
- [SquibView Class](./api/SquibView.md) - Main editor class
- [Methods](./api/methods.md) - All public methods
- [Options](./api/options.md) - Configuration options
- [Events](./api/events.md) - Event system reference

### 📖 [Guides](./guides/)
Step-by-step guides and tutorials.
- [Getting Started](./guides/getting-started.md)
- [Installation](./guides/installation.md)
- [Headless Mode](./guides/headless-mode.md) - Using SquibView without UI
- [Programmer's Guide](./programmers-guide.md) - Comprehensive usage guide

### 🔧 [Development](./development/)
Documentation for contributors and developers.
- [Development Guide](./development/DEVELOPMENT.md)
- [Contributing](./development/CONTRIBUTING.md)
- [Release Process](./development/do-release.md)

### 📝 [Examples](./examples/)
Code examples and demos.
- [Basic Examples](../examples/) - HTML example files
- [Demo Content](./examples/gif-demo-content.md)
- [Demo Guide](./examples/demos.md)

### 🖥️ [CLI Documentation](./cli/)
Command-line interface documentation.
- [CLI Guide](./cli/CLI.md) - Using the squibv CLI tool
- [CLI Readme](./cli/README.md) - Quick reference

### 📋 Other Documentation
- [Release Notes](./release-notes.md) - Complete version history and changelog
- [Selection API](./selection-api.md) - Working with text selection
- [UMD Build Configuration](./umd-build-configuration.md) - Build setup guide

## Quick Links

- **Repository:** [GitHub](https://github.com/deftio/squibview)
- **NPM Package:** [squibview](https://www.npmjs.com/package/squibview)
- **CDN:** Available via jsDelivr and unpkg

## Getting Started

### Installation

```bash
npm install squibview
```

### Basic Usage

```javascript
import SquibView from 'squibview';
import 'squibview/dist/squibview.css';

const editor = new SquibView('#editor', {
  initialContent: '# Hello World',
  inputContentType: 'md',
  initialView: 'split'
});
```

### CDN Usage

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/squibview/dist/squibview.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/squibview/dist/squibview.umd.min.js"></script>

<script>
  const editor = new SquibView('#editor');
</script>
```

## Features

- **Multi-format Support:** Markdown, HTML, RevealJS presentations, CSV/TSV
- **Live Preview:** Real-time rendering with split-screen view
- **Syntax Highlighting:** Code block highlighting with highlight.js
- **Diagrams:** Mermaid diagram support
- **Math:** LaTeX math rendering with MathJax
- **Maps:** GeoJSON/TopoJSON visualization
- **3D Models:** STL file viewing
- **Revision History:** Undo/redo with diff-based history
- **Copy Support:** Smart clipboard operations
- **Line Numbers:** Optional line numbering
- **Plugin System:** Extensible renderer architecture

## Version

See [release-notes]/(./docs/release-notes.md)

## License

MIT License - See [LICENSE](../LICENSE.txt) for details

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/deftio/squibview).