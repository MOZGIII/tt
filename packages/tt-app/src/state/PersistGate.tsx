import React, { PropsWithChildren } from "react";

import { useRecordsStore } from "../models/records";
import { useThemeStore } from "../models/theme";
import { useTrackerStore } from "../models/tracker";

type Props = {
  loading: React.ReactElement;
};

const stores = [useRecordsStore, useTrackerStore, useThemeStore] as const;

const PersistGate: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, loading } = props;

  if (stores.every((store) => store.persist.hasHydrated)) {
    return <>{children}</>;
  }

  return loading;
};

export default PersistGate;
