// Demo script for SquibView GIF maker
// Each step defines:
// - content: The markdown content to display
// - description: Description for progress display
// - waitFor: CSS selector to wait for (null for fast typing scenes)
// - renderWait: Time in ms to wait for rendering to complete (default: 100 for typing, 500 for complex)
// - dwellTime: Time in ms to dwell on this scene in the final GIF (default: 100 for typing, 2000 for complex)

const demoScript = [
    // 1-4: Main heading with realistic typing
    { 
        content: '# Squibview', 
        description: 'Start main title', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    { 
        content: '# Squibview Graphical', 
        description: 'Building title', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    { 
        content: '# Squibview Graphical Markdown', 
        description: 'Building title', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    { 
        content: '# Squibview Graphical Markdown Editor', 
        description: 'Complete title', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 300
    },

    // 5-7: Add welcome description
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview**`, 
        description: 'Add description', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor.`, 
        description: 'Complete description', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor. This document shows various features such as live preview, Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics.`, 
        description: 'Full description', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 500
    },
    
    // 8-11: Feature list bullets
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor. This document shows various features such as live preview, Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics.

- Live Preview`, 
        description: 'Add features', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor. This document shows various features such as live preview, Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics.

- Live Preview
- Mermaid Diagrams`, 
        description: 'Add features', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor. This document shows various features such as live preview, Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics.

- Live Preview
- Mermaid Diagrams
- Syntax Highlighting`, 
        description: 'Add features', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor. This document shows various features such as live preview, Mermaid diagrams, syntax-highlighted code blocks, tables, and inline SVG graphics.

- Live Preview  
- Mermaid Diagrams   
- Syntax Highlighting  
- SVG Rendering  
- ESM, UMD, React, Vue  
- Copy & Paste  
- Headless or Built-in Controls  
- On-select selection and more  
- ESM / UMD with CDN via unpkg  
- Standalone Builds (all dependancies included) for offline use  
`, 
        description: 'Complete features', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 500
    },

    // 12-16: Table from sample-content.md
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor.

## Basic Table Example

| Feature |`, 
        description: 'Start table', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor.

## Basic Table Example

| Feature           | Supported |
| -----------------|---------|`, 
        description: 'Table header', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor.

## Basic Table Example

| Feature           | Supported |
| ----------------- | --------- |
| Live Preview      | Yes       |`, 
        description: 'Add row', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor.

## Basic Table Example

| Feature           | Supported |
| ----------------- | --------- |
| Live Preview      | Yes       |
| Mermaid Diagrams  | Yes       |
| Syntax Highlight  | Yes       |`, 
        description: 'More rows', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 100
    },
    {
        content: `# Squibview Graphical Markdown Editor 

Welcome to the **Squibview** live markdown editor.

## Basic Table Example

| Feature           | Supported |
| ----------------- | --------- |
| Live Preview      | Yes       |
| Mermaid Diagrams  | Yes       |
| Syntax Highlight  | Yes       |
| Table Styling     | Yes       |
| GeoJSON           | Yes       |
| Math Equations    | Yes       |
| Images            | Yes       |
| 3D Models         | Yes       |
| Interactive Maps  | Yes       |
| SVG Rendering     | Yes       |`, 
        description: 'Complete table', 
        waitFor: null,
        renderWait: 100,
        dwellTime: 1000
    },

    // 17: Mermaid diagram from sample-content.md 
    {
        content: `# Squibview Graphical Markdown Editor 

## Diagram Example

Below is a Mermaid diagram demonstrating a simple flow:

\`\`\`mermaid
graph TD;
A[Start] --> B{Is it working?};
style A fill:#39f,stroke:#333,stroke-width:4px;
style B fill:#fef,stroke:#03e,stroke-width:2px;
\`\`\``, 
        description: 'Mermaid diagram', 
        waitFor: '.mermaid svg',
        renderWait: 500,
        dwellTime: 500
    },

    {
        content: `# Squibview Graphical Markdown Editor 

## Diagram Example

Below is a Mermaid diagram demonstrating a simple flow:

\`\`\`mermaid
graph TD;
A[Start] --> B{Is it working?};
B -- Yes --> C[Great!];
B -- No --> D[Fix it!];
D --> B;
style A fill:#39f,stroke:#333,stroke-width:4px;
style B fill:#fef,stroke:#03e,stroke-width:2px;
style C fill:#de0f,stroke:#333,stroke-width:4px;
style D fill:#8f2,stroke:#333,stroke-width:4px;
\`\`\``, 
        description: 'Complete diagram', 
        waitFor: '.mermaid svg',
        renderWait: 1000,
        dwellTime: 1000
    },

    // 18-20: Math equations from sample-content.md
    {
        content: `# Squibview Graphical Markdown Editor 

## Fenced Math Block Example

This demonstrates a fenced math block:

\`\`\`math
e^{i\\pi} + 1 = 0
\`\`\``, 
        description: 'Euler identity', 
        waitFor: '.MathJax, [data-mathml], .mjx-chtml',
        renderWait: 500,
        dwellTime: 500
    },

    {
        content: `# Squibview Graphical Markdown Editor 

## Fenced Math Block Example

This demonstrates a fenced math block:  

\`\`\`math
e^{i\\pi} + 1 = 0
\`\`\`

A more complex one:

\`\`\`math
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix} = \\mathbf{X}
\`\`\``, 
        description: 'Matrix equation', 
        waitFor: '.MathJax, [data-mathml], .mjx-chtml',
        renderWait: 500,
        dwellTime: 500
    },

    {
        content: `# Squibview Graphical Markdown Editor 

## Fenced Math Block Example

This demonstrates a fenced math block:  


\`\`\`math
e^{i\\pi} + 1 = 0
\`\`\`

A more complex one:  


\`\`\`math
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
\`\`\`


Summations and Fractions:  


\`\`\`math
\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}
\`\`\``, 
        description: 'Complete math examples', 
        waitFor: '.MathJax, [data-mathml], .mjx-chtml',
        renderWait: 500,
        dwellTime: 500
    },

    // 21-22: SVG graphics from sample-content.md
    {
        content: `# Squibview Graphical Markdown Editor 

## Inline SVG Example

Below is an inline SVG graphic rendered directly from Markdown:

\`\`\`svg
<svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
\`\`\``, 
        description: 'First SVG shape', 
        waitFor: 'svg',
        renderWait: 500,
        dwellTime: 500
    },

    {
        content: `# Squibview Graphical Markdown Editor 

## Inline SVG Example

Below is an inline SVG graphic rendered directly from Markdown:

\`\`\`svg
<svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
    <rect x="150" y="10"  width="80" height="80" stroke="orange" stroke-width="4" fill="blue" /> 
</svg>
\`\`\``, 
        description: 'Complete SVG shapes', 
        waitFor: 'svg',
        renderWait: 500,
        dwellTime: 500
    },

    // 23-25: GeoJSON maps from sample-content.md (commented out 3D for now)
    
    {
        content: `# Squibview Graphical Markdown Editor 

## GeoJSON Map Example

This demonstrates a fenced GeoJSON block that renders an interactive map:

\`\`\`geojson
{
  "type": "FeatureCollection",
  "features": []
}
\`\`\``, 
        description: 'Empty map base', 
        waitFor: '.leaflet-container',
        renderWait: 1000,
        dwellTime: 500
    },

    {
        content: `# Squibview Graphical Markdown Editor 

## GeoJSON Map Example

\`\`\`geojson
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-74.0445, 40.6892]
  },
  "properties": {
    "name": "Statue of Liberty"
  }
}
\`\`\``, 
        description: 'Single feature map', 
        waitFor: '.leaflet-container',
        renderWait: 1000,
        dwellTime: 500
    },

    {
        content: `# Squibview Graphical Markdown Editor 

## GeoJSON Map Example

\`\`\`geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      },
      "properties": {
        "name": "San Francisco",
        "population": 884363
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-74.0060, 40.7128]
      },
      "properties": {
        "name": "New York City",
        "population": 8336817
      }
    }
  ]
}
\`\`\``, 
        description: 'Multi-city map', 
        waitFor: '.leaflet-container',
        renderWait: 500,
        dwellTime: 500
    },
    

    // Final summary
    {
        content: `# Squibview Graphical Markdown Editor 

**Live markdown editing with rich graphics support!** ✨

- 📊 Tables and Lists
- 📈 Mermaid Diagrams  
- 🎨 SVG Graphics
- 🧮 Math Equations
- 🎨 Images
- 🗺️ Interactive Maps
- 🎯 3D Models

**Programmer interfaces**  
* headless or built-in controls  
* copy / paste / export  
* on-select selection and more
* Javascript / React / Vue wrappers
* ESM / UMD with CDN via unpkg 
* Standalone Builds (all dependancies included) for offline use
`, 
        description: 'Final summary', 
        waitFor: null,
        renderWait: 200,
        dwellTime: 2000
    }
];