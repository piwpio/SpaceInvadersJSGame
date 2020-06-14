const webpack = require("webpack");
const path = require("path");

// http://webpack.github.io/docs/configuration.html
module.exports = {
  mode: 'development',
  entry:{
    main: "./src/app.ts",
  },

  // Outputs compiled bundle to `./web/js/main.js`
  output:{
    path: __dirname + "/web/",
    filename: "js/[name].js"
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".less", ".png"],
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
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
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

  // Enables dev server to be accessed by computers in local network
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    publicPath: "/web/",
    disableHostCheck: true
  }
}
