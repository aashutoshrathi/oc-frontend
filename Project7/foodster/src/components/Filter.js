import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "inline-flex",
    flexDirection: "column"
  }
});

const valuetext = value => `${value}`;

const marks = [
  {
    value: 1,
    label: "1★"
  },
  {
    value: 2,
    label: "2★"
  },
  {
    value: 3,
    label: "3★"
  },
  {
    value: 4,
    label: "4★"
  },
  {
    value: 5,
    label: "5★"
  }
];

const Filter = () => {
  const classes = useStyles();
  const [value, setValue] = useState([0, 5]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Show Restaurants with Rating between
      </Typography>
      <Slider
        value={value}
        step={1}
        marks={marks}
        min={0}
        max={5}
        onChange={handleChange}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
      />
      <br />
    </div>
  );
};

export default Filter;
