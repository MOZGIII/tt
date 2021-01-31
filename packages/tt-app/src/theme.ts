import { createMuiTheme, Theme } from "@material-ui/core/styles";

const themes = {
  dark: createMuiTheme({
    palette: {
      type: "dark",
    },
  }),
  light: createMuiTheme({
    palette: {
      type: "light",
    },
  }),
};

export type ThemeId = keyof typeof themes;

export const themeIds = (): ReadonlyArray<ThemeId> =>
  Object.keys(themes).map((e) => (e as unknown) as ThemeId);

export const getTheme = (theme: ThemeId): Theme => themes[theme];
