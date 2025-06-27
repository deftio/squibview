# squibv (cli) issues
Squibview 1.0.10:

Running squibv in another new terminal gives this:
```bash
npx squibv
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/squibv - Not found
npm error 404
npm error 404  'squibv@*' is not in this registry.
npm error 404
npm error 404 Note that you can also install from a
npm error 404 tarball, folder, http url, or git url.
npm error A complete log of this run can be found in: /Users/manu/.npm/_logs/2025-06-26T20_47_48_868Z-debug-0.log
manu@MacBookPro ~ % npx squibview
Need to install the following packages:
squibview@1.0.10
Ok to proceed? (y) y

Usage: squibv [options] [command] [file]

Convert Markdown files to high-quality HTML using SquibView (v1.0.10)

Arguments:
  file                    Input Markdown file

Options:
  -V, --version           output the version number
  -i, --input <source>    Input source (file path or "-" for stdin)
  -o, --output <dest>     Output destination (file path, "-" or "stdout" for
                          stdout)
  -s, --standalone        Create self-contained HTML file (default: true)
                          (default: true)
  --css <file>            Custom CSS file to override default styles
  --bundle-offline        Bundle MathJax, Mermaid, and highlight.js locally for
                          offline use
  --log <file>            Log file for messages (default: stderr)
  --quiet                 Suppress progress messages
  -w, --watch             Watch input file for changes and rebuild automatically
  -h, --help              display help for command

Commands:
  build [options] [file]  Convert Markdown file to HTML
manu@MacBookPro ~ % npx squibv
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/squibv - Not found
npm error 404
npm error 404  'squibv@*' is not in this registry.
npm error 404
npm error 404 Note that you can also install from a
npm error 404 tarball, folder, http url, or git url.
npm error A complete log of this run can be found in: /Users/manu/.npm/_logs/2025-06-26T20_48_13_831Z-debug-0.log
manu@MacBookPro ~ % npx squibview
Usage: squibv [options] [command] [file]

Convert Markdown files to high-quality HTML using SquibView (v1.0.10)

Arguments:
  file                    Input Markdown file

Options:
  -V, --version           output the version number
  -i, --input <source>    Input source (file path or "-" for stdin)
  -o, --output <dest>     Output destination (file path, "-" or "stdout" for
                          stdout)
  -s, --standalone        Create self-contained HTML file (default: true)
                          (default: true)
  --css <file>            Custom CSS file to override default styles
  --bundle-offline        Bundle MathJax, Mermaid, and highlight.js locally for
                          offline use
  --log <file>            Log file for messages (default: stderr)
  --quiet                 Suppress progress messages
  -w, --watch             Watch input file for changes and rebuild automatically
  -h, --help              display help for command

Commands:
  build [options] [file]  Convert Markdown file to HTML
```


Running squibv on another computer gives this:

```bash
npx squibv
file://home/manu/deftio/squibview/cli/bin/squibv.js:31
  .argument('[file]',  'Input  Markdown file')
  ^

TypeError : program.command(...).  {more content}


Node.js v22.6.0

