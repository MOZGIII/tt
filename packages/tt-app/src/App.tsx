import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import Page from "./structure/Page";
import { getTheme } from "./theme";
import { store } from "./store";

const darkTheme = getTheme("dark");

const App: React.FC = () => (
  <NoSsr>
    <ReduxProvider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Page />
      </ThemeProvider>
    </ReduxProvider>
  </NoSsr>
);

export default App;
