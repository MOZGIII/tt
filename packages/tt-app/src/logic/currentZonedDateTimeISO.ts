import { Temporal } from "proposal-temporal";

// Useful in the tests to allow mocking.
const currentZonedDateTimeISO = (): Temporal.ZonedDateTime =>
  Temporal.now.zonedDateTimeISO();

export default currentZonedDateTimeISO;
