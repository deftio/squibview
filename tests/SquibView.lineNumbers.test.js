// Tests for SquibView line numbers feature (v1.0.17)
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
  init: jest.fn(),
  contentLoaded: jest.fn()
};

// Mock hljs
global.hljs = {
  getLanguage: jest.fn().mockReturnValue(true),
  highlight: jest.fn((str) => ({ value: `<span class="hljs-code">${str}</span>` }))
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

// Mock document selection
document.createRange = jest.fn().mockImplementation(() => ({
  selectNode: jest.fn(),
  selectNodeContents: jest.fn(),
  setStart: jest.fn(),
  setEnd: jest.fn(),
  cloneContents: jest.fn().mockReturnValue(document.createElement('div')),
  getBoundingClientRect: jest.fn().mockReturnValue({
    top: 0, left: 0, right: 100, bottom: 20
  })
}));

window.getSelection = jest.fn().mockReturnValue({
  removeAllRanges: jest.fn(),
  addRange: jest.fn(),
  rangeCount: 0,
  toString: jest.fn().mockReturnValue(''),
  getRangeAt: jest.fn(),
  anchorNode: document.createElement('div')
});

// Setup DOM before each test
beforeEach(() => {
  document.body.innerHTML = '<div id="editor"></div>';
});

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe('SquibView Line Numbers Feature', () => {
  describe('Initialization', () => {
    test('should initialize with line numbers disabled by default', () => {
      const editor = new SquibView('#editor');
      expect(editor.options.showLineNumbers).toBe(false);
      expect(editor.lineGutter).toBeUndefined();
      expect(editor.sourcePanel).toBeUndefined();
    });

    test('should initialize with line numbers enabled', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true
      });
      
      expect(editor.options.showLineNumbers).toBe(true);
      expect(editor.lineGutter).toBeDefined();
      expect(editor.sourcePanel).toBeDefined();
      expect(editor.lineMirror).toBeDefined();
      
      // Check DOM structure
      const sourcePanel = document.querySelector('.squibview-source-panel');
      expect(sourcePanel).toBeTruthy();
      
      const lineGutter = document.querySelector('.squibview-line-gutter');
      expect(lineGutter).toBeTruthy();
    });

    test('should respect custom line number options', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        lineNumberStart: 10,
        lineNumberMinDigits: 3
      });
      
      expect(editor.options.lineNumberStart).toBe(10);
      expect(editor.options.lineNumberMinDigits).toBe(3);
    });
  });

  describe('Line Number Display', () => {
    test('should display correct line numbers for simple content', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: 'Line 1\nLine 2\nLine 3'
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(3);
      expect(gutterLines[0].textContent).toBe('01');
      expect(gutterLines[1].textContent).toBe('02');
      expect(gutterLines[2].textContent).toBe('03');
    });

    test('should handle custom start number', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        lineNumberStart: 100,
        initialContent: 'Line 1\nLine 2'
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines[0].textContent).toBe('100');
      expect(gutterLines[1].textContent).toBe('101');
    });

    test('should handle minimum digits setting', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        lineNumberMinDigits: 4,
        initialContent: 'Line 1\nLine 2'
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines[0].textContent).toBe('0001');
      expect(gutterLines[1].textContent).toBe('0002');
    });

    test('should update line numbers when content changes', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: 'Line 1'
      });
      
      let gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(1);
      
      // Add more content
      editor.setContent('Line 1\nLine 2\nLine 3\nLine 4');
      
      gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(4);
    });

    test('should handle empty lines correctly', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: 'Line 1\n\nLine 3'
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(3);
      expect(gutterLines[1].textContent).toBe('02'); // Empty line should still have a number
    });
  });

  describe('Toggle Functionality', () => {
    test('should toggle line numbers on and off', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: false,
        initialContent: 'Test content'
      });
      
      // Initially off
      expect(editor.getLineNumbers()).toBe(false);
      let lineGutter = document.querySelector('.squibview-line-gutter');
      expect(lineGutter).toBeFalsy();
      
      // Turn on
      editor.setLineNumbers(true);
      expect(editor.getLineNumbers()).toBe(true);
      lineGutter = document.querySelector('.squibview-line-gutter');
      expect(lineGutter).toBeTruthy();
      
      // Turn off
      editor.setLineNumbers(false);
      expect(editor.getLineNumbers()).toBe(false);
      lineGutter = document.querySelector('.squibview-line-gutter');
      expect(lineGutter).toBeFalsy();
    });

    test('should preserve content when toggling', () => {
      const content = '# Heading\n\nParagraph text\n\n```javascript\ncode();\n```';
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: content
      });
      
      // Toggle off and on
      editor.setLineNumbers(false);
      editor.setLineNumbers(true);
      
      // Content should be preserved
      expect(editor.getContent()).toBe(content);
    });

    test('should preserve view mode when toggling', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialView: 'src'
      });
      
      // Change to split view
      editor.setView('split');
      
      // Toggle line numbers
      editor.setLineNumbers(false);
      editor.setLineNumbers(true);
      
      // View should still be split
      expect(editor.currentView).toBe('split');
    });
  });

  describe('Dynamic Line Number Updates', () => {
    test('should update line number start dynamically', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: 'Line 1\nLine 2'
      });
      
      editor.setLineNumberStart(50);
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines[0].textContent).toBe('50');
      expect(gutterLines[1].textContent).toBe('51');
    });

    test('should not update if line numbers are disabled', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: false,
        initialContent: 'Line 1\nLine 2'
      });
      
      // This should not throw an error
      editor.setLineNumberStart(50);
      
      // No line gutter should exist
      const lineGutter = document.querySelector('.squibview-line-gutter');
      expect(lineGutter).toBeFalsy();
    });
  });

  describe('View Mode Integration', () => {
    test('should show line numbers in source view', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialView: 'src'
      });
      
      const sourcePanel = document.querySelector('.squibview-source-panel');
      expect(sourcePanel).toBeTruthy();
      expect(sourcePanel.style.display).not.toBe('none');
    });

    test('should show line numbers in split view', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialView: 'split'
      });
      
      const sourcePanel = document.querySelector('.squibview-source-panel');
      expect(sourcePanel).toBeTruthy();
      expect(sourcePanel.style.width).toBe('50%');
    });

    test('should hide source panel in html view', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialView: 'html'
      });
      
      const sourcePanel = document.querySelector('.squibview-source-panel');
      expect(sourcePanel).toBeTruthy();
      expect(sourcePanel.classList.contains('squibview-hidden')).toBe(true);
    });
  });

  describe('Event Listener Management', () => {
    test('should properly manage line number elements when toggling', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true
      });
      
      // Line number elements should exist
      expect(document.querySelector('.squibview-line-gutter')).toBeTruthy();
      expect(document.querySelector('.squibview-line-mirror')).toBeTruthy();
      
      // Toggle off
      editor.setLineNumbers(false);
      
      // Line number elements should not exist after toggle off
      expect(document.querySelector('.squibview-line-gutter')).toBeFalsy();
      expect(document.querySelector('.squibview-line-mirror')).toBeFalsy();
      
      // Toggle back on
      editor.setLineNumbers(true);
      
      // Elements should exist again
      expect(document.querySelector('.squibview-line-gutter')).toBeTruthy();
      expect(document.querySelector('.squibview-line-mirror')).toBeTruthy();
    });

    test('should remove line mirror when cleaning up', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true
      });
      
      // Line mirror should exist
      let lineMirror = document.querySelector('.squibview-line-mirror');
      expect(lineMirror).toBeTruthy();
      
      // Toggle off
      editor.setLineNumbers(false);
      
      // Line mirror should be removed
      lineMirror = document.querySelector('.squibview-line-mirror');
      expect(lineMirror).toBeFalsy();
    });

    test('should properly clean up references when toggling', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true
      });
      
      // Store references
      const initialLineGutter = editor.lineGutter;
      const initialSourcePanel = editor.sourcePanel;
      const initialLineMirror = editor.lineMirror;
      
      // All should be defined
      expect(initialLineGutter).toBeDefined();
      expect(initialSourcePanel).toBeDefined();
      expect(initialLineMirror).toBeDefined();
      
      // Toggle off
      editor.setLineNumbers(false);
      
      // References should be cleaned up
      expect(editor.lineGutter).toBeUndefined();
      expect(editor.sourcePanel).toBeUndefined();
      expect(editor.lineMirror).toBeUndefined();
      
      // DOM elements should be removed
      expect(document.body.contains(initialLineGutter)).toBe(false);
      expect(document.body.contains(initialSourcePanel)).toBe(false);
      expect(document.body.contains(initialLineMirror)).toBe(false);
    });
  });

  describe('Performance Considerations', () => {
    test('should handle large documents efficiently', () => {
      // Create content with 1000 lines
      const lines = [];
      for (let i = 1; i <= 1000; i++) {
        lines.push(`Line ${i}: Some content here`);
      }
      const largeContent = lines.join('\n');
      
      const startTime = performance.now();
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: largeContent
      });
      const endTime = performance.now();
      
      // Should initialize in reasonable time (less than 500ms)
      expect(endTime - startTime).toBeLessThan(500);
      
      // Should have correct number of line numbers
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(1000);
    });

    test('should debounce line number updates', (done) => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: 'Initial'
      });
      
      // Spy on updateLineNumbers
      const updateSpy = jest.spyOn(editor, 'updateLineNumbers');
      
      // Rapid content changes
      editor.setContent('Change 1');
      editor.setContent('Change 2');
      editor.setContent('Change 3');
      
      // Should be called immediately for setContent
      expect(updateSpy).toHaveBeenCalled();
      const initialCallCount = updateSpy.mock.calls.length;
      
      // Wait for debounce
      setTimeout(() => {
        // Should not have been called many more times due to debouncing
        expect(updateSpy.mock.calls.length).toBeLessThanOrEqual(initialCallCount + 1);
        done();
      }, 150);
    });
  });

  describe('Edge Cases', () => {
    test('should handle content with no trailing newline', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: 'Single line without newline'
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(1);
    });

    test('should handle completely empty content', () => {
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: ''
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(1); // Should show at least line 1
    });

    test('should handle very long single lines', () => {
      const longLine = 'x'.repeat(1000); // 1000 character line
      const editor = new SquibView('#editor', {
        showLineNumbers: true,
        initialContent: longLine
      });
      
      const gutterLines = document.querySelectorAll('.squibview-gutter-line');
      expect(gutterLines.length).toBe(1);
      
      // In jsdom, getBoundingClientRect returns 0, so we just check the element exists and has height style
      expect(gutterLines[0].style.height).toBeTruthy();
      expect(gutterLines[0].style.height).toMatch(/^\d+px$/);
    });
  });
});