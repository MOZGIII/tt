import { Temporal } from "@js-temporal/polyfill";
import type { Meta, StoryFn } from "@storybook/react";
import React, { ComponentProps } from "react";

import TrackTimer from "./TrackTimer";

export default {
  title: "Components/TrackTimer",
  component: TrackTimer,
} as Meta;

const Template: StoryFn<ComponentProps<typeof TrackTimer>> = (args) => (
  <TrackTimer {...args} />
);

export const NotTracking = Template.bind({});
NotTracking.args = { trackingSince: null };

export const Tracking = Template.bind({});
Tracking.args = { trackingSince: Temporal.Now.zonedDateTimeISO() };
