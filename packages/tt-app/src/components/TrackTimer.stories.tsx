import { Meta, Story } from "@storybook/react/types-6-0";
import { Temporal } from "proposal-temporal";
import React, { ComponentProps } from "react";

import TrackTimer from "./TrackTimer";

export default {
  title: "Components/TrackTimer",
  component: TrackTimer,
} as Meta;

const Template: Story<ComponentProps<typeof TrackTimer>> = (args) => (
  <TrackTimer {...args} />
);

export const Default = Template.bind({}, {});

export const NotTracking = Template.bind({}, { trackingSince: undefined });

export const Tracking = Template.bind(
  {},
  {
    trackingSince: Temporal.now.zonedDateTimeISO(),
  }
);
