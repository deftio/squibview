# TODO for ScriptView


update scripts for builds etc"
```json
 "test": "jest --coverage",
"updateExampleCopies": "cp dist/quikchat.umd.min.js examples/fastapi_llm/static && cp dist/quikchat.min.css examples/fastapi_llm/static && cp dist/quikchat.umd.min.js examples/npm_express/static && cp dist/quikchat.min.css examples/npm_express/static",
"build": "npm run updateVersion && npm run makeIndexHTML && npm run minifyCSS && rollup -c && npm run updateExampleCopies"
```

Features:

* add revealjs as output target
    - like html mode but you enter a md formatted source and it makes a reveal slidedeck.

