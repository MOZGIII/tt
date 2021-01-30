import { Temporal } from "proposal-temporal";

import timerStateCompute from "./timerStateCompute";

describe("timerStateCompute", () => {
  test("trivial", () => {
    expect(
      timerStateCompute(
        Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]"),
        Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]")
      )
    ).toStrictEqual({
      elapsedTime: Temporal.Duration.from("P0D"),
    });
  });

  test("realistic", () => {
    expect(
      timerStateCompute(
        Temporal.ZonedDateTime.from("2000-01-01T10:00:00Z[UTC]"),
        Temporal.ZonedDateTime.from("2000-01-01T10:05:00Z[UTC]")
      )
    ).toStrictEqual({
      elapsedTime: Temporal.Duration.from("P5M"),
    });
  });

  test("negative", () => {
    expect(
      timerStateCompute(
        Temporal.ZonedDateTime.from("2000-01-01T10:05:00Z[UTC]"),
        Temporal.ZonedDateTime.from("2000-01-01T10:00:00Z[UTC]")
      )
    ).toStrictEqual({
      elapsedTime: Temporal.Duration.from("-P5M"),
    });
  });
});
