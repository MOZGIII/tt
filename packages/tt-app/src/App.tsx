import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";

import Page from "./Page";
import { getTheme } from "./theme";

const darkTheme = getTheme("dark");

const App: React.FC = () => (
  <NoSsr>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Page />
    </ThemeProvider>
  </NoSsr>
);

export default App;
