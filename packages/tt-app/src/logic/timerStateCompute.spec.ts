/* eslint-disable sonarjs/no-duplicate-string */
import { Temporal } from "@js-temporal/polyfill";

import { TrackingSince } from "../types";
import timerStateCompute, { TimerState } from "./timerStateCompute";

describe("timerStateCompute", () => {
  const expectTimerState = (
    trackingSince: TrackingSince,
    timeNow: Temporal.ZonedDateTime,
    expected: TimerState,
  ) => {
    const actual = timerStateCompute(trackingSince, timeNow);
    expect(actual.elapsedTime).toMatchDuration(expected.elapsedTime);
  };

  test("trivial", () => {
    expectTimerState(
      Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]"),
      Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]"),
      {
        elapsedTime: Temporal.Duration.from("P0D"),
      },
    );
  });

  test("realistic", () => {
    expectTimerState(
      Temporal.ZonedDateTime.from("2000-01-01T10:00:00Z[UTC]"),
      Temporal.ZonedDateTime.from("2000-01-01T10:05:00Z[UTC]"),
      {
        elapsedTime: Temporal.Duration.from("PT5M"),
      },
    );
  });

  test("negative", () => {
    expectTimerState(
      Temporal.ZonedDateTime.from("2000-01-01T10:05:00Z[UTC]"),
      Temporal.ZonedDateTime.from("2000-01-01T10:00:00Z[UTC]"),
      {
        elapsedTime: Temporal.Duration.from("PT0M"),
      },
    );
  });

  test("non-tracking", () => {
    expectTimerState(
      null,
      Temporal.ZonedDateTime.from("2000-01-01T10:00:00Z[UTC]"),
      {
        elapsedTime: Temporal.Duration.from("PT0M"),
      },
    );
  });
});
