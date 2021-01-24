import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

declare module "webpack" {
  interface Configuration {
    devServer?: webpackDevServer.Configuration;
  }
}

const outputPath = path.resolve(__dirname, "dist");

const filter = <T>(a: Array<T | false>): Array<T> =>
  a.filter((v): v is T => v !== false);

const config = (env: any, argv: unknown): webpack.Configuration => {
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
    ]),
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: outputPath,
      hot: true,
    },
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "bundle.js",
      path: outputPath,
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
                plugins: filter([!isProduction && "react-refresh/babel"]),
              },
            },
            {
              loader: "ts-loader",
              options: { transpileOnly: true },
            },
          ],
        },
      ],
    },
  };
};

export default config;
