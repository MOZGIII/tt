import { Temporal } from "@js-temporal/polyfill";
import type { Meta, StoryFn } from "@storybook/react";
import React, { ComponentProps } from "react";

import TrackPanel from "./TrackPanel";

export default {
  title: "Components/TrackPanel",
  component: TrackPanel,
} as Meta;

const Template: StoryFn<ComponentProps<typeof TrackPanel>> = (args) => (
  <TrackPanel {...args} />
);

export const NotTracking = Template.bind({});
NotTracking.args = {
  trackingSince: null,
  taskName: "",
};

export const Tracking = Template.bind({});
Tracking.args = {
  trackingSince: Temporal.Now.zonedDateTimeISO(),
  taskName: "My task",
};
