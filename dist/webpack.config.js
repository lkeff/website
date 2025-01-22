"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
require("dotenv/config");
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var path = __importStar(require("path"));
var webpack_1 = require("webpack");
require("webpack-dev-server");
var webpack_subresource_integrity_1 = require("webpack-subresource-integrity");
var config = {
    entry: './src/index.tsx',
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'build', 'assets'),
        publicPath: (process.env.WEBSITE_URL || '') + "/assets/",
        crossOriginLoading: 'anonymous'
    },
    plugins: [
        new html_webpack_plugin_1["default"]({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: '../index.html',
            meta: {
                url: process.env.WEBSITE_URL,
                'og:url': process.env.WEBSITE_URL
            }
        }),
        new webpack_subresource_integrity_1.SubresourceIntegrityPlugin(),
        new webpack_1.EnvironmentPlugin(['WEBSITE_URL', 'WEBSITE_API_URL', 'DISCORD_CLIENT_ID']),
        new copy_webpack_plugin_1["default"]({
            patterns: [
                {
                    from: 'public/robots.txt',
                    to: '../robots.txt'
                },
                {
                    from: 'public/404.html',
                    to: '../404.html'
                },
            ]
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'build')
        },
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(styl)$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|svg|ogv|mp4|webm|wav)$/,
                type: 'asset/resource'
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    }
};
exports["default"] = config;
