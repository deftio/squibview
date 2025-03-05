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

// Mock clipboard API
navigator.clipboard = {
  writeText: jest.fn().mockResolvedValue(undefined),
  write: jest.fn().mockResolvedValue(undefined)
};

// Mock ClipboardItem
global.ClipboardItem = class ClipboardItem {
  constructor(data) {
    this.data = data;
  }
};

// Helper to setup DOM environment
function setupDomEnvironment() {
  document.body.innerHTML = '<div id="editor-container"></div>';
  return document.getElementById('editor-container');
}

describe('SquibView Integration Tests', () => {
  let container;
  let squibView;

  beforeEach(() => {
    container = setupDomEnvironment();
    
    // Mock console methods to reduce output noise
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.innerHTML = '';
    console.log.mockRestore();
    console.warn.mockRestore();
    console.error.mockRestore();
  });

  test('should initialize with default options', () => {
    squibView = new SquibView(container);
    
    expect(squibView.options.inputContentType).toBe('md');
    expect(squibView.options.showControls).toBe(true);
    expect(squibView.options.initialView).toBe('split');
  });

  test('should initialize with custom options', () => {
    const customOptions = {
      initialContent: '# Test Heading',
      inputContentType: 'html',
      showControls: false,
      initialView: 'src'
    };
    
    squibView = new SquibView(container, customOptions);
    
    expect(squibView.options.inputContentType).toBe('html');
    expect(squibView.options.showControls).toBe(false);
    expect(squibView.options.initialView).toBe('src');
  });

  test('should throw error when container not found', () => {
    expect(() => new SquibView('non-existent-element')).toThrow('Container element not found');
  });

  test('should create DOM structure on initialization', () => {
    squibView = new SquibView(container);
    
    expect(container.querySelector('.squibview-controls')).not.toBeNull();
    expect(container.querySelector('.squibview-input')).not.toBeNull();
    expect(container.querySelector('.squibview-output')).not.toBeNull();
  });

  test('should set and get content', () => {
    squibView = new SquibView(container);
    const testContent = '# Test Content';
    
    squibView.setContent(testContent);
    
    expect(squibView.getContent()).toBe(testContent);
  });

  test('should track revisions when setting content', () => {
    squibView = new SquibView(container);
    
    squibView.setContent('Content 1');
    squibView.setContent('Content 2');
    squibView.setContent('Content 3');
    
    expect(squibView.revisions.buffer.length).toBe(3);
    expect(squibView.revisions.index).toBe(2);
  });

  test('should get markdown source', () => {
    squibView = new SquibView(container);
    const markdownContent = '# Heading\n\nParagraph';
    
    squibView.setContent(markdownContent);
    
    expect(squibView.getMarkdownSource()).toBe(markdownContent);
  });

  test('should clean markdown content', () => {
    squibView = new SquibView(container);
    const markdownWithFences = '```markdown\n# Heading\n\nParagraph\n```';
    
    const cleanedMarkdown = squibView.cleanMarkdown(markdownWithFences);
    
    expect(cleanedMarkdown).toBe('# Heading\n\nParagraph\n');
  });

  test('should adjust heading levels', () => {
    squibView = new SquibView(container);
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
  });

  test('should set view to source', () => {
    squibView = new SquibView(container);
    
    squibView.setView('src');
    
    expect(squibView.currentView).toBe('src');
    // Check for classes being set correctly
    expect(squibView.input.classList.contains('squibview-hidden')).toBe(false);
    expect(squibView.output.classList.contains('squibview-hidden')).toBe(true);
  });

  test('should undo and redo changes', () => {
    squibView = new SquibView(container);
    
    squibView.setContent('Content 1');
    squibView.setContent('Content 2');
    
    squibView.revisionUndo();
    expect(squibView.getContent()).toBe('Content 1');
    
    squibView.revisionRedo();
    expect(squibView.getContent()).toBe('Content 2');
  });

  test('should convert CSV to markdown table', () => {
    squibView = new SquibView(container);
    const csvContent = 'Name,Age,City\nJohn,30,New York\nJane,25,Boston';
    
    // Mock Papa.parse
    global.Papa = {
      parse: jest.fn().mockReturnValue({
        data: [
          ['Name', 'Age', 'City'],
          ['John', '30', 'New York'],
          ['Jane', '25', 'Boston']
        ]
      })
    };
    
    const result = squibView.csvOrTsvToMarkdownTable(csvContent);
    
    expect(result).toContain('| Name | Age | City |');
    expect(result).toContain('| --- | --- | --- |');
    expect(result).toContain('| John | 30 | New York |');
  });

  test('should show/hide controls', () => {
    squibView = new SquibView(container);
    
    squibView.controlsShow(false);
    expect(squibView.controls.style.display).toBe('none');
    
    squibView.controlsShow(true);
    expect(squibView.controls.style.display).toBe('');
  });

  test('should show/hide title', () => {
    squibView = new SquibView(container);
    
    squibView.titleShow(true);
    expect(squibView.title.style.display).toBe('');
    
    squibView.titleShow(false);
    expect(squibView.title.style.display).toBe('none');
  });
});