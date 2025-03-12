import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

// on the next line we import the package.json file so we can access the "main" field but we need to tell
// import its json file so it knows how to parse it

const extensions = ['.js'];

// This config creates the standalone build that bundles everything:
const standaloneConfig = {
  input: 'src/standalone.squibview.js',
  output: {
    file: 'dist/squibview.standalone.min.js',
    format: 'umd',
    name: 'SquibView',
    inlineDynamicImports: true,  // Force a single chunk
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss(),  // or styles plugin if you prefer
    babel({ babelHelpers: 'bundled', extensions: ['.js'] }),
    terser({ ecma: 2021 })
  ]
};

export default [
  // UMD Configuration
  {
    input: 'src/squibview.js',
    output: [
      {
        file: 'dist/squibview.umd.js',
        format: 'umd',
        name: 'SquibView',
        sourcemap: true,
        // Ensure all modules are included in main bundle rather than lazy-loaded
        inlineDynamicImports: true,
      },
      {
        file: 'dist/squibview.umd.min.js',
        format: 'umd',
        name: 'SquibView',
        sourcemap: true,
        // Ensure all modules are included in main bundle rather than lazy-loaded
        inlineDynamicImports: true,
        plugins: [terser()],
      }
    ],
    plugins: [
      resolve({ 
        extensions,
        // Ensure node_modules dependencies are resolved
        preferBuiltins: false
      }),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  // ESM Configuration
  {
    input: 'src/squibview.js',
    output: [
      {
        file: 'dist/squibview.esm.js',
        format: 'es',
        sourcemap: true,
        // Ensure all modules are included in main bundle rather than lazy-loaded
        inlineDynamicImports: true,
      },
      {
        file: 'dist/squibview.esm.min.js',
        format: 'es',
        sourcemap: true,
        // Ensure all modules are included in main bundle rather than lazy-loaded
        inlineDynamicImports: true,
        plugins: [terser()],
      }
    ],
    plugins: [
      resolve({ 
        extensions,
        // Ensure node_modules dependencies are resolved
        preferBuiltins: false
      }),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  // React Wrapper
  {
    input: 'src/SquibViewReact.js',
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
      }
    ],
    external: ['react', './squibview.js'],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
    ],
  },
  // Vue Wrapper
  {
    input: 'src/SquibViewVue.js',
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
      }
    ],
    external: ['vue', './squibview.js'],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  // HTML to Markdown Converter
  {
    input: 'src/HtmlToMarkdown.js',
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
      }
    ],
    external: ['turndown'],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  standaloneConfig
];
