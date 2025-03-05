/* SquibView a live md/html/etc Editor/renderer with copy support
 supports markdown, html, and split view
 supports copying of formatted html and markdown
 supports copying of images as data urls
 supports copying of svg as png
 supports copying of tables as formatted tables
 supports copying of code blocks as formatted tables
 by deftio (c) 2024
*/

class SquibView {
  static defaultOptions = {
    initialContent: '',
    inputContentType: 'md', // 'md', 'html', 'reveal', 'csv' or 'tsv'
    showControls: true,
    titleShow: false,
    titleContent: '',
    initialView: 'split',
    baseClass: 'squibview',
    show_md_buttons: true
  };

  
  static version = {
    version: "0.0.27",
    url: "https://github.com/deftio/squibview"
  };

  constructor(element, options = {}) {
    this.options = { ...SquibView.defaultOptions, ...options };

    this.options.show_md_buttons = this.options.show_md_buttons && this.options.inputContentType === 'md';
    
    this.container = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Initialize undo/redo buffer we should also have a way to clear it or access an abitrary version of it
    this.revisions = {buffer : [], index : 0};
  
    // iniit all the libs and 
    this.initializeLibraries();
    this.createStructure();
    this.initializeEventHandlers();
    this.initializeResizeObserver();  // resize container if needed

    // set content
    if (this.options.initialContent)
      this.setContent(this.options.initialContent, this.options.inputContentType);
    this.setView(this.options.initialView);  // src / rendered / split
    
  }

  initializeLibraries() {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default',
      errorCallback: function (error) {
        console.warn("Mermaid error:", error);
        return "<div class='mermaid-error'></div>"; // Replace with custom message
      }
    });
    mermaid.init(undefined, ".mermaid");
    this.md = window.markdownit({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) { }
        }
        return '';
      }
    });

    const defaultFence = this.md.renderer.rules.fence ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    this.md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const info = token.info.trim();
      if (info === 'mermaid') {
        return '<div class="mermaid">' + token.content + '</div>';
      }
      if (info === 'svg') {
        return token.content;
      }
      return defaultFence(tokens, idx, options, env, self);
    };
  }

  createStructure() {
    this.container.classList.add(this.options.baseClass);

    this.md_buttons= this.options.show_md_buttons ? `<button  onclick="editor.markdownRemoveAllHR()">Remove HR</button>
  <button  onclick="editor.markdownEditorAdjustHeadings(-1)">H-</button>
  <button  onclick="editor.markdownEditorAdjustHeadings(+1)">H+</button>
  <button  onclick="editor.revisionUndo()">&#x21A9</button>
  <button  onclick="editor.revisionRedo()">&#x21AA</button>` : "";

    this.container.innerHTML = `
        <div class="${this.options.baseClass}-title" ${!this.options.titleShow ? 'style="display:none"' : ''}>
          ${this.options.titleContent}
        </div>
        <div class="${this.options.baseClass}-controls" ${!this.options.showControls ? 'style="display:none"' : ''}>
          <button data-view='src'>Source</button>
          <button data-view="html">Rendered</button>
          <button data-view="split">Split</button>
          <button class="copy-src-button">Copy Source</button>
          <button class="copy-html-button">Copy Rendered</button>
          <span>${this.md_buttons}</span>
        </div>
        <div class="${this.options.baseClass}-editor">
          <textarea class="${this.options.baseClass}-input"></textarea>
          <div class="${this.options.baseClass}-output"></div>
        </div>
      `;

    this.title = this.container.querySelector(`.${this.options.baseClass}-title`);
    this.controls = this.container.querySelector(`.${this.options.baseClass}-controls`);
    this.editor = this.container.querySelector(`.${this.options.baseClass}-editor`);
    this.input = this.container.querySelector(`.${this.options.baseClass}-input`);
    this.output = this.container.querySelector(`.${this.options.baseClass}-output`);

    
  }

  initializeEventHandlers() {
    this.controls.querySelectorAll('button[data-view]').forEach(button => {
      button.addEventListener('click', () => this.setView(button.dataset.view));
    });

    this.controls.querySelector('.copy-src-button').addEventListener('click', () => this.copySource());
    this.controls.querySelector('.copy-html-button').addEventListener('click', () => this.copyHTML());

    //onchange() for input source
    this.input.addEventListener('input', () => { this.setContent(); });
  }
  initializeResizeObserver() {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === this.container) {
          this.adjustLayout();
        }
      }
    });
    resizeObserver.observe(this.container);
  }

  adjustLayout() {
    const containerRect = this.container.getBoundingClientRect();
    const titleHeight = this.title.offsetHeight;
    const controlsHeight = this.controls.offsetHeight;

    const availableHeight = containerRect.height - titleHeight - controlsHeight;
    const availableWidth = containerRect.width;
    this.editor.style.height = `${availableHeight}px`;
    this.editor.style.width = `${availableWidth}px`;

    if (this.currentView === 'split') {
      this.input.style.width = '50%';
      this.output.style.width = '50%';
    } else if (this.currentView === 'src') {
      this.input.style.width = '100%';
    } else if (this.currentView === 'html') {
      this.output.style.width = '100%';
    }
  }

  setContent(content = this.input.value, contentType = this.inputContentType, saveRevision = true) {
    this.input.value = content;
    this.inputContentType = contentType;
    // push the content to the revisions
    if (saveRevision) {
      this.revisions.buffer.push({ content, contentType });
      this.revisions.index = this.revisions.buffer.length - 1;  
      // remove all the revisions after the current index
      this.revisions.buffer = this.revisions.buffer.slice(0, this.revisions.index + 1);
    }
    // render it
    this.renderOutput();
  }

  // if possible undo the last change else do nothing
  revisionUndo() {
    // if possible undo the last change else do nothing, use the revisions buffer and index
    if (this.revisions.buffer.length > 0 && this.revisions.index > 0) {
      this.revisions.index--;
      const lastChange = this.revisions.buffer[this.revisions.index];
      this.input.value = lastChange.content;
      this.inputContentType = lastChange.contentType;
      //console.log(this.revisions.index);
      this.renderOutput();

    }
  }
  // if possible redo the last change else do nothing
  revisionRedo() {
    if (this.revisions.index < this.revisions.buffer.length - 1) {
      this.revisions.index++;
      const lastChange = this.revisions.buffer[this.revisions.index];
      this.input.value = lastChange.content;
      this.inputContentType = lastChange.contentType;
      //console.log(this.revisions.index);
      this.renderOutput();
    }
  }
  revisionSet(index) {
    if (index >= 0 && index < this.revisions.buffer.length) {
      this.revisions.index = index;
      const lastChange = this.revisions.buffer[this.revisions.index];
      this.input.value = lastChange.content;
      this.inputContentType = lastChange.contentType;
      //console.log(this.revisions.index);
      this.renderOutput();
    }
  }
  revisionNumRevsions() {
    return this.revisions.buffer.length;
  }
  revisionGetCurrentIndex() {
    return this.revisions.index;
  }

  getContent() {
    return this.input.value;
  }

  cleanMarkdown(md) {
    return md.replace(/^```markdown\s+/, '').replace(/```$/, '');
  }

  async renderMarkdown(md) {

    const markdown = md || this.input.value;
    const html = this.md.render(markdown);
    this.output.innerHTML = "<div contenteditable='true'>" + html + "</div>";

    // Convert all images to data URLs immediately after rendering
    const contentDiv = this.output.querySelector('div[contenteditable="true"]');
    const images = contentDiv.querySelectorAll('img');

    // render images to data urls

    for (const img of images) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Create new image and wait for it to load
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          tempImg.onload = () => {
            // Set canvas size to match image
            canvas.width = tempImg.naturalWidth;
            canvas.height = tempImg.naturalHeight;

            // Draw image to canvas
            ctx.drawImage(tempImg, 0, 0);

            // Convert to data URL
            const dataUrl = canvas.toDataURL('image/png', 1.0);

            // Update original image
            img.src = dataUrl;
            resolve();
          };
          tempImg.onerror = reject;
          tempImg.src = img.src;
        });
      } catch (error) {
        console.error('Failed to convert image:', error);
      }

    }

    // end of images to data urls

    // Initialize mermaid diagrams after all images are processed
    mermaid.init(undefined, this.output.querySelectorAll('.mermaid'));
  } // end of renderMarkdown

  // todo rename sourceRemoveAllHR ()  ==> handled markdown or html via replace (---) or (<hr>, <hr/>) respectively
  markdownRemoveAllHR() {
    if (this.inputContentType === 'md') {
      const markdown = this.getMarkdownSource();
      const newMarkdown = markdown.replace(/---/g, '');
      this.setContent(newMarkdown, this.inputContentType);
    }
  }
  /**
   * Adjusts the heading levels in Markdown text by a specified offset.
   * 
   * @param {string} markdown - The Markdown text to process
   * @param {number} offset - The amount to adjust heading levels by (positive to increase, negative to decrease)
   * @returns {string} - The Markdown text with adjusted heading levels
   */
  markdownAdjustHeadings(markdown, offset) {
    // Early exit if offset is 0 or invalid input
    if (offset === 0 || typeof markdown !== 'string') {
      return markdown;
    }

    // Split the input into lines
    const lines = markdown.split('\n');

    // Process each line
    const modifiedLines = lines.map(line => {
      // Regex to match heading lines: starts with 1-6 hash symbols followed by a space
      const headingMatch = line.match(/^(#{1,6})\s/);

      if (!headingMatch) {
        // Not a heading, return unchanged
        return line;
      }

      const currentHeadingLevel = headingMatch[1].length;
      // Calculate new heading level with bounds checking (min 1, max 6)
      const newHeadingLevel = Math.min(Math.max(currentHeadingLevel + offset, 1), 6);

      // Replace the heading prefix with the new level
      return '#'.repeat(newHeadingLevel) + line.substring(currentHeadingLevel);
    });

    // Join the lines back together
    return modifiedLines.join('\n');
  }
  markdownEditorAdjustHeadings(offset) {
    const markdown = this.getMarkdownSource();
    const newMarkdown = this.markdownAdjustHeadings(markdown, offset);
    this.setContent(newMarkdown, this.inputContentType);
  }

  setView(view) {
    this.currentView = view;

    this.controls.querySelectorAll('button[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    const copyMDButton = this.controls.querySelector('.copy-src-button');
    const copyHTMLButton = this.controls.querySelector('.copy-html-button');

    if (view === 'src') {
      this.input.classList.remove('squibview-hidden');
      this.output.classList.add('squibview-hidden');
      this.input.style.width = '100%';
      copyMDButton.classList.remove('squibview-hidden');
      copyHTMLButton.classList.add('squibview-hidden');
    } else if (view === 'html') {
      this.input.classList.add('squibview-hidden');
      this.output.classList.remove('squibview-hidden');
      this.output.style.width = '100%';
      copyMDButton.classList.add('squibview-hidden');
      copyHTMLButton.classList.remove('squibview-hidden');
    } else { // view == 'split'
      this.input.classList.remove('squibview-hidden');
      this.output.classList.remove('squibview-hidden');
      this.input.style.width = '50%';
      this.output.style.width = '50%';
      copyMDButton.classList.remove('squibview-hidden');
      copyHTMLButton.classList.remove('squibview-hidden');
    }

    this.adjustLayout();
  }

  async copyContent() {
    const copyButton = this.controls.querySelector('.copy-button');
    copyButton.textContent = 'Copying...';

    try {
      const contentDiv = this.output.querySelector('div[contenteditable="true"]');
      if (!contentDiv) {
        throw new Error('Content div not found');
      }

      const clone = contentDiv.cloneNode(true);

      clone.querySelectorAll('pre code').forEach(block => {
        const formattedCode = block.innerHTML;

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.border = 'none';

        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.style.backgroundColor = '#f7f7f7';
        td.style.padding = '12px';
        td.style.fontFamily = 'Consolas, Monaco, "Courier New", monospace';
        td.style.whiteSpace = 'pre';
        td.style.border = 'none';

        td.innerHTML = formattedCode.trim();

        tr.appendChild(td);
        table.appendChild(tr);
        block.parentNode.replaceWith(table);
      });

      const svgElements = clone.querySelectorAll('svg');
      for (const svg of svgElements) {
        try {
          const pngBlob = await this.svgToPng(svg);
          const dataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(pngBlob);
          });

          const img = document.createElement('img');
          img.src = dataUrl;
          img.width = svg.clientWidth || svg.viewBox.baseVal.width || 100;
          img.height = svg.clientHeight || svg.viewBox.baseVal.height || 100;
          img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
          img.style.width = img.width + 'px';
          img.style.height = img.height + 'px';
          img.alt = "Converted diagram";
          svg.parentNode.replaceChild(img, svg);
        } catch (error) {
          console.error('Failed to convert SVG:', error);
        }
      }


      // Convert all images to data URLs
      const imgElements = clone.querySelectorAll('img');
      await Promise.all(imgElements.map(async img => {
        console.log('Converting image:', img.src);

        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Create new image and wait for it to load completely
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';

        try {
          await new Promise((resolve, reject) => {
            tempImg.onload = resolve;
            tempImg.onerror = reject;
            tempImg.src = img.src;
          });

          // Set dimensions
          canvas.width = tempImg.offsetWidth || img.offsetWidth || 200;
          canvas.height = tempImg.offsetHeight || img.offsetHeight || 200;

          // Draw and convert
          ctx.drawImage(tempImg, 0, 0);
          const dataUrl = canvas.toDataURL('image/png', 1.0);

          // Create and wait for new image with data URL
          const newImg = new Image();
          await new Promise((resolve, reject) => {
            newImg.onload = () => {
              newImg.alt = img.alt || 'Converted image';
              newImg.width = canvas.width;
              newImg.height = canvas.height;
              newImg.style.cssText = img.style.cssText;
              // Force image to be treated as embedded
              newImg.setAttribute('data-embedded', 'true');
              // Replace the old image
              img.parentNode.replaceChild(newImg, img);
              console.log('Successfully converted image to data URL');
              resolve();
            };
            newImg.onerror = reject;
            newImg.src = dataUrl;
          });
        } catch (error) {
          console.error('Error converting image:', error, img.src);
          // Don't rethrow - we want to continue with other images
        }
      }));


      const clipData = new ClipboardItem({
        'text/html': new Blob([`
            <html xmlns:v="urn:schemas-microsoft-com:vml"
                  xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word">
              <head>
                <meta charset="utf-8">
                <style>
                  table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }
                  th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                  th { background-color: #f0f0f0; font-weight: bold; }

                  /* Code block styling */
                  .hljs { display: block; overflow-x: auto; padding: 1em; }
                  .hljs-keyword { color: #0033B3; }
                  .hljs-string { color: #067D17; }
                  .hljs-comment { color: #8C8C8C; }
                  .hljs-function { color: #00627A; }
                  .hljs-number { color: #1750EB; }
                  .hljs-operator { color: #687687; }
                  .hljs-punctuation { color: #000000; }

                  /* Word-specific image handling */
                  img { display: block; max-width: none; }
                </style>
              </head>
              <body>
                ${clone.innerHTML}
              </body>
            </html>
          `], { type: 'text/html' }),
        'text/plain': new Blob([clone.innerText], { type: 'text/plain' })
      });

      await navigator.clipboard.write([clipData]);
      copyButton.textContent = 'Copied!';
    } catch (err) {
      console.error('Copy failed:', err);
      copyButton.textContent = 'Copy failed';
    }

    setTimeout(() => {
      copyButton.textContent = 'Copy';
    }, 2000);
  }

  svgToPng(svgElement) {
    return new Promise((resolve, reject) => {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      const scale = 2;
      const svgWidth = svgElement.clientWidth || svgElement.viewBox.baseVal.width || 100;
      const svgHeight = svgElement.clientHeight || svgElement.viewBox.baseVal.height || 100;

      canvas.width = svgWidth * scale;
      canvas.height = svgHeight * scale;
      ctx.scale(scale, scale);

      img.onload = () => {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
          canvas.toBlob(blob => {
            resolve(blob);
          }, 'image/png', 1.0);
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = reject;
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      img.src = svgDataUrl;
    });
  }

  controlsShow(show) {
    this.controls.style.display = show ? '' : 'none';
    this.options.showControls = show;
    this.adjustLayout();
  }

  titleShow(show) {
    this.title.style.display = show ? '' : 'none';
    this.options.titleShow = show;
    this.adjustLayout();
  }

  titleSetContent(content) {
    this.title.innerHTML = content;
    this.options.titleContent = content;
  }

  titleGetContent() {
    return this.title.innerHTML;
  }

  getMarkdownSource() {
    return this.input.value;
  }

  getHTMLSource() {
    return this.output.querySelector('div[contenteditable="true"]').innerHTML;
  }

  // Standalone function to toggle between Markdown preview and split view
  toggleView() {
    const editor = window.editor;
    if (editor.currentView === 'src') {
      editor.setView('split');
    } else if (editor.currentView === 'split') {
      editor.setView('html');
    } else
      editor.setView('src')

    console.log(editor.currentView)
  }

  /**
   * Creates an iframe that fills the entire parent element and injects provided HTML content.
   * @param {HTMLElement} parentElement - The parent element to contain the iframe.
   * @param {string} htmlContent - The HTML content to inject into the iframe.
   */
  insertContentInIframe(parentElement, htmlContent) {
    // Create an iframe element
    const iframe = document.createElement('iframe');

    // Style the iframe to fill the parent completely
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    //iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    // Append the iframe to the parent element
    parentElement.innerHTML = '';
    parentElement.appendChild(iframe);

    // Access the iframe's document and write the HTML content into it
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
    this.output_iframe = iframe
    this.output_ifraome_content = htmlContent;
  }
  // this function takes input as html and renders it in an iframe in the output div
  // it write to the outputDiv that is a member of this object
  renderHTML(src) {
    const htmlContent = src;
    const outputDiv = this.output;
    this.insertContentInIframe(outputDiv, htmlContent);
  }

  renderOutput() {
    switch (this.inputContentType) {
      case 'html':
        this.renderHTML(this.input.value)
        break;
      case 'reveal':
        this.renderHTML(this.makeRevealJSFullPage(this.input.value))
        break;
      case 'csv': // comma separated
      case 'tsv': // tab separated
      case 'semisv': // semicolon separated
      case 'ssv': //space separated
        // take the input and treat it as csv / tsv and convert it to markdown to render on the fly
        const data = this.getContent();
        // delimiter can be commma, tab, space, or semi-colon
        let delimiter = ",";
        const delims = { "tsv": ",", "semisv": ";", "ssv": " " };
        if (this.inputContentType in delims)
          delimiter = delims[this.inputContentType];
        const markdownTable = this.csvOrTsvToMarkdownTable(data, delimiter);
        this.renderMarkdown(markdownTable);
        break;
      case 'md':
        this.renderMarkdown();
        break;
      default:
        this.renderMarkdown();
        console.log("Unsupported content type: ", this.inputContentType);
    }
  }

  async copySource() {
    const copyButton = this.controls.querySelector('.copy-src-button');
    copyButton.textContent = 'Copying...';

    try {
      const markdownText = this.getMarkdownSource();

      try {
        await navigator.clipboard.writeText(markdownText);
      } catch (modernErr) {
        const textarea = document.createElement('textarea');
        textarea.value = markdownText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        //const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        //if (!successful) throw new Error('Fallback copy failed');
      }

      copyButton.textContent = 'Copied!';
    } catch (err) {
      console.error('Copy Markdown failed:', err);
      copyButton.textContent = 'Copy failed';
    }

    setTimeout(() => {
      copyButton.textContent = 'Copy Source';
    }, 2000);
  }

  async copyHTML() {
    const copyButton = this.controls.querySelector('.copy-html-button');
    copyButton.textContent = 'Copying...';

    try {
      const contentDiv = this.output.querySelector('div[contenteditable="true"]');
      if (!contentDiv) {
        throw new Error('Content div not found');
      }

      const clone = contentDiv.cloneNode(true);

      // Process code blocks
      clone.querySelectorAll('pre code').forEach(block => {
        const formattedCode = block.innerHTML;

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.border = 'none';

        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.style.backgroundColor = '#f7f7f7';
        td.style.padding = '12px';
        td.style.fontFamily = 'Consolas, Monaco, "Courier New", monospace';
        td.style.whiteSpace = 'pre';
        td.style.border = 'none';

        td.innerHTML = formattedCode.trim();

        tr.appendChild(td);
        table.appendChild(tr);
        block.parentNode.replaceWith(table);
      });

      // Convert SVG elements to PNG
      const svgElements = clone.querySelectorAll('svg');
      for (const svg of svgElements) {
        try {
          const pngBlob = await this.svgToPng(svg);
          const dataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(pngBlob);
          });

          const img = document.createElement('img');
          img.src = dataUrl;
          img.width = svg.clientWidth || svg.viewBox.baseVal.width || 100;
          img.height = svg.clientHeight || svg.viewBox.baseVal.height || 100;
          img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
          img.style.width = img.width + 'px';
          img.style.height = img.height + 'px';
          img.alt = "Converted diagram";
          svg.parentNode.replaceChild(img, svg);
        } catch (error) {
          console.error('Failed to convert SVG:', error);
        }
      }

      const htmlContent = `
          <html xmlns:v="urn:schemas-microsoft-com:vml"
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:w="urn:schemas-microsoft-com:office:word">
            <head>
              <meta charset="utf-8">
              <style>
                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; font-weight: bold; }

                /* Code block styling */
                .hljs { display: block; overflow-x: auto; padding: 1em; }
                .hljs-keyword { color: #0033B3; }
                .hljs-string { color: #067D17; }
                .hljs-comment { color: #8C8C8C; }
                .hljs-function { color: #00627A; }
                .hljs-number { color: #1750EB; }
                .hljs-operator { color: #687687; }
                .hljs-punctuation { color: #000000; }

                /* Word-specific image handling */
                img { display: block; max-width: none; }
              </style>
            </head>
            <body>
              ${clone.innerHTML}
            </body>
          </html>`;

      const platform = this.getPlatform();

      if (platform === 'macos') {
        // macOS approach (previously working version)
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([htmlContent], { type: 'text/html' }),
              'text/plain': new Blob([clone.innerText], { type: 'text/plain' })
            })
          ]);
        } catch (modernErr) {
          // Safari fallback
          if (!this.copyToClipboard(htmlContent)) {
            throw new Error('Fallback copy failed');
          }
        }
      } else {
        // Windows/Linux approach
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([htmlContent], { type: 'text/html' }),
              'text/plain': new Blob([clone.innerText], { type: 'text/plain' })
            })
          ]);
        } catch (modernErr) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(tempDiv);
          selection.removeAllRanges();
          selection.addRange(range);

          const successful = document.execCommand('copy');
          if (!successful) {
            throw new Error('Fallback copy failed');
          }
        } finally {
          if (tempDiv && tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
          }
        }
      }

      copyButton.textContent = 'Copied!';
    } catch (err) {
      console.error('Copy HTML failed:', err);
      copyButton.textContent = 'Copy failed';
    }

    setTimeout(() => {
      copyButton.textContent = 'Copy Formatted';
    }, 2000);
  }

  copyToClipboard(string) {
    let textarea;
    let result;

    try {
      textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', true);
      textarea.setAttribute('contenteditable', true);
      textarea.style.position = 'fixed';
      textarea.style.left = '0';
      textarea.style.top = '0';
      textarea.style.opacity = '0';
      textarea.value = string;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand('copy');
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      if (textarea && textarea.parentNode) {
        document.body.removeChild(textarea);
      }
    }

    // manual copy fallback using prompt
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
      result = prompt(`Press ${copyHotkey}`, string);
      if (!result) {
        return false;
      }
    }
    return true;
  }

  getPlatform() {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    if (platform.includes('mac') || userAgent.includes('mac')) {
      return 'macos';
    } else if (userAgent.includes('windows')) {
      return 'windows';
    } else if (userAgent.includes('linux')) {
      return 'linux';
    }
    return 'unknown';
  }

  // Make a complete HTML page from a div (or any html snippet) with optional editability
  makeHTMLPageFromDiv(inputDivHTML, editable = false) {
    let editableAttr = editable ? 'contenteditable="true"' : '';
    let s =
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Viewer with Graphics Support</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
  <xscripx src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></xscripx>
  <xscripx src="https://unpkg.com/mermaid/dist/mermaid.min.js"></xscripx>
  <style>
      body {
          font-family: Arial, sans-serif;
          box-sizing: border-box;
          padding: 20px;
      }
      .squibview-output {
          width: 50%;
          margin: auto;
      }
      pre {
          background-color: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
          overflow-x: auto;
      }
      table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
      }
      table, th, td {
          border: 1px solid black;
      }
      th, td {
          padding: 8px;
          text-align: left;
      }
  </style>
</head>
<body ${editableAttr}>
  ${inputDivHTML}
</body>
</html>`;
    // now we need to remove the temp-script tag with the script in it.
    // we do this with a regex search/replace
    s = s.replaceAll("xscripx", "script");
    console.log(editableAttr);
    return s;
  }

  makeRevealJSFullPage(markdown, title = "Slide Presentation") {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css">
      <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  </head>
  <body>
      <div class="reveal" contenteditable="true">
          <div class="slides">
              ${markdown.split('---').map(slide => `<section data-markdown><script type="text/template">${slide.trim()}</script></section>`).join('\n')}
          </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js"></script>
      <script>
          Reveal.initialize({
              plugins: [ RevealMarkdown ]
          });
          
          // Ensure Mermaid diagrams initialize correctly
          document.addEventListener('DOMContentLoaded', () => {
              mermaid.initialize({ startOnLoad: true , securityLevel: 'loose', theme: 'dark' });
              document.querySelectorAll('.mermaid').forEach(el => {
                  el.innerHTML = el.textContent;
                  mermaid.init(undefined, el);
              });
          });
      </script>
  </body>
  </html>`;
  }

  csvOrTsvToMarkdownTable(input, delimiter = ',') {
    // Parse CSV/TSV content
    const parsedData = Papa.parse(input, {
      delimiter,
      skipEmptyLines: true
    });

    const rows = parsedData.data;

    if (rows.length === 0) return 'No data found.';

    // Markdown table header
    const header = `| ${rows[0].join(' | ')} |`;
    const separator = `| ${rows[0].map(() => '---').join(' | ')} |`;
    const tableRows = rows.slice(1).map(row => `| ${row.join(' | ')} |`).join('\n');

    return `${header}\n${separator}\n${tableRows}`;
  }


}// end of class SquibView

export default SquibView;
