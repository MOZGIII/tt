import { ThemeProvider } from "@material-ui/core/styles";
import React, { PropsWithChildren, useMemo } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "tt-theme";

import { RootState } from "../store";

const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const themeId = useSelector((state: RootState) => state.theme);
  const theme = useMemo(() => getTheme(themeId), [themeId]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
