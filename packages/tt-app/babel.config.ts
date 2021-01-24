export default (api: any) => {
  api.cache.using(() => process.env.NODE_ENV);
  api.env("production")();
  return {
    presets: [
      "@babel/preset-env",
      ["@babel/preset-react", { runtime: "automatic" }],
      "@babel/preset-typescript",
    ],
    // Applies the react-refresh Babel plugin on non-production modes only.
    ...(!api.env("production") && { plugins: ["react-refresh/babel"] }),
  };
};
