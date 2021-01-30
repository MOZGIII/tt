import { Temporal } from "proposal-temporal";

import formatTrackingTime from "./formatTrackingTime";

describe("formatTrackingTime", () => {
  test("zero", () => {
    expect(formatTrackingTime(new Temporal.Duration())).toBe("0:00:00");
  });

  describe("typical values", () => {
    const cases: ReadonlyArray<readonly [Temporal.Duration, string]> = [
      [new Temporal.Duration(0, 0, 0, 0, 1, 2, 3, 4, 5, 6), "1:02:03"],
      [new Temporal.Duration(0, 0, 0, 0, 0, 0, 1, 0, 0, 0), "0:00:01"],
      [new Temporal.Duration(0, 0, 0, 0, 0, 59, 59, 0, 0, 0), "0:59:59"],
      [new Temporal.Duration(0, 0, 0, 0, 1, 0, 0, 0, 0, 0), "1:00:00"],
      [new Temporal.Duration(0, 0, 0, 0, 10, 0, 0, 0, 0, 0), "10:00:00"],
      [new Temporal.Duration(0, 0, 0, 0, 23, 59, 59, 0, 0, 0), "23:59:59"],
      [new Temporal.Duration(0, 0, 0, 1, 0, 0, 0, 0, 0, 0), "24:00:00"],
      [new Temporal.Duration(0, 0, 0, 1, 1, 2, 3, 0, 0, 0), "25:02:03"],
      [new Temporal.Duration(0, 0, 0, 2, 0, 0, 0, 0, 0, 0), "48:00:00"],
    ];

    cases.forEach(([duration, expected]) => {
      test(duration.toString(), () => {
        expect(formatTrackingTime(duration)).toBe(expected);
      });
    });
  });
});
