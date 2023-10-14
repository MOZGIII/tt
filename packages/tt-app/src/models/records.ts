import { Temporal } from "@js-temporal/polyfill";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import { TrackingRecord, TrackingRecordId } from "../logic/trackingRecord";
import { createStorage } from ".";
import { trackerActions } from "./tracker";

type RecordsState = { [key: string]: TrackingRecord };

type PatchPayload = {
  recordId: TrackingRecordId;
  patch: Partial<Omit<TrackingRecord, "id">>;
};

type ResumePayload = {
  trackingSince: Temporal.ZonedDateTime;
  recordId: TrackingRecordId;
};

const defaultValue: RecordsState = {};

export const recordsActions = {
  upsert: (record: TrackingRecord) =>
    useRecordsStore.setState(
      (state) => ({ ...state, [record.id]: record }),
      true,
    ),
  patch: ({ recordId, patch }: PatchPayload) =>
    useRecordsStore.setState((state) => {
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
    }, true),
  delete: (recordId: TrackingRecordId) =>
    useRecordsStore.setState((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [recordId]: _, ...rest } = state;
      return rest;
    }, true),
  resume: ({ trackingSince, recordId }: ResumePayload) => {
    const state = useRecordsStore.getState();
    const record = state[recordId];
    if (!record) {
      throw new Error("resuming non-existing id");
    }
    trackerActions.stopAndRecord(trackingSince);
    trackerActions.resume(trackingSince, record.taskName);
  },
};

type SerializedRecordsState = Array<{
  id: TrackingRecordId;
  from: string;
  to: string;
  taskName: string;
}>;

const serialize = (state: RecordsState): SerializedRecordsState => [
  ...Object.values(state).map(({ to, from, ...rest }) => ({
    ...rest,
    to: to.toString(),
    from: from.toString(),
  })),
];

const deserialize = (state: SerializedRecordsState): RecordsState =>
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
    {},
  );

const persistOptions: PersistOptions<RecordsState> = {
  name: "records",
  storage: createStorage(serialize, deserialize),
};

export const useRecordsStore = create<RecordsState>()(
  persist(() => defaultValue, persistOptions),
);
