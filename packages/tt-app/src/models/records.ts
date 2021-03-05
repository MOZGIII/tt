import { createModel } from "@rematch/core";
import { Temporal } from "proposal-temporal";
import { createTransform, Transform } from "redux-persist";

import { TrackingRecord, TrackingRecordId } from "../logic/trackingRecord";
import { RootState } from "../store";
import { EndState } from "../storeTransforms";
import { RootModel, RootTransforms } from "./index";

type RecordsState = { [key: string]: TrackingRecord };

type PatchPayload = {
  recordId: TrackingRecordId;
  patch: Partial<Omit<TrackingRecord, "id">>;
};

type ResumePayload = {
  trackingSince: Temporal.ZonedDateTime;
  recordId: TrackingRecordId;
};

export const records = createModel<RootModel>()({
  state: {} as RecordsState,
  reducers: {
    upsert(state, record: TrackingRecord) {
      return { ...state, [record.id]: record };
    },
    patch(state, { recordId, patch }: PatchPayload) {
      const record = state[recordId];
      if (!record) {
        throw new Error("patching a non-existing record id");
      }
      const newRecord = {
        ...record,
        ...patch,
        id: record.id,
      };
      return { ...state, [newRecord.id]: newRecord };
    },
    delete(state, recordId: TrackingRecordId) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [recordId]: _, ...rest } = state;
      return rest;
    },
  },
  effects: (dispatch) => ({
    resume({ trackingSince, recordId }: ResumePayload, rootState) {
      const record = rootState.records[recordId];
      if (!record) {
        throw new Error("resuming non-existing id");
      }
      dispatch.tracker.stopAndRecord(trackingSince);
      dispatch.tracker.resume(trackingSince, record.taskName);
    },
  }),
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
