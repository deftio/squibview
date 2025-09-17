// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import polyfillNode from 'rollup-plugin-polyfill-node';
// If you actually import package.json or other JSON files, uncomment the next line:
// import json from '@rollup/plugin-json';

const extensions = ['.js'];

/* ------------------------------------------------------------------
   1) "Regular" UMD Build: (NOW BUNDLED WITH CORE DEPS)
   Bundles markdown-it, diff-match-patch, tiny-emitter
   Still leaves heavy deps (mermaid, highlight.js) as external
------------------------------------------------------------------ */
const umdConfig = {
  input: 'src/squibview.umd-entry.js',
  external: [], // All dependencies handled dynamically or bundled
  output: [
    {
      file: 'dist/squibview.umd.js',
      format: 'umd',
      name: 'SquibView',
      sourcemap: true,
      inlineDynamicImports: true,
      globals: {
        // All dependencies handled dynamically
      },
      exports: 'default',
    },
    {
      file: 'dist/squibview.umd.min.js',
      format: 'umd',
      name: 'SquibView',
      sourcemap: true,
      inlineDynamicImports: true,
      globals: {
        // All dependencies handled dynamically
      },
      exports: 'default',
      plugins: [terser()],
    },
  ],
  plugins: [
    // json(), // if needed
    resolve({ extensions, browser: true }), // Added browser: true
    commonjs(),
    postcss({
      extract: 'squibview.css',
      minimize: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      presets: ['@babel/preset-env'],
    }),
  ],
};

/* ------------------------------------------------------------------
   2) "Standalone Basic" UMD Build: REMOVED
   This confusing build type has been removed
------------------------------------------------------------------ */

/* ------------------------------------------------------------------
   3) "Standalone Full" UMD Build:
   Bundles everything (no externals). The user or dev can just drop
   in the one script. Depends on a separate .js entry if you want 
   to orchestrate different imports for bundling everything.
------------------------------------------------------------------ */
const umdStandaloneConfig = {
  input: 'src/standalone.squibview.js',
  output: {
    file: 'dist/squibview.standalone.umd.min.js',
    format: 'umd',
    name: 'SquibView',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  external: ['debug'],
  plugins: [
    // json(), // if needed
    polyfillNode(),
    resolve({ extensions, browser: true }),
    commonjs({
      include: /node_modules/
    }),
    postcss({
      extract: 'squibview.css',
      minimize: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      presets: ['@babel/preset-env'],
    }),
    terser(),
  ],
};

/* ------------------------------------------------------------------
   3) ESM Builds (regular & standalone)
   - The "regular" ESM NOW BUNDLES core deps (markdown-it, diff-match-patch, tiny-emitter)
   - The "standalone" ESM includes everything.
------------------------------------------------------------------ */
const esmRegularConfig = {
  input: 'src/squibview.js',
  external: [], // All dependencies handled dynamically or bundled
  output: [
    {
      file: 'dist/squibview.esm.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/squibview.esm.min.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    // json(), // if needed
    polyfillNode(),
    resolve({ extensions, browser: true }),
    commonjs(),
    postcss({
      extract: 'squibview.css',
      minimize: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};

const esmStandaloneConfig = {
  // You can point to the same or a separate entry that ensures
  // mermaid/highlight are brought in. If you want to *force*
  // them to be bundled, you can rely on 'src/standalone.squibview.js'
  // or just remove them from `external`.
  input: 'src/standalone.squibview.js',
  external: ['debug'],
  output: [
    {
      file: 'dist/squibview.standalone.esm.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/squibview.standalone.esm.min.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
      plugins: [terser()],
    },
  ],
  // No externals -> everything is bundled
  plugins: [
    // json(), // if needed
    polyfillNode(),
    resolve({ extensions, browser: true }),
    commonjs({
      include: /node_modules/
    }),
    postcss({
      extract: 'squibview.css',
      minimize: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};

/* ------------------------------------------------------------------
   4) React Wrapper (ESM)
   Usually externalizes React (plus your core library).
------------------------------------------------------------------ */
const reactConfig = {
  input: 'src/SquibViewReact.js',
  external: ['https://esm.sh/react@18.2.0', './squibview.esm.min.js'],
  output: [
    {
      file: 'dist/squibview-react.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/squibview-react.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({ 
      extensions,
      alias: {
        'react': 'https://esm.sh/react@18.2.0'
      }
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
  ],
};

/* ------------------------------------------------------------------
   5) Vue Wrapper (ESM)
------------------------------------------------------------------ */
const vueConfig = {
  input: 'src/SquibViewVue.js',
  external: ['vue', './squibview.esm.min.js'],
  output: [
    {
      file: 'dist/squibview-vue.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/squibview-vue.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};

/* ------------------------------------------------------------------
   6) HTML-to-Markdown (ESM)
   Externalizes 'turndown' so the user can load it separately (or you can bundle it).
------------------------------------------------------------------ */
const htmlToMarkdownConfig = {
  input: 'src/HtmlToMarkdown.js',
  external: ['turndown'],
  output: [
    {
      file: 'dist/html-to-markdown.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/html-to-markdown.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};

/* ------------------------------------------------------------------
   7) LEAN Builds - The original behavior with all deps external
   These are for advanced users who want to manage dependencies
------------------------------------------------------------------ */
const umdLeanConfig = {
  input: 'src/squibview.umd-entry.js',
  external: ['mermaid', 'highlight.js', 'markdown-it', 'diff-match-patch', 'tiny-emitter'],
  output: [
    {
      file: 'dist/squibview.umd-lean.js',
      format: 'umd',
      name: 'SquibView',
      sourcemap: true,
      inlineDynamicImports: true,
      globals: {
        mermaid: 'mermaid',
        'highlight.js': 'hljs',
        'markdown-it': 'markdownit',
        'diff-match-patch': 'DiffMatchPatch',
        'tiny-emitter': 'TinyEmitter'
      },
      exports: 'default',
    },
    {
      file: 'dist/squibview.umd-lean.min.js',
      format: 'umd',
      name: 'SquibView',
      sourcemap: true,
      inlineDynamicImports: true,
      globals: {
        mermaid: 'mermaid',
        'highlight.js': 'hljs',
        'markdown-it': 'markdownit',
        'diff-match-patch': 'DiffMatchPatch',
        'tiny-emitter': 'TinyEmitter'
      },
      exports: 'default',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    postcss({
      extract: 'squibview.css',
      minimize: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      presets: ['@babel/preset-env'],
    }),
  ],
};

const esmLeanConfig = {
  input: 'src/squibview.js',
  external: ['mermaid', 'highlight.js', 'markdown-it', 'diff-match-patch', 'tiny-emitter'],
  output: [
    {
      file: 'dist/squibview.esm-lean.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/squibview.esm-lean.min.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    polyfillNode(),
    resolve({ extensions, browser: true }),
    commonjs(),
    postcss({
      extract: 'squibview.css',
      minimize: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};

/* 
   Finally, export an array of configuration objects so Rollup 
   will build them all in one go.
*/
export default process.env.BUILD === 'react' ? reactConfig :
       process.env.BUILD === 'umd' ? umdConfig :
       process.env.BUILD === 'esm' ? esmRegularConfig :
       process.env.BUILD === 'umd-lean' ? umdLeanConfig :
       process.env.BUILD === 'esm-lean' ? esmLeanConfig :
       process.env.BUILD === 'standalone' ? umdStandaloneConfig :
        [umdConfig, esmRegularConfig, umdLeanConfig, esmLeanConfig, reactConfig, vueConfig, htmlToMarkdownConfig, umdStandaloneConfig, esmStandaloneConfig];
