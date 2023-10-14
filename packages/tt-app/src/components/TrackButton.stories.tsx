import type { Meta, StoryFn } from "@storybook/react";
import React, { ComponentProps } from "react";

import TrackButton from "./TrackButton";

export default {
  title: "Components/TrackButton",
  component: TrackButton,
} as Meta;

const Template: StoryFn<ComponentProps<typeof TrackButton>> = (args) => (
  <TrackButton {...args} />
);

export const NotTracking = Template.bind({});
NotTracking.args = { isTracking: false };

export const Tracking = Template.bind({});
Tracking.args = { isTracking: true };
