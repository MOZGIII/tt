import { ThemeProvider } from "@material-ui/core/styles";
import React, { PropsWithChildren, useMemo } from "react";

import { useThemeStore } from "../models/theme";
import { getTheme } from "../theme";

const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const themeId = useThemeStore((state) => state.themeId);
  const theme = useMemo(() => getTheme(themeId), [themeId]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
