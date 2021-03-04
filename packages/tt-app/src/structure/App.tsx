import CssBaseline from "@material-ui/core/CssBaseline";
import NoSsr from "@material-ui/core/NoSsr";
import { getPersistor } from "@rematch/persist";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store } from "../store";
import AppThemeProvider from "./AppThemeProvider";
import Page from "./Page";

const persistor = getPersistor();

const App: React.FC = () => (
  <NoSsr>
    <PersistGate persistor={persistor}>
      <ReduxProvider store={store}>
        <AppThemeProvider>
          <CssBaseline />
          <Page />
        </AppThemeProvider>
      </ReduxProvider>
    </PersistGate>
  </NoSsr>
);

export default App;
