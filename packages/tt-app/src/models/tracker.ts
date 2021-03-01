import { createModel } from "@rematch/core";
import { Temporal } from "proposal-temporal";

import { makeTrackingRecord } from "../logic/trackingRecord";
import { TrackingSince } from "../types";
import { RootModel } from "./index";

export const tracker = createModel<RootModel>()({
  state: {
    trackingSince: null as TrackingSince,
    taskName: "",
  },
  reducers: {
    start(state, val: TrackingSince) {
      return { ...state, trackingSince: val };
    },
    stop(state) {
      return { ...state, trackingSince: null };
    },
    setTaskName(state, taskName: string) {
      return { ...state, taskName };
    },
  },
  effects: (dispatch) => ({
    stopAndRecord(to: Temporal.ZonedDateTime, rootState) {
      const from = rootState.tracker.trackingSince;
      if (!from) {
        throw new Error("stopAndRecord while not tracking");
      }
      dispatch.tracker.stop();
      dispatch.records.upsert(
        makeTrackingRecord({
          taskName: rootState.tracker.taskName,
          from,
          to,
        })
      );
    },
  }),
});
