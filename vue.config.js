module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    // allow to import svg icons inline via adding ?inline query
    // example: import Icon from '../assets/icons/icon.svg?inline';
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { cleanupIDs: false },
          ],
        },
      })
      .end()
      .end()
      .oneOf('external')
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
        esModule: false,
      });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/index.scss";',
      },
    },
  },
};
