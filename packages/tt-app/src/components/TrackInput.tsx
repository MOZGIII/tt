import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback, useMemo } from "react";

type Props = {
  readonly value: string;
  readonly onChange: (newValue: string) => void;
  readonly onSubmit: () => void;
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

const TrackInput: React.FC<Props> = ({ value, onChange, onSubmit }: Props) => {
  const classes = useStyles();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );
  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") {
        return;
      }
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  const inputProps = useMemo(
    () => ({
      onKeyUp: handleKeyUp,
    }),
    [handleKeyUp]
  );
  return (
    <InputBase
      className={classes.root}
      fullWidth
      placeholder="What are you working on?"
      value={value}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      inputProps={inputProps}
    />
  );
};

export default TrackInput;
