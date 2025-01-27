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
      showControls: true,
      titleShow: false,        
      titleContent: '',
      initialView: 'split',
      baseClass: 'squibview'
    };

    static version = {
      version: "0.0.25",
      url : "https://github.com/deftio/squibview"
    };

    constructor(element, options = {}) {
      this.options = { ...SquibView.defaultOptions, ...options };
      this.container = typeof element === 'string' ? document.querySelector(element) : element;

      if (!this.container) {
        throw new Error('Container element not found');
      }

      this.initializeLibraries();
      this.createStructure();
      this.initializeEventHandlers();
      this.setContent(this.options.initialContent);
      this.setView(this.options.initialView);
      this.initializeResizeObserver();
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

      this.container.innerHTML = `
        <div class="${this.options.baseClass}-title" ${!this.options.titleShow ? 'style="display:none"' : ''}>
          ${this.options.titleContent}
        </div>
        <div class="${this.options.baseClass}-controls" ${!this.options.showControls ? 'style="display:none"' : ''}>
          <button data-view="md">Markdown</button>
          <button data-view="html">Rendered</button>
          <button data-view="split">Split</button>
          <button class="copy-md-button">Copy MD</button>
          <button class="copy-html-button">Copy Formatted</button>
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

      this.controls.querySelector('.copy-md-button').addEventListener('click', () => this.copyMarkdown());
      this.controls.querySelector('.copy-html-button').addEventListener('click', () => this.copyHTML());

      this.input.addEventListener('input', () => {
        // use input type to call the renderMarkdown or renderHTML function
        if (this.inputContentType === "html") {
          this.writeHTMLContent(this.input.value)
        } else {
          this.renderMarkdown()
        }
      });
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
      } else if (this.currentView === 'md') {
        this.input.style.width = '100%';
      } else if (this.currentView === 'html') {
        this.output.style.width = '100%';
      }
    }

    setContent(content, contentType = "md") {
      this.input.value = content;
      this.inputContentType = contentType;
      if (contentType === "md") {
        this.renderMarkdown();
      } else if (contentType === "html") {
        this.writeHTMLContent(content);
      }
    }

    getContent() {
      return this.input.value;
    }

    cleanMarkdown(md) {
      return md.replace(/^```markdown\s+/, '').replace(/```$/, '');
    }

    async renderMarkdown() {
      const html = this.md.render(this.input.value);
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

    markdownRemoveAllHR  () {
      if (this.inputContentType === "md") {
        const markdown = this.getMarkdownSource();
        const newMarkdown = markdown.replace(/---/g, '');
        this.setContent(newMarkdown);
      }
    }

    setView(view) {
      this.currentView = view;

      this.controls.querySelectorAll('button[data-view]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
      });

      const copyMDButton = this.controls.querySelector('.copy-md-button');
      const copyHTMLButton = this.controls.querySelector('.copy-html-button');

      if (view === 'md') {
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
      } else {
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
      if (editor.currentView === 'md') {
        editor.setView('split');
      } else if (editor.currentView === 'split') {
        editor.setView('html');
      } else
        editor.setView('md')

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
    writeHTMLContent(src) {
      const htmlContent = src;
      const outputDiv = this.output;
      this.insertContentInIframe(outputDiv, htmlContent);
    }

    async copyMarkdown() {
      const copyButton = this.controls.querySelector('.copy-md-button');
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

          const successful = document.execCommand('copy');
          document.body.removeChild(textarea);

          if (!successful) throw new Error('Fallback copy failed');
        }

        copyButton.textContent = 'Copied!';
      } catch (err) {
        console.error('Copy Markdown failed:', err);
        copyButton.textContent = 'Copy failed';
      }

      setTimeout(() => {
        copyButton.textContent = 'Copy MD';
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

    getVersion() {
      return GraphicalMD.version;
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
          /* margin: 20px; */
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

}// end of class SquibView

export default SquibView;
