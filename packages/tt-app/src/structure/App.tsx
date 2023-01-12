import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import React from "react";

import PersistGate from "../state/PersistGate";
import AppThemeProvider from "./AppThemeProvider";
import Page from "./Page";

const App: React.FC = () => (
  <NoSsr>
    <PersistGate loading={<></>}>
      <AppThemeProvider>
        <CssBaseline />
        <Page />
      </AppThemeProvider>
    </PersistGate>
  </NoSsr>
);

export default App;
