import { Temporal } from "proposal-temporal";
import { useState } from "react";
import { useHarmonicIntervalFn } from "react-use";

const computeValue = (): Temporal.ZonedDateTime =>
  Temporal.now.zonedDateTimeISO();

const useCurrentTime = (delayMs: number): Temporal.ZonedDateTime => {
  const [value, setValue] = useState(computeValue());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useHarmonicIntervalFn(() => {
    setValue(computeValue());
  }, delayMs);
  return value;
};

export default useCurrentTime;
