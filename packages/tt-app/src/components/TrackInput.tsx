import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback } from "react";

type Props = {
  readonly value: string;
  readonly onChange: (newValue: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(6),
      fontSize: theme.spacing(3),
      padding: theme.spacing(1),
    },
  })
);

const TrackInput: React.FC<Props> = ({ value, onChange }: Props) => {
  const classes = useStyles();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );
  return (
    <InputBase
      className={classes.root}
      fullWidth
      placeholder="What are you working on?"
      value={value}
      onChange={handleChange}
    />
  );
};

export default TrackInput;
