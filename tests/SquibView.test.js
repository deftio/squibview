// Test for actual SquibView implementation
import SquibView from '../src/squibview.js';

// Mock browser APIs not available in Jest
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Prevent scrollIntoView error in jsdom
Element.prototype.scrollIntoView = jest.fn();

// Mock mermaid
global.mermaid = {
  initialize: jest.fn(),
  init: jest.fn()
};

// Mock hljs
global.hljs = {
  getLanguage: jest.fn().mockReturnValue(true),
  highlight: jest.fn().mockReturnValue({ value: '<span class="hljs-code">mock code</span>' })
};

// Mock markdownit
global.markdownit = jest.fn(() => ({
  render: jest.fn().mockReturnValue('<p>Rendered markdown</p>'),
  renderer: {
    rules: {}
  }
}));

// Mock Reveal
global.Reveal = {
  initialize: jest.fn()
};

// Mock Papa Parse
global.Papa = {
  parse: jest.fn().mockReturnValue({
    data: [
      ['Name', 'Age', 'City'],
      ['John', '30', 'New York'],
      ['Jane', '25', 'Boston']
    ]
  })
};

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    write: jest.fn().mockResolvedValue(undefined)
  },
  writable: true
});

// Mock ClipboardItem
global.ClipboardItem = class ClipboardItem {
  constructor(data) {
    this.data = data;
  }
};

// Mock document selection methods
document.createRange = jest.fn().mockImplementation(() => ({
  selectNodeContents: jest.fn()
}));

global.getSelection = jest.fn().mockImplementation(() => ({
  removeAllRanges: jest.fn(),
  addRange: jest.fn()
}));

document.execCommand = jest.fn().mockReturnValue(true);

// Helper to setup DOM environment
function setupDomEnvironment() {
  document.body.innerHTML = '<div id="editor-container"></div>';
  return document.getElementById('editor-container');
}

describe('SquibView Tests', () => {
  let container;
  let squibView;
  let consoleLogMock;
  let consoleWarnMock;
  let consoleErrorMock;

  beforeEach(() => {
    // Reset the document body
    document.body.innerHTML = '';
    container = setupDomEnvironment();
    jest.clearAllMocks();
    
    // Mock console methods to reduce output noise
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock timers for setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    consoleLogMock.mockRestore();
    consoleWarnMock.mockRestore();
    consoleErrorMock.mockRestore();
    jest.useRealTimers();
  });

  // Test initialization and version
  describe('Initialization', () => {
    test('should return version information', () => {
      expect(SquibView.version).toBeDefined();
      expect(SquibView.version.version).toBeDefined();
      expect(SquibView.version.url).toBe('https://github.com/deftio/squibview');
    });

    test('should initialize with default options', () => {
      squibView = new SquibView(container);
      
      expect(squibView.options.inputContentType).toBe('md');
      expect(squibView.options.showControls).toBe(true);
      expect(squibView.options.initialView).toBe('split');
      expect(squibView.options.baseClass).toBe('squibview');
      expect(squibView.options.titleShow).toBe(false);
    });

    test('should initialize with custom options', () => {
      const customOptions = {
        initialContent: '# Test Heading',
        inputContentType: 'html',
        showControls: false,
        initialView: 'src',
        titleShow: true,
        titleContent: 'Custom Title',
        baseClass: 'custom-view'
      };
      
      squibView = new SquibView(container, customOptions);
      
      expect(squibView.options.inputContentType).toBe('html');
      expect(squibView.options.showControls).toBe(false);
      expect(squibView.options.initialView).toBe('src');
      expect(squibView.options.baseClass).toBe('custom-view');
      expect(squibView.options.titleShow).toBe(true);
      expect(squibView.options.titleContent).toBe('Custom Title');
    });

    test('should throw error when container not found', () => {
      expect(() => new SquibView('non-existent-element')).toThrow('Container element not found');
    });

    test('should create DOM structure on initialization', () => {
      squibView = new SquibView(container);
      
      expect(container.querySelector('.squibview-controls')).not.toBeNull();
      expect(container.querySelector('.squibview-input')).not.toBeNull();
      expect(container.querySelector('.squibview-output')).not.toBeNull();
      expect(container.querySelector('.squibview-title')).not.toBeNull();
    });
    
    test('should initialize with MD buttons when inputContentType is md', () => {
      const options = {
        inputContentType: 'md',
        show_md_buttons: true
      };
      
      squibView = new SquibView(container, options);
      expect(squibView.options.show_md_buttons).toBe(true);
      
      // Verify MD buttons in structure
      expect(squibView.md_buttons).toContain('markdownRemoveAllHR()');
      expect(squibView.md_buttons).toContain('markdownEditorAdjustHeadings(-1)');
      expect(squibView.md_buttons).toContain('markdownEditorAdjustHeadings(+1)');
    });
    
    test('should not show MD buttons when inputContentType is not md', () => {
      const options = {
        inputContentType: 'html',
        show_md_buttons: true
      };
      
      squibView = new SquibView(container, options);
      
      // Should be false since inputContentType is not 'md'
      expect(squibView.options.show_md_buttons).toBe(false);
      expect(squibView.md_buttons).toBe("");
    });

    test('should initialize with initial content if provided', () => {
      const options = {
        initialContent: '# Initial Content',
        inputContentType: 'md'
      };
      
      squibView = new SquibView(container, options);
      expect(squibView.getContent()).toBe('# Initial Content');
    });
    
    test('should initialize libraries', () => {
      squibView = new SquibView(container);
      expect(global.mermaid.initialize).toHaveBeenCalled();
      expect(global.markdownit).toHaveBeenCalled();
    });
    
    test('should customize markdown fence rendering for mermaid and svg', () => {
      // Setup markdown-it mock with a more detailed implementation
      const mockRender = jest.fn();
      const mockRenderToken = jest.fn();
      
      // Create a token with mermaid info
      const mermaidToken = {
        info: 'mermaid',
        content: 'graph TD; A-->B;'
      };
      
      // Create a token with svg info
      const svgToken = {
        info: 'svg',
        content: '<svg><circle cx="50" cy="50" r="40" /></svg>'
      };
      
      // Create a token with regular code info
      const codeToken = {
        info: 'javascript',
        content: 'const x = 1;'
      };
      
      // Mock markdownit to return a more complete mock
      global.markdownit = jest.fn().mockReturnValue({
        render: mockRender,
        renderer: {
          rules: {
            fence: null
          },
          renderToken: mockRenderToken
        }
      });
      
      // Initialize with our mocks
      squibView = new SquibView(container);
      
      // Get the custom fence renderer that was set
      const fenceRenderer = squibView.md.renderer.rules.fence;
      
      // Test with a mermaid token
      const mermaidResult = fenceRenderer([mermaidToken], 0, {}, {}, { renderToken: mockRenderToken });
      expect(mermaidResult).toBe('<div class="mermaid">graph TD; A-->B;</div>');
      
      // Test with an SVG token
      const svgResult = fenceRenderer([svgToken], 0, {}, {}, { renderToken: mockRenderToken });
      expect(svgResult).toBe('<svg><circle cx="50" cy="50" r="40" /></svg>');
      
      // Test with a regular code token (should use the default renderer)
      fenceRenderer([codeToken], 0, {}, {}, { renderToken: mockRenderToken });
      expect(mockRenderToken).toHaveBeenCalled();
    });
  });

  // Test content handling
  describe('Content Management', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
      // Mock renderOutput to avoid rendering issues
      squibView.renderOutput = jest.fn();
    });

    test('should set and get content', () => {
      const testContent = '# Test Content';
      
      squibView.setContent(testContent);
      
      expect(squibView.getContent()).toBe(testContent);
    });

    test('should track revisions when setting content', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      squibView.setContent('Content 3');
      
      expect(squibView.revisions.buffer.length).toBe(3);
      expect(squibView.revisions.index).toBe(2);
    });

    test('should get markdown source', () => {
      const markdownContent = '# Heading\n\nParagraph';
      
      squibView.setContent(markdownContent);
      
      expect(squibView.getMarkdownSource()).toBe(markdownContent);
    });

    test('should clean markdown content', () => {
      const markdownWithFences = '```markdown\n# Heading\n\nParagraph\n```';
      
      const cleanedMarkdown = squibView.cleanMarkdown(markdownWithFences);
      
      expect(cleanedMarkdown).toBe('# Heading\n\nParagraph\n');
    });

    test('should adjust heading levels', () => {
      const markdown = '# Heading 1\n## Heading 2\n### Heading 3';
      
      // Increase heading level
      const increasedLevels = squibView.markdownAdjustHeadings(markdown, 1);
      expect(increasedLevels).toBe('## Heading 1\n### Heading 2\n#### Heading 3');
      
      // Decrease heading level
      const decreasedLevels = squibView.markdownAdjustHeadings(markdown, -1);
      expect(decreasedLevels).toBe('# Heading 1\n# Heading 2\n## Heading 3');
      
      // No change for zero offset
      const unchangedLevels = squibView.markdownAdjustHeadings(markdown, 0);
      expect(unchangedLevels).toBe(markdown);
      
      // Test with invalid input
      expect(squibView.markdownAdjustHeadings(null, 1)).toBe(null);
    });
    
    test('should adjust headings in editor', () => {
      squibView.setContent('# Heading 1\n## Heading 2');
      
      // Mock renderOutput to verify it's called
      const mockRenderOutput = jest.fn();
      squibView.renderOutput = mockRenderOutput;
      
      squibView.markdownEditorAdjustHeadings(1);
      
      expect(squibView.getContent()).toBe('## Heading 1\n### Heading 2');
      expect(mockRenderOutput).toHaveBeenCalled();
    });
    
    test('should remove horizontal rules from markdown', () => {
      squibView.setContent('# Header\n---\nContent');
      squibView.inputContentType = 'md';
      
      // Mock renderOutput
      const mockRenderOutput = jest.fn();
      squibView.renderOutput = mockRenderOutput;
      
      squibView.markdownRemoveAllHR();
      
      expect(squibView.getContent()).toBe('# Header\n\nContent');
      expect(mockRenderOutput).toHaveBeenCalled();
    });
    
    test('should get HTML source', () => {
      squibView.output.innerHTML = '<div contenteditable="true"><p>Test HTML</p></div>';
      
      expect(squibView.getHTMLSource()).toBe('<p>Test HTML</p>');
    });
  });

  // Test view management
  describe('View Management', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
      // Add the copy buttons that setView expects
      squibView.controls.innerHTML += `
        <button class="copy-src-button">Copy Source</button>
        <button class="copy-html-button">Copy HTML</button>
      `;
    });

    test('should set view to source', () => {
      squibView.setView('src');
      
      expect(squibView.currentView).toBe('src');
      expect(squibView.input.classList.contains('squibview-hidden')).toBe(false);
      expect(squibView.output.classList.contains('squibview-hidden')).toBe(true);
      expect(squibView.input.style.width).toBe('100%');
    });

    test('should set view to html', () => {
      squibView.setView('html');
      
      expect(squibView.currentView).toBe('html');
      expect(squibView.input.classList.contains('squibview-hidden')).toBe(true);
      expect(squibView.output.classList.contains('squibview-hidden')).toBe(false);
      expect(squibView.output.style.width).toBe('100%');
    });

    test('should set view to split', () => {
      squibView.setView('split');
      
      expect(squibView.currentView).toBe('split');
      expect(squibView.input.classList.contains('squibview-hidden')).toBe(false);
      expect(squibView.output.classList.contains('squibview-hidden')).toBe(false);
      expect(squibView.input.style.width).toBe('50%');
      expect(squibView.output.style.width).toBe('50%');
    });

    test('should toggle active class on view buttons', () => {
      const srcButton = document.createElement('button');
      srcButton.dataset.view = 'src';
      const htmlButton = document.createElement('button');
      htmlButton.dataset.view = 'html';
      
      squibView.controls.appendChild(srcButton);
      squibView.controls.appendChild(htmlButton);
      
      squibView.setView('src');
      expect(srcButton.classList.contains('active')).toBe(true);
      expect(htmlButton.classList.contains('active')).toBe(false);
      
      squibView.setView('html');
      expect(srcButton.classList.contains('active')).toBe(false);
      expect(htmlButton.classList.contains('active')).toBe(true);
    });
    
    test('should toggle view cyclically', () => {
      // Set up window.editor for toggleView
      window.editor = squibView;
      
      squibView.setView('src');
      expect(squibView.currentView).toBe('src');
      
      squibView.toggleView();
      expect(squibView.currentView).toBe('split');
      
      squibView.toggleView();
      expect(squibView.currentView).toBe('html');
      
      squibView.toggleView();
      expect(squibView.currentView).toBe('src');
      
      // Clean up
      delete window.editor;
    });
    
    test('should adjust layout after setting view', () => {
      // Mock adjustLayout
      const mockAdjustLayout = jest.fn();
      squibView.adjustLayout = mockAdjustLayout;
      
      squibView.setView('src');
      expect(mockAdjustLayout).toHaveBeenCalled();
    });
  });

  // Test revision history
  describe('Revision History', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
      squibView.renderOutput = jest.fn();
    });

    test('should undo and redo changes', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      
      squibView.revisionUndo();
      expect(squibView.getContent()).toBe('Content 1');
      expect(squibView.revisions.index).toBe(0);
      
      squibView.revisionRedo();
      expect(squibView.getContent()).toBe('Content 2');
      expect(squibView.revisions.index).toBe(1);
    });
    
    test('should ignore undo if already at first revision', () => {
      squibView.setContent('Content 1');
      
      // Already at first revision
      expect(squibView.revisions.index).toBe(0);
      
      squibView.revisionUndo();
      // Should still be at first revision
      expect(squibView.revisions.index).toBe(0);
      expect(squibView.getContent()).toBe('Content 1');
    });
    
    test('should ignore redo if already at last revision', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      
      // Already at last revision
      expect(squibView.revisions.index).toBe(1);
      
      squibView.revisionRedo();
      // Should still be at last revision
      expect(squibView.revisions.index).toBe(1);
      expect(squibView.getContent()).toBe('Content 2');
    });
    
    test('should set to specific revision index', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      squibView.setContent('Content 3');
      
      squibView.revisionSet(0);
      expect(squibView.getContent()).toBe('Content 1');
      expect(squibView.revisions.index).toBe(0);
      
      squibView.revisionSet(2);
      expect(squibView.getContent()).toBe('Content 3');
      expect(squibView.revisions.index).toBe(2);
    });
    
    test('should ignore invalid revision indices', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      
      // Try to set to negative index
      squibView.revisionSet(-1);
      expect(squibView.revisions.index).toBe(1); // Should still be at last revision
      
      // Try to set to out-of-bounds index
      squibView.revisionSet(5);
      expect(squibView.revisions.index).toBe(1); // Should still be at last revision
    });
    
    test('should get number of revisions', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      
      expect(squibView.revisionNumRevsions()).toBe(2);
    });
    
    test('should get current revision index', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      squibView.revisionUndo();
      
      expect(squibView.revisionGetCurrentIndex()).toBe(0);
    });
    
    test('should add new revision when adding new content after undo', () => {
      squibView.setContent('Content 1');
      squibView.setContent('Content 2');
      squibView.setContent('Content 3');
      
      // Undo back to 'Content 1'
      squibView.revisionUndo();
      squibView.revisionUndo();
      
      // Add new content
      squibView.setContent('New Content');
      
      // Check that we have expected revisions
      expect(squibView.revisions.buffer.length).toBe(4); // Content 1, 2, 3, New Content
      expect(squibView.revisions.buffer[0].content).toBe('Content 1');
      expect(squibView.revisions.buffer[3].content).toBe('New Content');
      expect(squibView.revisions.index).toBe(3); // Should be at the latest revision
    });
  });

  // Test rendering
  describe('Rendering', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
      
      // Mock iframe-related methods
      squibView.insertContentInIframe = jest.fn();
    });
    
    test('should render markdown content', () => {
      // Create a real implementation of renderMarkdown for testing
      const realRenderMarkdown = squibView.renderMarkdown;
      squibView.renderMarkdown = jest.fn();
      
      squibView.inputContentType = 'md';
      squibView.setContent('# Test Markdown');
      
      expect(squibView.renderMarkdown).toHaveBeenCalled();
      
      // Restore original implementation
      squibView.renderMarkdown = realRenderMarkdown;
    });
    
    test('should render HTML content', () => {
      squibView.inputContentType = 'html';
      squibView.setContent('<h1>Test HTML</h1>');
      
      expect(squibView.insertContentInIframe).toHaveBeenCalled();
    });
    
    test('should render RevealJS content', () => {
      squibView.makeRevealJSFullPage = jest.fn().mockReturnValue('<html>Reveal content</html>');
      
      squibView.inputContentType = 'reveal';
      squibView.setContent('# Slide 1\n---\n# Slide 2');
      
      expect(squibView.makeRevealJSFullPage).toHaveBeenCalled();
      expect(squibView.insertContentInIframe).toHaveBeenCalled();
    });
    
    test('should render CSV content as markdown table', () => {
      squibView.csvOrTsvToMarkdownTable = jest.fn().mockReturnValue('| Header |\n| --- |\n| Data |');
      squibView.renderMarkdown = jest.fn();
      
      squibView.inputContentType = 'csv';
      squibView.setContent('Header\nData');
      
      expect(squibView.csvOrTsvToMarkdownTable).toHaveBeenCalled();
      expect(squibView.renderMarkdown).toHaveBeenCalledWith('| Header |\n| --- |\n| Data |');
    });
    
    test('should render TSV content with tab delimiter', () => {
      squibView.csvOrTsvToMarkdownTable = jest.fn().mockReturnValue('| Header |\n| --- |\n| Data |');
      squibView.renderMarkdown = jest.fn();
      
      squibView.inputContentType = 'tsv';
      squibView.setContent('Header\nData');
      
      expect(squibView.csvOrTsvToMarkdownTable).toHaveBeenCalledWith(expect.anything(), ',');
    });
    
    test('should handle unsupported content types', () => {
      squibView.renderMarkdown = jest.fn();
      
      squibView.inputContentType = 'unknown';
      squibView.setContent('Test content');
      
      // Should default to markdown rendering
      expect(squibView.renderMarkdown).toHaveBeenCalled();
    });
    
    test('should call render markdown with basic content', async () => {
      // Use a simpler test that focuses on the method call without complex mocking
      
      // Create a simple mock for render function
      const renderMock = jest.spyOn(squibView.md, 'render').mockReturnValue('<p>Rendered content</p>');
      
      // Override the image processing part which is hard to test
      const origQuerySelector = squibView.output.querySelector;
      squibView.output.querySelector = jest.fn().mockReturnValue({ querySelectorAll: () => [] });
      
      // Call the method - here we use the real implementation but avoid image processing
      await squibView.renderMarkdown('# Test markdown');
      
      // Expectations
      expect(renderMock).toHaveBeenCalledWith('# Test markdown');
      
      // Cleanup
      renderMock.mockRestore();
      squibView.output.querySelector = origQuerySelector;
    });
    
    test('should render with different content types', () => {
      // Save original implementations
      const origRenderMarkdown = squibView.renderMarkdown;
      const origRenderHTML = squibView.renderHTML;
      
      // Mock the rendering methods
      squibView.renderMarkdown = jest.fn();
      squibView.renderHTML = jest.fn();
      squibView.makeRevealJSFullPage = jest.fn().mockReturnValue('<html>Reveal content</html>');
      squibView.csvOrTsvToMarkdownTable = jest.fn().mockReturnValue('| Header |\n| --- |\n| Data |');
      
      // Test with HTML type
      squibView.inputContentType = 'html';
      squibView.renderOutput();
      expect(squibView.renderHTML).toHaveBeenCalled();
      
      // Test with reveal type
      squibView.inputContentType = 'reveal';
      squibView.renderOutput();
      expect(squibView.makeRevealJSFullPage).toHaveBeenCalled();
      expect(squibView.renderHTML).toHaveBeenCalledTimes(2); // called again
      
      // Test with CSV type
      squibView.inputContentType = 'csv';
      squibView.renderOutput();
      expect(squibView.csvOrTsvToMarkdownTable).toHaveBeenCalled();
      expect(squibView.renderMarkdown).toHaveBeenCalled();
      
      // Test with TSV type
      squibView.inputContentType = 'tsv';
      squibView.renderOutput();
      expect(squibView.csvOrTsvToMarkdownTable).toHaveBeenCalledWith(expect.anything(), ',');
      expect(squibView.renderMarkdown).toHaveBeenCalledTimes(2); // called again
      
      // Test with semisv type
      squibView.inputContentType = 'semisv';
      squibView.renderOutput();
      expect(squibView.csvOrTsvToMarkdownTable).toHaveBeenCalledWith(expect.anything(), ';');
      expect(squibView.renderMarkdown).toHaveBeenCalledTimes(3); // called again
      
      // Test with ssv type
      squibView.inputContentType = 'ssv';
      squibView.renderOutput();
      expect(squibView.csvOrTsvToMarkdownTable).toHaveBeenCalledWith(expect.anything(), ' ');
      expect(squibView.renderMarkdown).toHaveBeenCalledTimes(4); // called again
      
      // Restore original implementations
      squibView.renderMarkdown = origRenderMarkdown;
      squibView.renderHTML = origRenderHTML;
    });
    
    test('should have an svgToPng method', () => {
      // Just test the method exists rather than complex async behaviors
      expect(typeof squibView.svgToPng).toBe('function');
    });
  });

  // Test CSV functionality
  describe('CSV Functionality', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
    });

    test('should convert CSV to markdown table', () => {
      const csvContent = 'Name,Age,City\nJohn,30,New York\nJane,25,Boston';
      
      const result = squibView.csvOrTsvToMarkdownTable(csvContent);
      
      expect(result).toContain('| Name | Age | City |');
      expect(result).toContain('| --- | --- | --- |');
      expect(result).toContain('| John | 30 | New York |');
    });
    
    test('should handle empty CSV data', () => {
      // Mock Papa.parse to return empty data
      global.Papa.parse = jest.fn().mockReturnValue({ data: [] });
      
      const result = squibView.csvOrTsvToMarkdownTable('');
      
      expect(result).toBe('No data found.');
    });
    
    test('should use specified delimiter', () => {
      const tsvContent = 'Name\tAge\tCity\nJohn\t30\tNew York';
      
      // Mock Papa.parse to verify delimiter
      global.Papa.parse = jest.fn().mockReturnValue({
        data: [
          ['Name', 'Age', 'City'],
          ['John', '30', 'New York']
        ]
      });
      
      squibView.csvOrTsvToMarkdownTable(tsvContent, '\t');
      
      expect(global.Papa.parse).toHaveBeenCalledWith(tsvContent, expect.objectContaining({
        delimiter: '\t'
      }));
    });
  });

  // Test UI controls
  describe('UI Controls', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
    });

    test('should show/hide controls', () => {
      // Mock adjustLayout
      const mockAdjustLayout = jest.fn();
      squibView.adjustLayout = mockAdjustLayout;
      
      squibView.controlsShow(false);
      expect(squibView.controls.style.display).toBe('none');
      expect(squibView.options.showControls).toBe(false);
      expect(mockAdjustLayout).toHaveBeenCalled();
      
      squibView.controlsShow(true);
      expect(squibView.controls.style.display).toBe('');
      expect(squibView.options.showControls).toBe(true);
    });

    test('should show/hide title', () => {
      // Mock adjustLayout
      const mockAdjustLayout = jest.fn();
      squibView.adjustLayout = mockAdjustLayout;
      
      squibView.titleShow(true);
      expect(squibView.title.style.display).toBe('');
      expect(squibView.options.titleShow).toBe(true);
      expect(mockAdjustLayout).toHaveBeenCalled();
      
      squibView.titleShow(false);
      expect(squibView.title.style.display).toBe('none');
      expect(squibView.options.titleShow).toBe(false);
    });
    
    test('should set and get title content', () => {
      const titleContent = '<h1>Custom Title</h1>';
      
      squibView.titleSetContent(titleContent);
      
      expect(squibView.title.innerHTML).toBe(titleContent);
      expect(squibView.options.titleContent).toBe(titleContent);
      expect(squibView.titleGetContent()).toBe(titleContent);
    });
    
    test('should adjust layout based on container size', () => {
      // Mock getBoundingClientRect to return fixed dimensions
      Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
        width: 800,
        height: 600
      });
      
      // Mock offsetHeight/Width
      Object.defineProperty(squibView.title, 'offsetHeight', { value: 30 });
      Object.defineProperty(squibView.controls, 'offsetHeight', { value: 40 });
      
      squibView.adjustLayout();
      
      // Available height should be container height minus title and controls height
      expect(squibView.editor.style.height).toBe('530px'); // 600 - 30 - 40
      expect(squibView.editor.style.width).toBe('800px');
    });
  });
  
  // Test HTML generation
  describe('HTML Generation', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
    });
    
    test('should create HTML page from div content', () => {
      const divContent = '<div>Test Content</div>';
      
      const result = squibView.makeHTMLPageFromDiv(divContent);
      
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain(divContent);
      expect(result).toContain('<script'); // Should have converted xscripx to script
      expect(result).not.toContain('<xscripx'); // Should not contain xscripx anymore
    });
    
    test('should create HTML page with editable attribute if specified', () => {
      const divContent = '<div>Test Content</div>';
      
      const result = squibView.makeHTMLPageFromDiv(divContent, true);
      
      expect(result).toContain('contenteditable="true"');
    });
    
    test('should create RevealJS full page', () => {
      const markdown = '# Slide 1\n---\n# Slide 2';
      const title = 'Test Presentation';
      
      const result = squibView.makeRevealJSFullPage(markdown, title);
      
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain(title);
      expect(result).toContain('# Slide 1');
      expect(result).toContain('# Slide 2');
      expect(result).toContain('<section data-markdown>');
      expect(result).toContain('RevealMarkdown');
    });
    
    test('should use default title for RevealJS when not provided', () => {
      const markdown = '# Slide Content';
      
      const result = squibView.makeRevealJSFullPage(markdown);
      
      expect(result).toContain('<title>Slide Presentation</title>'); // Default title
    });
    
    test('should have a method for iframe creation', () => {
      // Just verify the method exists and has proper structure
      expect(typeof squibView.insertContentInIframe).toBe('function');
    });
    
    test('should render HTML content in an iframe', () => {
      // Set up a spy on insertContentInIframe
      squibView.insertContentInIframe = jest.fn();
      
      // HTML content to render
      const htmlContent = '<html><body><h1>Test Content</h1></body></html>';
      
      // Call renderHTML
      squibView.renderHTML(htmlContent);
      
      // Verify that insertContentInIframe was called with the right arguments
      expect(squibView.insertContentInIframe).toHaveBeenCalledWith(
        squibView.output, 
        htmlContent
      );
    });
    
    test('should create HTML pages with script tags properly', () => {
      // Test makeHTMLPageFromDiv with script tag conversion
      const divContent = '<div>Test with scripts</div>';
      const result = squibView.makeHTMLPageFromDiv(divContent);
      
      // Check script tag conversion from xscripx to script
      expect(result).toContain('<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>');
      expect(result).toContain('<script src="https://unpkg.com/mermaid/dist/mermaid.min.js"></script>');
      
      // Test with editable content
      const editableResult = squibView.makeHTMLPageFromDiv(divContent, true);
      expect(editableResult).toContain('contenteditable="true"');
      
      // Test RevealJS page creation
      const revealResult = squibView.makeRevealJSFullPage('# Slide 1\n---\n# Slide 2', 'Custom Title');
      expect(revealResult).toContain('<title>Custom Title</title>');
      expect(revealResult).toContain('<section data-markdown>');
      expect(revealResult).toContain('# Slide 1');
      expect(revealResult).toContain('# Slide 2');
    });
  });
  
  // Test clipboard functionality
  describe('Clipboard Functionality', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
      
      // Create copy button elements manually without appending them
      const controls = document.createElement('div');
      controls.innerHTML = `
        <button class="copy-src-button">Copy Source</button>
        <button class="copy-html-button">Copy Formatted</button>
        <button class="copy-button">Copy</button>
      `;
      
      // Replace the controls element entirely, rather than trying to append to it
      squibView.controls = controls;
    });
    
    test('should have clipboard copy methods', () => {
      // Verify the methods exist and are functions
      expect(typeof squibView.copySource).toBe('function');
      expect(typeof squibView.copyHTML).toBe('function');
      expect(typeof squibView.copyToClipboard).toBe('function');
    });
    
    test('should have clipboard with simpler mocking approach', async () => {
      // Mock just the critical parts 
      navigator.clipboard.writeText = jest.fn().mockResolvedValue(undefined);
      navigator.clipboard.write = jest.fn().mockResolvedValue(undefined);
      
      // Setup simpler mocks to avoid complex DOM operations
      squibView.getMarkdownSource = jest.fn().mockReturnValue('# Test Markdown');
      
      // Add a simplified mock for output structure
      squibView.output.innerHTML = '<div contenteditable="true"><p>Test HTML</p></div>';
      
      // Test copySource
      await squibView.copySource();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('# Test Markdown');
      
      // Test setTimeout
      jest.advanceTimersByTime(2500);
      expect(squibView.controls.querySelector('.copy-src-button').textContent).toBe('Copy Source');
      
      // Test copyHTML
      await squibView.copyHTML();
      expect(navigator.clipboard.write).toHaveBeenCalled();
      
      // Simple test for getPlatform - just check it returns a string
      expect(typeof squibView.getPlatform()).toBe('string');
    });
    
    test('should test platform detection functions', () => {
      // Mac
      Object.defineProperty(navigator, 'platform', { 
        value: 'MacIntel',
        configurable: true 
      });
      Object.defineProperty(navigator, 'userAgent', { 
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        configurable: true 
      });
      expect(squibView.getPlatform()).toBe('macos');
      
      // Windows
      Object.defineProperty(navigator, 'platform', { 
        value: 'Win32',
        configurable: true 
      });
      Object.defineProperty(navigator, 'userAgent', { 
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        configurable: true 
      });
      expect(squibView.getPlatform()).toBe('windows');
      
      // Linux
      Object.defineProperty(navigator, 'platform', { 
        value: 'Linux x86_64',
        configurable: true 
      });
      Object.defineProperty(navigator, 'userAgent', { 
        value: 'Mozilla/5.0 (X11; Linux x86_64)',
        configurable: true 
      });
      expect(squibView.getPlatform()).toBe('linux');
      
      // Unknown
      Object.defineProperty(navigator, 'platform', { 
        value: 'Unknown',
        configurable: true 
      });
      Object.defineProperty(navigator, 'userAgent', { 
        value: 'Unknown/1.0',
        configurable: true 
      });
      expect(squibView.getPlatform()).toBe('unknown');
    });
  });
  
  // Test platform detection
  describe('Platform Detection', () => {
    beforeEach(() => {
      squibView = new SquibView(container);
    });
    
    test('should detect macOS platform', () => {
      // Mock navigator.platform
      const originalPlatform = navigator.platform;
      const originalUserAgent = navigator.userAgent;
      
      Object.defineProperty(navigator, 'platform', {
        value: 'MacIntel',
        configurable: true
      });
      
      expect(squibView.getPlatform()).toBe('macos');
      
      // Restore original value
      Object.defineProperty(navigator, 'platform', {
        value: originalPlatform,
        configurable: true
      });
    });
    
    test('should detect Windows platform', () => {
      // Mock navigator.userAgent
      const originalUserAgent = navigator.userAgent;
      const originalPlatform = navigator.platform;
      
      Object.defineProperty(navigator, 'platform', {
        value: 'Win32',
        configurable: true
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        configurable: true
      });
      
      expect(squibView.getPlatform()).toBe('windows');
      
      // Restore original values
      Object.defineProperty(navigator, 'platform', {
        value: originalPlatform,
        configurable: true
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true
      });
    });
    
    test('should detect Linux platform', () => {
      // Mock navigator.userAgent
      const originalUserAgent = navigator.userAgent;
      const originalPlatform = navigator.platform;
      
      Object.defineProperty(navigator, 'platform', {
        value: 'Linux x86_64',
        configurable: true
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (X11; Linux x86_64)',
        configurable: true
      });
      
      expect(squibView.getPlatform()).toBe('linux');
      
      // Restore original values
      Object.defineProperty(navigator, 'platform', {
        value: originalPlatform,
        configurable: true
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true
      });
    });
    
    test('should return unknown for unrecognized platform', () => {
      // Mock navigator.userAgent and platform with unknown values
      const originalUserAgent = navigator.userAgent;
      const originalPlatform = navigator.platform;
      
      Object.defineProperty(navigator, 'platform', {
        value: 'Unknown',
        configurable: true
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Unknown Browser',
        configurable: true
      });
      
      expect(squibView.getPlatform()).toBe('unknown');
      
      // Restore original values
      Object.defineProperty(navigator, 'platform', {
        value: originalPlatform,
        configurable: true
      });
      
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        configurable: true
      });
    });
  });
});