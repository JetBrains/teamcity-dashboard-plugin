const path = require('path')
const ringUiConfig = require('@jetbrains/ring-ui/webpack.config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const bundlePath = path.resolve(
	__dirname,
	'../dashboard-server/src/main/resources/buildServerResources'
)
const srcPath = path.join(__dirname, 'src')

ringUiConfig.loaders.cssLoader.include = [
	...ringUiConfig.loaders.cssLoader.include,
	srcPath,
]
ringUiConfig.loaders.svgInlineLoader.include.push(
	require('@jetbrains/icons'),
	require('@jetbrains/logos'),
	srcPath
)

const babelLoader = {
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
		babelrc: false,
		extends: './babel.config.js',
	},
}

Object.assign(ringUiConfig.loaders.babelLoader, babelLoader)

module.exports = (env = {}, argv = {}) => ({
	mode: env.production ? 'production' : 'development',
	entry: './src/index.js',
	output: {
		path: bundlePath,
		filename: 'bundle.js',
	},
	module: {
		rules: [
			...ringUiConfig.config.module.rules,
			{
				test: /\.js$/,
				include: [srcPath],
				exclude: [/node_modules/],
				use: [babelLoader],
			},
		],
	},
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
	externals: {
		react: 'TeamcityReactAPI.React',
		'@teamcity/react-api': 'TeamcityReactAPI',
		'react-dom': 'TeamcityReactAPI.ReactDOM',
	},
	plugins: [
		env.analyze &&
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				reportFilename: 'bundle-report.html',
				openAnalyzer: false,
			}),
	].filter(Boolean),
})
