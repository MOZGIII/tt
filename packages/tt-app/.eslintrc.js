// eslint-disable-next-line functional/no-expression-statement, functional/immutable-data
module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
  extends: ["tt-react"],
  settings: {
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      { name: "Link", linkAttribute: "to" },
    ],
  },
  overrides: [
    {
      files: [".eslintrc.js"],
      env: { node: true },
    },
    {
      files: ["*.spec.[tj]sx?", "*.test.[tj]sx?"],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
      },
    },
    {
      files: ["*.stories.[tj]sx"],
      rules: {
        "functional/immutable-data": "off",
      },
    },
  ],
};
