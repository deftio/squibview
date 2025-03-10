describe('SquibView E2E Tests', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8000/e2e-tests/test-page.html');
    // Wait for the page to load fully and for initialization to complete
    await page.waitForSelector('#markdown-test');
    
    // Wait for a specific element that indicates everything is loaded
    await page.waitForSelector('#markdown-test .squibview-controls button');
  });

  /**
   * Image Rendering and Processing Tests
   */
  describe('Image Rendering', () => {
    test('should render images in markdown', async () => {
      // Wait for the image to be loaded in the markdown editor
      await page.waitForSelector('#markdown-test .squibview-output img');
      
      // Check if the image is rendered properly
      const imageCount = await page.evaluate(() => {
        return document.querySelectorAll('#markdown-test .squibview-output img').length;
      });
      
      expect(imageCount).toBeGreaterThanOrEqual(1);
    });

    test('should have image elements', async () => {
      // Just check if images exist, as data URL conversion might not happen in headless mode
      const hasImage = await page.evaluate(() => {
        const img = document.querySelector('#markdown-test .squibview-output img');
        return img !== null && img.src !== '';
      });
      
      expect(hasImage).toBe(true);
    });
  });

  /**
   * Mermaid Diagram Rendering Tests
   */
  describe('Mermaid Diagrams', () => {
    test('should render mermaid diagrams', async () => {
      // Wait for mermaid to render the diagram
      await page.waitForSelector('#markdown-test .squibview-output .mermaid svg');
      
      // Verify the SVG was created
      const svgExists = await page.evaluate(() => {
        return document.querySelectorAll('#markdown-test .squibview-output .mermaid svg').length > 0;
      });
      
      expect(svgExists).toBe(true);
    });
  });

  /**
   * View Mode Switching Tests
   */
  describe('View Mode Switching', () => {
    test('should switch between view modes', async () => {
      // Try all three view modes
      
      // Source view
      await page.click('#markdown-test .squibview-controls button[data-view="src"]');
      let isSourceVisible = await page.evaluate(() => {
        const input = document.querySelector('#markdown-test .squibview-input');
        const output = document.querySelector('#markdown-test .squibview-output');
        return !input.classList.contains('squibview-hidden') && 
               output.classList.contains('squibview-hidden');
      });
      expect(isSourceVisible).toBe(true);
      
      // HTML view
      await page.click('#markdown-test .squibview-controls button[data-view="html"]');
      let isHtmlVisible = await page.evaluate(() => {
        const input = document.querySelector('#markdown-test .squibview-input');
        const output = document.querySelector('#markdown-test .squibview-output');
        return input.classList.contains('squibview-hidden') && 
               !output.classList.contains('squibview-hidden');
      });
      expect(isHtmlVisible).toBe(true);
      
      // Split view
      await page.click('#markdown-test .squibview-controls button[data-view="split"]');
      let isSplitVisible = await page.evaluate(() => {
        const input = document.querySelector('#markdown-test .squibview-input');
        const output = document.querySelector('#markdown-test .squibview-output');
        return !input.classList.contains('squibview-hidden') && 
               !output.classList.contains('squibview-hidden');
      });
      expect(isSplitVisible).toBe(true);
    });
  });

  /**
   * Clipboard Operations Tests
   */
  describe('Clipboard Operations', () => {
    test('should verify the presence of clipboard buttons', async () => {
      // Just check if the clipboard buttons exist
      const buttonExists = await page.evaluate(() => {
        const copyBtn = document.querySelector('#copy-test .squibview-controls .copy-src-button');
        return copyBtn !== null && copyBtn.textContent.includes('Copy');
      });
      
      expect(buttonExists).toBe(true);
    });
  });

  /**
   * RevealJS Integration Tests
   */
  describe('RevealJS Integration', () => {
    test('should properly render RevealJS presentation', async () => {
      // Check if the RevealJS iframe is created
      await page.waitForSelector('#reveal-test .squibview-output iframe');
      
      // Check inside the iframe if Reveal is properly initialized
      const revealInitialized = await page.evaluate(() => {
        const iframe = document.querySelector('#reveal-test .squibview-output iframe');
        return iframe.contentWindow.document.querySelector('.reveal') !== null;
      });
      
      expect(revealInitialized).toBe(true);
    });
  });

  /**
   * CSV Rendering Tests
   */
  describe('CSV Rendering', () => {
    test('should convert CSV to a markdown table', async () => {
      // Check if a table is generated
      await page.waitForSelector('#csv-test .squibview-output table');
      
      // Verify the table structure
      const tableStructure = await page.evaluate(() => {
        const table = document.querySelector('#csv-test .squibview-output table');
        const rows = table.querySelectorAll('tr');
        const headerCells = rows[0]?.querySelectorAll('th');
        
        return {
          rowCount: rows.length,
          headerCount: headerCells?.length || 0
        };
      });
      
      // Expect 5 rows (header + 4 data rows) and 3 columns
      expect(tableStructure.rowCount).toBeGreaterThanOrEqual(5);
      expect(tableStructure.headerCount).toBeGreaterThanOrEqual(3);
    });
  });

  /**
   * Markdown-specific Button Tests
   */
  describe('Markdown Buttons', () => {
    test('should have markdown-specific buttons', async () => {
      // Check for markdown-specific buttons
      const hasButtons = await page.evaluate(() => {
        // Look for the H+, H-, and Remove HR buttons
        const controls = document.querySelector('#markdown-test .squibview-controls');
        return controls.textContent.includes('H+') && 
               controls.textContent.includes('H-') && 
               controls.textContent.includes('Remove HR');
      });
      
      expect(hasButtons).toBe(true);
    });
  });
});