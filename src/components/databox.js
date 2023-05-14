import React from "react";
import { FormGroup, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setProperty } from "../store/slice.js";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    bottom: 20,
    right: 10,
    borderRadius: 5,
    padding: 15,
    background: "rgba(255, 255, 255, 255)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    zIndex: 1
  }
});

export default function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const map = {
    domesticViolence: true,
    pollution: false,
    humanTrafficking: false,
    poverty: false,
    rapeCases: false,
    rural: false,
    illiteracy: false
  };

  const [state, setState] = React.useState({
    domesticViolence: true,
    pollution: false,
    humanTrafficking: false,
    poverty: false,
    rapeCases: false,
    rural: false,
    illiteracy: false
  });

  const handleChange = (event) => {
    for (let key in map) map[key] = false;
    if (event.target.checked) {
      map[event.target.name] = true;
      setState(map);
      dispatch(setProperty(event.target.name));
    } else {
      map["domesticViolence"] = true;
      setState(map);
      dispatch(setProperty("domesticViolence"));
    }
  };

  return (
    <div className={classes.container}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.domesticViolence}
              onChange={handleChange}
              name="domesticViolence"
            />
          }
          label="Domestic Violence"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.pollution}
              onChange={handleChange}
              name="pollution"
            />
          }
          label="Pollution(AQI)"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.humanTrafficking}
              onChange={handleChange}
              name="humanTrafficking"
            />
          }
          label="Human Trafficking"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.poverty}
              onChange={handleChange}
              name="poverty"
            />
          }
          label="Poverty"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.rapeCases}
              onChange={handleChange}
              name="rapeCases"
            />
          }
          label="Rape Cases"
        />
              
       
              
        <FormControlLabel
          control={
            <Switch
              checked={state.illiteracy}
              onChange={handleChange}
              name="illiteracy"
            />
          }
          label="illiteracy"
        />
        
      </FormGroup>
    </div>
  );
}
