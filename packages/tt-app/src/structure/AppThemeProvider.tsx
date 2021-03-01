import { ThemeProvider } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { getTheme } from "../theme";

const AppThemeProvider: React.FC = ({ children }) => {
  const themeId = useSelector((state: RootState) => state.theme);
  const theme = useMemo(() => getTheme(themeId), [themeId]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
