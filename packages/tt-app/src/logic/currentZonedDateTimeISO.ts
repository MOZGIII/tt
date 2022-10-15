import { Temporal } from "@js-temporal/polyfill";

let override: Temporal.ZonedDateTime | null = null;

// A mock-friendly way to obtain the current time.
const currentZonedDateTimeISO = (): Temporal.ZonedDateTime =>
  override || Temporal.Now.zonedDateTimeISO();

export default currentZonedDateTimeISO;

// Set the value to return instead of the real time.
// Useful in the tests to allow mocking.
export const setOverride = (
  newOverride: Temporal.ZonedDateTime | null
): void => {
  override = newOverride;
};

// Utility aliases.
export const freeze: (time: Temporal.ZonedDateTime) => void = setOverride;
export const unfreeze: () => void = () => setOverride(null);
