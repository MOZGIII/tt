import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@material-ui/core/styles";
import { StoryContext } from "@storybook/addons";
import { themes as storybookThemes } from "@storybook/theming";

import { themeIds, getTheme } from "../src/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: storybookThemes.dark,
  },
};

const availableThemes = themeIds();

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: availableThemes[0],
    toolbar: {
      icon: "circlehollow",
      items: availableThemes,
    },
  },
};

const withBase = (Story: React.ElementType, context: StoryContext) => {
  const theme = getTheme(context.globals.theme);
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </NoSsr>
  );
};

export const decorators = [withBase];
