import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { Temporal } from "proposal-temporal";

expect.extend({
  toMatchDuration: (
    received: Temporal.Duration,
    duration: Temporal.Duration
  ) => {
    const relativeTo = Temporal.PlainDateTime.from("2020-01-01T00:00");
    const comparisonResult = Temporal.Duration.compare(received, duration, {
      relativeTo,
    });

    const pass = comparisonResult == 0;

    const message = pass
      ? () => `Expected not ${duration}, but it was received`
      : () => `Expected ${duration}, got ${received}`;

    return {
      pass,
      message,
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchDuration(duration: Temporal.Duration): R;
    }
  }
}
