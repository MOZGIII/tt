import { createModel } from "@rematch/core";
import { Temporal } from "proposal-temporal";
import { createTransform, Transform } from "redux-persist";

import { TrackingRecord, TrackingRecordId } from "../logic/trackingRecord";
import { RootState } from "../store";
import { EndState } from "../storeTransforms";
import { RootModel, RootTransforms } from "./index";

type RecordsState = { [key: string]: TrackingRecord };

export const records = createModel<RootModel>()({
  state: {} as RecordsState,
  reducers: {
    upsert(state, record: TrackingRecord) {
      return { ...state, [record.id]: record };
    },
  },
});

type SerializedRecordsState = Array<{
  id: TrackingRecordId;
  from: string;
  to: string;
  taskName: string;
}>;

export const recordsTransform: Transform<
  typeof records.state,
  SerializedRecordsState,
  RootState,
  EndState<RootModel, RootTransforms>
> = createTransform(
  (state) => [
    ...Object.values(state).map(({ to, from, ...rest }) => ({
      ...rest,
      to: to.toString(),
      from: from.toString(),
    })),
  ],
  (state) =>
    state.reduce(
      (acc, { id, from, to, ...rest }) => ({
        ...acc,
        [id]: {
          id,
          from: Temporal.ZonedDateTime.from(from),
          to: Temporal.ZonedDateTime.from(to),
          ...rest,
        },
      }),
      {}
    )
);
