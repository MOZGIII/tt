import { Temporal } from "proposal-temporal";

export type TimerState = {
  readonly elapsedTime: Temporal.Duration;
};

const timerStateCompute = (
  trackingSince: Temporal.ZonedDateTime,
  timeNow: Temporal.ZonedDateTime
): TimerState => {
  const elapsedTime = timeNow.since(trackingSince);
  return { elapsedTime };
};

export default timerStateCompute;
