import SquibView from '../src/squibview.js';

// Mock browser APIs
global.ResizeObserver = function() {
  return { observe() {}, unobserve() {}, disconnect() {} };
};

Element.prototype.scrollIntoView = function() {};

global.mermaid = {
  initialize() {},
  init() {},
  contentLoaded() {}
};

global.hljs = {
  getLanguage: () => true,
  highlight: (str) => ({ value: `<span class="hljs-code">${str}</span>` })
};

describe('Bidirectional Editing Tests', () => {
  let container, squibView;

  beforeEach(() => {
    container = document.createElement('div');
    squibView = new SquibView(container);
  });

  test('CSV bidirectional editing - rendered to source conversion', () => {
    const csvMarkdown = `# Test Doc

\`\`\`csv
name,age,city
John,25,NYC
Jane,30,LA
\`\`\``;

    console.log('=== ORIGINAL CSV MARKDOWN ===');
    console.log(csvMarkdown);

    // Step 1: Convert markdown to HTML (as if displayed in rendered view)
    const html = squibView.md.render(csvMarkdown);
    console.log('=== RENDERED HTML ===');
    console.log(html);

    // Step 2: Simulate editing on rendered side - convert HTML back to markdown
    // This is what happens when rendered content is edited and needs to sync to source
    const backToMarkdown = squibView.htmlToMarkdown(html);
    console.log('=== BACK TO MARKDOWN (source view) ===');
    console.log(backToMarkdown);

    // The source should show CSV format, not HTML
    expect(backToMarkdown).toContain('```csv');
    expect(backToMarkdown).toContain('name,age,city');
    expect(backToMarkdown).toContain('John,25,NYC');
    expect(backToMarkdown).not.toContain('<table');
    expect(backToMarkdown).not.toContain('<div data-source-type');
  });

  test('TSV bidirectional editing - rendered to source conversion', () => {
    const tsvMarkdown = `# Test Doc

\`\`\`tsv
name	age	city
John	25	NYC
Jane	30	LA
\`\`\``;

    console.log('=== ORIGINAL TSV MARKDOWN ===');
    console.log(tsvMarkdown);

    const html = squibView.md.render(tsvMarkdown);
    console.log('=== RENDERED HTML ===');
    console.log(html);

    const backToMarkdown = squibView.htmlToMarkdown(html);
    console.log('=== BACK TO MARKDOWN (source view) ===');
    console.log(backToMarkdown);

    // The source should show TSV format (tab-separated), not HTML
    expect(backToMarkdown).toContain('```tsv');
    expect(backToMarkdown).toContain('name\tage\tcity');
    expect(backToMarkdown).toContain('John\t25\tNYC');
    expect(backToMarkdown).not.toContain('<table');
    expect(backToMarkdown).not.toContain('<div data-source-type');
  });

  test('SVG bidirectional editing - rendered to source conversion', () => {
    const svgMarkdown = `# Test Doc

\`\`\`svg
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
\`\`\``;

    console.log('=== ORIGINAL SVG MARKDOWN ===');
    console.log(svgMarkdown);

    const html = squibView.md.render(svgMarkdown);
    console.log('=== RENDERED HTML ===');
    console.log(html);

    const backToMarkdown = squibView.htmlToMarkdown(html);
    console.log('=== BACK TO MARKDOWN (source view) ===');
    console.log(backToMarkdown);

    // The source should show SVG format, not HTML
    expect(backToMarkdown).toContain('```svg');
    expect(backToMarkdown).toContain('<svg width="100" height="100">');
    expect(backToMarkdown).toContain('<circle cx="50" cy="50" r="40" fill="red" />');
    expect(backToMarkdown).not.toContain('<div class="svg-container"');
  });

  test('JavaScript code bidirectional editing - rendered to source conversion', () => {
    const jsMarkdown = `# Test Doc

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\``;

    console.log('=== ORIGINAL JS MARKDOWN ===');
    console.log(jsMarkdown);

    const html = squibView.md.render(jsMarkdown);
    console.log('=== RENDERED HTML ===');
    console.log(html);

    const backToMarkdown = squibView.htmlToMarkdown(html);
    console.log('=== BACK TO MARKDOWN (source view) ===');
    console.log(backToMarkdown);

    // The source should show JavaScript code, not HTML
    expect(backToMarkdown).toContain('```javascript');
    expect(backToMarkdown).toContain('function hello()');
    expect(backToMarkdown).toContain('console.log("Hello, World!");');
    expect(backToMarkdown).not.toContain('<div data-source-type');
    expect(backToMarkdown).not.toContain('<pre><code');
  });
});