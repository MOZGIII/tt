import { Temporal } from "proposal-temporal";

const formatTrackDuration = (duration: Temporal.Duration): string =>
  `${hours(duration)}:${pad(duration.minutes)}:${pad(duration.seconds)}`;

const pad = (s: number): string => (s < 10 ? `0${s}` : `${s}`);

const hours = (duration: Temporal.Duration): string =>
  Math.floor(duration.total({ unit: "hours" })).toString();

export default formatTrackDuration;
