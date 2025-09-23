
// This script minifies the css file in ../dist/squibview.css 
// and writes the minified css to ../dist/squibview.min.css

var CleanCSS = require('clean-css');
var fs = require('fs');

// get input css from ../dist/squibview.css
var input = fs.readFileSync('./dist/squibview.css', 'utf8');
var options = { /* options */ };
var output = new CleanCSS(options).minify(input);

//write output to file  ../dist/squibview.min.css
let preamble = `/* SquibView CSS
 * (c) M Chatterjee 2025-
 * https://github.com/deftio/squibview
 */
`;
fs.writeFile('./dist/squibview.min.css', preamble+output.styles, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("squibview css minified: ./dist/squibview.min.css");
});
