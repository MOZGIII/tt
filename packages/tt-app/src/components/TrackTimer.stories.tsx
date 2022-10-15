import { Temporal } from "@js-temporal/polyfill";
import type { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";

import TrackTimer from "./TrackTimer";

export default {
  title: "Components/TrackTimer",
  component: TrackTimer,
} as Meta;

const Template: Story<ComponentProps<typeof TrackTimer>> = (args) => (
  <TrackTimer {...args} />
);

export const NotTracking = Template.bind({});
NotTracking.args = { trackingSince: null };

export const Tracking = Template.bind({});
Tracking.args = { trackingSince: Temporal.Now.zonedDateTimeISO() };
