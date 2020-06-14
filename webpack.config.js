const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

// http://webpack.github.io/docs/configuration.html
module.exports = {
  mode: 'development',
  entry:{
    files: "./src/files.ts",
    app: "./src/app.ts"
  },

  output:{
    path: __dirname + "/dist/",
    filename: "js/[name].bundle.js"
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".less", ".png", ".ts", ".js"],
    alias: {
      Images: path.resolve(__dirname, 'src/images/'),
      Styles$: path.resolve(__dirname, 'src/css/styles.less')
    }
  },

  module:{
    // Test file extension to run loader
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /tsOld/],
        loader: "ts-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          },
        ],
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: '/images/',
            name: '[name].[ext]'
          }
        }
      },
    ]
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "SpaceInvaders"
    }),
  ],

  // Enables dev server to be accessed by computers in local network
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    publicPath: "/dist/",
    disableHostCheck: true
  }
}
