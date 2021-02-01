import { Temporal } from "proposal-temporal";
import React from "react";

import { freeze, unfreeze } from "../logic/currentZonedDateTimeISO";
import { act, render, screen } from "../test-utils";
import TrackTimer from "./TrackTimer";

const frozenTime = Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]");

// Override the current freezes in each of the tests.
beforeEach(() => freeze(frozenTime));
afterEach(() => unfreeze());

// Use mock timers.
beforeEach(() => jest.useFakeTimers());

test("shows zeroes when not tracking", () => {
  render(<TrackTimer />);
  expect(screen.getByRole("timer")).toHaveAttribute("value", "0:00:00");
});

test("shows non-zeroes when not tracking", () => {
  const trackingSince = frozenTime.subtract({
    hours: 1,
    minutes: 25,
    seconds: 30,
  });
  render(<TrackTimer trackingSince={trackingSince} />);
  expect(screen.getByRole("timer")).toHaveAttribute("value", "1:25:30");
});

test("ticks when tracking", () => {
  const trackingSince = frozenTime.subtract({
    hours: 1,
    minutes: 25,
    seconds: 30,
  });
  render(<TrackTimer trackingSince={trackingSince} />);
  expect(screen.getByRole("timer")).toHaveAttribute("value", "1:25:30");

  const nextFrozenTime = frozenTime.add({ minutes: 1 });
  freeze(nextFrozenTime);
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.getByRole("timer")).toHaveAttribute("value", "1:26:30");
});
