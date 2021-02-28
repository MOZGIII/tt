import { createModel } from "@rematch/core";
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
  effects: (_dispatch) => ({}),
});
