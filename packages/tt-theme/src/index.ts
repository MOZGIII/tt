import { createTheme, Theme } from "@material-ui/core/styles";

const themes = {
  dark: createTheme({
    palette: {
      type: "dark",
    },
  }),
  light: createTheme({
    palette: {
      type: "light",
    },
  }),
} as const;

export type ThemeId = keyof typeof themes;

export const themeIds = (): ReadonlyArray<ThemeId> =>
  Object.keys(themes).map((e) => e as unknown as ThemeId);

export const getTheme = (theme: ThemeId): Theme => themes[theme];
