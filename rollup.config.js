import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/components/index.js',
  output: [
    {
      file: 'dist/vueOtpInput.common.js',
      format: 'cjs',
      exports: 'default'
    },
    {
      file: 'dist/vueOtpInput.umd.js',
      format: 'umd',
      name: 'VueOtpInput',
      globals: {
        vue: 'Vue'
      },
      exports: 'default'
    },
    {
      file: 'dist/vueOtpInput.umd.min.js',
      format: 'umd',
      name: 'VueOtpInput',
      plugins: [terser()],
      globals: {
        vue: 'Vue'
      },
      exports: 'default'
    }
  ],
  external: ['vue'],
  plugins: [
    resolve({
      extensions: ['.js', '.vue']
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    })
  ]
};
