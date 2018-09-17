// ref: https://umijs.org/config/
export default {
  proxy: {
    '/api': {
      target: 'https://sm.ms/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  hash: true,
  extraBabelPlugins: ['lodash'],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'smms',
        dll: true,
        pwa: false,
        routes: {
          exclude: [],
        },
        hardSource: true,
      },
    ],
  ],
}
