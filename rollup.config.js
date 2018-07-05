// rollup.config.js
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
import { uglify } from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;
const isProductionBuild = env === 'production';

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: isProductionBuild
  },

  external: [
    'fs',
    'path'
  ],

  plugins: [
    json(),

    commonjs({
      sourceMap: isProductionBuild
    }),

    buble(),

    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),

    visualizer({
      filename: './statistics.html',
      title: 'Service Visualizer'
      // sourcemap: isProductionBuild
    })
  ]
};

if (isProductionBuild) {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
