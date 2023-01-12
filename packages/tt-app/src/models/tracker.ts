import { Temporal } from "@js-temporal/polyfill";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import { makeTrackingRecord } from "../logic/trackingRecord";
import { TrackingSince } from "../types";
import { createStorage } from ".";
import { recordsActions } from "./records";

export type TrackerState = {
  trackingSince: TrackingSince | null;
  taskName: string;
};

const defaultValue: TrackerState = {
  trackingSince: null,
  taskName: "",
};

export const trackerActions = {
  start: (trackingSince: Temporal.ZonedDateTime) =>
    useTrackerStore.setState((state) => ({ ...state, trackingSince }), true),

  resume: (trackingSince: Temporal.ZonedDateTime, taskName: string) =>
    useTrackerStore.setState(
      (state) => ({
        ...state,
        trackingSince,
        taskName,
      }),
      true
    ),

  stop: () =>
    useTrackerStore.setState(
      (state) => ({
        ...state,
        trackingSince: null,
        taskName: "",
      }),
      true
    ),

  setTaskName: (taskName: string) =>
    useTrackerStore.setState((state) => ({ ...state, taskName }), true),

  stopAndRecord: (to: Temporal.ZonedDateTime) => {
    const state = useTrackerStore.getState();
    const { trackingSince: from, taskName } = state;
    if (!from) {
      return;
    }
    trackerActions.stop();
    recordsActions.upsert(
      makeTrackingRecord({
        taskName,
        from,
        to,
      })
    );
  },
};

type SerializedTrackerState = {
  trackingSince: string | null;
  taskName: string;
};

const serialize = ({
  trackingSince,
  ...rest
}: TrackerState): SerializedTrackerState => ({
  ...rest,
  trackingSince: trackingSince ? trackingSince.toString() : null,
});

const deserialize = ({
  trackingSince,
  ...rest
}: SerializedTrackerState): TrackerState => ({
  ...rest,
  trackingSince: trackingSince
    ? Temporal.ZonedDateTime.from(trackingSince)
    : null,
});

const persistOptions: PersistOptions<TrackerState, SerializedTrackerState> = {
  name: "tracker",
  storage: createStorage(serialize, deserialize),
};

export const useTrackerStore = create<TrackerState>()(
  persist(() => defaultValue, persistOptions)
);
