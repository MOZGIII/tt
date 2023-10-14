import type { Meta, StoryFn } from "@storybook/react";
import React, { ComponentProps } from "react";

import TrackInput from "./TrackInput";

export default {
  title: "Components/TrackInput",
  component: TrackInput,
  argTypes: {
    value: { name: "The task that's being tracked" },
  },
} as Meta;

const Template: StoryFn<ComponentProps<typeof TrackInput>> = (args) => (
  <TrackInput {...args} />
);

export const Empty = Template.bind({});
Empty.args = { value: "" };

export const Filled = Template.bind({});
Filled.args = { value: "Checking out storybook" };
