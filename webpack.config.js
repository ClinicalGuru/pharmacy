// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = ({ mode } = { mode: "production" }) => {
    return {
        mode,
        entry: {
            pharmacy: path.resolve(__dirname, 'src/index.js')
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
            publicPath: '/'
        },
        devServer: {
            open: true,
            port: 3000,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new webpack.ProvidePlugin({
                "React": "react",
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
            fallback: {
                fs: false  // or require.resolve('fs') if 'empty' doesn't work
            }
        }
    }
};