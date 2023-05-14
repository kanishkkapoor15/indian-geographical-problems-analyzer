import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { propertyMap } from "./properties.js";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 5,
    padding: 15,
    background: "rgba(255, 255, 255, 255)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    zIndex: 1
  },
  div: {
    paddingBottom: 5
  },
  i: {
    width: 18,
    height: 18,
    float: "left",
    marginRight: 8
  }
});

export default function Legend() {
  const classes = useStyles();
  const property = useSelector((state) => state.propertyStore.property);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks(display(property));
  }, [property]);

  const display = (props) => {
    var tag = [];
    tag = [
      <div className={classes.div} key={property + propertyMap[property][0]}>
        <i
          style={{ background: `rgb(${propertyMap["color"][0]})` }}
          className={classes.i}
        ></i>
        &gt; {propertyMap[property][0]}
      </div>
    ];
    for (var i = 1; i < propertyMap["color"].length; i++) {
      tag.push(
        <div className={classes.div} key={property + propertyMap[property][i]}>
          <i
            style={{ background: `rgb(${propertyMap["color"][i]})` }}
            className={classes.i}
          ></i>
          {propertyMap[property][i]} &ndash; {propertyMap[property][i - 1]}
        </div>
      );
    }
    return tag;
  };

  return (
    <div className={classes.container}>
      <div className={classes.div}>Legend</div>
      <div>{blocks}</div>
    </div>
  );
}
