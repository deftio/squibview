import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

const extensions = ['.js'];

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
      },
      {
        file: 'dist/squibview.umd.min.js',
        format: 'umd',
        name: 'SquibView',
        sourcemap: true,
        plugins: [terser()],
      }
    ],
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
  // ESM Configuration
  {
    input: 'src/squibview.js',
    output: [
      {
        file: 'dist/squibview.esm.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/squibview.esm.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      }
    ],
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
  }
];
