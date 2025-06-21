# Plan: Fenced GeoJSON, TopoJSON, and STL Support

This document outlines the plan to add support for rendering GeoJSON, TopoJSON, and ASCII STL data directly within Squibview using fenced code blocks.

## 1. Goal

To allow users to embed interactive maps and 3D models in their documents by simply providing the data in a fenced code block, similar to how Mermaid diagrams are handled.

## 2. Feature Overview

-   **GeoJSON Rendering:** A fenced code block with the `geojson` identifier will render an interactive 2D map displaying the geographic data.
-   **TopoJSON Rendering:** A fenced code block with the `topojson` identifier will do the same, but for the TopoJSON format.
-   **STL Rendering:** A fenced code block with the `stl` identifier will render an interactive 3D view of an ASCII STL model.

### Example Usage:
`
**GeoJSON:**

````markdown
```geojson
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
```
````

**STL:**

````markdown
```stl
solid MyModel
  facet normal 0 0 1
    outer loop
      vertex 0 0 1
      vertex 1 0 1
      vertex 0 1 1
    endloop
  endfacet
  ...
endsolid MyModel
```
````

## 3. Implementation Plan

The implementation will follow the existing pattern used for Mermaid diagrams in `squibview.js`.

### Phase 1: Markdown Parsing and Containerization

1.  **Override `markdown-it` Fence Rule:** In `squibview.js`, extend the `md.renderer.rules.fence` function.
2.  **Add New Checks:** Add `if` conditions to detect the `geojson`, `topojson`, and `stl` language identifiers.
3.  **Create Container Divs:**
    -   For `geojson`, wrap the content in `<div class="geojson-container" data-source-type="geojson">...</div>`.
    -   For `topojson`, wrap the content in `<div class="topojson-container" data-source-type="topojson">...</div>`.
    -   For `stl`, wrap the content in `<div class="stl-container" data-source-type="stl">...</div>`.
    -   The raw data from the code block will be HTML-escaped and placed inside these divs. This makes the data available on the DOM for the rendering libraries to pick up.

### Phase 2: Client-Side Rendering

1.  **Library Selection & Integration:**
    -   **GeoJSON/TopoJSON:** Integrate **Leaflet.js** for map rendering and **TopoJSON-client** to convert TopoJSON to GeoJSON. These are lightweight, robust, and well-documented libraries. We will load them from a CDN.
    -   **STL:** Integrate **`stl_viewer.js`**. It's a simple, dependency-free library for rendering STL files, which is perfect for this use case.

2.  **Rendering Logic:**
    -   Create a new initialization function, similar to `mermaid.init()`, that runs after the main markdown rendering is complete.
    -   This function will select all `.geojson-container`, `.topojson-container`, and `.stl-container` elements.
    -   For each element, it will:
        a.  Parse the JSON/STL data from the text content of the div.
        b.  **For GeoJSON/TopoJSON:**
            -   Create a new Leaflet map inside the container div.
            -   Add a default tile layer (e.g., OpenStreetMap).
            -   Add the GeoJSON data as a layer on the map and automatically adjust the map's view to fit the data's bounds.
        c.  **For STL:**
            -   Initialize the `stl_viewer` on the container div, passing the STL data to it.
            -   Configure basic viewer options like auto-rotation and a default camera angle.

### Phase 3: Styling and Interactivity

1.  **CSS Styling:** Add basic styles to `squibview.css` for the containers (e.g., `min-height`, `border`, `resize`) to ensure they are displayed correctly before and during rendering. The Leaflet library will provide its own necessary stylesheet, which we will also load.
2.  **Error Handling:** Implement error handling for malformed JSON or STL data. If parsing fails, the block should display an error message instead of an empty container.

## 4. Testing Strategy

Comprehensive testing is critical to ensure new features are stable and do not introduce regressions.

### Forward Rendering Tests (Markdown -> HTML)

-   **Unit Tests:** Create a new test file, `tests/FencedRenders.test.js`, or add to `tests/SquibView.test.js`.
-   **Test Cases:**
    1.  A valid `geojson` block should produce a `div.geojson-container` with a `data-source-type="geojson"` attribute.
    2.  A valid `topojson` block should produce a `div.topojson-container`.
    3.  A valid `stl` block should produce a `div.stl-container`.
    4.  Malformed data in each block type should still produce the container div but contain an error message or class.
    5.  An empty block (e.g., ` ```geojson\n``` `) should render an empty container without errors.
-   **CI Integration:** These Jest tests will automatically run as part of the existing `npm run test` step in the `.github/workflows/ci.yml` pipeline.

### Reverse Rendering Tests (HTML -> Markdown)

-   **Goal:** Ensure that converting the rendered HTML back to Markdown restores the original fenced block, not the rendered map or 3D view. This is critical to prevent data loss on the source view.
-   **Implementation:**
    1.  Add new test cases to `tests/bidirectional-test.test.js` for `geojson`, `topojson`, and `stl`.
    2.  The tests will follow the existing pattern:
        a. Take a Markdown string with the new fenced block.
        b. Render it to HTML using `squibView.md.render()`.
        c. Convert the resulting HTML back to Markdown using `squibView.htmlToMarkdown()`.
        d. **Assert** that the result contains the original fenced block (e.g., ` ```geojson...``` `) and **not** any of the rendered HTML artifacts (e.g., `<div class="leaflet-container">`).
    3.  The logic for this reverse conversion will be added to `HtmlToMarkdown.js`, carefully following the established pattern for `mermaid` and `svg` to avoid regressions. A rule will be added to recognize the `div[data-source-type]` and extract its text content back into a fenced block.

### Manual and E2E Testing

-   The file `dev/sample-content.md` will be updated with valid examples for GeoJSON, TopoJSON, and STL.
-   The `dev/debug.html` page will be used for manual verification during development to quickly test rendering and interactivity.

## 5. Standalone Build Integration

To ensure the new features work in the self-contained `standalone` builds, the new dependencies must be bundled.

-   **Entry Point:** The file `src/standalone.squibview.js` is the entry point for standalone builds.
-   **Action:** We will add `import` statements for `leaflet`, `leaflet/dist/leaflet.css`, `topojson-client`, and `stl_viewer` to the top of `src/standalone.squibview.js`. This will instruct Rollup to include them in the final `dist/squibview.standalone.*.js` bundles.

## 6. Dependencies

The following dependencies will be integrated. They will be loaded from a CDN for standard builds but bundled directly into standalone builds.

-   **Leaflet.js** (JS and CSS)
-   **TopoJSON-client.js**
-   **`stl_viewer.js`**

This approach mirrors how external libraries like `highlight.js` and `Mermaid` are currently managed. 