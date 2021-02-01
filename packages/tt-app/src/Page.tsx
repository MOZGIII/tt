import Paper from "@material-ui/core/Paper";
import { Temporal } from "proposal-temporal";
import React from "react";

import TrackPanel from "./components/TrackPanel";

const Page: React.FC = () => (
  <Paper square>
    <TrackPanel
      trackingSince={Temporal.now.zonedDateTimeISO()}
      taskName=""
      onTaskNameChange={() => undefined}
    />
  </Paper>
);

export default Page;
