/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkgJSON = require('./package.json');


const { name, version } = pkgJSON;
const isProduction = process.env.NODE_ENV !== 'development';
const appPath = path.join(process.cwd(), 'src');
const assetsPath = path.join(appPath, 'assets');
const relAssetsPath = path.relative('.', assetsPath);

module.exports = function (env, argv) {
  const isAnalyze = argv && argv.analyze;
  return {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: 9000
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: 'normal',
    devtool: !isProduction ? 'eval-source-map' : undefined,
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        eslint: true,
        async: !isProduction
      }),
      new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /ru/),
      new BundleAnalyzerPlugin({
        analyzerMode: isAnalyze ? 'server' : 'disabled',
        generateStatsFile: isAnalyze,
        openAnalyzer: isAnalyze,
        statsOptions: { source: false }
      }),
      process.env.UNUSED_FILES && new UnusedFilesWebpackPlugin({
        patterns: [
          'src/**/*.*',
          'config/**/*.*',
        ],
        globOptions: {
          ignore: [
            'node_modules/**/*',
            'src/**/__tests__/**/*',
            'src/**/*.test.js',
            'src/**/*.test.ts',
            'config/jest/**/*',
          ],
        },
      }),
      new webpack.DefinePlugin({
        BROWSER : JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.SC_ATTR': JSON.stringify('data-styled-rbo-lite-layout'),
        BROWSER_SUPPORTS_HTML5: true
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
      alias: {
        app: path.resolve(__dirname, 'src'),
        root: path.resolve(__dirname),
        src: path.resolve(__dirname, 'src'),
        "root": path.resolve(__dirname),
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin({
        exclude: /\.html/i,
        parallel: true,
        cache: false,
        terserOptions: {
          compress: {
            drop_console: isProduction
          }
        }
      })],
      splitChunks: isProduction ? {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      } : {},
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                readOnly: isProduction
              }
            },
            {
              loader: 'thread-loader',
            },
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: { 
                happyPackMode: true,
                transpileOnly: true
              }
            },
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                readOnly: isProduction
              }
            },
            {
              loader: 'thread-loader',
            },
            {
              loader: 'babel-loader',
            },
          ]
        },
        // {
        //   test: /\.css$/i,
        //   use: [
        //     'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: { importLoaders: 1 }
        //     },
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         ident: 'postcss',
        //         plugins: (loader) => [
        //           require('postcss-import')({
        //             addModulesDirectories: [
        //               'node_modules',
        //               path.resolve(__dirname, 'src/assets/')
        //             ]
        //           }),
        //           require('postcss-url')(),
        //           require('postcss-cssnext')({
        //             browsers: ['last 3 versions', '> 3%']
        //           }),
        //           require('postcss-color-function')(),
        //           require('postcss-mixins')(),
        //           require('postcss-assets')({
        //             loadPaths: [
        //               path.resolve(__dirname, 'src/assets/')
        //             ]
        //           }),
        //           require('postcss-browser-reporter')(),
        //           require('postcss-reporter')(),
        //           require('postcss-nested')(),
        //         ]
        //       }
        //     }
        //   ]
        // },
        {
          test: /\.(png|ico|jpe?g|jpeg|gif|svg)$/i,
          use : [
            {
              loader: 'file-loader',
              query : {
                limit  : 10,
                context: relAssetsPath,
                name: isProduction ? '[path][name].[hash:8].[ext]' : '[path][name][local].[ext]'
              }
            }
          ]
        },
      ]
    },
    stats: {
      all: false,
      colors: true,
      env: false,
      errors: true,
      errorDetails: true,
      timings: true,
      warnings: true,
    }
  };
};