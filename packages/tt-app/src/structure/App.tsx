import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import React from "react";

import AppThemeProvider from "./AppThemeProvider";
import Page from "./Page";

const App: React.FC = () => (
  <NoSsr>
    <AppThemeProvider>
      <CssBaseline />
      <Page />
    </AppThemeProvider>
  </NoSsr>
);

export default App;
