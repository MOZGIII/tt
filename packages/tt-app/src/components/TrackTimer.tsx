import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Temporal } from "proposal-temporal";
import React, { useMemo } from "react";

import useCurrentTime from "../hooks/useCurrentTime";
import formatTrackingTime from "../logic/formatTrackingTime";
import timerStateCompute from "../logic/timerStateCompute";
import { TrackingSince } from "../types";

type Props = {
  readonly trackingSince: TrackingSince;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(14),
      height: theme.spacing(6),
      fontSize: theme.spacing(3),
      fontVariantNumeric: "tabular-nums",
      padding: theme.spacing(1),
    },
  })
);

const TrackTimer: React.FC<Props> = ({ trackingSince }: Props) => {
  const classes = useStyles();
  const currentTime = useCurrentTime(100);
  const timerState = useMemo(() => {
    if (!trackingSince) {
      return { elapsedTime: new Temporal.Duration() };
    }
    return timerStateCompute(trackingSince, currentTime);
  }, [trackingSince, currentTime]);
  const formattedTime = useMemo(() => {
    return formatTrackingTime(timerState.elapsedTime);
  }, [timerState]);
  return (
    <InputBase
      className={classes.root}
      value={formattedTime}
      readOnly
      inputProps={{
        role: "timer",
      }}
    />
  );
};

export default TrackTimer;
