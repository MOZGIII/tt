import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@material-ui/core/styles";
import type { Decorator, Parameters, StoryContext } from "@storybook/react";
import { themes as storybookThemes } from "@storybook/theming";

import { themeIds, getTheme } from "../src/theme";

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: storybookThemes.dark,
  },
  backgrounds: {
    disable: true,
    grid: {
      cellSize: 8,
      cellAmount: 6,
    },
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

export const decorators: Decorator[] = [withBase];
