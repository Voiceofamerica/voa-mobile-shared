const webpack = require('webpack')
const path = require('path')

const ENV_PROD = 'production'
const ENV_DEV = 'development'
const env = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) || ENV_DEV

module.exports = {
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      components: path.join(__dirname, '../components'),
      helpers: path.join(__dirname, '../helpers'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.join(__dirname, '../tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        loaders: [{
          loader: 'url-loader',
          options: {
            limit: 16384,
            fallback: 'file-loader'
          }
        }]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      '__DEV__': JSON.stringify(env !== ENV_PROD)
    }),
  ]
}
