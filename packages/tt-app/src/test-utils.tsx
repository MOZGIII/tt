import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@material-ui/core/styles";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import React, { PropsWithChildren, ReactElement } from "react";

import { getTheme } from "./theme";

const AllTheProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = getTheme("dark");
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NoSsr>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
