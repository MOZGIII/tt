import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "../store";
import AppThemeProvider from "./AppThemeProvider";
import Page from "./Page";

const App: React.FC = () => (
  <NoSsr>
    <ReduxProvider store={store}>
      <AppThemeProvider>
        <CssBaseline />
        <Page />
      </AppThemeProvider>
    </ReduxProvider>
  </NoSsr>
);

export default App;
