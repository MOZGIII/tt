import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";

import TrackButton from "./TrackButton";

export default {
  title: "Components/TrackButton",
  component: TrackButton,
} as Meta;

const Template: Story<ComponentProps<typeof TrackButton>> = (args) => (
  <TrackButton {...args} />
);

export const Default = Template.bind({}, {});

export const NotTracking = Template.bind({}, { isTracking: false });

export const Tracking = Template.bind({}, { isTracking: true });
