# revealjs 

Notes on revealjs generation

Possible example:

code:

```javascript
    function makeRevealJSFullPage(markdown, title = "Reveal.js Markdown Presentation") {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css">
</head>
<body>
    <div class="reveal">
        <div class="slides">
            ${markdown.split('---').map(slide => `<section data-markdown><fake-script type="text/template">${slide.trim()}</fake-script></section>`).join('\n')}
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js"></script>
    <script>
        document.querySelectorAll('fake-script').forEach(el => {
            let newScript = document.createElement('script');
            newScript.type = el.type;
            newScript.innerHTML = el.innerHTML;
            el.replaceWith(newScript);
        });
        Reveal.initialize({
            plugins: [ RevealMarkdown ]
        });
    </script>
</body>
</html>`;
    }
```

HTML page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal.js Markdown Presentation</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css">
</head>
<body>
    <div class="reveal">
        <div class="slides" id="slides-container">
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js"></script>
    <script>
        function makeSlideDeckPage(markdown_slide_content) {
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal.js Markdown Presentation</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css">
</head>
<body>
    <div class="reveal">
        <div class="slides">
            ${markdown_slide_content.split('---').map(slide => `<section data-markdown><fake-script type="text/template">${slide.trim()}</fake-script></section>`).join('\n')}
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js"></script>
    <script>
        document.querySelectorAll('fake-script').forEach(el => {
            let newScript = document.createElement('script');
            newScript.type = el.type;
            newScript.innerHTML = el.innerHTML;
            el.replaceWith(newScript);
        });
        Reveal.initialize({
            plugins: [ RevealMarkdown ]
        });
    </script>
</body>
</html>`;
        }
        
        function makeSlideDeckDiv(container, markdown_slide_content) {
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }
            if (!container) return;
            
            container.innerHTML = markdown_slide_content.split('---')
                .map(slide => `<section data-markdown><fake-script type="text/template">${slide.trim()}</fake-script></section>`)
                .join('\n');
            
            document.querySelectorAll('fake-script').forEach(el => {
                let newScript = document.createElement('script');
                newScript.type = el.type;
                newScript.innerHTML = el.innerHTML;
                el.replaceWith(newScript);
            });
            
            Reveal.initialize({
                plugins: [ RevealMarkdown ]
            });
        }
    </script>
</body>
</html>
```