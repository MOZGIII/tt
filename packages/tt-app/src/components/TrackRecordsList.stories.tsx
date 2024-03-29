import { Temporal } from "@js-temporal/polyfill";
import type { Meta, StoryFn } from "@storybook/react";
import React, { ComponentProps } from "react";

import TrackRecordsList from "./TrackRecordsList";

export default {
  title: "Components/TrackRecordsList",
  component: TrackRecordsList,
} as Meta;

const Template: StoryFn<ComponentProps<typeof TrackRecordsList>> = (args) => (
  <TrackRecordsList {...args} />
);

export const Empty = Template.bind({});
Empty.args = {
  records: [],
};

export const FewItems = Template.bind({});
FewItems.args = {
  records: [
    {
      id: "3",
      taskName: "My task #3",
      from: Temporal.ZonedDateTime.from("2021-01-01T15:00:00Z[UTC]"),
      to: Temporal.ZonedDateTime.from("2021-01-01T15:01:00Z[UTC]"),
    },
    {
      id: "2",
      taskName: "My task #2",
      from: Temporal.ZonedDateTime.from("2021-01-01T14:00:00Z[UTC]"),
      to: Temporal.ZonedDateTime.from("2021-01-01T15:00:00Z[UTC]"),
    },
    {
      id: "1",
      taskName: "My task #1",
      from: Temporal.ZonedDateTime.from("2021-01-01T12:00:00Z[UTC]"),
      to: Temporal.ZonedDateTime.from("2021-01-01T13:23:45Z[UTC]"),
    },
  ],
};
