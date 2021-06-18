module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css');
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      }]);
    }
  },
  configureWebpack: {
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
    },
  },
};
