import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

declare module "webpack" {
  interface Configuration {
    devServer?: webpackDevServer.Configuration;
  }
}

const outputPath = path.resolve(__dirname, "dist");

const config = (env: any, argv: unknown): webpack.Configuration => ({
  mode: env.production ? "production" : "development",
  entry: "./src/index.ts",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "App",
    }),
  ],
  devtool: env.production ? "source-map" : "inline-source-map",
  devServer: {
    contentBase: outputPath,
  },
  output: {
    filename: "[name].[contenthash].js",
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
    ],
  },
});

export default config;
