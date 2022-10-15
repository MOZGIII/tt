import { Temporal } from "@js-temporal/polyfill";
import { createModel } from "@rematch/core";
import { createTransform, Transform } from "redux-persist";

import { SerializedState } from "../lib/modelsTransform";
import { makeTrackingRecord } from "../logic/trackingRecord";
import { RootState } from "../store";
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
    resume(state, trackingSince: Temporal.ZonedDateTime, taskName: string) {
      return { ...state, trackingSince, taskName };
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
        return;
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
  SerializedState<RootModel, RootTransforms>
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
