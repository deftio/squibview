# TODO for ScriptView


Features:

* make input fns, buttons ==> "src" rather than "md" which was the original design
* add support for react as render type (as iframe) perhaps "react-standalone" and "react-embedded" 
* enable syntax highlighting in "src"
* add test suite
    * started
* add support for render plugins...
* change source button to "source" or "src"
* change output button to be set by the plugin
* add undo / redo support with versions in src editor (or rendered editor) (<< , >>)
* live sync from rendered ==> src
* editor enableSyntaxHighlighting() # assumes a syntax highlighting editor is available
* group all dependencies
* add ability to run squibview as a library at cli (so one can transform md to html or slides to html etc)
* create extra functions / ui for plugins 
** for markdown, add heading up / heading down buttons

## Render Plug-ins 

 || input | input_label | output      | output_label | render_cllb()  | copy_callb() | help_str {} ||
 || md    | "md"        | html        | "html"       | (md)=>html     | ()=>{}       | ..          ||
 || html  | "html"      | html/iframe | "html"       | (html)=>iframe | ()=>{}       | ..          ||
 || slides| "slides"    | html/revealjs/iframe | "slides" | (slides)=>iframe | ()=>{}| ..          ||
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
    output_label : "html,
    // ... add in plugin functions
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


write a file called feedback.md in the /dev folder which outlines how I can improve squibview.js.  The feedback I am looking for is how to improve 
  this component, how to make react and vue components from the core vanilla js component.  How to add live feedback (squibview takes "source" text / 
  md / csv et and renders it to an editable div that is rendered.  But I want to be able to edit the rendered content and update the source.  Also the
   undo/redo is naively implemented.  I want to be more compact so it doesn't take a lot of memory - as of now every change is stored as a full copy 
  rather than a diff in the rendered output.  Can you look at how to implement this and make library and algorithmic recommndations.  Also in markdown
   mode there are special buttons to increase/decrease headings, undo/redo, and remove ---.  Can you make this more modular and provide ways to add 
  extra buttons to other source modes (html, csv, etc) that make sense?   Also right now the rendering types (md, csv, html, etc) are hardcoded.  I 
  feel like these should be made a plugin system in that md->html takes an md_rendrerer() and md_reverse_render(), exta functions for operating on md 
  like the heading increase/decrease, etc.  Undo/redo should be univesral to the squibview component.  Other source types (csv, html, etc) would also 
  be have their rendering engines passed in rather than hard coded.  The task is just to make detailed recommendations but not touch the code.
