import { Temporal } from "proposal-temporal";

const formatTrackTime = (time: Temporal.ZonedDateTime): string =>
  time.toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

export default formatTrackTime;
