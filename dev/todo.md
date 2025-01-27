# TODO for ScriptView


update scripts for builds etc"
```json
 "test": "jest --coverage",
"makeIndexHTML": "node ./node_modules/docbat/src/docbat-cli.js -i README.md -o index.html",
"updateExampleCopies": "cp dist/quikchat.umd.min.js examples/fastapi_llm/static && cp dist/quikchat.min.css examples/fastapi_llm/static && cp dist/quikchat.umd.min.js examples/npm_express/static && cp dist/quikchat.min.css examples/npm_express/static",
"build": "npm run updateVersion && npm run makeIndexHTML && npm run minifyCSS && rollup -c && npm run updateExampleCopies"
```

