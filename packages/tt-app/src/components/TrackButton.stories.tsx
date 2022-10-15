import type { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";

import TrackButton from "./TrackButton";

export default {
  title: "Components/TrackButton",
  component: TrackButton,
} as Meta;

const Template: Story<ComponentProps<typeof TrackButton>> = (args) => (
  <TrackButton {...args} />
);

export const NotTracking = Template.bind({});
NotTracking.args = { isTracking: false };

export const Tracking = Template.bind({});
Tracking.args = { isTracking: true };
