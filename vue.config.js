module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: false,
    extract: false,
  },
  chainWebpack: (config) => {
    config.externals({
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue',
      },
    });
  },
};
