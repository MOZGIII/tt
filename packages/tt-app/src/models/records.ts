import { createModel } from "@rematch/core";

import { TrackingRecord } from "../logic/trackingRecord";
import { RootModel } from "./index";

type RecordsState = { [key: string]: TrackingRecord };

export const records = createModel<RootModel>()({
  state: {} as RecordsState,
  reducers: {
    upsert(state, record: TrackingRecord) {
      return { ...state, [record.id]: record };
    },
  },
});
