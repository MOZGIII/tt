import Paper from "@material-ui/core/Paper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TrackPanel from "../components/TrackPanel";
import currentZonedDateTimeISO from "../logic/currentZonedDateTimeISO";
import { Dispatch, RootState } from "../store";

const Page: React.FC = () => {
  const tracker = useSelector((state: RootState) => state.tracker);
  const dispatch = useDispatch<Dispatch>();

  return (
    <Paper square>
      <TrackPanel
        trackingSince={tracker.trackingSince}
        taskName={tracker.taskName}
        onTaskNameChange={(val) => dispatch.tracker.setTaskName(val)}
        onTrackingStart={() =>
          dispatch.tracker.start(currentZonedDateTimeISO())
        }
        onTrackingStop={() => dispatch.tracker.stop()}
      />
    </Paper>
  );
};

export default Page;
