/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('dotenv').config()

/**
 * UI JS 청크를 ui.html 안에 인라인으로 삽입한다.
 * Figma 플러그인 UI 는 단일 HTML 이어야 하므로 별도 ui.js 참조 대신 인라인이 필요하다.
 * (기존 react-dev-utils/InlineChunkHtmlPlugin 을 외부 의존성 없이 대체)
 */
class InlineChunkHtmlPlugin {
  constructor(htmlWebpackPlugin, tests) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.tests = tests
  }

  getInlinedTag(publicPath, assets, tag) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag
    }
    const scriptName =
      publicPath ? tag.attributes.src.replace(publicPath, '') : tag.attributes.src
    if (!this.tests.some((test) => scriptName.match(test))) {
      return tag
    }
    const asset = assets[scriptName]
    if (asset == null) {
      return tag
    }
    return { tagName: 'script', innerHTML: asset.source(), closeTag: true }
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || ''
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/'
    }

    compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation) => {
      const tagFunction = (tag) =>
        this.getInlinedTag(publicPath, compilation.assets, tag)
      const hooks = this.htmlWebpackPlugin.getHooks(compilation)
      hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (assets) => {
        assets.headTags = assets.headTags.map(tagFunction)
        assets.bodyTags = assets.bodyTags.map(tagFunction)
      })
    })
  }
}

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui/index.tsx', // The entry point for your UI code
    code: './src/controller/main.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      {
        test: /\.(png|jpg|gif|webp|svg|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 99999999,
        },
      },
      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },

  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: './src/ui/index.html',
      filename: 'ui.html',
      chunks: ['ui'],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
    new webpack.EnvironmentPlugin({
      TOKTOKEN_GITHUB_TOKEN: process.env.TOKTOKEN_GITHUB_TOKEN,
      TOKTOKEN_INTERNAL_PW: process.env.TOKTOKEN_INTERNAL_PW,
    }),
  ],
})
