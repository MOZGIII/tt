import { Temporal } from "proposal-temporal";
import React from "react";

import {
  freeze,
  setOverride,
  unfreeze,
} from "../logic/currentZonedDateTimeISO";
import { render, screen } from "../test-utils";
import TrackTimer from "./TrackTimer";

const frozenTime = Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]");

beforeAll(() => freeze(frozenTime));
afterAll(() => unfreeze());

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
