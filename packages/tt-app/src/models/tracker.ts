import { createModel } from "@rematch/core";
import { Temporal } from "proposal-temporal";
import { createTransform, Transform } from "redux-persist";

import { makeTrackingRecord } from "../logic/trackingRecord";
import { RootState } from "../store";
import { EndState } from "../storeTransforms";
import { TrackingSince } from "../types";
import { RootModel, RootTransforms } from "./index";

export const tracker = createModel<RootModel>()({
  state: {
    trackingSince: null as TrackingSince,
    taskName: "",
  },
  reducers: {
    start(state, trackingSince: Temporal.ZonedDateTime) {
      return { ...state, trackingSince };
    },
    stop(state) {
      return { ...state, trackingSince: null, taskName: "" };
    },
    setTaskName(state, taskName: string) {
      return { ...state, taskName };
    },
  },
  effects: (dispatch) => ({
    stopAndRecord(to: Temporal.ZonedDateTime, rootState) {
      const { trackingSince: from, taskName } = rootState.tracker;
      if (!from) {
        throw new Error("stopAndRecord while not tracking");
      }
      dispatch.tracker.stop();
      dispatch.records.upsert(
        makeTrackingRecord({
          taskName,
          from,
          to,
        })
      );
    },
  }),
});

type SerializedTrackerState = {
  trackingSince: string | null;
  taskName: string;
};

export const trackerTransform: Transform<
  typeof tracker.state,
  SerializedTrackerState,
  RootState,
  EndState<RootModel, RootTransforms>
> = createTransform(
  ({ trackingSince, ...rest }) => ({
    ...rest,
    trackingSince: trackingSince ? trackingSince.toString() : null,
  }),
  ({ trackingSince, ...rest }) => ({
    ...rest,
    trackingSince: trackingSince
      ? Temporal.ZonedDateTime.from(trackingSince)
      : null,
  })
);
