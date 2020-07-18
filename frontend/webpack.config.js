const path = require('path')
const ringUiConfig = require('@jetbrains/ring-ui/webpack.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const bundlePath = path.resolve(__dirname, '../dashboard-server/src/main/resources/buildServerResources')
const srcPath = path.join(__dirname, 'src')

;[ringUiConfig.loaders.babelLoader, ringUiConfig.loaders.cssLoader].forEach(loader => {
    loader.include = [...loader.include, srcPath]
})

module.exports = (env = {}, argv = {}) => ({
    mode: env.production ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: bundlePath,
        filename: 'bundle.js',
    },
    module: ringUiConfig.config.module,
    devServer: {
        hot: true,
        contentBase: bundlePath,
        filename: 'bundle.js',
        port: argv.port,
        host: argv.host,
        allowedHosts: ['localhost'],
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
    },
    externals: [
//        function(context, request, callback) {
//            if (['react', 'react-dom'].includes(request)) {
//                return callback(null, `window.ReactAPI.Dependencies['${request}']`);
//            }
//            return callback();
//        }
    ],
    plugins: [
        env.analyze && new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false,
        }),
    ].filter(Boolean),
})
