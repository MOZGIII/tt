import { Temporal } from "@js-temporal/polyfill";

import { fireEvent, render, screen, waitFor } from "../test-utils";
import TrackPanel from "./TrackPanel";

test("starts the tracker if button is pressed while not tracking", async () => {
  const onTrackingStart = jest.fn();
  const other = jest.fn();

  render(
    <TrackPanel
      trackingSince={null}
      taskName="mytask"
      onTrackingStart={onTrackingStart}
      onTrackingStop={other}
      onTaskNameChange={other}
      onTrackingCancel={other}
    />
  );

  await waitFor(() => screen.getByRole("trackButton"));
  fireEvent.click(screen.getByRole("trackButton"));

  expect(onTrackingStart).toHaveBeenCalledTimes(1);
  expect(other).not.toHaveBeenCalled();
});

test("stops the tracker if button is pressed while tracking", async () => {
  const onTrackingStop = jest.fn();
  const other = jest.fn();

  render(
    <TrackPanel
      trackingSince={Temporal.ZonedDateTime.from("2000-01-01T00:00:00Z[UTC]")}
      taskName="mytask"
      onTrackingStart={other}
      onTrackingStop={onTrackingStop}
      onTaskNameChange={other}
      onTrackingCancel={other}
    />
  );

  await waitFor(() => screen.getByRole("trackButton"));
  fireEvent.click(screen.getByRole("trackButton"));

  expect(onTrackingStop).toHaveBeenCalledTimes(1);
  expect(other).not.toHaveBeenCalled();
});
