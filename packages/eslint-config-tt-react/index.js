const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "simple-import-sort",
    "import",
    "compat",
    "functional",
    "promise",
    "sonarjs",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:compat/recommended",
    "plugin:functional/external-recommended",
    "plugin:functional/lite",
    "plugin:functional/stylitic",
    "plugin:promise/recommended",
    "plugin:sonarjs/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  settings: {
    react: {
      version: "detect",
    },
    propWrapperFunctions: [],
    linkComponents: [
      {
        name: "Link",
        linkAttribute: "to",
      },
    ],
  },
  env: {
    browser: true,
  },
  rules: {
    // Imports
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};

// Cut all typescript-related.
const cutTypescript = (config) => {
  const { parser: _, plugins, extends: extendsList, ...rest } = config;
  return {
    plugins: plugins.filter((plugin) => !/typescript/.test(plugin)),
    extends: extendsList.filter((extend) => !/typescript/.test(extend)),
    ...rest,
  };
};

// Cut all react-related.
const cutReact = (config) => {
  const { plugins, extends: extendsList, ...rest } = config;
  return {
    plugins: plugins.filter((plugin) => !/react/.test(plugin)),
    extends: extendsList.filter((extend) => !/react/.test(extend)),
    ...rest,
  };
};

module.exports = {
  overrides: [
    {
      files: ["*.tsx"],
      ...config,
    },
    {
      files: ["*.ts"],
      ...cutReact(config),
    },
    {
      files: ["*.jsx"],
      ...cutReact(cutTypescript(config)),
    },
    {
      files: ["*.js"],
      ...cutTypescript(config),
    },
  ],
};
