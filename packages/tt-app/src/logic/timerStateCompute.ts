import { Temporal } from "proposal-temporal";
import { TrackingSince } from "../types";

export type TimerState = {
  readonly elapsedTime: Temporal.Duration;
};

const timerStateCompute = (
  trackingSince: TrackingSince,
  timeNow: Temporal.ZonedDateTime
): TimerState => {
  if (trackingSince === null) {
    return { elapsedTime: new Temporal.Duration() };
  }
  const elapsedTime = timeNow.since(trackingSince);
  if (elapsedTime.sign === -1) {
    return { elapsedTime: new Temporal.Duration() };
  }
  return { elapsedTime };
};

export default timerStateCompute;
