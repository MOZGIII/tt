import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InlineChunkHtmlPlugin from "inline-chunk-html-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

declare module "webpack" {
  interface Configuration {
    devServer?: webpackDevServer.Configuration;
  }
}

const outputPath = path.resolve(__dirname, "build");

const filter = <T>(a: Array<T | false>): Array<T> =>
  a.filter((v): v is T => v !== false);

interface Env {
  production?: true;
}

const config = (env: Env): webpack.Configuration => {
  const isProduction = env.production === true;
  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    plugins: filter([
      !isProduction && new ReactRefreshWebpackPlugin(),
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "./index.html",
        template: "./public/index.html",
      }),
      isProduction &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/^runtime~/]),
    ]),
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: outputPath,
      hot: true,
    },
    output: {
      filename: isProduction
        ? "static/js/[name].[contenthash].js"
        : "static/js/bundle.js",
      path: outputPath,
      pathinfo: !isProduction,
    },
    optimization: {
      ...(isProduction && {
        runtimeChunk: "multiple",
        splitChunks: {
          chunks: "all",
        },
      }),
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.[jt]sx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
                plugins: filter([!isProduction && "react-refresh/babel"]),
              },
            },
          ],
        },
      ],
    },
  };
};

export default config;
