# TODO for ScriptView


Features:

* make input ==> "src" rather than "md" which was the original design
* add support for react as render type (as iframe) perhaps "react-standalone" and "react-embedded" 
* enable syntax highlighting in "src"
* add test suite
* add support for render plugins...
* change source button to "source" or "src"
* change output button to be set by the plugin
* editor enableSyntaxHighlighting() # assumes a syntax highlighting editor is available
* group all dependencies

## Render Plug-ins 

 || input | input_label | output      | output_label | render_cllb()  | copy_callb() | help_str {} ||
 || md    | "md"        | html        | "html"       | (md)=>html     | ()=>{}       | ..          ||
 || html  | "html"      | html/iframe | "html"       | (html)=>iframe | ()=>{}       | ..          ||
 || react | "react"     | html        | "html"       | (react)        | ()=>{}       | ..          ||
 || csv   | "csv"       | html        | "html"       | (csv)=>html    | ()=>{}       | ..          ||
 
svg handled by markdown
when render occurs

```javascript
plugin: 
{ 
    input_type : "md", // this is the what is called with setView("md")
    input_label : "markdown", // this is what appears on view source, copy source the button 
    input_langauge_syntax : "markdown", // how the source editor should highlight if enabled
    output_type : "html",
    output_label : "html
    render_cb : (input_buf) => { .. return {"output" : str, "err" : "none", "err_msg" : "str" }} // if none than default md
    copy_cb : (buputbuf) => { .. return {"output" : str, "err": "none"}}  .. if none then default copy
    help_str :  { ..}
}
```

## ACE editor:

<script src="https://cdn.jsdelivr.net/npm/ace-builds@1.37.5/src-noconflict/snippets/python.min.js"></script>
<link href="
https://cdn.jsdelivr.net/npm/ace-builds@1.37.5/css/ace.min.css
" rel="stylesheet">

https://ace.c9.io/#nav=embedding 