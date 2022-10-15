import { Temporal } from "@js-temporal/polyfill";

const formatTrackingTime = (duration: Temporal.Duration): string =>
  `${hours(duration)}:${pad(duration.minutes)}:${pad(duration.seconds)}`;

const pad = (s: number): string => (s < 10 ? `0${s}` : `${s}`);

const hours = (duration: Temporal.Duration): string =>
  Math.floor(duration.total({ unit: "hours" })).toString();

export default formatTrackingTime;
